/* 首页：Hero 动画（复刻视频节奏）、三种模式卡、流程、作品墙、网络图、最新需求 */
(async function () {
  const { $, $$, icon, cover, avatar, postCard, reveal, countUp, tabs, MODES, hydrate } = CL.ui;
  await CL.ui.mountHeader({ transparent: true, soft: false });
  hydrate();

  /* ---------- Hero：模式按钮 ---------- */
  $('#heroModes').innerHTML = Object.values(MODES).map((m) => `<button data-m="${m.key}" class="mode mode-${m.key}">${icon(m.icon)}${m.name}</button>`).join('');
  $('#awArt').innerHTML = cover('app', 0);

  /* ---------- Hero：搜索框打字 ---------- */
  const phrases = ['找一位会做 App 界面设计的同学', '想找人带我入门 Python 数据分析', '互联网+ 缺一个后端，求组队', '社团招新视频需要剪辑师'];
  let pi = 0;
  async function typeLoop() {
    const node = $('#typeText');
    while (true) {
      const s = phrases[pi++ % phrases.length];
      for (let i = 1; i <= s.length; i++) { node.textContent = s.slice(0, i); await sleep(55 + Math.random() * 40); }
      await sleep(2600);
      for (let i = s.length; i >= 0; i--) { node.textContent = s.slice(0, i); await sleep(18); }
      await sleep(300);
    }
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  typeLoop();

  /* ---------- Hero：三幕浮层循环（教我做 → 帮我做 → 一起做） ---------- */
  const win = $('#appWin'), cur = $('#cursor');
  const order = ['teach', 'help', 'together'];
  let step = 0, manual = null;
  function moveCursor(target, dx = 0.5, dy = 0.6) {
    const w = win.getBoundingClientRect(), r = target.getBoundingClientRect();
    cur.style.left = r.left - w.left + r.width * dx + 'px';
    cur.style.top = r.top - w.top + r.height * dy + 'px';
  }
  async function click() { cur.classList.add('click'); await sleep(160); cur.classList.remove('click'); }
  function resetPops() {
    $$('.pop', win).forEach((p) => p.classList.remove('show'));
    $$('.slot', win).forEach((s) => s.classList.remove('pick'));
    $$('[data-cta]', win).forEach((c) => { c.classList.remove('done'); c.textContent = c.dataset.orig || (c.dataset.orig = c.textContent); });
    $('#ringArc').style.strokeDashoffset = 201; $('#ringNum').textContent = '0%';
  }
  async function play(m) {
    resetPops();
    $$('#heroModes button').forEach((b) => b.classList.toggle('on', b.dataset.m === m));
    $$('#heroDash i').forEach((d, i) => d.classList.toggle('on', i === order.indexOf(m)));
    $('#heroDash span').textContent = `0${order.indexOf(m) + 1} / 03`;
    const row = $(`.aw-act[data-m="${m}"]`, win);
    moveCursor(row, 0.35); await sleep(800); await click();
    $$('.aw-act', win).forEach((a) => a.classList.toggle('on', a === row));
    await sleep(250);
    const pop = $(`.pop[data-pop="${m}"]`, win); pop.classList.add('show');
    await sleep(700);
    if (m === 'teach') { const s = $('[data-slot]', pop); moveCursor(s); await sleep(800); await click(); s.classList.add('pick'); await sleep(400); }
    if (m === 'together') { $('#ringArc').style.strokeDashoffset = 201 * 0.04; countUp($('#ringNum'), 96, { dur: 1100, suffix: '%' }); await sleep(1100); }
    const cta = $('[data-cta]', pop); moveCursor(cta, 0.55); await sleep(800); await click();
    cta.classList.add('done'); cta.textContent = { teach: '预约成功 ✓', help: '已下单，去确认合作单 ✓', together: '邀请已发送 ✓' }[m];
    await sleep(1900);
  }
  (async function loop() {
    await sleep(900);
    while (true) {
      const m = manual || order[step % order.length]; manual = null;
      await play(m); step = order.indexOf(m) + 1;
    }
  })();
  $$('#heroModes button').forEach((b) => b.addEventListener('click', () => { location.href = `explore.html?mode=${b.dataset.m}`; }));

  /* ---------- 数字 ---------- */
  const st = await CL.api.stats.overview();
  $$('[data-count]').forEach((n) => setTimeout(() => countUp(n, st[n.dataset.count], { decimals: +n.dataset.dec || 0 }), 600));

  /* ---------- 三种模式卡 ---------- */
  const MODE_DETAIL = {
    teach: { tag: '找导师 · 请教问题', desc: '想学会一项技能，或卡在某个具体问题上？找做过的人，1v1 针对性指导。', items: ['学长学姐 / 研究生 / 老师，按技能筛选', '按次或按小时，线上线下都可以', '作品集、简历、科研入门……问最具体的问题'] },
    help: { tag: '外包任务 · 按需下单', desc: '有明确的交付物？把任务外包给有作品为证的同学，约定好范围、时间和报酬。', items: ['海报、剪辑、PPT、代码调试、数据处理', '看作品集与评分，择优录用', '合作单约定修改次数与交付标准'] },
    together: { tag: '组队竞赛 · 互补搭档', desc: '参加比赛或做项目缺人？按角色招募能力互补、同样想拿奖或加分的伙伴。', items: ['按角色招募：设计 × 开发 × 运营', '互联网+、挑战杯、数模、各类学科竞赛', '约定分工、署名与奖金分配'] },
  };
  $('#modeCards').innerHTML = Object.values(MODES).map((m, i) => `
    <a class="mcard ${m.key} reveal" style="--d:${i * 0.12}s" href="explore.html?mode=${m.key}">
      <span class="num-label">0${i + 1}</span>
      <span class="big-ic">${icon(m.icon)}</span>
      <h3>${m.name}</h3>
      <div class="fw-700" style="color:var(--mc)">${MODE_DETAIL[m.key].tag}</div>
      <p class="text-muted mt-12">${MODE_DETAIL[m.key].desc}</p>
      <ul>${MODE_DETAIL[m.key].items.map((t) => `<li>${icon('check')}${t}</li>`).join('')}</ul>
      <span class="go">去看看${m.name}的需求 ${icon('arrowRight')}</span>
    </a>`).join('');

  /* ---------- 流程 ---------- */
  const FLOW = [['edit', '发布需求', '选择 教我做 / 帮我做 / 一起做，写清楚你要什么'], ['users', '看履历选人', '查看申请者的作品集、评分与过往合作'], ['clipboard', '确认合作单', '双方在线填写并确认范围、交付、时间、报酬'], ['chat', '协作空间', '沟通、传文件、保存中间版本、推进里程碑'], ['star', '互评留痕', '结项后双向评分，成为下一次合作的凭证']];
  $('#flow').insertAdjacentHTML('beforeend', FLOW.map(([ic, t, d], i) => `<div class="fstep" style="--i:${i}"><div class="n">${icon(ic)}<em>${i + 1}</em></div><h4>${t}</h4><p>${d}</p></div>`).join(''));
  new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect(); } }), { threshold: 0.3 }).observe($('#flow'));

  /* ---------- 作品墙 ---------- */
  const WORKS = [['poster', 0, '林晓', '#ff9a7a,#ff6b4a', '¥36起', 'coral'], ['app', 0, '陈一然', '#6f8dff,#2f5bff', '可指导', 'blue'], ['code', 0, '周子航', '#3c4767,#0d1430', '找队友', 'mint'], ['chart', 2, '许嘉禾', '#52d6a6,#14a874', '¥60/时', 'coral'], ['shapes', 0, '苏沐', '#ffc46b,#f59e0b', '可指导', 'blue'], ['video', 0, '何以宁', '#a493ff,#6a57ff', '¥99起', 'coral']];
  $('#worksGrid').innerHTML = WORKS.map(([k, s, n, c, b, bc], i) => { const [c1, c2] = c.split(','); return `<div class="wc reveal" style="--d:${0.1 + i * 0.08}s"><div class="cv">${cover(k, s)}</div><div class="who"><span class="avatar xs" style="--c1:${c1};--c2:${c2}">${n[0]}</span>${n}<span class="badge badge-${bc}">${b}</span></div></div>`; }).join('');

  /* ---------- 协作空间 mock 进入视口时逐条出现 ---------- */
  new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect(); } }), { threshold: 0.35 }).observe($('#wsMock'));

  /* ---------- 网络图（视频结尾） ---------- */
  (function network() {
    const box = $('#network');
    const N = [['陈', 330, 120, '#2f5bff'], ['林', 210, 175, '#ff6b4a'], ['周', 450, 200, '#3c4767'], ['许', 320, 260, '#14a874'], ['王', 140, 300, '#ff6b4a'], ['何', 250, 360, '#6a57ff'], ['苏', 420, 345, '#f59e0b'], ['高', 540, 300, '#0b9ee8']];
    const E = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [3, 5], [3, 6], [4, 5], [5, 6], [2, 7], [6, 7], [0, 3]];
    const ORG = [['科技公司', 860, 110], ['设计工作室', 980, 200], ['创业团队', 850, 290], ['研究院', 990, 360]];
    const OE = [[2, 0], [2, 1], [7, 2], [7, 3], [0, 1]];
    let svg = `<svg viewBox="0 0 1160 440" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="og" x1="0" x2="1"><stop offset="0" stop-color="#2f5bff"/><stop offset="1" stop-color="#ff6b4a"/></linearGradient></defs>`;
    E.forEach(([a, b], i) => { svg += `<path class="edge" id="e${i}" d="M${N[a][1]} ${N[a][2]} L${N[b][1]} ${N[b][2]}" style="transition-delay:${0.4 + i * 0.08}s"/>`; });
    OE.forEach(([a, b], i) => { const [x1, y1] = [N[a][1], N[a][2]], [x2, y2] = [ORG[b][1], ORG[b][2]]; svg += `<path class="edge" id="oe${i}" d="M${x1} ${y1} C ${(x1 + x2) / 2} ${y1 - 60}, ${(x1 + x2) / 2} ${y2 + 40}, ${x2 - 30} ${y2}" style="stroke:url(#og);stroke-dasharray:6 6 ;opacity:.6;transition-delay:${1.4 + i * 0.12}s"/>`; });
    N.forEach(([t, x, y, c], i) => { svg += `<g class="node" style="transition-delay:${i * 0.07}s"><circle cx="${x}" cy="${y}" r="27" fill="${c}"/><circle cx="${x}" cy="${y}" r="27" fill="none" stroke="#fff" stroke-width="4"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">${t}</text></g>`; });
    ORG.forEach(([t, x, y], i) => { svg += `<g class="node" style="transition-delay:${0.9 + i * 0.1}s"><rect x="${x - 30}" y="${y - 30}" width="60" height="60" rx="16" fill="#fff" stroke="#e6e9f3"/><path d="M${x - 11} ${y + 11}V${y - 7}h9v18M${x - 2} ${y + 11}V${y - 13}h13v24" fill="none" stroke="${['#2f5bff', '#ff6b4a', '#14a874', '#f59e0b'][i]}" stroke-width="2.4" stroke-linejoin="round"/><text x="${x}" y="${y + 52}" text-anchor="middle" font-size="13" fill="#6b7391">${t}</text></g>`; });
    // 流动光点
    [0, 3, 6, 9, 11].forEach((ei, k) => { svg += `<circle r="4" class="pulse-dot" opacity=".85"><animateMotion dur="${2.6 + k * 0.4}s" repeatCount="indefinite" begin="${2 + k * 0.3}s"><mpath href="#e${ei}"/></animateMotion></circle>`; });
    [0, 2, 3].forEach((ei, k) => { svg += `<circle r="4" fill="#ff6b4a" opacity=".85"><animateMotion dur="${3.2 + k * 0.5}s" repeatCount="indefinite" begin="${2.4 + k * 0.4}s"><mpath href="#oe${ei}"/></animateMotion></circle>`; });
    svg += '</svg>';
    box.innerHTML = svg + `<span class="net-label text-primary" style="left:22%;bottom:0">校园内部互助</span><span class="net-label text-coral" style="left:76%;bottom:0">校企联合共创（规划中）</span>`;
    new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { box.classList.add('in'); o.disconnect(); } }), { threshold: 0.3 }).observe(box);
  })();

  /* ---------- 最新需求 ---------- */
  async function loadLive(mode) {
    const g = $('#livePosts');
    g.innerHTML = Array(3).fill('<div class="card skeleton" style="height:260px"></div>').join('');
    const { items } = await CL.api.posts.list({ mode, sort: 'latest' });
    g.innerHTML = items.slice(0, 6).map(postCard).join('');
    g.classList.remove('stagger'); void g.offsetWidth; g.classList.add('stagger');
  }
  tabs($('#liveTabs'), (k) => loadLive(k));
  loadLive('');

  /* ---------- CTA 圆环 ---------- */
  $('#ctaRings').innerHTML = [[-80, -120, 340], [70, 60, 260], [85, -40, 180], [-10, 80, 420]].map(([x, y, s]) => `<span style="width:${s}px;height:${s}px;left:${x}%;top:${y}%;animation:float ${7 + s / 100}s ease-in-out infinite"></span>`).join('');

  CL.ui.mountFooter();
  hydrate();
  reveal();
})();
