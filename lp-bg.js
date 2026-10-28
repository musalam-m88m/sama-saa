// سما صاع — تجربة ٩ خلفيات متحركة للصفحة الأولى (غير خيوط شاشة دخول النظام).
// تنحمّل من landing.js لما الصفحة الأولى تنفتح. الاختيار يتحفظ في هالمتصفح. Vanta.js (MIT) فوق Three.js r134.
(() => {
  const KEY = 'saa_lpbg';
  const V = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.';
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js';
  const B = 0x0c77ad, SKY = 0x38bdf8, NAVY = 0x07141f, WHITE = 0xffffff;
  const LIGHT = () => document.documentElement.dataset.skin === 'sand';
  // الاسم، اسم التأثير في Vanta، والإعدادات
  const LIST = [
    ['net', 'الأصلي (خيوط)', null],
    ['waves', 'موج', 'WAVES', () => ({ color: LIGHT() ? 0x2a8fc4 : 0x0a4f74, shininess: 45, waveHeight: 16, waveSpeed: .7, zoom: .9 })],
    ['globe', 'كرة أرضية', 'GLOBE', () => ({ color: SKY, color2: WHITE, backgroundColor: LIGHT() ? 0x0c77ad : NAVY, size: 1.1 })],
    ['dots', 'نقاط', 'DOTS', () => ({ color: SKY, color2: B, backgroundColor: LIGHT() ? 0x0c77ad : NAVY, size: 3.2, spacing: 32, showLines: false })],
    ['rings', 'حلقات', 'RINGS', () => ({ backgroundColor: LIGHT() ? 0x0c77ad : NAVY, color: SKY, backgroundAlpha: 1 })],
    ['halo', 'هالة', 'HALO', () => ({ baseColor: B, backgroundColor: LIGHT() ? 0x0c77ad : NAVY, amplitudeFactor: 1.4, size: 1.3, xOffset: 0, yOffset: -.12 })],
    ['fog', 'ضباب', 'FOG', () => ({ highlightColor: SKY, midtoneColor: B, lowlightColor: NAVY, baseColor: LIGHT() ? 0x0c77ad : NAVY, blurFactor: .62, speed: 1.1, zoom: .9 })],
    ['cells', 'خلايا', 'CELLS', () => ({ color1: B, color2: SKY, size: 1.6, speed: 1.1 })],
    ['birds', 'طيور', 'BIRDS', () => ({ backgroundColor: LIGHT() ? 0x0c77ad : NAVY, color1: SKY, color2: WHITE, colorMode: 'lerp', quantity: 3, birdSize: 1.2, speed: 1.2 })],
    ['clouds', 'غيوم', 'CLOUDS', () => ({ skyColor: B, cloudColor: 0xb8dcf0, cloudShadowColor: 0x07314a, sunColor: 0xffd27a, sunGlareColor: 0xffb04a, sunlightColor: 0xffd27a, speed: .8 })],
  ];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loaded = {};
  const js = src => loaded[src] || (loaded[src] = new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }));
  const get = () => { try { const v = localStorage.getItem(KEY); if (LIST.some(l => l[0] === v)) return v; } catch { } return 'net'; };
  let fx = null, box = null, cur = null, token = 0;

  function stop() { if (fx) { try { fx.destroy(); } catch { } fx = null; } if (box) { box.remove(); box = null; } document.documentElement.classList.remove('lp-bg-on'); }
  async function set(id) {
    try { localStorage.setItem(KEY, id); } catch { }
    cur = id; const my = ++token;
    paint();
    stop();
    const item = LIST.find(l => l[0] === id);
    if (!item || !item[2] || reduce) return; // «الأصلي» = خيوط شاشة الدخول كما هي
    box = document.createElement('div'); box.id = 'lp-bg'; box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);
    document.documentElement.classList.add('lp-bg-on');
    try {
      if (!window.THREE) await js(THREE_URL);
      await js(V + item[2].toLowerCase() + '.min.js');
      if (my !== token || !box) return;
      fx = window.VANTA[item[2]]({ el: box, mouseControls: true, touchControls: true, gyroControls: false, scale: 1, scaleMobile: 1, ...item[3]() });
    } catch { stop(); }
  }

  // لوحة الاختيار
  let pick = null;
  function paint() { if (pick) pick.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === cur))); }
  function mount() {
    if (pick) return;
    pick = document.createElement('div');
    pick.className = 'lp-bgpick sx-no-tr'; pick.setAttribute('role', 'group'); pick.setAttribute('aria-label', 'خلفية الصفحة الأولى');
    pick.innerHTML = '<b>الخلفية</b>' + LIST.map(([v, t], i) => `<button type="button" data-v="${v}" title="${t}">${i === 0 ? '٠' : '١٢٣٤٥٦٧٨٩'[i - 1]}<span>${t}</span></button>`).join('');
    pick.addEventListener('click', e => { const b = e.target.closest('button'); if (b) set(b.dataset.v); });
    document.body.appendChild(pick);
  }
  function unmount() { stop(); if (pick) { pick.remove(); pick = null; } }

  // يرجع يرسم بألوان الوضع الجديد لما يتغير داكن/فاتح
  new MutationObserver(() => { if (pick && cur && cur !== 'net') set(cur); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-skin'] });

  window.lpBg = { show() { mount(); set(get()); }, hide: unmount };
})();
