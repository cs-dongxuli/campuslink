/**
 * CampusLink UI 公共库（无依赖、无构建）
 * 暴露为 window.CL.ui
 * 包含：图标、头像、模式徽标、作品封面插画、顶部导航、页脚、Toast、弹窗、
 *       滚动显现动画、数字滚动、Tabs 指示器、格式化工具等。
 */
(function () {
  const CL = (window.CL = window.CL || {});

  /* ---------------- 图标（Lucide 风格，24 栅格） ---------------- */
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/>',
    folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
    shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2Z"/>',
    teach: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    help: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    together: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    branch: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/><path d="M6 9v6"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    list: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8M13 12h8M13 18h8"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"/><path d="M20 17v5H6.5a2.5 2.5 0 0 1 0-5"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>',
    pen: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    thumbsUp: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
    moreV: '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
  };
  const STAR = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
  function icon(name, cls = '') {
    if (name === 'star') return `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor">${STAR}</svg>`;
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[name] || P.info}</svg>`;
  }
  const LOGO = `<svg viewBox="0 0 40 40" fill="none"><circle cx="15" cy="20" r="9" stroke="#2f5bff" stroke-width="4.2"/><circle cx="25" cy="20" r="9" stroke="#ff6b4a" stroke-width="4.2"/><path d="M20 12.6a9 9 0 0 1 0 14.8" stroke="#2f5bff" stroke-width="4.2"/></svg>`;

  /* ---------------- 工具 ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const qs = (k) => new URLSearchParams(location.search).get(k);
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  function timeAgo(iso) {
    const d = (Date.now() - new Date(iso).getTime()) / 1000;
    if (d < 60) return '刚刚';
    if (d < 3600) return Math.floor(d / 60) + ' 分钟前';
    if (d < 86400) return Math.floor(d / 3600) + ' 小时前';
    if (d < 86400 * 7) return Math.floor(d / 86400) + ' 天前';
    return fmtDate(iso);
  }
  function fmtDate(iso, withTime) {
    if (!iso) return '—';
    const d = new Date(iso);
    const p = (n) => String(n).padStart(2, '0');
    let s = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    if (withTime) s += ` ${p(d.getHours())}:${p(d.getMinutes())}`;
    return s;
  }
  function fmtTime(iso) { const d = new Date(iso); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
  function daysLeft(iso) { if (!iso) return null; return Math.ceil((new Date(iso) - Date.now()) / 86400000); }
  function fmtSize(b) { if (b < 1024) return b + ' B'; if (b < 1048576) return (b / 1024).toFixed(1) + ' KB'; return (b / 1048576).toFixed(1) + ' MB'; }
  function fmtBudget(b) {
    if (!b || b.type === 'negotiable') return '<span class="price" style="font-size:15px">面议</span>';
    if (b.type === 'free') return '<span class="price free">免费 / 互助</span>';
    if (b.type === 'credit') return '<span class="price free">学分 / 加分</span>';
    const unit = b.type === 'hourly' ? '/ 小时' : b.type === 'per_session' ? '/ 次' : '';
    const amt = b.max && b.max !== b.min ? `${b.min}-${b.max}` : b.min ?? b.amount;
    return `<span class="price">¥${amt}<small>${unit}</small></span>`;
  }

  /* ---------------- 模式 ---------------- */
  const MODES = {
    teach: { key: 'teach', name: '教我做', icon: 'teach', color: 'var(--teach)', desc: '找导师 · 请教问题', verb: '我来教' },
    help: { key: 'help', name: '帮我做', icon: 'help', color: 'var(--help)', desc: '外包任务 · 按需下单', verb: '我来做' },
    together: { key: 'together', name: '一起做', icon: 'together', color: 'var(--together)', desc: '组队竞赛 · 互补搭档', verb: '我加入' },
  };
  function modeBadge(m) { const x = MODES[m]; return x ? `<span class="mode mode-${m}">${icon(x.icon)}${x.name}</span>` : ''; }

  /* ---------------- 头像 ---------------- */
  const PALETTES = [['#6f8dff', '#2f5bff'], ['#ff9a7a', '#ff6b4a'], ['#52d6a6', '#14a874'], ['#a493ff', '#6a57ff'], ['#4fc3f7', '#0b9ee8'], ['#ffc46b', '#f59e0b'], ['#f78fb3', '#e0487e'], ['#7c8aa8', '#3c4767']];
  function avatar(u, size = '', opts = {}) {
    if (!u) return `<span class="avatar ${size}">?</span>`;
    const pal = PALETTES[(u.avatarColor ?? hash(u.id)) % PALETTES.length];
    const inner = u.avatarUrl ? `<img src="${esc(u.avatarUrl)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">` : esc((u.name || '?').slice(0, 1));
    const v = opts.verified !== false && u.verified ? `<span class="v">${icon('check')}</span>` : '';
    return `<span class="avatar ${size}" style="--c1:${pal[0]};--c2:${pal[1]}" title="${esc(u.name)}">${inner}${v}</span>`;
  }
  function hash(s) { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }
  function stars(n, total = 5) { let s = '<span class="stars">'; for (let i = 1; i <= total; i++) s += icon('star', i <= Math.round(n) ? '' : 'off'); return s + '</span>'; }

  /* ---------------- 作品封面插画（视频中的彩色缩略图） ---------------- */
  function cover(kind = 'app', seed = 0) {
    const pal = [['#2f5bff', '#ff6b4a', '#e8eeff'], ['#6a57ff', '#ffd45c', '#efeaff'], ['#0b9ee8', '#1fb985', '#e1f4fd'], ['#ff6b4a', '#2f5bff', '#fff0eb']][seed % 4];
    const [a, b, bg] = pal;
    const W = 'viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"';
    switch (kind) {
      case 'poster': return `<svg ${W}><rect width="400" height="300" fill="${b}"/><circle cx="290" cy="110" r="70" fill="#ffd45c" opacity=".9"/><circle cx="290" cy="110" r="44" fill="#fff" opacity=".35"/><text x="40" y="190" font-family="Arial Black,Arial" font-weight="900" font-size="64" fill="#fff">FEST</text><rect x="40" y="215" width="140" height="10" rx="5" fill="#fff" opacity=".7"/><rect x="40" y="235" width="90" height="10" rx="5" fill="#fff" opacity=".5"/></svg>`;
      case 'code': return `<svg ${W}><rect width="400" height="300" fill="#141a33"/><circle cx="30" cy="28" r="6" fill="#ff6b4a"/><circle cx="50" cy="28" r="6" fill="#ffd45c"/><circle cx="70" cy="28" r="6" fill="#1fb985"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${30 + (i % 3) * 22}" y="${62 + i * 26}" width="${[180, 120, 220, 90, 160, 200, 70, 140][i]}" height="10" rx="5" fill="${[a, '#7dd3fc', '#a78bfa', '#5b6478', b, '#34d399', '#5b6478', a][i]}" opacity=".9"/>`).join('')}</svg>`;
      case 'chart': return `<svg ${W}><rect width="400" height="300" fill="#eafaf3"/>${[60, 110, 80, 150, 120, 190, 170].map((h, i) => `<rect x="${50 + i * 46}" y="${250 - h}" width="28" height="${h}" rx="6" fill="${i % 2 ? '#1fb985' : '#14a874'}" opacity="${0.55 + i * 0.06}"/>`).join('')}<polyline points="64,170 110,130 156,150 202,90 248,110 294,60 340,70" fill="none" stroke="${a}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'shapes': return `<svg ${W}><rect width="400" height="300" fill="#fff4e0"/><circle cx="150" cy="140" r="70" fill="#ffc46b"/><rect x="190" y="110" width="110" height="110" rx="18" fill="${b}" transform="rotate(14 245 165)"/><polygon points="250,90 320,210 180,210" fill="#1fb985" opacity=".9"/></svg>`;
      case 'video': return `<svg ${W}><defs><linearGradient id="vg${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3f7a"/><stop offset="1" stop-color="#1b1d3a"/></linearGradient></defs><rect width="400" height="300" fill="url(#vg${seed})"/><circle cx="310" cy="80" r="34" fill="#ff8a6b"/><path d="M0 230 Q100 170 200 215 T400 200 V300 H0Z" fill="#2b2e5c"/><circle cx="200" cy="150" r="34" fill="#fff"/><path d="M190 134 L216 150 L190 166Z" fill="#1b1d3a"/></svg>`;
      case 'doc': return `<svg ${W}><rect width="400" height="300" fill="${bg}"/><rect x="110" y="40" width="180" height="230" rx="14" fill="#fff" stroke="${a}" stroke-opacity=".2"/><rect x="134" y="70" width="100" height="12" rx="6" fill="${a}"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="134" y="${102 + i * 22}" width="${[130, 110, 132, 90, 120, 70][i]}" height="8" rx="4" fill="#c9d1e6"/>`).join('')}<circle cx="290" cy="240" r="30" fill="${b}"/><path d="M278 240l8 8 16-16" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
      case 'model': return `<svg ${W}><rect width="400" height="300" fill="#eef1f8"/><g transform="translate(200 160)"><polygon points="0,-90 80,-45 0,0 -80,-45" fill="${a}"/><polygon points="-80,-45 0,0 0,90 -80,45" fill="${a}" opacity=".7"/><polygon points="80,-45 0,0 0,90 80,45" fill="${a}" opacity=".45"/></g><circle cx="320" cy="70" r="16" fill="${b}"/></svg>`;
      case 'web': return `<svg ${W}><rect width="400" height="300" fill="${bg}"/><rect x="40" y="36" width="320" height="228" rx="16" fill="#fff"/><rect x="40" y="36" width="320" height="34" rx="16" fill="${a}" opacity=".12"/><rect x="62" y="96" width="150" height="18" rx="9" fill="#0d1430"/><rect x="62" y="124" width="110" height="10" rx="5" fill="#c9d1e6"/><rect x="62" y="156" width="80" height="28" rx="10" fill="${a}"/><rect x="236" y="92" width="102" height="140" rx="12" fill="${b}" opacity=".85"/></svg>`;
      default: // app 双手机（视频主视觉）
        return `<svg ${W}><rect width="400" height="300" fill="${bg}"/><circle cx="200" cy="160" r="120" fill="#fff" opacity=".55"/><g transform="rotate(-10 150 150)"><rect x="95" y="50" width="110" height="200" rx="20" fill="#fff" stroke="#0d1430" stroke-width="6"/><rect x="108" y="70" width="84" height="64" rx="10" fill="${a}"/><rect x="108" y="146" width="60" height="9" rx="4" fill="#e1e5f0"/><rect x="108" y="162" width="76" height="9" rx="4" fill="#e1e5f0"/></g><g transform="rotate(6 250 160)"><rect x="200" y="70" width="110" height="200" rx="20" fill="#fff" stroke="#0d1430" stroke-width="6"/><rect x="226" y="84" width="58" height="8" rx="4" fill="#0d1430"/><rect x="213" y="104" width="84" height="74" rx="10" fill="${b}"/><circle cx="255" cy="141" r="18" fill="#fff" opacity=".5"/><rect x="213" y="234" width="84" height="20" rx="10" fill="${a}"/></g></svg>`;
    }
  }

  /* ---------------- Toast ---------------- */
  function toast(msg, type = 'success') {
    let w = $('.toast-wrap');
    if (!w) { w = el('<div class="toast-wrap"></div>'); document.body.appendChild(w); }
    const ic = { success: 'check', error: 'alert', info: 'info' }[type] || 'info';
    const t = el(`<div class="toast ${type}">${icon(ic)}<span>${esc(msg)}</span></div>`);
    w.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2600);
  }

  /* ---------------- 弹窗 ---------------- */
  function modal({ title = '', sub = '', body = '', foot = '', size = '', drawer = false, onMount } = {}) {
    const ov = el(`<div class="overlay ${drawer ? 'drawer-overlay' : ''}"><div class="${drawer ? 'drawer' : 'modal ' + size}" role="dialog" aria-modal="true">
      ${title ? `<div class="modal-head"><div><h3 class="h3">${title}</h3>${sub ? `<p class="text-muted text-sm mt-4">${sub}</p>` : ''}</div><button class="icon-btn" data-close aria-label="关闭">${icon('x')}</button></div>` : ''}
      <div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ''}</div></div>`);
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => ov.classList.add('show'));
    const close = () => { ov.classList.remove('show'); document.body.style.overflow = ''; setTimeout(() => ov.remove(), 280); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) close(); });
    const api = { el: ov, close, $: (s) => ov.querySelector(s) };
    onMount && onMount(api);
    return api;
  }
  function confirmDialog({ title, text, okText = '确定', danger = false }) {
    return new Promise((res) => {
      const m = modal({ title, body: `<p class="text-muted">${text}</p>`, foot: `<button class="btn btn-ghost" data-close>取消</button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-ok>${okText}</button>` });
      let ok = false;
      m.$('[data-ok]').onclick = () => { ok = true; m.close(); };
      const obs = new MutationObserver(() => { if (!document.body.contains(m.el)) { obs.disconnect(); res(ok); } });
      obs.observe(document.body, { childList: true });
    });
  }

  /* ---------------- 动画 ---------------- */
  function reveal(root = document) {
    const items = $$('.reveal, .reveal-left, .reveal-scale, .hl.anim', root);
    if (!('IntersectionObserver' in window)) return items.forEach((i) => i.classList.add('in'));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach((i) => io.observe(i));
  }
  function countUp(node, to, { dur = 1400, decimals = 0, suffix = '' } = {}) {
    const start = performance.now();
    const step = (t) => { const p = Math.min(1, (t - start) / dur); const e = 1 - Math.pow(1 - p, 3); node.textContent = (to * e).toFixed(decimals) + suffix; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function tabs(container, onChange) {
    const btns = $$('button, a', container).filter((b) => b.dataset.tab !== undefined);
    let ind = $('.ind', container);
    if (!ind) { ind = el('<span class="ind"></span>'); container.prepend(ind); }
    const move = (b) => { ind.style.left = b.offsetLeft + 'px'; ind.style.width = b.offsetWidth + 'px'; };
    const set = (b, fire = true) => { btns.forEach((x) => x.classList.toggle('active', x === b)); move(b); fire && onChange && onChange(b.dataset.tab, b); };
    btns.forEach((b) => b.addEventListener('click', (e) => { if (b.tagName === 'A' && !b.getAttribute('href')) e.preventDefault(); set(b); }));
    const init = btns.find((b) => b.classList.contains('active')) || btns[0];
    requestAnimationFrame(() => { ind.style.transition = 'none'; move(init); requestAnimationFrame(() => (ind.style.transition = '')); });
    window.addEventListener('resize', () => { const a = btns.find((b) => b.classList.contains('active')); a && move(a); });
    return { set: (key, fire = true) => { const b = btns.find((x) => x.dataset.tab === key); b && set(b, fire); } };
  }
  function ripple(e) {
    const b = e.target.closest('.btn-primary, .btn-dark'); if (!b) return;
    const r = b.getBoundingClientRect(); const s = Math.max(r.width, r.height);
    const sp = el(`<span class="ripple" style="width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px"></span>`);
    b.appendChild(sp); setTimeout(() => sp.remove(), 600);
  }
  document.addEventListener('pointerdown', ripple);

  /* ---------------- 布局：背景 / 头部 / 页脚 ---------------- */
  function mountMesh(soft) { if ($('.mesh')) return; document.body.prepend(el(`<div class="mesh ${soft ? 'soft' : ''}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>`)); }

  async function mountHeader({ active = '', transparent = false, soft = true } = {}) {
    mountMesh(soft);
    const me = await CL.api.auth.me().catch(() => null);
    const navItem = (k, href, label, dot) => `<a href="${href}" class="${active === k ? 'active' : ''}">${dot ? `<i style="background:${dot}"></i>` : ''}${label}</a>`;
    const h = el(`<header class="header ${transparent ? '' : 'solid'}"><div class="container">
      <a class="logo" href="index.html">${LOGO}<span>Campus<b>Link</b></span></a>
      <nav class="nav">
        ${navItem('explore', 'explore.html', '广场')}
        ${navItem('teach', 'explore.html?mode=teach', '教我做', 'var(--teach)')}
        ${navItem('help', 'explore.html?mode=help', '帮我做', 'var(--help)')}
        ${navItem('together', 'explore.html?mode=together', '一起做', 'var(--together)')}
      </nav>
      <form class="search-pill" action="explore.html">${icon('search')}<input name="q" placeholder="找一位会做 App 界面设计的同学" value="${esc(qs('q') || '')}"></form>
      <div class="header-actions">
        ${me ? `
          <a class="btn btn-primary btn-sm" href="publish.html">${icon('plus')}<span>发布需求</span></a>
          <div class="dropdown" id="notifDd"><button class="icon-btn" aria-label="通知">${icon('bell')}<span class="count hidden" id="notifCount"></span></button>
            <div class="menu notif-menu"><header><b>通知</b><button class="btn btn-text btn-sm" id="readAll">全部已读</button></header><div class="notif-list" id="notifList"><div class="empty"><div class="spinner" style="margin:auto"></div></div></div></div></div>
          <div class="dropdown" id="userDd"><button aria-label="我的">${avatar(me, '', { verified: false })}</button>
            <div class="menu">
              <div style="padding:10px 12px 8px" class="row">${avatar(me, 'sm')}<div class="grow"><div class="fw-700 ellipsis">${esc(me.name)}</div><div class="text-xs text-muted ellipsis">${esc(me.school || '')} · ${esc(me.major || '')}</div></div></div><hr>
              <a href="dashboard.html">${icon('grid')}我的工作台</a>
              <a href="profile.html?id=${me.id}">${icon('user')}个人主页</a>
              <a href="profile-edit.html">${icon('edit')}编辑资料与作品集</a><hr>
              <button id="logoutBtn">${icon('logout')}退出登录</button>
            </div></div>` : `
          <a class="btn btn-text" href="login.html">登录</a>
          <a class="btn btn-primary btn-sm" href="login.html?register=1">免费注册</a>`}
      </div></div></header>`);
    document.body.prepend(h);
    if (transparent) { const on = () => h.classList.toggle('scrolled', scrollY > 10); on(); addEventListener('scroll', on, { passive: true }); }
    $$('.dropdown', h).forEach((dd) => {
      dd.firstElementChild.addEventListener('click', (e) => { e.stopPropagation(); $$('.dropdown.open').forEach((o) => o !== dd && o.classList.remove('open')); dd.classList.toggle('open'); });
      dd.querySelector('.menu').addEventListener('click', (e) => e.stopPropagation());
    });
    document.addEventListener('click', () => $$('.dropdown.open').forEach((o) => o.classList.remove('open')));
    if (me) {
      $('#logoutBtn', h).onclick = async () => { await CL.api.auth.logout(); location.href = 'index.html'; };
      loadNotifs();
      $('#readAll', h).onclick = async () => { await CL.api.notifications.readAll(); loadNotifs(); };
    }
    mountDemoSwitch(me);
    return me;
  }
  async function loadNotifs() {
    const list = await CL.api.notifications.list();
    const unread = list.filter((n) => !n.read).length;
    const c = $('#notifCount'); if (c) { c.textContent = unread; c.classList.toggle('hidden', !unread); }
    const ICON = { application: 'inbox', accepted: 'check', rejected: 'x', agreement: 'clipboard', message: 'chat', file: 'file', review: 'star', complete: 'flag', invite: 'userPlus' };
    $('#notifList').innerHTML = list.length ? list.map((n) => `<a class="notif-item ${n.read ? '' : 'unread'}" href="${esc(n.link || '#')}" data-id="${n.id}"><span class="ic">${icon(ICON[n.type] || 'bell')}</span><div class="grow"><div class="text-sm fw-600">${esc(n.title)}</div><div class="text-xs text-muted clamp-2">${esc(n.body || '')}</div><div class="text-xs text-muted-2 mt-4">${timeAgo(n.createdAt)}</div></div></a>`).join('') : `<div class="empty"><div class="ic">${icon('bell')}</div><h4>暂无通知</h4></div>`;
    $$('#notifList .notif-item').forEach((a) => a.addEventListener('click', () => CL.api.notifications.read(a.dataset.id)));
  }

  function mountDemoSwitch(me) {
    if (!CL_CONFIG.USE_MOCK) return;
    const users = CL.api._mockUsers();
    const s = el(`<div class="demo-switch" title="仅 Mock 模式显示：切换演示身份，用来体验双方视角"><span style="font-weight:700">演示 ›</span>
      <select>${users.map((u) => `<option value="${u.id}" ${me && me.id === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}${me ? '' : '<option selected disabled>未登录</option>'}</select>
      <button data-reset>重置数据</button></div>`);
    document.body.appendChild(s);
    $('select', s).onchange = (e) => { CL.api._mockSwitch(e.target.value); location.reload(); };
    $('[data-reset]', s).onclick = () => { CL.api._mockReset(); location.reload(); };
  }

  function mountFooter() {
    document.body.appendChild(el(`<footer class="footer"><div class="container"><div class="cols">
      <div><a class="logo" href="index.html">${LOGO}<span>Campus<b>Link</b></span></a><p class="mt-12" style="max-width:320px">让能力被需要的人看见。面向在校学生的技能互助与协作平台。</p></div>
      <div><h5>三种连接</h5><ul><li><a href="explore.html?mode=teach">教我做</a></li><li><a href="explore.html?mode=help">帮我做</a></li><li><a href="explore.html?mode=together">一起做</a></li></ul></div>
      <div><h5>我的</h5><ul><li><a href="dashboard.html">工作台</a></li><li><a href="publish.html">发布需求</a></li><li><a href="profile-edit.html">作品集</a></li></ul></div>
      <div><h5>关于</h5><ul><li><a href="#">平台规则</a></li><li><a href="#">隐私政策</a></li><li><a href="#">联系我们</a></li></ul></div>
    </div><div class="mt-32 text-xs">© 2026 CampusLink · 前端原型</div></div></footer>`));
  }

  async function requireLogin() {
    const me = await CL.api.auth.me().catch(() => null);
    if (!me) { location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search); throw new Error('login required'); }
    return me;
  }

  function emptyState(ic, title, text = '', action = '') {
    return `<div class="empty"><div class="ic">${icon(ic)}</div><h4>${title}</h4><p class="text-sm">${text}</p>${action ? `<div class="mt-16">${action}</div>` : ''}</div>`;
  }

  /* 需求卡片（广场/个人主页/工作台复用） */
  function postCard(p) {
    const a = p.author || {};
    const dl = daysLeft(p.deadline);
    const roles = p.mode === 'together' && p.roles?.length ? `<div class="row gap-6 wrap">${p.roles.map((r) => `<span class="tag tag-sm ${r.filled ? '' : 'tag-blue'}">${r.filled ? icon('check') : ''}${esc(r.name)}</span>`).join('')}</div>` : '';
    return `<article class="card card-hover post-card" data-mode="${p.mode}" onclick="location.href='post.html?id=${p.id}'">
      <div class="row-between">${modeBadge(p.mode)}${p.status === 'open' ? (dl !== null && dl <= 3 && dl >= 0 ? `<span class="badge badge-coral">${icon('clock')}${dl === 0 ? '今天截止' : dl + ' 天后截止'}</span>` : `<span class="badge badge-mint"><i class="dot"></i>招募中</span>`) : statusBadge('post', p.status)}</div>
      <div><h3 class="title clamp-2">${esc(p.title)}</h3><p class="desc clamp-2 mt-8">${esc(p.summary || p.description)}</p></div>
      ${roles}
      <div class="row gap-6 wrap">${(p.tags || []).slice(0, 4).map((t) => `<span class="tag tag-sm">${esc(t)}</span>`).join('')}</div>
      <div class="meta"><span>${icon(p.location === 'offline' ? 'mapPin' : 'video')}${p.location === 'offline' ? '线下' : p.location === 'either' ? '线上/线下' : '线上'}</span>${p.deadline ? `<span>${icon('calendar')}${fmtDate(p.deadline).slice(5)}</span>` : ''}<span>${icon('users')}${p.applicantCount || 0} 人申请</span></div>
      <div class="foot"><div class="row gap-8">${avatar(a, 'sm')}<div><div class="text-sm fw-600">${esc(a.name)}</div><div class="text-xs text-muted">${timeAgo(p.createdAt)}</div></div></div>${fmtBudget(p.budget)}</div>
    </article>`;
  }

  const STATUS = {
    post: { open: ['招募中', 'mint'], in_progress: ['进行中', 'blue'], completed: ['已完成', 'gray'], closed: ['已关闭', 'gray'] },
    application: { pending: ['待处理', 'amber'], accepted: ['已录用', 'mint'], rejected: ['未录用', 'gray'], withdrawn: ['已撤回', 'gray'] },
    collab: { confirming: ['待确认合作单', 'amber'], active: ['进行中', 'blue'], delivered: ['待验收', 'coral'], completed: ['已完成', 'mint'], cancelled: ['已取消', 'gray'] },
  };
  function statusBadge(kind, s) { const [t, c] = STATUS[kind]?.[s] || [s, 'gray']; return `<span class="badge badge-${c}">${t}</span>`; }

  function setTitle(t) { document.title = t ? `${t} · CampusLink` : 'CampusLink'; }

  /** 静态 HTML 中的 data-ic="name" / data-logo 自动注入图标 */
  function hydrate(root = document) {
    $$('[data-ic]', root).forEach((n) => { if (n.dataset.icDone) return; n.dataset.icDone = 1; n.insertAdjacentHTML('afterbegin', icon(n.dataset.ic)); });
    $$('[data-logo]', root).forEach((n) => { if (n.dataset.icDone) return; n.dataset.icDone = 1; n.innerHTML = `${LOGO}<span>Campus<b>Link</b></span>`; });
  }
  document.addEventListener('DOMContentLoaded', () => hydrate());

  CL.ui = { hydrate, icon, LOGO, $, $$, esc, qs, el, timeAgo, fmtDate, fmtTime, daysLeft, fmtSize, fmtBudget, MODES, modeBadge, avatar, stars, cover, toast, modal, confirmDialog, reveal, countUp, tabs, mountMesh, mountHeader, mountFooter, requireLogin, emptyState, postCard, statusBadge, STATUS, setTitle, loadNotifs };
})();
