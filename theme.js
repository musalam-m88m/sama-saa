// سما صاع — حركات الواجهة (ملف منفصل عن منطق التطبيق)
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // خط العناوين الكوفي للوحة الأداء
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@500;600&display=swap';
  document.head.appendChild(font);

  // ثلاث تصاميم: ليل (الافتراضي) / رمل / ذهب — الاختيار يتحفظ في هالمتصفح
  const skins = document.createElement('link');
  skins.rel = 'stylesheet'; skins.href = 'skins.css';
  document.head.appendChild(skins);
  const board = document.createElement('link');
  board.rel = 'stylesheet'; board.href = 'board.css';
  document.head.appendChild(board);
  const motion = document.createElement('link');
  motion.rel = 'stylesheet'; motion.href = 'motion.css';
  document.head.appendChild(motion);
  // شكل الأزرار «صلب ناعم»
  const buttons = document.createElement('link');
  buttons.rel = 'stylesheet'; buttons.href = 'buttons.css';
  document.head.appendChild(buttons);
  try { localStorage.removeItem('saa_btn'); } catch { }

  try { localStorage.removeItem('saa_btry'); } catch { }
  const i18n = document.createElement('script');
  i18n.src = 'i18n.js';
  document.head.appendChild(i18n);
  // وضعين بس: داكن (sky: سماوي غامق) وفاتح (sand: أبيض مع سماوي غامق). زر واحد يبدّل بينهم، والاختيار يتحفظ في هالمتصفح.
  // أول زيارة تمشي مع إعداد الجهاز؛ أي اختيار قديم ثاني (ليل) يصير داكن.
  const getSkin = () => {
    try { const v = localStorage.getItem('saa_skin'); if (v === 'sky' || v === 'sand') return v; if (v) return 'sky'; } catch { }
    return matchMedia('(prefers-color-scheme: light)').matches ? 'sand' : 'sky';
  };
  const isEn = () => document.documentElement.classList.contains('sx-en');
  function paintToggle(b, s) {
    const dark = s !== 'sand';
    const html = `<i aria-hidden="true">${dark ? '☾' : '☀'}</i><span>${isEn() ? (dark ? 'Dark' : 'Light') : (dark ? 'داكن' : 'فاتح')}</span>`;
    if (b.dataset.h !== html) { b.innerHTML = html; b.dataset.h = html; }
    b.setAttribute('aria-pressed', String(!dark));
    b.setAttribute('aria-label', isEn() ? 'Light mode' : 'الوضع الفاتح');
  }
  function setSkin(s) {
    document.documentElement.setAttribute('data-skin', s);
    try { localStorage.setItem('saa_skin', s); } catch { }
    document.querySelectorAll('.sx-mode').forEach(b => paintToggle(b, s));
    if (typeof restartVanta === 'function' && document.querySelector('.login-wrap')) setTimeout(restartVanta, 450); // بعد ما يخلص تلاشي الألوان
  }
  setSkin(getSkin());
  function addSwitcher() {
    const nav = document.querySelector('.top .nav');
    if (!nav || nav.querySelector('.sx-mode')) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sx-mode sx-no-tr';
    paintToggle(b, getSkin());
    b.addEventListener('click', () => {
      document.documentElement.classList.add('sx-swap');
      setSkin(getSkin() === 'sand' ? 'sky' : 'sand');
      setTimeout(() => document.documentElement.classList.remove('sx-swap'), 400);
    });
    nav.appendChild(b);
  }
  new MutationObserver(addSwitcher).observe(document.getElementById('app'), { childList: true });

  try { localStorage.removeItem('saa_shine'); } catch { }

  // صفحة الدخول: خانتين اللغة (ع / EN) وزر داكن/فاتح فوق
  function addLoginBar() {
    const wrap = document.querySelector('.login-wrap');
    if (!wrap || wrap.querySelector('.sx-loginbar')) return;
    let cur = 'ar'; try { cur = localStorage.getItem('saa_lang') === 'en' ? 'en' : 'ar'; } catch { }
    const bar = document.createElement('div');
    bar.className = 'sx-loginbar sx-no-tr';
    bar.innerHTML = `<div class="sx-langseg" role="group" aria-label="Language / اللغة">
        <button type="button" data-l="ar" aria-pressed="${cur === 'ar'}" class="${cur === 'ar' ? 'on' : ''}">عربي</button>
        <button type="button" data-l="en" aria-pressed="${cur === 'en'}" class="${cur === 'en' ? 'on' : ''}">English</button></div>`;
    bar.querySelector('.sx-langseg').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || b.dataset.l === cur) return;
      try { localStorage.setItem('saa_lang', b.dataset.l); } catch { }
      location.reload();
    });
    const m = document.createElement('button');
    m.type = 'button'; m.className = 'sx-mode';
    paintToggle(m, getSkin());
    m.addEventListener('click', () => {
      document.documentElement.classList.add('sx-swap');
      setSkin(getSkin() === 'sand' ? 'sky' : 'sand');
      setTimeout(() => document.documentElement.classList.remove('sx-swap'), 400);
    });
    bar.appendChild(m);
    wrap.prepend(bar);
    try { localStorage.removeItem('saa_plate'); } catch { }
  }
  new MutationObserver(addLoginBar).observe(document.getElementById('app'), { childList: true });
  new MutationObserver(() => document.querySelectorAll('.sx-mode').forEach(b => paintToggle(b, getSkin())))
    .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  addSwitcher();

  // الأرقام تعد من الصفر لين قيمتها
  function countUp(el) {
    if (el.dataset.sxDone) return;
    el.dataset.sxDone = '1';
    const raw = el.textContent;
    el.dataset.final = raw;
    const m = raw.match(/[\d,]+(\.\d+)?/);
    if (!m) return;
    const to = parseFloat(m[0].replace(/,/g, ''));
    if (!isFinite(to) || to === 0) return;
    const dec = m[1] ? m[1].length - 1 : 0;
    const fmt = v => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const t0 = performance.now(), dur = 1200;
    const step = now => {
      const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = raw.replace(m[0], fmt(to * e));
      if (k < 1) requestAnimationFrame(step); else el.textContent = raw;
    };
    requestAnimationFrame(step);
  }

  // الخطوط في الرسوم ترتسم
  function drawLines(main) {
    main.querySelectorAll('.plot path').forEach(p => {
      if (p.classList.contains('sx-draw')) return;
      const fill = getComputedStyle(p).fill;
      if (fill && fill !== 'none' && fill !== 'transparent' && fill !== 'rgba(0, 0, 0, 0)') return;
      const len = p.getTotalLength ? p.getTotalLength() : 0;
      if (len < 20) return;
      p.style.setProperty('--len', Math.ceil(len));
      p.classList.add('sx-draw');
    });
  }

  // رسوم بيانية بستايل «Data Signal»: تدرج لوني، أعمدة نقطية مثل شاشة LED، وتوهج عند التمرير
  const NS = 'http://www.w3.org/2000/svg';
  let gid = 0;
  function styleChart(svg) {
    if (svg.dataset.sx) return;
    svg.dataset.sx = '1';
    const id = 'sx' + (++gid);
    const defs = document.createElementNS(NS, 'defs');
    defs.innerHTML = `
      <pattern id="${id}-dots" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="4" height="4" rx="1" fill="#fff"/></pattern>
      <mask id="${id}-mask" maskContentUnits="userSpaceOnUse"><rect x="-5000" y="-5000" width="10000" height="10000" fill="url(#${id}-dots)"/></mask>
      <filter id="${id}-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    const grads = {};
    const gradFor = (col, horiz) => {
      const key = col + (horiz ? 'h' : 'v');
      if (grads[key]) return grads[key];
      const gidn = `${id}-g${Object.keys(grads).length}`;
      const g = document.createElementNS(NS, 'linearGradient');
      g.id = gidn;
      if (horiz) { g.setAttribute('x1', '0'); g.setAttribute('x2', '1'); g.setAttribute('y1', '0'); g.setAttribute('y2', '0'); }
      else { g.setAttribute('x1', '0'); g.setAttribute('x2', '0'); g.setAttribute('y1', '0'); g.setAttribute('y2', '1'); }
      g.innerHTML = `<stop offset="0" style="stop-color:${col};stop-opacity:${horiz ? .55 : 1}"/><stop offset="1" style="stop-color:${col};stop-opacity:${horiz ? 1 : .35}"/>`;
      defs.appendChild(g);
      return (grads[key] = gidn);
    };
    svg.prepend(defs);
    svg.style.setProperty('--sx-glow', `url(#${id}-glow)`);
    // الأعمدة
    svg.querySelectorAll('.grp .mark').forEach(m => {
      const col = m.getAttribute('fill'); if (!col || !col.startsWith('var(')) return;
      const box = m.getBBox ? m.getBBox() : { width: 0, height: 0 };
      const horiz = box.width > box.height * 2;
      m.setAttribute('fill', `url(#${gradFor(col, horiz)})`);
      if (!horiz) m.setAttribute('mask', `url(#${id}-mask)`);
      m.classList.add(horiz ? 'sx-h' : 'sx-v');
    });
    // المساحة تحت الخط
    svg.querySelectorAll('path:not(.mark):not(.sx-draw)').forEach(p => {
      const col = p.getAttribute('fill'); if (!col || !col.startsWith('var(')) return;
      const gidn = `${id}-area`;
      if (!svg.getElementById(gidn)) {
        const g = document.createElementNS(NS, 'linearGradient');
        g.id = gidn; g.setAttribute('x1', '0'); g.setAttribute('x2', '0'); g.setAttribute('y1', '0'); g.setAttribute('y2', '1');
        g.innerHTML = `<stop offset="0" style="stop-color:${col};stop-opacity:.45"/><stop offset="1" style="stop-color:${col};stop-opacity:0"/>`;
        defs.appendChild(g);
      }
      p.setAttribute('fill', `url(#${gidn})`);
    });
    svg.querySelectorAll('path.sx-draw, circle').forEach(p => p.setAttribute('filter', `url(#${id}-glow)`));
  }

  function onDash() {
    const main = document.querySelector('main');
    if (!main || !main.querySelector(':scope > section.kpis')) return;
    main.querySelectorAll('.hero .hv .num, .kpis .tile .v').forEach(countUp);
    drawLines(main);
    main.querySelectorAll('.plot svg').forEach(styleChart);
    addRings(main);
    addCompare(main);
  }

  // حلقات نسبة (مستوحاة من بطاقات «Dashboard UI») لأي مربع قيمته نسبة مئوية
  function addRings(main) {
    main.querySelectorAll('.kpis .tile').forEach(t => {
      if (t.querySelector('.sx-ring')) return;
      const v = t.querySelector('.v'); if (!v) return;
      const m = (v.dataset.final || v.textContent).match(/([\d.]+)\s*[٪%]|[٪%]\s*([\d.]+)/);
      if (!m) return;
      const pct = Math.max(0, Math.min(100, parseFloat(m[1] || m[2])));
      if (!isFinite(pct)) return;
      const C = 2 * Math.PI * 22;
      t.classList.add('sx-has-ring');
      t.insertAdjacentHTML('beforeend', `<svg class="sx-ring" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="22" class="trk"/><circle cx="28" cy="28" r="22" class="val" style="--c:${C.toFixed(1)};--o:${(C * (1 - pct / 100)).toFixed(1)}"/></svg>`);
      const meter = t.querySelector('.meter'); if (meter) meter.style.display = 'none';
    });
  }

  // بطاقة «المستحق مقابل المحصّل» (مستوحاة من «Growth Analytics»): رقم كبير وعمودين متقابلين فوق خلفية ضبابية
  function addCompare(main) {
    const kpis = main.querySelector(':scope > section.kpis');
    if (!kpis || main.querySelector('.sx-compare')) return;
    const hero = kpis.querySelector('.hero'); if (!hero) return;
    const got = parseFloat((hero.querySelector('.hv .num')?.dataset.final || hero.querySelector('.hv .num')?.textContent || '').replace(/,/g, ''));
    const sub = hero.querySelector('.small')?.textContent || '';
    const dm = sub.match(/من أصل\s*([\d,]+)/); if (!dm || !isFinite(got)) return;
    const due = parseFloat(dm[1].replace(/,/g, '')); if (!(due > 0)) return;
    const pct = Math.round(got / due * 1000) / 10, left = Math.max(0, due - got);
    const f = n => Math.round(n).toLocaleString('en-US');
    // الباقي فيه متأخر (فات موعده) وفيه دفعات ما حل موعدها للحين — نفصلهم عشان ما يبان الباقي كله متأخر
    const lateTile = [...kpis.querySelectorAll('.tile')].find(t => /المتأخر|Overdue/i.test(t.querySelector('.k')?.textContent || ''));
    const late = Math.min(left, parseFloat(((lateTile?.querySelector('.v')?.dataset.final || lateTile?.querySelector('.v')?.textContent || '').match(/[\d,.]+/) || ['0'])[0].replace(/,/g, '')) || 0);
    kpis.insertAdjacentHTML('afterend', `<section class="card sx-compare">
      <div class="sx-cmp-txt"><div class="k">المحصّل من مستحق السنة كاملة</div><div class="sx-cmp-pct"><span class="num">${pct}</span>%</div>
        <div class="small muted">باقي <b class="num">${f(left)}</b> درهم: <b class="num">${f(late)}</b> متأخر، و<b class="num">${f(left - late)}</b> ما حل موعده للحين</div></div>
      <div class="sx-cmp-bars"><div class="sx-bar due" style="--h:100%"><span>المستحق</span><b class="num">${f(due)}</b></div><div class="sx-bar got" style="--h:${Math.min(100, got / due * 100).toFixed(1)}%"><span>المحصّل</span><b class="num">${f(got)}</b></div></div>
    </section>`);
  }

  // تموّج عند الضغط على أي زر
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn, .chip');
    if (!b || reduce || b.disabled) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
    const w = document.createElement('span');
    w.className = 'sx-ripple';
    w.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(w);
    setTimeout(() => w.remove(), 600);
  });

  // شعار سما صاع الأصلي (نفس الشكل والألوان) مقسّم لطبقات في logo/ عشان يتحرك:
  // السقف والبرج يطلعون من تحت، الأحمر والأخضر ينمسحون لفوق، والاسم يطلع. في القائمة بدون الاسم.
  const LOGO = (full) => `<span class="sx-logo${full ? ' full' : ''}" role="img" aria-label="SAMA SAA Real Estate">
    <img class="sx-l-mark l" src="logo/lg-mark-light.webp" alt=""><img class="sx-l-mark d" src="logo/lg-mark-dark.webp" alt="">
    <img class="sx-l-red" src="logo/lg-red.webp" alt=""><img class="sx-l-green" src="logo/lg-green.webp" alt=""><img class="sx-l-white d" src="logo/lg-white.webp" alt="">${full ? '<img class="sx-l-white-full" src="logo/lg-white-full.webp" alt="">' : ''}
    ${full ? '<img class="sx-l-text l" src="logo/lg-text-light.webp" alt=""><img class="sx-l-text d" src="logo/lg-text-dark.webp" alt="">' : ''}
  </span>`;
  function swapLogos() {
    const lg = document.querySelector('.login .logo');
    if (lg && !lg.querySelector('.sx-logo')) lg.insertAdjacentHTML('afterbegin', LOGO(true));
    const br = document.querySelector('.brand');
    if (br && !br.querySelector('.sx-logo')) br.insertAdjacentHTML('afterbegin', LOGO(false));
  }
  swapLogos();
  new MutationObserver(swapLogos).observe(document.getElementById('app'), { childList: true });

  // خط بنفسجي يمشي فوق الصفحة كل ما تتغيّر الصفحة
  const bar = document.createElement('div');
  bar.className = 'sx-route'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  addEventListener('hashchange', () => { bar.classList.remove('go'); void bar.offsetWidth; bar.classList.add('go'); });

  // خلفية شبكة خيوط متحركة لصفحة الدخول بس — Vanta.js NET (vantajs.com, MIT) فوق Three.js r134.
  // انختارت من تجربة خيوط/موج/كرة/ضباب. تنزل وقت ما تفتح صفحة الدخول، وتنشال أول ما تدخل.
  // ما تشتغل مع «قلّل الحركة» أو الأجهزة الضعيفة.
  try { localStorage.removeItem('saa_bg'); } catch { }
  let vanta = null, vantaLoading = null;
  const loadJs = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  const toHex = c => { const m = c.match(/\d+/g); return m ? (m[0] << 16) + (m[1] << 8) + (+m[2]) : 0x7b39fc; };
  const cssHex = v => { const t = document.createElement('i'); t.style.color = v; document.body.appendChild(t); const h = toHex(getComputedStyle(t).color); t.remove(); return h; };
  const vantaOpts = box => ({ el: box, mouseControls: true, touchControls: false, gyroControls: false, scale: 1, scaleMobile: 1,
    color: cssHex('var(--k1, #0284c7)'), backgroundColor: toHex(getComputedStyle(document.body).backgroundColor),
    points: innerWidth < 640 ? 7 : 10, maxDistance: 22, spacing: 18 });
  function stopVanta() { if (vanta) { vanta.destroy(); vanta = null; } document.getElementById('sx-vanta')?.remove(); }
  function onLogin() {
    const wrap = document.querySelector('.login-wrap');
    // الصفحة الأولى مفتوحة فوقها بخلفيتها (الضباب): نوقف الخيوط عشان ما يشتغل رسمين مع بعض
    if (!wrap || document.documentElement.classList.contains('lp-open')) { stopVanta(); return; }
    if (vanta || vantaLoading || reduce || (navigator.hardwareConcurrency || 4) < 4) return;
    let box = document.getElementById('sx-vanta');
    if (!box) { box = document.createElement('div'); box.id = 'sx-vanta'; box.setAttribute('aria-hidden', 'true'); document.body.prepend(box); }
    vantaLoading = (window.THREE ? Promise.resolve() : loadJs('https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js'))
      .then(() => window.VANTA && VANTA.NET ? null : loadJs('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js'))
      .then(() => {
        if (!document.querySelector('.login-wrap')) { box.remove(); return; }
        vanta = VANTA.NET(vantaOpts(box));
        box.classList.add('on');
      })
      .catch(() => box.remove())
      .finally(() => { vantaLoading = null; if (vantaAgain) { vantaAgain = false; restartVanta(); } });
  }
  // يعيد رسم الخلفية بألوان الوضع الجديد لما يتغير داكن/فاتح
  // (لو للحين تتحمّل، نعيد الرسم بعد ما تخلص عشان ما تبقى بألوان الوضع القديم)
  let vantaAgain = false;
  function restartVanta() {
    if (!document.querySelector('.login-wrap')) return;
    if (vantaLoading) { vantaAgain = true; return; }
    if (!vanta) return;
    stopVanta(); onLogin();
  }
  window.sxNet = { stop: stopVanta, check: onLogin };
  onLogin();
  addLoginBar();
  new MutationObserver(onLogin).observe(document.getElementById('app'), { childList: true });

  // ظهور مع السكرول: البطاقات اللي تحت الشاشة تطلع لفوق وحدة ورا وحدة لما توصل لها
  const io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, sibs = [...el.parentElement.children].filter(c => c.classList.contains('sx-rv') && !c.classList.contains('sx-rv-in'));
    el.style.transitionDelay = Math.min(sibs.indexOf(el), 4) * 70 + 'ms';
    el.classList.add('sx-rv-in'); io.unobserve(el);
  }), { rootMargin: '0px 0px -8% 0px' }) : null;
  function onReveal() {
    if (!io) return;
    const h = innerHeight;
    document.querySelectorAll('main .card:not(.sx-rv), main .tile:not(.sx-rv)').forEach(el => {
      if (el.closest('.sx-rv:not(.sx-rv-in)')) return;
      if (el.getBoundingClientRect().top < h) return; // اللي باين من أول ما يتحرك
      el.classList.add('sx-rv'); io.observe(el);
    });
  }

  if (!reduce) {
    let pending = false;
    new MutationObserver(() => {
      if (pending) return;
      pending = true;
      setTimeout(() => { pending = false; onDash(); onReveal(); }, 30);
    }).observe(document.getElementById('app'), { childList: true, subtree: true });
  }
})();
