/**
 * Mock 种子数据。字段结构 = 后端接口返回结构（见 /docs/API.md 与 /docs/DATA_MODEL.md）。
 * 时间用相对当前时间生成，保证演示时“几小时前/几天后截止”等显示合理。
 */
(function () {
  const H = 3600e3, D = 24 * H;
  const t = (ms) => new Date(Date.now() + ms).toISOString();

  function seed() {
    const users = [
      { id: 'u1', name: '林知夏', avatarColor: 0, school: '南湖大学', major: '数字媒体技术', grade: '大二', email: 'linzx@nhu.edu.cn', verified: true, verifiedType: 'student',
        bio: '喜欢把复杂的东西讲清楚。会一点剪辑和前端，正在学数据分析。', skills: ['Premiere', '剪辑', 'HTML/CSS', '短视频运营'], responseTime: '1 小时内',
        stats: { rating: 4.8, ratingCount: 12, completed: 15, goodRate: 96, works: 6 },
        services: [{ id: 's11', mode: 'teach', title: 'Pr 剪辑入门 1v1', price: { type: 'per_session', min: 39 }, unit: '45 分钟' }, { id: 's12', mode: 'help', title: '短视频粗剪+字幕', price: { type: 'fixed', min: 80 }, unit: '起' }],
        experiences: [{ id: 'e11', title: '校学生会新媒体部 · 视频组组长', org: '南湖大学学生会', period: '2025.09 - 至今', desc: '负责迎新、校庆等 20+ 条官方视频的策划与剪辑。' }],
        awards: [{ title: '校园短视频大赛 二等奖', year: '2025' }], links: [{ label: 'B站主页', url: 'https://example.com' }], createdAt: t(-200 * D) },
      { id: 'u2', name: '陈一然', avatarColor: 0, school: '南湖大学', major: '交互设计', grade: '大三', email: 'chenyr@nhu.edu.cn', verified: true, verifiedType: 'student',
        bio: '交互设计在读，做过 6 个完整 App 项目。擅长从 0 到 1 梳理信息架构，也能出高保真视觉。', skills: ['Figma', 'UI 设计', '品牌视觉', '动效原型'], responseTime: '2 小时内',
        stats: { rating: 4.9, ratingCount: 31, completed: 38, goodRate: 98, works: 24 },
        services: [{ id: 's21', mode: 'teach', title: '1v1 作品集指导', price: { type: 'per_session', min: 49 }, unit: '30 分钟' }, { id: 's22', mode: 'help', title: 'App 图标 / 界面设计', price: { type: 'fixed', min: 129 }, unit: '起' }, { id: 's23', mode: 'together', title: '比赛项目 UI 负责人', price: { type: 'credit' }, unit: '' }],
        experiences: [{ id: 'e21', title: '交互设计实习生', org: '某互联网公司 用户体验部', period: '2025.07 - 2025.09', desc: '参与电商 App 改版，负责商品详情与购物车模块。' }, { id: 'e22', title: '学院设计工作室 成员', org: '设计学院', period: '2024.03 - 至今', desc: '承接校内 10+ 视觉项目。' }],
        awards: [{ title: '全国大学生广告艺术大赛 省一等奖', year: '2025' }, { title: '学院优秀作品集', year: '2024' }], links: [{ label: '站酷', url: 'https://example.com' }], createdAt: t(-400 * D) },
      { id: 'u3', name: '周子航', avatarColor: 1, school: '南湖大学', major: '计算机科学与技术', grade: '大四', email: 'zhouzh@nhu.edu.cn', verified: true, verifiedType: 'student',
        bio: '全栈开发，React + Go。参加过三次互联网+，喜欢做真正有人用的东西。', skills: ['React', 'Go', '小程序', '数据库设计'], responseTime: '半天内',
        stats: { rating: 4.7, ratingCount: 18, completed: 21, goodRate: 95, works: 9 },
        services: [{ id: 's31', mode: 'help', title: '小程序/网站开发', price: { type: 'fixed', min: 500 }, unit: '起' }],
        experiences: [{ id: 'e31', title: '后端开发实习', org: '某云服务公司', period: '2025.06 - 2025.12', desc: '负责内部工单系统的 API 与数据库。' }],
        awards: [{ title: '“互联网+”大学生创新创业大赛 省金奖', year: '2025' }], links: [{ label: 'GitHub', url: 'https://example.com' }], createdAt: t(-500 * D) },
      { id: 'u4', name: '苏沐', avatarColor: 2, school: '南湖大学', major: '视觉传达设计', grade: '大二', email: 'sumu@nhu.edu.cn', verified: true, verifiedType: 'student',
        bio: '插画与海报，偏好大胆的配色。', skills: ['插画', '海报设计', 'Procreate', 'AI 绘图'], responseTime: '3 小时内',
        stats: { rating: 4.8, ratingCount: 9, completed: 11, goodRate: 97, works: 18 }, services: [{ id: 's41', mode: 'help', title: '活动海报设计', price: { type: 'fixed', min: 60 }, unit: '起' }],
        experiences: [], awards: [], links: [], createdAt: t(-300 * D) },
      { id: 'u5', name: '许嘉禾', avatarColor: 3, school: '滨江理工大学', major: '金融工程', grade: '研一', email: 'xujh@bjut.edu.cn', verified: true, verifiedType: 'student',
        bio: 'Python 数据分析、计量经济学。做过 3 个数模国赛。', skills: ['Python', 'Pandas', 'Stata', '数学建模'], responseTime: '2 小时内',
        stats: { rating: 4.9, ratingCount: 22, completed: 27, goodRate: 99, works: 7 }, services: [{ id: 's51', mode: 'teach', title: 'Python 数据分析带练', price: { type: 'hourly', min: 60 }, unit: '' }],
        experiences: [{ id: 'e51', title: '助教', org: '《计量经济学》课程', period: '2025.09 - 至今', desc: '负责习题课与 Stata 上机。' }], awards: [{ title: '全国大学生数学建模竞赛 国家二等奖', year: '2024' }], links: [], createdAt: t(-600 * D) },
      { id: 'u6', name: '何以宁', avatarColor: 4, school: '南湖大学', major: '广播电视编导', grade: '大三', email: 'heyn@nhu.edu.cn', verified: false, verifiedType: null,
        bio: '拍片、剪片、调色，能扛机器也能写脚本。', skills: ['摄影', 'DaVinci 调色', '脚本策划'], responseTime: '1 天内',
        stats: { rating: 4.6, ratingCount: 6, completed: 7, goodRate: 92, works: 12 }, services: [], experiences: [], awards: [], links: [], createdAt: t(-150 * D) },
      { id: 'u7', name: '王子墨', avatarColor: 5, school: '滨江理工大学', major: '机械设计制造及其自动化', grade: '大三', email: 'wangzm@bjut.edu.cn', verified: true, verifiedType: 'student',
        bio: 'SolidWorks 建模、Arduino。在找一起冲机械创新大赛的队友。', skills: ['SolidWorks', 'Arduino', '3D 打印'], responseTime: '3 小时内',
        stats: { rating: 4.5, ratingCount: 4, completed: 5, goodRate: 90, works: 5 }, services: [], experiences: [], awards: [], links: [], createdAt: t(-120 * D) },
      { id: 'u8', name: '高明远', avatarColor: 7, school: '南湖大学', major: '计算机学院 · 博士生', grade: '博二', email: 'gaomy@nhu.edu.cn', verified: true, verifiedType: 'tutor',
        bio: '研究方向为机器学习。可以带本科生入门科研、读论文、写第一篇 paper。', skills: ['机器学习', '论文写作', 'PyTorch', '科研入门'], responseTime: '1 天内',
        stats: { rating: 5.0, ratingCount: 14, completed: 16, goodRate: 100, works: 4 }, services: [{ id: 's81', mode: 'teach', title: '科研入门 & 论文精读', price: { type: 'per_session', min: 99 }, unit: '60 分钟' }],
        experiences: [{ id: 'e81', title: '博士研究生', org: '南湖大学 计算机学院', period: '2024.09 - 至今', desc: '一作 CCF-B 论文 2 篇。' }], awards: [], links: [], createdAt: t(-700 * D) },
    ];

    const portfolio = [
      { id: 'w1', userId: 'u2', title: '校园音乐节 FEST 主视觉', description: '为 2025 校园音乐节设计的主视觉与延展物料。', coverKind: 'poster', coverSeed: 0, tags: ['品牌视觉'], link: '', createdAt: t(-60 * D) },
      { id: 'w2', userId: 'u2', title: '“拾光”二手书 App', description: '从调研到高保真的完整 App 设计，含 40+ 页面与交互原型。', coverKind: 'app', coverSeed: 0, tags: ['UI 设计', 'Figma'], link: '', createdAt: t(-90 * D) },
      { id: 'w3', userId: 'u2', title: '学习打卡小程序', description: '设计规范与组件库。', coverKind: 'web', coverSeed: 1, tags: ['组件库'], link: '', createdAt: t(-120 * D) },
      { id: 'w4', userId: 'u2', title: '动效原型合集', description: 'Principle / Figma Smart Animate。', coverKind: 'shapes', coverSeed: 0, tags: ['动效原型'], link: '', createdAt: t(-150 * D) },
      { id: 'w5', userId: 'u3', title: '社团管理系统', description: 'React + Go + PostgreSQL，已服务 30+ 社团。', coverKind: 'code', coverSeed: 0, tags: ['React', 'Go'], link: '', createdAt: t(-40 * D) },
      { id: 'w6', userId: 'u3', title: '食堂排队预测小程序', description: '基于历史刷卡数据的排队时长预测。', coverKind: 'chart', coverSeed: 2, tags: ['小程序'], link: '', createdAt: t(-200 * D) },
      { id: 'w7', userId: 'u1', title: '迎新晚会 官方预告片', description: '策划 + 拍摄 + 剪辑，全网播放 5w+。', coverKind: 'video', coverSeed: 0, tags: ['剪辑'], link: '', createdAt: t(-30 * D) },
      { id: 'w8', userId: 'u1', title: '个人主页（手写 HTML）', description: '响应式个人网站。', coverKind: 'web', coverSeed: 0, tags: ['HTML/CSS'], link: '', createdAt: t(-80 * D) },
      { id: 'w9', userId: 'u4', title: '节气插画系列', description: '二十四节气插画，已出明信片。', coverKind: 'shapes', coverSeed: 3, tags: ['插画'], link: '', createdAt: t(-20 * D) },
      { id: 'w10', userId: 'u5', title: '城市房价影响因素分析', description: 'Python + 空间计量，数模国二论文。', coverKind: 'chart', coverSeed: 0, tags: ['数据分析'], link: '', createdAt: t(-100 * D) },
      { id: 'w11', userId: 'u6', title: '毕业季微电影《夏至》', description: '导演/摄影/调色。', coverKind: 'video', coverSeed: 1, tags: ['摄影'], link: '', createdAt: t(-50 * D) },
      { id: 'w12', userId: 'u7', title: '自动分拣小车', description: 'SolidWorks 建模 + Arduino 控制。', coverKind: 'model', coverSeed: 0, tags: ['SolidWorks'], link: '', createdAt: t(-70 * D) },
      { id: 'w13', userId: 'u8', title: '论文：小样本图像分类', description: 'CCF-B 会议论文。', coverKind: 'doc', coverSeed: 0, tags: ['机器学习'], link: '', createdAt: t(-300 * D) },
      { id: 'w14', userId: 'u5', title: 'Stata 上机讲义', description: '整理的 12 讲讲义。', coverKind: 'doc', coverSeed: 2, tags: ['Stata'], link: '', createdAt: t(-130 * D) },
    ];

    const posts = [
      // ---- u1 自己发布的 ----
      { id: 'p1', mode: 'help', authorId: 'u1', title: '毕设开题答辩 PPT 视觉优化（20 页左右）', summary: '内容已写好，需要整体统一风格、做几张信息图。', description: '我已经把开题报告的内容整理成了 20 页左右的 PPT，但版式很乱。希望有同学帮忙：\n1. 统一配色与字体，做一套母版；\n2. 把 3 页技术路线做成信息图；\n3. 交付可编辑的 .pptx 源文件。\n周五前需要初稿。', category: '设计', tags: ['PPT', '信息图', '视觉设计'], budget: { type: 'fixed', min: 150 }, deadline: t(4 * D), location: 'online', status: 'in_progress', requirements: ['有 PPT / Keynote 作品', '能接受 2 轮修改'], deliverables: ['.pptx 源文件', 'PDF 版'], createdAt: t(-3 * D), applicantCount: 4, viewCount: 86 },
      { id: 'p2', mode: 'together', authorId: 'u1', title: '“互联网+”大赛：校园二手交易项目招募开发与运营', summary: '已有创意与商业计划初稿，缺 1 名后端、1 名运营。', description: '项目方向：校园闲置物品循环平台。目前团队 2 人（产品 + 设计），已完成 BP 初稿和原型。\n寻找：\n· 后端开发：能独立搭 API 与数据库；\n· 运营/市场：负责用户调研与推广数据。\n比赛可计入综测加分，获奖奖金平分。', category: '竞赛', tags: ['互联网+', '创新创业', '综测加分'], budget: { type: 'credit' }, deadline: t(12 * D), location: 'either', status: 'open', event: '第十二届“互联网+”大学生创新创业大赛', teamSize: 4, roles: [{ name: '产品', filled: true }, { name: 'UI 设计', filled: true }, { name: '后端开发', filled: false }, { name: '运营', filled: false }], requirements: ['每周可投入 6 小时以上', '有相关项目经验优先'], createdAt: t(-2 * D), applicantCount: 3, viewCount: 142 },
      { id: 'p3', mode: 'teach', authorId: 'u1', title: '求一位学长学姐带我入门 Python 数据分析', summary: '零基础，想在一个月内能独立做一份课程数据报告。', description: '目前只会一点点 Python 语法。希望每周 2 次线上 1v1，每次 1 小时，从 Pandas 到可视化，最后带我完成一份课程报告。', category: '编程', tags: ['Python', 'Pandas', '数据可视化'], budget: { type: 'hourly', min: 50, max: 70 }, deadline: t(6 * D), location: 'online', status: 'open', sessionMinutes: 60, sessions: 8, requirements: ['数据分析相关专业或有项目经验'], createdAt: t(-20 * H), applicantCount: 2, viewCount: 57 },
      // ---- 其他人的 ----
      { id: 'p4', mode: 'teach', authorId: 'u4', title: '想请人看看我的作品集，准备投设计实习', summary: '15 页作品集，想要针对性修改意见。', description: '准备投大厂视觉设计实习，希望有经验的同学帮我过一遍作品集，30 分钟语音即可。', category: '设计', tags: ['作品集', '求职'], budget: { type: 'per_session', min: 49 }, deadline: t(2 * D), location: 'online', status: 'open', sessionMinutes: 30, sessions: 1, createdAt: t(-5 * H), applicantCount: 1, viewCount: 33 },
      { id: 'p5', mode: 'help', authorId: 'u6', title: '社团招新视频需要一名剪辑师（2 分钟）', summary: '素材已拍完，约 40 分钟原片。', description: '摄影社招新视频，素材已拍完。需要粗剪 + 精剪 + 字幕 + 简单调色，风格参考附件。', category: '剪辑', tags: ['剪辑', 'Premiere', '字幕'], budget: { type: 'fixed', min: 200, max: 300 }, deadline: t(5 * D), location: 'online', status: 'open', deliverables: ['1080p 成片', '工程文件'], createdAt: t(-9 * H), applicantCount: 5, viewCount: 98 },
      { id: 'p6', mode: 'together', authorId: 'u7', title: '机械创新大赛 找 1 名嵌入式 + 1 名做答辩展示的伙伴', summary: '作品：智能垃圾分类小车，结构已完成 70%。', description: '结构部分我负责，缺控制与答辩展示。省赛在 12 月中旬。', category: '竞赛', tags: ['机械创新', '嵌入式', '答辩'], budget: { type: 'credit' }, deadline: t(9 * D), location: 'offline', status: 'open', event: '全国大学生机械创新设计大赛', teamSize: 3, roles: [{ name: '结构设计', filled: true }, { name: '嵌入式', filled: false }, { name: '答辩展示', filled: false }], createdAt: t(-1 * D), applicantCount: 2, viewCount: 64 },
      { id: 'p7', mode: 'help', authorId: 'u5', title: '帮忙做一个数据看板网页（课程项目展示用）', summary: '数据和图表我来出，需要一个好看的单页。', description: '用 ECharts 或任意框架都行，部署到 GitHub Pages。', category: '开发', tags: ['前端', 'ECharts'], budget: { type: 'fixed', min: 300 }, deadline: t(8 * D), location: 'online', status: 'open', createdAt: t(-30 * H), applicantCount: 2, viewCount: 41 },
      { id: 'p8', mode: 'teach', authorId: 'u7', title: 'SolidWorks 装配体总是报错，求大佬 1 小时线下答疑', summary: '图书馆或实验楼都可以。', description: '配合关系一多就过定义，希望有人当面帮我看看。', category: '工科', tags: ['SolidWorks'], budget: { type: 'per_session', min: 40 }, deadline: t(1 * D), location: 'offline', status: 'open', sessionMinutes: 60, sessions: 1, createdAt: t(-3 * H), applicantCount: 0, viewCount: 12 },
      { id: 'p9', mode: 'together', authorId: 'u5', title: '美赛 MCM 组队：缺 1 位擅长写作的同学', summary: '两位建模/编程已就位，英文写作缺人。', description: '目标 M 奖以上。寒假集训，2 月正式比赛。', category: '竞赛', tags: ['美赛', '数学建模', '英文写作'], budget: { type: 'credit' }, deadline: t(20 * D), location: 'online', status: 'open', event: '美国大学生数学建模竞赛 MCM/ICM', teamSize: 3, roles: [{ name: '建模', filled: true }, { name: '编程', filled: true }, { name: '论文写作', filled: false }], createdAt: t(-4 * D), applicantCount: 6, viewCount: 210 },
      { id: 'p10', mode: 'help', authorId: 'u3', title: '小程序首页需要一套 icon（12 个）', summary: '线性风格，蓝色系。', description: '提供参考与尺寸规范，交付 SVG。', category: '设计', tags: ['图标', 'UI 设计'], budget: { type: 'fixed', min: 129 }, deadline: t(6 * D), location: 'online', status: 'open', createdAt: t(-2 * D), applicantCount: 3, viewCount: 77 },
      { id: 'p11', mode: 'teach', authorId: 'u6', title: '想入门科研，有没有学长带读论文', summary: '对 CV 方向感兴趣，大三想进实验室。', description: '每周 1 次，读一篇经典论文并讨论。', category: '科研', tags: ['科研入门', '论文精读'], budget: { type: 'negotiable' }, deadline: t(14 * D), location: 'either', status: 'open', createdAt: t(-6 * D), applicantCount: 1, viewCount: 39 },
      { id: 'p12', mode: 'help', authorId: 'u4', title: '社团活动海报 ×3（已完成）', summary: '', description: '已完成的合作。', category: '设计', tags: ['海报'], budget: { type: 'fixed', min: 90 }, deadline: t(-10 * D), location: 'online', status: 'completed', createdAt: t(-25 * D), applicantCount: 2, viewCount: 50 },
    ];

    const applications = [
      { id: 'a1', postId: 'p1', applicantId: 'u2', message: '你好！我做过学院 3 次答辩 PPT 的模板，附上 FEST 主视觉和一份答辩模板供参考。可以周四出初稿。', quote: { type: 'fixed', amount: 150 }, portfolioIds: ['w1', 'w3'], availableTime: '本周每天晚上', role: null, status: 'accepted', createdAt: t(-2.8 * D), decidedAt: t(-2.5 * D) },
      { id: 'a2', postId: 'p1', applicantId: 'u4', message: '可以做，偏插画风。', quote: { type: 'fixed', amount: 120 }, portfolioIds: ['w9'], availableTime: '周末', role: null, status: 'rejected', createdAt: t(-2.7 * D), decidedAt: t(-2.5 * D) },
      { id: 'a3', postId: 'p2', applicantId: 'u3', message: '去年做过类似的校园交易平台（社团管理系统也是我写的），后端可以全包，还能顺带搭一下小程序端。', quote: null, portfolioIds: ['w5', 'w6'], availableTime: '每周 10 小时', role: '后端开发', status: 'accepted', createdAt: t(-1.8 * D), decidedAt: t(-1.2 * D) },
      { id: 'a4', postId: 'p2', applicantId: 'u6', message: '我可以负责宣传视频和线下推广，做过摄影社招新。', quote: null, portfolioIds: ['w11'], availableTime: '每周 6 小时', role: '运营', status: 'pending', createdAt: t(-1 * D) },
      { id: 'a5', postId: 'p2', applicantId: 'u5', message: '可以做用户调研的问卷设计与数据分析，补充 BP 里的市场规模部分。', quote: null, portfolioIds: ['w10'], availableTime: '每周 5 小时', role: '运营', status: 'pending', createdAt: t(-10 * H) },
      { id: 'a6', postId: 'p3', applicantId: 'u5', message: '我是计量课助教，带过 20+ 位同学入门。会按你的课程报告倒推学习路线。', quote: { type: 'hourly', amount: 60 }, portfolioIds: ['w10', 'w14'], availableTime: '周二、周四晚', role: null, status: 'pending', createdAt: t(-8 * H) },
      { id: 'a7', postId: 'p3', applicantId: 'u8', message: '可以带，但我更擅长机器学习方向，数据分析基础部分也没问题。', quote: { type: 'hourly', amount: 80 }, portfolioIds: ['w13'], availableTime: '周末下午', role: null, status: 'pending', createdAt: t(-3 * H) },
      { id: 'a8', postId: 'p5', applicantId: 'u1', message: '我是学生会视频组组长，迎新预告片是我剪的，可以 3 天出成片。', quote: { type: 'fixed', amount: 240 }, portfolioIds: ['w7'], availableTime: '本周都可以', role: null, status: 'pending', createdAt: t(-6 * H) },
      { id: 'a9', postId: 'p12', applicantId: 'u1', message: '可以做。', quote: { type: 'fixed', amount: 90 }, portfolioIds: ['w8'], availableTime: '', role: null, status: 'accepted', createdAt: t(-24 * D), decidedAt: t(-23 * D) },
    ];

    const baseAgreement = (o) => Object.assign({ title: '', scope: '', deliverables: [], milestones: [], startDate: '', endDate: '', price: { type: 'fixed', amount: 0 }, paymentMethod: 'offline', paymentNote: '', revisions: 2, communication: '平台协作空间', ipOwnership: 'initiator', confidentiality: false, extraTerms: '' }, o);

    const collabs = [
      { id: 'c1', postId: 'p1', applicationIds: ['a1'], mode: 'help', title: '毕设开题答辩 PPT 视觉优化', initiatorId: 'u1', memberIds: ['u1', 'u2'], roles: { u1: '发起方', u2: '设计' }, status: 'active',
        agreement: baseAgreement({ title: '毕设开题答辩 PPT 视觉优化', scope: '对 20 页开题 PPT 进行视觉统一，制作母版，并将技术路线 3 页制作为信息图。', deliverables: ['可编辑 .pptx 源文件', 'PDF 导出版', '母版与配色说明'], milestones: [{ id: 'm1', title: '风格方向确认（2 套样张）', due: t(-1 * D).slice(0, 10), done: true }, { id: 'm2', title: '初稿交付（全部 20 页）', due: t(1 * D).slice(0, 10), done: false }, { id: 'm3', title: '修改定稿', due: t(3 * D).slice(0, 10), done: false }], startDate: t(-2.4 * D).slice(0, 10), endDate: t(4 * D).slice(0, 10), price: { type: 'fixed', amount: 150 }, paymentMethod: 'offline', paymentNote: '定稿后微信转账', revisions: 2 }),
        agreementVersion: 2, confirmations: { u1: t(-2.3 * D), u2: t(-2.35 * D) }, completeRequests: {}, createdAt: t(-2.5 * D), startedAt: t(-2.3 * D) },
      { id: 'c2', postId: 'p2', applicationIds: ['a3'], mode: 'together', title: '“互联网+”校园二手交易项目', initiatorId: 'u1', memberIds: ['u1', 'u3'], roles: { u1: '队长 / 产品', u3: '后端开发' }, status: 'confirming',
        agreement: baseAgreement({ title: '“互联网+”校园二手交易项目 · 组队协议', scope: '周子航负责后端 API、数据库与部署；林知夏负责产品与项目管理。双方共同完成参赛材料。', deliverables: ['可演示的 MVP（小程序 + 后台）', '技术方案文档', '参赛答辩材料中的技术部分'], milestones: [{ id: 'm4', title: '技术选型与数据库设计', due: t(5 * D).slice(0, 10), done: false }, { id: 'm5', title: 'MVP 可演示', due: t(25 * D).slice(0, 10), done: false }, { id: 'm6', title: '校赛提交', due: t(40 * D).slice(0, 10), done: false }], startDate: t(1 * D).slice(0, 10), endDate: t(60 * D).slice(0, 10), price: { type: 'credit', amount: 0 }, paymentMethod: 'none', paymentNote: '奖金按贡献平分；署名顺序：林知夏、周子航', revisions: 0, ipOwnership: 'shared', confidentiality: true }),
        agreementVersion: 1, confirmations: { u3: t(-5 * H) }, completeRequests: {}, createdAt: t(-1.2 * D) },
      { id: 'c3', postId: 'p12', applicationIds: ['a9'], mode: 'help', title: '社团活动海报 ×3', initiatorId: 'u4', memberIds: ['u4', 'u1'], roles: { u4: '发起方', u1: '设计' }, status: 'completed',
        agreement: baseAgreement({ title: '社团活动海报 ×3', scope: '三张活动海报。', deliverables: ['3 张 PNG + 源文件'], startDate: t(-23 * D).slice(0, 10), endDate: t(-12 * D).slice(0, 10), price: { type: 'fixed', amount: 90 } }),
        agreementVersion: 1, confirmations: { u4: t(-23 * D), u1: t(-23 * D) }, completeRequests: { u1: t(-13 * D), u4: t(-12 * D) }, createdAt: t(-23 * D), startedAt: t(-23 * D), completedAt: t(-12 * D) },
    ];

    const messages = [
      { id: 'msg1', collabId: 'c1', senderId: null, type: 'system', content: '双方已确认合作单 v2，合作正式开始。', createdAt: t(-2.3 * D) },
      { id: 'msg2', collabId: 'c1', senderId: 'u2', type: 'text', content: '你好～我先根据你的内容做两套风格样张，一套偏学术蓝，一套偏简约黑白。', createdAt: t(-2.2 * D) },
      { id: 'msg3', collabId: 'c1', senderId: 'u1', type: 'text', content: '好呀！学校模板要求必须有校徽，放在左上角就行。', createdAt: t(-2.1 * D) },
      { id: 'msg4', collabId: 'c1', senderId: 'u2', type: 'file', content: '样张两套，看看更喜欢哪个？', fileId: 'f1', version: 1, createdAt: t(-1.2 * D) },
      { id: 'msg5', collabId: 'c1', senderId: 'u1', type: 'text', content: '蓝色这套！技术路线那页可以再简化一点吗', createdAt: t(-1.1 * D) },
      { id: 'msg6', collabId: 'c1', senderId: null, type: 'system', content: '里程碑「风格方向确认（2 套样张）」已完成', createdAt: t(-1 * D) },
      { id: 'msg7', collabId: 'c1', senderId: 'u2', type: 'file', content: '按意见改了一版，信息图做了 3 页。', fileId: 'f1', version: 2, createdAt: t(-4 * H) },
      { id: 'msg8', collabId: 'c1', senderId: 'u2', type: 'text', content: '母版也一起放进去了，明晚前给你全部 20 页～', createdAt: t(-4 * H + 60e3) },
      { id: 'msg9', collabId: 'c2', senderId: null, type: 'system', content: '林知夏 录用了 周子航 的申请，请双方填写并确认合作单。', createdAt: t(-1.2 * D) },
      { id: 'msg10', collabId: 'c2', senderId: 'u3', type: 'text', content: '合作单我补充了技术部分，已确认，你看看～', createdAt: t(-5 * H) },
    ];

    const files = [
      { id: 'f1', collabId: 'c1', name: '开题答辩_视觉稿.pptx', folder: '设计稿', pinned: true, createdAt: t(-1.2 * D),
        versions: [
          { id: 'fv1', version: 1, size: 4.2e6, mime: 'application/vnd.ms-powerpoint', url: '#', note: '两套风格样张（学术蓝 / 简约黑白）', uploaderId: 'u2', createdAt: t(-1.2 * D) },
          { id: 'fv2', version: 2, size: 6.8e6, mime: 'application/vnd.ms-powerpoint', url: '#', note: '确定学术蓝；技术路线改为 3 页信息图；新增母版', uploaderId: 'u2', createdAt: t(-4 * H) },
        ] },
      { id: 'f2', collabId: 'c1', name: '开题报告_内容稿.docx', folder: '资料', pinned: false, createdAt: t(-2.2 * D),
        versions: [{ id: 'fv3', version: 1, size: 1.1e6, mime: 'application/msword', url: '#', note: '原始内容', uploaderId: 'u1', createdAt: t(-2.2 * D) }] },
      { id: 'f3', collabId: 'c1', name: '校徽_透明底.png', folder: '资料', pinned: false, createdAt: t(-2.1 * D),
        versions: [{ id: 'fv4', version: 1, size: 220e3, mime: 'image/png', url: '#', note: '', uploaderId: 'u1', createdAt: t(-2.1 * D) }] },
    ];

    const reviews = [
      { id: 'r1', collabId: 'c3', reviewerId: 'u4', revieweeId: 'u1', rating: 5, dims: { quality: 5, communication: 5, punctuality: 5 }, tags: ['沟通顺畅', '交付准时', '超出预期'], content: '效率很高，改稿也很耐心，下次活动还找你！', createdAt: t(-11 * D) },
      { id: 'r2', collabId: 'c3', reviewerId: 'u1', revieweeId: 'u4', rating: 5, dims: { quality: 5, communication: 5, punctuality: 4 }, tags: ['需求清晰', '爽快'], content: '需求说得很清楚，反馈也快。', createdAt: t(-11 * D) },
      { id: 'r3', collabId: 'cx1', reviewerId: 'u3', revieweeId: 'u2', rating: 5, dims: { quality: 5, communication: 5, punctuality: 5 }, tags: ['专业', '审美在线'], content: '图标细节非常到位，还主动补了暗色模式。', createdAt: t(-40 * D) },
      { id: 'r4', collabId: 'cx2', reviewerId: 'u5', revieweeId: 'u2', rating: 5, dims: { quality: 5, communication: 4, punctuality: 5 }, tags: ['交付准时'], content: '作品集指导很有针对性，改完拿到了面试。', createdAt: t(-55 * D) },
      { id: 'r5', collabId: 'cx3', reviewerId: 'u6', revieweeId: 'u5', rating: 5, dims: { quality: 5, communication: 5, punctuality: 5 }, tags: ['讲解清晰', '耐心'], content: '从零讲到回归分析，节奏很舒服。', createdAt: t(-30 * D) },
      { id: 'r6', collabId: 'cx4', reviewerId: 'u7', revieweeId: 'u3', rating: 4, dims: { quality: 5, communication: 4, punctuality: 4 }, tags: ['技术过硬'], content: '代码质量很高，就是有时候回复慢一点。', createdAt: t(-60 * D) },
    ];

    const notifications = [
      { id: 'n1', userId: 'u1', type: 'file', title: '陈一然 上传了新版本', body: '开题答辩_视觉稿.pptx · v2', link: 'workspace.html?id=c1', read: false, createdAt: t(-4 * H) },
      { id: 'n2', userId: 'u1', type: 'agreement', title: '周子航 已确认合作单', body: '“互联网+”校园二手交易项目 · 等待你确认', link: 'confirm.html?id=c2', read: false, createdAt: t(-5 * H) },
      { id: 'n3', userId: 'u1', type: 'application', title: '新的申请', body: '高明远 申请了「求一位学长学姐带我入门 Python 数据分析」', link: 'applicants.html?post=p3', read: false, createdAt: t(-3 * H) },
      { id: 'n4', userId: 'u1', type: 'application', title: '新的申请', body: '许嘉禾 申请了「“互联网+”大赛：校园二手交易项目」', link: 'applicants.html?post=p2', read: true, createdAt: t(-10 * H) },
      { id: 'n5', userId: 'u2', type: 'message', title: '林知夏 发来消息', body: '蓝色这套！技术路线那页可以再简化一点吗', link: 'workspace.html?id=c1', read: false, createdAt: t(-1.1 * D) },
    ];

    return { users, portfolio, posts, applications, collabs, messages, files, reviews, notifications, seq: 100 };
  }

  window.CL = window.CL || {};
  window.CL.mockSeed = seed;
})();
