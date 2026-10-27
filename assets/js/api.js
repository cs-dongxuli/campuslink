/**
 * CampusLink API 层 —— 前端唯一的数据入口（window.CL.api）。
 *
 * 每个方法都写成：call(METHOD, PATH, options, mockHandler)
 *   - CL_CONFIG.USE_MOCK = true  → 执行 mockHandler（localStorage 模拟数据库）
 *   - CL_CONFIG.USE_MOCK = false → fetch(API_BASE + PATH)，期望响应 { code: 0, data, message }
 *
 * 后端同学：METHOD + PATH 就是你需要实现的接口；mockHandler 里的逻辑就是该接口的业务规则参考实现。
 * 完整契约见 /docs/API.md。
 */
(function () {
  const CL = (window.CL = window.CL || {});
  const C = window.CL_CONFIG;
  const DB_KEY = 'cl_mock_db_v1', UID_KEY = 'cl_mock_uid';

  /* ================= 传输层 ================= */
  class ApiError extends Error { constructor(code, message, status) { super(message); this.code = code; this.status = status; } }

  async function http(method, path, { query, body, form } = {}) {
    let url = C.API_BASE + path;
    if (query) { const q = new URLSearchParams(Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== '')); if ([...q].length) url += '?' + q; }
    const headers = {};
    const token = localStorage.getItem(C.TOKEN_KEY);
    if (token) headers.Authorization = 'Bearer ' + token;
    let payload;
    if (form) payload = form; else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
    const res = await fetch(url, { method, headers, body: payload });
    let json = null; try { json = await res.json(); } catch (_) {}
    if (res.status === 401) { localStorage.removeItem(C.TOKEN_KEY); }
    if (!res.ok || !json || json.code !== 0) throw new ApiError(json?.code ?? res.status, json?.message || '网络错误，请稍后再试', res.status);
    return json.data;
  }
  async function call(method, path, opts, mockFn) {
    if (!C.USE_MOCK) return http(method, path, opts);
    const [a, b] = C.MOCK_LATENCY; await new Promise((r) => setTimeout(r, a + Math.random() * (b - a)));
    const out = mockFn();
    return out === undefined ? null : JSON.parse(JSON.stringify(out));
  }

  /* ================= Mock 数据库 ================= */
  let db = null;
  function load() { if (db) return db; try { db = JSON.parse(localStorage.getItem(DB_KEY)); } catch (_) {} if (!db) { db = CL.mockSeed(); save(); } return db; }
  function save() { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
  const uid = () => (localStorage.getItem(UID_KEY) === null ? 'u1' : localStorage.getItem(UID_KEY) || null);
  const id = (p) => p + (++load().seq) + Math.random().toString(36).slice(2, 5);
  const now = () => new Date().toISOString();
  const fail = (code, msg) => { throw new ApiError(code, msg, 400); };
  const needLogin = () => { const u = uid(); if (!u) throw new ApiError(401, '请先登录', 401); return u; };
  const user = (i) => load().users.find((u) => u.id === i);
  const publicUser = (u) => u && ({ id: u.id, name: u.name, avatarUrl: u.avatarUrl || null, avatarColor: u.avatarColor, school: u.school, major: u.major, grade: u.grade, verified: u.verified, verifiedType: u.verifiedType, skills: u.skills, stats: u.stats, responseTime: u.responseTime });
  const withAuthor = (p) => ({ ...p, author: publicUser(user(p.authorId)) });
  function notify(userId, type, title, body, link) { load().notifications.unshift({ id: id('n'), userId, type, title, body, link, read: false, createdAt: now() }); }
  function sysMsg(collabId, content) { load().messages.push({ id: id('msg'), collabId, senderId: null, type: 'system', content, createdAt: now() }); }
  function collabView(c) {
    const d = load();
    return { ...c, members: c.memberIds.map((m) => ({ ...publicUser(user(m)), role: c.roles?.[m] || '' })), post: (() => { const p = d.posts.find((x) => x.id === c.postId); return p && { id: p.id, title: p.title, mode: p.mode }; })(),
      unread: 0, lastMessage: d.messages.filter((m) => m.collabId === c.id).slice(-1)[0] || null };
  }
  function mustMember(c) { const u = needLogin(); if (!c) fail(404, '合作不存在'); if (!c.memberIds.includes(u)) fail(403, '无权访问'); return u; }
  function recalcStats(userId) {
    const d = load(); const u = user(userId); if (!u) return;
    const rs = d.reviews.filter((r) => r.revieweeId === userId);
    if (rs.length) { u.stats.rating = +(rs.reduce((s, r) => s + r.rating, 0) / rs.length).toFixed(1); u.stats.ratingCount = rs.length; u.stats.goodRate = Math.round((rs.filter((r) => r.rating >= 4).length / rs.length) * 100); }
    u.stats.works = d.portfolio.filter((w) => w.userId === userId).length;
  }

  /* ================= 接口 ================= */
  const api = {
    /* ---------- 认证 ---------- */
    auth: {
      sendCode: (email) => call('POST', '/auth/email-code', { body: { email } }, () => { if (!/\.edu(\.cn)?$/.test(email.split('@')[1] || '')) fail(1001, '请使用学校邮箱（.edu / .edu.cn）'); return { sent: true, ttl: 300 }; }),
      login: ({ email, code }) => call('POST', '/auth/login', { body: { email, code } }, () => {
        const u = load().users.find((x) => x.email === email); if (!u) fail(1002, '该邮箱尚未注册'); if (!/^\d{6}$/.test(code)) fail(1003, '验证码错误');
        localStorage.setItem(UID_KEY, u.id); return { token: 'mock-' + u.id, user: u };
      }).then((r) => { localStorage.setItem(C.TOKEN_KEY, r.token); return r; }),
      register: (data) => call('POST', '/auth/register', { body: data }, () => {
        const d = load(); if (d.users.some((x) => x.email === data.email)) fail(1004, '该邮箱已注册');
        const u = { id: id('u'), avatarColor: Math.floor(Math.random() * 8), verified: true, verifiedType: 'student', bio: '', skills: [], responseTime: '—', stats: { rating: 0, ratingCount: 0, completed: 0, goodRate: 0, works: 0 }, services: [], experiences: [], awards: [], links: [], createdAt: now(), ...data };
        delete u.code; d.users.push(u); save(); localStorage.setItem(UID_KEY, u.id); return { token: 'mock-' + u.id, user: u };
      }).then((r) => { localStorage.setItem(C.TOKEN_KEY, r.token); return r; }),
      logout: () => call('POST', '/auth/logout', {}, () => { localStorage.setItem(UID_KEY, ''); }).finally(() => localStorage.removeItem(C.TOKEN_KEY)),
      me: () => call('GET', '/auth/me', {}, () => { const u = uid(); return u ? user(u) || null : null; }),
    },

    /* ---------- 用户 / 履历 ---------- */
    users: {
      get: (userId) => call('GET', `/users/${userId}`, {}, () => { const u = user(userId); if (!u) fail(404, '用户不存在'); const { email, ...pub } = u; return pub; }),
      search: (params = {}) => call('GET', '/users', { query: params }, () => {
        let list = load().users.filter((u) => u.id !== uid());
        if (params.q) { const q = params.q.toLowerCase(); list = list.filter((u) => (u.name + u.major + u.bio + u.skills.join()).toLowerCase().includes(q)); }
        if (params.mode) list = list.filter((u) => u.services.some((s) => s.mode === params.mode));
        list.sort((a, b) => b.stats.rating - a.stats.rating);
        return { items: list.map((u) => ({ ...publicUser(u), bio: u.bio, services: u.services })), total: list.length, page: 1, pageSize: 20 };
      }),
      updateMe: (patch) => call('PATCH', '/users/me', { body: patch }, () => { const u = user(needLogin()); ['email', 'id', 'stats', 'verified'].forEach((k) => delete patch[k]); Object.assign(u, patch); save(); return u; }),
      reviews: (userId) => call('GET', `/users/${userId}/reviews`, {}, () => load().reviews.filter((r) => r.revieweeId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((r) => ({ ...r, reviewer: publicUser(user(r.reviewerId)) }))),
      posts: (userId) => call('GET', `/users/${userId}/posts`, {}, () => load().posts.filter((p) => p.authorId === userId && p.status !== 'closed').map(withAuthor)),
    },

    /* ---------- 作品集 ---------- */
    portfolio: {
      list: (userId) => call('GET', `/users/${userId}/portfolio`, {}, () => load().portfolio.filter((w) => w.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
      create: (data) => call('POST', '/portfolio', { body: data }, () => { const u = needLogin(); const w = { id: id('w'), userId: u, coverKind: 'app', coverSeed: Math.floor(Math.random() * 4), tags: [], link: '', createdAt: now(), ...data }; load().portfolio.push(w); recalcStats(u); save(); return w; }),
      update: (wid, data) => call('PATCH', `/portfolio/${wid}`, { body: data }, () => { const w = load().portfolio.find((x) => x.id === wid); if (!w || w.userId !== needLogin()) fail(403, '无权修改'); Object.assign(w, data); save(); return w; }),
      remove: (wid) => call('DELETE', `/portfolio/${wid}`, {}, () => { const d = load(); const u = needLogin(); d.portfolio = d.portfolio.filter((x) => !(x.id === wid && x.userId === u)); recalcStats(u); save(); }),
    },

    /* ---------- 通用上传（头像、作品封面、附件） ---------- */
    uploads: {
      upload: (file, purpose = 'attachment') => {
        if (!C.USE_MOCK) { const f = new FormData(); f.append('file', file); f.append('purpose', purpose); return http('POST', '/uploads', { form: f }); }
        return call('POST', '/uploads', {}, () => ({ id: id('up'), url: URL.createObjectURL(file), name: file.name, size: file.size, mime: file.type }));
      },
    },

    /* ---------- 需求 ---------- */
    posts: {
      /** params: { mode, q, category, location, budgetType, sort: 'latest'|'hot'|'deadline', page, pageSize } */
      list: (params = {}) => call('GET', '/posts', { query: params }, () => {
        let list = load().posts.filter((p) => p.status === 'open');
        if (params.mode) list = list.filter((p) => p.mode === params.mode);
        if (params.category) list = list.filter((p) => p.category === params.category);
        if (params.location) list = list.filter((p) => p.location === params.location || p.location === 'either');
        if (params.q) { const q = params.q.toLowerCase(); list = list.filter((p) => (p.title + p.description + (p.tags || []).join()).toLowerCase().includes(q)); }
        const s = params.sort || 'latest';
        list.sort((a, b) => s === 'hot' ? b.viewCount - a.viewCount : s === 'deadline' ? (a.deadline || '9').localeCompare(b.deadline || '9') : b.createdAt.localeCompare(a.createdAt));
        return { items: list.map(withAuthor), total: list.length, page: 1, pageSize: 20 };
      }),
      get: (pid) => call('GET', `/posts/${pid}`, {}, () => {
        const d = load(); const p = d.posts.find((x) => x.id === pid); if (!p) fail(404, '需求不存在');
        p.viewCount++; save(); const u = uid();
        const myApp = u && d.applications.find((a) => a.postId === pid && a.applicantId === u && a.status !== 'withdrawn');
        const collab = d.collabs.find((c) => c.postId === pid && u && c.memberIds.includes(u) && c.status !== 'cancelled');
        return { ...withAuthor(p), isOwner: u === p.authorId, myApplication: myApp || null, myCollabId: collab?.id || null };
      }),
      create: (data) => call('POST', '/posts', { body: data }, () => {
        const u = needLogin(); if (!data.title || data.title.length < 5) fail(1101, '标题至少 5 个字');
        const p = { id: id('p'), authorId: u, status: 'open', applicantCount: 0, viewCount: 0, createdAt: now(), tags: [], ...data };
        if (!p.summary) p.summary = (p.description || '').slice(0, 60);
        load().posts.unshift(p);
        if (p.invitedUserId) notify(p.invitedUserId, 'invite', `${user(u).name} 邀请你合作`, p.title, `post.html?id=${p.id}`);
        save(); return p;
      }),
      update: (pid, data) => call('PATCH', `/posts/${pid}`, { body: data }, () => { const p = load().posts.find((x) => x.id === pid); if (!p || p.authorId !== needLogin()) fail(403, '无权修改'); Object.assign(p, data); save(); return p; }),
      close: (pid) => call('POST', `/posts/${pid}/close`, {}, () => { const p = load().posts.find((x) => x.id === pid); if (!p || p.authorId !== needLogin()) fail(403, '无权操作'); p.status = 'closed'; save(); return p; }),
      mine: () => call('GET', '/me/posts', {}, () => { const u = needLogin(); const d = load(); return d.posts.filter((p) => p.authorId === u).map((p) => ({ ...withAuthor(p), pendingCount: d.applications.filter((a) => a.postId === p.id && a.status === 'pending').length })); }),
    },

    /* ---------- 申请 ---------- */
    applications: {
      /** data: { message, quote:{type,amount}|null, portfolioIds:[], availableTime, role } */
      create: (postId, data) => call('POST', `/posts/${postId}/applications`, { body: data }, () => {
        const u = needLogin(); const d = load(); const p = d.posts.find((x) => x.id === postId);
        if (!p) fail(404, '需求不存在'); if (p.authorId === u) fail(1201, '不能申请自己发布的需求'); if (p.status !== 'open') fail(1202, '该需求已停止招募');
        if (d.applications.some((a) => a.postId === postId && a.applicantId === u && ['pending', 'accepted'].includes(a.status))) fail(1203, '你已经申请过了');
        if (!data.message || data.message.length < 10) fail(1204, '申请留言至少 10 个字');
        const a = { id: id('a'), postId, applicantId: u, status: 'pending', createdAt: now(), quote: null, portfolioIds: [], ...data };
        d.applications.push(a); p.applicantCount++;
        notify(p.authorId, 'application', '新的申请', `${user(u).name} 申请了「${p.title}」`, `applicants.html?post=${p.id}`);
        save(); return a;
      }),
      listForPost: (postId) => call('GET', `/posts/${postId}/applications`, {}, () => {
        const d = load(); const p = d.posts.find((x) => x.id === postId); if (!p || p.authorId !== needLogin()) fail(403, '只有发起人可以查看申请');
        return d.applications.filter((a) => a.postId === postId && a.status !== 'withdrawn').sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((a) => {
          const full = user(a.applicantId);
          return { ...a, applicant: { ...publicUser(full), bio: full.bio, experiences: full.experiences, awards: full.awards, services: full.services }, portfolio: d.portfolio.filter((w) => a.portfolioIds.includes(w.id)), recentReviews: d.reviews.filter((r) => r.revieweeId === a.applicantId).slice(0, 3).map((r) => ({ ...r, reviewer: publicUser(user(r.reviewerId)) })) };
        });
      }),
      mine: () => call('GET', '/me/applications', {}, () => { const u = needLogin(); const d = load(); return d.applications.filter((a) => a.applicantId === u).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((a) => { const p = d.posts.find((x) => x.id === a.postId); const c = d.collabs.find((x) => x.postId === a.postId && x.memberIds.includes(u)); return { ...a, post: p && withAuthor(p), collabId: c?.id || null }; }); }),
      /** 录用：创建（或加入）合作，返回 { collabId } */
      accept: (appId) => call('POST', `/applications/${appId}/accept`, {}, () => {
        const u = needLogin(); const d = load(); const a = d.applications.find((x) => x.id === appId); if (!a) fail(404, '申请不存在');
        const p = d.posts.find((x) => x.id === a.postId); if (p.authorId !== u) fail(403, '无权操作'); if (a.status !== 'pending') fail(1205, '该申请已处理');
        a.status = 'accepted'; a.decidedAt = now();
        let c = p.mode === 'together' ? d.collabs.find((x) => x.postId === p.id && ['confirming', 'active'].includes(x.status)) : null;
        if (c) {
          c.memberIds.push(a.applicantId); c.applicationIds.push(a.id); c.roles[a.applicantId] = a.role || '成员';
          if (c.status === 'confirming') c.confirmations = {};
          sysMsg(c.id, `${user(a.applicantId).name} 加入了合作${a.role ? '（' + a.role + '）' : ''}，请确认合作单。`);
        } else {
          const price = a.quote ? { type: a.quote.type, amount: a.quote.amount } : { type: p.budget?.type || 'negotiable', amount: p.budget?.min || 0 };
          c = { id: id('c'), postId: p.id, applicationIds: [a.id], mode: p.mode, title: p.title, initiatorId: u, memberIds: [u, a.applicantId], roles: { [u]: p.mode === 'together' ? '队长' : p.mode === 'teach' ? '学员' : '发起方', [a.applicantId]: a.role || (p.mode === 'teach' ? '导师' : '执行方') }, status: 'confirming',
            agreement: { title: p.title, scope: p.description, deliverables: p.deliverables || [], milestones: [], startDate: now().slice(0, 10), endDate: (p.deadline || '').slice(0, 10), price, paymentMethod: price.type === 'credit' || price.type === 'free' ? 'none' : 'offline', paymentNote: '', revisions: p.mode === 'help' ? 2 : 0, communication: '平台协作空间', ipOwnership: p.mode === 'together' ? 'shared' : 'initiator', confidentiality: false, extraTerms: '', sessionMinutes: p.sessionMinutes || null, sessions: p.sessions || null },
            agreementVersion: 1, confirmations: {}, completeRequests: {}, createdAt: now() };
          d.collabs.unshift(c);
          sysMsg(c.id, `${user(u).name} 录用了 ${user(a.applicantId).name} 的申请，请双方填写并确认合作单。`);
        }
        if (a.role && p.roles) { const r = p.roles.find((x) => x.name === a.role && !x.filled); if (r) r.filled = true; }
        if (p.mode !== 'together') {
          d.applications.filter((x) => x.postId === p.id && x.status === 'pending').forEach((x) => { x.status = 'rejected'; x.decidedAt = now(); notify(x.applicantId, 'rejected', '申请未被录用', `「${p.title}」已找到合作者，感谢你的申请`, `post.html?id=${p.id}`); });
          p.status = 'in_progress';
        } else if (p.roles && p.roles.every((r) => r.filled)) p.status = 'in_progress';
        notify(a.applicantId, 'accepted', '你的申请已被录用 🎉', `「${p.title}」· 请填写并确认合作单`, `confirm.html?id=${c.id}`);
        save(); return { collabId: c.id };
      }),
      reject: (appId, reason = '') => call('POST', `/applications/${appId}/reject`, { body: { reason } }, () => {
        const d = load(); const a = d.applications.find((x) => x.id === appId); const p = d.posts.find((x) => x.id === a?.postId); if (!p || p.authorId !== needLogin()) fail(403, '无权操作');
        a.status = 'rejected'; a.decidedAt = now(); a.rejectReason = reason; notify(a.applicantId, 'rejected', '申请未被录用', `「${p.title}」${reason ? '：' + reason : ''}`, `post.html?id=${p.id}`); save(); return a;
      }),
      withdraw: (appId) => call('POST', `/applications/${appId}/withdraw`, {}, () => { const a = load().applications.find((x) => x.id === appId); if (!a || a.applicantId !== needLogin() || a.status !== 'pending') fail(1206, '无法撤回'); a.status = 'withdrawn'; const p = load().posts.find((x) => x.id === a.postId); p.applicantCount = Math.max(0, p.applicantCount - 1); save(); return a; }),
    },

    /* ---------- 合作（确认单 + 状态机） ---------- */
    collabs: {
      mine: (params = {}) => call('GET', '/me/collaborations', { query: params }, () => { const u = needLogin(); return load().collabs.filter((c) => c.memberIds.includes(u) && (!params.status || c.status === params.status)).map(collabView); }),
      get: (cid) => call('GET', `/collaborations/${cid}`, {}, () => { const c = load().collabs.find((x) => x.id === cid); mustMember(c); return collabView(c); }),
      /** 修改合作单：仅 confirming 状态可改；版本号 +1，所有人的确认被清空 */
      updateAgreement: (cid, agreement, baseVersion) => call('PUT', `/collaborations/${cid}/agreement`, { body: { agreement, baseVersion } }, () => {
        const c = load().collabs.find((x) => x.id === cid); const u = mustMember(c);
        if (c.status !== 'confirming') fail(1301, '合作已开始，合作单不可再修改');
        if (baseVersion !== c.agreementVersion) fail(1302, '对方刚刚更新了合作单，请刷新后再编辑');
        c.agreement = agreement; c.agreementVersion++; c.confirmations = {};
        sysMsg(c.id, `${user(u).name} 更新了合作单（v${c.agreementVersion}），需要双方重新确认。`);
        c.memberIds.filter((m) => m !== u).forEach((m) => notify(m, 'agreement', `${user(u).name} 修改了合作单`, c.title, `confirm.html?id=${c.id}`));
        save(); return collabView(c);
      }),
      /** 确认当前版本；全部成员确认 → active */
      confirm: (cid, version) => call('POST', `/collaborations/${cid}/confirm`, { body: { version } }, () => {
        const c = load().collabs.find((x) => x.id === cid); const u = mustMember(c);
        if (version !== c.agreementVersion) fail(1302, '合作单已更新，请查看最新版本后再确认');
        c.confirmations[u] = now();
        c.memberIds.filter((m) => m !== u).forEach((m) => notify(m, 'agreement', `${user(u).name} 已确认合作单`, c.title, `confirm.html?id=${c.id}`));
        if (c.status === 'confirming' && c.memberIds.every((m) => c.confirmations[m])) { c.status = 'active'; c.startedAt = now(); sysMsg(c.id, `双方已确认合作单 v${c.agreementVersion}，合作正式开始。`); }
        save(); return collabView(c);
      }),
      cancel: (cid, reason) => call('POST', `/collaborations/${cid}/cancel`, { body: { reason } }, () => {
        const d = load(); const c = d.collabs.find((x) => x.id === cid); const u = mustMember(c);
        if (c.status !== 'confirming') fail(1303, '合作已开始，请与对方协商后申请平台介入');
        c.status = 'cancelled'; c.cancelReason = reason; c.cancelledBy = u;
        const p = d.posts.find((x) => x.id === c.postId); if (p && p.status === 'in_progress') p.status = 'open';
        c.memberIds.filter((m) => m !== u).forEach((m) => notify(m, 'agreement', '合作已取消', `${c.title}${reason ? '：' + reason : ''}`, 'dashboard.html'));
        save(); return collabView(c);
      }),
      toggleMilestone: (cid, mid, done) => call('PATCH', `/collaborations/${cid}/milestones/${mid}`, { body: { done } }, () => {
        const c = load().collabs.find((x) => x.id === cid); const u = mustMember(c); const m = c.agreement.milestones.find((x) => x.id === mid); if (!m) fail(404, '里程碑不存在');
        m.done = done; m.doneAt = done ? now() : null; if (done) sysMsg(cid, `${user(u).name} 将里程碑「${m.title}」标记为完成`); save(); return collabView(c);
      }),
      /** 申请结项：第一人调用 → delivered（待验收）；全部成员调用 → completed */
      complete: (cid) => call('POST', `/collaborations/${cid}/complete`, {}, () => {
        const d = load(); const c = d.collabs.find((x) => x.id === cid); const u = mustMember(c);
        if (!['active', 'delivered'].includes(c.status)) fail(1304, '当前状态不能结项');
        c.completeRequests[u] = now();
        if (c.memberIds.every((m) => c.completeRequests[m])) {
          c.status = 'completed'; c.completedAt = now(); sysMsg(cid, '合作已完成 🎉 快去给对方写评价吧。');
          const p = d.posts.find((x) => x.id === c.postId); if (p && p.mode !== 'together') p.status = 'completed';
          c.memberIds.forEach((m) => { const mu = user(m); mu.stats.completed++; notify(m, 'complete', '合作已完成，去评价', c.title, `review.html?id=${cid}`); });
        } else { c.status = 'delivered'; sysMsg(cid, `${user(u).name} 申请结项，等待其他成员确认验收。`); c.memberIds.filter((m) => m !== u).forEach((m) => notify(m, 'complete', `${user(u).name} 申请结项`, c.title, `workspace.html?id=${cid}`)); }
        save(); return collabView(c);
      }),
    },

    /* ---------- 协作空间：消息 ---------- */
    messages: {
      list: (cid, params = {}) => call('GET', `/collaborations/${cid}/messages`, { query: params }, () => { mustMember(load().collabs.find((x) => x.id === cid)); return load().messages.filter((m) => m.collabId === cid && (!params.after || m.createdAt > params.after)); }),
      /** data: { type:'text'|'file', content, fileId?, version? } */
      send: (cid, data) => call('POST', `/collaborations/${cid}/messages`, { body: data }, () => {
        const c = load().collabs.find((x) => x.id === cid); const u = mustMember(c); if (!['active', 'delivered', 'confirming'].includes(c.status)) fail(1401, '合作已结束，无法发送消息');
        const m = { id: id('msg'), collabId: cid, senderId: u, createdAt: now(), ...data }; load().messages.push(m); save();
        mockAutoReply(c, u, data); return m;
      }),
    },

    /* ---------- 协作空间：文件与版本 ---------- */
    files: {
      list: (cid) => call('GET', `/collaborations/${cid}/files`, {}, () => { mustMember(load().collabs.find((x) => x.id === cid)); return load().files.filter((f) => f.collabId === cid); }),
      /**
       * 上传文件。opts.fileId 存在 → 作为该文件的新版本；否则新建文件。
       * 真实后端：multipart/form-data，字段 file, note, folder；返回完整 FileAsset（含全部 versions）。
       */
      upload: (cid, file, opts = {}) => {
        if (!C.USE_MOCK) { const f = new FormData(); f.append('file', file); f.append('note', opts.note || ''); f.append('folder', opts.folder || ''); return http('POST', opts.fileId ? `/collaborations/${cid}/files/${opts.fileId}/versions` : `/collaborations/${cid}/files`, { form: f }); }
        return call('POST', `/collaborations/${cid}/files`, {}, () => {
          const d = load(); const u = mustMember(d.collabs.find((x) => x.id === cid));
          const v = { id: id('fv'), size: file.size, mime: file.type, url: URL.createObjectURL(file), note: opts.note || '', uploaderId: u, createdAt: now() };
          let asset = opts.fileId && d.files.find((x) => x.id === opts.fileId);
          if (asset) { v.version = asset.versions.length + 1; asset.versions.push(v); }
          else { v.version = 1; asset = { id: id('f'), collabId: cid, name: file.name, folder: opts.folder || '未分类', pinned: false, createdAt: now(), versions: [v] }; d.files.unshift(asset); }
          d.messages.push({ id: id('msg'), collabId: cid, senderId: u, type: 'file', content: opts.note || '', fileId: asset.id, version: v.version, createdAt: now() });
          d.collabs.find((x) => x.id === cid).memberIds.filter((m) => m !== u).forEach((m) => notify(m, 'file', `${user(u).name} 上传了${v.version > 1 ? '新版本' : '文件'}`, `${asset.name} · v${v.version}`, `workspace.html?id=${cid}`));
          save(); return asset;
        });
      },
      pin: (cid, fid, pinned) => call('PATCH', `/collaborations/${cid}/files/${fid}`, { body: { pinned } }, () => { const f = load().files.find((x) => x.id === fid); mustMember(load().collabs.find((x) => x.id === cid)); f.pinned = pinned; save(); return f; }),
      remove: (cid, fid) => call('DELETE', `/collaborations/${cid}/files/${fid}`, {}, () => { const d = load(); const u = mustMember(d.collabs.find((x) => x.id === cid)); const f = d.files.find((x) => x.id === fid); if (f.versions[0].uploaderId !== u) fail(403, '只能删除自己上传的文件'); d.files = d.files.filter((x) => x.id !== fid); save(); }),
    },

    /* ---------- 评价 ---------- */
    reviews: {
      /** 返回 { mine: Review[], received: Review[] (对方未提交前为空——双盲), pendingFor: userId[] } */
      forCollab: (cid) => call('GET', `/collaborations/${cid}/reviews`, {}, () => {
        const d = load(); const c = d.collabs.find((x) => x.id === cid); const u = mustMember(c);
        const all = d.reviews.filter((r) => r.collabId === cid);
        const mine = all.filter((r) => r.reviewerId === u);
        const received = all.filter((r) => r.revieweeId === u && mine.some((m) => m.revieweeId === r.reviewerId));
        return { mine, received: received.map((r) => ({ ...r, reviewer: publicUser(user(r.reviewerId)) })), pendingFor: c.memberIds.filter((m) => m !== u && !mine.some((r) => r.revieweeId === m)) };
      }),
      /** data: { revieweeId, rating(1-5), dims:{quality,communication,punctuality}, tags:[], content } */
      submit: (cid, data) => call('POST', `/collaborations/${cid}/reviews`, { body: data }, () => {
        const d = load(); const c = d.collabs.find((x) => x.id === cid); const u = mustMember(c);
        if (c.status !== 'completed') fail(1501, '合作完成后才能评价'); if (!c.memberIds.includes(data.revieweeId) || data.revieweeId === u) fail(1502, '评价对象错误');
        if (d.reviews.some((r) => r.collabId === cid && r.reviewerId === u && r.revieweeId === data.revieweeId)) fail(1503, '你已经评价过了');
        const r = { id: id('r'), collabId: cid, reviewerId: u, createdAt: now(), ...data }; d.reviews.push(r); recalcStats(data.revieweeId);
        notify(data.revieweeId, 'review', `${user(u).name} 给你写了评价`, '提交你的评价后即可查看', `review.html?id=${cid}`);
        save(); return r;
      }),
    },

    /* ---------- 通知 ---------- */
    notifications: {
      list: () => call('GET', '/me/notifications', {}, () => { const u = uid(); return load().notifications.filter((n) => n.userId === u).slice(0, 30); }),
      read: (nid) => call('POST', `/notifications/${nid}/read`, {}, () => { const n = load().notifications.find((x) => x.id === nid); if (n) n.read = true; save(); }),
      readAll: () => call('POST', '/notifications/read-all', {}, () => { const u = uid(); load().notifications.forEach((n) => n.userId === u && (n.read = true)); save(); }),
    },

    /* ---------- 平台统计（首页） ---------- */
    stats: {
      overview: () => call('GET', '/stats/overview', {}, () => ({ users: 12840, collaborations: 3620, schools: 46, avgRating: 4.8, byMode: { teach: 1280, help: 1730, together: 610 } })),
    },

    /* ---------- 实时（WebSocket） ---------- */
    /**
     * 订阅协作空间实时事件。回调参数：{ type: 'message'|'file'|'collab'|'typing', data }
     * 真实后端：WS_BASE + `?token=...&collabId=...`，服务器推送 JSON 同结构。
     * Mock：监听其它标签页的 localStorage 变化 + 本页自动回复事件。
     */
    realtime: {
      subscribe(cid, cb) {
        if (!C.USE_MOCK) {
          const ws = new WebSocket(`${C.WS_BASE}?token=${encodeURIComponent(localStorage.getItem(C.TOKEN_KEY) || '')}&collabId=${cid}`);
          ws.onmessage = (e) => { try { cb(JSON.parse(e.data)); } catch (_) {} };
          return () => ws.close();
        }
        const onStorage = (e) => { if (e.key === DB_KEY) { db = null; cb({ type: 'refresh' }); } };
        const onLocal = (e) => e.detail.collabId === cid && cb(e.detail.evt);
        addEventListener('storage', onStorage); addEventListener('cl-mock-rt', onLocal);
        return () => { removeEventListener('storage', onStorage); removeEventListener('cl-mock-rt', onLocal); };
      },
      typing(cid) { /* 真实后端：ws.send({type:'typing'}) */ },
    },

    /* ---------- 仅 Mock 使用 ---------- */
    _mockUsers: () => load().users.map((u) => ({ id: u.id, name: u.name })),
    _mockSwitch: (u) => { localStorage.setItem(UID_KEY, u); localStorage.setItem(C.TOKEN_KEY, 'mock-' + u); },
    _mockReset: () => { localStorage.removeItem(DB_KEY); localStorage.removeItem(UID_KEY); db = null; },
    ApiError,
  };

  /* Mock：对方自动回复，让演示更“活”。真实环境删除即可。 */
  const REPLIES = ['收到～我看一下', '好的，没问题！', '这个我今晚改完发你', '可以的，我们按合作单的时间来', '👍 明白了'];
  function mockAutoReply(c, from, data) {
    if (data.type !== 'text') return;
    const other = c.memberIds.find((m) => m !== from);
    const fire = (evt) => dispatchEvent(new CustomEvent('cl-mock-rt', { detail: { collabId: c.id, evt } }));
    setTimeout(() => fire({ type: 'typing', data: { userId: other } }), 900);
    setTimeout(() => {
      const m = { id: id('msg'), collabId: c.id, senderId: other, type: 'text', content: REPLIES[Math.floor(Math.random() * REPLIES.length)], createdAt: now() };
      load().messages.push(m); save(); fire({ type: 'message', data: m });
    }, 2600);
  }

  CL.api = api;
})();
