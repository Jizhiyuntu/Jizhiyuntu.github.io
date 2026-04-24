const header = document.querySelector("[data-header]");
const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const reactiveSelectors = [
  ".button",
  ".header-cta",
  ".service-card",
  ".vision-grid article",
  ".case-card",
  ".case-card button",
  ".person-card",
  ".contact-console",
  ".arch-grid",
  ".arch-node",
  ".pipeline span",
  ".hero-metrics div",
];
const heroAttractionSelectors = ".hero-actions a, .hero-actions .button, .hero-metrics div";

document.querySelectorAll(reactiveSelectors.join(",")).forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

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

const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalKicker = document.querySelector("[data-modal-kicker]");
const modalCopy = document.querySelector("[data-modal-copy]");
const modalList = document.querySelector("[data-modal-list]");

function openDetail(key) {
  const detail = detailContent[key];
  if (!detail) return;

  modalKicker.textContent = detail.kicker;
  modalTitle.textContent = detail.title;
  modalCopy.textContent = detail.copy;
  modalList.innerHTML = detail.items.map((item) => `<li>${item}</li>`).join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeDetail() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-detail]").forEach((element) => {
  element.addEventListener("click", () => openDetail(element.dataset.detail));
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail(element.dataset.detail);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeDetail);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetail();
  }
});

const visionLine = document.querySelector("[data-vision-line]");
const visionPhrases = [
  "让模型成为可运营的智能基础设施",
  "让视觉 AI 理解真实产业现场",
  "让算法、数据与工程形成闭环",
  "让企业拥有持续进化的智能能力",
];
let visionIndex = 0;

if (visionLine) {
  window.setInterval(() => {
    visionLine.classList.add("is-switching");
    window.setTimeout(() => {
      visionIndex = (visionIndex + 1) % visionPhrases.length;
      visionLine.textContent = visionPhrases[visionIndex];
      visionLine.classList.remove("is-switching");
    }, 220);
  }, 2800);
}

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

const archNodes = document.querySelectorAll("[data-arch]");
const archKicker = document.querySelector("[data-arch-kicker]");
const archTitle = document.querySelector("[data-arch-title]");
const archCopy = document.querySelector("[data-arch-copy]");
const archInsight = document.querySelector(".arch-insight");

function setArchInsight(key) {
  const detail = archContent[key];
  if (!detail) return;
  archNodes.forEach((node) => node.classList.toggle("is-active", node.dataset.arch === key));
  archKicker.textContent = detail.kicker;
  archTitle.textContent = detail.title;
  archCopy.textContent = detail.copy;
  archInsight.classList.add("is-active");
}

archNodes.forEach((node) => {
  node.addEventListener("pointerenter", () => setArchInsight(node.dataset.arch));
  node.addEventListener("focus", () => setArchInsight(node.dataset.arch));
});

const revealElements = document.querySelectorAll(
  ".section, .split-section, .service-card, .vision-grid article, .case-card, .person-card, .arch-node"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
});

const canvas = document.getElementById("atlas-canvas");
const ctx = canvas.getContext("2d");
const pointer = { x: 0, y: 0, active: false, attract: false, targetX: 0, targetY: 0 };
let nodes = [];
let width = 0;
let height = 0;
let deviceScale = Math.min(window.devicePixelRatio || 1, 2);

function createNodes() {
  const count = Math.floor(Math.min(Math.max((width * height) / 6500, 190), 460));
  nodes = Array.from({ length: count }, (_, index) => ({
    homeX: Math.random() * width,
    homeY: Math.random() * height,
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: index % 9 === 0 ? 2.6 : 1.45,
    phase: Math.random() * Math.PI * 2,
  }));
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  deviceScale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * deviceScale);
  canvas.height = Math.floor(height * deviceScale);
  ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  createNodes();
}

function drawNode(node, time) {
  const glow = 0.55 + Math.sin(time * 0.002 + node.phase) * 0.25;
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(60, 230, 210, ${glow})`;
  ctx.fill();
}

function drawConnections() {
  const linkDistance = Math.min(Math.max(width / 11, 140), 205);
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < linkDistance) {
        const alpha = (1 - dist / linkDistance) * 0.22;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(143, 245, 179, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function updateNodes() {
  const homePull = 0.0011;

  nodes.forEach((node) => {
    node.vx += (node.homeX - node.x) * homePull;
    node.vy += (node.homeY - node.y) * homePull;

    if (pointer.attract) {
      const pullDx = pointer.targetX - node.x;
      const pullDy = pointer.targetY - node.y;
      const pullDistance = Math.max(Math.hypot(pullDx, pullDy), 1);

      if (pullDistance < 330) {
        const localForce = (1 - pullDistance / 330) * 0.026;
        node.vx += (pullDx / pullDistance) * localForce;
        node.vy += (pullDy / pullDistance) * localForce;
      }
    }

    if (pointer.active && !pointer.attract) {
      const dx = node.x - pointer.x;
      const dy = node.y - pointer.y;
      const dist = Math.max(Math.hypot(dx, dy), 1);
      if (dist < 240) {
        const force = (1 - dist / 240) * 0.032;
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
      }
    }

    node.vx += Math.sin(node.phase + performance.now() * 0.00038) * 0.0012;
    node.vy += Math.cos(node.phase + performance.now() * 0.00032) * 0.0012;
    node.vx *= 0.955;
    node.vy *= 0.955;
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;
  });
}

function drawAttractor(time = 0) {
  if (!pointer.attract) return;

  const radius = 42 + Math.sin(time * 0.006) * 5;
  const halo = ctx.createRadialGradient(pointer.targetX, pointer.targetY, 0, pointer.targetX, pointer.targetY, 150);
  halo.addColorStop(0, "rgba(60, 230, 210, 0.16)");
  halo.addColorStop(0.32, "rgba(255, 209, 102, 0.07)");
  halo.addColorStop(1, "rgba(60, 230, 210, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(pointer.targetX - 150, pointer.targetY - 150, 300, 300);

  ctx.beginPath();
  ctx.arc(pointer.targetX, pointer.targetY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(60, 230, 210, 0.42)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  nodes.forEach((node) => {
    const dist = Math.hypot(node.x - pointer.targetX, node.y - pointer.targetY);
    if (dist < 150) {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(pointer.targetX, pointer.targetY);
      ctx.strokeStyle = `rgba(255, 209, 102, ${(1 - dist / 150) * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
}

function draw(time = 0) {
  ctx.clearRect(0, 0, width, height);

  const halo = ctx.createRadialGradient(width * 0.7, height * 0.42, 0, width * 0.7, height * 0.42, width * 0.72);
  halo.addColorStop(0, "rgba(60, 230, 210, 0.2)");
  halo.addColorStop(0.38, "rgba(255, 209, 102, 0.08)");
  halo.addColorStop(1, "rgba(6, 17, 21, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  updateNodes();
  drawConnections();
  drawAttractor(time);
  nodes.forEach((node) => drawNode(node, time));

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resizeCanvas);
if ("ResizeObserver" in window) {
  new ResizeObserver(resizeCanvas).observe(canvas);
}
window.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
  pointer.active = true;

  const attractionTarget = event.target.closest(heroAttractionSelectors);
  if (attractionTarget) {
    const targetRect = attractionTarget.getBoundingClientRect();
    pointer.targetX = targetRect.left + targetRect.width / 2 - rect.left;
    pointer.targetY = targetRect.top + targetRect.height / 2 - rect.top;
    pointer.attract = true;
  } else {
    pointer.attract = false;
  }
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
  pointer.attract = false;
});

resizeCanvas();
requestAnimationFrame(draw);
