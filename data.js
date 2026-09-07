/* =====================================================================
 * 银行金融科技前沿技术研究成果 —— 数据文件（金融科技版 v1.30）
 * 技术名称/分层/六维评级/研判结论等基础信息以《前沿技术储备库分层台账 v1.30》为准
 * ===================================================================== */
(function () {
  'use strict';
  var CATEGORY_COLOR = {"人工智能":"#4f8cff","数据要素":"#10b981","量子科技":"#8b5cf6","安全":"#f43f5e","基础设施":"#06b6d4","合规科技":"#14b8a6","客户体验":"#f59e0b"};
  var TIER_COLOR = {"布局层":"#34d399","论证层":"#38bdf8","研究层":"#fbbf24","观察层":"#fb7185"};
  var CATEGORIES = Object.keys(CATEGORY_COLOR);
  var TIERS = Object.keys(TIER_COLOR);
  var ITEMS = [
  { id: 'T01', no: 1, name: '自主型AI智能体（Agentic AI）', short: '自主型AI智能体', nameEn: 'Agentic AI',
    category: '人工智能', categoryKey: '人工智能', archDim: '业务（跨应用）', attr: '新兴（向关键演进）',
    tier: '布局层', disposal: '提前布局',
    maturity: 2, strategicFit: 4, value: 5, feasibility: 3, urgency: 5, openness: 4,
    conclusion: '战略匹配度4分、价值贡献度5分双高，叠加战略紧迫度5分（监管指导意见已出台、同业规模化提速），但技术成熟度仅2分、引入可行度3分（安全与治理短板显著），属"方向确定、价值高但尚未成熟"的提前布局典型，宜资源前置、治理先行。建议：①治理先行（参照OWASP／NIST／人行分级分类，先立权限、审计与熔断）；②窄场景试点（低风险可回滚场景验证，暂缓授信／交易的自主授权）；③能力储备（跟踪多智能体编排、可解释性与护栏，储备人才算力）。',
    definition: '以大模型为核心，能自主感知环境、分解目标、规划任务、调用工具并执行多步操作、在有限人工干预下闭环完成复杂任务的AI系统；区别于仅生成内容的生成式AI，强调自主决策与行动。',
    trend: '· 从人问AI答的被动问答，到授权AI自主完成任务的主动执行\n· 从单一模型调用，到多智能体协同＋工具编排的复合系统\n· 从辅助人工的副驾，到承担端到端流程的AI数字员工',
    bankValue: '· 效率：客服、运营、合规、授信、报告撰写等自动化，早期落地降本30%–50%\n· 风控：实时反欺诈、交易监控、合规检查的自动化编排\n· 客户体验：智能客服／理财顾问的多模态、拟人化交互\n· 新业务：跨境金融、投研、财富管理的AI数字员工能力储备',
    limitation: '· 幻觉／可解释性：输出不确定、决策链难追溯，高风险场景难直接授权\n· 安全与权限：工具调用、越权、记忆投毒、多智能体级联失效等新型攻击面\n· 治理成熟度：多数部署仍限窄场景，全自主尚不适用多数企业级场景\n· 合规：授信评分等属高风险AI用途，监管框架仍在成型',
    maturityBasis: '处于Gartner Hype Cycle期望膨胀期顶点，17%组织已部署、60%＋计划两年内部署，窄场景可用、全自主尚不成熟。', strategicFitBasis: '命中人工智能战略方向核心旗舰路径，2025年全球50家最大银行已公布160＋用例。', valueBasis: '早期落地降本30%–50%，覆盖效率、风控、客户体验、新业务四类价值，长期或重塑软件形态，具战略性潜力。',
    feasibilityBasis: '短板为安全与治理：幻觉、越权、级联失效等新型攻击面及授信等高风险用途合规待成型，需专项治理投入，非否决级。', urgencyBasis: '金融监管总局2026年6月已出台安全开发指导意见，Gartner预测2026年底40%企业应用嵌入任务型智能体，延迟布局将拉大与同业差距。', opennessBasis: 'MCP协议已转由Linux基金会开放治理、月下载约9700万次，A2A协议150＋机构生产使用，多模型多厂商可选，非单点依赖。',
    source: '· Gartner《Hype Cycle for Agentic AI／for AI 2025》及2026 CIO调研（2025.08）\n· OWASP《Top 10 for Agentic Applications 2026》（2025.12）；新加坡IMDA《Agentic AI治理框架》（2026.01）\n· 国内：工行／邮储私有化部署大模型、广西银行桂小AI跨境智能体（2025.09）；人民银行推进大模型金融应用分级分类安全标准\n采集时间：2026-07-06。\n【2026-07增补】深化研究v2.0（04-01_v2.0）29条参考文献：arXiv 2510.25445/2402.02716/2503.16416；Gartner 2026 Hype Cycle；McKinsey银行运营与利润池测算；MIT NANDA《GenAI Divide 2025》；OWASP《Top 10 for Agentic Applications 2026》；IMDA《Model AI Governance Framework for Agentic AI》（2026-01）；央行2026年科技工作会议。勘误：广西案例应为“汇小二”（广西银行业自律机制联建），非“广西银行桂小AI”。\n·【2026-07-14复核增补】金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》（2026.06.18）；Linux基金会MCP项目统计（2026年初）\n·【2026-07-15深化增补】方法论专章依据Gartner《2026 Hype Cycle for Agentic AI》原有引注展开，未新增外部来源。\n·【2026-07-15二次更新增补】Gartner《Hype Cycle for Agentic AI, 2026》官方原文(G00842058)及国家金融监督管理总局《关于银行业保险业人工智能安全开发应用的指导意见》(金发〔2026〕8号)官方原文，均已全文存档于CK001（新增引注[32]，引注[5]补全著录信息）。', attention: '极高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以大模型为核心，能自主感知环境、分解目标、规划任务、调用工具并执行多步操作、在有限人工干预下闭环完成复杂任务的AI系统；区别于仅生成内容的生成式AI，强调自主决策与行动。',
    hypeCycle: 'assets/technologies/T001_自主型AI智能体/T001_自主型AI智能体_成熟度曲线.png',
    folder: 'assets/technologies/T001_自主型AI智能体',
    center: '数智能力中心', centerReason: '价值横跨效率、风控、客户体验、新业务四大类，无单一业务中心可完全承载，作为通用能力供给', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:5, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:5, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T02', no: 2, name: 'AI原生应用架构（AI-Native）', short: 'AI原生应用架构', nameEn: 'AI-Native',
    category: '人工智能', categoryKey: '人工智能', archDim: '应用', attr: '新兴（向关键演进）',
    tier: '布局层', disposal: '提前布局',
    maturity: 2, strategicFit: 4, value: 4, feasibility: 3, urgency: 4, openness: 3,
    conclusion: '战略匹配度4分、价值贡献度4分，叠加战略紧迫度4分（银行侧已从分散试点转向治理化规模投产），但技术成熟度仅2分、范式与工程实践尚未定型，与自主型AI智能体（001）互为表里（前者为架构底座、后者为其上能力），属提前布局典型，宜在新建／重构应用中试点AI内生设计，同步建立模型治理与评估体系，避免在旧架构上无序外挂。',
    definition: '以AI／大模型为核心构建的应用架构范式，将模型推理、智能编排、数据反馈内生于应用，而非在传统应用上外挂AI能力。',
    trend: '· 从传统应用＋AI插件，到AI内生的应用架构\n· 从确定性流程，到概率式智能编排\n· 从人写全部逻辑，到模型＋提示＋工具的软件新形态',
    bankValue: '· 智能编排、流程自动化、个性化服务\n· 提升研发效率（2025已有45%工程师获>10%生产力提升）\n· 重塑客服、营销、运营等应用形态',
    limitation: '· 输出不确定性高、模型治理难\n· 架构范式与工程实践尚在形成\n· 对数据、算力、人才要求高',
    maturityBasis: 'AI驱动架构演进主线尚处早期成型，范式与工程实践未定型，处Hype Cycle早期阶段。', strategicFitBasis: '命中人工智能战略方向，为承载智能体能力的架构底座，核心路径。', valueBasis: '智能编排、流程自动化与个性化服务价值明确，2025年45%工程师获>10%生产力提升，兼具研发效能与业务重塑价值。',
    feasibilityBasis: '架构范式未定型、重构成本与人才门槛高，需专项投入治理，风险总体可管理。', urgencyBasis: '银行侧已从分散试点转向治理化、统一编排的规模投产，0—2年内需明确架构路径。', opennessBasis: '模型网格下多模型混用趋势渐显，但底层大模型部分厂商仍偏闭源，标准尚未完全统一。',
    source: '· Gartner《Hype Cycle for Application Architecture and Integration 2025》\n· Gartner《Maturity Model for AI-Native Software Engineering》\n· Gartner新闻稿：2026年40%企业应用含任务型智能体（2025.08.26）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】Datadog《State of AI Engineering》及行业趋势综述（2026）\n·【2026-07-15深化增补】Gartner《Hype Cycle for AI in Software Engineering, 2026》（新增第19条引注）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-20',
    externalSource: '',
    summary: '以AI／大模型为核心构建的应用架构范式，将模型推理、智能编排、数据反馈内生于应用，而非在传统应用上外挂AI能力。',
    hypeCycle: 'assets/technologies/T002_AI原生应用架构/T002_AI原生应用架构_成熟度曲线.png',
    folder: 'assets/technologies/T002_AI原生应用架构',
    center: '客户经营中心', centerReason: '以个性化服务、重塑客服与营销应用形态为主要价值，与统一商机平台的精准营销、个性化触达能力对应', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T03', no: 3, name: '事件驱动架构（EDA）', short: '事件驱动架构', nameEn: 'EDA',
    category: '数据要素／技术', categoryKey: '数据要素', archDim: '应用', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 5,
    conclusion: '技术成熟度4分、战略匹配度4分、价值贡献度4分均衡达标，生态开放度5分（Kafka等开源事实标准、无单点依赖），属技术成熟、需系统验证的典型，宜组织专题论证：围绕实时风控／支付场景，验证事件一致性、容量规划、消息中间件选型与存量系统迁移路径，明确落地边界与SLA。',
    definition: '以事件的产生、检测、消费为核心的软件架构风格，组件通过异步事件解耦，实现实时响应与松耦合。',
    trend: '· 从批处理／同步调用，到实时事件流\n· 从紧耦合单体，到松耦合事件驱动\n· 支撑实时风控、实时营销与实时支付',
    bankValue: '· 实时响应、实时风控与营销\n· 实时支付处理与事件驱动的反欺诈\n· 系统解耦、弹性扩展与合规审计',
    limitation: '· 事件最终一致性与分布式排障复杂\n· 对幂等、监控、消息中间件要求高\n· 组织与技能门槛',
    maturityBasis: 'Kafka等核心技术成熟、金融业82%＋已采纳，多个行业已有生产案例，落地关键在工程治理。', strategicFitBasis: '命中数据要素／技术战略方向，与实时风控、实时支付、实时营销强相关，为该方向核心技术路径。', valueBasis: '实时能力直接改善风控时效、客户触达与运营效率，覆盖风控与体验两个以上维度。',
    feasibilityBasis: '最终一致性与分布式排障复杂，需专项治理投入，技术与实践相对成熟、风险可控。', urgencyBasis: '实时支付预计2028年全球超5750亿笔，同业已规模化采纳，属3—5年关键推进窗口，尚无强制监管时限。', opennessBasis: 'Kafka为事实标准、Apache 2.0开源，Confluent、云厂商等多厂商充分竞争，无单点依赖。',
    source: '· Confluent《Event-Driven Architecture 完整introduction》\n· Latinia／RTInsights：EDA在银行与金融服务的实时化实践（2025）\n· ACI Worldwide：实时支付2028年全球超5750亿笔预测\n采集时间：2026-07-06。\n·【2026-07-14复核增补】Infosys Finacle《Banking Architecture Trend 2026》（2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以事件的产生、检测、消费为核心的软件架构风格，组件通过异步事件解耦，实现实时响应与松耦合。',
    center: '账务交易中心', centerReason: '核心价值首推实时支付处理与事件驱动的反欺诈，实时支付处理直接对应核心账务处理', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:5, weight:10, max:5 }] }
  },
  { id: 'T04', no: 4, name: 'WebAssembly（WASM／Edge）', short: 'WebAssembly', nameEn: 'WASM／Edge',
    category: '技术', categoryKey: '基础设施', archDim: '应用', attr: '新兴',
    tier: '观察层', disposal: '动态观察',
    maturity: 3, strategicFit: 3, value: 3, feasibility: 3, urgency: 2, openness: 5,
    conclusion: '技术趋势与潜在价值明确，但战略紧迫度评级偏低、对我行尚无明确外部倒逼信号，按六维复核结果转为动态观察：持续跟踪WASI与组件模型生态成熟度、边缘金融与多租户隔离场景的同业实践，待紧迫度信号增强后再评估转入系统论证。',
    definition: '一种可移植、高性能的字节码格式与运行时，使代码以接近原生速度在浏览器、服务端、边缘的安全沙箱中运行。',
    trend: '· 从浏览器内加速，到浏览器外服务端／边缘／嵌入运行时\n· WASI 0.2与组件模型使其2025年跨入生产级\n· 安全沙箱支撑多租户与边缘计算',
    bankValue: '· 低延迟、低成本、边缘金融（边缘风控、就近计算）\n· 安全沙箱多租户隔离\n· 跨语言复用与快速冷启动',
    limitation: '· 生态与标准仍在成熟，工具链／调试／库支持不完善\n· 金融级适配与运维经验少\n· 适配与改造成本高',
    maturityBasis: '2025年为生产级拐点，WASI 0.2组件模型确立、服务端部署占比52%首超浏览器端，属早期采用阶段。', strategicFitBasis: '与边缘金融、低延迟计算潜在相关，非当前核心业务旗舰路径，命中技术方向下的路径之一。', valueBasis: '低延迟、低成本、安全沙箱隔离价值明确，但金融级规模化价值仍待验证。',
    feasibilityBasis: '生态与工具链尚不完善、金融级适配与运维经验少，需专项投入，风险总体可管理。', urgencyBasis: '2026年2月WASI 0.3发布、67%受访者已生产使用，但对我行尚无明确外部倒逼信号，可按3—5年布局节奏推进。', opennessBasis: 'WASI／组件模型为W3C开放标准，WasmEdge、Fermyon等多厂商开源生态，无单点依赖。',
    source: '· Platform.uno《The State of WebAssembly 2025/2026》\n· Fermyon／WasmEdge：Wasm边缘与AI推理生产实践（2025）\n· 行业报道：American Express WASM FaaS、Akamai收购Fermyon（2025）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】The New Stack及State of WebAssembly 2026（2026.02–04）', attention: '中', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '一种可移植、高性能的字节码格式与运行时，使代码以接近原生速度在浏览器、服务端、边缘的安全沙箱中运行。',
    center: '对客服务中心', centerReason: '边缘计算贴近客户触点、就近处理可降低时延，适合提升手机银行、柜面等终端的响应速度，兼具边缘风控场景潜力', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:2, weight:15, max:5 }, { label:'生态开放度', score:5, weight:10, max:5 }] }
  },
  { id: 'T05', no: 5, name: '数据织网（Data Fabric）', short: '数据织网', nameEn: 'Data Fabric',
    category: '数据要素', categoryKey: '数据要素', archDim: '数据', attr: '关键',
    tier: '布局层', disposal: '提前布局',
    maturity: 3, strategicFit: 5, value: 4, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '战略匹配度5分（数据要素核心战略方向被明确点名的旗舰能力）、价值贡献度4分，技术成熟度3分处早期采用阶段，属方向明确、宜提前布局的典型，建议优先建设主动元数据与统一数据访问层能力，选取高价值域先行，逐步向AI-Ready数据演进；数据网格（006）现处观察层，待其信号增强后再行统筹协同规划。',
    definition: '以主动元数据为核心，通过知识图谱与自动化在分布式数据源上编织统一、智能的数据访问与管理层。',
    trend: '· 从人工集成／搬运，到元数据驱动的自动化编织\n· 从数据孤岛，到统一数据视图\n· 支撑AI-Ready数据供给',
    bankValue: '· 统一数据视图、提升数据可用性、支撑AI\n· 降低数据集成成本\n· 强化数据治理与血缘',
    limitation: '· 主动元数据能力要求高、元数据治理难\n· 价值兑现周期长\n· 平台建设投入大',
    maturityBasis: 'Gartner数据管理成熟度曲线处泡沫破裂低谷期（走向成熟信号），22%组织已实施，属早期采用阶段。', strategicFitBasis: '命中数据要素核心战略方向，且为该方向被明确点名的支撑AI-Ready数据的旗舰能力。', valueBasis: '统一数据视图、降低集成成本、强化治理与血缘，支撑AI战略，覆盖数据治理与AI赋能两个以上维度。',
    feasibilityBasis: '主动元数据能力要求高、价值兑现周期长、平台投入大，需专项投入治理。', urgencyBasis: '织网—网格混合架构成为主流（金融业约八成采用混合模式），属3—5年关键窗口，尚无强制监管时限。', opennessBasis: '主流开放标准（如Apache Atlas）与商业方案（Informatica等）并存，存在中等成本的替代路径。',
    source: '· Gartner《What is Data Fabric》及2024数据管理演进调研\n· Gartner：2028年80%自治数据产品源于fabric＋mesh互补架构\n· Starburst／WhereScape：Gartner关于fabric与mesh的解读\n采集时间：2026-07-06。\n·【2026-07-14复核增补】Alation／Promethium数据架构比较研究（2026）\n·【2026-07-15深化增补】方法论专章依据既有Gartner数据管理成熟度曲线引注（[5][6]）展开，未新增外部来源。', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-20',
    externalSource: '',
    summary: '以主动元数据为核心，通过知识图谱与自动化在分布式数据源上编织统一、智能的数据访问与管理层。',
    hypeCycle: 'assets/technologies/T005_数据织网/T005_数据织网_成熟度曲线.png',
    folder: 'assets/technologies/T005_数据织网',
    center: '数智能力中心', centerReason: '定位为统一数据视图、支撑AI应用的数据基础设施能力', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T06', no: 6, name: '数据网格（Data Mesh）', short: '数据网格', nameEn: 'Data Mesh',
    category: '数据要素', categoryKey: '数据要素', archDim: '数据', attr: '新兴',
    tier: '观察层', disposal: '动态观察',
    maturity: 3, strategicFit: 3, value: 3, feasibility: 2, urgency: 2, openness: 3,
    conclusion: '理念扩散但组织门槛高、战略紧迫度评级偏低，按六维复核结果转为动态观察：持续跟踪头部机构完整实施案例与联邦治理框架成熟度，并与数据织网（005）协同关注，待紧迫度信号增强或治理路径更清晰后再评估转入系统论证，避免为去中心化而去中心化。',
    definition: '一种去中心化的数据架构与组织范式，将数据视为产品、由业务域自治拥有，配以自助数据平台与联邦治理。',
    trend: '· 从集中式数据团队，到业务域自治的数据产品\n· 从数据即副产品，到数据即产品\n· 架构与组织的双重变革',
    bankValue: '· 数据所有权下沉、敏捷创新、数据产品化\n· 释放业务域数据价值\n· 与Data Fabric互补支撑数据产品交付',
    limitation: '· 标准统一难、跨域组织协同难\n· 对数据成熟度与治理要求高\n· 易碎片化',
    maturityBasis: '理念广泛扩散，完整实施集中于头部机构，属早期采用阶段。', strategicFitBasis: '命中数据要素战略方向下的技术路径之一，非该方向核心旗舰单列。', valueBasis: '数据产品化、敏捷创新价值明确，但兑现高度依赖组织协同，单一维度价值为主。',
    feasibilityBasis: '跨域组织协同、标准统一难度大，易碎片化，需专项立项治理方可能推进。', urgencyBasis: '理念扩散但尚无明确外部倒逼信号，与数据织网协同的混合模式渐成主流，可按3—5年布局节奏推进。', opennessBasis: '部分工具已开源（如数据目录类组件），但联邦治理框架无统一行业标准，中等成本替代路径存在。',
    source: '· Gartner《Data Fabric and Data Mesh: same or different》\n· Gartner 2024数据管理演进调研（26%采用data mesh）\n· Alation／Intellias：data mesh与data fabric对比（2025/2026）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】Alation／Promethium数据架构比较研究（2026）', attention: '中', status: '在库—已深化研究', updateDate: '2026-07-20',
    externalSource: '',
    summary: '一种去中心化的数据架构与组织范式，将数据视为产品、由业务域自治拥有，配以自助数据平台与联邦治理。',
    hypeCycle: 'assets/technologies/T006_数据网格/T006_数据网格_成熟度曲线.png',
    folder: 'assets/technologies/T006_数据网格',
    center: '数智能力中心', centerReason: '定位为数据所有权下沉、数据产品化的数据治理范式', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:2, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T07', no: 7, name: '后量子密码学（PQC）/后量子身份验证（PQA）', short: '后量子密码学', nameEn: 'PQA',
    category: '量子科技／安全', categoryKey: '量子科技', archDim: '安全', attr: '关键',
    tier: '观察层', disposal: '动态观察',
    maturity: 3, strategicFit: 5, value: 4, feasibility: 2, urgency: 5, openness: 5,
    conclusion: '标准已定、监管倒逼窗口明确，但引入可行度触及否决线（改造范围广、成本高、需与国密路线协调、迁移周期约10年），按六维复核短板原则转为动态观察，并优先突破可行度短板：建议同步开展密码资产盘点与迁移成本／工期测算，形成可分阶段实施的路线后再评估转入系统论证；因战略紧迫度评级高，观察频率应高于一般观察层条目，纳入年度密码资产盘点与G7路线图关键节点重点跟踪。',
    definition: '能抵抗量子计算攻击的密码算法体系，用于替换现有易受量子威胁的RSA／ECC等公钥密码。',
    trend: '· 从经典公钥密码，到抗量子密码\n· NIST 2024.8发布FIPS 203/204/205标准\n· 先存后解威胁驱动提前迁移与密码敏捷',
    bankValue: '· 抗量子、保障长期数据安全与合规\n· 应对harvest now, decrypt later威胁\n· 推动密码敏捷性建设',
    limitation: '· 性能与带宽开销\n· 密码敏捷改造范围广、成本高\n· 与国密路线协调；迁移周期长（约10年）',
    maturityBasis: 'NIST FIPS 203/204/205已定稿，进入迁移期，标准初定，属早期采用阶段。', strategicFitBasis: '命中量子科技／安全双战略方向，关系全行密码体系安全合规。', valueBasis: '保障长期数据安全、规避"先存后解"威胁，覆盖安全合规与长周期数据保护两个以上维度。',
    feasibilityBasis: '改造范围广、成本高，需与国密路线协调、迁移周期长约10年，需专项立项治理，触发引入可行度否决线。', urgencyBasis: 'G7金融业PQC路线图要求2030—2032年迁移、NSA CNSA2.0要求2030年停用RSA/ECDH，英国NCSC要求2028年前完成迁移，延迟将产生显著合规风险。', opennessBasis: 'NIST公开标准算法体系，全球开放、非单一厂商方案。',
    source: '· NIST：FIPS 203/204/205（2024.08.13）；FIPS 206 与 HQC 草案（2026）；IR 8547 迁移指引；CSWP 39 密码敏捷（2025.12.19）\n· G7 网络专家组《金融业 PQC 路线图》（2026-01-13）；美国 PQC 迁移行政令（2026-06-22）\n· NSA CNSA 2.0 迁移时间表（2030/2033）；FIPS 140-2 认证2026-09-21转历史状态\n采集时间：2026-07-07（复核更新）。\n·【2026-07-14复核增补】美国白宫M-26-15备忘录（2026.06）；英国NCSC迁移时间表更新（2026.02）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '能抵抗量子计算攻击的密码算法体系，用于替换现有易受量子威胁的RSA／ECC等公钥密码。',
    center: '技术服务中心', centerReason: '定位为抗量子、推动密码敏捷性建设的加密基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:5, weight:15, max:5 }, { label:'生态开放度', score:5, weight:10, max:5 }] }
  },
  { id: 'T08', no: 8, name: '零信任架构（Zero Trust）', short: '零信任架构', nameEn: 'Zero Trust',
    category: '安全', categoryKey: '安全', archDim: '安全', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '技术成熟度4分（NIST SP 800-207成熟框架）、战略匹配度4分、价值贡献度4分均衡达标，宜组织系统论证分阶段落地：先夯实身份基础设施，选取高价值保护面试点微隔离与持续验证，制定遗留系统适配与体验平衡方案。',
    definition: '从不信任、持续验证的安全架构范式，以身份为中心、最小权限、动态访问控制取代边界信任（NIST SP 800-207）。',
    trend: '· 从边界防御，到持续验证\n· 从网络位置信任，到身份与上下文信任\n· 微隔离与最小权限',
    bankValue: '· 最小权限、持续验证、安全访问\n· 降低横向移动与内部威胁风险\n· 支撑远程办公与多云安全访问',
    limitation: '· 体验下降、老旧单体系统适配难（微隔离难）\n· 改造范围广\n· 需成熟的身份基础设施',
    maturityBasis: 'NIST SP 800-207为成熟框架，SP 1800-35已发布最终版，金融业普遍推进，多个机构已有生产案例。', strategicFitBasis: '命中安全战略方向核心旗舰路径，契合远程办公与多云安全访问需求。', valueBasis: '显著降低横向移动与内部威胁风险，覆盖安全与合规两个以上维度。',
    feasibilityBasis: '遗留单体系统微隔离难、改造范围广、需成熟身份基础设施，需专项投入治理。', urgencyBasis: '零信任边界正扩展至AI智能体访问治理，82%机构已有共识但落地仅17%，属3—5年关键窗口。', opennessBasis: 'NIST公开标准，多厂商方案（含开源与商业）可选，具备国产化替代路径。',
    source: '· NIST SP 800-207《Zero Trust Architecture》\n· NIST NCCoE《Implementing a Zero Trust Architecture》\n· 研究文献：零信任在现代银行平台的落地与遗留系统挑战（2025）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】ISACA《Preparing Zero Trust for AI Disruption》（2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '从不信任、持续验证的安全架构范式，以身份为中心、最小权限、动态访问控制取代边界信任（NIST SP 800-207）。',
    center: '技术服务中心', centerReason: '定位为最小权限、持续验证的安全架构', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T09', no: 9, name: '量子计算（Quantum）', short: '量子计算', nameEn: 'Quantum',
    category: '量子科技', categoryKey: '量子科技', archDim: '技术', attr: '未来',
    tier: '观察层', disposal: '动态观察',
    maturity: 2, strategicFit: 3, value: 2, feasibility: 2, urgency: 1, openness: 3,
    conclusion: '技术成熟度2分、价值贡献度2分（87%机构视为机遇但73%未找到实用场景），战略紧迫度仅1分（容错系统预计2029年后落地，5年以上长期赛道），属动态观察典型，宜持续跟踪硬件与纠错进展及金融用例，保持小规模学习与生态接触；同时与后量子密码学（007）安全线联动——量子威胁的防御侧应先于计算侧推进。',
    definition: '利用量子叠加与纠缠进行计算的新范式，在特定问题（优化、模拟、因数分解）上具指数级潜力。',
    trend: '· 从含噪中等规模（NISQ），到容错量子计算\n· 2025纠错突破（Google Willow指数级降错；IBM Starling 2029路线）\n· 从科研到商业拐点临近',
    bankValue: '· 复杂优化、风险建模、蒙特卡洛加速\n· 组合优化与投资组合\n· 远期的加速计算能力',
    limitation: '· 硬件不成熟、商业化有限\n· 容错量子仍需数年\n· 金融量子优势用例尚未确认（约73%机构未找到实用场景）',
    maturityBasis: 'Google Willow纠错阈值验证等实验性突破渐增，但容错量子系统尚需数年，处技术触发期爬升阶段。', strategicFitBasis: '命中量子科技战略方向下的技术路径之一，非当前核心业务旗舰应用。', valueBasis: '风险建模、组合优化为潜在场景，但87%机构视为机遇、73%未找到实用场景，价值难以量化。',
    feasibilityBasis: '硬件不成熟、商业化有限、投入大、用例不确定，需专项立项治理方可能推进。', urgencyBasis: '容错系统预计2029年后落地，属5年以上长期赛道，早晚推进对近期结果影响很小。', opennessBasis: 'IBM、Google、Quantinuum等多厂商技术路线并行竞争，但接口与标准互不统一，中等成本替代路径。',
    source: '· McKinsey《Quantum Technology Monitor 2026》\n· Google Willow纠错突破（2024.12）；IBM Starling容错路线（2029）\n· 金融业调研：87%视为机遇但73%未找到商用场景\n采集时间：2026-07-06。\n·【2026-07-14复核增补】IBM量子路线图（2026）；行业年度盘点（2026.06）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '利用量子叠加与纠缠进行计算的新范式，在特定问题（优化、模拟、因数分解）上具指数级潜力。',
    center: '技术服务中心', centerReason: '定位为远期加速计算能力，属前沿算力储备', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:2, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:1, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T10', no: 10, name: '算力网络（Compute Network）', short: '算力网络', nameEn: 'Compute Network',
    category: '技术／算力', categoryKey: '基础设施', archDim: '技术', attr: '关键',
    tier: '布局层', disposal: '提前布局',
    maturity: 3, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '政策与产业趋势进一步明确、战略匹配度与价值贡献度评级高，按六维复核结果转为提前布局：结合建设银行贵安、农业银行内蒙古等同业自建数据中心实践，加快推进我行AI算力自建／入网组合策略、弹性调度与成本模型的落地准备，同步跟踪跨域任务级调度标准演进与数据合规方案，为规模化算力布局提前占位。',
    definition: '将广域分布的算力资源通过网络统一编排调度、按需供给的新型基础设施（算网融合）。',
    trend: '· 从孤立数据中心，到东数西算广域算力协同\n· 从静态部署，到弹性调度、算力普惠\n· 算网一体化',
    bankValue: '· 弹性调度、降本增效、算力普惠\n· 支撑AI大模型训练／推理的算力供给\n· 优化算力成本结构',
    limitation: '· 跨域调度复杂、网络时延与带宽瓶颈\n· 算网协同标准与运营模式仍在建\n· 跨域数据合规与安全',
    maturityBasis: '东数西算基础设施快速落地（八枢纽215.5 EFLOPS），企业级弹性调度与运营模式仍在完善，属早期采用阶段。', strategicFitBasis: '命中技术／算力战略方向，国家"东数西算""算电协同"政策级推进，为该方向核心路径。', valueBasis: '弹性调度、降本增效、支撑AI算力供给，覆盖成本优化与AI能力两个以上维度。',
    feasibilityBasis: '跨域调度复杂、算网协同标准与运营模式仍在建、数据合规待明确，需专项投入治理。', urgencyBasis: '"算电协同"已写入2026年《政府工作报告》，同业已自建数据中心布局，属3—5年关键窗口，尚无强制个体时限。', opennessBasis: '国家枢纽与多云厂商并存，同业以自建为主，算网协同标准仍在建，中等成本替代路径。',
    source: '· 新华社／央视：东数西算落子成局（2025）\n· 华为与国家信息中心《区域算力网：高速互联篇研究报告》（2025）\n· 工信部数据：八枢纽215.5 EFLOPS、智算占比80.8%（2025 Q1）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】《政府工作报告》算电协同表述及IDC解读（2026.03）\n【2026-08-17深化增补】国家数据局2026年工作部署（2026-01）；"东数西算"四年八大枢纽量化数据（2026-02，215.5EFLOPS/智算占比80.8%/市场规模8351亿元）；工业和信息化部《算力互联互通行动计划》（2025-05印发，2026/2028两阶段目标）；国家发展改革委算力调度问题专家访谈（2026-03）；金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》算力相关条款（2026-06-18）；贵州算力产业发展公开报道（2026-04，Token调用量/成本优势数据）；三大电信运营商2026年算力投资数据（2026-03）；建设银行贵安数据中心、农业银行内蒙古数据中心、交通银行贵安数据中心公开建设信息（2023-2025年）。采集时间：2026-08-17。', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '将广域分布的算力资源通过网络统一编排调度、按需供给的新型基础设施（算网融合）。',
    folder: 'assets/technologies/T010_算力网络',
    reportDocx: 'assets/technologies/T010_算力网络/T010_算力网络_专题研究报告.docx', reportDocxName: 'T010_算力网络_专题研究报告.docx', reportDocxSize: '506.0 KB', reportDocxDate: '2026-08-17', reportPdf: 'assets/technologies/T010_算力网络/T010_算力网络_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T010_算力网络/T010_算力网络_演示汇报.pptx', slidesPptxName: 'T010_算力网络_演示汇报.pptx', slidesPptxSize: '5.8 KB', slidesPptxDate: '2026-08-17', slidesPdf: 'assets/technologies/T010_算力网络/T010_算力网络_演示汇报.pdf',
    image: 'assets/technologies/T010_算力网络/T010_算力网络_一张图.svg', imageName: 'T010_算力网络_一张图.svg', imageSize: '4.2 KB',
    center: '技术服务中心', centerReason: '定位为弹性调度、算力普惠的算力基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T11', no: 11, name: '平台工程／IDP（Platform Engineering / IDP）', short: '平台工程', nameEn: 'Platform Engineering / IDP',
    category: '技术', categoryKey: '基础设施', archDim: '技术', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '技术成熟度4分（Gartner预测2026年80%大型组织设平台团队）、战略匹配度4分、价值贡献度4分均衡达标，宜结合我行研发体系系统论证：明确IDP建设范围、黄金路径与平台团队组建，评估投入产出与现有DevOps工具链的整合，避免重复造轮。',
    definition: '以内部开发者平台（IDP）为载体，将基础设施、流水线、环境等自助化封装为黄金路径，提升研发效能。',
    trend: '· 从DevOps人力协作，到平台化自助\n· 从零散工具，到统一IDP与黄金路径\n· 平台即产品',
    bankValue: '· 提升交付效率、标准化平台、改善开发者体验\n· 支撑AI工程化落地\n· 降低认知负荷与重复劳动',
    limitation: '· 初期投入大、平台团队能力要求高\n· 需组织与文化配合\n· 避免沦为又一层工具',
    maturityBasis: 'Gartner预测2026年80%大型软件组织将设平台团队，DORA实证部署频率提升3.5倍，多个行业已有生产案例。', strategicFitBasis: '命中技术战略方向，为AI工程化落地与研发效能提升的平台底座核心路径。', valueBasis: '标准化、自助化显著提升交付效率与开发者体验，覆盖效能与AI工程化两个以上维度。',
    feasibilityBasis: '初期投入大、平台团队能力要求高、需组织文化配合，需专项投入治理。', urgencyBasis: '2026年73%平台团队已内置AI辅助能力，同业先行信号明确，属3—5年关键窗口。', opennessBasis: 'Backstage等CNCF开源IDP工具生态成熟，多厂商可选，具备自建路径。',
    source: '· Gartner：2026年80%软件组织设平台团队\n· Gartner《2025 Market Guide for Internal Developer Portals》\n· 行业报告：2025年55%组织采纳平台工程、86%高管视为AI落地关键\n采集时间：2026-07-06。\n·【2026-07-14复核增补】LeanOps／platformengineering.org年度趋势（2026.01）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以内部开发者平台（IDP）为载体，将基础设施、流水线、环境等自助化封装为黄金路径，提升研发效能。',
    center: '技术服务中心', centerReason: '定位为标准化平台、改善开发者体验的研发效能平台', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T12', no: 12, name: '可观测性标准化（OpenTelemetry）', short: '可观测性标准化', nameEn: 'OpenTelemetry',
    category: '技术', categoryKey: '基础设施', archDim: '技术', attr: '关键',
    tier: '研究层', disposal: '深入研究',
    maturity: 5, strategicFit: 3, value: 3, feasibility: 3, urgency: 3, openness: 5,
    conclusion: '技术成熟度5分（2026年5月CNCF毕业、事实标准）、生态开放度5分，但战略匹配度、价值贡献度均为3分（运维支撑路径而非核心业务旗舰），属深入研究典型，宜研究统一遥测标准在我行监控体系的落地路径与成本优化（采样、存储分层），先在关键链路试点，为后续系统论证／落地铺路。',
    definition: '一套开源、厂商中立的可观测性数据（指标／日志／链路）采集标准与工具集，统一遥测数据规范。',
    trend: '· 从厂商锁定的分散监控，到统一、中立的可观测性标准\n· 2026.5晋级CNCF毕业项目，成事实标准\n· 向Profiling、eBPF扩展',
    bankValue: '· 全链路可观测、快速定位、智能运维\n· 避免厂商锁定\n· 支撑SRE与AIOps',
    limitation: '· 遥测数据量大、存储与分析成本高\n· 采集规范落地与埋点改造工作量大\n· 分析能力要求高',
    maturityBasis: '2026年5月CNCF毕业（最高成熟度）、12000＋贡献者，事实标准，技术已就绪，主流成熟。', strategicFitBasis: '命中技术战略方向下运维支撑路径之一，非核心业务旗舰单列。', valueBasis: '统一遥测、快速定位、支撑AIOps，运维价值明确但非核心业务变量，单一维度价值为主。',
    feasibilityBasis: '遥测数据量大、存储分析成本高、埋点改造工作量大，需专项投入治理。', urgencyBasis: '事实标准地位持续巩固并向AI／大模型可观测性延伸，属3—5年关键窗口，尚无强制监管时限。', opennessBasis: 'CNCF毕业项目，完全开源（Apache 2.0），厂商中立，无单点依赖。',
    source: '· CNCF：OpenTelemetry晋级毕业项目（2026.05）\n· InfoQ／DevOps.com：OTel达CNCF最高成熟度\n· OpenTelemetry官方博客：毕业与Profiling／eBPF进展（2026）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】wasmCloud社区进展与LLM可观测性平台综述（2026.02）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '一套开源、厂商中立的可观测性数据（指标／日志／链路）采集标准与工具集，统一遥测数据规范。',
    center: '智慧运营中心', centerReason: '提供全链路可观测、快速定位、智能运维能力，直接支撑数智运营服务平台/智能工厂的稳定运行监控', assessment: { dimensions: [{ label:'技术成熟度', score:5, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:5, weight:10, max:5 }] }
  },
  { id: 'T13', no: 13, name: '隐私增强计算／隐私计算（PETs：联邦学习·MPC·全同态加密FHE）', short: '隐私增强计算', nameEn: 'PETs：联邦学习·MPC·全同态加密FHE',
    category: '数据要素／安全', categoryKey: '数据要素', archDim: '数据·安全', attr: '关键（新兴向关键演进）',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 5, value: 4, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '战略匹配度5分（"数据要素×"三年行动计划重点支撑技术）、价值贡献度4分、技术成熟度4分（联邦学习/MPC已有金融生产案例），宜系统论证：优选联合风控/供应链金融高价值场景先行验证，与数据织网（005）、合成数据（020）协同规划密态数据流通能力。',
    definition: '一组"数据可用不可见"技术，含联邦学习、多方安全计算、差分隐私与全同态加密，使多方在不暴露原始数据前提下联合计算与建模。',
    trend: '· 从数据集中汇聚才能用，到数据不动价值动的联合计算\n· 从事后合规审查，到密态运算内生保护',
    bankValue: '· 数据要素×金融：跨机构联合风控、联合营销、供应链金融"数据不出域"合规流通\n· 支撑数据资产入表与对外数据合作，降低数据泄露与合规风险',
    limitation: '· FHE等重加密方案算力开销大、性能仍受限；跨机构标准与互操作性尚不完善；结果可用性与隐私强度需权衡',
    maturityBasis: '联邦学习／MPC已有多个金融生产案例，标准逐步统一；FHE仍在工程化爬坡但非决定整体评级的唯一子技术。', strategicFitBasis: '命中数据要素／安全双战略方向，国家"数据要素×"三年行动计划列为重点支撑技术。', valueBasis: '解锁跨机构联合风控、联合营销与数据资产变现，覆盖效率、风控、新业务多个维度。',
    feasibilityBasis: '算力开销大、跨机构标准与互操作性不完善，需专项投入治理。', urgencyBasis: '"数据要素×"三年行动计划（2024—2026）进入收官之年，属3—5年关键窗口，尚无个体强制时限。', opennessBasis: '联邦学习框架部分已开源（如FATE），但跨机构互操作标准不完善，专有与开放并存。',
    source: '安全内参《基于隐私计算的商业银行数据要素流通应用场景研究》2024；北京金融科技产业联盟《金融业数据应用发展报告2024—2025》2026-01；国家数据局等《"数据要素×"三年行动计划(2024—2026)》。\n·【2026-07-14复核增补】方达《金融法律监管年度报告（2026）：金融科技篇》（2026）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '一组"数据可用不可见"技术，含联邦学习、多方安全计算、差分隐私与全同态加密，使多方在不暴露原始数据前提下联合计算与建模。',
    center: '业务处理中心', centerReason: '支撑供应链金融\"数据不出域\"的合规流通，与该中心的保理、单证等业务直接对应', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T14', no: 14, name: '机密计算（Confidential Computing／TEE）', short: '机密计算', nameEn: 'Confidential Computing／TEE',
    category: '数据要素／安全', categoryKey: '数据要素', archDim: '安全·技术', attr: '新兴',
    tier: '观察层', disposal: '动态观察',
    maturity: 3, strategicFit: 5, value: 3, feasibility: 3, urgency: 2, openness: 2,
    conclusion: '市场增长快但银行级应用信号尚不密集、战略紧迫度评级偏低，按六维复核结果转为动态观察：持续跟踪国产TEE与远程证明成熟度，并与隐私增强计算（013）协同关注密态计算路线，待紧迫度信号增强或标准化程度提升后再评估转入系统论证。',
    definition: '基于硬件可信执行环境（TEE，如Intel TDX/SGX、ARM CCA）在使用中加密数据与代码，构建可远程证明的隔离计算飞地。',
    trend: '· 从静态/传输中加密，到使用中（in-use）加密的全生命周期保护\n· 从信任云平台，到硬件根信任、去信任化运算',
    bankValue: '· 敏感工作负载上云、多方数据协作、私有大模型推理的数据主权保护\n· 与隐私计算互补，为密态AI推理提供硬件底座',
    limitation: '· 依赖芯片厂商与远程证明信任链；性能开销与生态适配；国产化TEE成熟度与供应链约束',
    maturityBasis: '市场规模2025→2026由约93增至152亿美元快速增长，但企业级金融应用仍少，属早期采用阶段。', strategicFitBasis: '命中数据要素／安全双战略方向，为密态AI推理提供硬件级数据主权保护。', valueBasis: '敏感负载上云与密态AI推理价值明确，但规模化收益尚待验证，单一维度价值为主。',
    feasibilityBasis: '依赖芯片厂商信任链与远程证明，国产化TEE成熟度与供应链存在约束，需专项投入治理。', urgencyBasis: '市场增长快但银行级应用信号尚不密集，暂无明确外部倒逼时限，可按3—5年布局节奏推进。', opennessBasis: '深度依赖Intel TDX/SGX、ARM CCA等少数芯片厂商方案，标准化程度低、接口相对私有，迁移成本高。',
    source: 'Cyberus《Confidential Computing in 2026》；Fortune/Mordor机密计算市场报告2025—2026；Red Hat密态AI推理2025-10。\n·【2026-07-14复核增补】金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》（2026.06.18）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '基于硬件可信执行环境（TEE，如Intel TDX/SGX、ARM CCA）在使用中加密数据与代码，构建可远程证明的隔离计算飞地。',
    center: '技术服务中心', centerReason: '定位为敏感工作负载上云、数据主权保护的可信执行环境基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:2, weight:15, max:5 }, { label:'生态开放度', score:2, weight:10, max:5 }] }
  },
  { id: 'T15', no: 15, name: '区块链资产代币化与可编程货币', short: '区块链资产代币化与可编程货币', nameEn: '',
    category: '数据要素／未来（金融基础设施）', categoryKey: '数据要素', archDim: '业务', attr: '未来',
    tier: '观察层', disposal: '动态观察',
    maturity: 2, strategicFit: 4, value: 5, feasibility: 1, urgency: 3, openness: 2,
    conclusion: '价值贡献度5分（跨境支付、RWA具颠覆性潜力）、战略匹配度4分虽高，但引入可行度仅1分（合规变量大、须与数字人民币及监管协调，触发否决线），按短板原则不宜直接进入论证，宜动态观察：跟踪境内外监管、数字人民币协同与同业代币化试点，保持小规模学习与生态接触，作为重大外部变量储备。',
    definition: '以分布式账本将存款、债券、基金及现实世界资产（RWA）代币化，并以合规稳定币/代币化存款承载链上支付结算。',
    trend: '· 从账户记账与T+N清算，到链上原子结算、可编程货币\n· 从封闭金融基础设施，到TradFi与链上金融融合',
    bankValue: '· 跨境支付、代币化存款、债券/基金代币化与RWA新业务，7×24原子结算、降本提效\n· 前瞻布局数字金融基础设施',
    limitation: '· 我行语境合规变量大，须与数字人民币/监管协调；技术标准、账本选型与反洗钱、储备与赎回机制未定型；跨境监管分歧',
    maturityBasis: '美国GENIUS Act确立联邦框架、OCC/FDIC规则进入部署期，标准与账本选型未定，处技术触发期爬升阶段。', strategicFitBasis: '命中数据要素／未来金融基础设施方向，为该方向被点名的前瞻布局技术路径。', valueBasis: '跨境支付、代币化存款与RWA具战略性、颠覆性潜力，7×24原子结算可大幅降本提效。',
    feasibilityBasis: '合规变量大、须与数字人民币及监管协调，AML与储备赎回机制未定型，触发引入可行度否决线。', urgencyBasis: '稳定币交易量已超越Visa、同业加速布局，境内RWA差异化监管路径初现，属3—5年关键窗口。', opennessBasis: '账本技术标准与厂商选型未定，跨境监管分歧显著，潜在替代路径存在但迁移成本高。',
    source: '· 美国 GENIUS Act（2025-07-18）；OCC Bulletin 2026-3；FDIC 实施 GENIUS Act 拟议规则（2026-04-07 通过）\n· Brookings《Next steps for GENIUS payment stablecoins》（2026）；Wolters Kluwer《GENIUS Act 2026》\n采集时间：2026-07-07（复核更新）。\n·【2026-07-14复核增补】八部门《关于进一步防范和处置虚拟货币交易炒作风险的通知》（2026.02.06）；香港金管局首批稳定币发牌（2026.04.10）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '以分布式账本将存款、债券、基金及现实世界资产（RWA）代币化，并以合规稳定币/代币化存款承载链上支付结算。',
    center: '产品合约中心', centerReason: '以代币化存款、债券/基金代币化与RWA新业务为核心，本质是创设新产品形态', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:5, weight:20, max:5 }, { label:'引入可行度', score:1, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:2, weight:10, max:5 }] }
  },
  { id: 'T16', no: 16, name: '向量数据库与检索增强生成（Vector DB·RAG／GraphRAG）', short: '向量数据库与检索增强生成', nameEn: 'Vector DB·RAG／GraphRAG',
    category: '人工智能／数据要素', categoryKey: '人工智能', archDim: '数据·应用', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 5, value: 4, feasibility: 4, urgency: 4, openness: 4,
    conclusion: '六维评分全线均衡（成熟度4／战略匹配度5／价值贡献度4／引入可行度4／战略紧迫度4／生态开放度4），为001智能体、002 AI原生落地的必备组件，宜系统论证：围绕客服/合规/投研场景验证混合检索与GraphRAG、建立知识权限与评估体系，与001/002及005数据织网协同。',
    definition: '以向量数据库存储语义嵌入，结合知识图谱做混合检索，为大模型提供可溯源的外部知识，降低幻觉。',
    trend: '· 从纯参数记忆的黑箱问答，到检索增强、事实可溯源\n· 从纯向量相似检索，到向量+图谱混合、GraphRAG多跳推理',
    bankValue: '· 智能客服、合规问答、投研与知识管理的事实底座，显著降幻觉、可引用\n· 001智能体/002 AI原生落地的必备组件',
    limitation: '· 知识治理与权限隔离、检索质量与更新时效、GraphRAG构建成本；企业级安全访问控制要求高',
    maturityBasis: '2026年RAG被视为企业AI战略刚需，混合检索成默认范式，多个行业已有生产案例。', strategicFitBasis: '命中人工智能／数据要素双战略方向，为001智能体、002 AI原生落地的必备组件。', valueBasis: '显著降幻觉、可引用溯源，覆盖智能客服、合规问答、投研等效率、体验、合规多个维度。',
    feasibilityBasis: '知识治理与权限隔离为主要风险，各子要素总体可控，可按常规评审推进。', urgencyBasis: 'Gartner预计2026年七成以上企业生成式AI项目需结构化检索管线以控制幻觉与合规风险，0—2年内需启动。', opennessBasis: 'Milvus、pgvector等多厂商方案多为开源，具备国产化替代路径。',
    source: 'Techment《RAG in 2026》；Neo4j《What is GraphRAG》；VentureBeat 2026数据预测；Onyx企业RAG平台指南2026。\n·【2026-07-14复核增补】Gartner《Top Trends in D&A 2026：GraphRAG》（2026）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以向量数据库存储语义嵌入，结合知识图谱做混合检索，为大模型提供可溯源的外部知识，降低幻觉。',
    center: '数智能力中心', centerReason: '是自主型AI智能体、AI原生应用落地的必备组件，属AI能力底座', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:4, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T17', no: 17, name: 'AI智能体互操作协议（MCP·A2A·ACP）', short: 'AI智能体互操作协议', nameEn: 'MCP·A2A·ACP',
    category: '人工智能', categoryKey: '人工智能', archDim: '应用·技术', attr: '新兴',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 4, value: 3, feasibility: 3, urgency: 3, openness: 5,
    conclusion: '技术成熟度3分（标准仍在快速演进收敛）、生态开放度5分（MCP/A2A均已开源治理），与001智能体互补，宜深入研究：跟踪MCP/A2A收敛与安全规范，在智能体试点中评估协议选型与治理接口，条件成熟再随001转论证。',
    definition: '智能体与工具、智能体与智能体间的标准通信协议：MCP（agent-tool）、A2A（agent-agent）、ACP等，构建可互操作的智能体生态。',
    trend: '· 从各家私有插件与孤岛集成，到跨厂商标准化互操作\n· 从单体智能体，到多智能体协作编排',
    bankValue: '· 为001智能体落地提供标准化工具接入与多体协作底座，降低集成与锁定成本\n· 统一行内智能体治理与审计接口',
    limitation: '· 标准仍在快速演进与收敛（MCP/A2A融合工作进行中）；安全与权限模型、供应链信任待成熟',
    maturityBasis: 'MCP由Linux基金会Agentic AI Foundation治理、社区服务器超1.8万，标准仍在快速演进收敛，属早期采用阶段。', strategicFitBasis: '命中人工智能战略方向，与001智能体强绑定，为其标准化工具接入与协作底座。', valueBasis: '降低集成与锁定成本、统一治理接口，价值随智能体规模化放大，单一维度价值为主。',
    feasibilityBasis: '标准未完全定型、安全与供应链信任模型待成熟，需专项投入治理。', urgencyBasis: '2026年超100家企业采用MCP/A2A双协议，属3—5年关键窗口，尚无强制监管时限。', opennessBasis: 'MCP已转入Linux基金会开放治理、A2A同样开源，月下载9700万次，无单点依赖。',
    source: 'Zylos Research《Agent Interoperability Protocols 2026》；arXiv 2505.02279 协议综述；Turion.ai《AI Agent Protocol Stack 2026》。\n·【2026-07-14复核增补】Linux基金会MCP项目统计与A2A采用情况（2026年初）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '智能体与工具、智能体与智能体间的标准通信协议：MCP（agent-tool）、A2A（agent-agent）、ACP等，构建可互操作的智能体生态。',
    center: '数智能力中心', centerReason: '为自主型AI智能体落地提供协作底座，与其同属智能体能力集群', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:5, weight:10, max:5 }] }
  },
  { id: 'T18', no: 18, name: '人工智能安全平台（AISP）及AI在网络风险管理中的应用', short: '人工智能安全平台', nameEn: '',
    category: '人工智能／安全', categoryKey: '人工智能', archDim: '安全', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 5, value: 4, feasibility: 3, urgency: 4, openness: 3,
    conclusion: '战略匹配度5分（人工智能／安全双战略方向核心刚需）、价值贡献度4分、战略紧迫度4分（金融监管总局指导意见已明确合规要求），治理先行属性强，宜系统论证：参照Gartner/NIST/OWASP与人行监管，建立提示注入防护、输出护栏、模型评估与运行时监控，作为001/002/017的统一护栏先行落地。同业已有可验证路径（新加坡银行公会ABS护栏手册、DBS治理框架量化成效），论证重点为治理层先行的能力缺口评估与内置/采购边界，建议与001智能体治理合并立项，6—9个月完成能力蓝图。',
    definition: '覆盖AI可信、风险与安全管理的框架与能力：提示注入防护、数据与输出护栏、模型评估、运行时异常检测与AI治理平台。',
    trend: '· 从模型能力优先，到治理护栏与安全内生并重\n· 从人工抽检，到运行时持续监控与强制执行',
    bankValue: '· 001/002/017落地的前置护栏，防提示注入、数据泄露、幻觉与越权\n· 满足监管对AI可解释、可审计、可控的要求',
    limitation: '· 多智能体与自治场景治理工具尚不成熟；标准与评测基准演进中；内部策略违规为主要风险源',
    maturityBasis: 'TRiSM框架清晰、护栏工具成形，Gartner已发布市场指南，2024—2025年五起标志性并购显示品类快速走向成熟整合。', strategicFitBasis: '命中人工智能／安全双战略方向，为001/002/017规模化落地的前置刚需。', valueBasis: '影子AI治理价值可量化，DBS案例显示统一护栏可将AI上线周期压缩超80%，覆盖安全与效率多个维度。',
    feasibilityBasis: '厂商整合期选型需组件化，多智能体治理工具尚不成熟，需专项投入治理。', urgencyBasis: '金融监管总局2026年6月18日已发布AI安全开发应用指导意见，AI安全平台由前瞻布局转为合规刚需，0—2年内需启动。', opennessBasis: '市场处并购整合期、厂商格局未定，主流开放标准与专有方案并存。',
    source: '· Gartner《Govern AI Using TRiSM》（2026）及 AI 安全平台市场研究；IBM《What Is AI TRiSM》；Arthur《Best AI Governance Platforms 2026》\n· OWASP《Top 10 for Agentic Applications 2026》；NIST AI RMF\n采集时间：2026-07-07（复核更新）。\n·【2026-07-14复核增补】金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》（2026.06.18）\n·【2026-08-17深化增补】HiddenLayer/Palo Alto Networks/Cisco/Check Point/F5/SentinelOne官方并购公告；Fortune Business Insights《AI TRiSM Market Size 2026-2034》；Airia《Shadow AI Statistics 2026》；OWASP genai.owasp.org《Top 10 for Agentic Applications 2026》；全国网络安全标准化技术委员会TC260-003《生成式人工智能服务安全基本要求》；新加坡银行公会(ABS)/MAS《Handbook on Generative AI Guardrails in Banking》(2025-05)；DBS Bank《Responsible AI in Banking》；中国银行业大模型应用跟踪报告(2026)。采集时间：2026-08-17。', attention: '高', status: '在库—已深化研究', updateDate: '2026-08-17',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '覆盖AI可信、风险与安全管理的框架与能力：提示注入防护、数据与输出护栏、模型评估、运行时异常检测与AI治理平台。',
    folder: 'assets/technologies/T018_人工智能安全平台',
    reportDocx: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_专题研究报告.docx', reportDocxName: 'T018_人工智能安全平台_专题研究报告.docx', reportDocxSize: '405.3 KB', reportDocxDate: '2026-08-17', reportPdf: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_演示汇报.pptx', slidesPptxName: 'T018_人工智能安全平台_演示汇报.pptx', slidesPptxSize: '5.8 KB', slidesPptxDate: '2026-08-17', slidesPdf: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_演示汇报.pdf',
    image: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_一张图.svg', imageName: 'T018_人工智能安全平台_一张图.svg', imageSize: '4.2 KB',
    center: '技术服务中心', centerReason: '是自主型AI智能体、AI原生应用、智能体互操作协议等落地的前置护栏，与后量子密码学、零信任架构、机密计算同属安全工程基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T19', no: 19, name: '小语言模型与端侧AI（SLM·On-device／Edge AI）', short: '小语言模型与端侧AI', nameEn: 'SLM·On-device／Edge AI',
    category: '人工智能', categoryKey: '人工智能', archDim: '应用·技术', attr: '新兴',
    tier: '研究层', disposal: '深入研究',
    maturity: 4, strategicFit: 4, value: 3, feasibility: 4, urgency: 3, openness: 4,
    conclusion: '技术成熟度4分（2026年出现小模型领域任务超越大模型案例）、战略匹配度4分，价值贡献度3分（单一维度价值为主），与WebAssembly（004）边缘计算联动，宜深入研究：在客服质检/网点/移动端高频窄场景评估SLM微调蒸馏与端侧部署的成本—效果，形成大小模型协同的推理策略。',
    definition: '参数量较小、面向特定任务、可在端侧/本地部署的语言模型，兼顾成本、时延与数据不出域。',
    trend: '· 从"越大越好"的通用大模型，到小而专、任务定制\n· 从云端集中推理，到端侧/本地私有推理',
    bankValue: '· 高频重复任务降本（较大模型省成本数倍至数十倍）、低时延、敏感数据本地处理\n· 与004 WebAssembly边缘计算联动',
    limitation: '· 通用推理与长上下文能力弱于大模型；需微调与蒸馏工程；端侧算力与模型管理运维',
    maturityBasis: '端侧模型与量化技术趋于成熟，2026年出现2.6B小模型领域任务超越大模型案例，多个行业已有生产案例。', strategicFitBasis: '命中人工智能战略方向，契合成本与数据不出域诉求，为该方向下重要路径。', valueBasis: '高频重复任务降本（较大模型省成本数倍至数十倍）与隐私价值明确，单一维度价值为主。',
    feasibilityBasis: '能力边界有限、需微调蒸馏工程投入，但各子要素总体可控，可按常规评审推进。', urgencyBasis: 'Gartner预测2027年任务专用小模型使用量为通用大模型三倍，属3—5年关键窗口。', opennessBasis: 'Llama、Qwen等多款开源小模型可选，具备国产化替代路径。',
    source: 'Zylos《Small Language Models & Edge AI 2026》；InfoWorld/ Dell Edge AI 2026；Iterathon SLM成本指南2026。\n·【2026-07-14复核增补】Gartner预测与Emerging Tech报告（2025.04／2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '参数量较小、面向特定任务、可在端侧/本地部署的语言模型，兼顾成本、时延与数据不出域。',
    center: '对客服务中心', centerReason: '与WebAssembly同属端侧技术路线，高频重复任务降本、低时延的特点适用于手机银行等对客终端的本地化AI处理', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:4, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T20', no: 20, name: '合成数据（Synthetic Data）', short: '合成数据', nameEn: 'Synthetic Data',
    category: '数据要素／人工智能', categoryKey: '数据要素', archDim: '数据', attr: '新兴',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 5, value: 3, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '战略匹配度5分（数据要素／人工智能双战略方向，缓解数据获取瓶颈），技术成熟度3分处早期采用阶段，与隐私增强计算（013）互补，宜深入研究：在反欺诈样本增强与测试数据场景评估"合成+差分隐私"的质量、隐私与合规边界，与013统筹密态与合成数据能力。',
    definition: '用生成模型产出统计特征相近但不含真实个体的仿真数据，用于模型训练、测试与数据共享。',
    trend: '· 从依赖真实敏感数据，到合成数据+差分隐私训练\n· 从数据孤岛，到共享"犯罪模式"而非客户明细',
    bankValue: '· 反欺诈/风控样本增强与类别均衡、隐私安全的测试与共享、缓解数据获取瓶颈\n· 与013隐私计算互补',
    limitation: '· 合成数据非天然隐私（模型可能记忆泄露）、质量与偏差控制、监管认可度待明确',
    maturityBasis: 'Gartner估2026年四分之三企业将用生成式AI产合成客户数据，"合成+差分隐私"渐成黄金标准，属早期采用阶段。', strategicFitBasis: '命中数据要素／人工智能双战略方向，缓解数据获取瓶颈与隐私合规诉求。', valueBasis: '反欺诈样本增强、类别均衡与隐私安全测试价值明确，单一维度价值为主。',
    feasibilityBasis: '合成数据非天然隐私（模型可能记忆泄露）、质量偏差与监管认可度待明确，需专项投入治理。', urgencyBasis: '金融业已用于反欺诈样本与测试，属3—5年关键窗口，尚无强制监管时限。', opennessBasis: 'SDV等合成数据工具多为开源，多厂商可选。',
    source: 'NayaOne《Synthetic Data\'s Moment》；geekfence 2026合成数据产品；arXiv 2602.09288 金融合成数据隐私风险。\n·【2026-07-14复核增补】2026年中国AI发展趋势前瞻（2026.01）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '用生成模型产出统计特征相近但不含真实个体的仿真数据，用于模型训练、测试与数据共享。',
    center: '数智能力中心', centerReason: '定位为企业级数据要素供给与AI训练底座，横跨AI模型训练、风控长尾样本增强、跨域合规流通及研发仿真测试，属全行通用数智基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T21', no: 21, name: '因果AI（Causal AI）', short: '因果AI', nameEn: 'Causal AI',
    category: '人工智能', categoryKey: '人工智能', archDim: '应用', attr: '未来',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 4, value: 3, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '战略匹配度4分（契合风控可解释性与监管"理由码"诉求），技术成熟度3分、价值贡献度3分兑现依赖工程成熟度，宜深入研究（可自观察层起步）：在信贷风控/反欺诈选点试验因果发现与反事实分析，评估与现有模型融合及监管可解释性收益；与神经符号AI（027）互补跟踪。',
    definition: '融合因果推断与机器学习，估计变量间因果效应而非仅相关性，提供可解释、稳健的决策依据。',
    trend: '· 从相关性预测黑箱，到因果机制可解释\n· 从数据驱动关联，到干预与反事实推理',
    bankValue: '· 信贷风控、反欺诈、定价与营销的可解释建模与稳健决策，满足监管"理由码"要求\n· 缓解模型漂移与偏差',
    limitation: '· 因果发现工程成熟度偏低、需领域知识与假设、数据质量要求高；工具与人才稀缺',
    maturityBasis: '因果模型在欺诈检测已被证明优于XGBoost等相关性方法，但工程化与工具生态尚不成熟，属早期采用阶段。', strategicFitBasis: '命中人工智能战略方向，契合风控可解释性与监管"理由码"诉求。', valueBasis: '稳健决策与可解释性价值明确，兑现依赖工程成熟度，单一维度价值为主。',
    feasibilityBasis: '假设与数据质量要求高、人才稀缺，需专项投入治理。', urgencyBasis: '监管对可解释AI要求持续提升，"治理化规模决策"成为2026年银行运营关键词，属3—5年关键窗口。', opennessBasis: 'DoWhy、EconML等主流因果推断工具多为开源，学术界主导，非单点依赖。',
    source: 'FIRM e.V.《Causal AI in risk management and finance》；EJBEMA 2025 因果欺诈检测；Springer《financial explainable AI》综述。\n·【2026-07-14复核增补】行业趋势综述与决策智能相关报告（2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '融合因果推断与机器学习，估计变量间因果效应而非仅相关性，提供可解释、稳健的决策依据。',
    center: '风险管理中心', centerReason: '服务信贷风控、反欺诈，满足监管\"理由码\"要求，为信用风险智能决策系统提供可解释归因能力', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T22', no: 22, name: '软件供应链安全（SBOM·供应链治理）', short: '软件供应链安全', nameEn: 'SBOM·供应链治理',
    category: '安全', categoryKey: '安全', archDim: '安全', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 4, feasibility: 4, urgency: 5, openness: 5,
    conclusion: '战略紧迫度5分（欧盟CRA已进入实施关键期，9月起须报告漏洞事件）、生态开放度5分（SPDX/CycloneDX开放事实格式），技术成熟度4分、战略匹配度4分、价值贡献度4分均衡达标，宜系统论证：建立SBOM生成与消费、来源证明与SSDF实践，纳入采购与CI/CD，与零信任架构（008）、可观测性标准化（012）统筹，明确落地范围与SLA。',
    definition: '以软件物料清单（SBOM）、来源证明与安全开发框架管理开源与第三方组件风险，覆盖构建到部署全链路。',
    trend: '· 从可见性（静态SBOM），到治理化、智能体化的持续管控\n· 从事后漏洞响应，到secure-by-design与来源证明',
    bankValue: '· 满足DORA等监管对ICT第三方与软件供应链风险管理要求，降低开源组件与投毒风险\n· 与008零信任联动',
    limitation: '· SBOM覆盖与自动化程度不一、跨供应商协同、工具链整合与运维投入',
    maturityBasis: 'SBOM流程多数机构已启动，欧盟CRA进入实施关键期，多个行业已有生产案例。', strategicFitBasis: '命中安全战略方向，DORA等监管驱动核心路径，与零信任协同。', valueBasis: '降低开源组件与投毒风险、满足DORA监管要求，覆盖安全与合规两个以上维度。',
    feasibilityBasis: 'SBOM覆盖与自动化程度不一，需工具链整合投入，但各子要素总体可控，可按常规评审推进。', urgencyBasis: '欧盟CRA要求2026年6月11日合格评定生效、9月11日起须报告漏洞与事件，SBOM成为强制要求，延迟将产生合规风险。', opennessBasis: 'SPDX、CycloneDX为开放事实格式，多厂商开源工具支持，无单点依赖。',
    source: 'Sonatype《2026 State of the Software Supply Chain》；ReversingLabs 2026指南；Cloudsmith《2026 Guide to Software Supply Chain Security》。\n·【2026-07-14复核增补】欧盟CRA实施指引与SBOM合规要求（2026.06）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以软件物料清单（SBOM）、来源证明与安全开发框架管理开源与第三方组件风险，覆盖构建到部署全链路。',
    center: '管理支持中心', centerReason: '满足DORA等监管对ICT第三方与软件供应链风险管理要求，属第三方/供应商合规治理职能', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:4, weight:15, max:5 }, { label:'战略紧迫度', score:5, weight:15, max:5 }, { label:'生态开放度', score:5, weight:10, max:5 }] }
  },
  { id: 'T23', no: 23, name: '深度伪造检测与反AI欺诈（Anti-deepfake·合成身份防御）', short: '深度伪造检测与反AI欺诈', nameEn: 'Anti-deepfake·合成身份防御',
    category: '安全／人工智能', categoryKey: '安全', archDim: '安全·业务', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 5, value: 5, feasibility: 4, urgency: 5, openness: 3,
    conclusion: '战略匹配度5分、价值贡献度5分（新加坡ABS案例单季度防损5390万新元）、战略紧迫度5分（2025年深伪欺诈同比激增约700%，现在必须启动）三高，宜系统论证（可快速立项）：以红队实测建立拦截率基线，评估多模态活体与深伪检测方案（供应商须单独提交IAD专项测试报告），建立可快速再训练机制，参照新加坡银行业协会案例设计检测-处置闭环，嵌入开户/支付/身份核验链路，与零信任架构（008）、AI安全平台（018）并线推进。',
    definition: '检测AI生成的人脸/声音/证件与合成身份的技术，强化活体检测、多模态一致性与欺诈研判。',
    trend: '· 从文档+自拍+活体分步核验，到多模态协同、对抗性检测\n· 从静态规则，到可快速再训练的检测模型',
    bankValue: '· 保护远程开户、人脸支付、代客交易与KYC，直接对冲深伪与合成身份欺诈激增\n· 与008零信任、018 AI TRiSM并线',
    limitation: '· 攻防持续升级、检测需高频再训练；跨渠道集成与误拒率平衡；数据与算力投入',
    maturityBasis: '检测工具已产业化，Gartner连续覆盖身份核验市场，多个行业已有生产案例，但IAD认证仍碎片化。', strategicFitBasis: '命中安全／人工智能双战略方向，直击远程开户、人脸支付、代客交易等核心链路。', valueBasis: '损失曲线陡峭（全球预测2030年583亿美元），新加坡ABS案例单季度防损5390万新元，价值显著且可量化。',
    feasibilityBasis: '误拒平衡、跨系统集成、IAD认证缺口可通过分级核验与合同条款管控，非架构性障碍，风险总体可控。', urgencyBasis: '2025年深伪欺诈同比激增约700%、合成身份欺诈涨超300%，仅约7%机构达标中等以上防御力，现在必须启动。', opennessBasis: '检测厂商（Sumsub、GetReal、Innovatrics等）以专有方案为主，部分认证标准（如iBeta PAD）尚不统一，专有与开放并存。',
    source: 'deepidv《Deepfake Detection for KYC 2026》；Sumsub《AI Fake ID Challenge for KYC》；GetReal《2026 Deepfake Summit》。\n·【2026-07-14复核增补】Sumsub《Fraud Trends 2026》；Forbes技术委员会（2026.04）\n·【2026-08-18深化增补】Innovatrics/ID Tech Wire（Air Bank案例）；Mobile ID World（新加坡ABS案例）；Jumio注入攻击专项披露（2025-08）；Biometric Update账户接管欺诈数据（2026-07）；Gartner《身份核验魔力象限》(2024首发/2026更新)、《数字身份成熟度曲线，2026》(2026-07-06)转引；AFIP/DuckDuckGoose深伪检测技术原理研究；FinCEN深伪欺诈预警(2024-11)细化；欧盟《人工智能法案》第50条透明度义务(2026-08-02生效)；国内《人工智能生成合成内容标识办法》（国信办通字〔2025〕2号，2025-09-01施行）。', attention: '高', status: '在库—已深化研究', updateDate: '2026-08-18',
    externalSource: '',
    summary: '检测AI生成的人脸/声音/证件与合成身份的技术，强化活体检测、多模态一致性与欺诈研判。',
    center: '风险管理中心', centerReason: '保护远程开户、人脸支付、代客交易与KYC，直接对冲深伪与合成身份欺诈，与天眼系统的反欺诈监测能力对应', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:5, weight:20, max:5 }, { label:'引入可行度', score:4, weight:15, max:5 }, { label:'战略紧迫度', score:5, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T24', no: 24, name: '去中心化身份与可验证凭证（DID·VC·eIDAS 2.0数字钱包）', short: '去中心化身份与可验证凭证', nameEn: 'DID·VC·eIDAS 2.0数字钱包',
    category: '安全／数据要素', categoryKey: '安全', archDim: '安全·业务', attr: '新兴',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 5, value: 3, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '战略匹配度5分（安全／数据要素双战略方向，契合KYC复用与隐私合规诉求），技术成熟度3分（标准体系仍在成型），宜深入研究：跟踪W3C VC/eIDAS进展与国内数字身份政策，评估KYC凭证复用与选择性披露在开户/授权的适用性，与深度伪造检测（023）、隐私增强计算（013）协同。',
    definition: '以去中心化标识（DID）与可验证凭证（VC）让用户在本地钱包自主持有并选择性披露身份属性。',
    trend: '· 从中心化账户与集中身份库，到用户自持、最小化披露\n· 从重复KYC，到跨机构可复用可验证凭证',
    bankValue: '· 简化KYC/复用、增强隐私与合规、跨机构凭证互认，改善开户与授权体验\n· 与023身份防御、013隐私计算协同',
    limitation: '· 标准与生态（W3C VC、ISO 18013-5、eIDAS ARF）仍在成型；国内落地路径与监管框架待明确；互认与撤销机制',
    maturityBasis: '标准体系（W3C VC、ISO 18013-5、eIDAS ARF）仍在成型，海外强制落地、国内路径待明确，属早期采用阶段。', strategicFitBasis: '命中安全／数据要素双战略方向，契合KYC复用与隐私合规诉求。', valueBasis: 'KYC凭证复用与选择性披露改善开户体验、降低合规成本，单一维度价值为主。',
    feasibilityBasis: '标准与监管框架未定、互认撤销机制待建，需专项投入治理。', urgencyBasis: 'eIDAS 2.0要求2027年起欧盟银行须接受，但国内落地路径与监管框架尚未明确，属3—5年关键窗口。', opennessBasis: 'W3C VC为开放标准，去中心化架构本身避免单点依赖，多厂商钱包方案可选。',
    source: 'Ping Identity《Decentralized Identity in EU Finance》；《Enterprise Playbook 2026》；eIDAS 2.0 EUDI Wallet KYC指南2026。\n·【2026-07-14复核增补】行业综述（2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以去中心化标识（DID）与可验证凭证（VC）让用户在本地钱包自主持有并选择性披露身份属性。',
    center: '对客服务中心', centerReason: '有助于改善开户与授权体验，直接服务手机银行、网银等渠道的开户与身份核验环节', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T25', no: 25, name: '量子保密通信／量子密钥分发（QKD·量子保密通信）', short: '量子保密通信', nameEn: 'QKD·量子保密通信',
    category: '量子科技／安全', categoryKey: '量子科技', archDim: '安全', attr: '未来',
    tier: '观察层', disposal: '动态观察',
    maturity: 2, strategicFit: 5, value: 2, feasibility: 2, urgency: 1, openness: 2,
    conclusion: '战略匹配度5分虽高，但价值贡献度2分（普适性有限、难以规模化量化）、战略紧迫度仅1分（QKD因专用硬件与点对点链路限制难以互联网规模部署，各国监管优先PQC而非QKD），属动态观察典型，宜跟踪QKD+PQC混合组网与金融试点、成本曲线，与后量子密码学（007）安全线联动（防御侧优先），保持生态接触与小规模学习。',
    definition: '基于量子物理原理分发密钥（QKD），提供对窃听敏感、理论上信息论安全的通信保护。',
    trend: '· 从计算复杂度安全，到物理原理保障的密钥分发\n· 从纯QKD，到QKD与后量子加密（PQC）混合组网',
    bankValue: '· 关键链路（数据备份、同城/异地灾备、行际通信）的长周期抗窃听保护\n· 与007 PQC、009量子计算防御线联动',
    limitation: '· 成本高、需专用光纤/中继、距离与组网受限；标准与可运营性不足；性价比与场景待验证',
    maturityBasis: '中国已建16城约1.2万公里骨干量子网并试点QKD+PQC混合，属技术触发期爬升阶段。', strategicFitBasis: '命中量子科技／安全双战略方向。', valueBasis: '关键链路（备份、灾备、行际通信）抗窃听价值明确，但普适性有限，难以规模化量化。',
    feasibilityBasis: '成本高、需专用光纤中继、组网受限，需专项立项治理方可能推进。', urgencyBasis: 'QKD因专用硬件与点对点链路限制难以互联网规模部署，各国监管优先方向为PQC而非QKD，属5年以上长期赛道。', opennessBasis: '专用硬件与骨干网建设以国内为主导，国际标准与互操作性有限，潜在替代路径迁移成本极高。',
    source: 'The Quantum Insider 2026量子密码公司盘点；Mordor QKD市场报告；Yale JIA《China\'s Quantum Ambitions》。\n·【2026-07-14复核增补】NIST后量子迁移FAQ及行业分析（2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '基于量子物理原理分发密钥（QKD），提供对窃听敏感、理论上信息论安全的通信保护。',
    center: '技术服务中心', centerReason: '定位为关键链路灾备通信的抗窃听保护，属通信安全基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:2, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:1, weight:15, max:5 }, { label:'生态开放度', score:2, weight:10, max:5 }] }
  },
  { id: 'T26', no: 26, name: '神经形态与光子计算（Neuromorphic·Photonic Computing）', short: '神经形态与光子计算', nameEn: 'Neuromorphic·Photonic Computing',
    category: '未来计算（算力）', categoryKey: '基础设施', archDim: '技术', attr: '未来',
    tier: '观察层', disposal: '动态观察',
    maturity: 2, strategicFit: 3, value: 1, feasibility: 1, urgency: 1, openness: 2,
    conclusion: '价值贡献度、引入可行度、战略紧迫度均为1分（仍处实验室／早期样机阶段，距银行可用尚远，5年以上长期赛道），属动态观察典型，宜跟踪光子/类脑加速器的能效突破与产业化信号，保持情报留痕，出现拐点再升层。',
    definition: '类脑脉冲神经与硅光/光电器件的新型计算范式，追求超低功耗、超低时延的AI加速。',
    trend: '· 从冯·诺依曼架构与电子算力，到类脑存算一体与光计算\n· 从瓦级功耗，到微瓦级、亚纳秒时延推理',
    bankValue: '· 远期为边缘风控、实时推理提供超低功耗算力选项，缓解AI能耗与散热压力\n· 前瞻算力技术储备',
    limitation: '· 仍处实验室/早期样机、编程模型与工具链不成熟、生态缺失；距银行可用尚远',
    maturityBasis: '光子加速器与类脑处理器已有Nature级突破与产业样机（如Xanadu 2026年3月合并上市），但通用可用性远未成熟，属技术触发期爬升阶段。', strategicFitBasis: '命中未来计算（算力）方向下的技术路径之一，非当前核心旗舰应用。', valueBasis: '远期能效／时延潜力高，但近期不可兑现，无法识别明确可量化价值点。',
    feasibilityBasis: '仍处实验室／早期样机阶段，编程模型与工具链、生态缺失，人才与供应链极度稀缺。', urgencyBasis: '距银行可用尚远，属5年以上长期赛道，早晚推进对结果影响很小。', opennessBasis: '仅Xanadu、PsiQuantum等少数厂商布局，标准与互操作性极早期，潜在替代路径迁移成本极高。',
    source: 'PatSnap《Photonic/Neuromorphic Computing Landscape 2026》；Nature《integrated photonic accelerator》2025；Wiley《Integrated Neuromorphic Photonic Computing》2026。\n·【2026-07-14复核增补】Xanadu上市公告与PsiQuantum进展（2026.03）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '类脑脉冲神经与硅光/光电器件的新型计算范式，追求超低功耗、超低时延的AI加速。',
    center: '技术服务中心', centerReason: '定位为远期超低功耗算力选项，属前瞻算力储备', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:1, weight:20, max:5 }, { label:'引入可行度', score:1, weight:15, max:5 }, { label:'战略紧迫度', score:1, weight:15, max:5 }, { label:'生态开放度', score:2, weight:10, max:5 }] }
  },
  { id: 'T27', no: 27, name: '神经符号AI／可推理AI（Neuro-symbolic AI）', short: '神经符号AI', nameEn: 'Neuro-symbolic AI',
    category: '人工智能', categoryKey: '人工智能', archDim: '应用', attr: '未来',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 4, value: 3, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '战略匹配度4分（契合可解释与合规审计诉求），技术成熟度3分、价值贡献度3分兑现依赖工程成熟度，宜深入研究：跟踪神经符号与本体约束推理进展，在合规/授信可解释场景做概念验证，与因果AI（021）、AI安全平台（018）统筹可解释AI路线。',
    definition: '融合神经网络与符号逻辑推理，兼顾模式识别与可解释、可审计的结构化推理。',
    trend: '· 从纯神经黑箱，到神经+符号可解释推理\n· 从概率生成，到带前/后置条件、可审计的确定性执行',
    bankValue: '· 高合规、可审计场景（授信、合规、风控）的可解释推理与规则约束\n· 与021因果AI、018 TRiSM互补',
    limitation: '· 工程与工具尚不成熟、知识/本体构建成本高、规模化落地案例少',
    maturityBasis: '2026年被业界称为神经符号AI转折点，随EU AI Act可解释性要求提升而升温，属早期采用阶段。', strategicFitBasis: '命中人工智能战略方向，契合可解释与合规审计诉求。', valueBasis: '高合规可审计场景的可解释推理与规则约束价值明确，兑现依赖工程成熟度，单一维度价值为主。',
    feasibilityBasis: '知识／本体构建成本高、规模化落地案例少，需专项投入治理。', urgencyBasis: '监管对可追溯、可解释性要求持续提升，属3—5年关键窗口，尚未见银行级成熟案例拐点。', opennessBasis: '学术界主导、部分推理框架已开源，但行业标准尚未统一，专有与开放并存。',
    source: 'Cogent《The Year of Neuro-Symbolic AI 2026》；Stanford Tech Review 2026；arXiv 2604.00555 企业智能体神经符号架构。\n·【2026-07-14复核增补】Gartner领域专用模型趋势（2026）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '融合神经网络与符号逻辑推理，兼顾模式识别与可解释、可审计的结构化推理。',
    center: '风险管理中心', centerReason: '核心价值聚焦授信、合规、风控场景的可解释推理与规则约束', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T28', no: 28, name: '数字人与空间计算（Digital Human·Spatial Computing）', short: '数字人与空间计算', nameEn: 'Digital Human·Spatial Computing',
    category: '客户体验／人工智能', categoryKey: '客户体验', archDim: '业务·应用', attr: '新兴',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 4, value: 3, feasibility: 3, urgency: 4, openness: 3,
    conclusion: '战略紧迫度4分（《金融产品网络营销管理办法》2026年9月30日施行在即，合规边界收紧）、战略匹配度4分，技术成熟度3分、价值贡献度3分兑现依赖ROI验证，宜深入研究：在客服/财富顾问/网点场景做以行内知识为锚的数字人试点，评估体验、ROI与合规（话术留痕、适老），与向量数据库与RAG（016）、自主型AI智能体（001）协同。',
    definition: '由生成式AI驱动、具多模态与持续记忆的数字人，结合空间计算/实时渲染提供拟人交互。',
    trend: '· 从文本聊天机器人，到多模态、有记忆的拟人交互\n· 从屏幕交互，到网点/可穿戴/空间计算沉浸体验',
    bankValue: '· 智能客服、财富顾问、网点与远程服务的体验升级与人力替代\n· 以行内知识为锚提供可溯源应答',
    limitation: '· ROI与合规（话术、录制、适老）待验证；拟人化风险与信任；渲染与算力成本',
    maturityBasis: 'AI数字人市场2025→2026约98增至129亿美元CAGR约31%，金融业已有数字人顾问部署，属早期采用阶段。', strategicFitBasis: '命中人工智能战略方向，契合客户体验升级诉求。', valueBasis: '智能客服、财富顾问、网点服务体验升级价值明确，普适性中等，单一维度价值为主。',
    feasibilityBasis: 'ROI与合规（话术、录制、适老）待验证，拟人化风险与信任，需专项投入治理。', urgencyBasis: '《金融产品网络营销管理办法》2026年9月30日施行在即，数字人营销合规边界收紧，0—2年内需启动合规适配。', opennessBasis: '数字人厂商较多但技术方案以专有为主，标准化程度中等。',
    source: 'Forbes/Dell《Digital Humans in Financial Services》2026；Precedence《AI Avatar Market》；Nasdaq《AI Digital Human Advisors》。\n·【2026-07-14复核增补】《金融产品网络营销管理办法》（施行日2026.09.30）', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '由生成式AI驱动、具多模态与持续记忆的数字人，结合空间计算/实时渲染提供拟人交互。',
    center: '对客服务中心', centerReason: '契合智能客服、财富顾问、网点与远程服务的体验升级方向，直接对应手机银行/网银/柜面等对客渠道', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T29', no: 29, name: '绿色与可持续IT／液冷数据中心', short: '绿色与可持续IT', nameEn: '',
    category: '信息基础设施（绿色算力）', categoryKey: '基础设施', archDim: '技术', attr: '关键',
    tier: '研究层', disposal: '深入研究',
    maturity: 4, strategicFit: 3, value: 3, feasibility: 4, urgency: 4, openness: 3,
    conclusion: '技术成熟度4分（液冷从可选变必选）、战略紧迫度4分（新建数据中心PUE与液冷渗透率监管强制指标已明确），工程较成熟，宜深入研究：结合我行/入网数据中心评估液冷改造与PUE优化、余热回收与双碳收益，与算力网络（010）统筹算力与能效规划。',
    definition: '以直冷/浸没式液冷、余热回收、零水冷等提升数据中心能效（PUE）与可持续性，支撑高密度AI算力。',
    trend: '· 从风冷与高PUE，到液冷、余热回收、近零水耗\n· 从算力扩张，到能效与双碳约束下的绿色算力',
    bankValue: '· 支撑高功率AI机柜散热、降低能耗与运营成本、满足双碳与ESG\n· 与010算力网络协同规划算力布局',
    limitation: '· 液冷改造与运维、机房与供应链适配、既有机房迁移成本；标准与选型',
    maturityBasis: '液冷从可选变必选，2025年国内液冷数据中心投资规模约765.5亿元，多个行业已有生产案例。', strategicFitBasis: '命中信息基础设施（绿色算力）方向下的技术路径之一，与010算力网络协同规划。', valueBasis: '降低能耗与运营成本、满足双碳与ESG要求，属基础设施类单一维度价值。',
    feasibilityBasis: '液冷改造与运维、机房供应链适配存在成本，但各子要素总体可控，可按常规评审推进。', urgencyBasis: '新建大型数据中心PUE强制不高于1.15、液冷渗透率不低于60%，监管明确时限，0—2年内需启动。', opennessBasis: '液冷厂商方案多样，但浸没式／直冷等技术路线尚未统一标准，中等成本替代路径。',
    source: 'CoreSite《Data Center Outlook 2026》；Data Center Knowledge液冷趋势2026；MIT News核启发冷却2026-06。\n·【2026-07-14复核增补】工信部数据中心新规与行业研究（2026.01–03）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以直冷/浸没式液冷、余热回收、零水冷等提升数据中心能效（PUE）与可持续性，支撑高密度AI算力。',
    center: '管理支持中心', centerReason: '满足双碳与ESG要求，属企业管理治理职能', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:4, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T30', no: 30, name: '监管科技与合规科技（RegTech·SupTech·AI-native合规）', short: '监管科技与合规科技', nameEn: 'RegTech·SupTech·AI-native合规',
    category: '合规科技（RegTech）', categoryKey: '合规科技', archDim: '应用·业务', attr: '关键',
    tier: '研究层', disposal: '深入研究',
    maturity: 3, strategicFit: 4, value: 3, feasibility: 4, urgency: 3, openness: 3,
    conclusion: '战略匹配度4分（直击AML、交易监控与报送刚需核心路径），引入可行度4分（各子要素总体可控），技术成熟度3分处早期采用阶段，宜深入研究：在AML/交易监控/监管报送场景评估AI-native RegTech与可解释性、监管认可与数据标准，与AI安全平台（018）、向量数据库与RAG（016）协同。',
    definition: '以AI/NLP/知识图谱自动化合规：监管报送、交易监控、反洗钱、客户尽调与法规解析。',
    trend: '· 从人工合规与事后核查，到AI-native持续、自适应合规\n· 从孤立工具，到可互操作数据标准+AI工具链',
    bankValue: '· 降低合规成本、提升AML/交易监控与报送效率与准确性、适应跨境复杂规则\n· 与018 TRiSM、016 RAG协同',
    limitation: '· 监管数据标准与互操作、模型可解释与监管认可、法规更新时效；与既有合规体系整合',
    maturityBasis: '工具与案例渐成形，监管认可与体系整合仍待深化，属早期采用阶段。', strategicFitBasis: '命中合规科技（RegTech）战略方向，直击AML、交易监控与报送刚需核心路径。', valueBasis: '降低合规成本、提升AML与报送效率与准确性，单一维度价值为主。',
    feasibilityBasis: '监管数据标准与既有合规体系整合存在工作量，但各子要素总体可控，可按常规评审推进。', urgencyBasis: '央行2026年3月工作会议与金融监管总局系列文件持续推进监管数字化转型，属3—5年关键窗口。', opennessBasis: 'RegTech厂商方案以专有为主，标准化程度中等。',
    source: 'Central Banking《RegTech & SupTech in central banks 2026》；MDPI《Digital Regulatory Governance》2025；TechMagic《RegTech 2026》。\n·【2026-07-14复核增补】央行科技工作会议（2026.03）；金融监管总局实施方案（2025.12）与指导意见（2026.06.18）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '以AI/NLP/知识图谱自动化合规：监管报送、交易监控、反洗钱、客户尽调与法规解析。',
    center: '风险管理中心', centerReason: '重点提升AML/交易监控与报送效率，AML/交易监控与天眼系统职能直接对应', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:3, weight:20, max:5 }, { label:'引入可行度', score:4, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T31', no: 31, name: '业务编排与自动化技术（Business Orchestration and Automation Technologies，BOAT）', short: '业务编排与自动化技术', nameEn: 'Business Orchestration and Automation Technologies，BOAT',
    category: '数据要素／未来（企业级流程自动化）', categoryKey: '数据要素', archDim: '业务（跨应用）', attr: '新兴（向关键演进）',
    tier: '布局层', disposal: '提前布局',
    maturity: 3, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '市场类别已由Gartner正式确立、战略匹配度与价值贡献度评级高，按六维复核结果转为提前布局：梳理我行现有自动化与集成资产地图，提前明确BOAT平台整合路径与选型标准，并与智能体自动化（001／034）的分工提前规划，为后续规模化收敛占位。',
    definition: '由 Gartner 提出的整合型软件平台类别，在单一平台内汇聚业务流程编排、企业连接、低代码开发与智能体（agentic）自动化等能力，横跨 BPA、LCAP、iPaaS、IDP、RPA、协作式工作流与文档管理等原有市场，以端到端编排业务成果替代碎片化的单点自动化。',
    trend: '· 从 RPA／BPM／iPaaS 各自为战的单点自动化，到统一平台端到端编排业务成果\n· 从固定规则脚本，到 AI／智能体驱动的自主流程编排与实时事件响应\n· 从 IT 集中开发，到低代码／无代码的业务与 IT 融合交付',
    bankValue: '· 整合我行分散的 RPA／BPM／低代码／集成资产，降低集成与运维开销\n· 以统一编排支撑授信审批、账户运营、合规报送等端到端流程自动化\n· 为智能体自动化（001／034）提供业务流程编排底座，加速数字员工落地',
    limitation: '· 平台整合涉及存量 RPA／BPM／iPaaS 迁移，改造范围与切换成本大\n· 供应商锁定与选型风险，市场刚形成、格局未定\n· 与既有自动化平台并存期的治理、权限与审计复杂',
    maturityBasis: 'Gartner首版BOAT魔力象限于2025年10月发布、市场类别正式确立，平台整合与厂商格局仍在演进，属早期采用阶段。', strategicFitBasis: '命中数据要素／未来（企业级流程自动化）方向，为存量RPA/BPM/低代码资产整合的核心路径。', valueBasis: '端到端流程编排降本提效，并为智能体自动化（001/034）提供业务编排底座，覆盖效率与AI赋能多个维度。',
    feasibilityBasis: '涉及存量RPA/BPM/iPaaS迁移，供应商锁定与选型风险，需专项投入治理。', urgencyBasis: 'Gartner预计BOAT软件支出2029年将超210亿美元（CAGR33.9%），属3—5年关键窗口，尚无强制监管时限。', opennessBasis: '领导者厂商（Appian、Pega、ServiceNow）以专有商业方案为主，也有Camunda等开源选项，专有与开放并存。',
    source: '· Gartner《Magic Quadrant for Business Orchestration and Automation Technologies》（Saikat Ray等6位分析师合著，2025年10月15日，文档编号G00828060，首版；全文存档于本行内部知识库）\n· Gartner Peer Insights BOAT 市场（2026）\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增，已联网核实）\n·【2026-07-14复核增补】Infosys Finacle《Banking Architecture Trend 2026》（2026）\n·【2026-07-15深化增补】厂商官方发布信息（Pega、Camunda、Appian、Workato、Twoday）及技术解读资料（Camunda、Trisotech），已全文存档\n【2026-08-17深化增补】Camunda官方案例研究(Barclays/Jyske Bank)、ServiceNow官方客户案例(Standard Chartered Bank)、Appian官方新闻稿(Pepper Money)，均已核实并存档；Forrester《The Total Economic Impact of Camunda for Enterprises》(2024)、IDC/Appian《The Business Value of Appian》效益测算参考研究；Gartner《Critical Capabilities for BOAT, Q3 2025》（转引自Pega新闻稿）；《银行保险机构信息科技外包风险监管办法》（银保监办发〔2021〕141号）、《银行保险机构操作风险管理办法》（国家金融监督管理总局令2023年第5号）、《银行保险机构数据安全管理办法》（金规〔2024〕24号）具体条款，均来自政府网官方发布页面，已核实。', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '由 Gartner 提出的整合型软件平台类别，在单一平台内汇聚业务流程编排、企业连接、低代码开发与智能体（agentic）自动化等能力，横跨 BPA、LCAP、iPaaS、IDP、RPA、协作式工作流与文档管理等原有市场，以端到端编排业务成果替代碎片化的单点自动化。',
    folder: 'assets/technologies/T031_业务编排与自动化',
    reportDocx: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_专题研究报告.docx', reportDocxName: 'T031_业务编排与自动化_专题研究报告.docx', reportDocxSize: '580.4 KB', reportDocxDate: '2026-08-17', reportPdf: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_演示汇报.pptx', slidesPptxName: 'T031_业务编排与自动化_演示汇报.pptx', slidesPptxSize: '5.7 KB', slidesPptxDate: '2026-08-17', slidesPdf: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_演示汇报.pdf',
    image: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_一张图.svg', imageName: 'T031_业务编排与自动化_一张图.svg', imageSize: '4.3 KB',
    center: '业务处理中心', centerReason: '以统一编排支撑授信审批、账户运营等端到端流程自动化，授信审批正是该中心的核心系统职能', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T32', no: 32, name: '客户数字孪生（Digital Twin of a Customer，DToC）', short: '客户数字孪生', nameEn: 'Digital Twin of a Customer，DToC',
    category: '数据要素（仿真与决策）', categoryKey: '数据要素', archDim: '业务', attr: '未来',
    tier: '观察层', disposal: '动态观察',
    maturity: 1, strategicFit: 3, value: 2, feasibility: 2, urgency: 1, openness: 3,
    conclusion: '技术成熟度1分、战略紧迫度1分（创新萌芽期，市场渗透率仅1%-5%，未检索到银行业生产级案例），引入可行度2分（个人信息保护与算法推荐合规红线密集），维持观察层／动态观察：季度跟踪《金融产品网络营销管理办法》细则与同业动态，可在严格合规限定下探索流失预测、经营仿真等非个性化营销场景小范围PoC。',
    definition: '基于第一方数据实时构建的单一客户动态AI模型，通过身份解析、行为建模与情景仿真，模拟推演客户下一步行为与需求，为精准营销、财富顾问服务与风险预警提供前瞻输入；Gartner定位于客户体验与销售转型的创新萌芽期新兴技术。',
    trend: '· 从群体客户画像，到单客户级实时行为孪生与情景推演\n· 从事后归因分析，到"假设-推演"式前瞻模拟\n· 从人工经验驱动的营销决策，到孪生驱动的自动化触达与响应预测',
    bankValue: '· 支撑精准营销触达、财富顾问服务、客户流失预测与风险预警\n· 协同决策智能（033）、多智能体（034）与数字人（028）提供前瞻预测输入\n· 提升客户旅程模拟与运营仿真能力，辅助产品与渠道策略验证',
    limitation: '· 创新萌芽期市场渗透率仅1%-5%，银行业尚无公开生产级案例，平台与方法论未定型\n· 客户级建模高度依赖个保法与算法推荐合规，《金融产品网络营销管理办法》进一步收紧适用边界\n· 统一实时数据、专用ML模型与同步激活闭环对多数机构非现成能力，自建与运维投入大',
    maturityBasis: 'Gartner多期Hype Cycle一致将DToC置于创新萌芽期，市场渗透率仅1%-5%，未检索到银行业生产级案例，处萌芽阶段。', strategicFitBasis: '命中数据要素（仿真与决策）方向下的技术路径之一，非核心旗舰应用。', valueBasis: '精准营销、财富顾问、流失预警存在价值锚点，但金融场景数据基础与合规约束显著高于零售业，价值难以量化。',
    feasibilityBasis: '《金融产品网络营销管理办法》《个人信息保护法》自动化决策公平性等构成客户级建模的多重合规红线，需专项立项治理。', urgencyBasis: '技术处于创新萌芽期，不宜投入研究资源或开展本行落地探索，属5年以上长期赛道。', opennessBasis: '可用平台与方法论尚未定型，市场早期，专有与潜在开放路径并存。',
    source: '· Gartner新闻稿《Hype Cycle Reveals How AI and Digital Advancements Are Primed to Aid Sales Transformations》（2025-10-30，DToC置于创新萌芽期）\n· Gartner《Hype Cycle for CRM Technologies, 2025》（G00827302，2025-07-09，DToC列"On the Rise"新兴阶段、效益评级高、渗透率1%-5%，经第三方转引页面部分核实）\n· Gartner供应链洞察《A Digital Twin of the Customer Could Transform Your Supply Chain Digitalization Strategy》（Beth Coppinger，2023-06-16，27%对60%试点/规划数据）\n· 中国人民银行等八部门《金融产品网络营销管理办法》（2026-04-24印发/2026-09-30施行）；国家网信办等四部门《互联网信息服务算法推荐管理规定》（2021-12-31公布/2022-03-01施行）；中国人民银行《金融领域科技伦理指引》（JR/T 0258—2022）\n采集截止日期：2026-08-18。', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: 'DToC是基于第一方数据实时构建的单一客户动态AI模型，通过身份解析、行为建模与情景仿真，模拟、预测并推演客户下一步行为与需求，为精准营销、财富顾问服务与风险预警提供前瞻输入。',
    folder: 'assets/technologies/T032_客户数字孪生',
    reportDocx: 'assets/technologies/T032_客户数字孪生/前沿技术专题研究报告_客户数字孪生DToC_V2.32.docx', reportDocxName: '前沿技术专题研究报告_客户数字孪生DToC_V2.32.docx', reportDocxSize: '1.09 MB', reportDocxDate: '2026-09-01', reportPdf: 'assets/technologies/T032_客户数字孪生/T032_客户数字孪生_专题研究报告.pdf',
    slidesPdf: 'assets/technologies/T032_客户数字孪生/T032_客户数字孪生_演示汇报.pdf',
    image: 'assets/technologies/T032_客户数字孪生/T032_客户数字孪生_一张图.png', imageName: 'T032_客户数字孪生_一张图.png', imageSize: '2.07 MB',
    center: '客户经营中心', centerReason: '核心价值在于支撑精准营销触达、财富顾问服务，直接对应统一商机平台/对公驾驶舱的客户经营职能', assessment: { dimensions: [{ label:'技术成熟度', score:1, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:2, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:1, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T33', no: 33, name: '决策智能平台（Decision Intelligence Platform，DIP）', short: '决策智能平台', nameEn: 'Decision Intelligence Platform，DIP',
    category: '数据要素（决策智能）', categoryKey: '数据要素', archDim: '数据', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 5, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '价值贡献度5分（决策自动化与增强直接创造业务价值，多维度显著且可量化）、战略匹配度4分、技术成熟度4分（Gartner已发布魔力象限，市场成熟），宜系统论证：盘点我行授信/风控/营销决策资产，评估DIP与现有决策引擎的整合路径，结合因果AI（021）强化可解释与反事实能力，选取高价值决策场景开展论证与试点。',
    definition: '融合显式决策建模、AI、分析等能力以支持、增强或自动化决策的平台，将决策作为可设计、可复用、可追溯、可优化的对象，驱动业务成果并支持决策留痕以供复盘。',
    trend: '· 从分散的分析报表，到以决策为中心、可建模可复用的决策资产\n· 从人工经验决策，到 AI 增强与自动化决策闭环\n· 从事后归因，到决策全过程留痕与持续优化',
    bankValue: '· 授信审批、风控反欺诈、催收、营销与定价等核心决策的建模、增强与自动化\n· 决策留痕支撑可解释、可审计与监管合规\n· 与因果AI（021）结合提升决策可解释性与反事实推演',
    limitation: '· 与现有决策引擎/规则平台整合、口径统一难度大\n· 决策模型的可解释性、偏见与治理要求高\n· 组织需具备决策工程与数据治理能力',
    maturityBasis: 'Gartner于2026年1月发布决策智能平台魔力象限，FICO/SAS/ACTICO等厂商成熟，多个行业已有生产案例。', strategicFitBasis: '命中数据要素（决策智能）战略方向，授信、风控、反欺诈等银行核心业务本质即决策，契合度极高。', valueBasis: '决策自动化与增强直接创造业务价值，决策留痕支撑可解释与合规，多维度显著价值且可量化。',
    feasibilityBasis: '需与现有决策引擎、规则平台整合，统一口径难度大，需专项投入治理。', urgencyBasis: 'Gartner预测2026年75%全球500强将应用决策智能实践，"治理化规模决策"成为2026年银行运营关键词，属3—5年关键窗口。', opennessBasis: 'FICO、SAS、Aera等厂商以专有商业方案为主，标准化程度中等。',
    source: '· Gartner《Magic Quadrant for Decision Intelligence Platforms》（2026.01.26）《Market Guide for DIP》\n· FICO/SAS 决策智能金融应用；FintechNews《Top DIP of 2026》\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增；与021因果AI关联，以本条目为主、021为补充）\n·【2026-07-14复核增补】银行业AI趋势报告（2026）\n【2026-07-15深化增补】Gartner《Magic Quadrant for Decision Intelligence Platforms》（G00827619，2026-01-26）全文已获授权订阅、存于本行内部知识库，含17家厂商完整评述与原版象限图，已全文存档\n【2026-08-17专题补充】Gartner分析师2026-08-04现场技术交流纪要与配套技术分析报告（行内知识库留存，非公开信源）；自制3层混合决策智能框架示意图（据交流内容整理）；采集/整理日期：2026-08-17\n【2026-08-17修订增补】FICO官方新闻稿《Nationwide Speeds Up Credit Decisioning by 50% with FICO Platform》（2026-03-11，公开可查）；Forrester Consulting对Quantexa委托研究新闻稿（2024-02-08，公开可查）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '融合显式决策建模、AI、分析等能力以支持、增强或自动化决策的平台，将决策作为可设计、可复用、可追溯、可优化的对象，驱动业务成果并支持决策留痕以供复盘。',
    folder: 'assets/technologies/T033_决策智能平台',
    reportDocx: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_专题研究报告.docx', reportDocxName: 'T033_决策智能平台_专题研究报告.docx', reportDocxSize: '779.0 KB', reportDocxDate: '2026-08-17', reportPdf: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_演示汇报.pptx', slidesPptxName: 'T033_决策智能平台_演示汇报.pptx', slidesPptxSize: '5.7 KB', slidesPptxDate: '2026-08-17', slidesPdf: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_演示汇报.pdf',
    image: 'assets/technologies/T033_决策智能平台/T33-DIP一页纸.png', imageName: 'T33-DIP一页纸.png', imageSize: '1.95 MB',
    center: '风险管理中心', centerReason: '核心价值聚焦授信审批、风控反欺诈等核心决策的建模、增强与自动化，与信用风险智能决策系统直接对应', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:5, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T34', no: 34, name: '多智能体系统（Multi-Agent Systems，MAS）', short: '多智能体系统', nameEn: 'Multi-Agent Systems，MAS',
    category: '人工智能（智能体协同）', categoryKey: '人工智能', archDim: '应用（跨业务）', attr: '新兴（向关键演进）',
    tier: '布局层', disposal: '提前布局',
    maturity: 2, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '战略价值高、与自主型AI智能体（001）、AI智能体互操作协议（017）协同紧密，按六维复核结果转为提前布局：以AI安全平台（018）为统一护栏前置，提前建立单体与多智能体的分工与编排标准储备，选取反欺诈／投研等高价值场景做前瞻性技术与人才准备，严控安全与成本，避免盲目规模化。',
    definition: '由多个任务专精的 AI 智能体分工协作、相互通信与协调以完成复杂任务的系统；在单体自主智能体（001）之上引入编排、角色分工与协作机制，提升可扩展性与专业度。',
    trend: '· 从单一智能体，到多个专精智能体分工协作的复合系统\n· 从人工编排流程，到智能体间自主协商、任务分解与协同执行\n· 从窄场景自动化，到端到端跨流程的 AI 数字团队',
    bankValue: '· 反欺诈、投研、跨境金融、运营与合规等复杂流程的多智能体协同自动化\n· 与001自主智能体、017互操作协议（MCP/A2A）协同，构建 AI 数字员工团队\n· 提升复杂任务的专业度、并行度与可扩展性',
    limitation: '· 安全攻击面随智能体数量扩大，编排与监控复杂度高\n· 复合误差累积导致可靠性下降，治理与可观测工具不成熟\n· Gartner 预警到2027年超40%智能体AI项目将被取消，成本与ROI不确定',
    maturityBasis: 'Gartner列为2026年顶级战略技术趋势，2026Q1约80%新交付应用嵌入AI智能体，但预测2027年超40%智能体AI项目将被取消，处技术触发期爬升阶段。', strategicFitBasis: '命中人工智能战略方向，银行保险业智能体采纳领先（约47%），与001/017直接协同。', valueBasis: '复杂流程多智能体协同自动化潜力大，为AI数字团队核心能力，覆盖效率与专业度多个维度。',
    feasibilityBasis: '安全攻击面随智能体数量扩大、复合误差累积可靠性下降，以018 AISP为统一护栏前置管控后风险总体可管理，需专项投入治理。', urgencyBasis: '57%银行高管预期三年内智能体进入风险、合规、审计与反欺诈流程，属3—5年关键窗口。', opennessBasis: '与017互操作协议共享MCP/A2A开放生态，多厂商可选。',
    source: '· Gartner《Top Strategic Technology Trends 2026: Multiagent Systems》《Multiagent Systems in Enterprise AI》\n· S&P Global/McKinsey 智能体生产部署统计（2026）\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增；与001/017关联，以本条目为主、001/017为补充；护栏依赖018 AISP）\n·【2026-07-14复核增补】Accenture银行业展望2026；多智能体系统行业白皮书（2026）', attention: '极高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '由多个任务专精的 AI 智能体分工协作、相互通信与协调以完成复杂任务的系统；在单体自主智能体（001）之上引入编排、角色分工与协作机制，提升可扩展性与专业度。',
    center: '智慧运营中心', centerReason: '多智能体协同自动化契合运营场景，与智能工厂的产线化协同作业逻辑一致', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T35', no: 35, name: '可组合核心银行系统（Composable Core Banking System）', short: '可组合核心银行系统', nameEn: 'Composable Core Banking System',
    category: '数据要素／未来（核心系统现代化）', categoryKey: '数据要素', archDim: '应用', attr: '关键',
    tier: '观察层', disposal: '动态观察',
    maturity: 3, strategicFit: 4, value: 4, feasibility: 2, urgency: 3, openness: 3,
    conclusion: '核心系统现代化方向明确、价值贡献度评级高，但引入可行度触及否决线（改造投入巨大、迁移周期长、业务连续性风险高），按六维复核短板原则转为动态观察，并优先评估可行度短板：跟踪同业规模化落地案例与PBC增量替换路径的风险管控经验，形成可分阶段、低风险的迁移方案后再评估转入系统论证。',
    definition: '以 API 化模块与打包业务能力（Packaged Business Capabilities，PBC）搭建的核心银行系统，允许银行按需组合、快速配置产品与旅程，强调可组合性、云原生与业务功能广度，替代单体式核心。',
    trend: '· 从单体式紧耦合核心，到 API 化、模块化 PBC 可组合核心\n· 从长周期瀑布式改造，到按能力增量替换与快速产品迭代\n· 从本地部署，到云原生、弹性伸缩的核心架构',
    bankValue: '· 支撑我行核心系统现代化，缩短产品上线周期、提升敏捷性\n· 以 PBC 增量替换降低单体核心改造的整体风险\n· 云原生与模块化降低长期维护成本与运营波动',
    limitation: '· 核心改造投入巨大、迁移周期长，业务连续性风险高\n· PBC 拆分与数据一致性、分布式事务治理复杂\n· 组织能力、供应商生态与既有资产协调难度大',
    maturityBasis: 'Gartor魔力象限已发布，可组合银行原则清晰，但可组合核心的规模化落地仍在推进，属早期采用阶段。', strategicFitBasis: '命中数据要素／未来（核心系统现代化）方向，为核心系统现代化的核心路径，库中原为空白补位价值大。', valueBasis: '缩短产品上线周期、以PBC增量降险、云原生降本，长期业务价值高，覆盖效率与成本多个维度。',
    feasibilityBasis: '核心改造投入巨大、迁移周期长、业务连续性风险高，需专项立项治理方可能推进，触发引入可行度否决线。', urgencyBasis: '2026年银行CIO将核心现代化列为优先事项，属3—5年关键窗口，尚无强制个体时限。', opennessBasis: 'Gartner魔力象限多厂商但商业方案为主，PBC模块化理念开放、具体实现仍偏专有，中等成本替代路径。',
    source: '· Gartner《Magic Quadrant/Critical Capabilities for Retail Core Banking Systems》（2026）《Composable Technology: A Top Banking Trend》\n· Gartner 4项可组合银行原则；ebankIT/DBP 洞察\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增，已联网核实）\n·【2026-07-14复核增补】Forbes／Visa可组合核心现代化专文（2026.06.24）；香港金管局（2026.04）\n·【2026-07-15深化增补】方法论专章依据既有Retail Core Banking Systems/Banking Payment Hub Platforms魔力象限引注（[1][2][3][4][5][8]）展开，未新增外部来源。', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-20',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '以 API 化模块与打包业务能力（Packaged Business Capabilities，PBC）搭建的核心银行系统，允许银行按需组合、快速配置产品与旅程，强调可组合性、云原生与业务功能广度，替代单体式核心。',
    center: '账务交易中心', centerReason: '支撑核心系统现代化，直接对应对公/零售分布式核心、信用卡核心系统', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T36', no: 36, name: '人工智能应用开发平台与模型运维（AI Application Development Platform & LLMOps）', short: '人工智能应用开发平台与模型运维', nameEn: 'AI Application Development Platform & LLMOps',
    category: '人工智能（AI工程化）', categoryKey: '人工智能', archDim: '技术', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 4, feasibility: 3, urgency: 4, openness: 4,
    conclusion: '技术成熟度4分（LLMOps类别已收敛为专用平台集）、战略匹配度4分、价值贡献度4分、战略紧迫度4分（金融监管总局指导意见鼓励建设一站式AI开发平台），是AI规模化生产的必备底座，宜系统论证：结合平台工程/IDP（011）规划AI工程化内部平台，明确评测/可观测/护栏/成本归因的工具收敛策略，与AI安全平台（018）的安全护栏对接，支撑AI应用从试点走向可治理生产。',
    definition: '面向大模型/生成式 AI 应用全生命周期的开发与运维平台能力，覆盖提示工程与版本管理、评测、部署、可观测、护栏与成本归因，将 AI 应用从实验推向可治理的规模化生产。',
    trend: '· 从手工调试提示、脚本部署，到标准化的 AI 应用开发与运维流水线\n· 从模型能力优先，到生产工程、可观测与治理并重\n· 从单点工具，到贯穿评测/追踪/网关/注册的一体化 LLMOps 底座',
    bankValue: '· 支撑001/002/019等 AI 应用规模化落地，缩短从试点到生产的周期\n· 提供评测、可观测、成本归因与护栏，满足 AI 治理与监管要求\n· 与011平台工程/IDP 协同，形成 AI 工程化内部平台',
    limitation: '· 工具链碎片化，多数企业需组合3–5个专用工具，缺乏统一企业上下文与治理\n· 生产化仍是主要失败点（Gartner 归因约85%的 AI 模型失败于生产部署环节）\n· 需相应组织能力、评测基准与合规配套',
    maturityBasis: '2026年LLMOps类别已收敛为专用平台集（MLflow、LangSmith等已多年生产验证），多个行业已有生产案例。', strategicFitBasis: '命中人工智能（AI工程化）战略方向，为001/002/019规模化落地的工程化底座核心路径。', valueBasis: '缩短AI应用从试点到生产的周期，提供评测、可观测、成本归因与护栏，覆盖效率与治理多个维度。',
    feasibilityBasis: '工具链碎片化、生产化仍是主要失败点（约85%模型失败于生产部署环节），需专项投入治理。', urgencyBasis: '金融监管总局指导意见鼓励建设一站式AI开发平台与AI评测体系，由工程选型上升为监管鼓励方向，0—2年内需启动。', opennessBasis: 'MLflow、Langfuse等主流工具多为开源，多厂商可选，具备国产化替代路径。',
    source: '· Gartner《Hype Cycle for Platform Engineering 2026》《AI Evaluation and Observability Platforms》Peer Insights\n· 行业 LLMOps 平台评测（Atlan/TrueFoundry 2026）\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增；与002/011关联，以本条目为主、002/011为补充）\n·【2026-07-14复核增补】金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》（2026.06.18）\n·【2026-07-15深化增补】方法论专章依据既有TrueFoundry对Gartner平台工程Hype Cycle的解读引注（[7]）展开，未新增外部来源。', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-20',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '面向大模型/生成式 AI 应用全生命周期的开发与运维平台能力，覆盖提示工程与版本管理、评测、部署、可观测、护栏与成本归因，将 AI 应用从实验推向可治理的规模化生产。',
    hypeCycle: 'assets/technologies/T036_模型工程与LLMOps/T036_模型工程与LLMOps_成熟度曲线.png',
    folder: 'assets/technologies/T036_模型工程与LLMOps',
    center: '技术服务中心', centerReason: '与平台工程/IDP协同，形成AI工程化内部平台，同属工程效能平台集群', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  }
  ];

  var FIELDS = [
    { key: 'no', label: '序号', type: 'num' },
    { key: 'name', label: '技术名称', type: 'text', main: true },
    { key: 'category', label: '所属战略方向', type: 'enum', main: true },
    { key: 'archDim', label: '企业级架构维度', type: 'enum', main: true },
    { key: 'attr', label: '技术属性', type: 'enum', main: true },
    { key: 'tier', label: '储备库层级', type: 'enum', main: true },
    { key: 'disposal', label: '处置档位', type: 'enum', main: true },
    { key: 'center', label: '企架十大中心落位', type: 'enum', main: true },
    { key: 'centerReason', label: '落位原因简述', type: 'text' },
    { key: 'maturity', label: '技术成熟度', type: 'num' },
    { key: 'strategicFit', label: '战略匹配度', type: 'num' },
    { key: 'value', label: '价值贡献度', type: 'num' },
    { key: 'feasibility', label: '引入可行度', type: 'num' },
    { key: 'urgency', label: '战略紧迫度', type: 'num' },
    { key: 'openness', label: '生态开放度', type: 'num' },
    { key: 'attention', label: '关注度', type: 'enum' },
    { key: 'status', label: '处置状态', type: 'enum' },
    { key: 'owner', label: '责任人', type: 'text' },
    { key: 'updateDate', label: '最近更新日期', type: 'date' },
    { key: 'source', label: '主要来源出处', type: 'text' },
    { key: 'externalSource', label: '外部来源标注', type: 'text' },
    { key: 'definition', label: '定义', type: 'text' },
    { key: 'trend', label: '颠覆性趋势', type: 'text' },
    { key: 'bankValue', label: '对银行的价值', type: 'text' },
    { key: 'limitation', label: '当前局限性', type: 'text' },
    { key: 'maturityBasis', label: '技术成熟度·研判依据', type: 'text' },
    { key: 'strategicFitBasis', label: '战略匹配度·研判依据', type: 'text' },
    { key: 'valueBasis', label: '价值贡献度·研判依据', type: 'text' },
    { key: 'feasibilityBasis', label: '引入可行度·研判依据', type: 'text' },
    { key: 'urgencyBasis', label: '战略紧迫度·研判依据', type: 'text' },
    { key: 'opennessBasis', label: '生态开放度·研判依据', type: 'text' },
    { key: 'conclusion', label: '研判结论与处置逻辑', type: 'text' },
    { key: 'remark', label: '备注', type: 'text' },
    { key: 'summary', label: '一句话概述', type: 'text' },
  ];

  var CENTER_MAPPINGS = {
    "T28": {
      "center": "对客服务中心",
      "reason": "契合智能客服、财富顾问、网点与远程服务的体验升级方向，直接对应手机银行/网银/柜面等对客渠道"
    },
    "T24": {
      "center": "对客服务中心",
      "reason": "有助于改善开户与授权体验，直接服务手机银行、网银等渠道的开户与身份核验环节"
    },
    "T04": {
      "center": "对客服务中心",
      "reason": "边缘计算贴近客户触点、就近处理可降低时延，适合提升手机银行、柜面等终端的响应速度，兼具边缘风控场景潜力"
    },
    "T19": {
      "center": "对客服务中心",
      "reason": "与WebAssembly同属端侧技术路线，高频重复任务降本、低时延的特点适用于手机银行等对客终端的本地化AI处理"
    },
    "T34": {
      "center": "智慧运营中心",
      "reason": "多智能体协同自动化契合运营场景，与智能工厂的产线化协同作业逻辑一致"
    },
    "T12": {
      "center": "智慧运营中心",
      "reason": "提供全链路可观测、快速定位、智能运维能力，直接支撑数智运营服务平台/智能工厂的稳定运行监控"
    },
    "T32": {
      "center": "客户经营中心",
      "reason": "核心价值在于支撑精准营销触达、财富顾问服务，直接对应统一商机平台/对公驾驶舱的客户经营职能"
    },
    "T02": {
      "center": "客户经营中心",
      "reason": "以个性化服务、重塑客服与营销应用形态为主要价值，与统一商机平台的精准营销、个性化触达能力对应"
    },
    "T15": {
      "center": "产品合约中心",
      "reason": "以代币化存款、债券/基金代币化与RWA新业务为核心，本质是创设新产品形态"
    },
    "T31": {
      "center": "业务处理中心",
      "reason": "以统一编排支撑授信审批、账户运营等端到端流程自动化，授信审批正是该中心的核心系统职能"
    },
    "T13": {
      "center": "业务处理中心",
      "reason": "支撑供应链金融\\\"数据不出域\\\"的合规流通，与该中心的保理、单证等业务直接对应"
    },
    "T35": {
      "center": "账务交易中心",
      "reason": "支撑核心系统现代化，直接对应对公/零售分布式核心、信用卡核心系统"
    },
    "T03": {
      "center": "账务交易中心",
      "reason": "核心价值首推实时支付处理与事件驱动的反欺诈，实时支付处理直接对应核心账务处理"
    },
    "T23": {
      "center": "风险管理中心",
      "reason": "保护远程开户、人脸支付、代客交易与KYC，直接对冲深伪与合成身份欺诈，与天眼系统的反欺诈监测能力对应"
    },
    "T33": {
      "center": "风险管理中心",
      "reason": "核心价值聚焦授信审批、风控反欺诈等核心决策的建模、增强与自动化，与信用风险智能决策系统直接对应"
    },
    "T21": {
      "center": "风险管理中心",
      "reason": "服务信贷风控、反欺诈，满足监管\\\"理由码\\\"要求，为信用风险智能决策系统提供可解释归因能力"
    },
    "T20": {
      "center": "数智能力中心",
      "reason": "定位为企业级数据要素供给与AI训练底座，横跨AI模型训练、风控长尾样本增强、跨域合规流通及研发仿真测试，属全行通用数智基础设施"
    },
    "T27": {
      "center": "风险管理中心",
      "reason": "核心价值聚焦授信、合规、风控场景的可解释推理与规则约束"
    },
    "T30": {
      "center": "风险管理中心",
      "reason": "重点提升AML/交易监控与报送效率，AML/交易监控与天眼系统职能直接对应"
    },
    "T29": {
      "center": "管理支持中心",
      "reason": "满足双碳与ESG要求，属企业管理治理职能"
    },
    "T22": {
      "center": "管理支持中心",
      "reason": "满足DORA等监管对ICT第三方与软件供应链风险管理要求，属第三方/供应商合规治理职能"
    },
    "T01": {
      "center": "数智能力中心",
      "reason": "价值横跨效率、风控、客户体验、新业务四大类，无单一业务中心可完全承载，作为通用能力供给"
    },
    "T05": {
      "center": "数智能力中心",
      "reason": "定位为统一数据视图、支撑AI应用的数据基础设施能力"
    },
    "T06": {
      "center": "数智能力中心",
      "reason": "定位为数据所有权下沉、数据产品化的数据治理范式"
    },
    "T16": {
      "center": "数智能力中心",
      "reason": "是自主型AI智能体、AI原生应用落地的必备组件，属AI能力底座"
    },
    "T17": {
      "center": "数智能力中心",
      "reason": "为自主型AI智能体落地提供协作底座，与其同属智能体能力集群"
    },
    "T07": {
      "center": "技术服务中心",
      "reason": "定位为抗量子、推动密码敏捷性建设的加密基础设施"
    },
    "T08": {
      "center": "技术服务中心",
      "reason": "定位为最小权限、持续验证的安全架构"
    },
    "T09": {
      "center": "技术服务中心",
      "reason": "定位为远期加速计算能力，属前沿算力储备"
    },
    "T10": {
      "center": "技术服务中心",
      "reason": "定位为弹性调度、算力普惠的算力基础设施"
    },
    "T11": {
      "center": "技术服务中心",
      "reason": "定位为标准化平台、改善开发者体验的研发效能平台"
    },
    "T14": {
      "center": "技术服务中心",
      "reason": "定位为敏感工作负载上云、数据主权保护的可信执行环境基础设施"
    },
    "T18": {
      "center": "技术服务中心",
      "reason": "是自主型AI智能体、AI原生应用、智能体互操作协议等落地的前置护栏，与后量子密码学、零信任架构、机密计算同属安全工程基础设施"
    },
    "T25": {
      "center": "技术服务中心",
      "reason": "定位为关键链路灾备通信的抗窃听保护，属通信安全基础设施"
    },
    "T26": {
      "center": "技术服务中心",
      "reason": "定位为远期超低功耗算力选项，属前瞻算力储备"
    },
    "T36": {
      "center": "技术服务中心",
      "reason": "与平台工程/IDP协同，形成AI工程化内部平台，同属工程效能平台集群"
    }
  };

  var RELATIONS = [
    { key: 'depend', label: '依赖', color: '#f43f5e' },
    { key: 'complement', label: '互补', color: '#10b981' },
    { key: 'compete', label: '竞争', color: '#f59e0b' },
    { key: 'same', label: '同族', color: '#64748b' }
  ];
  var CROSS_EDGES = [["多智能体系统","自主型AI智能体","depend"],["AI智能体互操作协议","自主型AI智能体","depend"],["业务编排与自动化技术","事件驱动架构","depend"],["客户数字孪生","合成数据","depend"],["客户数字孪生","数据织网","depend"],["决策智能平台","因果AI","depend"],["AI原生应用架构","向量数据库与检索增强生成","depend"],["人工智能安全平台","零信任架构","depend"],["人工智能应用开发平台与模型运维","AI原生应用架构","depend"],["人工智能安全平台","自主型AI智能体","complement"],["隐私增强计算","机密计算","complement"],["合成数据","隐私增强计算","complement"],["决策智能平台","自主型AI智能体","complement"],["多智能体系统","AI智能体互操作协议","complement"],["客户数字孪生","决策智能平台","complement"],["数据织网","数据网格","compete"],["后量子密码学","量子保密通信","compete"],["小语言模型与端侧AI","自主型AI智能体","compete"]];

  function buildGraph() {
    var nodes = ITEMS.map(function (it) { return { id: it.id, name: it.short, category: it.categoryKey, trl: it.maturity, tier: it.tier }; });
    var edges = [];
    var byCat = {}; nodes.forEach(function (n) { (byCat[n.category] = byCat[n.category] || []).push(n); });
    Object.keys(byCat).forEach(function (cat) { var arr = byCat[cat]; for (var i = 0; i < arr.length; i++) { if (i + 1 < arr.length) edges.push({ source: arr[i].id, target: arr[i + 1].id, relation: 'same' }); } });
    CROSS_EDGES.forEach(function (e) {
      var s, t;
      ITEMS.forEach(function (it) { if (it.name === e[0]) s = it.id; if (it.name === e[1]) t = it.id; });
      if (s && t) edges.push({ source: s, target: t, relation: e[2] });
    });
    return { nodes: nodes, edges: edges };
  }

  var WORKPLAN = {
    title: '工作方案',
    subtitle: '敏捷工作机制 · 五级漏斗筛选闭环 · 全流程常态研判',
    pdfPlan: 'assets/plans/FA000_工作推进方案.pdf',
    docxPlan: 'assets/plans/FA000_工作推进方案（定稿）_v1.0.docx',
    goal: '围绕“十五五”信息科技规划编制与全行重大科技投资决策，构建“多源情报扫描—知识库结构化标引—长名单动态储备—六维深度研判—重点专题攻坚”的五级筛选漏斗与敏捷研究闭环，实现技术洞察从“零散跟踪”向“常态研判”升级、从“信息搬运”向“价值研判”升级。',
    funnel: [
      { step: '01', name: '多源情报动态扫描', desc: '覆盖 6 大类 21 家权威渠道，开展实时感知与月度扫描。' },
      { step: '02', name: '知识库归集与标引', desc: '情报清洗核验，按“战略方向 × 技术属性 × 企架”标引入库。' },
      { step: '03', name: '前沿技术长名单', desc: '动态收敛形成 36 项技术长名单台账，掌握趋势与场景价值。' },
      { step: '04', name: '六维研判分层定档', desc: '运用六维量化打分落位企架，按“布局/论证/研究/观察”滚动管理。' },
      { step: '05', name: '重点技术专题深研', desc: '精选高契合关键技术立项，输出评估表、报告与PPT成套成果。' }
    ],
    principles: [
      '战略导向：聚焦人工智能、数据要素、算力网络三大战略主线，兼顾金融基础设施与安全。',
      '金融适配：以“战略匹配度”为核心标尺，突出银行具体业务场景赋能、风险可控与监管合规边界。',
      '情报驱动：多源权威情报交叉核验，量化加权评估，实现数据可溯、结论可证、逻辑闭环。',
      '分层滚动：按布局/论证/研究/观察四层动态滚动管理，设定准入可行度与紧迫度阈值红线。'
    ],
    cadence: [
      { period: '月度例会', title: '动态扫描与长名单调档', desc: '跟踪技术成熟度与行业动向，动态增补入库并调档储备库层级。' },
      { period: '季度输出', title: '技术动态简报与专题推进', desc: '首月发布前沿技术动态简报，分批推进重点技术成套成果制作。' },
      { period: '年度收敛', title: '趋势研判总报告与战略衔接', desc: '编制年度《前沿技术趋势研判报告》，全面衔接科技规划与投资。' }
    ],
    org: [
      { role: '项目总牵头', duty: '机制运行统筹 · 资源对接 · 成果呈报把关' },
      { role: '情报采集组', duty: '多源情报采集 · 归集清洗 · 权威智库对接' },
      { role: '研判评估组', duty: '六维评级打分 · 分层定档 · 企架中心落位' },
      { role: '专题研究组', duty: '立项专题深研 · 报告编制 · PPT与架构图' },
      { role: '平台工程组', duty: '知识储备数字化 · 平台开发 · 运维与留痕' }
    ]
  };

  var SOURCE_CRITERIA = [
    { key: 'authority',   label: '权威性', weight: 25 },
    { key: 'timeliness',  label: '时效性', weight: 20 },
    { key: 'credibility', label: '可信度', weight: 30 },
    { key: 'coverage',    label: '覆盖度', weight: 15 },
    { key: 'uniqueness',  label: '独特性', weight: 10 }
  ];
  var SOURCES = [
    { name: '监管与标准组织', type: '监管', authority: 9, timeliness: 7, credibility: 9, coverage: 6, uniqueness: 6, comment: '金融监管总局、人民银行、NIST、W3C 等，权威可信，反映合规与标准收敛方向。' },
    { name: 'Gartner/Forrester 等研究机构', type: '智库', authority: 8, timeliness: 9, credibility: 8, coverage: 9, uniqueness: 7, comment: '技术成熟度曲线与战略趋势的重要来源，适合建立全景。' },
    { name: '头部厂商发布与财报', type: '产业', authority: 7, timeliness: 9, credibility: 7, coverage: 7, uniqueness: 7, comment: '反映产业化进展与商业化节奏，存在宣传口径偏差。' },
    { name: '金融同业实践与案例', type: '同业', authority: 8, timeliness: 8, credibility: 8, coverage: 7, uniqueness: 8, comment: '与我行场景最贴近，是落地研判的关键参照。' },
    { name: '顶级学术期刊与预印本', type: '学术', authority: 8, timeliness: 8, credibility: 8, coverage: 7, uniqueness: 9, comment: '捕捉最前沿机理与原创进展，需甄别未同行评议内容。' },
    { name: '开源社区与代码仓库', type: '开源', authority: 6, timeliness: 10, credibility: 6, coverage: 7, uniqueness: 9, comment: '真实工程进展第一手来源，需人工甄别质量。' },
    { name: '专利数据库', type: '专利', authority: 8, timeliness: 8, credibility: 8, coverage: 9, uniqueness: 8, comment: '判断产业布局与竞争态势的核心来源。' },
    { name: '产业与技术媒体', type: '媒体', authority: 6, timeliness: 10, credibility: 6, coverage: 8, uniqueness: 6, comment: '信息面广、时效高，权威性需交叉验证。' }
  ];

  var SOURCES_REPORT = {
    title: '信息来源评估',
    subtitle: '系统盘点 5 大类别 21 个权威渠道 · 覆盖五大战略领域 · 综合能力量化评估',
    version: '202609071450',
    pdfReport: 'assets/reports/前沿科技研究信息来源报告.pdf',
    docxReport: 'assets/reports/前沿科技研究信息来源报告_V4.docx',
    categories: [
      { key: 'govt', name: '政府/科研机构', count: 5, color: '#3b82f6', desc: '权威性高、报告完整、完全免费，国家战略科技力量与产业指导' },
      { key: 'cons', name: '咨询机构', count: 8, color: '#10b981', desc: '行业标准制定者，权威性强、覆盖广，完整报告需付费/企业合作' },
      { key: 'corp', name: '科技企业研究院', count: 4, color: '#f59e0b', desc: '顶级企业技术前瞻，白皮书与落地实践案例翔实，官网为权威源' },
      { key: 'media', name: '科技媒体研究院', count: 3, color: '#ef4444', desc: '时效性最好、更新频率高，微信生态为主，适合初筛与热点跟进' },
      { key: 'acad', name: '学术预印本', count: 1, color: '#8b5cf6', desc: '全球计算机与前沿学术论文源头，更新最快全免费开放' }
    ],
    topRankings: [
      { rank: 1, name: '中国信通院', cat: '政府科研', badge: 'tag-govt', score: '4.50', feat: '权威+开放+全领域覆盖，集智蓝皮书标杆，综合实力最强' },
      { rank: 2, name: 'Gartner', cat: '咨询机构', badge: 'tag-cons', score: '4.40', feat: '全球IT研究标准制定者，成熟度曲线权威，全球影响力居首' },
      { rank: 3, name: '麦肯锡中国', cat: '咨询机构', badge: 'tag-cons', score: '4.20', feat: '全球顶级战略咨询，企业数字化与前沿产业落地洞见权威' },
      { rank: 4, name: '阿里达摩院', cat: '企业研究', badge: 'tag-corp', score: '4.15', feat: '顶级科技企业前瞻，历年十大趋势标杆，内容深度完整' },
      { rank: 5, name: 'BCG波士顿咨询', cat: '咨询机构', badge: 'tag-cons', score: '4.15', feat: '全球顶级战略咨询，出版物与产业变革前沿洞察权威' },
      { rank: 6, name: 'IDC中国', cat: '咨询机构', badge: 'tag-cons', score: '4.10', feat: '全球IT市场研究权威，软硬件市场份额与技术跟踪标杆' },
      { rank: 7, name: '华为云', cat: '企业研究', badge: 'tag-corp', score: '4.05', feat: '企业级白皮书完整，行业云原生与数智化落地参考标杆' },
      { rank: 8, name: 'arXiv', cat: '学术预印本', badge: 'tag-acad', score: '4.05', feat: '全球顶尖前沿学术论文源头，开放免费，时效最高' },
      { rank: 9, name: 'IBM IBV', cat: '咨询机构', badge: 'tag-cons', score: '4.00', feat: '商业价值研究院，企业级技术转型与商业价值洞察' },
      { rank: 10, name: '贝恩咨询', cat: '咨询机构', badge: 'tag-cons', score: '3.95', feat: '全球顶级战略咨询，科技前沿专题与战略投资研判权威' }
    ],
    domainChains: [
      { domain: '🤖 人工智能', chain: '信通院 <i class="arr">→</i> Gartner <i class="arr">→</i> 达摩院 <i class="arr">→</i> arXiv <i class="arr">→</i> 量子位' },
      { domain: '📊 大数据要素', chain: '信通院 <i class="arr">→</i> IDC中国 <i class="arr">→</i> 华为云 <i class="arr">→</i> 艾瑞咨询' },
      { domain: '☁️ 云计算架构', chain: 'Gartner <i class="arr">→</i> 麦肯锡 <i class="arr">→</i> IDC <i class="arr">→</i> 华为云 <i class="arr">→</i> 赛迪顾问' },
      { domain: '🔗 区块链与信任', chain: '信通院 <i class="arr">→</i> arXiv <i class="arr">→</i> 中国电子学会' },
      { domain: '⚛️ 量子前沿科技', chain: '中科院战略院 <i class="arr">→</i> 信通院 <i class="arr">→</i> arXiv <i class="arr">→</i> 量子位' }
    ],
    scenarios: [
      { title: '质量首选', tag: '深度立项论证', rec: '首选信通院、Gartner、达摩院、华为云、工信安全中心，建议通过官网下载完整 PDF 深入研读。' },
      { title: '时效首选', tag: '热点动态监测', rec: '关注量子位、36氪研究院、艾瑞咨询、信通院公众号，通过微信公众号第一时间捕获动态。' }
    ],
    criteria: SOURCE_CRITERIA,
    items: SOURCES
  };

  var RADAR_CONFIG = {
    title: '技术影响力雷达图（Impact Radar）',
    subtitle: '【影响时间推导逻辑】方法借鉴 Gartner Emerging Tech Impact Radar 框架。圈层距离代表技术对银行业务与架构产生实质性影响及主流采纳的预估时间跨度，由「技术成熟度（TRL）」、「战略紧迫度（监管与同业窗口）」与「引入可行度（工程治理短板）」交叉推导，并对标权威达峰周期（Time to Plateau）与政策导向综合判定：当前（0–1年）规模落地 · 1–3年关键推进 · 3–6年范式重塑 · 6–8年前瞻储备。气泡大小表征价值贡献度（1–5分），颜色表征处置档位。',
    sectors: [
      { key: '业务', label: '业务', startAngle: 0, endAngle: 72, labelAngle: 36 },
      { key: '应用', label: '应用', startAngle: 72, endAngle: 144, labelAngle: 108 },
      { key: '数据', label: '数据', startAngle: 144, endAngle: 216, labelAngle: 180 },
      { key: '技术', label: '技术', startAngle: 216, endAngle: 288, labelAngle: 252 },
      { key: '安全', label: '安全', startAngle: 288, endAngle: 360, labelAngle: 324 }
    ],
    rings: [
      { key: '当前', label: '当前', minR: 0, maxR: 75, midR: 45 },
      { key: '1-3年', label: '1-3年', minR: 75, maxR: 145, midR: 110 },
      { key: '3-6年', label: '3-6年', minR: 145, maxR: 220, midR: 182 },
      { key: '6-8年', label: '6-8年', minR: 220, maxR: 295, midR: 258 },
      { key: '8年以上', label: '8年以上', minR: 295, maxR: 370, midR: 332 }
    ],
    tierColors: TIER_COLOR,
    items: [
      // 业务 (5)
      { id: 'T28', no: '28', name: '数字人与空间计算', sector: '业务', ring: '3-6年', tier: '研究层', value: 3, r: 182, angle: 14 },
      { id: 'T31', no: '31', name: '业务编排与自动化技术', sector: '业务', ring: '3-6年', tier: '布局层', value: 4, r: 202, angle: 29 },
      { id: 'T01', no: '01', name: '自主型AI智能体', sector: '业务', ring: '3-6年', tier: '布局层', value: 5, r: 182, angle: 45 },
      { id: 'T15', no: '15', name: '区块链资产代币化与可编程货币', sector: '业务', ring: '3-6年', tier: '观察层', value: 4, r: 204, angle: 59 },
      { id: 'T32', no: '32', name: '客户数字孪生', sector: '业务', ring: '6-8年', tier: '观察层', value: 2, r: 275, angle: 36 },

      // 应用 (10)
      { id: 'T03', no: '03', name: '事件驱动架构', sector: '应用', ring: '当前', tier: '论证层', value: 4, r: 50, angle: 108 },
      { id: 'T19', no: '19', name: '小语言模型与端侧AI', sector: '应用', ring: '1-3年', tier: '研究层', value: 3, r: 106, angle: 83 },
      { id: 'T04', no: '04', name: 'WebAssembly', sector: '应用', ring: '1-3年', tier: '研究层', value: 3, r: 128, angle: 99 },
      { id: 'T17', no: '17', name: 'AI智能体互操作协议', sector: '应用', ring: '1-3年', tier: '研究层', value: 4, r: 106, angle: 117 },
      { id: 'T21', no: '21', name: '因果AI', sector: '应用', ring: '1-3年', tier: '研究层', value: 3, r: 128, angle: 133 },
      { id: 'T27', no: '27', name: '神经符号AI／可推理AI', sector: '应用', ring: '3-6年', tier: '研究层', value: 3, r: 176, angle: 80 },
      { id: 'T30', no: '30', name: '监管科技与合规科技', sector: '应用', ring: '3-6年', tier: '研究层', value: 3, r: 202, angle: 94 },
      { id: 'T35', no: '35', name: '可组合核心银行系统', sector: '应用', ring: '3-6年', tier: '观察层', value: 4, r: 176, angle: 108 },
      { id: 'T02', no: '02', name: 'AI原生应用架构', sector: '应用', ring: '3-6年', tier: '布局层', value: 4, r: 202, angle: 122 },
      { id: 'T34', no: '34', name: '多智能体系统', sector: '应用', ring: '3-6年', tier: '布局层', value: 4, r: 176, angle: 136 },

      // 数据 (6)
      { id: 'T13', no: '13', name: '隐私增强计算／隐私计算', sector: '数据', ring: '1-3年', tier: '论证层', value: 4, r: 112, angle: 158 },
      { id: 'T16', no: '16', name: '向量数据库与检索增强生成', sector: '数据', ring: '1-3年', tier: '论证层', value: 4, r: 132, angle: 180 },
      { id: 'T33', no: '33', name: '决策智能平台', sector: '数据', ring: '1-3年', tier: '论证层', value: 5, r: 112, angle: 202 },
      { id: 'T05', no: '05', name: '数据织网', sector: '数据', ring: '3-6年', tier: '布局层', value: 4, r: 184, angle: 158 },
      { id: 'T06', no: '06', name: '数据网格', sector: '数据', ring: '3-6年', tier: '观察层', value: 3, r: 206, angle: 180 },
      { id: 'T20', no: '20', name: '合成数据', sector: '数据', ring: '3-6年', tier: '研究层', value: 3, r: 184, angle: 202 },

      // 技术 (7)
      { id: 'T12', no: '12', name: '可观测性标准化', sector: '技术', ring: '当前', tier: '论证层', value: 4, r: 50, angle: 252 },
      { id: 'T11', no: '11', name: '平台工程／IDP', sector: '技术', ring: '1-3年', tier: '论证层', value: 4, r: 112, angle: 230 },
      { id: 'T29', no: '29', name: '绿色与可持续IT／液冷数据中心', sector: '技术', ring: '1-3年', tier: '论证层', value: 3, r: 132, angle: 252 },
      { id: 'T36', no: '36', name: '人工智能应用开发平台与模型运维', sector: '技术', ring: '1-3年', tier: '论证层', value: 4, r: 112, angle: 274 },
      { id: 'T10', no: '10', name: '算力网络', sector: '技术', ring: '3-6年', tier: '论证层', value: 4, r: 195, angle: 252 },
      { id: 'T09', no: '09', name: '量子计算', sector: '技术', ring: '6-8年', tier: '研究层', value: 4, r: 275, angle: 238 },
      { id: 'T26', no: '26', name: '神经形态与光子计算', sector: '技术', ring: '6-8年', tier: '观察层', value: 3, r: 275, angle: 266 },

      // 安全 (8) - 彻底拉开环内半径与角度，杜绝交叠
      { id: 'T08', no: '08', name: '零信任架构', sector: '安全', ring: '当前', tier: '论证层', value: 4, r: 40, angle: 296 },
      { id: 'T18', no: '18', name: '人工智能安全平台', sector: '安全', ring: '当前', tier: '论证层', value: 4, r: 64, angle: 324 },
      { id: 'T22', no: '22', name: '软件供应链安全', sector: '安全', ring: '当前', tier: '论证层', value: 4, r: 40, angle: 352 },
      { id: 'T23', no: '23', name: '深度伪造检测与反AI欺诈', sector: '安全', ring: '1-3年', tier: '论证层', value: 5, r: 110, angle: 304 },
      { id: 'T07', no: '07', name: '后量子密码学', sector: '安全', ring: '1-3年', tier: '观察层', value: 4, r: 134, angle: 344 },
      { id: 'T14', no: '14', name: '机密计算', sector: '安全', ring: '3-6年', tier: '观察层', value: 4, r: 180, angle: 305 },
      { id: 'T24', no: '24', name: '去中心化身份与可验证凭证', sector: '安全', ring: '3-6年', tier: '研究层', value: 3, r: 206, angle: 343 },
      { id: 'T25', no: '25', name: '量子保密通信／量子密钥分发', sector: '安全', ring: '6-8年', tier: '观察层', value: 4, r: 275, angle: 324 }
    ]
  };

  var HYPE_CYCLE_CONFIG = {
    title: '技术成熟度曲线（Gartner Hype Cycle）',
    subtitle: '【成熟度研判逻辑】方法借鉴 Gartner 经典新兴技术成熟度曲线（Hype Cycle）分析框架。横轴自左向右表征技术生命周期的5个核心演进阶段：创新萌芽期 · 期望膨胀期 · 泡沫破裂谷底期 · 稳步爬升恢复期 · 生产力成熟期。纵轴表征市场期望值与技术可见度（Expectations）。点位符号表征达平稳期时间（Time to Plateau），颜色表征我行处置档位。',
    phases: [
      { key: '萌芽', name: '创新萌芽期', nameEn: 'Innovation Trigger', startX: 50, endX: 265, color: 'rgba(56, 189, 248, 0.05)' },
      { key: '膨胀', name: '期望膨胀期', nameEn: 'Peak of Inflated Expectations', startX: 265, endX: 375, color: 'rgba(245, 158, 11, 0.05)' },
      { key: '谷底', name: '泡沫破裂谷底期', nameEn: 'Trough of Disillusionment', startX: 375, endX: 580, color: 'rgba(251, 113, 133, 0.05)' },
      { key: '恢复', name: '稳步爬升恢复期', nameEn: 'Slope of Enlightenment', startX: 580, endX: 840, color: 'rgba(52, 211, 153, 0.05)' },
      { key: '成熟', name: '生产力成熟期', nameEn: 'Plateau of Productivity', startX: 840, endX: 965, color: 'rgba(99, 102, 241, 0.05)' }
    ],
    plateaus: [
      { key: '<2年', label: '2年以内', symbol: 'circle', desc: '主流采纳度快速成型' },
      { key: '2-5年', label: '2-5年', symbol: 'triangle', desc: '技术迭代与标准化突破' },
      { key: '5-10年', label: '5-10年', symbol: 'square', desc: '工程治理与生态建设中' },
      { key: '>10年', label: '10年以上', symbol: 'diamond', desc: '前沿底层物理与基础理论' }
    ],
    items: [
      // 1. 创新萌芽期 (10项)
      { id: 'T32', no: '32', name: '客户数字孪生', phase: '创新萌芽期', plateau: '5-10年', x: 68, y: 458, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T09', no: '09', name: '量子计算', phase: '创新萌芽期', plateau: '>10年', x: 88, y: 444, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T26', no: '26', name: '神经形态与光子计算', phase: '创新萌芽期', plateau: '>10年', x: 108, y: 418, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T25', no: '25', name: '量子保密通信', phase: '创新萌芽期', plateau: '>10年', x: 128, y: 384, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T21', no: '21', name: '因果AI', phase: '创新萌芽期', plateau: '5-10年', x: 150, y: 339, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T27', no: '27', name: '神经符号AI', phase: '创新萌芽期', plateau: '5-10年', x: 172, y: 289, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T07', no: '07', name: '后量子密码学', phase: '创新萌芽期', plateau: '5-10年', x: 194, y: 238, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T10', no: '10', name: '算力网络', phase: '创新萌芽期', plateau: '5-10年', x: 216, y: 188, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T02', no: '02', name: 'AI原生应用架构', phase: '创新萌芽期', plateau: '2-5年', x: 236, y: 146, labelPos: 'top', labelDx: 0, labelDy: -18 },
      { id: 'T17', no: '17', name: 'AI智能体互操作协议', phase: '创新萌芽期', plateau: '2-5年', x: 254, y: 114, labelPos: 'top', labelDx: 0, labelDy: -18 },

      // 2. 期望膨胀期 (5项)
      { id: 'T34', no: '34', name: '多智能体系统', phase: '期望膨胀期', plateau: '2-5年', x: 280, y: 80, labelPos: 'bottom', labelDx: 0, labelDy: 38 },
      { id: 'T01', no: '01', name: '自主型AI智能体', phase: '期望膨胀期', plateau: '2-5年', x: 305, y: 65, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T36', no: '36', name: '模型开发平台与运维LLMOps', phase: '期望膨胀期', plateau: '2-5年', x: 326, y: 72, labelPos: 'bottom', labelDx: -12, labelDy: 20 },
      { id: 'T18', no: '18', name: '人工智能安全平台', phase: '期望膨胀期', plateau: '2-5年', x: 346, y: 100, labelPos: 'top', labelDx: 10, labelDy: -20 },
      { id: 'T33', no: '33', name: '决策智能平台', phase: '期望膨胀期', plateau: '2-5年', x: 366, y: 142, labelPos: 'bottom', labelDx: 12, labelDy: 20 },

      // 3. 泡沫破裂谷底期 (9项) - 波峰至波谷下坠斜坡与谷底盆地（与 Gartner 原图 100% 吻合）
      { id: 'T06', no: '06', name: '数据网格', phase: '泡沫破裂谷底期', plateau: '2-5年', x: 390, y: 206, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T35', no: '35', name: '可组合核心银行系统', phase: '泡沫破裂谷底期', plateau: '5-10年', x: 408, y: 259, labelPos: 'bottom', labelDx: -12, labelDy: 20 },
      { id: 'T05', no: '05', name: '数据织网', phase: '泡沫破裂谷底期', plateau: '2-5年', x: 426, y: 312, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T20', no: '20', name: '合成数据', phase: '泡沫破裂谷底期', plateau: '2-5年', x: 446, y: 366, labelPos: 'bottom', labelDx: 12, labelDy: 20 },
      { id: 'T15', no: '15', name: '区块链资产代币化与可编程货币', phase: '泡沫破裂谷底期', plateau: '5-10年', x: 468, y: 414, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T28', no: '28', name: '数字人与空间计算', phase: '泡沫破裂谷底期', plateau: '5-10年', x: 490, y: 444, labelPos: 'bottom', labelDx: -12, labelDy: 20 },
      { id: 'T24', no: '24', name: '去中心化身份与可验证凭证', phase: '泡沫破裂谷底期', plateau: '5-10年', x: 512, y: 450, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T04', no: '04', name: 'WebAssembly', phase: '泡沫破裂谷底期', plateau: '2-5年', x: 536, y: 445, labelPos: 'bottom', labelDx: 12, labelDy: 20 },
      { id: 'T14', no: '14', name: '机密计算', phase: '泡沫破裂谷底期', plateau: '2-5年', x: 560, y: 435, labelPos: 'top', labelDx: 0, labelDy: -20 },

      // 4. 稳步爬升恢复期 (9项)
      { id: 'T30', no: '30', name: '监管科技与合规科技', phase: '稳步爬升恢复期', plateau: '2-5年', x: 592, y: 416, labelPos: 'bottom', labelDx: -10, labelDy: 20 },
      { id: 'T31', no: '31', name: '业务编排与自动化技术', phase: '稳步爬升恢复期', plateau: '2-5年', x: 616, y: 399, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T13', no: '13', name: '隐私增强计算', phase: '稳步爬升恢复期', plateau: '2-5年', x: 642, y: 377, labelPos: 'bottom', labelDx: 0, labelDy: 20 },
      { id: 'T16', no: '16', name: '向量数据库与检索增强生成', phase: '稳步爬升恢复期', plateau: '2-5年', x: 668, y: 355, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T19', no: '19', name: '小语言模型与端侧AI', phase: '稳步爬升恢复期', plateau: '2-5年', x: 694, y: 333, labelPos: 'bottom', labelDx: 0, labelDy: 20 },
      { id: 'T23', no: '23', name: '深度伪造检测与反AI欺诈', phase: '稳步爬升恢复期', plateau: '2-5年', x: 720, y: 312, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T22', no: '22', name: '软件供应链安全', phase: '稳步爬升恢复期', plateau: '2-5年', x: 750, y: 292, labelPos: 'bottom', labelDx: 0, labelDy: 20 },
      { id: 'T11', no: '11', name: '平台工程', phase: '稳步爬升恢复期', plateau: '2-5年', x: 780, y: 277, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T29', no: '29', name: '绿色与可持续IT', phase: '稳步爬升恢复期', plateau: '2-5年', x: 812, y: 268, labelPos: 'bottom', labelDx: 0, labelDy: 20 },

      // 5. 生产力成熟期 (3项)
      { id: 'T08', no: '08', name: '零信任架构', phase: '生产力成熟期', plateau: '<2年', x: 855, y: 267, labelPos: 'top', labelDx: 0, labelDy: -20 },
      { id: 'T03', no: '03', name: '事件驱动架构', phase: '生产力成熟期', plateau: '<2年', x: 900, y: 266, labelPos: 'bottom', labelDx: 0, labelDy: 20 },
      { id: 'T12', no: '12', name: '可观测性标准化', phase: '生产力成熟期', plateau: '<2年', x: 945, y: 265, labelPos: 'top', labelDx: 0, labelDy: -20 }
    ]
  };

  
  // ==================== 1.3 方法论工具评估 ====================
  var METHODOLOGY_APPLICATION = {
  "title": "方法论工具评估",
  "subtitle": "覆盖技术研判全流程 8 大环节 · 25 项方法论工具矩阵支撑",
  "intro": "研究工作在各环节综合运用了以下方法论工具，为技术成熟度判断、应用场景验证、风险与挑战评估、市场规模测算、行业竞争格局分析、战略匹配度判断、评估结论收敛、实施建议设计提供方法支撑，避免研判结论仅凭经验或者主观判断得出。各研究环节运用的主要方法论工具如下：",
  "stages": [
    {
      "id": "s1",
      "stage": "技术成熟度判断",
      "tools": "01. Hype Cycle、02. NASA TRL、03. TOGAF ADM",
      "focus": "阶段定性与就绪度量化",
      "secId": "sec1",
      "tagColor": "#38bdf8"
    },
    {
      "id": "s2",
      "stage": "场景与案例验证",
      "tools": "04. JTBD、05. APQC标杆、06. 优先级矩阵、07. 新兴技术雷达",
      "focus": "业务逻辑与价值对齐",
      "secId": "sec2",
      "tagColor": "#818cf8"
    },
    {
      "id": "s3",
      "stage": "风险与挑战评估",
      "tools": "08. PESTEL、09. FMEA、10. NIST CSF与FAIR",
      "focus": "宏观扫描与工程化排序",
      "secId": "sec3",
      "tagColor": "#f87171"
    },
    {
      "id": "s4",
      "stage": "市场规模测算",
      "tools": "11. TAM/SAM/SOM、12. 双向验证、13. IDC MarketScape",
      "focus": "三层结构与双向校验",
      "secId": "sec4",
      "tagColor": "#fbbf24"
    },
    {
      "id": "s5",
      "stage": "行业结构与厂商格局",
      "tools": "14. 波特五力、15. 魔力象限、16. 关键能力配套",
      "focus": "竞争格局与厂商定位",
      "secId": "sec5",
      "tagColor": "#34d399"
    },
    {
      "id": "s6",
      "stage": "战略定位分析",
      "tools": "17. SWOT、18. 实物期权、19. McKinsey 7S",
      "focus": "内外部审视与期权决策",
      "secId": "sec6",
      "tagColor": "#a78bfa"
    },
    {
      "id": "s7",
      "stage": "评估结论收敛",
      "tools": "20. 德尔菲法、21. 三角验证",
      "focus": "专家共识与三角校准",
      "secId": "sec7",
      "tagColor": "#60a5fa"
    },
    {
      "id": "s8",
      "stage": "实施建议设计",
      "tools": "22. Kotter八步法、23. 技术路线图、24. PDCA、25. OKR",
      "focus": "路径规划与执行闭环",
      "secId": "sec8",
      "tagColor": "#f472b6"
    }
  ],
  "note": "各方法的具体定义、适用边界与操作要点，见本报告附录《前沿技术研究方法论工具体系》。"
};

  // ==================== 附录 前沿技术研究方法论工具体系 ====================
  var METHODOLOGY_TOOLKIT = {
  "title": "前沿技术研究方法论工具体系",
  "disclaimer": "以下方法论工具，均为研究团队借鉴相关机构提出的分析框架、结合具体技术特点自主完成的评估，不代表相关机构对该技术的官方研究结论；个别技术如存在相关机构已发布的针对性研究成果，将在该技术具体研究成果中另行标注引用来源。",
  "sections": [
    {
      "id": "sec1",
      "title": "一、技术成熟度的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、Hype Cycle：技术生命周期的行业标尺",
          "items": [
            {
              "type": "p",
              "text": "Gartner Hype Cycle（技术成熟度曲线）是技术研究领域引用最广泛、认知度最高的成熟度评估工具。该曲线将一项技术的演进划分为五个连续阶段："
            },
            {
              "type": "p",
              "text": "创新触发（Innovation Trigger）——技术在实验室内取得突破，媒体开始关注，但尚无成熟产品；期望膨胀（Peak of Inflated Expectations）——炒作达到顶峰，大量厂商涌入，技术可行性尚未被充分验证；泡沫破裂（Trough of Disillusionment）——早期项目大量失败，投资收缩，行业进入修正期；稳步爬升（Slope of Enlightenment）——幸存者迭代出可行的解决方案，企业开始务实部署；成熟平原（Plateau of Productivity）——技术进入主流应用，市场渗透率趋于稳定，商业模式成熟。"
            },
            {
              "type": "p",
              "text": "Gartner每年发布超过90条Hype Cycle曲线，覆盖人工智能、云计算、网络安全、金融科技、物联网等细分领域。每条曲线源自对数百家供应商、分析师和终端用户的系统性调研，具有较高的行业公信力。对于IT领域的新兴技术，Hype Cycle的核心价值在于帮助研究人员快速判断该技术当前处于概念阶段还是落地阶段，以及距离主流采用还需要多长时间。例如，2025年Gartner的AI Hype Cycle显示，生成式AI已越过期望膨胀峰值，进入泡沫破裂期的早期阶段，而自主AI Agent则仍处于创新触发向期望膨胀过渡的区间，两者之间约存在2—3年的差距。"
            },
            {
              "type": "table",
              "headers": [
                "Hype Cycle阶段",
                "典型特征",
                "技术成熟度区间",
                "投资建议"
              ],
              "rows": [
                [
                  "创新触发",
                  "实验室突破，尚无产品",
                  "TRL 1—3",
                  "关注，不投入"
                ],
                [
                  "期望膨胀",
                  "媒体炒作，厂商涌入",
                  "TRL 3—5",
                  "审慎跟踪"
                ],
                [
                  "泡沫破裂",
                  "早期项目失败，投资收缩",
                  "TRL 4—6",
                  "技术验证机会"
                ],
                [
                  "稳步爬升",
                  "解决方案迭代，务实部署",
                  "TRL 6—8",
                  "试点投入"
                ],
                [
                  "成熟平原",
                  "主流应用，市场渗透",
                  "TRL 8—9",
                  "规模化部署"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_01.png",
              "caption": "图1 Hype Cycle 技术成熟度曲线示意图"
            }
          ]
        },
        {
          "title": "2、NASA TRL：硬科技的量化刻度",
          "items": [
            {
              "type": "p",
              "text": "TRL（Technology Readiness Level，技术就绪水平）由NASA于20世纪70年代提出，后经ISO 16290标准固化，成为全球硬科技研发领域通用的成熟度评分体系。TRL将技术成熟度划分为9个等级：TRL1（观察到基本原理）至TRL3（概念验证完成）为基础研究阶段；TRL4（实验室环境验证）至TRL6（代表性环境演示）为工程开发阶段；TRL7（系统原型在实际环境中运行）至TRL9（系统经过实际任务验证）为应用部署阶段。"
            },
            {
              "type": "p",
              "text": "TRL与Hype Cycle形成互补：前者提供定量化的单点得分，后者提供宏观的时间定位。对于金融科技领域的新兴技术，TRL的9级评分体系可直接映射到具体的工程可行性判断。例如，一项后量子密码技术在TRL3阶段意味着仅在实验室完成了原理论证，距离金融核心系统的实际部署至少还需要三到五年，而TRL6则表明该技术已具备在准生产环境中进行试点验证的条件。"
            },
            {
              "type": "table",
              "headers": [
                "TRL等级",
                "描述",
                "对应研发阶段",
                "典型工作产物"
              ],
              "rows": [
                [
                  "1—3",
                  "基本原理到概念验证",
                  "基础研究",
                  "学术论文、实验室原型"
                ],
                [
                  "4—6",
                  "实验室环境到代表性环境演示",
                  "工程开发",
                  "功能原型、系统集成验证"
                ],
                [
                  "7—9",
                  "原型运行到实际任务验证",
                  "部署应用",
                  "生产系统、运行数据"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_02.png",
              "caption": "图2 NASA TRL 技术就绪水平九级示意图"
            }
          ]
        },
        {
          "title": "3、TOGAF ADM：架构开发方法",
          "items": [
            {
              "type": "p",
              "text": "TOGAF（The Open Group Architecture Framework）由国际开放标准组织The Open Group维护，是全球应用最广泛的企业架构框架之一。其核心方法论ADM（Architecture Development Method，架构开发方法）以一个可循环迭代的阶段序列，指导机构从业务需求出发，逐层推导出信息系统架构与技术架构，并最终落地为可治理、可变更的实施方案。ADM包含预备阶段（Preliminary）与A至H八个正式阶段：架构愿景（A）——业务架构（B）——信息系统架构，含数据架构与应用架构（C）——技术架构（D）——机会与解决方案（E）——迁移规划（F）——实施治理（G）——架构变更管理（H），需求管理（Requirements Management）则贯穿全过程、持续接收并校核各阶段产生的新需求。"
            },
            {
              "type": "p",
              "text": "与业界侧重效益判断或市场定位的方法论不同，TOGAF ADM回答的是一个更基础的问题：一项前沿技术引入之后，能否与机构现有的信息系统架构兼容、需要经过哪些架构层面的调整才能落地。对于大型商业银行而言，新技术往往不是独立部署，而要接入已经运行多年的核心系统、中间件与数据治理体系，架构兼容性判断的重要性并不亚于技术本身的成熟度。以引入某类新型数据基础设施技术为例，业务架构阶段（B）需要明确哪些业务部门、哪些业务流程将因此改变；信息系统架构阶段（C）需要判断新技术与现有数据仓库、核心交易系统之间的接口方式和数据流向；技术架构阶段（D）则需要评估新增的技术组件对现有技术栈、运维体系、灾备方案带来的调整；实施治理阶段（G）进一步明确谁来审批、按什么标准验收。ADM循环迭代的特性也意味着，架构评估并非一次性动作，而应随技术能力和业务需求的变化持续复核。"
            },
            {
              "type": "table",
              "headers": [
                "ADM阶段",
                "核心任务",
                "关键产出",
                "银行场景示例"
              ],
              "rows": [
                [
                  "A 架构愿景",
                  "明确变革范围与相关方共识",
                  "架构愿景文档",
                  "明确新技术引入的业务目标与预期收益"
                ],
                [
                  "B 业务架构",
                  "梳理受影响的业务流程与组织",
                  "业务架构基线/目标态",
                  "识别哪些业务条线、流程因新技术而调整"
                ],
                [
                  "C 信息系统架构",
                  "数据架构与应用架构设计",
                  "数据/应用架构文档",
                  "明确与核心系统、数据仓库的接口方式"
                ],
                [
                  "D 技术架构",
                  "确定技术组件与技术标准",
                  "技术架构文档",
                  "评估对现有技术栈、运维体系的影响"
                ],
                [
                  "E 机会与解决方案",
                  "识别可实施的项目与路径",
                  "实施路线初稿",
                  "划分试点范围与分阶段实施顺序"
                ],
                [
                  "F 迁移规划",
                  "制定迁移计划与优先级",
                  "迁移与实施计划",
                  "排定新旧系统并行、切换的时间表"
                ],
                [
                  "G 实施治理",
                  "建立架构合规审查机制",
                  "架构合规审查记录",
                  "明确技术方案的审批与验收标准"
                ],
                [
                  "H 架构变更管理",
                  "监控架构变化并触发新一轮循环",
                  "变更请求/架构基线更新",
                  "技术迭代后重新评估架构影响"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_03.png",
              "caption": "图3 TOGAF ADM 架构开发方法循环示意图"
            }
          ]
        }
      ]
    },
    {
      "id": "sec2",
      "title": "二、场景与案例的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、JTBD（Jobs-to-be-Done）：定义场景的业务逻辑",
          "items": [
            {
              "type": "p",
              "text": "JTBD框架由哈佛商学院Clayton Christensen教授提出，核心理念是：用户购买某种技术或产品，并非为了技术本身，而是为了完成某项任务（Job）。JTBD框架要求研究人员从用户目标出发，而非从技术功能出发，定义技术应用场景。例如，当评估一项实时风控技术时，JTBD框架会首先追问：用户在什么情境下需要实时？他真正想完成的任务是降低交易损失还是满足监管要求？这两者指向不同的场景定义和不同的技术选型。"
            },
            {
              "type": "p",
              "text": "JTBD框架在金融科技领域的应用案例包括：某大型银行在研究隐私计算技术时，采用JTBD方法识别出三个核心场景——跨机构反欺诈（任务：联合检测而不暴露敏感信息）、监管合规报表（任务：满足央行数据报送要求）、内部数据共享（任务：打破部门间数据孤岛）。三个场景的优先级排序和技术需求差异由此清晰呈现。"
            },
            {
              "type": "table",
              "headers": [
                "技术",
                "用户表述",
                "JTBD拆解（真实任务）",
                "场景定义"
              ],
              "rows": [
                [
                  "隐私计算",
                  "数据不出域",
                  "跨机构联合风控而不暴露敏感信息",
                  "反欺诈数据共享平台"
                ],
                [
                  "实时风控",
                  "秒级响应",
                  "降低交易欺诈损失",
                  "在线交易实时决策引擎"
                ],
                [
                  "分布式架构",
                  "高可用",
                  "避免核心系统单点故障",
                  "多活数据中心部署"
                ]
              ]
            }
          ]
        },
        {
          "title": "2、APQC标杆案例对标法：验证场景的可行性",
          "items": [
            {
              "type": "p",
              "text": "APQC（American Productivity and Quality Center）的标杆案例对标法（Benchmarking）是国际公认的跨组织最佳实践对比标准。该方法通过系统收集同行业或相近行业的案例数据，建立可比较的基线，判断目标场景的可行性。操作上分为四个步骤：识别关键绩效指标（KPI）——选择对标对象（通常为行业领先者或同业竞争者）——收集数据并进行差异分析——制定改进方案。"
            },
            {
              "type": "p",
              "text": "在金融科技报告中，Benchmarking可用于验证数字人民币智能合约在供应链金融中的应用场景是否已有可参考的落地案例，以及该场景的典型实施周期和成本区间。APQC的行业数据库覆盖全球超过1,000家企业的流程基准数据，为这种对标分析提供了系统化的数据源。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_04.png",
              "caption": "图4 APQC 标杆对标流程示意图"
            }
          ]
        },
        {
          "title": "3、Priority Matrix：单项技术的效益判断",
          "items": [
            {
              "type": "p",
              "text": "优先级矩阵是Gartner提出的Priority Matrix方法框架，把一项技术放在效益等级和预计达到成熟应用所需年限两个坐标上定位，效益等级分为低、中、高、变革性四档，年限则划分为不到两年、两到五年、五到十年、十年以上几个区间。这个方法和成熟度曲线通常配合使用：成熟度曲线回答这项技术现在处于哪个发展阶段，优先级矩阵回答这项技术投入产出比值不值得现在跟进，两者结合能避免只看阶段不看效益、或者只看效益不看时机的片面判断。以一项跨境支付相关技术为例，如果研判其效益等级为高、但预计五到十年才能进入主流应用，优先级矩阵会提示这类技术适合关注但不宜大额投入，而不是简单地按成熟度曲线阶段一刀切决策。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_05.png",
              "caption": "图5 Priority Matrix 效益—年限定位示意图（图中标注为示例技术，非本项目实际研判结果）"
            }
          ]
        },
        {
          "title": "4、新兴技术雷达（Emerging Tech Impact Radar）：技术组合的全景定位",
          "items": [
            {
              "type": "p",
              "text": "新兴技术雷达是Gartner提出的另一种呈现形式，用于同时展示一批新兴技术在同一张图上的相对位置。该方法通常以同心圆环表示技术距离产生规模化业务影响还有多远，环层越靠内代表越接近实质影响；按技术领域或应用方向做扇区划分；标记的大小或颜色可用于编码额外的判断维度，如预期影响程度、当前所处阶段等。与Priority Matrix聚焦单项技术的效益判断不同，新兴技术雷达解决的是一批技术放在一起看、谁的位置更靠前这类组合层面的比较问题，适合技术数量较多、需要快速识别相对优先级的场景。Gartner近年发布的生成式AI硬件、物联网、半导体等领域的新兴技术雷达报告，采用的都是这一呈现方式。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_06.png",
              "caption": "图6 新兴技术雷达（Gartner风格）示意图"
            },
            {
              "type": "p",
              "text": "前三项方法解决的是单项技术这个场景成不成立、这项技术值不值得投入的问题，第四项方法则是把视角从单项技术切换到技术组合，解决一批技术放在一起看、优先级该怎么排的问题，从单点判断到组合比较，是这一板块内在的递进逻辑。"
            }
          ]
        }
      ]
    },
    {
      "id": "sec3",
      "title": "三、风险与挑战的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、PESTEL分析：宏观风险的六维扫描",
          "items": [
            {
              "type": "p",
              "text": "PESTEL分析是经典的战略管理工具，由Johnson和Scholes等学者在20世纪90年代系统化，将外部环境风险划分为六个维度：政治（Political）、经济（Economic）、社会（Social）、技术（Technological）、环境（Environmental）和法规（Legal）。在金融科技领域，PESTEL分析特别适用于评估技术引入过程中可能面临的系统性风险。"
            },
            {
              "type": "p",
              "text": "以一项跨境支付技术的研究为例，PESTEL分析可以快速识别出以下风险维度：政治——中美贸易摩擦对全球支付网络的影响；经济——汇率波动和利率政策的变化对跨境支付成本的影响；社会——用户对新型支付工具的信任度和接受度；技术——区块链互操作性与现有SWIFT系统的兼容性；环境——数据中心能耗对ESG评级的影响；法规——各国反洗钱法规对数据跨境传输的限制。"
            },
            {
              "type": "table",
              "headers": [
                "维度",
                "典型风险因素",
                "金融科技示例"
              ],
              "rows": [
                [
                  "政治（P）",
                  "贸易摩擦、地缘政治",
                  "中美科技脱钩对跨境支付网络的影响"
                ],
                [
                  "经济（E）",
                  "利率、汇率、通胀",
                  "货币政策变化对信贷科技成本的影响"
                ],
                [
                  "社会（S）",
                  "用户接受度、数字鸿沟",
                  "老年人群对数字人民币的接受障碍"
                ],
                [
                  "技术（T）",
                  "互操作性、标准化",
                  "区块链平台与SWIFT系统的兼容性问题"
                ],
                [
                  "环境（En）",
                  "能耗、ESG合规",
                  "数据中心能耗对银行ESG评级的影响"
                ],
                [
                  "法规（L）",
                  "数据合规、监管沙盒",
                  "跨境数据传输的GDPR与《数据安全法》冲突"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_07.png",
              "caption": "图7 PESTEL 六维扫描示意图"
            }
          ]
        },
        {
          "title": "2、FMEA：风险优先级排序的工程化方法",
          "items": [
            {
              "type": "p",
              "text": "FMEA（Failure Mode and Effects Analysis，失效模式与影响分析）起源于航空航天工业，后经IEC 60812标准固化，成为工程领域最成熟的风险优先级排序方法。FMEA的核心指标是RPN（Risk Priority Number，风险优先级数），由严重度（Severity）、发生概率（Occurrence）和检测难度（Detection）三项因子相乘得出。RPN值越高，表示该风险越需要优先处理。"
            },
            {
              "type": "p",
              "text": "在技术研究报告中，FMEA的优势在于其可量化性和可复现性。对于后量子密码迁移这一技术课题，研究人员可以将可能的风险点逐一列出，分别进行严重度×发生概率×检测难度评分，形成一张RPN排序表，使风险优先级判断标准化、透明化。"
            },
            {
              "type": "table",
              "headers": [
                "风险项",
                "严重度（1—10）",
                "发生概率（1—10）",
                "检测难度（1—10）",
                "RPN"
              ],
              "rows": [
                [
                  "密钥管理方案失效",
                  "9",
                  "4",
                  "6",
                  "216"
                ],
                [
                  "兼容性问题导致交易延迟",
                  "7",
                  "6",
                  "4",
                  "168"
                ],
                [
                  "迁移过程中出现安全漏洞",
                  "10",
                  "3",
                  "7",
                  "210"
                ],
                [
                  "厂商技术路线变更",
                  "6",
                  "5",
                  "5",
                  "150"
                ]
              ]
            }
          ]
        },
        {
          "title": "3、NIST CSF与FAIR：风险框架的行业标准",
          "items": [
            {
              "type": "p",
              "text": "（1）NIST CSF（Cybersecurity Framework，网络安全框架）由美国国家标准与技术研究院发布，以治理、识别、保护、检测、响应、恢复六大功能域构建了系统性的风险分类体系。该框架已被全球金融监管机构广泛引用，研究报告中引用NIST CSF可增强风险评估结论的合规性背书。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_08.png",
              "caption": "图8 NIST CSF 2.0 六大核心职能示意图"
            },
            {
              "type": "p",
              "text": "（2）FAIR（Factor Analysis of Information Risk）由FAIR Institute创立，是目前业界最完善的风险量化模型。FAIR将风险产出转化为可量化的财务损失预期（Annualized Loss Expectancy，ALE），计算公式为：ALE = 风险事件发生频率 × 单次事件损失幅度。这种量化方式在金融行业的技术选型报告中尤其有价值，因为它直接支持技术与业务部门之间的沟通——一项技术引入的风险，可以用每年可能造成的预期损失金额而非高、中、低的模糊标签来表达。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_09.png",
              "caption": "图9 FAIR 风险分析本体结构示意图"
            }
          ]
        }
      ]
    },
    {
      "id": "sec4",
      "title": "四、市场规模的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、TAM/SAM/SOM：三层市场结构",
          "items": [
            {
              "type": "p",
              "text": "TAM（Total Addressable Market，总可服务市场）——SAM（Serviceable Available Market，可服务市场）——SOM（Serviceable Obtainable Market，可获得市场）的三层模型是硅谷风投界和咨询公司广泛采用的市场规模估算框架。该模型的核心逻辑是逐层收敛：TAM是整个市场在理论上的最大规模，SAM是技术或产品在现有渠道和地理范围内可触达的市场比例，SOM则是短期内真正可获取的市场份额。"
            },
            {
              "type": "p",
              "text": "例如，在估算隐私计算在银行业市场规模时：TAM是全国银行业IT基础设施总投入中与数据安全相关的部分；SAM是需要且有能力部署隐私计算的中大型银行IT预算；SOM则是未来三年内实际计划采购隐私计算方案的银行预算总和。TAM/SAM/SOM的三层表达方式能够有效避免过度乐观的预测，同时为投资决策提供分层的参考依据。"
            },
            {
              "type": "table",
              "headers": [
                "层次",
                "定义",
                "估算方法",
                "易犯错误"
              ],
              "rows": [
                [
                  "TAM",
                  "理论最大可服务市场规模",
                  "宏观GDP占比法、总收入法",
                  "将全球市场视作可立即获取"
                ],
                [
                  "SAM",
                  "现有渠道/地理范围内可触达市场",
                  "地理限制+客户细分过滤",
                  "忽略渠道和法规限制"
                ],
                [
                  "SOM",
                  "短期内实际可获取市场",
                  "竞争对手份额、销售能力估算",
                  "假设高渗透率"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_10.png",
              "caption": "图10 TAM/SAM/SOM 三层市场结构示意图"
            }
          ]
        },
        {
          "title": "2、自上而下与自下而上的双向验证",
          "items": [
            {
              "type": "p",
              "text": "McKinsey和BCG均推荐在市场规模的估算中同时采用自上而下法（Top-down）和自下而上法（Bottom-up），并相互校核。自上而下法从宏观数据出发：GDP增速、行业渗透率、历史增长率等宏观指标推导出市场总规模。自下而上法则从微观数据出发：目标客户数量×客单价×采购频次，逐层累加得出市场总规模。"
            },
            {
              "type": "p",
              "text": "两种方法的差异往往揭示了市场估算中的关键假设风险。如果自上而下法得出50亿元市场规模，自下而上法仅得出15亿元，则说明某些假设——如技术渗透率或客单价——可能存在偏差。双向验证后，研究人员通常取两者的区间作为市场规模范围，而非给出单一数字。"
            },
            {
              "type": "table",
              "headers": [
                "估算方法",
                "数据来源",
                "优点",
                "局限"
              ],
              "rows": [
                [
                  "自上而下法",
                  "GDP、行业报告、渗透率数据",
                  "快速获得上限参考",
                  "假设过于宏观"
                ],
                [
                  "自下而上法",
                  "客户调研、销售数据、ARPU",
                  "接近真实市场",
                  "数据收集成本高"
                ],
                [
                  "双向验证",
                  "两者交叉校核",
                  "修正假设偏差",
                  "需要两套数据"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_11.png",
              "caption": "图11 自上而下与自下而上双向验证示意图"
            }
          ]
        },
        {
          "title": "3、IDC MarketScape与第三方数据来源",
          "items": [
            {
              "type": "p",
              "text": "IDC（International Data Corporation）是全球领先的IT市场研究机构之一，其MarketScape系列报告提供按年更新的细分市场规模预测，涵盖金融科技、云计算、安全、AI等200多个细分领域。IDC的市场规模预测以vendor survey和end-user survey为基础数据来源，辅以宏观经济模型和行业专家访谈，在业界享有较高认可度。"
            },
            {
              "type": "p",
              "text": "在技术研究报告中，IDC数据通常与Gartner数据交叉引用。例如，Gartner的Hype Cycle提供定性判断，IDC的MarketScape提供定量规模，两者结合形成完整的市场认知。此外，Canalys和Forrester分别在硬件和软件领域各有侧重，可作为补充数据源。在IDC MarketScape之外，Gartner发布的市场份额（Market Share）与市场预测（Market Forecast）报告也是市场规模测算的常用交叉校验数据源，前者反映各厂商实际营收在细分市场的分布情况，后者反映未来投资趋势的预测区间。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_12.png",
              "caption": "图12 IDC MarketScape 评估矩阵示意图"
            }
          ]
        }
      ]
    },
    {
      "id": "sec5",
      "title": "五、行业结构与主要厂商的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、Porter's Five Forces：行业竞争结构的经典框架",
          "items": [
            {
              "type": "p",
              "text": "波特五力分析由哈佛商学院教授Michael Porter于1979年提出，是战略管理领域最经典的行业分析工具。五力包括：供应商的议价能力（Bargaining Power of Suppliers）、买方的议价能力（Bargaining Power of Buyers）、新进入者的威胁（Threat of New Entrants）、替代品的威胁（Threat of Substitutes）和现有竞争者之间的竞争强度（Rivalry Among Existing Competitors）。"
            },
            {
              "type": "p",
              "text": "在技术研究报告中，波特五力分析的价值在于揭示行业结构的基本面。例如，当分析生成式AI开发平台这一细分市场时，五力分析可以揭示以下行业特征：供应商议价能力极强（GPU算力高度依赖头部厂商）、买方议价能力中等（企业客户有切换成本，但预算正在收紧）、新进入者威胁高（开源模型降低了进入门槛）、替代品威胁中等（传统ML平台尚未被完全替代）、竞争强度极高（多家头部厂商直接竞争，加上大量创业公司）。"
            },
            {
              "type": "table",
              "headers": [
                "五力维度",
                "评估要点",
                "高威胁信号",
                "低威胁信号"
              ],
              "rows": [
                [
                  "供应商议价能力",
                  "供应商集中度、替代成本",
                  "独家供应商、技术壁垒高",
                  "供应商众多、标准化程度高"
                ],
                [
                  "买方议价能力",
                  "买方集中度、切换成本",
                  "头部客户占收入比重大",
                  "客户分散、切换成本高"
                ],
                [
                  "新进入者威胁",
                  "进入壁垒、资本门槛",
                  "开源技术降低门槛",
                  "合规牌照、专利壁垒"
                ],
                [
                  "替代品威胁",
                  "替代方案性能/价格比",
                  "功能重叠度高",
                  "技术路径明显不同"
                ],
                [
                  "竞争强度",
                  "竞争者数量、增长放缓",
                  "巨头直接竞争",
                  "细分市场差异化明显"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_13.png",
              "caption": "图13 Porter's Five Forces 波特五力分析示意图"
            }
          ]
        },
        {
          "title": "2、Magic Quadrant与MarketScape：厂商定位的权威工具",
          "items": [
            {
              "type": "p",
              "text": "（1）Gartner Magic Quadrant（魔力象限）以执行能力（Ability to Execute）和愿景完整性（Completeness of Vision）为两个轴，将厂商划分为四个象限：领导者（Leaders）——执行能力和愿景均强；挑战者（Challengers）——执行能力强但愿景偏窄；远见者（Visionaries）——愿景开阔但执行能力有限；利基玩家（Niche Players）——关注特定细分市场。Magic Quadrant每年发布一次，覆盖几十个IT细分领域，是全球IT采购决策中被引用最多的厂商评估工具。"
            },
            {
              "type": "p",
              "text": "（2）IDC MarketScape是Magic Quadrant的权威补充，两者在评估维度上有所差异：Magic Quadrant更侧重战略愿景，MarketScape更侧重市场份额和综合能力。在技术研究报告中，同时引用Magic Quadrant和MarketScape可提供更立体的厂商定位图。"
            },
            {
              "type": "table",
              "headers": [
                "象限",
                "执行能力",
                "愿景完整性",
                "典型策略"
              ],
              "rows": [
                [
                  "领导者",
                  "高",
                  "高",
                  "维持领导地位，关注行业标准制定"
                ],
                [
                  "挑战者",
                  "高",
                  "低",
                  "扩大愿景，完善产品路线图"
                ],
                [
                  "远见者",
                  "低",
                  "高",
                  "加强执行，提升市场覆盖"
                ],
                [
                  "利基玩家",
                  "低",
                  "低",
                  "聚焦细分市场，避免正面竞争"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_14.png",
              "caption": "图14 Magic Quadrant 厂商定位象限示意图"
            }
          ]
        },
        {
          "title": "3、Critical Capabilities、Market Guide与Vendor Insight：魔力象限的配套工具",
          "items": [
            {
              "type": "p",
              "text": "在魔力象限之外，Gartner还提供几类配套的厂商评估方法。当需要在魔力象限已覆盖的市场中进一步比较各厂商在具体使用场景下的表现优劣时，可参考Critical Capabilities方法，该方法按不同用例分别为各厂商打分，提供比魔力象限更细颗粒度的对比结果；当某个细分市场尚处于早期阶段、还没有成熟到可以做魔力象限评估时，可参考Market Guide方法，侧重梳理市场定义、代表厂商和采购建议；当需要对某一家厂商做深入的单独画像时，可参考Vendor Insight方法，持续跟踪该厂商的产品动态与市场表现。这几类方法通常按厂商格局的成熟程度和分析深度需要，搭配魔力象限选择使用。"
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_15.png",
              "caption": "图15 Critical Capabilities 能力评分示意图"
            },
            {
              "type": "p",
              "text": "前两项方法从不同角度刻画行业竞争格局与厂商定位，第三项方法则是魔力象限的配套细化工具，视具体研究需要选用。"
            }
          ]
        }
      ]
    },
    {
      "id": "sec6",
      "title": "六、战略定位的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、SWOT分析：快速诊断的内外部审视",
          "items": [
            {
              "type": "p",
              "text": "SWOT分析由Stanford Research Institute的Albert Humphrey博士在20世纪60年代提出，将分析对象划分为内部因素（优势Strengths和劣势Weaknesses）与外部因素（机会Opportunities和威胁Threats）四个象限。SWOT是技术研究报告中使用频率最高的单一战略工具，其优势在于结构简单、表达直观，但在操作上容易陷入四象限列表的形式主义陷阱。"
            },
            {
              "type": "p",
              "text": "有效的SWOT分析需要满足两个条件：一是每个象限的内容必须与具体证据挂钩，而非泛泛而谈的套话；二是四个象限之间必须形成交叉逻辑——例如，优势是否可以抓住机会，劣势是否放大了威胁，威胁是否可以通过机会转化来对冲。"
            },
            {
              "type": "table",
              "headers": [
                "内部",
                "外部"
              ],
              "rows": [
                [
                  "优势（S）",
                  "机会（O）"
                ],
                [
                  "核心技术专利积累",
                  "监管政策窗口期"
                ],
                [
                  "客户基础与行业信任",
                  "新兴市场需求增长"
                ],
                [
                  "数据与算力基础设施",
                  "技术替代周期"
                ],
                [
                  "劣势（W）",
                  "威胁（T）"
                ],
                [
                  "技术成熟度不足",
                  "竞争对手先发优势"
                ],
                [
                  "团队规模与经验缺口",
                  "合规风险上升"
                ],
                [
                  "品牌认知度低",
                  "技术路线不确定性"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_16.png",
              "caption": "图16 SWOT 四象限示意图"
            }
          ]
        },
        {
          "title": "2、Real Options：高不确定性技术的投资决策机制",
          "items": [
            {
              "type": "p",
              "text": "Real Options（实物期权）分析源自MIT和Harvard Business School的金融学研究，将技术投资视为类似金融期权的选择权——企业有权利（而非义务）在后续阶段决定是否继续投资。Real Options特别适用于高不确定性、高资本投入的技术决策场景，因为这些场景下，一次性大额投资的风险过高，而分阶段决策可以保留灵活性。"
            },
            {
              "type": "p",
              "text": "在技术研究报告中，Real Options的应用模式通常为：将一项技术投资拆分为种子期权（第一轮小规模验证）→增长期权（验证成功后扩大投入）→扩展期权（全面部署）。每一轮期权都有明确的行权条件（如PoC通过率、业务指标阈值）和行权窗口（如季度评审时间点）。这种结构化的投资决策框架在金融行业的IT投资报告中正逐渐成为主流，替代了传统的全部投入或全部放弃的二元决策模式。"
            },
            {
              "type": "table",
              "headers": [
                "期权类型",
                "投资阶段",
                "行权条件",
                "终止条件"
              ],
              "rows": [
                [
                  "种子期权",
                  "第一轮PoC，投入<500万",
                  "技术验证完成，PoC通过率>70%",
                  "技术指标未达标"
                ],
                [
                  "增长期权",
                  "第二轮试点，投入500—2000万",
                  "业务指标达到阈值（如交易量>X）",
                  "业务增长未达预期"
                ],
                [
                  "扩展期权",
                  "第三轮规模化，投入>2000万",
                  "监管合规通过，ROI为正",
                  "市场环境重大变化"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_17.png",
              "caption": "图17 Real Options 决策树示意图"
            }
          ]
        },
        {
          "title": "3、McKinsey 7S：组织落地的一致性框架",
          "items": [
            {
              "type": "p",
              "text": "McKinsey 7S框架由McKinsey咨询公司于20世纪80年代提出，强调战略实施过程中七个要素的相互一致性：战略（Strategy）、结构（Structure）、制度（Systems）、风格（Style）、员工（Staff）、技能（Skills）、共同价值观（Shared Values）。7S的核心洞察是：单靠战略本身不足以驱动变革，结构、制度、风格、员工、技能、价值观必须与战略方向保持一致，否则变革难以持续。"
            },
            {
              "type": "table",
              "headers": [
                "要素",
                "硬性/软性",
                "评估问题",
                "常见风险"
              ],
              "rows": [
                [
                  "战略",
                  "硬性",
                  "技术路线是否与业务目标一致？",
                  "战略与业务脱节"
                ],
                [
                  "结构",
                  "硬性",
                  "组织架构是否支持新技术落地？",
                  "部门壁垒阻碍协同"
                ],
                [
                  "制度",
                  "硬性",
                  "流程是否适配新技术模式？",
                  "旧流程制约新效率"
                ],
                [
                  "风格",
                  "软性",
                  "管理层是否支持变革？",
                  "保守决策文化"
                ],
                [
                  "员工",
                  "软性",
                  "团队是否具备相关能力？",
                  "人才缺口"
                ],
                [
                  "技能",
                  "软性",
                  "核心技能是否到位？",
                  "外部依赖过高"
                ],
                [
                  "共同价值观",
                  "软性",
                  "组织是否认同变革方向？",
                  "文化冲突"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_18.png",
              "caption": "图18 McKinsey 7S 组织一致性关联图"
            }
          ]
        }
      ]
    },
    {
      "id": "sec7",
      "title": "七、评估结论的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、Delphi德尔菲法：匿名专家共识收敛",
          "items": [
            {
              "type": "p",
              "text": "德尔菲法由RAND Corporation在20世纪40年代开发，通过多轮匿名问卷调查和反馈汇总，使专家群体的意见逐步收敛。德尔菲法的核心机制是匿名加反馈：专家在互不知晓身份的情况下回答问题，组织者汇总结果后反馈给专家，专家根据反馈结果调整自己的判断，经过若干轮迭代后形成群体共识。"
            },
            {
              "type": "p",
              "text": "德尔菲法在技术研究报告中的应用价值体现在：它可以有效避免群体讨论中的权威偏差和从众效应。在技术成熟度、市场规模和战略定位等需要主观判断的环节，德尔菲法提供了一种系统化的专家共识收敛机制，使研究结论的可靠性显著提升。"
            },
            {
              "type": "table",
              "headers": [
                "轮次",
                "操作",
                "产出",
                "收敛程度"
              ],
              "rows": [
                [
                  "第1轮",
                  "开放式问题，专家独立回答",
                  "初始分歧范围",
                  "低"
                ],
                [
                  "第2轮",
                  "汇总结果反馈，专家重新评估",
                  "共识区域显现",
                  "中"
                ],
                [
                  "第3轮",
                  "聚焦分歧点，再次反馈修正",
                  "收敛到稳定区间",
                  "高"
                ],
                [
                  "第4轮（可选）",
                  "最终确认",
                  "共识结论",
                  "极高"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_19.png",
              "caption": "图19 Delphi 德尔菲法收敛过程示意图"
            }
          ]
        },
        {
          "title": "2、Triangulation三角验证法：多源数据交叉验证",
          "items": [
            {
              "type": "p",
              "text": "三角验证法源自社会科学研究方法论，由Denzin在1970年系统化提出。该方法的核心原则是：任何单一来源的研究结论都需要经过至少两种不同来源或不同方法的交叉验证，才能被视为可靠。三角验证法包括数据三角验证（不同数据来源）、方法三角验证（不同研究方法）、研究者三角验证（不同研究者）和理论三角验证（不同理论框架）四个层次。"
            },
            {
              "type": "p",
              "text": "在技术研究报告中，三角验证法最常见的应用是：将权威机构的定性判断、市场规模的定量数据、以及专家访谈的一手信息进行交叉比对。如果三者指向一致结论，则结论的不确定性大幅降低；如果三者存在分歧，则分歧点本身就是需要进一步深挖的关键问题。"
            },
            {
              "type": "table",
              "headers": [
                "三角验证类型",
                "具体操作",
                "适用范围"
              ],
              "rows": [
                [
                  "数据三角验证",
                  "权威机构定性判断+市场数据定量分析+专家访谈",
                  "技术成熟度与市场规模"
                ],
                [
                  "方法三角验证",
                  "Hype Cycle（定性）+TRL（定量）",
                  "成熟度评估结论"
                ],
                [
                  "研究者三角验证",
                  "内部团队+外部专家评审",
                  "战略定位与建议"
                ],
                [
                  "理论三角验证",
                  "波特五力+7S+SWOT",
                  "框架一致性检验"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_20.png",
              "caption": "图20 Triangulation 三角验证示意图"
            }
          ]
        }
      ]
    },
    {
      "id": "sec8",
      "title": "八、实施建议的评估方法工具",
      "items": [],
      "subsections": [
        {
          "title": "1、Kotter变革八步法：IT转型的路径设计",
          "items": [
            {
              "type": "p",
              "text": "Kotter变革八步法由哈佛商学院John Kotter教授在1996年提出，是组织变革管理领域引用最广泛的方法论。八步包括：建立紧迫感（Create Urgency）→组建领导联盟（Build Coalition）→形成战略愿景（Form Strategic Vision）→沟通愿景（Communicate the Vision）→授权行动（Enable Action）→创造短期胜利（Generate Short-term Wins）→巩固成果（Consolidate Gains）→固化变革（Anchor Changes in Culture）。"
            },
            {
              "type": "p",
              "text": "Kotter八步法在技术研究报告中的价值在于，它提供了一条经过验证的从认知到落地的完整路径，而非孤立的实施建议点。例如，对于一项银行核心系统云化迁移的建议，Kotter八步法可以帮助研究人员自检：是否遗漏了建立紧迫感（监管压力或竞争威胁的阐释）步骤，或创造短期胜利（分阶段迁移的里程碑设计）步骤。八步法的完整性直接影响实施建议的可操作性。"
            },
            {
              "type": "table",
              "headers": [
                "步骤",
                "核心任务",
                "金融科技落地示例",
                "常见失败原因"
              ],
              "rows": [
                [
                  "1. 建立紧迫感",
                  "揭示危机或重大机遇",
                  "监管新政倒计时分析",
                  "紧迫感不足，拖延决策"
                ],
                [
                  "2. 组建领导联盟",
                  "跨部门核心团队",
                  "成立牵头的数字化委员会",
                  "缺乏高层支持"
                ],
                [
                  "3. 形成战略愿景",
                  "明确变革方向",
                  "制定三年技术路线图",
                  "愿景过于抽象"
                ],
                [
                  "4. 沟通愿景",
                  "反复、多渠道传播",
                  "全员大会+部门研讨",
                  "沟通不足"
                ],
                [
                  "5. 授权行动",
                  "消除障碍，提供资源",
                  "设立创新实验室预算",
                  "资源支持不足"
                ],
                [
                  "6. 创造短期胜利",
                  "快速展示成果",
                  "三个月内完成PoC",
                  "长期无里程碑"
                ],
                [
                  "7. 巩固成果",
                  "推广成功经验",
                  "试点转规模化部署",
                  "胜利后松懈"
                ],
                [
                  "8. 固化变革",
                  "嵌入组织文化",
                  "纳入绩效考核体系",
                  "未形成制度"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_21.png",
              "caption": "图21 Kotter 变革八步法阶梯递进示意图"
            }
          ]
        },
        {
          "title": "2、技术路线图（Roadmap）：时间维度的可视化规划",
          "items": [
            {
              "type": "p",
              "text": "技术路线图由英国剑桥大学RFC（Research Foundation for Roadmapping）系统化，是一种将技术发展路径与时间轴、业务里程碑、资源需求相结合的可视化规划工具。技术路线图通常采用三层结构：最上层是业务目标，中间层是技术里程碑，最下层是资源与能力建设。"
            },
            {
              "type": "table",
              "headers": [
                "时间轴",
                "业务目标",
                "技术里程碑",
                "资源与能力建设"
              ],
              "rows": [
                [
                  "2025年H1",
                  "完成技术调研",
                  "厂商评估、PoC方案设计",
                  "组建核心团队"
                ],
                [
                  "2025年H2",
                  "完成PoC验证",
                  "试点系统上线、指标达标",
                  "招聘技术人才"
                ],
                [
                  "2026年H1",
                  "启动规模化部署",
                  "生产环境迁移、系统切换",
                  "建设运维体系"
                ],
                [
                  "2026年H2",
                  "全面投产",
                  "业务指标达标、风险可控",
                  "建立持续优化机制"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_22.png",
              "caption": "图22 技术路线图（Roadmap）时间轴三层结构示意图"
            }
          ]
        },
        {
          "title": "3、PDCA循环：持续迭代的执行管理",
          "items": [
            {
              "type": "p",
              "text": "PDCA循环（Plan-Do-Check-Act，戴明环）由W.E. Deming在20世纪50年代提出，后经ISO 9001标准固化，成为全球最广泛使用的持续改进框架。PDCA的核心逻辑是：Plan（设定目标与方案）→Do（执行方案）→Check（验证结果）→Act（根据结果调整）。四阶段形成闭环，每一轮循环的终点是下一轮循环的起点。"
            },
            {
              "type": "p",
              "text": "在技术研究报告中，PDCA循环通常作为实施建议的节奏控制机制出现。例如，在分阶段引入AI风控模型的建议中，PDCA描述了每个阶段的具体执行节奏——季度规划、月度部署、周度监控、阶段调整——确保技术落地不是一次性工程，而是持续迭代的适应性过程。"
            },
            {
              "type": "table",
              "headers": [
                "PDCA阶段",
                "活动内容",
                "交付物",
                "时间周期"
              ],
              "rows": [
                [
                  "Plan",
                  "设定目标、制定方案",
                  "计划文档、KPI定义",
                  "月度"
                ],
                [
                  "Do",
                  "执行方案",
                  "执行记录、数据采集",
                  "周度"
                ],
                [
                  "Check",
                  "比对结果与目标",
                  "偏差分析报告",
                  "周度"
                ],
                [
                  "Act",
                  "调整方案、修正流程",
                  "优化方案、改进措施",
                  "月度"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_23.png",
              "caption": "图23 PDCA 循环（四阶段闭环）示意图"
            }
          ]
        },
        {
          "title": "4、OKR：目标对齐与执行牵引",
          "items": [
            {
              "type": "p",
              "text": "OKR（Objectives and Key Results，目标与关键结果）由Intel首席执行官Andy Grove在20世纪70年代创立，后经John Doerr引入Google并广泛传播。OKR的核心结构是：设定挑战性目标（Objective，通常为定性描述），并为每个目标设定3—5个可量化的关键结果（Key Results）。OKR通常按季度周期设定，强调目标是拉伸性的，需要努力才能达到，但并非不可能。"
            },
            {
              "type": "table",
              "headers": [
                "层级",
                "Objective",
                "Key Results",
                "评估周期"
              ],
              "rows": [
                [
                  "组织级",
                  "建立安全左移的DevSecOps文化",
                  "开发团队安全培训覆盖率100%",
                  "Q1"
                ],
                [
                  "组织级",
                  "同上",
                  "自动化安全扫描集成到CI/CD",
                  "Q2"
                ],
                [
                  "组织级",
                  "同上",
                  "生产环境漏洞发现数降低50%",
                  "Q3"
                ],
                [
                  "团队级",
                  "完成隐私计算技术选型",
                  "完成3家厂商PoC评估",
                  "Q1"
                ],
                [
                  "团队级",
                  "同上",
                  "提交技术选型决策报告",
                  "Q1"
                ]
              ]
            },
            {
              "type": "image",
              "src": "assets/methodology/figures/fig_v13_24.png",
              "caption": "图24 OKR 目标对齐层级示意图"
            }
          ]
        }
      ]
    },
    {
      "id": "sec9",
      "title": "九、方法论选择的补充说明",
      "items": [],
      "subsections": [
        {
          "title": "1、方法论选择的内在张力",
          "items": [
            {
              "type": "p",
              "text": "上述方法论工具箱的整合并非简单的按章节取用，而是存在内在的张力与取舍。第一组张力存在于定性判断与量化计算之间：Hype Cycle和SWOT本质上是定性框架，其结论依赖于研究人员的判断力和经验；而TRL、FMEA和TAM/SAM/SOM则是量化方法，其结论依赖于数据质量和假设的合理性。在研究报告的实践中，过度依赖定性判断会导致结论主观性过强，反之过度依赖量化计算则可能导致数据很漂亮、但方向错了的陷阱。有效的报告需要在这两者之间建立桥梁——定性框架提供方向和边界，量化方法提供支撑和验证。"
            },
            {
              "type": "p",
              "text": "第二组张力存在于权威性与时效性之间：Magic Quadrant和IDC MarketScape等权威方法论每年更新一次，对于快速变化的IT领域（如生成式AI），一年的更新周期意味着数据可能已经滞后。而JTBD、德尔菲法等定制化方法虽然可以针对特定技术进行即时评估，但其权威背书不如头部研究机构。研究人员需要在报告中明确标注数据的时间窗口，并说明方法论的时间局限性。"
            },
            {
              "type": "p",
              "text": "第三组张力存在于普适性框架与行业特殊性之间：波特五力分析和PESTEL是跨行业通用框架，但金融科技面临的监管合规风险（如央行数字货币政策、数据跨境传输法规）远远超过一般IT行业。在报告中，通用框架需要经过行业适配才能产生有效结论，而这种适配过程本身应该被记录和披露。"
            }
          ]
        },
        {
          "title": "2、方法论的整合思路",
          "items": [
            {
              "type": "p",
              "text": "从方法论整合的角度看，这类工具大致可以按认知建立、深入分析、方案输出三个层次组合使用：先运用Hype Cycle定位技术成熟度、PESTEL扫描宏观风险、波特五力分析行业格局、TAM/SAM/SOM估算市场边界，建立起对技术所处坐标系的整体认知；再运用FMEA评估风险优先级、Delphi收集专家共识、Triangulation交叉验证关键假设、Magic Quadrant定位厂商格局，从整体认知中筛选关键变量深入分析；最后运用SWOT汇总诊断、Real Options构建投资决策框架、Roadmap规划实施时间线、Kotter八步法设计变革路径、PDCA和OKR设定执行度量，将分析转化为可操作的行动计划。"
            },
            {
              "type": "p",
              "text": "技术研究报告的方法论工具箱并非一个封闭的、固定的清单，而是一个随技术演进和研究实践不断更新的开放性体系。"
            }
          ]
        }
      ]
    }
  ]
};

  window.DATA = {
    book: {
      title: '科技发展部前沿技术研究成果集',
      subtitle: '前沿技术研究与战略布局全景报告',
      org: '科技规划处 编制',
      date: '2026年',
      version: '202609021514'
    },
    fields: FIELDS, categories: CATEGORIES, categoryColor: CATEGORY_COLOR, tiers: TIERS, tierColor: TIER_COLOR,
    workplan: WORKPLAN, sources: SOURCES_REPORT,
    methodologyApplication: METHODOLOGY_APPLICATION,
    methodologyToolkit: METHODOLOGY_TOOLKIT,
    library: { fields: FIELDS, items: ITEMS },
    hypeCycle: HYPE_CYCLE_CONFIG,
    impactRadar: RADAR_CONFIG,
    graph: buildGraph(), graphRelations: RELATIONS, centerMappings: CENTER_MAPPINGS,
    technologies: ITEMS
  };
})();