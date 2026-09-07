/* =====================================================================
 * 银行金融科技前沿技术研究成果 —— 数据文件（金融科技版 v1.31）
 * 技术名称/分层/六维评级/研判结论等基础信息以《前沿技术储备库分层台账 v1.31》为准
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
    background: '大模型能力正从"生成内容"向"采取行动"跃迁——智能体直接调用工具、操作系统接口并改变外部状态，这决定了治理要求与生成式AI应用有本质差异，是"治理先行"作为核心建议的出发点。',
    definition: '以大模型为核心，能自主感知环境、分解目标、规划任务、调用工具并执行多步操作、在有限人工干预下闭环完成复杂任务的AI系统；区别于仅生成内容的生成式AI，强调自主决策与行动。',
    currentStatus: '· MCP协议已转Linux基金会开放治理（月下载量约9700万次），A2A协议逾150家机构生产使用\n· 国内六大行2025年科技投入超1300亿元，工行"工银智涌"落地场景超500个、邮储"邮智"、招行AI年替代人工超1556万小时\n· 金融监管总局2026年6月印发《关于银行业保险业人工智能安全开发应用的指导意见》，标志国内监管首次给出全流程规范\n· 摩根大通LLM Suite覆盖约25万员工、超450个AI用例已投产，年节约成本约20亿美元',
    trend: '· 从人问AI答的被动问答，到授权AI自主完成任务的主动执行\n· 从单一模型调用，到多智能体协同＋工具编排的复合系统\n· 从辅助人工的副驾，到承担端到端流程的AI数字员工',
    bankValue: '· 运营效率：银行50%-60%人力集中运营环节，为最大价值池；AML/KYC辅助调查工作量下降30%-50%（同业量化证据最充分场景）\n· 风控：实时反欺诈、交易监控、合规检查自动化编排\n· 客户体验：区域行"汇小二"等轻量化案例应答满意度超90%，可参照实施\n· 新业务：跨境金融、投研、财富管理AI数字员工能力储备',
    limitation: '· 安全：OWASP《Top 10 for Agentic Applications 2026》定义十类新型风险（目标劫持、级联失效等），传统安全工具难覆盖\n· 可控性：近3/4美国银行调查无法确认自身具备关停故障智能体的能力，"熔断开关"正上升为监管议题\n· 合规：欧盟AI法案将授信等高风险用途纳入分级监管，DORA自2025年起要求关键第三方依赖具备韧性\n· 国内监管框架仍在成型，细则待落地',
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
    background: '大模型能力商品化正推动应用架构经历自云原生以来最深刻的一次范式迁移，业界将"AI原生"界定为专为智能自动化从零构建的架构，区别于在遗留系统上"外挂"AI功能；本技术是自主型AI智能体等核心工作负载的架构底座，是智能体规模化的前提。',
    definition: '以AI／大模型为核心构建的应用架构范式，将模型推理、智能编排、数据反馈内生于应用，而非在传统应用上外挂AI能力。',
    currentStatus: '· 约67%组织已使用大模型驱动的生成式AI，预计2026年超80%企业将部署生成式AI应用/API；Gartner预测2026年40%企业应用将嵌入任务型智能体\n· 2025年RAG类模式占企业生成式AI相关收入份额约38.41%，"模型网格"多模型混用架构渐成2026年趋势\n· 工商银行"数智工行"落地场景超500个，招商银行AI应用场景达856个、年替代人工超1556万小时，平安银行大模型场景增至390余个（代码生成占比超30%）\n· 上海银行已发布AI原生手机银行，是国内渠道级AI原生重构先例',
    trend: '· 从传统应用＋AI插件，到AI内生的应用架构\n· 从确定性流程，到概率式智能编排\n· 从人写全部逻辑，到模型＋提示＋工具的软件新形态',
    bankValue: '· 研发效率：2025年已有45%工程师获得10%以上生产力提升，可复用于我行技术团队提效\n· 智能编排、流程自动化、个性化服务能力升级\n· 重塑客服、营销、运营等应用形态，为智能体等上层负载提供架构底座\n· 参照工行"工银智涌"、招行856个AI场景等同业实践，具备可复制的分阶段推进路径',
    limitation: '· 架构范式与工程实践尚未完全定型，重构成本与人才门槛高（提示工程、RAG工程、模型评估能力需专项培养）\n· 底层大模型厂商集中度较高、部分厂商偏闭源，需坚持模型可替换设计降低锁定风险\n· 治理层与评估体系工程成熟度仍是同业竞争的差异化壁垒\n· 输出不确定性高，模型治理难度大于传统确定性系统',
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
    background: '银行核心业务的"实时化"浪潮——实时支付、实时风控、开放银行数据共享——本质上都要求系统具备时间解耦、扇出能力与可回放性三项能力，这是EDA从边缘技术走向核心架构议题的根本原因。',
    definition: '以事件的产生、检测、消费为核心的软件架构风格，组件通过异步事件解耦，实现实时响应与松耦合。',
    currentStatus: '· Kafka、Pulsar及云厂商消息服务为主流事件代理，RocketMQ提供成熟的信创适配路径\n· 事件流架构相比传统批处理使欺诈识别准确率提升47%、误报率下降31%的行业实证已被广泛引用\n· ACI Worldwide预测到2028年全球实时支付交易将超过5750亿笔，85%全球企业、82%+银行支付领域已规模化采纳\n· 摩根大通、高盛、第一资本、荷兰国际（ING）、Rabobank等国际大行已以Kafka构建企业级事件总线；泰国大城银行采用后欺诈"识别到阻断"时延压缩至60秒以内',
    trend: '· 从批处理／同步调用，到实时事件流\n· 从紧耦合单体，到松耦合事件驱动\n· 支撑实时风控、实时营销与实时支付',
    bankValue: '· 实时风控：欺诈识别准确率提升47%、误报率下降31%（行业实证）\n· 实时客户体验：客户互动指标平均提升41%、交易放弃率下降39%\n· 架构解耦：事件总线消解点对点接口组合爆炸，为微服务与分布式核心提供集成骨架\n· AI就绪：为自主型AI智能体的环境感知与AI原生应用提供实时数据基础',
    limitation: '· 事件一致性（跨系统最终一致与幂等处理）与事件契约治理（schema演进兼容性）是固有工程难点\n· 排障复杂度高，因果链跨越多个异步环节，须依赖分布式追踪能力\n· 组织与技能门槛：对幂等、监控、消息中间件要求高，需专项治理投入',
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
    background: 'WASM于2019年成为W3C正式推荐标准，追求"容器承载重状态服务、WASM承载轻函数与插件"的分层并存格局；WASI与组件模型的成熟是其从浏览器走向服务端/边缘的产业背景。',
    definition: '一种可移植、高性能的字节码格式与运行时，使代码以接近原生速度在浏览器、服务端、边缘的安全沙箱中运行。',
    currentStatus: '· WASI 0.2版确立组件模型，2026年2月发布的0.3版引入原生异步I/O能力，标准化收官\n· 2026年年度生态调查显示67%受访者已在生产环境使用WebAssembly（2024年为47%），服务端部署占比52%首次超过浏览器端\n· 金融业公开的WASM生产案例仍少而分散，多以"基础设施组件内嵌"形式存在（API网关、SaaS租户沙箱、边缘CDN等）\n· 对本行尚无明确外部倒逼信号，战略紧迫度评定为2分，可按3-5年布局节奏推进',
    trend: '· 从浏览器内加速，到浏览器外服务端／边缘／嵌入运行时\n· WASI 0.2与组件模型使其2025年跨入生产级\n· 安全沙箱支撑多租户与边缘计算',
    bankValue: '· 边缘金融服务：网点边缘设备、智能终端承载轻量业务逻辑与AI推理，低延迟且集中管控\n· 安全插件架构：开放银行与生态合作中运行第三方/商户代码，实现"不可信代码的可信执行"\n· 多语言规则引擎：风控、计费规则任意语言编写、统一沙箱执行，缩短规则上线周期\n· 单点概念验证成本低（约1-2人月），即使结论为"暂不采用"也能以低成本消除决策不确定性',
    limitation: '· 生态与工具链尚不完善，金融级适配与运维经验少\n· 容器方案在重状态服务场景仍是主流选择，WASM定位是补充而非替代\n· 适配与改造成本较高，对本行尚无明确外部倒逼信号',
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
    background: '传统数据治理依赖人工集成与被动元数据目录，难以应对跨源异构数据的爆发式增长；数据织网以"持续采集元数据、AI分析、主动执行"的主动元数据机制，把元数据从"登记簿"变为"驱动器"，是应对这一失效的技术路径。',
    definition: '以主动元数据为核心，通过知识图谱与自动化在分布式数据源上编织统一、智能的数据访问与管理层。',
    currentStatus: '· Gartner研究显示良好实施的数据织网可将数据管理任务耗时降低最多50%（成熟实施后的上限值，非首年即得）\n· 织网—网格混合架构成为主流，金融业约八成采用混合模式\n· 国内数据要素战略要求金融机构提升数据治理能力，《数据安全法》《个人信息保护法》对跨源数据访问提出权限与合规约束\n· 市场供给分三类阵营：国际综合数据平台厂商、云厂商数据全家桶、国内专业厂商（金融行业案例增长较快）',
    trend: '· 从人工集成／搬运，到元数据驱动的自动化编织\n· 从数据孤岛，到统一数据视图\n· 支撑AI-Ready数据供给',
    bankValue: '· 数据管理耗时最多降低50%（成熟上限），首年目标建议按四至六折（20%-30%）测算\n· 需求响应周期缩短带来业务机会成本回收（客户画像/报送场景可参照72小时→15分钟量级案例）\n· 战略层价值：作为智能体与AI原生应用架构立项的前置条件，供给AI-Ready数据',
    limitation: '· 主动元数据引擎实际自动化程度差异较大，尚未形成统一能力评估标准\n· 数据虚拟化跨源访问不得绕过既有数据安全分级管控，是需要注意的合规红线\n· 平台建设投入大、价值兑现周期长',
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
    background: '由Zhamak Dehghani于2019年提出，核心是把数据责任从中央数据团队下沉到最了解数据的业务领域团队；与数据织网相比，数据网格解决"数据由谁负责、如何持续保鲜"，是组织范式路径而非技术架构路径。',
    definition: '一种去中心化的数据架构与组织范式，将数据视为产品、由业务域自治拥有，配以自助数据平台与联邦治理。',
    currentStatus: '· 2026年产业共识：数据网格理念（领域责任、数据产品化）已被主流数据战略广泛吸收，但完整四原则的教科书式实施集中于数据成熟度高的大型机构\n· 纯数据网格实施持续减少，大型企业中六至七成、金融业约八成采用"织网＋网格"混合模式\n· 失败案例共性：改名式网格（数据集市换名未变责任制）、无平台网格、治理真空、考核缺位，根因是把组织变革简化为架构调整\n· 理念扩散但尚无明确外部倒逼信号，与数据织网协同的混合模式渐成主流',
    trend: '· 从集中式数据团队，到业务域自治的数据产品\n· 从数据即副产品，到数据即产品\n· 架构与组织的双重变革',
    bankValue: '· 数据供给规模化瓶颈解法：领域自助产品化是已被验证的扩容路径\n· 数据质量责任对位：报送与风险数据口径问题从根上是责任制问题\n· 与数据织网组合期权：数据织网平台建成后，网格式运营可最大化其利用率；合理时序是数据织网先行',
    limitation: '· 不是技术产品，市场上不存在"买一套Data Mesh"，组织变革无法采购\n· 跨域组织协同、标准统一难度大，易碎片化，需专项立项治理方可能推进\n· 收益随领域数量与数据消费复杂度增长，只有大型组织才有足够回报覆盖组织变革成本',
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
    background: 'Shor算法可在容错量子计算机上多项式时间攻破RSA/ECC，"Mosca定理"（数据保密年限+迁移耗时>量子威胁出现时间）意味着银行长期数据今天已暴露在"先存后解"风险之下，这是PQC从"未来议题"变为现实迁移窗口的根本逻辑。',
    definition: '能抵抗量子计算攻击的密码算法体系，用于替换现有易受量子威胁的RSA／ECC等公钥密码。',
    currentStatus: '· NIST 2024年8月正式发布FIPS 203/204/205三项联邦标准，标准定稿成为产业化分水岭\n· G7金融业PQC路线图要求2030—2032年迁移，NSA CNSA 2.0要求2030年停用RSA/ECDH，英国NCSC要求2028年前完成TLS混合迁移\n· 2026年3月多项研究将破解RSA-2048所需量子比特数下修至百万以下，全球完成生产迁移的机构占比仅约13%\n· 国内商用密码标准仍在制定中，本行策略为"盘点先行、预研跟标、部署待令"',
    trend: '· 从经典公钥密码，到抗量子密码\n· NIST 2024.8发布FIPS 203/204/205标准\n· 先存后解威胁驱动提前迁移与密码敏捷',
    bankValue: '· 抗量子长期数据安全：保障客户数据、交易记录、核心密钥超十年保护周期不被"先存后解"提前窃取\n· 合规确定性：应对G7路线图、NSA CNSA 2.0等硬性时间表，避免延迟迁移的合规风险\n· 密码敏捷性建设溢出价值：密码资产盘点与改造同时提升密评效率、密钥治理规范化，与零信任证书体系升级共享工程',
    limitation: '· 密码敏捷改造范围广：密码能力散落在协议、证书、HSM、应用内嵌与大量供应商组件中，全行盘点改造体量大\n· 成本高：涉及HSM等硬件、软件与第三方组件的系统性升级\n· 须与国密路线协调，境内生产部署路径尚待国内标准明确，迁移周期长（约10年）\n· 引入可行度综合评定2分，触及否决线，是本条目由研究层转入观察层的核心依据',
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
    background: '传统边界防御假设"内网即可信"，但云化、远程办公与第三方接入使网络边界日益模糊，NIST SP 800-207提出"不因资产/用户处于内网就授予隐式信任、每次访问都须动态评估"的新范式，是零信任被提出的根本原因。',
    definition: '从不信任、持续验证的安全架构范式，以身份为中心、最小权限、动态访问控制取代边界信任（NIST SP 800-207）。',
    currentStatus: '· NIST NCCoE 2025年发布最终版SP 1800-35《实施零信任架构》，基于24家厂商联合建设给出19种参考实现\n· 国内GB/T 43696—2024《网络安全技术 零信任参考体系架构》已发布，信创环境建设有标可依\n· 调研显示82%组织认为零信任对安全战略至关重要，但仅17%完成全面实施\n· 零信任边界正扩展至第三方AI服务与智能体访问治理',
    trend: '· 从边界防御，到持续验证\n· 从网络位置信任，到身份与上下文信任\n· 微隔离与最小权限',
    bankValue: '· 最小权限、持续验证，降低横向移动与内部威胁风险\n· 支撑远程办公、多云与第三方接入的安全访问\n· 身份治理是零信任与智能体身份治理的共同前置工程，"新区先行"（分布式核心/云原生区按零信任设计）是务实推进路径',
    limitation: '· 老旧单体系统微隔离难、改造范围广，"全网改造"投入陷阱需以分期路线规避\n· 需成熟的身份基础设施，统一身份认证覆盖率不足、特权账号分散管理是常见第一期短板\n· 82%组织认同战略价值但仅17%完成全面实施，说明落地周期长、节奏不一',
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
    background: '量子计算利用叠加与纠缠在特定问题（优化/模拟/因数分解）上具指数级潜力；金融业调研显示约87%机构视其为机遇，但约73%尚未找到实用商用场景，反映价值兑现仍高度不确定。',
    definition: '利用量子叠加与纠缠进行计算的新范式，在特定问题（优化、模拟、因数分解）上具指数级潜力。',
    currentStatus: '· 2025年Google Willow等实现纠错突破，IBM等公布2029年前后容错路线图，行业正从科研阶段向商业化临界点靠近\n· 2026年逻辑量子比特竞赛加速（多团队实现96个/48个校验逻辑比特突破），但距密码学相关规模（数千至上百万物理量子比特）仍有巨大差距\n· 与后量子密码学联动：量子计算商业化进展本身构成PQC迁移紧迫性的外部信号\n· 头部量子计算公司已完成大规模上市融资，资本市场对赛道长期信心增强',
    trend: '· 从含噪中等规模（NISQ），到容错量子计算\n· 2025纠错突破（Google Willow指数级降错；IBM Starling 2029路线）\n· 从科研到商业拐点临近',
    bankValue: '· 复杂优化、风险建模、蒙特卡洛加速等计算密集场景的远期加速能力\n· 组合优化与投资组合管理的潜在应用\n· 前瞻算力技术储备，与后量子密码学迁移紧迫性形成外部联动信号',
    limitation: '· 硬件不成熟、商业化有限，距密码学相关规模仍有巨大差距\n· 容错量子计算预计2029年后落地，属5年以上长期赛道\n· 金融业约73%机构未找到实用商用场景，投入产出确定性低\n· 建议以季度扫描跟踪容错系统进展与用例拐点信号，暂不投入研究资源或行内落地探索',
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
    background: '我国数据中心与算力资源建设长期呈"属地化、碎片化"格局——东部电力/土地资源趋紧、西部富余电力"建得起用不上"，AI训练负载波峰波谷特征令自建算力难以跨主体调剂，容灾也因缺乏跨域迁移通路受限，这是算力网络作为国家级基础设施被提出的直接背景。',
    definition: '将广域分布的算力资源通过网络统一编排调度、按需供给的新型基础设施（算网融合）。',
    currentStatus: '· "东数西算"工程持续推进，2025年末八大枢纽算力总规模超215EFLOPS、智算占比超八成；贵州枢纽2026年算力规模超160EFLOPS，成本较东部低30%以上\n· 2026年3月"算电协同"首次写入《政府工作报告》，工信部《算力互联互通行动计划》提出2026/2028两阶段标准化互联目标\n· 金融监管总局2026年6月发布指导意见，首次在金融监管层面明确算力资源布局与共享的合规路径\n· 建设银行、农业银行、交通银行、兴业银行、招商银行等已在贵安新区/内蒙古和林格尔等国家枢纽布局数据中心，投资规模40亿—110余亿元区间；跨云跨运营商统一调度平台尚无银行公开落地案例',
    trend: '· 从孤立数据中心，到东数西算广域算力协同\n· 从静态部署，到弹性调度、算力普惠\n· 算网一体化',
    bankValue: '· 弹性调度、降本增效：西部枢纽算力成本较东部低30%以上，"选址即降碳"（如和林格尔枢纽绿电占比86%）\n· 支撑AI大模型训练/推理的算力供给，交通银行千卡异构算力集群已支撑超100个模型应用场景、AI替代人力工时超1000人月\n· 可参照同业"自建数据中心+国家枢纽选址"路径，兼顾信创/自主可控要求',
    limitation: '· 跨域调度环节暂不具备生产条件，尚无银行跨云跨运营商统一调度的公开案例\n· 调度编排与度量合规环节专业厂商少、标准尚未定型\n· 客户数据与核心生产系统受属地/分级监管约束，仅脱敏训练数据、灾备副本、非敏感离线计算可参与算力网络',
    maturityBasis: '东数西算基础设施快速落地（八枢纽215.5 EFLOPS），企业级弹性调度与运营模式仍在完善，属早期采用阶段。', strategicFitBasis: '命中技术／算力战略方向，国家"东数西算""算电协同"政策级推进，为该方向核心路径。', valueBasis: '弹性调度、降本增效、支撑AI算力供给，覆盖成本优化与AI能力两个以上维度。',
    feasibilityBasis: '跨域调度复杂、算网协同标准与运营模式仍在建、数据合规待明确，需专项投入治理。', urgencyBasis: '"算电协同"已写入2026年《政府工作报告》，同业已自建数据中心布局，属3—5年关键窗口，尚无强制个体时限。', opennessBasis: '国家枢纽与多云厂商并存，同业以自建为主，算网协同标准仍在建，中等成本替代路径。',
    source: '· 新华社／央视：东数西算落子成局（2025）\n· 华为与国家信息中心《区域算力网：高速互联篇研究报告》（2025）\n· 工信部数据：八枢纽215.5 EFLOPS、智算占比80.8%（2025 Q1）\n采集时间：2026-07-06。\n·【2026-07-14复核增补】《政府工作报告》算电协同表述及IDC解读（2026.03）\n【2026-08-17深化增补】国家数据局2026年工作部署（2026-01）；"东数西算"四年八大枢纽量化数据（2026-02，215.5EFLOPS/智算占比80.8%/市场规模8351亿元）；工业和信息化部《算力互联互通行动计划》（2025-05印发，2026/2028两阶段目标）；国家发展改革委算力调度问题专家访谈（2026-03）；金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》算力相关条款（2026-06-18）；贵州算力产业发展公开报道（2026-04，Token调用量/成本优势数据）；三大电信运营商2026年算力投资数据（2026-03）；建设银行贵安数据中心、农业银行内蒙古数据中心、交通银行贵安数据中心公开建设信息（2023-2025年）。采集时间：2026-08-17。', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: '',
    summary: '将广域分布的算力资源通过网络统一编排调度、按需供给的新型基础设施（算网融合）。',
    folder: 'assets/technologies/T010_算力网络',
    reportDocx: 'assets/technologies/T010_算力网络/T010_算力网络_专题研究报告.docx', reportDocxName: 'T010_算力网络_专题研究报告.docx', reportDocxSize: '506.0 KB', reportDocxDate: '2026-09-04', reportPdf: 'assets/technologies/T010_算力网络/T010_算力网络_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T010_算力网络/T010_算力网络_演示汇报.pptx', slidesPptxName: 'T010_算力网络_演示汇报.pptx', slidesPptxSize: '5.8 KB', slidesPptxDate: '2026-09-04', slidesPdf: 'assets/technologies/T010_算力网络/T010_算力网络_演示汇报.pdf',
    image: 'assets/technologies/T010_算力网络/T010_算力网络_一张图.svg', imageName: 'T010_算力网络_一张图.svg', imageSize: '4.3 KB',
    center: '技术服务中心', centerReason: '定位为弹性调度、算力普惠的算力基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T11', no: 11, name: '平台工程／IDP（Platform Engineering / IDP）', short: '平台工程', nameEn: 'Platform Engineering / IDP',
    category: '技术', categoryKey: '基础设施', archDim: '技术', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '技术成熟度4分（Gartner预测2026年80%大型组织设平台团队）、战略匹配度4分、价值贡献度4分均衡达标，宜结合我行研发体系系统论证：明确IDP建设范围、黄金路径与平台团队组建，评估投入产出与现有DevOps工具链的整合，避免重复造轮。',
    background: '数百个应用团队各自掌握全部基础设施技能会造成巨大认知负担与重复建设，平台工程是DevOps的规模化解法——把共性能力产品化，让应用团队"自助消费"而非"自行搭建"。',
    definition: '以内部开发者平台（IDP）为载体，将基础设施、流水线、环境等自助化封装为黄金路径，提升研发效能。',
    currentStatus: '· CNCF Backstage是开发者门户开源事实标准，Cortex/Port等商业产品并存，全球数千家组织采用\n· DORA 2025年度报告：平台成熟度高的组织部署频率高3.5倍、交付前置时间短4倍，团队倦怠率显著更低\n· 采用GitOps驱动平台方法的精英团队部署错误减少70%—80%\n· 2026年73%的平台团队已内置AI辅助能力；国内头部银行虽少以"平台工程"命名，但研发效能平台/DevOps平台/云原生底座建设实质覆盖同类能力',
    trend: '· 从DevOps人力协作，到平台化自助\n· 从零散工具，到统一IDP与黄金路径\n· 平台即产品',
    bankValue: '· 提升交付效率：DORA数据显示平台化组织部署频率提升3.5倍、前置时间缩短4倍\n· 支撑AI工程化落地，降低认知负荷与重复劳动\n· 治理层可将监管合规要求（变更管理、职责分离、审计留痕）编码进"黄金路径"，是银行场景的差异化重点',
    limitation: '· 初期投入大、平台团队能力要求高，需从研发/运维/架构多方抽调组建，非运维部门简单改名\n· 需组织与文化配合，"平台建成无人用"是常见失败模式，黄金路径覆盖率（采纳率）比建设进度更关键\n· 避免沦为又一层工具',
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
    background: '分布式与事件驱动架构普及后，一次业务请求可能跨越数十个独立部署组件，故障因果链被拉长拆散；不同厂商探针/数据格式互不兼容又造成事实上的厂商锁定，OpenTelemetry正是为解决这两个问题而生。',
    definition: '一套开源、厂商中立的可观测性数据（指标／日志／链路）采集标准与工具集，统一遥测数据规范。',
    currentStatus: '· 2026年5月OpenTelemetry晋级CNCF毕业项目，成为事实标准，正向Profiling、eBPF扩展\n· 国际银行OTel采用已进入主流化阶段，新建系统普遍强制OTel埋点标准\n· 国内头部银行可观测性平台仍多以商业产品或自研为主，但新一代平台已普遍兼容OTLP协议，标准收敛正在发生\n· 经检索尚未找到可实名引用、附量化效果的国内银行OTel落地案例',
    trend: '· 从厂商锁定的分散监控，到统一、中立的可观测性标准\n· 2026.5晋级CNCF毕业项目，成事实标准\n· 向Profiling、eBPF扩展',
    bankValue: '· 全链路可观测、快速定位、智能运维，避免厂商锁定（"采集侧标准化、后端侧自由化"机制）\n· 支撑SRE与AIOps，新建系统可强制OTel埋点、Collector统一管道脱敏与路由集中管控\n· 存量系统可渐进改造，优先高价值链路',
    limitation: '· 遥测数据量大、存储与分析成本高，存量系统埋点改造工作量大\n· 语义约定与Collector管道设计能力行内储备有限，人才门槛是短板\n· 国内银行同类实名落地案例暂缺，同业经验可参照性有限',
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
    background: '隐私计算并非单一技术，而是按信任假设与开销不同的一组路线（MPC/FHE的密码学路线、联邦学习的分布式机器学习路线、TEE的硬件路线），共同解决"数据可用不可见"这一跨机构数据协作的核心矛盾。',
    definition: '一组"数据可用不可见"技术，含联邦学习、多方安全计算、差分隐私与全同态加密，使多方在不暴露原始数据前提下联合计算与建模。',
    currentStatus: '· 国家"数据要素×"三年行动计划（2024—2026）进入收官之年，隐私计算、联邦学习列为重点支撑技术\n· "数据二十条"确立数据产权、流通交易制度框架后，各地数据交易所普遍将隐私计算列为数据交付的技术底座\n· 招商银行组建隐私计算专班并推进"慧智"平台互联项目，在信贷风控与获客场景验证联邦学习模型增益；某商业银行2024年末投产智能风控系统将差分隐私与联邦学习结合\n· 各厂商平台协议不互通造成"隐私计算孤岛"，跨平台互联互通是行业攻关重点',
    trend: '· 从数据集中汇聚才能用，到数据不动价值动的联合计算\n· 从事后合规审查，到密态运算内生保护',
    bankValue: '· 数据要素×金融：跨机构联合风控、联合营销、供应链金融"数据不出域"合规流通，是唯一同时满足"可用"与"合规"的路径\n· 支撑数据资产入表与对外数据合作，降低数据泄露与合规风险\n· AI数据供给：同业黑名单共享、多头借贷识别等大模型/联合风控需求只能经由合规通道满足',
    limitation: '· 性能开销大：MPC通信轮次与FHE计算放大使复杂模型训练开销达明文数十倍以上，工程可行域集中在联合统计、评分卡类中小模型\n· 异构互联：各厂商平台协议不互通造成"隐私计算孤岛"，跨平台互联互通尚待突破\n· 安全与效用平衡：差分隐私噪声注入强度与模型精度存在此消彼长关系',
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
    background: '静态数据加密与传输中加密技术已相对成熟，但数据在计算过程中此前一直是明文暴露状态，机密计算通过硬件级可信执行环境（TEE）与远程证明补齐"数据全生命周期保护"的最后一环。',
    definition: '基于硬件可信执行环境（TEE，如Intel TDX/SGX、ARM CCA）在使用中加密数据与代码，构建可远程证明的隔离计算飞地。',
    currentStatus: '· 市场规模2025至2026年由约93亿美元增至约152亿美元\n· 私有大模型推理需求上升，机密计算作为"密态AI推理"硬件底座获得新关注\n· 银行级应用信号尚不密集，公开披露的金融业规模化落地案例仍属少数\n· 深度依赖Intel TDX/SGX、ARM CCA等少数芯片厂商方案，国产化TEE成熟度与供应链存在约束',
    trend: '· 从静态/传输中加密，到使用中（in-use）加密的全生命周期保护\n· 从信任云平台，到硬件根信任、去信任化运算',
    bankValue: '· 敏感工作负载上云、多方数据协作、私有大模型推理的数据主权保护\n· 与隐私增强计算互补：机密计算以硬件隔离方法、隐私计算以软件密码学方法分别实现"数据可用不可见"，性能开销相对更低但依赖芯片厂商信任链\n· 为密态AI推理提供硬件底座，可结合具体场景与隐私计算互补选型',
    limitation: '· 依赖芯片厂商信任链与远程证明，标准化程度低、接口相对私有\n· 国产化TEE成熟度与供应链约束是重要短板\n· 银行级应用信号尚不密集，宜跟踪国产化TEE成熟度变化作为转入系统论证的触发信号',
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
    background: '以分布式账本将存款、债券、基金及现实世界资产代币化，以合规稳定币/代币化存款承载链上支付结算；须与法定数字货币——数字人民币（国家信用背书、纳入央行监管）明确区分，后者是理解本技术境内政策边界的关键前提。',
    definition: '以分布式账本将存款、债券、基金及现实世界资产（RWA）代币化，并以合规稳定币/代币化存款承载链上支付结算。',
    currentStatus: '· 美国GENIUS Act于2025年7月18日生效，确立联邦层面支付稳定币监管框架，OCC与FDIC已发布拟议实施细则\n· 香港金管局已向汇丰、渣打牵头机构发出首批稳定币牌照\n· 境内监管在2026年出现更明确收紧信号：八部门联合声明重申对加密货币活动全面禁止，明确禁止未经批准的人民币挂钩稳定币发行\n· 稳定币交易量已超越Visa、同业加速布局，境内RWA差异化监管路径初现',
    trend: '· 从账户记账与T+N清算，到链上原子结算、可编程货币\n· 从封闭金融基础设施，到TradFi与链上金融融合',
    bankValue: '· 跨境支付、代币化存款、债券/基金代币化与RWA新业务，7×24原子结算、降本提效\n· 前瞻布局数字金融基础设施，跟踪境外（美国/香港）监管框架落地节奏\n· 建议以季度扫描跟踪香港稳定币发牌进展、美国OCC/FDIC最终规则、境内监管口径变化，暂不投入研究资源或行内落地探索',
    limitation: '· 我行语境合规变量大，须与数字人民币及监管协调，境内展业空间目前不存在\n· AML与储备赎回机制未定型，触发引入可行度否决线（1分）\n· 境内外监管显著分化，跨境监管分歧突出',
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
    background: '向量数据库以近似最近邻检索实现"按含义找数据"，RAG在此基础上让大模型输出可溯源、可更新、可控制——这是银行等强合规行业采纳生成式AI的"信心层"；GraphRAG进一步将检索与知识图谱结合，提升多跳与口径敏感问题的准确性。',
    definition: '以向量数据库存储语义嵌入，结合知识图谱做混合检索，为大模型提供可溯源的外部知识，降低幻觉。',
    currentStatus: '· 2026年业界确认RAG与GraphRAG持续巩固为企业AI准确性的标准方法，"长上下文让RAG过时"论调被理性证伪——成本、权限、可溯源三项企业级价值不可替代\n· 专用向量数据库（Pinecone/Milvus/Weaviate/Qdrant）、传统数据库向量扩展（pgvector等）、云厂商内置三条路线并存，通用数据库向量能力日趋成熟\n· RAG已是国内外银行大模型应用的标准架构，区域性机构跨境金融智能体采用"大模型+RAG"轻量架构，38万次应答满意度超90%\n· 多数机构已将结构化检索管线视为控制幻觉与合规风险的必需组件',
    trend: '· 从纯参数记忆的黑箱问答，到检索增强、事实可溯源\n· 从纯向量相似检索，到向量+图谱混合、GraphRAG多跳推理',
    bankValue: '· 智能客服、合规问答、投研与知识管理的事实底座，显著降幻觉、可引用\n· 是自主型AI智能体、AI原生应用架构落地的必备组件\n· 知识运营（覆盖、更新、口径审核）投入通常超过技术平台投入，评估先行、场景分级（内部员工助手先行）是同业验证的落地路径',
    limitation: '· 知识治理与权限隔离：检索须继承源文档权限，涉敏知识库向量数据应按敏感数据管理（嵌入向量可被逆向恢复部分原文）\n· 检索质量与更新时效需持续评估体系支撑（召回率、答案忠实度、引用准确率）\n· GraphRAG构建成本较高，企业级安全访问控制要求高',
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
    background: '智能体规模化落地催生"智能体如何安全使用企业能力"（工具连接层，MCP）与"智能体间如何协作"（协作层，A2A/ACP）两类标准化需求，中立基金会治理消除了"单厂商协议"锁定顾虑，是企业采纳的关键信号。',
    definition: '智能体与工具、智能体与智能体间的标准通信协议：MCP（agent-tool）、A2A（agent-agent）、ACP等，构建可互操作的智能体生态。',
    currentStatus: '· MCP由Linux基金会Agentic AI基金会治理，社区索引服务器超1.8万个，月下载量约9700万次；A2A由Google捐赠Linux基金会，逾150家机构生产使用\n· 2026年一季度A2A v1.0稳定版发布、MCP v2.0增加可流式HTTP传输与OAuth 2.1认证；二季度互操作规范草案发布\n· 2026年超100家企业采用MCP/A2A双协议，基金会创始成员含AWS、思科、Google、微软、Salesforce、SAP、ServiceNow等\n· 国内头部银行智能体平台以自有编排为主，MCP兼容开始出现在新一代平台的技术要求中',
    trend: '· 从各家私有插件与孤岛集成，到跨厂商标准化互操作\n· 从单体智能体，到多智能体协作编排',
    bankValue: '· 为自主型AI智能体落地提供标准化工具接入与多体协作底座，降低集成与锁定成本\n· 统一行内智能体治理与审计接口，协议采纳是"搭便车"型决策——跟随平台原生支持即可获得\n· 本行主动动作应聚焦网关治理（工具注册、认证、权限与审计）而非协议本身',
    limitation: '· 标准仍在快速演进与收敛（协议路线图优先事项聚焦审计轨迹、SSO集成与网关模式）\n· 安全与权限模型待成熟：智能体供应链风险（恶意MCP服务器/被投毒工具描述）须与人工智能安全平台护栏同步\n· 网关治理能力储备是本行推进的短板环节',
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
    background: '生成式AI与智能体规模化落地后，提示注入、模型行为漂移、语义层动作风险，是传统应用安全（WAF/DLP/IAM）与传统模型风险管理体系四类结构性缺陷共同暴露出的能力盲区而非"量变"问题，AISP/AI TRiSM由此作为独立技术品类快速产业化。',
    definition: '覆盖AI可信、风险与安全管理的框架与工程能力：提示注入防护、数据与输出护栏、模型评估、运行时异常检测与AI治理平台；思想源头为Gartner AI TRiSM框架，核心主张是把AI安全从"上线后补救"前移为"开发即内嵌、运行时强制"。',
    currentStatus: '· 新加坡银行公会联合星展、华侨、大华等10家银行及新加坡金管局2025年5月发布《生成式AI护栏手册》，覆盖30+真实场景、14类风险与9类护栏\n· DBS银行已部署超1500个AI模型、覆盖370个业务场景，AI项目周期从15个月压缩至不足3个月\n· 2026年中国银行业53.5%已落地大模型应用（2025年为39.0%），32.3%正采用智能体应用，超九成银行进入采用或规划阶段\n· 2024年8月—2025年9月主流网络安全厂商密集并购AI安全初创企业，行业处并购整合期；全球AI TRiSM市场规模2025年29.1亿美元→2026年预计35.4亿美元',
    trend: '· 从模型能力优先，到治理护栏与安全内生并重\n· 从人工抽检，到运行时持续监控与强制执行',
    bankValue: '· 是自主型AI智能体、AI原生应用架构、AI智能体互操作协议等技术规模化落地的前置护栏，防提示注入、数据泄露、幻觉与越权\n· 满足监管对AI可解释、可审计、可控的要求\n· 新加坡银行公会护栏手册"风险分级方法"（高风险场景复杂护栏组合、低风险轻量级控制）可直接参照设计本行护栏分级标准',
    limitation: '· 多智能体与自治场景治理工具尚不成熟，标准与评测基准仍在演进\n· 影子AI为当前主要风险源：78%职场AI用户使用未经批准的AI工具，仅34%组织建立正式检测项目\n· 行业处并购整合期、厂商格局未定，选型宜优先评估"能力"而非"独立品牌"',
    maturityBasis: 'TRiSM框架清晰、护栏工具成形，Gartner已发布市场指南，2024—2025年五起标志性并购显示品类快速走向成熟整合。', strategicFitBasis: '命中人工智能／安全双战略方向，为001/002/017规模化落地的前置刚需。', valueBasis: '影子AI治理价值可量化，DBS案例显示统一护栏可将AI上线周期压缩超80%，覆盖安全与效率多个维度。',
    feasibilityBasis: '厂商整合期选型需组件化，多智能体治理工具尚不成熟，需专项投入治理。', urgencyBasis: '金融监管总局2026年6月18日已发布AI安全开发应用指导意见，AI安全平台由前瞻布局转为合规刚需，0—2年内需启动。', opennessBasis: '市场处并购整合期、厂商格局未定，主流开放标准与专有方案并存。',
    source: '· Gartner《Govern AI Using TRiSM》（2026）及 AI 安全平台市场研究；IBM《What Is AI TRiSM》；Arthur《Best AI Governance Platforms 2026》\n· OWASP《Top 10 for Agentic Applications 2026》；NIST AI RMF\n采集时间：2026-07-07（复核更新）。\n·【2026-07-14复核增补】金融监管总局《关于银行业保险业人工智能安全开发应用的指导意见》（2026.06.18）\n·【2026-08-17深化增补】HiddenLayer/Palo Alto Networks/Cisco/Check Point/F5/SentinelOne官方并购公告；Fortune Business Insights《AI TRiSM Market Size 2026-2034》；Airia《Shadow AI Statistics 2026》；OWASP genai.owasp.org《Top 10 for Agentic Applications 2026》；全国网络安全标准化技术委员会TC260-003《生成式人工智能服务安全基本要求》；新加坡银行公会(ABS)/MAS《Handbook on Generative AI Guardrails in Banking》(2025-05)；DBS Bank《Responsible AI in Banking》；中国银行业大模型应用跟踪报告(2026)。采集时间：2026-08-17。', attention: '高', status: '在库—已深化研究', updateDate: '2026-08-17',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '覆盖AI可信、风险与安全管理的框架与工程能力：提示注入防护、数据与输出护栏、模型评估、运行时异常检测与AI治理平台；思想源头为Gartner AI TRiSM框架，核心主张是把AI安全从"上线后补救"前移为"开发即内嵌、运行时强制"。',
    folder: 'assets/technologies/T018_人工智能安全平台',
    reportDocx: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_专题研究报告.docx', reportDocxName: 'T018_人工智能安全平台_专题研究报告.docx', reportDocxSize: '405.3 KB', reportDocxDate: '2026-09-04', reportPdf: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_演示汇报.pptx', slidesPptxName: 'T018_人工智能安全平台_演示汇报.pptx', slidesPptxSize: '5.8 KB', slidesPptxDate: '2026-09-04', slidesPdf: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_演示汇报.pdf',
    image: 'assets/technologies/T018_人工智能安全平台/T018_人工智能安全平台_一张图.svg', imageName: 'T018_人工智能安全平台_一张图.svg', imageSize: '4.3 KB',
    center: '技术服务中心', centerReason: '是自主型AI智能体、AI原生应用、智能体互操作协议等落地的前置护栏，与后量子密码学、零信任架构、机密计算同属安全工程基础设施', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:5, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:4, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T19', no: 19, name: '小语言模型与端侧AI（SLM·On-device／Edge AI）', short: '小语言模型与端侧AI', nameEn: 'SLM·On-device／Edge AI',
    category: '人工智能', categoryKey: '人工智能', archDim: '应用·技术', attr: '新兴',
    tier: '研究层', disposal: '深入研究',
    maturity: 4, strategicFit: 4, value: 3, feasibility: 4, urgency: 3, openness: 4,
    conclusion: '技术成熟度4分（2026年出现小模型领域任务超越大模型案例）、战略匹配度4分，价值贡献度3分（单一维度价值为主），与WebAssembly（004）边缘计算联动，宜深入研究：在客服质检/网点/移动端高频窄场景评估SLM微调蒸馏与端侧部署的成本—效果，形成大小模型协同的推理策略。',
    background: '通用大模型在长尾、高频、结构化任务上存在能力过剩与成本浪费，而端侧硬件算力持续提升为本地部署小模型创造了物理条件，这是小模型路线兴起的产业背景。',
    definition: '参数量较小、面向特定任务、可在端侧/本地部署的语言模型，兼顾成本、时延与数据不出域。',
    currentStatus: '· 2026年AI PC出货量预计达1.431亿台，年底"多个小模型本地运行"预计成为常态化配置\n· 2.6B参数规模小模型在特定领域任务评测上超越百亿参数级通用大模型，证明"任务专用小而美"路线工程可行性已成熟\n· Llama、Qwen等系列已发布端侧优化小参数版本，配合GGUF格式、4-bit/8-bit量化可在消费级硬件实现可用推理速度\n· Gartner预测2027年任务专用小模型使用量为通用大模型三倍',
    trend: '· 从"越大越好"的通用大模型，到小而专、任务定制\n· 从云端集中推理，到端侧/本地私有推理',
    bankValue: '· 高频重复任务降本：境外同业成本节省幅度普遍在数倍至数十倍区间\n· 低时延、敏感数据本地处理，与WebAssembly边缘计算运行时天然协同（"边缘容器+小模型推理"一体化方案）\n· 宜优先选点高频、窄任务场景启动小规模试点，以实测数据检验蒸馏微调后的准确率与成本收益',
    limitation: '· 通用推理与长上下文能力弱于大模型，能力边界有限\n· 需微调与蒸馏工程投入，端侧算力管理、模型版本运维需专项能力\n· 通用大模型直接调用在任务复杂度较高场景仍是可行替代方案',
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
    background: '反欺诈/风控等场景对多样化训练样本需求持续增长，但真实客户数据的获取与共享受隐私保护要求日益严格限制，合成数据提供了兼顾数据可用性与隐私安全的中间路径。',
    definition: '用生成模型产出统计特征相近但不含真实个体的仿真数据，用于模型训练、测试与数据共享。',
    currentStatus: '· "合成数据非天然隐私"认知已趋清晰，"合成数据+差分隐私"组合正成为行业公认黄金标准\n· SDV等开源合成数据工具提供标准化生成与评估流程，国际金融机构已用于反欺诈样本增强与测试数据场景\n· 国内金融科技领域关注度随生成式AI普及快速上升，但规模化生产应用案例仍相对有限，处于概念验证向小范围试点过渡阶段\n· 与隐私增强计算互补：合成数据用于模型训练测试阶段，隐私增强计算用于生产环境多方协作计算阶段',
    trend: '· 从依赖真实敏感数据，到合成数据+差分隐私训练\n· 从数据孤岛，到共享"犯罪模式"而非客户明细',
    bankValue: '· 反欺诈/风控样本增强与类别均衡，覆盖长尾场景\n· 隐私安全的测试与共享，缓解数据获取瓶颈\n· 与隐私增强计算共同覆盖数据全生命周期隐私保护需求',
    limitation: '· 合成数据非天然隐私，模型可能"记忆"并泄露原始数据统计特征甚至个体信息\n· 质量与偏差控制需专项投入，监管认可度待明确\n· 国内规模化生产应用案例有限，多处于概念验证阶段',
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
    background: '传统机器学习拟合的是统计相关关系，遇到分布漂移或对抗性输入时容易失效且难以解释"为什么"；监管对信贷拒绝、额度调整等决策的可解释性要求持续提升，是因果AI获得风控合规场景关注的产业背景。',
    definition: '融合因果推断与机器学习，估计变量间因果效应而非仅相关性，提供可解释、稳健的决策依据。',
    currentStatus: '· 双重机器学习、因果森林等核心算法在学术界已相对成熟，DoWhy、EconML等主流工具多为开源\n· 境外金融机构已用于反洗钱与信用风险场景，追踪客户关系网络因果因素降低欺诈检测误报率\n· 国内银行业规模化落地先例仍属少数，多处于概念验证阶段\n· "治理化规模决策"成为2026年银行运营关键词，监管对可解释AI要求持续提升',
    trend: '· 从相关性预测黑箱，到因果机制可解释\n· 从数据驱动关联，到干预与反事实推理',
    bankValue: '· 信贷风控、反欺诈、定价与营销的可解释建模与稳健决策，满足监管"理由码"要求\n· 与神经符号AI互补：因果AI回答"是什么导致了结果"，神经符号AI回答"如何按规则推理"，信贷审批场景可形成互补管线\n· 缓解模型漂移与偏差',
    limitation: '· 因果发现（无先验因果图时自动学习因果结构）高度依赖领域知识与假设设定，误设定风险较高\n· 需要有经验的建模团队把关，人才稀缺\n· 数据质量要求高，国内规模化落地先例少，可参照经验有限',
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
    background: '开源恶意包投毒攻击自2017年起逐年攀升，行业正从"可见性时代"进入"治理时代"——SBOM解决"成分透明"，来源证明（SLSA）解决"清单可信"，安全开发框架把能力嵌入开发生命周期，三者共同应对开源组件风险从静态可见走向治理化持续管控。',
    definition: '以软件物料清单（SBOM）、来源证明与安全开发框架管理开源与第三方组件风险，覆盖构建到部署全链路。',
    currentStatus: '· 欧盟CRA要求2026年6月11日合格评定生效、9月11日起须报告漏洞与事件，SBOM成为强制要求\n· DORA已生效，要求金融机构对ICT第三方实施全面风险管理、事件报告与供应商治理\n· 国际大行已将SBOM消费纳入采购与投产流程；国内头部银行DevSecOps建设中普遍内置开源组件扫描与准入，但对外购商业软件SBOM索取与消费仍属少数\n· 最常被下载的漏洞组件多数存在可用安全版本，问题主要在缺乏发现与强制升级机制而非无补丁',
    trend: '· 从可见性（静态SBOM），到治理化、智能体化的持续管控\n· 从事后漏洞响应，到secure-by-design与来源证明',
    bankValue: '· 满足DORA等监管对ICT第三方与软件供应链风险管理要求，降低开源组件与投毒风险\n· "重大漏洞演练"（以历史重大漏洞为脚本实测定位受影响系统耗时）是可直接复用的能力度量最佳实践\n· 与零信任架构联动，共享安全左移治理路径',
    limitation: '· SBOM覆盖与自动化程度不一，"生成易、消费难"是行业普遍痛点\n· 运行时关联薄弱：SBOM库与生产资产映射不全，新漏洞爆发时仍需人工确认影响面\n· 跨供应商协同、工具链整合与运维投入较大',
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
    background: '传统身份核验依赖"证件比对+自拍+活体动作"的分步流程，其检测判据对"呈现攻击"仍有效但对绕过物理摄像头的"注入攻击"完全失效；2024年针对人脸活体的注入攻击尝试激增783%，是深伪检测与反AI欺诈从单点工具走向体系化布防的根本原因。',
    definition: '检测AI生成的人脸/声音/证件与合成身份的技术，强化活体检测、多模态一致性与欺诈研判。',
    currentStatus: '· Jumio披露注入攻击尝试2025年同比再增88%；2024年香港Arup公司高管在深伪视频会议中被骗转账2500万美元\n· Gartner 2026年发布《身份核验魔力象限》更新版，领导者象限为Sumsub、Socure、Entrust IDV、Jumio、Incode Technologies\n· 新加坡银行业协会七行（DBS/OCBC/UOB等）执行"限制令"机制，2024年第四季度单季防止5390万新元欺诈损失\n· 检测算法基准精度与实战精度普遍存在15—30个百分点落差（精选数据集95%—99%，社交媒体压缩视频降至70%—85%，跨生成器泛化仅60%—80%），选型验收须以自有样本重新测试',
    trend: '· 从文档+自拍+活体分步核验，到多模态协同、对抗性检测\n· 从静态规则，到可快速再训练的检测模型',
    bankValue: '· 保护远程开户、人脸支付、代客交易与KYC，直接对冲深伪与合成身份欺诈激增\n· 与零信任架构、人工智能安全平台并线：AISP侧重本行AI系统不被滥用，本技术侧重防御外部深伪攻击\n· 语音深伪检测已具备产品化能力（如集成至协作/客服软件），本行客服与代客交易场景可复用已验证的技术路径',
    limitation: '· 攻防持续升级，检测需高频再训练；基准精度与实战精度落差达15—30个百分点，不可直接采信厂商演示指标\n· 跨渠道集成与误拒率平衡需专项投入，合成身份平均约18个月才被识破，是四类威胁中损失最大的类型\n· 境内银行同类实名落地案例暂缺，本轮未检索到可披露的实名深伪检测专项案例',
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
    background: '传统身份核验依赖提交完整证件影印件、验证方回源查询，去中心化身份以DID+VC让用户在本地钱包"选择性披露"最小属性集合，验证方通过密码学方式核验而无需回源，是应对隐私与效率双重诉求的架构路径。',
    definition: '以去中心化标识（DID）与可验证凭证（VC）让用户在本地钱包自主持有并选择性披露身份属性。',
    currentStatus: '· 欧盟eIDAS 2.0已进入部署实施阶段，各成员国须2026年底前提供数字身份钱包，银行等私营方须最迟2027年11月/12月起接受该钱包\n· W3C可验证凭证规范、ISO 18013-5移动驾照标准、欧盟ARF架构共同构成境外技术标准底座\n· 境内"网号网证"体系已正式施行，但尚未明确覆盖银行开户或账户注册的强制时间表\n· 国内银行业目前尚无公开披露的规模化实施案例，多处于标准跟踪阶段',
    trend: '· 从中心化账户与集中身份库，到用户自持、最小化披露\n· 从重复KYC，到跨机构可复用可验证凭证',
    bankValue: '· 简化KYC/复用、增强隐私与合规、跨机构凭证互认，改善开户与授权体验\n· 与深度伪造检测、隐私增强计算协同，构成身份安全完整技术闭环\n· 境外银行分阶段实施路径（开户架构评估→映射欧盟架构→选定钱包提供商→观察政府侧试点→集成改造）可作参照',
    limitation: '· 标准与生态（W3C VC、ISO 18013-5、eIDAS ARF）境外相对定型，境内标准与监管路径仍在成型\n· 国内落地路径与监管框架待明确，尚无覆盖银行开户场景的强制时间表\n· 互认与撤销机制待建，双轨路径（境内外标准）协调成本高',
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
    background: 'QKD基于量子物理原理（量子不可克隆定理、测量塌缩）分发密钥，任何窃听都会扰动量子态并被检测到，提供理论上信息论安全的密钥分发能力；但需专用光纤或卫星中继，距离与组网能力受限。',
    definition: '基于量子物理原理分发密钥（QKD），提供对窃听敏感、理论上信息论安全的通信保护。',
    currentStatus: '· 全球首条量子通信干线（北京—济南—合肥—上海）已建成，通过天地一体化连接量子科学实验卫星，国家量子保密通信骨干网已覆盖多个重点区域\n· QKD市场2025至2030年预计由约6亿美元增长至26亿美元，年复合增长率约34%\n· 各国监管一致将后量子密码学列为优先路线，QKD因专用硬件与点对点链路限制难以互联网规模部署的判断在2026年获得重申\n· 境内中资银行尚无具名QKD应用案例披露',
    trend: '· 从计算复杂度安全，到物理原理保障的密钥分发\n· 从纯QKD，到QKD与后量子加密（PQC）混合组网',
    bankValue: '· 关键链路（数据备份、同城/异地灾备、行际通信）的长周期抗窃听保护\n· 与后量子密码学路线互补：PQC是算法层软件方案、成本低易规模化；QKD是物理层方案、安全性更强但需专用硬件\n· 本行抗量子安全防御主线应以后量子密码学为主，QKD仅作为极少数最高安全等级场景的长期跟踪对象',
    limitation: '· 成本高、需专用光纤/中继，距离与组网受限\n· 各国监管优先方向为后量子密码学而非QKD，替代品（PQC）性价比更优\n· 标准与可运营性不足，境内以国家级骨干网建设为主导，市场化竞争程度低',
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
    background: '神经形态计算模仿生物神经系统结构（脉冲神经网络、存算一体）、光子计算以光子替代电子作为信息载体，两者均追求突破传统冯·诺依曼架构的功耗/时延瓶颈，产业驱动主要来自境外厂商的持续研发投入。',
    definition: '类脑脉冲神经与硅光/光电器件的新型计算范式，追求超低功耗、超低时延的AI加速。',
    currentStatus: '· 部分厂商已发布新一代神经形态处理器，神经元容量与性能较此前系统大幅提升；已有实际商业出货（如应用于汽车安全系统），在极窄的边缘推理场景具备初步商用化能力\n· 光子计算领域已有厂商完成合并上市，成为首家上市光子量子计算公司\n· 另有厂商基于200毫米晶圆推进百万量子比特级设计\n· 本轮联网核实未检索到金融/银行行业直接采用神经形态或光子计算芯片的公开案例',
    trend: '· 从冯·诺依曼架构与电子算力，到类脑存算一体与光计算\n· 从瓦级功耗，到微瓦级、亚纳秒时延推理',
    bankValue: '· 远期为边缘风控、实时推理提供超低功耗算力选项，缓解AI能耗与散热压力\n· 前瞻算力技术储备\n· 与算力网络定位不同：算力网络优化当前主流架构下的调度互联，本技术代表对下一代计算范式的远期储备',
    limitation: '· 仍处实验室/早期样机、编程模型与工具链不成熟、生态缺失\n· 通用可用性远未成熟，仅在极窄边缘感知场景（如汽车安全）有初步商用出货\n· 距银行可用尚远，人才与供应链极度稀缺',
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
    background: '欧盟《人工智能法案》剩余条款于2026年8月全面适用，赋予个人对"产生不利影响的AI决策"要求解释的权利，可解释性要求日益刚性化，推动神经符号AI（神经网络模式识别与符号逻辑推理约束相结合的混合架构）获得更多产业关注。',
    definition: '融合神经网络与符号逻辑推理，兼顾模式识别与可解释、可审计的结构化推理。',
    currentStatus: '· 多家企业已推出面向企业级智能体自动化的神经符号架构产品，将符号层用于强制执行可审计业务规则\n· 金融、医疗、制造业量化基准测试显示该类架构具备可衡量的推理准确率与效率提升，但证据主要来自单一研究团队评测，缺乏行业级交叉验证\n· 国内金融大模型与知识图谱融合已被列为行业关注方向，但真正意义上的神经符号架构应用尚属早期\n· 尚未见银行级成熟案例拐点',
    trend: '· 从纯神经黑箱，到神经+符号可解释推理\n· 从概率生成，到带前/后置条件、可审计的确定性执行',
    bankValue: '· 高合规、可审计场景（授信、合规、风控）的可解释推理与规则约束\n· 与因果AI互补：因果AI回答"是什么导致结果"，神经符号AI回答"如何按规则推理出结论"\n· 与AI安全平台是能力与治理关系：本技术使AI推理更透明、更易被规则约束，AISP负责统一风险识别与运行时监控',
    limitation: '· 工程与工具尚不成熟、知识/本体构建成本高\n· 规模化落地案例少，现有量化证据主要来自单一研究团队评测，缺乏跨机构交叉验证\n· 行业标准尚未统一，专有与开放方案并存',
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
    background: '银行业客户交互渠道持续升级，AI数字人/头像市场规模2025至2026年由约98亿美元增至129亿美元，金融保险被列为主要应用行业之一；《金融产品网络营销管理办法》2026年9月30日施行，对数字人营销合规边界提出更明确要求，是近期最主要的战略紧迫度信号来源。',
    definition: '由生成式AI驱动、具多模态与持续记忆的数字人，结合空间计算/实时渲染提供拟人交互。',
    currentStatus: '· 多家头部银行自2020年起陆续推出数字人产品，历经约3年发展至2023年11家银行客服中心规模化落地\n· 公开测评显示部分银行数字人客服存在语义理解不到位、应答生硬甚至冒犯客户的情况，"上线"与"好用"之间存在显著差距\n· 数字人知识层依赖向量数据库与检索增强生成锚定行内真实产品/政策信息，任务执行能力依赖自主型AI智能体的工具调用\n· 《金融产品网络营销管理办法》2026年9月30日施行在即，合规边界收紧',
    trend: '· 从文本聊天机器人，到多模态、有记忆的拟人交互\n· 从屏幕交互，到网点/可穿戴/空间计算沉浸体验',
    bankValue: '· 智能客服、财富顾问、网点与远程服务的体验升级与人力替代\n· 以行内知识为锚提供可溯源应答，降低生成式AI幻觉风险\n· 可参照同业已落地场景（产品讲解、业务办理、虚拟数字员工、营业厅大屏交互）',
    limitation: '· ROI量化验证难度大，合规（话术、录制、适老）待适配\n· 拟人化风险与信任问题需关注，公开测评揭示的"体验参差"是行业共性问题，需持续话术调优与反馈闭环\n· 渲染与算力成本，厂商方案以专有为主、标准化程度中等',
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
    background: '"双碳"政策刚性约束与AI算力需求指数级增长叠加，是液冷数据中心从可选项变为强制标准的产业背景；国家标准已构成多层次强制性体系，新建大型数据中心PUE强制不高于1.15。',
    definition: '以直冷/浸没式液冷、余热回收、零水冷等提升数据中心能效（PUE）与可持续性，支撑高密度AI算力。',
    currentStatus: '· 2026年全球液冷市场规模预计突破500亿元人民币，中国市场占比超40%\n· 国家标准《数据中心能效限定值及能效等级》《绿色数据中心评价》要求2026年新建数据中心液冷渗透率不低于60%\n· 冷板式液冷技术路线已相对成熟、改造侵入性较低，是当前主流选择；浸没式（尤其两相）技术更先进但处规模化推广早期\n· 头部液冷设备厂商已通过并购整合软硬件能力，行业预计出现中小型专业厂商被龙头整合的集中化趋势',
    trend: '· 从风冷与高PUE，到液冷、余热回收、近零水耗\n· 从算力扩张，到能效与双碳约束下的绿色算力',
    bankValue: '· 支撑高功率AI机柜散热，PUE可达1.15—1.25（冷板式），降低能耗与运营成本，满足双碳与ESG强制标准\n· 与算力网络协同规划算力布局：若不能同步解决散热问题，跨域调度的算力仍将受限于物理散热瓶颈\n· "东数西算"西部枢纽节点已有液冷数据中心规模化建设案例可参照',
    limitation: '· 液冷改造与运维、机房与供应链适配存在成本，既有机房迁移成本较高\n· 浸没式（尤其两相）技术复杂度与成本更高，尚处规模化推广早期\n· 标准与选型：浸没式/直冷等技术路线尚未统一标准',
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
    background: 'RegTech（面向被监管机构）与SupTech（面向监管机构自身）构成"合规自动化"与"监管数字化"一体两面；人民银行2026年3月反洗钱工作会议要求做好第五轮反洗钱国际评估、金融监管总局明确"监管数字化智能化转型"任务，共同构成2026年确定性投入窗口。',
    definition: '以AI/NLP/知识图谱自动化合规：监管报送、交易监控、反洗钱、客户尽调与法规解析。',
    currentStatus: '· 全球RegTech市场规模2025年约190亿—200亿美元，预计2030年代初期扩大至500亿—1350亿美元区间（不同机构口径差异较大）\n· RegTech中AI细分市场预计2026年达约33亿美元，年复合增长率约36.1%\n· 境外多家央行与监管机构已发布系统性案例研究，头部RegTech厂商已普遍将AI应用于反洗钱交易监控场景\n· 境内金融机构AI-native合规工具探索多集中于试点阶段，规模化生产应用待第五轮国际评估等确定性事件驱动',
    trend: '· 从人工合规与事后核查，到AI-native持续、自适应合规\n· 从孤立工具，到可互操作数据标准+AI工具链',
    bankValue: '· 降低合规成本、提升AML/交易监控与报送效率与准确性，适应跨境复杂规则\n· 与人工智能安全平台、向量数据库检索增强生成协同：AISP保障"用AI做合规"过程本身不引入新风险，RAG提供可溯源的合规判断依据\n· 可参照境外央行/监管机构系统性案例研究与头部RegTech厂商AML应用实践',
    limitation: '· 监管数据标准与互操作性待完善，法规更新时效要求高\n· 模型可解释与监管认可需专项设计，与既有合规体系整合工作量大\n· 境内规模化生产应用仍待第五轮国际评估等确定性事件驱动加速',
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
    background: '企业自动化建设长期由RPA/BPM/iPaaS/低代码/IDP/智能体自动化六类工具分头承担、彼此互不感知——一笔授信审批或客户开户往往要经过四到六个系统的人工或脚本交接，流程断点集中在系统边界处；BOAT以统一平台端到端编排业务成果，是对这一"碎片化自动化"现实的整合回应。',
    definition: '由 Gartner 提出的整合型软件平台类别，在单一平台内汇聚业务流程编排、企业连接、低代码开发与智能体（agentic）自动化等能力，横跨 BPA、LCAP、iPaaS、IDP、RPA、协作式工作流与文档管理等原有市场，以端到端编排业务成果替代碎片化的单点自动化。',
    currentStatus: '· 2025年10月Gartner发布首版《BOAT魔力象限》与配套关键能力报告，评估20家厂商，正式确立BOAT为独立企业技术类别（领导者3家：Appian、Pegasystems、ServiceNow）\n· Gartner预计2025年BOAT软件支出接近70亿美元，年均复合增速33.9%，到2029年将超过210亿美元\n· 战略规划假设：到2030年70%企业将转向整合式自动化平台，目前渗透率仅约5%（"5%→70%整合窗口期"）\n· 渣打银行基于ServiceNow构建HR Hub，年度节省生产力工时10.4万小时、自助案例解决率85%；Pepper Money基于Appian平台业务量同比增长70%、三分之一申请1分钟内获批',
    trend: '· 从 RPA／BPM／iPaaS 各自为战的单点自动化，到统一平台端到端编排业务成果\n· 从固定规则脚本，到 AI／智能体驱动的自主流程编排与实时事件响应\n· 从 IT 集中开发，到低代码／无代码的业务与 IT 融合交付',
    bankValue: '· 整合分散的RPA/流程平台/低代码/集成资产，降低重复连接、重复运维、流程断点依赖人工衔接的成本\n· 以统一编排支撑授信审批、账户运营、合规报送等端到端流程自动化，KYC/合规复审类长周期规则明确流程是低风险切入点（同业最多80%工时节省）\n· 为智能体自动化提供业务流程编排底座，内部运营与员工服务场景（如渣打银行HR Hub）可作为技术验证与组织磨合的低风险起点',
    limitation: '· 平台整合涉及存量RPA/BPM/iPaaS并行迁移，全行自动化资产规模以千计，架构改造难度较高\n· 供应商锁定风险：领导者厂商（Appian、Pega、ServiceNow）产品差异化强、议价能力高，市场刚形成、格局未定\n· 整合项目最大风险不是技术本身而是存量迁移，成功案例均采用"新流程上新平台、存量分批迁移"的渐进策略而非推倒重建',
    maturityBasis: 'Gartner首版BOAT魔力象限于2025年10月发布、市场类别正式确立，平台整合与厂商格局仍在演进，属早期采用阶段。', strategicFitBasis: '命中数据要素／未来（企业级流程自动化）方向，为存量RPA/BPM/低代码资产整合的核心路径。', valueBasis: '端到端流程编排降本提效，并为智能体自动化（001/034）提供业务编排底座，覆盖效率与AI赋能多个维度。',
    feasibilityBasis: '涉及存量RPA/BPM/iPaaS迁移，供应商锁定与选型风险，需专项投入治理。', urgencyBasis: 'Gartner预计BOAT软件支出2029年将超210亿美元（CAGR33.9%），属3—5年关键窗口，尚无强制监管时限。', opennessBasis: '领导者厂商（Appian、Pega、ServiceNow）以专有商业方案为主，也有Camunda等开源选项，专有与开放并存。',
    source: '· Gartner《Magic Quadrant for Business Orchestration and Automation Technologies》（Saikat Ray等6位分析师合著，2025年10月15日，文档编号G00828060，首版；全文存档于本行内部知识库）\n· Gartner Peer Insights BOAT 市场（2026）\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增，已联网核实）\n·【2026-07-14复核增补】Infosys Finacle《Banking Architecture Trend 2026》（2026）\n·【2026-07-15深化增补】厂商官方发布信息（Pega、Camunda、Appian、Workato、Twoday）及技术解读资料（Camunda、Trisotech），已全文存档\n【2026-08-17深化增补】Camunda官方案例研究(Barclays/Jyske Bank)、ServiceNow官方客户案例(Standard Chartered Bank)、Appian官方新闻稿(Pepper Money)，均已核实并存档；Forrester《The Total Economic Impact of Camunda for Enterprises》(2024)、IDC/Appian《The Business Value of Appian》效益测算参考研究；Gartner《Critical Capabilities for BOAT, Q3 2025》（转引自Pega新闻稿）；《银行保险机构信息科技外包风险监管办法》（银保监办发〔2021〕141号）、《银行保险机构操作风险管理办法》（国家金融监督管理总局令2023年第5号）、《银行保险机构数据安全管理办法》（金规〔2024〕24号）具体条款，均来自政府网官方发布页面，已核实。', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '由 Gartner 提出的整合型软件平台类别，在单一平台内汇聚业务流程编排、企业连接、低代码开发与智能体（agentic）自动化等能力，横跨 BPA、LCAP、iPaaS、IDP、RPA、协作式工作流与文档管理等原有市场，以端到端编排业务成果替代碎片化的单点自动化。',
    folder: 'assets/technologies/T031_业务编排与自动化',
    reportDocx: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_专题研究报告.docx', reportDocxName: 'T031_业务编排与自动化_专题研究报告.docx', reportDocxSize: '580.4 KB', reportDocxDate: '2026-09-04', reportPdf: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_演示汇报.pptx', slidesPptxName: 'T031_业务编排与自动化_演示汇报.pptx', slidesPptxSize: '5.7 KB', slidesPptxDate: '2026-09-04', slidesPdf: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_演示汇报.pdf',
    image: 'assets/technologies/T031_业务编排与自动化/T031_业务编排与自动化_一张图.svg', imageName: 'T031_业务编排与自动化_一张图.svg', imageSize: '4.4 KB',
    center: '业务处理中心', centerReason: '以统一编排支撑授信审批、账户运营等端到端流程自动化，授信审批正是该中心的核心系统职能', assessment: { dimensions: [{ label:'技术成熟度', score:3, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T32', no: 32, name: '客户数字孪生（Digital Twin of a Customer，DToC）', short: '客户数字孪生', nameEn: 'Digital Twin of a Customer，DToC',
    category: '数据要素（仿真与决策）', categoryKey: '数据要素', archDim: '业务', attr: '未来',
    tier: '观察层', disposal: '动态观察',
    maturity: 1, strategicFit: 3, value: 2, feasibility: 2, urgency: 1, openness: 3,
    conclusion: '技术成熟度1分、战略紧迫度1分（创新萌芽期，市场渗透率仅1%-5%，未检索到银行业生产级案例），引入可行度2分（个人信息保护与算法推荐合规红线密集），维持观察层／动态观察：季度跟踪《金融产品网络营销管理办法》细则与同业动态，可在严格合规限定下探索流失预测、经营仿真等非个性化营销场景小范围PoC。',
    background: '传统客户理解依赖群体分群与事后归因分析，存在"群体画像失真＋事后分析滞后＋无法前瞻推演"的组合失效场景；客户数字孪生以计算模型（而非数据记录）模拟、预测客户行为，试图解决这一失效。',
    definition: 'DToC是基于第一方数据实时构建的单一客户动态AI模型，通过身份解析、行为建模与情景仿真，模拟、预测并推演客户下一步行为与需求，为精准营销、财富顾问服务与风险预警提供前瞻输入。Gartner将其列为客户体验与销售转型的战略性新兴技术，2025年多份Hype Cycle报告将其定位于"创新萌芽期／新兴阶段"。',
    currentStatus: '· 国际研究机构2025年多份报告持续将其列为客户体验与销售转型领域战略性新兴技术，但仍处早期采纳阶段，市场渗透率约1%—5%\n· 《金融产品网络营销管理办法》2026年9月30日起施行，明确将算法推荐纳入监管、要求提供非个性化选项；个人信息保护法第24条对自动化决策透明度与公平性提出强制性要求\n· 可口可乐与NVIDIA、WPP合作案例（跨100余个市场素材超本地化生成）是目前检索到投入规模与合作方披露最完整的实名案例，但更接近"内容生产自动化"而非严格定义的客户行为预测\n· 现有实名证据集中在零售/快消行业营销内容生产场景，尚未出现银行业客户行为预测类应用的公开生产案例',
    trend: '· 从群体客户画像，到单客户级实时行为孪生与情景推演\n· 从事后归因分析，到"假设-推演"式前瞻模拟\n· 从人工经验驱动的营销决策，到孪生驱动的自动化触达与响应预测',
    bankValue: '· 支撑精准营销触达、财富顾问服务、客户流失预测与风险预警\n· 与决策智能平台（决策推荐）、多智能体系统（任务执行）、数字人（交互呈现）构成技术链条，为其提供前瞻性预测输入\n· 提升客户旅程模拟与运营仿真能力，辅助产品与渠道策略验证',
    limitation: '· 技术仍处创新萌芽期／新兴阶段，市场渗透率约1%-5%，可用平台与方法论未定型\n· 客户级行为建模高度依赖个人信息保护、算法推荐与差异化定价合规红线，2026年9月30日起施行的《金融产品网络营销管理办法》进一步收紧适用边界\n· 统一数据基础、聚焦型机器学习模型、实时同步与激活路径四项前提对多数机构均非现成能力，建设与运维投入大\n· 截至本轮复核，未检索到可公开核实的银行业生产级落地案例，行业整体仍以零售、消费品等非金融场景先行',
    maturityBasis: 'Gartner多期Hype Cycle一致将DToC置于创新萌芽期，市场渗透率仅1%-5%，未检索到银行业生产级案例，处萌芽阶段。', strategicFitBasis: '命中数据要素（仿真与决策）方向下的技术路径之一，非核心旗舰应用。', valueBasis: '精准营销、财富顾问、流失预警存在价值锚点，但金融场景数据基础与合规约束显著高于零售业，价值难以量化。',
    feasibilityBasis: '《金融产品网络营销管理办法》《个人信息保护法》自动化决策公平性等构成客户级建模的多重合规红线，需专项立项治理。', urgencyBasis: '技术处于创新萌芽期，不宜投入研究资源或开展本行落地探索，属5年以上长期赛道。', opennessBasis: '可用平台与方法论尚未定型，市场早期，专有与潜在开放路径并存。',
    source: '· Gartner新闻稿《Hype Cycle Reveals How AI and Digital Advancements Are Primed to Aid Sales Transformations》（2025-10-30，DToC置于创新萌芽期）\n· Gartner《Hype Cycle for CRM Technologies, 2025》（G00827302，2025-07-09，DToC列"On the Rise"新兴阶段、效益评级高、渗透率1%-5%，经第三方转引页面部分核实）\n· Gartner供应链洞察《A Digital Twin of the Customer Could Transform Your Supply Chain Digitalization Strategy》（Beth Coppinger，2023-06-16，27%对60%试点/规划数据）\n· 中国人民银行等八部门《金融产品网络营销管理办法》（2026-04-24印发/2026-09-30施行）；国家网信办等四部门《互联网信息服务算法推荐管理规定》（2021-12-31公布/2022-03-01施行）；中国人民银行《金融领域科技伦理指引》（JR/T 0258—2022）\n采集截止日期：2026-08-18。', attention: '中—高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: 'DToC是基于第一方数据实时构建的单一客户动态AI模型，通过身份解析、行为建模与情景仿真，模拟、预测并推演客户下一步行为与需求，为精准营销、财富顾问服务与风险预警提供前瞻输入。Gartner将其列为客户体验与销售转型的战略性新兴技术，2025年多份Hype Cycle报告将其定位于"创新萌芽期／新兴阶段"。',
    folder: 'assets/technologies/T032_客户数字孪生',
    reportDocx: 'assets/technologies/T032_客户数字孪生/前沿技术专题研究报告_客户数字孪生DToC_V2.32.docx', reportDocxName: '前沿技术专题研究报告_客户数字孪生DToC_V2.32.docx', reportDocxSize: '1.09 MB', reportDocxDate: '2026-09-04', reportPdf: 'assets/technologies/T032_客户数字孪生/T032_客户数字孪生_专题研究报告.pdf',
    slidesPdf: 'assets/technologies/T032_客户数字孪生/T032_客户数字孪生_演示汇报.pdf',
    image: 'assets/technologies/T032_客户数字孪生/T032_客户数字孪生_一张图.png', imageName: 'T032_客户数字孪生_一张图.png', imageSize: '2.07 MB',
    center: '客户经营中心', centerReason: '核心价值在于支撑精准营销触达、财富顾问服务，直接对应统一商机平台/对公驾驶舱的客户经营职能', assessment: { dimensions: [{ label:'技术成熟度', score:1, weight:20, max:5 }, { label:'战略匹配度', score:3, weight:20, max:5 }, { label:'价值贡献度', score:2, weight:20, max:5 }, { label:'引入可行度', score:2, weight:15, max:5 }, { label:'战略紧迫度', score:1, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T33', no: 33, name: '决策智能平台（Decision Intelligence Platform，DIP）', short: '决策智能平台', nameEn: 'Decision Intelligence Platform，DIP',
    category: '数据要素（决策智能）', categoryKey: '数据要素', archDim: '数据', attr: '关键',
    tier: '论证层', disposal: '系统论证',
    maturity: 4, strategicFit: 4, value: 5, feasibility: 3, urgency: 3, openness: 3,
    conclusion: '价值贡献度5分（决策自动化与增强直接创造业务价值，多维度显著且可量化）、战略匹配度4分、技术成熟度4分（Gartner已发布魔力象限，市场成熟），宜系统论证：盘点我行授信/风控/营销决策资产，评估DIP与现有决策引擎的整合路径，结合因果AI（021）强化可解释与反事实能力，选取高价值决策场景开展论证与试点。',
    background: '传统BI/数据分析平台止步于描述性/诊断性/预测性分析，报表与模型预测结果之后的决策制定与系统操作仍严重依赖人工转译，"分析—决策—行动"之间存在物理隔离；DIP通过历史数据、预测模型与业务规则融合，直接给出系统推荐的最优行动方案。',
    definition: '融合显式决策建模、AI、分析等能力以支持、增强或自动化决策的平台，将决策作为可设计、可复用、可追溯、可优化的对象，驱动业务成果并支持决策留痕以供复盘。',
    currentStatus: '· 2026年1月Gartner发布首版决策智能平台魔力象限，标志该市场从小众采用进入晚期新兴阶段；评估纳入17家厂商，尚无国内厂商上榜，FICO、SAS等银行相关性最强的厂商为领导者\n· 英国Nationwide Building Society采用云端FICO Platform统一迁移信贷决策逻辑，12个月完成五条产品线迁移，每月处理约150万笔信贷决策\n· Quantexa被Forrester Consulting研究测算三年期投资回报率达228%，模型求解速度提升60倍、准确度提升90%\n· 国内头部银行智能风控平台与统一建模平台可视为DIP本土雏形，但尚未找到以"决策智能平台"名义公开披露的同业实名案例',
    trend: '· 从分散的分析报表，到以决策为中心、可建模可复用的决策资产\n· 从人工经验决策，到 AI 增强与自动化决策闭环\n· 从事后归因，到决策全过程留痕与持续优化',
    bankValue: '· 授信审批、风控反欺诈、催收、营销与定价等核心决策的建模、增强与自动化\n· 决策留痕支撑可解释、可审计与监管合规\n· 与因果AI结合提升决策可解释性与反事实推演；Nationwide案例显示决策组件更新提速50%、策略上线提速30%可作为效益测算对标基准',
    limitation: '· 与现有决策引擎/规则平台整合、口径统一难度大\n· 决策模型的可解释性、偏见与治理要求高，高管层战略决策应坚持"决策支持/决策增强"定位、最终裁决权留人\n· 组织需具备决策工程与数据治理能力，归因工具不成熟需保留全量协作日志备审计重建',
    maturityBasis: 'Gartner于2026年1月发布决策智能平台魔力象限，FICO/SAS/ACTICO等厂商成熟，多个行业已有生产案例。', strategicFitBasis: '命中数据要素（决策智能）战略方向，授信、风控、反欺诈等银行核心业务本质即决策，契合度极高。', valueBasis: '决策自动化与增强直接创造业务价值，决策留痕支撑可解释与合规，多维度显著价值且可量化。',
    feasibilityBasis: '需与现有决策引擎、规则平台整合，统一口径难度大，需专项投入治理。', urgencyBasis: 'Gartner预测2026年75%全球500强将应用决策智能实践，"治理化规模决策"成为2026年银行运营关键词，属3—5年关键窗口。', opennessBasis: 'FICO、SAS、Aera等厂商以专有商业方案为主，标准化程度中等。',
    source: '· Gartner《Magic Quadrant for Decision Intelligence Platforms》（2026.01.26）《Market Guide for DIP》\n· FICO/SAS 决策智能金融应用；FintechNews《Top DIP of 2026》\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增；与021因果AI关联，以本条目为主、021为补充）\n·【2026-07-14复核增补】银行业AI趋势报告（2026）\n【2026-07-15深化增补】Gartner《Magic Quadrant for Decision Intelligence Platforms》（G00827619，2026-01-26）全文已获授权订阅、存于本行内部知识库，含17家厂商完整评述与原版象限图，已全文存档\n【2026-08-17专题补充】Gartner分析师2026-08-04现场技术交流纪要与配套技术分析报告（行内知识库留存，非公开信源）；自制3层混合决策智能框架示意图（据交流内容整理）；采集/整理日期：2026-08-17\n【2026-08-17修订增补】FICO官方新闻稿《Nationwide Speeds Up Credit Decisioning by 50% with FICO Platform》（2026-03-11，公开可查）；Forrester Consulting对Quantexa委托研究新闻稿（2024-02-08，公开可查）', attention: '高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '融合显式决策建模、AI、分析等能力以支持、增强或自动化决策的平台，将决策作为可设计、可复用、可追溯、可优化的对象，驱动业务成果并支持决策留痕以供复盘。',
    folder: 'assets/technologies/T033_决策智能平台',
    reportDocx: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_专题研究报告.docx', reportDocxName: 'T033_决策智能平台_专题研究报告.docx', reportDocxSize: '779.0 KB', reportDocxDate: '2026-09-04', reportPdf: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_专题研究报告.pdf',
    slidesPptx: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_演示汇报.pptx', slidesPptxName: 'T033_决策智能平台_演示汇报.pptx', slidesPptxSize: '5.7 KB', slidesPptxDate: '2026-09-04', slidesPdf: 'assets/technologies/T033_决策智能平台/T033_决策智能平台_演示汇报.pdf',
    image: 'assets/technologies/T033_决策智能平台/T33-DIP一页纸.png', imageName: 'T33-DIP一页纸.png', imageSize: '1.95 MB',
    center: '风险管理中心', centerReason: '核心价值聚焦授信审批、风控反欺诈等核心决策的建模、增强与自动化，与信用风险智能决策系统直接对应', assessment: { dimensions: [{ label:'技术成熟度', score:4, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:5, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:3, weight:10, max:5 }] }
  },
  { id: 'T34', no: 34, name: '多智能体系统（Multi-Agent Systems，MAS）', short: '多智能体系统', nameEn: 'Multi-Agent Systems，MAS',
    category: '人工智能（智能体协同）', categoryKey: '人工智能', archDim: '应用（跨业务）', attr: '新兴（向关键演进）',
    tier: '布局层', disposal: '提前布局',
    maturity: 2, strategicFit: 4, value: 4, feasibility: 3, urgency: 3, openness: 4,
    conclusion: '战略价值高、与自主型AI智能体（001）、AI智能体互操作协议（017）协同紧密，按六维复核结果转为提前布局：以AI安全平台（018）为统一护栏前置，提前建立单体与多智能体的分工与编排标准储备，选取反欺诈／投研等高价值场景做前瞻性技术与人才准备，严控安全与成本，避免盲目规模化。',
    background: '单体智能体能力上限受限于单一模型的上下文窗口与专业深度，遇到多专业环节或跨流程协同任务时要么被迫承担超出专精范围的工作、准确度下降，要么需人工手动衔接；多智能体系统通过角色分工、任务分解与冲突协调，将"单一全能助手"升级为"AI数字团队"。',
    definition: '由多个任务专精的 AI 智能体分工协作、相互通信与协调以完成复杂任务的系统；在单体自主智能体之上引入编排、角色分工与协作机制，提升可扩展性与专业度。',
    currentStatus: '· Gartner将MAS列入2026年顶级战略技术趋势，Forrester与Gartner共同将2026年视为多智能体"突破之年"\n· Gartner 2025年6月预测：到2027年底超过40%的智能体类项目将被取消，原因是成本攀升、价值不清与风控不足，"agent washing"加剧预期泡沫\n· 银行与保险业智能体采纳处于各行业前列，监管变化分诊、金融犯罪检测与投研尽调多智能体流水线是最受关注用例\n· 国内头部银行多智能体实践尚处早期探索，未检索到可公开核实的银行业生产级MAS落地案例',
    trend: '· 从单一智能体，到多个专精智能体分工协作的复合系统\n· 从人工编排流程，到智能体间自主协商、任务分解与协同执行\n· 从窄场景自动化，到端到端跨流程的 AI 数字团队',
    bankValue: '· 反欺诈、投研、跨境金融、运营与合规等复杂流程的多智能体协同自动化\n· 与自主型AI智能体、AI智能体互操作协议协同，构建AI数字员工团队\n· 提升复杂任务的专业度、并行度与可扩展性；论证期不设财务回报目标，重点是"单任务全成本"口径测算，对冲40%项目取消风险',
    limitation: '· 安全攻击面随智能体数量扩大，编排与监控复杂度高，归因工具不成熟，生产部署应保留全量协作日志备审计\n· 复合误差累积导致可靠性下降，治理与可观测工具不成熟\n· Gartner预警到2027年超40%智能体AI项目将被取消，成本与ROI不确定，跨越业务动作边界的操作须收敛到单一受控出口并保留人工检查点',
    maturityBasis: 'Gartner列为2026年顶级战略技术趋势，2026Q1约80%新交付应用嵌入AI智能体，但预测2027年超40%智能体AI项目将被取消，处技术触发期爬升阶段。', strategicFitBasis: '命中人工智能战略方向，银行保险业智能体采纳领先（约47%），与001/017直接协同。', valueBasis: '复杂流程多智能体协同自动化潜力大，为AI数字团队核心能力，覆盖效率与专业度多个维度。',
    feasibilityBasis: '安全攻击面随智能体数量扩大、复合误差累积可靠性下降，以018 AISP为统一护栏前置管控后风险总体可管理，需专项投入治理。', urgencyBasis: '57%银行高管预期三年内智能体进入风险、合规、审计与反欺诈流程，属3—5年关键窗口。', opennessBasis: '与017互操作协议共享MCP/A2A开放生态，多厂商可选。',
    source: '· Gartner《Top Strategic Technology Trends 2026: Multiagent Systems》《Multiagent Systems in Enterprise AI》\n· S&P Global/McKinsey 智能体生产部署统计（2026）\n· 采集时间：2026-07-07（Gartner分析师2026-06-12推荐新增；与001/017关联，以本条目为主、001/017为补充；护栏依赖018 AISP）\n·【2026-07-14复核增补】Accenture银行业展望2026；多智能体系统行业白皮书（2026）', attention: '极高', status: '在库—已深化研究', updateDate: '2026-07-14',
    externalSource: 'Gartner分析师20260612推荐',
    summary: '由多个任务专精的 AI 智能体分工协作、相互通信与协调以完成复杂任务的系统；在单体自主智能体之上引入编排、角色分工与协作机制，提升可扩展性与专业度。',
    center: '智慧运营中心', centerReason: '多智能体协同自动化契合运营场景，与智能工厂的产线化协同作业逻辑一致', assessment: { dimensions: [{ label:'技术成熟度', score:2, weight:20, max:5 }, { label:'战略匹配度', score:4, weight:20, max:5 }, { label:'价值贡献度', score:4, weight:20, max:5 }, { label:'引入可行度', score:3, weight:15, max:5 }, { label:'战略紧迫度', score:3, weight:15, max:5 }, { label:'生态开放度', score:4, weight:10, max:5 }] }
  },
  { id: 'T35', no: 35, name: '可组合核心银行系统（Composable Core Banking System）', short: '可组合核心银行系统', nameEn: 'Composable Core Banking System',
    category: '数据要素／未来（核心系统现代化）', categoryKey: '数据要素', archDim: '应用', attr: '关键',
    tier: '观察层', disposal: '动态观察',
    maturity: 3, strategicFit: 4, value: 4, feasibility: 2, urgency: 3, openness: 3,
    conclusion: '核心系统现代化方向明确、价值贡献度评级高，但引入可行度触及否决线（改造投入巨大、迁移周期长、业务连续性风险高），按六维复核短板原则转为动态观察，并优先评估可行度短板：跟踪同业规模化落地案例与PBC增量替换路径的风险管控经验，形成可分阶段、低风险的迁移方案后再评估转入系统论证。',
    background: '传统单体式核心系统紧耦合，任何局部改造都可能牵动全局，改造周期长、风险高；可组合架构通过服务边界、标准化API与事件驱动集成，使银行可"按需组合"不同厂商或自研的PBC模块，是对这一改造困局的回应。',
    definition: '以 API 化模块与打包业务能力（Packaged Business Capabilities，PBC）搭建的核心银行系统，允许银行按需组合、快速配置产品与旅程，强调可组合性、云原生与业务功能广度，替代单体式核心。',
    currentStatus: '· 仅约23%金融机构选择以全新核心系统整体替代原有核心，50%以上机构仍选择维持现状或小范围升级\n· 杭州银行新一代核心系统是业内首个实际投产的云原生/分布式/全栈国产化核心系统，日均交易量超1000万笔、平均交易耗时低于100毫秒，较原核心缩短54%\n· ING银行采用绞杀者模式历时三年将主机MIPS消耗降低约30%、全程未发生生产中断；全球前50大银行中仍有45家依赖主机处理关键业务\n· 核心银行软件市场2025年约138亿美元，预计2030年达216亿美元；本次入选魔力象限的厂商均为国际厂商，境内厂商尚未进入Gartner评估范围',
    trend: '· 从单体式紧耦合核心，到 API 化、模块化 PBC 可组合核心\n· 从长周期瀑布式改造，到按能力增量替换与快速产品迭代\n· 从本地部署，到云原生、弹性伸缩的核心架构',
    bankValue: '· 支撑核心系统现代化，配置周期从"月级"缩短至"周级甚至更短"，标杆案例新产品上市时间可缩短40%\n· 以PBC增量替换、绞杀者模式等渐进路径降低单体核心改造的整体风险，避免"大爆炸式"整体切换的业务中断风险\n· 云原生、分布式架构在高并发场景下具备更优弹性伸缩能力，杭州银行案例交易耗时降低超50%',
    limitation: '· 核心改造投入巨大、迁移周期长，业务连续性风险高，核心系统变更历来是监管报备与业务连续性审查的重点领域\n· PBC拆分与数据一致性、分布式事务治理复杂\n· 领导者厂商（FIS、Finacle等）产品差异化强、议价能力高，全量替换类项目转换成本高',
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
    background: 'LLMOps承继MLOps工程理念，但对象从"自研模型"变为"基础模型之上的应用"——版本管理对象从模型权重扩展到提示词/RAG管道/编排逻辑，测试从数据集精度指标转向语义质量评估，监控从特征漂移扩展到token成本/时延/内容安全，是应对生成式AI特有运营需求的必然演进。',
    definition: '面向大模型/生成式 AI 应用全生命周期的开发与运维平台能力，覆盖提示工程与版本管理、评测、部署、可观测、护栏与成本归因，将 AI 应用从实验推向可治理的规模化生产。',
    currentStatus: '· 全球78%企业已在生产环境部署机器学习模型，向LLM应用迁移使运维体系升级成为普遍需求\n· AEOP（AI应用评估与观测平台）已确立为独立品类，2025—2026年才正式确立，供应商格局未收敛\n· 头部国际银行数百个AI用例已投产并计划持续扩容，国内头部银行大模型平台普遍内建应用开发与运维能力，部分银行AI生成代码占比已超三成\n· 市场供给分三类：云厂商全家桶、专业LLMOps厂商（评估与观测见长）、开源组合（MLflow、Langfuse等）',
    trend: '· 从手工调试提示、脚本部署，到标准化的 AI 应用开发与运维流水线\n· 从模型能力优先，到生产工程、可观测与治理并重\n· 从单点工具，到贯穿评测/追踪/网关/注册的一体化 LLMOps 底座',
    bankValue: '· 支撑自主型AI智能体、AI原生应用架构、小语言模型与端侧AI等AI应用规模化落地，缩短从试点到生产的周期\n· 提供评测、可观测、成本归因与护栏，满足AI治理与监管要求；与平台工程/IDP协同，形成AI工程化内部平台\n· 评估先行（基准集与自动化评估作为投产门禁）、成本观测与业务价值挂钩（FinOps for AI）是同业验证的落地共性',
    limitation: '· 工具链碎片化，多数企业需组合3—5个专用工具，缺乏统一企业上下文与治理\n· 生产化仍是主要失败点（Gartner归因约85%的AI模型失败于生产部署环节）\n· 智能体评估标准业界仍在探索，需相应组织能力、评测基准与合规配套',
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
    version: '202609072212',
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

  var TERMS = [
  {
    "id": "a2a",
    "term": "A2A",
    "fullName": "Agent-to-Agent Protocol",
    "nameCn": "智能体互操作协议",
    "cat": "人工智能",
    "def": "支持不同厂商、异构框架下的自主AI智能体之间进行直接通讯、意图协商与跨系统分布式任务协同的开放协议标准。",
    "relevance": "未来银行多智能体协同网络（如投研、授信、客服智能体互通）的基础互联协议。"
  },
  {
    "id": "acp",
    "term": "ACP",
    "fullName": "Agent Communication Protocol",
    "nameCn": "智能体通信协议",
    "cat": "人工智能",
    "def": "定义智能体间消息格式、对话状态机、权限上下文与交互语义的传输层标准化通信规范。",
    "relevance": "保障跨系统智能体调用的安全鉴权与可追溯审计。"
  },
  {
    "id": "aiops",
    "term": "AIOps",
    "fullName": "Artificial Intelligence for IT Operations",
    "nameCn": "智能运维平台",
    "cat": "基础设施与运维",
    "def": "将机器学习与大数据分析技术应用于 IT 运维场景，实现海量监控日志与遥测数据的异常检测、根因分析与自动化故障自愈。",
    "relevance": "银行数据中心与关键核心交易系统高可用保障的重要支撑底座。"
  },
  {
    "id": "aisp",
    "term": "AISP",
    "fullName": "AI Security Platform",
    "nameCn": "人工智能安全平台",
    "cat": "安全与合规",
    "def": "涵盖大模型提示注入防御、输出越狱拦截、训练数据防泄露与数字资产水印等多维防护的企业级 AI 安全治理平台。",
    "relevance": "全行大模型规模化商用不可或缺的安全合规守门人与风险隔离墙。"
  },
  {
    "id": "aml",
    "term": "AML",
    "fullName": "Anti-Money Laundering",
    "nameCn": "反洗钱监管与合规",
    "cat": "金融合规",
    "def": "金融机构防范、识别洗钱与恐怖融资活动的合规风控体系，当前正深度引入图计算与自主智能体进行穿透式资金流向分析。",
    "relevance": "银行法定核心合规义务，数字化反洗钱是前沿监管科技的核心突破点。"
  },
  {
    "id": "api",
    "term": "API",
    "fullName": "Application Programming Interface",
    "nameCn": "应用程序编程接口",
    "cat": "架构与集成",
    "def": "定义不同软件组件之间交互的标准化规范约定，是现代开放银行架构与微服务体系的基础连接单元。",
    "relevance": "全行业务能力解耦开放、场景金融生态嵌合与跨系统互通的生命线。"
  },
  {
    "id": "apqc",
    "term": "APQC",
    "fullName": "American Productivity & Quality Center",
    "nameCn": "美国生产力与质量中心",
    "cat": "方法论工具",
    "def": "全球通用的流程分类框架（PCF）制定机构，广泛用于企业架构端到端业务流程分级梳理与能力地图映射。",
    "relevance": "指导本行企业架构十大中心梳理端到端标准化流程的经典分类方法论。"
  },
  {
    "id": "arxiv",
    "term": "arXiv",
    "fullName": "arXiv Open-Access Preprint Archive",
    "nameCn": "arXiv 开放学术预印本平台",
    "cat": "学术与情报源",
    "def": "由美国康奈尔大学运营的全球权威开放预印本在线学术文献库，涵盖计算机科学、人工智能、密码学、量子物理等领域前沿论文首发，是跟踪国际顶尖科研动向的核心情报源。"
  },
  {
    "id": "bcg",
    "term": "BCG",
    "fullName": "Boston Consulting Group",
    "nameCn": "波士顿咨询公司",
    "cat": "智库机构",
    "def": "全球知名战略咨询智库，其发布的金融数字化转型、金融科技发展态势报告是前沿研判的重要外部情报源。",
    "relevance": "提供全球金融业前瞻创新案例与科技战略投入的同业对标基准。"
  },
  {
    "id": "bis",
    "term": "BIS",
    "fullName": "Bank for International Settlements",
    "nameCn": "国际清算银行",
    "cat": "金融监管与标准",
    "def": "被称为“央行的央行”，牵头推进全球央行数字货币（CBDC）跨境互联试验与金融代币化基础设施探索。",
    "relevance": "把握未来跨境支付、数字货币与去中心化资产流动性清算规则演进的关键指南针。"
  },
  {
    "id": "boat",
    "term": "BOAT",
    "fullName": "Business Orchestration and Automation Technologies",
    "nameCn": "业务编排与自动化技术",
    "cat": "业务架构与工程",
    "def": "Gartner 提出的技术体系，融合 BPM、RPA、低代码与事件驱动编排，驱动端到端复杂业务流程的高度自适应集成。",
    "relevance": "全行长流程业务端到端重塑与敏捷智能协同落地的关键中枢架构。"
  },
  {
    "id": "bpa",
    "term": "BPA",
    "fullName": "Business Process Automation",
    "nameCn": "业务流程自动化",
    "cat": "业务架构",
    "def": "通过技术手段替代传统人工重复性业务操作，提升全行业务流转质效并降低操作风险。",
    "relevance": "智慧运营中心降本增效与数字化作业的核心技术手段。"
  },
  {
    "id": "bpm",
    "term": "BPM",
    "fullName": "Business Process Management",
    "nameCn": "业务流程管理",
    "cat": "业务架构",
    "def": "系统化设计、建模、执行、监控和持续优化企业端到端业务流程的工程化管理方法与软件平台体系。",
    "relevance": "银行稳态业务处理中心与敏态业务创新的基础流程底座。"
  },
  {
    "id": "cncf",
    "term": "CNCF",
    "fullName": "Cloud Native Computing Foundation",
    "nameCn": "云原生计算基金会",
    "cat": "开源生态与标准",
    "def": "Linux 基金会旗下的非营利开源组织，孵化并主导 Kubernetes、OpenTelemetry、Envoy 等全球主流云原生基础设施开源技术。",
    "relevance": "全行云原生容器底座、微服务治理与可观测性标准化演进的核心开源生态源头。"
  },
  {
    "id": "cra",
    "term": "CRA",
    "fullName": "Cyber Resilience Act",
    "nameCn": "欧盟《网络弹性法案》",
    "cat": "国际合规与法规",
    "def": "对具备数字元素的硬件和软件产品提出强制性网络安全与全生命周期漏洞修复要求的开创性数字法规。",
    "relevance": "软件供应链安全治理与跨境金融软件出口合规的标杆法律参考。"
  },
  {
    "id": "csf",
    "term": "CSF",
    "fullName": "Cybersecurity Framework (NIST)",
    "nameCn": "网络安全框架",
    "cat": "安全标准与框架",
    "def": "美国 NIST 提出的网络安全核心框架（识别、防护、侦测、响应、恢复、治理），广泛作为全球金融系统安全体系标杆。",
    "relevance": "全行网络安全风险防线评估与实战化攻防演练成熟度衡量的权威坐标。"
  },
  {
    "id": "devsecops",
    "term": "DevSecOps",
    "fullName": "Development, Security, and Operations",
    "nameCn": "开发安全运维一体化",
    "cat": "研发工程",
    "def": "将安全理念与自动化安全卡点（静态代码审计、开源组件依赖扫描、SBOM验证）深度内置于研发部署全流程的敏捷交付范式。",
    "relevance": "保障应用“出厂即合规、上线即安全”，提升软件安全交付效能。"
  },
  {
    "id": "did",
    "term": "DID",
    "fullName": "Decentralized Identifier",
    "nameCn": "去中心化数字身份",
    "cat": "区块链与数字身份",
    "def": "基于密码学公私钥与分布式账本的可验证、去中心化数字身份标识标准（W3C 规范），实现用户自主掌控数据主权。",
    "relevance": "跨机构客户身份互认、隐私保护授权与数字资产可信流转的新型信任底座。"
  },
  {
    "id": "dip",
    "term": "DIP",
    "fullName": "Decision Intelligence Platform",
    "nameCn": "决策智能平台",
    "cat": "人工智能",
    "def": "融合因果AI、预测模型、业务规则引擎与运筹优化算法，在多约束动态环境下支持银行自动化或辅助业务决策的数智中枢。",
    "relevance": "零售智能风控、对公差异化定价与资产负债动态模拟的核心决策中枢。"
  },
  {
    "id": "dora",
    "term": "DORA",
    "fullName": "Digital Operational Resilience Act",
    "nameCn": "欧盟《数字运营弹性法案》",
    "cat": "国际合规与法规",
    "def": "欧盟针对金融机构及 ICT 关键第三方服务商设立的强制性数字化运营弹性、网络攻击压力测试与灾难恢复监管法案。",
    "relevance": "指导金融关键基础设施防范单点外包依赖与极端网络韧性建设。"
  },
  {
    "id": "dtoc",
    "term": "DToC",
    "fullName": "Digital Twin of a Customer",
    "nameCn": "客户数字孪生",
    "cat": "数据要素与AI",
    "def": "基于全维度交易轨迹、偏好意图与因果行为模型实时构建的动态虚拟客户映射实体，赋能超个性化金融推荐与信用推演。",
    "relevance": "客户经营中心实施精准营销、财富顾问服务与动态生命周期价值挖掘的突破口。"
  },
  {
    "id": "ecc",
    "term": "ECC",
    "fullName": "Elliptic Curve Cryptography",
    "nameCn": "椭圆曲线密码学",
    "cat": "密码与信息安全",
    "def": "基于椭圆曲线离散对数数学难题的高效公钥加密算法（如国密 SM2、ECDSA），是后量子密码体系攻防对比的核心基准。",
    "relevance": "当前网银加密、手机银行证书的核心基础，属于后量子迁移重点改造对象。"
  },
  {
    "id": "eda",
    "term": "EDA",
    "fullName": "Event-Driven Architecture",
    "nameCn": "事件驱动架构",
    "cat": "企业架构与系统",
    "def": "以业务事件的产生、捕获、路由与异步反应为核心的高解耦、高扩展系统架构体系，提升现代核心银行系统实时响应能力。",
    "relevance": "支撑千万级实时交易峰值解耦与多渠道事件秒级联动的架构骨架。"
  },
  {
    "id": "eidas",
    "term": "eIDAS",
    "fullName": "Electronic Identification, Authentication and Trust Services",
    "nameCn": "欧盟电子身份认证与信托服务条例",
    "cat": "国际合规与标准",
    "def": "确立跨境电子身份认证与可信服务的欧盟法规，其 2.0 版本规定了主权数字身份钱包（EUDI Wallet）及凭证签发标准。",
    "relevance": "国际数字身份与跨境合规互认的最高法定标准参考。"
  },
  {
    "id": "eudi",
    "term": "EUDI",
    "fullName": "EU Digital Identity Wallet",
    "nameCn": "欧盟数字身份钱包",
    "cat": "数字身份与隐私",
    "def": "由欧盟官方推进的标准化通用数字钱包架构，允许用户在高度隐私保护下向第三方安全出示经过认证的资质凭证。",
    "relevance": "下一代移动金融终端与跨境账户实名核验形态演进的重要风向标。"
  },
  {
    "id": "fair",
    "term": "FAIR",
    "fullName": "Factor Analysis of Information Risk",
    "nameCn": "信息风险因素分析模型",
    "cat": "风险量化方法论",
    "def": "国际公认的定量信息与操作风险分析方法论，将传统定性风险矩阵转化为基于概率分布的货币化财务损失区间推导。",
    "relevance": "为全行重大技术选型与网络安全投资决策提供精准量化投入产出测算。"
  },
  {
    "id": "fate",
    "term": "FATE",
    "fullName": "Federated AI Technology Enabler",
    "nameCn": "联邦学习工业级开源框架",
    "cat": "隐私计算与安全",
    "def": "微众银行开源并在 Linux 基金会托管的工业级联邦学习框架，支持金融机构在保护多方数据主权与合规隐私的前提下联合建模。",
    "relevance": "政务数据要素联合反欺诈与跨行信贷风控联合建模的实战验证标杆。"
  },
  {
    "id": "fhe",
    "term": "FHE",
    "fullName": "Fully Homomorphic Encryption",
    "nameCn": "全同态加密",
    "cat": "密码学与隐私计算",
    "def": "允许直接对密文进行任意代数运算且解密结果与明文计算完全一致的密码学算法，被誉为隐私保护计算的“圣杯”。",
    "relevance": "金融高敏数据云端密文托管与不可信第三方算力安全利用的终极密码防线。"
  },
  {
    "id": "finops",
    "term": "FinOps",
    "fullName": "Financial Operations",
    "nameCn": "云财务运营与成本治理",
    "cat": "算力与基础设施",
    "def": "将财务责任制与工程敏捷度结合，通过全生命周期的用量可见性、智能分摊与资源优化，最大化混合多云与智算投资回报率。",
    "relevance": "智算集群算力利用率提升与云上成本精细化管控的治理框架。"
  },
  {
    "id": "fmea",
    "term": "FMEA",
    "fullName": "Failure Mode and Effects Analysis",
    "nameCn": "潜在失效模式与后果分析",
    "cat": "工程与风险工具",
    "def": "系统化工程风险推演方法，通过对各组件严重度(S)、发生度(O)、探测度(D)打分计算 RPN，指导前沿技术引入的灰度防线设计。",
    "relevance": "新技术原型向生产环境演进时的架构健壮性与单点故障压力测试工具。"
  },
  {
    "id": "gdpr",
    "term": "GDPR",
    "fullName": "General Data Protection Regulation",
    "nameCn": "欧盟《通用数据保护条例》",
    "cat": "国际合规与法规",
    "def": "全球公认最严格的数据保护法规，确立被遗忘权、数据便携权与“设计即隐私”原则，深刻重塑金融数据跨境流通范式。",
    "relevance": "境外机构业务合规与全行个人客户隐私保护体系建设的法律基准。"
  },
  {
    "id": "graphrag",
    "term": "GraphRAG",
    "fullName": "Graph Retrieval-Augmented Generation",
    "nameCn": "知识图谱增强检索生成",
    "cat": "人工智能与数据要素",
    "def": "将知识图谱的关系拓扑结构与大模型语义检索深度结合的增强技术，显著抑制复杂金融规章研判中的事实幻觉。",
    "relevance": "对公授信集团派系穿透、信贷调查长报告结构化分析与监管规章问答的利器。"
  },
  {
    "id": "idc",
    "term": "IDC",
    "fullName": "International Data Corporation",
    "nameCn": "国际数据公司",
    "cat": "智库机构",
    "def": "全球权威的信息技术市场情报与咨询机构，其关于中国金融云、AI 平台与大数据技术市场份额研究是研判的关键引用基准。",
    "relevance": "提供各技术领域厂商集中度、发展成熟度与行业落地格局的客观研判数据。"
  },
  {
    "id": "idp",
    "term": "IDP",
    "fullName": "Internal Developer Platform",
    "nameCn": "内部开发者平台 / 平台工程",
    "cat": "平台工程与研发",
    "def": "通过自助式工作流、基础设施编排与“黄金路径”，减轻一线研发认知负荷并保障全行企业架构规范落地。",
    "relevance": "软件工程生产力革命与数字化研发团队提效的核心平台基础设施。"
  },
  {
    "id": "ieee",
    "term": "IEEE",
    "fullName": "Institute of Electrical and Electronics Engineers",
    "nameCn": "电气与电子工程师协会",
    "cat": "国际标准组织",
    "def": "全球最大的专业技术协会，制定了包括网络通信、量子信道度量、可信 AI 等众多权威国际标准。",
    "relevance": "前沿软硬件协议底层技术规格与测评规范的重要溯源组织。"
  },
  {
    "id": "iso",
    "term": "ISO",
    "fullName": "International Organization for Standardization",
    "nameCn": "国际标准化组织",
    "cat": "国际标准组织",
    "def": "制定跨国通用技术与管理标准的权威机构（如 ISO 27001 信息安全管理、ISO 20022 金融金融信息报文等）。",
    "relevance": "银行核心架构合规认证与跨境清算报文标准化的法定遵循基石。"
  },
  {
    "id": "jtbd",
    "term": "JTBD",
    "fullName": "Jobs-to-be-Done Theory",
    "nameCn": "待办任务理论",
    "cat": "需求分析方法论",
    "def": "关注客户在特定场景下“雇用”某产品想要达成的根本目标，指导金融科技创新场景的精准痛点锚定。",
    "relevance": "前沿技术在对客服务与客户经营中心商业化变现场景挖掘的需求分析工具。"
  },
  {
    "id": "kyc",
    "term": "KYC",
    "fullName": "Know Your Customer",
    "nameCn": "了解你的客户（客户尽职调查）",
    "cat": "银行业务与合规",
    "def": "银行对客开户、交易监控及反洗钱合规的关键防线，当前加速融合多模态生物识别与去中心凭证实现秒级核验。",
    "relevance": "银行对客风控第一道防线，数智化改造直接关联客户转化率与欺诈防御力。"
  },
  {
    "id": "lcap",
    "term": "LCAP",
    "fullName": "Low-Code Application Platform",
    "nameCn": "低代码应用开发平台",
    "cat": "企业级研发架构",
    "def": "基于模型驱动设计与可视化拖拽，快速构建企业级业务系统的敏捷技术平台，驱动业务敏态敏捷交付。",
    "relevance": "非核心管理支持流程与分支行业务创新的敏捷交付引擎。"
  },
  {
    "id": "llm",
    "term": "LLM",
    "fullName": "Large Language Model",
    "nameCn": "大语言模型",
    "cat": "人工智能",
    "def": "基于海量无标注语料预训练的百亿至万亿级参数深度学习模型（如 GPT、Claude、DeepSeek），具备强大的语言理解与泛化推理能力。",
    "relevance": "全行数智化转型的核心认知底座与生产力重构引擎。"
  },
  {
    "id": "llmops",
    "term": "LLMOps",
    "fullName": "Large Language Model Operations",
    "nameCn": "大语言模型运营工程",
    "cat": "人工智能工程",
    "def": "大模型全生命周期运营工程体系，涵盖模型提示词工程、微调训练、评测对齐、推理加速与实时安全护栏。",
    "relevance": "将基础大模型工程化转化为企业级可靠生产力工具的工业化流水线。"
  },
  {
    "id": "mas",
    "term": "MAS",
    "fullName": "Multi-Agent Systems",
    "nameCn": "多智能体系统",
    "cat": "人工智能",
    "def": "由多个具备独立角色定位、规划能力与工具调用权限的 AI Agent 组成，通过分工协同完成复杂端到端金融任务的系统。",
    "relevance": "突破单一模型推理瓶颈、实现自主复杂业务流自动流转的关键架构。"
  },
  {
    "id": "mcp",
    "term": "MCP",
    "fullName": "Model Context Protocol",
    "nameCn": "模型上下文协议",
    "cat": "人工智能生态",
    "def": "Anthropic 发起制定的开放标准协议，为大语言模型安全、标准化连接本地/云端数据源、业务工具和企业系统提供通用桥梁。",
    "relevance": "解决银行内部知识孤岛与业务系统向大模型开放标准化的未来关键连接技术。"
  },
  {
    "id": "mpc",
    "term": "MPC",
    "fullName": "Secure Multi-Party Computation",
    "nameCn": "安全多方计算",
    "cat": "密码学与隐私计算",
    "def": "允许多个互不信任的参与方在不泄露各自私有输入明文的前提下，协同计算关于其输入的公共函数输出结果的密码学技术。",
    "relevance": "跨金融机构联合黑名单核验、政银数据要素联合建模的核心隐私底座。"
  },
  {
    "id": "nist",
    "term": "NIST",
    "fullName": "National Institute of Standards and Technology",
    "nameCn": "美国国家标准与技术研究院",
    "cat": "标准组织与国家机构",
    "def": "主导制定全球网络安全框架（CSF）、密码评估标准（FIPS）及后量子密码学（PQC）标准算法的权威机构。",
    "relevance": "其公布的 PQC 算法标准（ML-KEM/ML-DSA）是全行后量子密码迁移的业界基准。"
  },
  {
    "id": "opentelemetry",
    "term": "OpenTelemetry",
    "fullName": "OpenTelemetry Observability Framework",
    "nameCn": "云原生统一可观测性框架",
    "cat": "云原生与运维工程",
    "def": "CNCF 顶级开源标准项目，提供跨语言、厂商中立的分布式链路追踪（Traces）、指标（Metrics）与日志（Logs）统一采集规范。",
    "relevance": "彻底终结监控工具割裂、实现全链路端到端透明监控与故障秒级定位的标准框架。"
  },
  {
    "id": "owasp",
    "term": "OWASP",
    "fullName": "Open Worldwide Application Security Project",
    "nameCn": "开放式全球应用程序安全项目",
    "cat": "应用安全标准",
    "def": "致力于提高软件安全性的全球非营利组织，其发布的 Web Top 10 与 LLM Top 10 安全风险是安全防御基线。",
    "relevance": "开发安全生命周期规范制定与大模型应用上线安全测试的标准指南。"
  },
  {
    "id": "pestel",
    "term": "PESTEL",
    "fullName": "PESTEL Macro-Environmental Analysis",
    "nameCn": "宏观环境六维研判模型",
    "cat": "战略研判工具",
    "def": "从政治(P)、经济(E)、社会(S)、技术(T)、环境(E)、法律(L)六大宏观维度全面研判外部环境对金融科技演进的深远影响。",
    "relevance": "全行金融科技中长期战略规划与前沿研判宏观定调的基础工具。"
  },
  {
    "id": "pets",
    "term": "PETs",
    "fullName": "Privacy-Enhancing Technologies",
    "nameCn": "隐私增强计算技术体系",
    "cat": "数据安全与要素",
    "def": "统指保护数据要素全生命周期隐私与安全的技术集群，涵盖多方安全计算、联邦学习、全同态加密与机密计算等。",
    "relevance": "数据要素市场化流通与安全合规释放数据资产乘数效应的核心技术底座。"
  },
  {
    "id": "poc",
    "term": "PoC",
    "fullName": "Proof of Concept",
    "nameCn": "概念验证 / 技术原型验证",
    "cat": "研发与创新管理",
    "def": "在引入全新技术前，针对关键性能指标与核心工程假设在沙盒受控环境开展的小规模可行性实测验证。",
    "relevance": "论证层前沿技术由理论研究走向生产级选型的必经关键门禁。"
  },
  {
    "id": "pqa",
    "term": "PQA",
    "fullName": "Post-Quantum Authentication",
    "nameCn": "后量子身份认证",
    "cat": "前沿安全与密码",
    "def": "基于抗量子计算破解的非对称数字签名算法体系，确保量子计算时代网银交易凭证与数字签名的不可伪造。",
    "relevance": "未来手机银行移动证书、智能合约与网银认证体系抗量子升级的核心防线。"
  },
  {
    "id": "pqc",
    "term": "PQC",
    "fullName": "Post-Quantum Cryptography",
    "nameCn": "后量子密码学",
    "cat": "前沿安全与密码",
    "def": "能够抵抗未来通用量子计算机（Shor 算法）攻击的新型数学密码算法（如格密码、基于哈希签名等）。",
    "relevance": "金融核心交易数据“先窃听后解密”威胁下的战略级升级方向。"
  },
  {
    "id": "qkd",
    "term": "QKD",
    "fullName": "Quantum Key Distribution",
    "nameCn": "量子密钥分发 / 量子保密通信",
    "cat": "前沿安全与物理",
    "def": "利用量子力学海森堡测不准原理与不可克隆定理实现的物理层无条件安全密钥协商机制，具备窃听必被发现特性。",
    "relevance": "同城双活与异地灾备数据中心骨干网络跨机房高等级数据同步的终极安全通道。"
  },
  {
    "id": "rag",
    "term": "RAG",
    "fullName": "Retrieval-Augmented Generation",
    "nameCn": "检索增强生成",
    "cat": "人工智能",
    "def": "在模型推理时从外部经过验证的私域知识库动态检索相关上下文并注入 Prompt，有效抑制大模型事实幻觉。",
    "relevance": "信贷制度智能问答、财报研报结构化知识检索的标准化主流架构。"
  },
  {
    "id": "regtech",
    "term": "RegTech",
    "fullName": "Regulatory Technology",
    "nameCn": "监管科技",
    "cat": "金融科技与合规",
    "def": "金融机构利用云计算、大数据与人工智能等现代技术，实现监管合规要求自动化、报送标准化与跨期合规风险前置管控。",
    "relevance": "大幅压降监管报送差错率与多头报送人工成本的合规科技利器。"
  },
  {
    "id": "rpa",
    "term": "RPA",
    "fullName": "Robotic Process Automation",
    "nameCn": "机器人流程自动化",
    "cat": "业务自动化技术",
    "def": "通过软件机器人模拟人类在计算机界面上的规则操作，低侵入式打通传统跨系统“数据孤岛”而无需重构底层代码。",
    "relevance": "运营清算、财务对账与批量数据搬运的核心提效工具。"
  },
  {
    "id": "rsa",
    "term": "RSA",
    "fullName": "Rivest-Shamir-Adleman Cryptosystem",
    "nameCn": "传统 RSA 公钥密码体系",
    "cat": "经典密码体系",
    "def": "基于大整数质因数分解难题的经典公钥加密算法，广泛用于网银 SSL/TLS 证书，当前面临量子计算破译威胁。",
    "relevance": "当前金融基础设施的加密基石，需逐步启动向后量子密码算法的平滑迁移。"
  },
  {
    "id": "rwa",
    "term": "RWA",
    "fullName": "Real World Assets",
    "nameCn": "真实世界资产代币化",
    "cat": "Web3与数字资产",
    "def": "将国债、票据、供应链应收账款等实体资产转化为区块链上的可编程数字代币凭证，提升结算自动化与流动性。",
    "relevance": "跨境贸易金融结算、数字债券发行与新型资产流动性池建设的前沿探索。"
  },
  {
    "id": "sbom",
    "term": "SBOM",
    "fullName": "Software Bill of Materials",
    "nameCn": "软件物料清单",
    "cat": "软件供应链安全",
    "def": "软件制品中所有第三方开源组件、依赖拓扑与许可证形式化元数据清册（如 SPDX、CycloneDX 标准）。",
    "relevance": "实现开源组件漏洞（如 Log4j 级别漏洞）分钟级精准定损与合规追溯的核心工具。"
  },
  {
    "id": "slm",
    "term": "SLM",
    "fullName": "Small Language Model",
    "nameCn": "轻量小语言模型 / 端侧模型",
    "cat": "人工智能",
    "def": "参数量在 1B～7B 的高能效语言模型，经知识蒸馏后可离线部署于手机终端或边缘节点，具备超低延迟与数据不出域优势。",
    "relevance": "手机银行端侧反欺诈、离线合规巡检与端侧隐私计算的高效载体。"
  },
  {
    "id": "spdx",
    "term": "SPDX",
    "fullName": "Software Package Data Exchange",
    "nameCn": "软件包数据交换标准",
    "cat": "供应链安全",
    "def": "Linux 基金会制定并成为 ISO/IEC 5962 的软件物料清单国际规范，用于以机器可读格式准确传递依赖与许可证信息。",
    "relevance": "与国际接轨的软件供应链安全标准化审计格式。"
  },
  {
    "id": "suptech",
    "term": "SupTech",
    "fullName": "Supervisory Technology",
    "nameCn": "监管机构科技",
    "cat": "金融监管与合规",
    "def": "金融监管当局用于监测系统性金融风险、自动化核查机构报送数据质量及市场异常交易模式的数字化前沿技术体系。",
    "relevance": "推动银行风控指标与监管穿透式监测直接机器对齐的前沿演进方向。"
  },
  {
    "id": "swift",
    "term": "SWIFT",
    "fullName": "Society for Worldwide Interbank Financial Telecommunication",
    "nameCn": "环球银行金融电信协会",
    "cat": "金融基础设施",
    "def": "全球最重要的金融报文通信系统网络，当前正积极推进 ISO 20022 统一数据标准及央行数字货币跨链互联试点。",
    "relevance": "银行国际结算业务命脉，其代币化与跨链沙盒试验直接影响跨境业务演进。"
  },
  {
    "id": "swot",
    "term": "SWOT",
    "fullName": "Strengths, Weaknesses, Opportunities, Threats",
    "nameCn": "态势分析法",
    "cat": "战略研判工具",
    "def": "综合评估技术自身优势(S)、劣势(W)与外部机会(O)、威胁(T)的经典战略分析模型，指导资源配置。",
    "relevance": "全行 36 项重点前沿技术梯队归类与取舍决策的标准评估工具。"
  },
  {
    "id": "tee",
    "term": "TEE",
    "fullName": "Trusted Execution Environment",
    "nameCn": "可信执行环境 / 机密计算",
    "cat": "前沿安全与计算",
    "def": "CPU 硬件层开辟的独立安全隔离飞地（如 Intel SGX、ARM TrustZone），保障高敏数据在内存计算态免遭未授权窃取。",
    "relevance": "联合风控建模、大模型私有数据推理与生物识别核身的高等级硬件防护屏障。"
  },
  {
    "id": "togaf",
    "term": "TOGAF",
    "fullName": "The Open Group Architecture Framework",
    "nameCn": "开放组体系架构框架",
    "cat": "企业架构方法论",
    "def": "全球通用的企业架构框架，提供业务架构、数据架构、应用架构与技术架构（BDAT）的端到端演进方法论。",
    "relevance": "指导全行企架十大中心规划与前沿技术落位图谱绘制的方法论基石。"
  },
  {
    "id": "trl",
    "term": "TRL",
    "fullName": "Technology Readiness Level",
    "nameCn": "技术成熟度等级（1-9级）",
    "cat": "成熟度评估工具",
    "def": "起源于 NASA、被国家部委广泛采纳的技术成熟度分级标尺，客观界定技术从基础机理探索到规模化工程落地的成熟阶段。",
    "relevance": "前沿技术储备库六维评级中“技术成熟度”打分的量化锚点。"
  },
  {
    "id": "vc",
    "term": "VC",
    "fullName": "Verifiable Credentials",
    "nameCn": "可验证凭证标准",
    "cat": "区块链与数字身份",
    "def": "W3C 制定的密码学数字证明标准，支持发行方数字签名与持有方零知识证明（ZKP）最小化披露。",
    "relevance": "企业数字化供应链资质核验、个人征信脱敏共享的标准化信任载体。"
  },
  {
    "id": "vector-db",
    "term": "Vector DB",
    "fullName": "Vector Database",
    "nameCn": "向量数据库",
    "cat": "数据架构与AI",
    "def": "专用于对高维稠密嵌入向量实施高性能近似最近邻（ANN）相似度检索的新型数据库，是大模型外挂知识库核心组件。",
    "relevance": "支撑企业级海量非结构化文档毫秒级语义检索与私域 RAG 构建的关键底座。"
  },
  {
    "id": "wasi",
    "term": "WASI",
    "fullName": "WebAssembly System Interface",
    "nameCn": "WebAssembly 系统接口标准",
    "cat": "底层运行时与跨平台",
    "def": "为 WebAssembly 在浏览器外部运行制定的安全系统接口规范，提供模块化文件访问、网络与系统调用的安全沙箱。",
    "relevance": "金融插件化敏捷扩展、轻量化无服务器 Serverless 计算的安全隔离基础。"
  },
  {
    "id": "wasm",
    "term": "WASM",
    "fullName": "WebAssembly",
    "nameCn": "WebAssembly 二进制格式",
    "cat": "底层运行时与计算",
    "def": "W3C 推荐的跨平台便携式低级二进制指令集，具备接近原生 C/Rust 的执行性能与强安全内存隔离沙箱环境。",
    "relevance": "跨平台高频计算模块加密运行与微前端核心算法极速执行的底座。"
  },
  {
    "id": "zero-trust",
    "term": "Zero Trust",
    "fullName": "Zero Trust Architecture",
    "nameCn": "零信任安全架构",
    "cat": "网络与信息安全",
    "def": "以“持续验证、永不信任”为原则的安全架构，打破传统网络内外边界假设，对所有访问主体、设备与会话实施动态细粒度鉴权。",
    "relevance": "全行远程安全办公、多云混合环境与开放银行 API 边界防御的战略架构。"
  }
];

  window.DATA = {
    terms: TERMS,
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