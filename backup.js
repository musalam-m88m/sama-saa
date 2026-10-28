// سما صاع — النسخ الاحتياطي والاسترجاع
// البيانات محفوظة في متصفح واحد (IndexedDB «saa-demo»، المفتاح db6 = ملف SQLite).
// هالملف يضيف بطاقة في صفحة الإعدادات: تنزيل نسخة كاملة، واسترجاع نسخة من ملف.
(() => {
  const DB_NAME = 'saa-demo', STORE = 'kv', KEY = 'db6', LAST = 'saa_last_backup';
  const MAGIC = 'SQLite format 3';

  const open = () => new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  const idb = async (mode, fn) => {
    const d = await open();
    return new Promise((res, rej) => {
      const t = d.transaction(STORE, mode), q = fn(t.objectStore(STORE));
      t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error);
    });
  };
  const getDb = () => idb('readonly', s => s.get(KEY));
  const putDb = bytes => idb('readwrite', s => s.put(bytes, KEY));

  const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch { } } };
  const pad = n => String(n).padStart(2, '0');
  const stamp = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
  const nice = iso => { if (!iso) return 'ما انسوّت نسخة للحين'; const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const daysSince = iso => iso ? Math.floor((Date.now() - new Date(iso)) / 864e5) : Infinity;
  const toast = (msg, err) => {
    const box = document.getElementById('toasts'); if (!box) return alert(msg);
    const t = document.createElement('div'); t.className = 'toast' + (err ? ' err' : ''); t.textContent = msg;
    box.appendChild(t); setTimeout(() => t.remove(), err ? 5200 : 3000);
  };

  // تنزيل ملف: داخل Claude عن طريق downloads (يطلب تأكيد المستخدم)، وبرا Claude برابط عادي
  let dl;
  async function saveFile(name, blob) {
    if (dl === undefined) dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
    if (dl) {
      try { await dl.save({ filename: name, data: blob }); return true; }
      catch (e) { if (e && e.code === 'declined') return false; if (!['unavailable', 'not_granted', 'capability_disabled', 'capability_removed'].includes(e && e.code)) throw new Error('ما قدرت أنزّل الملف: ' + ((e && e.message) || '')); }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    return true;
  }
  window.sxSave = saveFile;

  const toB64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  const fromB64 = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));

  async function download() {
    const bytes = await getDb();
    if (!bytes || !bytes.byteLength) return toast('ما لقيت بيانات محفوظة في هالمتصفح', true);
    // ملف JSON فيه قاعدة البيانات كاملة (الصيغة المسموحة للتنزيل داخل Claude)
    const json = JSON.stringify({ app: 'sama-saa', format: 1, saved_at: new Date().toISOString(), sqlite_base64: toB64(new Uint8Array(bytes)) });
    const ok = await saveFile(`سما-صاع-نسخة-${stamp(new Date())}.json`, new Blob([json], { type: 'application/json' }));
    if (!ok) return toast('انلغى التنزيل', true);
    store.set(LAST, new Date().toISOString());
    render();
    toast('تم تنزيل النسخة الاحتياطية');
  }

  // نفتح النسخة في قاعدة مؤقتة ونتأكد إنها سليمة وفيها جداول سما صاع قبل ما نستبدل أي شي
  const NEEDED = ['users', 'owners', 'properties', 'units', 'contracts', 'payments'];
  async function checkCopy(buf) {
    if (typeof window.initSqlJs !== 'function') return 'ما قدرت أفحص الملف، جرّب تحدّث الصفحة';
    let db;
    try {
      const SQL = await window.initSqlJs({});
      db = new SQL.Database(buf);
      const ok = db.exec('PRAGMA integrity_check')[0]?.values[0][0];
      if (ok !== 'ok') return 'الملف تالف (فشل فحص السلامة) — البيانات الحالية ما تغيّرت';
      const have = new Set((db.exec("SELECT name FROM sqlite_master WHERE type='table'")[0]?.values || []).map(r => r[0]));
      const miss = NEEDED.filter(t => !have.has(t));
      if (miss.length) return 'الملف مو من سما صاع (ناقصه جداول: ' + miss.join('، ') + ') — البيانات الحالية ما تغيّرت';
      return null;
    } catch {
      return 'الملف تالف أو ناقص وما ينفتح — البيانات الحالية ما تغيّرت';
    } finally { try { db && db.close(); } catch { } }
  }

  async function restore(file) {
    if (!file) return;
    let buf = new Uint8Array(await file.arrayBuffer());
    if (buf[0] === 0x7b) { // نسخة .json
      try { const j = JSON.parse(new TextDecoder().decode(buf)); if (j.app !== 'sama-saa' || !j.sqlite_base64) throw 0; buf = fromB64(j.sqlite_base64); }
      catch { return toast('الملف مو نسخة سما صاع صحيحة', true); }
    }
    if (new TextDecoder().decode(buf.slice(0, MAGIC.length)) !== MAGIC) return toast('الملف مو نسخة سما صاع صحيحة (لازم يكون ملف نزلته من هنا)', true);
    const bad = await checkCopy(buf);
    if (bad) return toast(bad, true);
    if (!confirm(`بنستبدل كل البيانات الحالية في هالمتصفح بالنسخة «${file.name}».\nأي شي انضاف بعد هالنسخة بيروح.\nنكمل؟`)) return;
    await putDb(buf);
    try { localStorage.removeItem('saa_token'); localStorage.removeItem('saa_uid'); } catch { }
    location.hash = ''; location.reload();
  }

  function card() {
    const last = store.get(LAST), old = daysSince(last) > 7;
    return `<section class="card sx-backup" style="margin-top:18px">
      <div class="sec-h"><h2>النسخ الاحتياطي</h2></div>
      <p class="muted small" style="margin:0 0 10px">البيانات محفوظة في هالمتصفح بس. نزّل نسخة بشكل دوري واحفظها في مكان آمن، عشان لو انمسح المتصفح أو تبي تنقل لجهاز ثاني.</p>
      <div class="alert ${old ? 'amb' : 'g'}" style="margin-bottom:12px">آخر نسخة: <b>${nice(last)}</b>${old && last ? ' — صار لها أكثر من أسبوع' : ''}</div>
      <div class="acts-row">
        <button class="btn pri" id="sxDown" type="button">⬇ نزّل نسخة احتياطية</button>
        <label class="btn" style="cursor:pointer">⬆ استرجع من ملف<input id="sxUp" type="file" accept=".json,.sqlite,.db" hidden></label>
      </div>
      <p class="muted small" style="margin:10px 0 0">الاسترجاع يستبدل كل البيانات الحالية ويطلعك من الحساب.</p>
    </section>`;
  }

  function render() {
    const main = document.getElementById('main');
    if (!main || location.hash !== '#/settings') return;
    const h1 = main.querySelector('h1');
    if (!h1 || h1.textContent.trim() !== 'الإعدادات') return;
    const box = main.querySelector('.sx-backup');
    if (box) box.outerHTML = card(); else main.insertAdjacentHTML('beforeend', card());
    main.querySelector('#sxDown').onclick = () => download().catch(e => toast(e.message, true));
    main.querySelector('#sxUp').onchange = e => restore(e.target.files[0]).catch(er => toast(er.message, true));
  }

  let pending = false;
  new MutationObserver(() => {
    if (pending) return; pending = true;
    setTimeout(() => {
      pending = false;
      const main = document.getElementById('main');
      if (main && location.hash === '#/settings' && !main.querySelector('.sx-backup')) render();
    });
  }).observe(document.getElementById('app'), { childList: true, subtree: true });
  // لو صفحة الإعدادات انرسمت قبل ما يشتغل هالملف
  render();
})();
