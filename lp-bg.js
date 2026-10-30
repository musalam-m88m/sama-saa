// سما صاع — خلفية الصفحة الأولى المتحركة: ضباب أزرق (غير خيوط شاشة دخول النظام).
// تنحمّل من landing.js لما الصفحة الأولى تنفتح. Vanta.js FOG (MIT) فوق Three.js r134.
(() => {
  const FOG_URL = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js';
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js';
  const B = 0x0c77ad, SKY = 0x38bdf8, NAVY = 0x07141f;
  const LIGHT = () => document.documentElement.dataset.skin === 'sand';
  // الضباب ناعم أصلاً، فنرسمه بنص دقة الشاشة (ربع البكسلات) عشان ما يثقل على الآيباد والتلفون
  const S = (window.devicePixelRatio || 1) * 2;
  // الفاتح: غيوم فاتحة واضحة فوق أزرق (لو الأساس والوسط نفس اللون، الغيوم ما تبين)
  const COLORS = () => LIGHT()
    ? { highlightColor: 0xe0f2fe, midtoneColor: SKY, lowlightColor: 0x0a6496, baseColor: B }
    : { highlightColor: SKY, midtoneColor: B, lowlightColor: NAVY, baseColor: NAVY };
  const opts = () => ({ scale: S, scaleMobile: S, ...COLORS(), blurFactor: .62, speed: 1.1, zoom: .9 });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loaded = {};
  const js = src => loaded[src] || (loaded[src] = new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }));
  let fx = null, box = null, on = false, token = 0;

  function stop() { if (fx) { try { fx.destroy(); } catch { } fx = null; } if (box) { box.remove(); box = null; } document.documentElement.classList.remove('lp-bg-on'); }
  async function start() {
    const my = ++token;
    stop();
    if (window.sxNet) window.sxNet.stop(); // خيوط شاشة الدخول اللي تحت ما تنشاف، فنوقفها
    if (reduce) return; // بدون حركة: تظل خيوط شاشة الدخول كما هي
    box = document.createElement('div'); box.id = 'lp-bg'; box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);
    document.documentElement.classList.add('lp-bg-on');
    try {
      if (!window.THREE) await js(THREE_URL);
      await js(FOG_URL);
      if (my !== token || !box) return;
      fx = window.VANTA.FOG({ el: box, mouseControls: true, touchControls: true, gyroControls: false, ...opts() });
    } catch { stop(); }
  }

  // يرجع يرسم بألوان الوضع الجديد لما يتغير داكن/فاتح
  new MutationObserver(() => { if (on) start(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-skin'] });

  window.lpBg = { show() { on = true; start(); }, hide() { on = false; token++; stop(); } };
})();
