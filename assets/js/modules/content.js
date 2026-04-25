(function () {
const detailContent = {
  training: {
    kicker: "LLM Services",
    title: "定制化训练",
    copy: "基于企业数据、行业语料和业务流程，训练更贴近真实场景的专属模型。",
    items: ["领域语料整理与数据清洗", "指令微调、偏好优化与效果评测", "面向客服、知识库、内容生成等场景适配"],
  },
  deployment: {
    kicker: "LLM Services",
    title: "模型部署",
    copy: "将模型部署到客户服务器、私有云或混合云环境，形成稳定可控的推理服务。",
    items: ["推理服务封装与 GPU 资源调优", "权限隔离、日志审计与服务监控", "支持本地化、云端和混合部署"],
  },
  api: {
    kicker: "API Store",
    title: "API 聚合店铺",
    copy: "把多家模型和工具 API 统一成一个入口，降低接入成本，支持对内调用和对外售卖。",
    items: ["统一鉴权、额度、计费和密钥管理", "按速度、成本和质量进行模型路由", "兼容文本、图像、多模态等接口"],
  },
  factory: {
    kicker: "AI Factory",
    title: "AI 工厂",
    copy: "把服务器集群变成持续生产 API 的智能基础设施，支撑业务系统和外部服务。",
    items: ["模型接入、服务编排与自动化运维", "监控告警、评测回归与容量扩展", "提供完整技术栈咨询与工程交付"],
  },
  segmentation: {
    kicker: "Visual AI",
    title: "图像分割",
    copy: "面向开放场景、工业图像和医学影像的目标分割与区域理解。",
    items: ["语义分割、实例分割、弱监督分割", "开放类别目标分割与万物分割", "医学影像与复杂场景目标解析"],
  },
  inspection: {
    kicker: "Visual AI",
    title: "工业质检",
    copy: "面向生产线、轨道、半导体等场景，构建缺陷识别和异常检测能力。",
    items: ["缺陷检测、瑕疵识别、异常预警", "小样本质检模型定制", "检测结果可视化与业务系统集成"],
  },
  vision3d: {
    kicker: "Visual AI",
    title: "3D 视觉",
    copy: "围绕三维重建、空间理解和视觉测量，服务高精度工程场景。",
    items: ["3D 场景理解与空间定位", "三维重建与结构分析", "面向工业和医疗场景的视觉测量"],
  },
  document: {
    kicker: "Visual AI",
    title: "文档与场景理解",
    copy: "结合 OCR、版面解析和多模态模型，从图像与文档中提取结构化信息。",
    items: ["广告 OCR 检测与文本识别", "票据、文档、版面结构解析", "图文多模态理解与知识抽取"],
  },
  "case-huawei-seg": {
    kicker: "Case / Visual AI",
    title: "华为 · 万物分割",
    copy: "围绕开放场景中的通用目标分割与视觉理解需求，提供视觉 AI 算法能力支持。",
    items: ["开放类别目标识别与区域分割", "复杂场景下的视觉理解能力建设", "面向后续业务系统的算法接口化"],
  },
  "case-huawei-ocr": {
    kicker: "Case / OCR",
    title: "华为 · 广告 OCR 检测",
    copy: "面向广告场景中的文本检测、识别和内容结构化需求，提供 OCR 与视觉分析能力。",
    items: ["广告画面文本检测与识别", "图文内容结构化抽取", "辅助内容审核与合规分析流程"],
  },
  "case-rail": {
    kicker: "Case / Inspection",
    title: "某铁路部门 · 铁轨质检",
    copy: "面向铁路巡检场景，建设轨道缺陷识别与异常检测能力，辅助提升巡检效率。",
    items: ["轨道图像缺陷检测", "巡检数据异常识别", "检测结果可视化与业务系统对接"],
  },
  "case-semi": {
    kicker: "Case / Inspection",
    title: "某半导体公司 · 生产质检",
    copy: "面向半导体生产流程中的高精度质检需求，提供视觉检测与异常识别技术支持。",
    items: ["生产图像缺陷识别", "少样本异常检测模型适配", "质检流程算法化与工程集成"],
  },
  "case-juxiang": {
    kicker: "Case / LLM Services",
    title: "上海矩向科技有限公司 · 技术服务",
    copy: "提供大模型相关技术服务，支持模型能力接入、服务编排与业务系统集成。",
    items: ["大模型 API 接入与聚合", "服务编排与接口封装", "工程化部署与技术支持"],
  },
  "case-api-aggregation": {
    kicker: "Case / API Factory",
    title: "大模型 API 聚合、服务编排与技术支持",
    copy: "将多模型 API 汇聚为统一入口，形成可管理、可监控、可扩展的模型服务层。",
    items: ["统一鉴权、计费、限流与额度管理", "多模型路由与服务编排", "监控告警与稳定性优化"],
  },
  "case-bio": {
    kicker: "Case / Model Customization",
    title: "某生物公司 · 大模型定制化服务",
    copy: "围绕生物领域专业知识和业务流程，提供大模型定制化与应用落地服务。",
    items: ["领域数据整理与知识注入", "专属模型训练与效果评测", "面向业务场景的应用接口交付"],
  },
};

const consoleModes = {
  route: {
    kicker: "Latency Optimizer",
    copy: "按质量、成本与时延动态选择模型通道，保持企业应用稳定响应。",
    ranges: {
      tasks: [8, 18],
      nodes: [28, 64],
      index: [6.4, 18.8],
    },
  },
  train: {
    kicker: "Fine-tuning Loop",
    copy: "清洗语料、微调模型、回归评测，将企业知识转化为可调用能力。",
    ranges: {
      tasks: [4, 12],
      nodes: [16, 48],
      index: [2.4, 9.7],
    },
  },
  vision: {
    kicker: "Vision Inference",
    copy: "分割、OCR 与质检算法统一接入 API 工厂，输出结构化视觉结果。",
    ranges: {
      tasks: [12, 28],
      nodes: [32, 72],
      index: [8.8, 24.6],
    },
  },
};

const decisionContent = [
  {
    title: "切换到低时延推理通道",
    copy: "检测到交互请求密度上升，优先选择响应速度更稳定的模型组合。",
  },
  {
    title: "启用视觉与文本联合理解",
    copy: "当前任务包含图像区域与业务文本，系统正在合并多模态上下文。",
  },
  {
    title: "保持私有知识库优先检索",
    copy: "命中企业领域语料，回答链路优先引用内部索引并保留审计记录。",
  },
  {
    title: "执行成本与质量双目标路由",
    copy: "在满足置信度阈值的前提下，自动选择更经济的模型服务路径。",
  },
];

const labContent = {
  private: {
    kicker: "Private Model",
    title: "企业专属模型能力",
    copy: "围绕企业数据、行业流程与权限边界，完成训练、评测、部署和调用闭环。",
  },
  router: {
    kicker: "AI Router",
    title: "多模型统一调度",
    copy: "聚合自有、开源与第三方模型，按成本、速度、质量和权限策略进行智能路由。",
  },
  vision: {
    kicker: "Visual Intelligence",
    title: "视觉算法进入业务现场",
    copy: "把分割、检测、OCR、3D 视觉封装为稳定接口，接入产线、巡检和内容理解流程。",
  },
  ops: {
    kicker: "Model Ops",
    title: "持续评测与运营",
    copy: "通过日志、监控、告警、回归评测和容量管理，让 AI 服务保持可维护和可增长。",
  },
};

const visionPhrases = [
  "让模型成为可运营的智能基础设施",
  "让视觉 AI 理解真实产业现场",
  "让算法、数据与工程形成闭环",
  "让企业拥有持续进化的智能能力",
];

const archContent = {
  data: {
    kicker: "Data Layer",
    title: "企业数据",
    copy: "接入业务数据、图像数据和知识资料，为模型训练、视觉算法和 API 服务提供可信输入。",
  },
  llm: {
    kicker: "LLM Channel",
    title: "大模型服务",
    copy: "覆盖定制训练、私有化部署、推理服务和模型评测，形成企业自己的大模型能力。",
  },
  api: {
    kicker: "API Factory",
    title: "API 工厂",
    copy: "统一聚合模型能力，完成鉴权、路由、计费、监控和服务编排，对内支撑业务，对外形成服务。",
  },
  vision: {
    kicker: "Vision Channel",
    title: "视觉 AI 服务",
    copy: "面向分割、OCR、工业质检、3D 视觉等场景，提供可落地的视觉算法与工程系统。",
  },
  delivery: {
    kicker: "Engineering",
    title: "技术交付",
    copy: "从方案设计、算法开发到部署运维，提供完整技术服务，让 AI 能力稳定进入生产环境。",
  },
};

window.SerenAIContent = { detailContent, consoleModes, decisionContent, labContent, visionPhrases, archContent };
}());
