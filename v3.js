// سما صاع v3 — أيقونات القائمة، وحالة «جاري الحفظ» للأزرار الرئيسية في النوافذ
(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = 'v3.css';
  document.head.appendChild(css);

  // أيقونات بخط رفيع (stroke) تتبع لون النص
  const P = {
    '#/': '<path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z"/>',
    '#/owners': '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4"/>',
    '#/alerts': '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    '#/calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    '#/maintenance': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
    '#/tenants': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    '#/collections': '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    '#/users': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M19 4l2 2-2 2"/>',
    '#/audit': '<path d="M12 8v4l3 3"/><path d="M3.05 11a9 9 0 1 1 .5 4M3 4v5h5"/>',
    '#/settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    '#/account': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.66V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.66"/>',
    '#/home': '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  };
  const svg = d => `<svg class="v3i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

  function addIcons() {
    document.querySelectorAll('.top .nav > a[href], .top .nav > #logout').forEach(el => {
      if (el.querySelector('.v3i')) return;
      const d = P[el.id === 'logout' ? 'logout' : el.getAttribute('href')];
      if (d) el.insertAdjacentHTML('afterbegin', svg(d));
    });
  }

  // زر الحفظ في النافذة: يدوّر لين تنسكّر النافذة أو يطلع خطأ (وبحد أقصى ٦ ثواني)
  document.addEventListener('click', e => {
    const b = e.target.closest('.mdl .mf .btn.pri');
    if (!b || b.disabled) return;
    const mdl = b.closest('.mdl');
    // خطأ جديد = عنصر .err جديد أو نصه تغيّر عن قبل الضغطة
    const sig = () => { const e = mdl.querySelector('.err'); return e ? [e, e.textContent] : null; };
    const before = sig();
    const newErr = () => { const s = sig(); return !!s && (!before || s[0] !== before[0] || s[1] !== before[1]); };
    requestAnimationFrame(() => {
      if (!document.contains(b) || newErr()) return; // النافذة انسكرت أو الخطأ طلع على طول
      b.setAttribute('aria-busy', 'true');
      const done = () => { b.removeAttribute('aria-busy'); ob.disconnect(); clearTimeout(t); };
      const ob = new MutationObserver(() => { if (!document.contains(b) || newErr()) done(); });
      ob.observe(document.body, { childList: true, subtree: true, characterData: true });
      const t = setTimeout(done, 6000);
    });
  }, true);

  // ---------- أشكال الأزرار المختارة (v3-buttons.css) ----------
  const css2 = document.createElement('link');
  css2.rel = 'stylesheet'; css2.href = 'v3-buttons.css';
  document.head.appendChild(css2);
  // الصفحة الأولى (نبذة الشركة والخدمات) قبل شاشة الدخول
  const lp = document.createElement('script');
  lp.src = 'landing.js'; lp.defer = true;
  document.head.appendChild(lp);

  const I = {
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    up: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    up_arrow: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    back: '<circle cx="12" cy="12" r="10"/><path d="M12 8l-4 4 4 4M16 12H8"/>',
  };
  // الكلمة في نص الزر ← الأيقونة (أول تطابق يفوز)
  const RULES = [
    [/^\+/, 'plus'], [/حفظ|Save/i, 'save'], [/واتساب|إرسال|ارسال|WhatsApp|Send/i, 'send'],
    [/تعديل|Edit/i, 'edit'], [/حذف|Delete/i, 'trash'], [/طباعة|اطبع|Print/i, 'print'],
    [/تحميل|تصدير|نزّل|تنزيل|Export|Download/i, 'down'], [/استيراد|استرجع|رفع|Import|Upload/i, 'up'],
    [/إلغاء|Cancel/i, 'x'], [/دخول|Log ?in|Sign in/i, 'login'], [/فتح|قفل|Lock|Unlock/i, 'lock'],
    [/عرض|View|كشف|سند/i, 'file'], [/إضافة|أضف|جديد|Add|New/i, 'plus'],
  ];
  const icon = (k, cls) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
  function decorateButtons(root) {
    root.querySelectorAll('.btn:not([data-v3i])').forEach(b => {
      b.dataset.v3i = '1';
      if (b.querySelector('svg, img')) return;
      const t = b.textContent.trim();
      const hit = RULES.find(([re]) => re.test(t));
      if (!hit) return;
      // نشيل الرمز النصي القديم (+ ⬇ ⬆ 🔒) لأن الأيقونة تغني عنه
      const first = [...b.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (first) first.textContent = first.textContent.replace(/^\s*(\+|⬇|⬆|🔒|←|→)\s*/u, '');
      b.insertAdjacentHTML('afterbegin', icon(hit[1], 'v3bi'));
    });
  }

  // أزرار دائرية عايمة: فوق + بحث
  function addFabs() {
    if (document.querySelector('.v3-fabs')) return;
    const box = document.createElement('div');
    box.className = 'v3-fabs sx-no-tr';
    const en = document.documentElement.classList.contains('sx-en');
    box.innerHTML = `<button type="button" class="v3-fab" data-f="top" aria-label="${en ? 'Back to top' : 'لفوق'}" title="${en ? 'Back to top' : 'لفوق'}" hidden>${icon('up_arrow', '')}</button>
      <button type="button" class="v3-fab" data-f="search" aria-label="${en ? 'Search' : 'بحث'}" title="${en ? 'Search' : 'بحث'}">${icon('search', '')}</button>`;
    box.addEventListener('click', e => {
      const f = e.target.closest('.v3-fab'); if (!f) return;
      if (f.dataset.f === 'top') scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      else document.getElementById('gsBtn')?.click();
    });
    document.body.appendChild(box);
    const topBtn = box.querySelector('[data-f="top"]');
    const onScroll = () => { topBtn.hidden = scrollY < 400; };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // زر الرجوع فوق الصفحات الداخلية (مو اللوحة الرئيسية)
  function addBack() {
    const head = document.querySelector('main > .head');
    if (!head || head.querySelector('.v3-back')) return;
    const h = location.hash || '#/';
    if (h === '#/' || h === '#' || h === '#/home') return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'v3-back';
    b.setAttribute('aria-label', document.documentElement.classList.contains('sx-en') ? 'Back' : 'رجوع');
    b.innerHTML = icon('back', '');
    b.addEventListener('click', () => { if (history.length > 1) history.back(); else location.hash = '#/'; });
    head.prepend(b);
  }

  // شعار السندات والكشوفات: الصورة القديمة فيها خط العلم الأبيض شفاف، فيطلع بلون الخلفية (أزرق).
  // نبدّلها بنفس طبقات شعار القائمة، مع طبقة الأبيض، عشان يبين كامل على أي خلفية.
  const RLOGO = '<span class="v3-rlogo" role="img" aria-label="SAMA SAA Real Estate">'
    + ['lg-mark-light', 'lg-red', 'lg-green', 'lg-white-full', 'lg-text-light'].map(f => `<img src="logo/${f}.webp" alt="">`).join('') + '</span>';
  function fixLogos(root) {
    (root || document).querySelectorAll('img.rlogo:not(.v3-old)').forEach(img => {
      const box = img.parentElement;
      if (!box.querySelector(':scope > .v3-rlogo')) img.insertAdjacentHTML('beforebegin', RLOGO);
      img.classList.add('v3-old');
    });
  }
  window.v3FixLogos = fixLogos; // savePdf يناديها على ورقة الـ PDF قبل الرسم

  // i18n.js ممكن يشتغل بعدنا، فنحدّث عناوين الأزرار حسب اللغة كل مرة
  function labelFabs() {
    const en = document.documentElement.classList.contains('sx-en');
    document.querySelectorAll('.v3-fab').forEach(b => { const t = b.dataset.f === 'top' ? (en ? 'Back to top' : 'لفوق') : (en ? 'Search' : 'بحث'); if (b.title !== t) { b.title = t; b.setAttribute('aria-label', t); } });
    const back = document.querySelector('.v3-back'); if (back) back.setAttribute('aria-label', en ? 'Back' : 'رجوع');
  }
  const tick = () => { addIcons(); decorateButtons(document); if (document.querySelector('.top')) addFabs(); addBack(); labelFabs(); fixLogos(); };
  let queued = false;
  // setTimeout مو requestAnimationFrame: الثاني يوقف لو الصفحة مفتوحة بتبويب مخفي، فما تنضاف الأزرار
  const ob = new MutationObserver(() => { if (queued) return; queued = true; setTimeout(() => { queued = false; tick(); }, 30); });
  ob.observe(document.body, { childList: true, subtree: true });
  tick();
})();
