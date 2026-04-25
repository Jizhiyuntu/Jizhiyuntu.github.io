(function () {
function initHeroCanvas({ heroAttractionSelectors }) {
  const canvas = document.getElementById("atlas-canvas");
  if (!canvas) return;

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
}

window.SerenAIHeroCanvas = { initHeroCanvas };
}());
