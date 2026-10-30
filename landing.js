// سما صاع — الصفحة الأولى (قبل الدخول): نبذة عن الشركة والخدمات.
// «إدارة العقارات» يودّي لشاشة دخول النظام، وباقي الخدمات طلب قصير ينرسل على الواتساب.
(() => {
  // ---------- معلومات الشركة (عدّلها هني) ----------
  // whatsapp/phone بصيغة دولية بدون + أو أصفار: 9715XXXXXXXX. لو فاضي، الطلب يطلع ملخّص بدل الإرسال.
  const CO = {
    name: 'سما صاع للعقارات',
    tagline: 'شريككم في إدارة وتأجير وبيع وشراء وتقييم العقارات في دولة الإمارات',
    about: 'نهتم بعقاراتكم كأنها عقاراتنا: نتابع المستأجرين والتحصيل والصيانة، ونرسل للمالك كشفاً واضحاً كل شهر. ونساعدكم في البيع والشراء والتقييم بخبرة في سوق العين وأبوظبي.',
    whatsapp: '',
    phone: '',
    email: '',
    address: 'العين — الإمارات العربية المتحدة',
    mapUrl: 'https://www.google.com/maps/place/%D8%B3%D9%85%D8%A7+%D8%B5%D8%A7%D8%B9+%D9%84%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA+%D9%88%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9+%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9/@24.2179389,55.7597916,17z',
    // إحداثيات المكتب للخريطة (من صفحة الشركة في خرايط قوقل)
    lat: 24.2179389, lng: 55.7597916, mapDemo: false,
    tiktok: '',
    instagram: '',
    website: '',
  };
  // [مفتاح CO، الاسم، الأيقونة، دالة الرابط]
  const SOCIAL = [
    ['whatsapp', 'WhatsApp', 'M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.8 17.7L.1 24l6.4-1.7A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.2-3.5-8.5z', v => 'https://wa.me/' + v],
    ['tiktok', 'TikTok', 'M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z'],
    ['instagram', 'Instagram', 'M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z'],
    ['website', 'Website', 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.6 15.6 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.4 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.4-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z'],
  ];

  // ---------- الخدمات ----------
  const I = {
    manage: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4"/>',
    rent: '<path d="M15 7a4 4 0 1 0-4 4"/><path d="M11 11l-8 8v2h3l1-1v-2h2v-2h2l2-2"/><circle cx="15.5" cy="8.5" r=".5"/>',
    sell: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    buy: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    value: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    done: '<path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M10 7h4M10 11h4M10 15h4"/>',
    build: '<path d="M2 20h20M6 20V10M12 20V4M18 20v-7"/><path d="M4 10h4M10 4h4M16 13h4"/>',
    land: '<path d="M3 20l6-12 4 7 3-4 5 9z"/><circle cx="17" cy="6" r="2"/>',
    back: '<circle cx="12" cy="12" r="10"/><path d="M12 8l-4 4 4 4M16 12H8"/>',
    wa: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.2 2 .8-.5 1.7c-3.5.2-7-3.3-6.8-6.8l1.7-.5.8 2z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
  };
  const svg = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
  const KIND = { done: ['عقارات مكتملة', 'جاهزة للسكن أو الاستخدام', 'done'], build: ['عقارات تحت الإنشاء', 'على الخارطة أو قيد البناء', 'build'], land: ['الأراضي', 'سكنية وتجارية واستثمارية', 'land'] };
  const SERVICES = [
    { id: 'manage', title: 'إدارة العقارات', desc: 'نظامنا لإدارة الملاك والعقارات والعقود والتحصيل والصيانة والكشوفات', icon: 'manage', go: 'system' },
    { id: 'rent', title: 'تأجير العقارات', desc: 'نأجّر عقارك أو نلقى لك العقار المناسب للإيجار', icon: 'rent', kinds: null },
    { id: 'sell', title: 'بيع العقارات', desc: 'نسوّق عقارك ونوصله للمشتري المناسب', icon: 'sell', kinds: ['done', 'build'] },
    { id: 'buy', title: 'شراء العقارات', desc: 'نلقى لك العقار أو الأرض حسب ميزانيتك', icon: 'buy', kinds: ['done', 'build', 'land'] },
    { id: 'value', title: 'تقييم العقارات', desc: 'تقييم عادل لقيمة عقارك أو أرضك في السوق', icon: 'value', kinds: ['done', 'build', 'land'] },
  ];
  const AREAS = ['العين', 'أبوظبي', 'دبي', 'الشارقة', 'غير ذلك'];
  const TYPES = { done: ['شقة', 'فيلا', 'بناية', 'محل / مكتب'], build: ['شقة', 'فيلا', 'بناية', 'مشروع كامل'], land: ['سكنية', 'تجارية', 'استثمارية', 'صناعية'], rent: ['شقة', 'فيلا', 'محل', 'مكتب'] };

  // ---------- متى تطلع ----------
  const loggedIn = () => { try { return !!localStorage.getItem('saa_token'); } catch { return false; } };
  const atHome = () => ['', '#', '#/', '#/home'].includes(location.hash);
  const atHomeExplicit = () => location.hash === '#/home';
  let root = null, state = { step: 'home' };
  const en = () => document.documentElement.classList.contains('sx-en');

  function css() {
    if (document.querySelector('link[href^="landing.css"]')) return;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'landing.css'; document.head.appendChild(l);
  }
  function close() { if (root) { root.remove(); root = null; document.documentElement.classList.remove('lp-open'); if (window.lpBg) window.lpBg.hide(); if (window.sxNet) window.sxNet.check(); } }
  // خلفية الصفحة الأولى المتحركة: ضباب (lp-bg.js)
  function bg() {
    if (window.lpBg) return window.lpBg.show();
    const s = document.createElement('script'); s.src = 'lp-bg.js';
    s.onload = () => { if (root && window.lpBg) window.lpBg.show(); };
    document.head.appendChild(s);
  }
  function sync() {
    // قبل الدخول: الصفحة الأولى هي البداية. بعد الدخول: تنفتح بس من رابط «الصفحة الأولى» (#/home)
    const show = (document.querySelector('.login-wrap') && !loggedIn() && atHome()) || (loggedIn() && atHomeExplicit() && document.querySelector('.top'));
    if (show && !root) open(); else if (!show && root) close();
    addLoginBack(); addNavLink();
  }

  // زر رجوع للصفحة الأولى في شاشة الدخول وشاشة أول تشغيل
  function addLoginBack() {
    const wrap = document.querySelector('.login-wrap');
    if (!wrap || root || wrap.querySelector('.lp-loginback')) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'v3-back lp-loginback';
    b.setAttribute('aria-label', en() ? 'Back to home' : 'رجوع للصفحة الأولى');
    b.innerHTML = svg('back');
    b.addEventListener('click', () => { location.hash = '#/home'; });
    wrap.appendChild(b);
  }
  // رابط «الصفحة الأولى» في قائمة النظام
  function addNavLink() {
    const nav = document.querySelector('.top .nav');
    if (!nav || nav.querySelector('a[href="#/home"]')) return;
    const a = document.createElement('a');
    a.href = '#/home'; a.className = 'lp-navhome';
    a.innerHTML = `<svg class="v3i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I.buy}</svg>الصفحة الأولى`;
    const logout = nav.querySelector('#logout');
    nav.insertBefore(a, logout || null);
    if (window.saaI18n && window.saaI18n.translate) window.saaI18n.translate(a);
  }

  function open() {
    css();
    root = document.createElement('div');
    root.className = 'lp'; root.setAttribute('role', 'main');
    document.body.appendChild(root);
    document.documentElement.classList.add('lp-open');
    state = { step: 'home' }; render();
    bg();
  }

  // جملة الترحيب تحت الشعار في الصفحة الأولى: تطلع كلمة كلمة كل مرة تنرسم الصفحة (أول دخول، أو رجوع من أي خانة)
  const INTRO_LINE = 'عقارك أمانة… ونحن أهلها';

  const LOGO = full => `<span class="sx-logo lp-anim${full ? ' full' : ''}" role="img" aria-label="SAMA SAA Real Estate">
    <img class="sx-l-mark l" src="logo/lg-mark-light.webp" alt=""><img class="sx-l-mark d" src="logo/lg-mark-dark.webp" alt="">
    <img class="sx-l-red" src="logo/lg-red.webp" alt=""><img class="sx-l-green" src="logo/lg-green.webp" alt=""><img class="sx-l-white-full" src="logo/lg-white-full.webp" alt="">
    ${full ? '<img class="sx-l-text l" src="logo/lg-text-light.webp" alt=""><img class="sx-l-text d" src="logo/lg-text-dark.webp" alt="">' : ''}
  </span>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function header() {
    return `<header class="lp-top">
      <button type="button" class="lp-chip lp-tocontact" data-a="contact">${svg('phone', 'v3bi')}تواصل معنا</button>
      <div class="lp-tools">
        <button type="button" class="lp-chip sx-no-tr" data-a="lang" aria-label="${en() ? 'العربية' : 'English'}">${en() ? 'ع' : 'EN'}</button>
        <button type="button" class="lp-chip" data-a="mode" aria-label="داكن / فاتح">${document.documentElement.dataset.skin === 'sand' ? '☾' : '☀'}</button>
        <button type="button" class="btn pri lp-login" data-a="system">${svg('login', 'v3bi')}${loggedIn() ? 'الرجوع للنظام' : 'بوابة الملاك'}</button>
      </div>
    </header>`;
  }

  function viewHome() {
    return `${header()}
    <section class="lp-hero">
      <div class="lp-herologo"><span class="lp-plate">${LOGO(true)}</span></div>
      <p class="lp-intro-line lp-heroline">${INTRO_LINE.split(' ').map((w, i) => `<span style="--w:${i}">${esc(w)}</span>`).join(' ')}</p>
      <h1>${esc(CO.name)}</h1>
      <p class="lp-tag">${esc(CO.tagline)}</p>
      <p class="lp-about">${esc(CO.about)}</p>
    </section>
    <section class="lp-grid" aria-label="خدماتنا">
      ${SERVICES.map((s, i) => `<button type="button" class="lp-card${s.go ? ' lp-main' : ''}" data-s="${s.id}" style="--i:${i}">
        <span class="lp-ic">${svg(s.icon)}</span><b>${s.title}</b><span>${s.desc}</span><i class="lp-go" aria-hidden="true">${svg('back')}</i>
      </button>`).join('')}
    </section>
    ${contact()}`;
  }

  function viewKinds(s) {
    return `${header()}
    <section class="lp-step">
      <button type="button" class="v3-back lp-back" data-a="home" aria-label="رجوع">${svg('back')}</button>
      <div><h2>${s.title}</h2><p class="muted">اختر نوع العقار</p></div>
    </section>
    <section class="lp-grid lp-kinds">
      ${s.kinds.map((k, i) => `<button type="button" class="lp-card" data-k="${k}" style="--i:${i}"><span class="lp-ic">${svg(KIND[k][2])}</span><b>${KIND[k][0]}</b><span>${KIND[k][1]}</span><i class="lp-go" aria-hidden="true">${svg('back')}</i></button>`).join('')}
    </section>`;
  }

  function field(id, label, html, req) { return `<div class="f"><label for="lp_${id}">${label}${req ? ' <span class="lp-req">*</span>' : ''}</label>${html}</div>`; }
  const sel = (id, opts) => `<select id="lp_${id}" name="${id}">${opts.map(o => `<option>${o}</option>`).join('')}</select>`;
  const inp = (id, type = 'text', ph = '', req = false, extra = '') => `<input id="lp_${id}" name="${id}" type="${type}" placeholder="${ph}" ${req ? 'required' : ''} ${extra}>`;

  function viewForm(s, k) {
    const kind = k ? KIND[k][0] : '';
    const types = TYPES[k || 'rent'];
    const extra = s.id === 'buy' ? field('budget', 'الميزانية (درهم)', inp('budget', 'text', 'مثال: 1,500,000', false, 'inputmode="numeric"'))
      : s.id === 'sell' ? field('price', 'السعر المتوقع (درهم)', inp('price', 'text', '', false, 'inputmode="numeric"'))
      : s.id === 'rent' ? field('want', 'تبي', sel('want', ['أستأجر عقار', 'أأجّر عقاري']))
      : field('purpose', 'الغرض من التقييم', sel('purpose', ['بيع', 'شراء', 'تمويل بنكي', 'ورثة / قسمة', 'غير ذلك']));
    return `${header()}
    <section class="lp-step">
      <button type="button" class="v3-back lp-back" data-a="${s.kinds ? 'kinds' : 'home'}" aria-label="رجوع">${svg('back')}</button>
      <div><h2>${s.title}${kind ? ` — ${kind}` : ''}</h2><p class="muted">عبّ البيانات ونتواصل معك</p></div>
    </section>
    <form class="card lp-form" id="lpForm" novalidate>
      <div class="row2">
        ${field('type', 'نوع العقار', sel('type', types))}
        ${field('area', 'المنطقة', sel('area', AREAS))}
      </div>
      <div class="row2">
        ${field('size', k === 'land' ? 'مساحة الأرض (قدم²)' : 'المساحة (قدم²) — اختياري', inp('size', 'text', '', false, 'inputmode="numeric"'))}
        ${extra}
      </div>
      <div class="row2">
        ${field('name', 'الاسم', inp('name', 'text', '', true), true)}
        ${field('mobile', 'رقم الجوال', inp('mobile', 'tel', '05xxxxxxxx', true, 'inputmode="tel"'), true)}
      </div>
      ${field('notes', 'ملاحظات — اختياري', '<textarea id="lp_notes" name="notes" rows="3"></textarea>')}
      <div class="err" id="lpErr" hidden></div>
      <button type="submit" class="btn pri lp-send">${svg('wa', 'v3bi')}إرسال الطلب على الواتساب</button>
    </form>`;
  }

  function viewDone(msg) {
    return `${header()}
    <section class="lp-step">
      <button type="button" class="v3-back lp-back" data-a="form" aria-label="رجوع">${svg('back')}</button>
      <div><h2>${esc(SERVICES.find(x => x.id === state.service).title)}</h2></div>
    </section>
    <section class="card lp-done">
      <span class="lp-ic lp-ok">${svg('done')}</span>
      <h2>${CO.whatsapp ? 'تم تجهيز طلبك' : 'تم استلام طلبك (تجريبي)'}</h2>
      <p class="muted">${CO.whatsapp ? 'انفتح الواتساب برسالة جاهزة، اضغط إرسال فيه.' : 'رقم الواتساب ما انضاف للحين، هذا ملخّص طلبك:'}</p>
      <pre class="wa-preview sx-no-tr">${esc(msg)}</pre>
      <button type="button" class="btn" data-a="home">الرجوع للصفحة الأولى</button>
    </section>`;
  }

  function contact() {
    const mapLink = CO.mapUrl || (CO.lat ? `https://www.google.com/maps/search/?api=1&query=${CO.lat},${CO.lng}` : '');
    const items = [
      CO.whatsapp && `<a class="btn lp-ct" href="https://wa.me/${CO.whatsapp}" target="_blank" rel="noopener">${svg('wa', 'v3bi')}واتساب</a>`,
      CO.phone && `<a class="btn lp-ct" href="tel:+${CO.phone}">${svg('phone', 'v3bi')}اتصال</a>`,
      CO.email && `<a class="btn lp-ct" href="mailto:${CO.email}">${svg('mail', 'v3bi')}إيميل</a>`,
      (mapLink || CO.address) && `<a class="btn lp-ct" ${mapLink ? `href="${esc(mapLink)}" target="_blank" rel="noopener"` : ''}>${svg('pin', 'v3bi')}${esc(CO.address || 'موقعنا')}</a>`,
    ].filter(Boolean);
    // خريطة قوقل مدمجة (ما تحتاج مفتاح)، تنحمّل بس لما يوصل لها الزائر
    const map = CO.lat ? `<div class="lp-map">
        <iframe src="https://maps.google.com/maps?q=${CO.lat},${CO.lng}&z=15&hl=${en() ? 'en' : 'ar'}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(CO.address)}"></iframe>
        <a class="btn pri lp-mapgo" href="${esc(mapLink)}" target="_blank" rel="noopener">${svg('pin', 'v3bi')}افتح في خرايط قوقل</a>
        ${CO.mapDemo ? '<span class="lp-mapdemo">موقع تقريبي للتجربة</span>' : ''}
      </div>` : '';
    const social = SOCIAL.map(([k, label, d, url = v => v]) => `<a class="lp-soc" href="${esc(CO[k] ? url(CO[k]) : '#')}"${CO[k] ? ' target="_blank" rel="noopener"' : ''} aria-label="${label}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg></a>`).join('');
    return `<section class="lp-contact" id="lpContact"><h2>تواصل معنا</h2><div class="lp-ctrow">${items.join('') || '<span class="muted">معلومات التواصل تنضاف قريباً</span>'}</div>
      ${map}
      <div class="lp-social">${social}</div>
      <p class="lp-foot muted small">© ${new Date().getFullYear()} ${esc(CO.name)}</p></section>`;
  }

  function render() {
    if (!root) return;
    const s = SERVICES.find(x => x.id === state.service);
    root.innerHTML = state.step === 'kinds' ? viewKinds(s) : state.step === 'form' ? viewForm(s, state.kind) : state.step === 'done' ? viewDone(state.msg) : viewHome();
    root.dir = en() ? 'ltr' : 'rtl'; root.lang = en() ? 'en' : 'ar';
    root.scrollTop = 0; window.scrollTo(0, 0);
    if (window.saaI18n && window.saaI18n.translate) window.saaI18n.translate(root);
    const f = root.querySelector('#lpForm');
    if (f) {
      f.addEventListener('submit', submit);
      // رجوع من «تم الاستلام»: نرجّع اللي كتبه
      if (state.values) Object.entries(state.values).forEach(([k, v]) => { const el = f.elements[k]; if (el) el.value = v; });
    }
  }

  function submit(e) {
    e.preventDefault();
    const f = e.target, v = Object.fromEntries(new FormData(f).entries());
    const err = m => { const x = root.querySelector('#lpErr'); x.textContent = m; x.hidden = false; };
    const mob = String(v.mobile || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/\D/g, '');
    if (!String(v.name || '').trim()) return err('اكتب الاسم');
    if (mob.length < 9) return err('اكتب رقم جوال صحيح');
    const s = SERVICES.find(x => x.id === state.service);
    // الملخّص (ورسالة الواتساب) بلغة الزائر: بالإنجليزي نترجم العناوين والخيارات، واللي كتبه هو يظل كما هو
    const E = en() && window.saaI18n, L = (ar, enTxt) => E ? enTxt : ar, T = x => E ? saaI18n.text(x) : x;
    const lines = [L(`طلب جديد من موقع ${CO.name}`, 'New request from the Sama Saa Real Estate website'),
      `${L('الخدمة', 'Service')}: ${T(s.title)}${state.kind ? ' — ' + T(KIND[state.kind][0]) : ''}`,
      v.want && `${L('تبي', 'Wants to')}: ${T(v.want)}`, `${L('نوع العقار', 'Property type')}: ${T(v.type)}`, `${L('المنطقة', 'Area')}: ${T(v.area)}`,
      v.size && `${L('المساحة', 'Size')}: ${v.size} ${L('قدم²', 'sq ft')}`,
      v.budget && `${L('الميزانية', 'Budget')}: ${v.budget} ${L('درهم', 'AED')}`, v.price && `${L('السعر المتوقع', 'Expected price')}: ${v.price} ${L('درهم', 'AED')}`,
      v.purpose && `${L('الغرض', 'Purpose')}: ${T(v.purpose)}`,
      `${L('الاسم', 'Name')}: ${String(v.name).trim()}`, `${L('الجوال', 'Mobile')}: ${mob}`, v.notes && `${L('ملاحظات', 'Notes')}: ${String(v.notes).trim()}`].filter(Boolean);
    const msg = lines.join('\n');
    if (CO.whatsapp) window.open(`https://wa.me/${CO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    state = { ...state, step: 'done', msg, values: v }; render();
  }

  // ---------- الضغطات ----------
  document.addEventListener('click', e => {
    if (!root || !root.contains(e.target)) return;
    const a = e.target.closest('[data-a]'), card = e.target.closest('[data-s]'), kind = e.target.closest('[data-k]');
    if (card) {
      const s = SERVICES.find(x => x.id === card.dataset.s);
      if (s.go === 'system') return goSystem();
      return go({ step: s.kinds ? 'kinds' : 'form', service: s.id });
    }
    if (kind) return go({ ...state, step: 'form', kind: kind.dataset.k });
    if (!a) return;
    const act = a.dataset.a;
    if (act === 'system') goSystem();
    else if (act === 'contact') toContact();
    else if (act === 'home') go({ step: 'home' });
    else if (act === 'kinds') go({ step: 'kinds', service: state.service });
    else if (act === 'form') go({ step: 'form', service: state.service, kind: state.kind, values: state.values });
    // داكن/فاتح: نغيّر أيقونة الزر بس، بدون ما نعيد رسم الصفحة (كان يعيد حركة الشعار ويقطّع)
    else if (act === 'mode') { document.querySelector('.login-wrap .sx-mode, .sx-mode')?.click(); setTimeout(() => { a.textContent = document.documentElement.dataset.skin === 'sand' ? '☾' : '☀'; }, 450); }
    else if (act === 'lang') { try { localStorage.setItem('saa_lang', en() ? 'ar' : 'en'); } catch { } location.reload(); }
  });
  // تنقّل ناعم بين الخطوات: المحتوى يختفي بهدوء، ثم الجديد يطلع (lp-in في landing.css)
  let busy = false;
  function go(next) {
    if (busy || !root) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { state = next; return render(); }
    busy = true; root.classList.add('lp-out');
    setTimeout(() => {
      state = next; render(); busy = false;
      if (!root) return;
      root.classList.replace('lp-out', 'lp-in');
      setTimeout(() => root && root.classList.remove('lp-in'), 400);
    }, 160);
  }
  // زر «تواصل معنا» فوق: ينزل بنعومة لقسم التواصل آخر الصفحة الأولى (ولو في خطوة ثانية، يرجع للأولى أول)
  function toContact() {
    const down = () => root && root.querySelector('#lpContact')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    if (state.step === 'home') return down();
    go({ step: 'home' }); setTimeout(down, 450);
  }
  function goSystem() { close(); location.hash = loggedIn() ? '#/' : '#/login'; }

  // ---------- المراقبة ----------
  let q = false;
  new MutationObserver(() => { if (q) return; q = true; setTimeout(() => { q = false; sync(); }, 40); }).observe(document.body, { childList: true, subtree: true });
  addEventListener('hashchange', sync);
  css(); // زر الرجوع في شاشة الدخول يحتاج الستايل حتى لو الصفحة الأولى ما انفتحت
  sync();
})();
