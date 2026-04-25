(function () {
const { archContent, consoleModes, decisionContent, detailContent, labContent, visionPhrases } = window.SerenAIContent;

const heroAttractionSelectors = ".hero-command a, .hero-metrics div, .intelligence-strip span";

const reactiveSelectors = [
  ".button",
  ".header-cta",
  ".hero-command a",
  ".service-card",
  ".vision-grid article",
  ".case-card",
  ".case-card button",
  ".person-card",
  ".contact-console",
  ".arch-grid",
  ".arch-node",
  ".model-router-demo span",
  ".model-router-demo strong",
  ".api-endpoint",
  ".hero-metrics div",
  ".console-tabs button",
  ".ai-lab button",
  ".vision-scope",
  ".ai-decision",
  ".intelligence-strip span",
  ".lab-telemetry span",
];

function initInteractions() {
  initHeader();
  initScrollProgress();
  initCursorGlow();
  initReactiveHover();
  initDetailModal();
  initConsoleModes();
  initSmartStats();
  initCognitiveRibbon();
  initLabTabs();
  initServiceCards();
  initVisionScope();
  initDecisionLoop();
  initNavigationState();
  initVisionLine();
  initArchitecture();
  initReveal();
}

function initScrollProgress() {
  const progress = document.querySelector("[data-scroll-progress]");
  const percent = document.querySelector("[data-scroll-percent]");
  if (!progress || !percent) return;

  const update = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const value = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    progress.style.setProperty("--scroll-progress", `${value * 100}%`);
    percent.textContent = `${String(Math.round(value * 100)).padStart(2, "0")}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

function initCursorGlow() {
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
  });
}

function initReactiveHover() {
  document.querySelectorAll(reactiveSelectors.join(",")).forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      element.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}

function initDetailModal() {
  const modal = document.querySelector("[data-modal]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalKicker = document.querySelector("[data-modal-kicker]");
  const modalCopy = document.querySelector("[data-modal-copy]");
  const modalList = document.querySelector("[data-modal-list]");

  if (!modal || !modalTitle || !modalKicker || !modalCopy || !modalList) return;

  const openDetail = (key) => {
    const detail = detailContent[key];
    if (!detail) return;

    modalKicker.textContent = detail.kicker;
    modalTitle.textContent = detail.title;
    modalCopy.textContent = detail.copy;
    modalList.innerHTML = detail.items.map((item) => `<li>${item}</li>`).join("");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeDetail = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

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
}

function initConsoleModes() {
  const buttons = document.querySelectorAll("[data-console-mode]");
  const kicker = document.querySelector("[data-console-kicker]");
  const copy = document.querySelector("[data-console-copy]");
  const grid = document.querySelector(".console-grid");
  const values = {
    tasks: document.querySelector("[data-console-value='tasks']"),
    nodes: document.querySelector("[data-console-value='nodes']"),
    index: document.querySelector("[data-console-value='index']"),
  };

  if (!buttons.length || !kicker || !copy || !grid) return;

  const setMode = (mode) => {
    const detail = consoleModes[mode];
    if (!detail) return;

    buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.consoleMode === mode));
    kicker.textContent = detail.kicker;
    copy.textContent = detail.copy;
    grid.classList.add("is-refreshing");
    values.tasks.textContent = randomInt(...detail.ranges.tasks);
    values.nodes.textContent = randomInt(...detail.ranges.nodes);
    values.index.textContent = `${randomFloat(...detail.ranges.index, 1)}M`;
    window.setTimeout(() => grid.classList.remove("is-refreshing"), 260);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.consoleMode));
  });
  setMode("route");
}

function initSmartStats() {
  const agents = document.querySelector("[data-smart-stat='agents']");
  const tokens = document.querySelector("[data-smart-stat='tokens']");
  const confidence = document.querySelector("[data-smart-stat='confidence']");
  const quality = document.querySelector("[data-lab-stat='quality']");
  const latency = document.querySelector("[data-lab-stat='latency']");
  const saving = document.querySelector("[data-lab-stat='saving']");

  const render = () => {
    setText(agents, randomInt(6, 14));
    setText(tokens, randomInt(820, 2400).toLocaleString("en-US"));
    setText(confidence, `${randomFloat(92.4, 99.2, 1)}%`);
    setText(quality, randomFloat(87.5, 96.8, 1));
    setText(latency, randomInt(38, 116));
    setText(saving, `${randomInt(18, 42)}%`);
  };

  render();
  window.setInterval(render, 5200);
}

function initCognitiveRibbon() {
  const steps = document.querySelectorAll(".cognitive-ribbon span");
  let index = 0;

  if (!steps.length) return;

  const render = () => {
    steps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex === index);
    });
    index = (index + 1) % steps.length;
  };

  render();
  window.setInterval(render, 1800);
}

function initLabTabs() {
  const buttons = document.querySelectorAll("[data-lab-tab]");
  const panel = document.querySelector(".lab-panel");
  const kicker = document.querySelector("[data-lab-kicker]");
  const title = document.querySelector("[data-lab-title]");
  const copy = document.querySelector("[data-lab-copy]");

  if (!buttons.length || !panel || !kicker || !title || !copy) return;

  const setTab = (tab) => {
    const detail = labContent[tab];
    if (!detail) return;

    buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.labTab === tab));
    panel.classList.add("is-switching");
    window.setTimeout(() => {
      kicker.textContent = detail.kicker;
      title.textContent = detail.title;
      copy.textContent = detail.copy;
      panel.classList.remove("is-switching");
    }, 120);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.labTab));
  });
}

function initServiceCards() {
  const cards = document.querySelectorAll(".service-card");
  const clear = () => {
    cards.forEach((item) => item.classList.remove("is-active"));
  };

  cards.forEach((card) => {
    const activate = () => {
      cards.forEach((item) => item.classList.toggle("is-active", item === card));
    };
    card.addEventListener("pointerenter", activate);
    card.addEventListener("pointerleave", clear);
    card.addEventListener("focus", activate);
    card.addEventListener("blur", clear);
  });
}

function initVisionScope() {
  const scopeScore = document.querySelector("[data-scope-score]");
  const ranges = [
    [96.2, 99.1],
    [94.8, 98.3],
    [93.5, 97.6],
    [95.4, 98.8],
  ];

  document.querySelectorAll(".vision-grid article").forEach((card, index) => {
    card.addEventListener("pointerenter", () => {
      if (scopeScore) {
        const range = ranges[index] || ranges[0];
        scopeScore.textContent = `${randomFloat(...range, 1)}%`;
      }
    });
  });

  if (scopeScore) {
    scopeScore.textContent = `${randomFloat(96.2, 99.1, 1)}%`;
  }
}

function initDecisionLoop() {
  const title = document.querySelector("[data-decision-title]");
  const copy = document.querySelector("[data-decision-copy]");
  const panel = document.querySelector(".ai-decision");
  let index = randomInt(0, decisionContent.length - 1);

  if (!title || !copy || !panel || !decisionContent.length) return;

  const render = () => {
    const decision = decisionContent[index];
    panel.classList.add("is-thinking");
    window.setTimeout(() => {
      title.textContent = decision.title;
      copy.textContent = decision.copy;
      panel.classList.remove("is-thinking");
      index = (index + 1) % decisionContent.length;
    }, 180);
  };

  render();
  window.setInterval(render, 4400);
}

function initNavigationState() {
  const navLinks = document.querySelectorAll(".nav a");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => navObserver.observe(section));
}

function initVisionLine() {
  const visionLine = document.querySelector("[data-vision-line]");
  let visionIndex = 0;

  if (!visionLine) return;

  window.setInterval(() => {
    visionLine.classList.add("is-switching");
    window.setTimeout(() => {
      visionIndex = (visionIndex + 1) % visionPhrases.length;
      visionLine.textContent = visionPhrases[visionIndex];
      visionLine.classList.remove("is-switching");
    }, 220);
  }, 2800);
}

function initArchitecture() {
  const archNodes = document.querySelectorAll("[data-arch]");
  const archKicker = document.querySelector("[data-arch-kicker]");
  const archTitle = document.querySelector("[data-arch-title]");
  const archCopy = document.querySelector("[data-arch-copy]");
  const archInsight = document.querySelector(".arch-insight");

  if (!archNodes.length || !archKicker || !archTitle || !archCopy || !archInsight) return;

  const setArchInsight = (key) => {
    const detail = archContent[key];
    if (!detail) return;

    archNodes.forEach((node) => node.classList.toggle("is-active", node.dataset.arch === key));
    archKicker.textContent = detail.kicker;
    archTitle.textContent = detail.title;
    archCopy.textContent = detail.copy;
    archInsight.classList.add("is-active");
  };

  archNodes.forEach((node) => {
    node.addEventListener("pointerenter", () => setArchInsight(node.dataset.arch));
    node.addEventListener("focus", () => setArchInsight(node.dataset.arch));
  });
}

function initReveal() {
  const revealElements = document.querySelectorAll(
    ".section, .split-section, .service-card, .vision-grid article, .case-card, .person-card, .arch-node, .service-orbit, .vision-scope, .lab-panel, .factory-visual"
  );

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

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
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, digits = 1) {
  return Number((Math.random() * (max - min) + min).toFixed(digits));
}

function setText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

window.SerenAIInteractions = { heroAttractionSelectors, initInteractions };
}());
