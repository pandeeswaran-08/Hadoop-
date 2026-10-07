// Black Hole Relativistic Canvas Renderer
// Simulates an Event Horizon, Photon Sphere, Gravitational Lensing, and Relativistic Accretion Disk

export interface RendererOptions {
  canvas: HTMLCanvasElement;
}

export interface BlackHoleRenderer {
  ready: Promise<void>;
  dispose: () => void;
}

interface Particle {
  r: number;          // Distance from singularity
  theta: number;      // Orbital angle
  speed: number;      // Orbital angular velocity
  size: number;       // Particle radius
  lum: number;        // Intrinsic luminosity
  z: number;          // Depth for 3D inclination
  radialSpeed: number;// Spiral drift towards event horizon
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

export function createRenderer({ canvas }: RendererOptions): BlackHoleRenderer {
  let isDisposed = false;
  let animId: number = 0;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    return {
      ready: Promise.resolve(),
      dispose: () => {},
    };
  }

  let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  // Accretion disk particles
  const particleCount = 1400;
  const particles: Particle[] = [];
  const minRadius = Math.min(width, height) * 0.12;
  const maxRadius = Math.min(width, height) * 0.46;

  for (let i = 0; i < particleCount; i++) {
    const rNorm = Math.pow(Math.random(), 0.65); // denser near photon ring
    const r = minRadius + rNorm * (maxRadius - minRadius);
    // Keplerian orbital velocity v proportional to 1 / sqrt(r) (Reduced for smooth, majestic pacing)
    const baseSpeed = (Math.sqrt(minRadius / r) * 0.014) + 0.0015;
    particles.push({
      r,
      theta: Math.random() * Math.PI * 2,
      speed: baseSpeed * (0.85 + Math.random() * 0.3),
      size: 0.6 + Math.random() * 1.8,
      lum: 0.4 + Math.random() * 0.6,
      z: (Math.random() - 0.5) * 28,
      radialSpeed: -0.015 - Math.random() * 0.035,
    });
  }

  // Background stars
  const starCount = 220;
  const stars: Star[] = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      size: 0.5 + Math.random() * 1.4,
      alpha: 0.2 + Math.random() * 0.7,
    });
  }

  const onMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    targetTiltX = ((mouseX - width / 2) / width) * 0.35;
    targetTiltY = ((mouseY - height / 2) / height) * 0.25;
  };

  const onResize = () => {
    if (isDisposed || !canvas.parentElement) return;
    width = canvas.parentElement.clientWidth || window.innerWidth;
    height = canvas.parentElement.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);

  let time = 0;

  const render = () => {
    if (isDisposed) return;
    animId = requestAnimationFrame(render);
    time += 0.007;

    currentTiltX += (targetTiltX - currentTiltX) * 0.05;
    currentTiltY += (targetTiltY - currentTiltY) * 0.05;

    const cx = width / 2;
    const cy = height / 2;
    const horizonR = Math.min(width, height) * 0.11;
    const photonSphereR = horizonR * 1.5;

    // Deep black cosmic void background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // 1. Draw gravitational lensing of background stars
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const dist = Math.hypot(s.x, s.y);
      if (dist < horizonR * 0.9) continue; // swallowed by event horizon

      // Gravitational light deflection formula (Einstein bending)
      const deflection = (photonSphereR * 25) / (dist + 30);
      const angle = Math.atan2(s.y, s.x);
      const bentDist = dist + deflection;
      const bx = Math.cos(angle) * bentDist;
      const by = Math.sin(angle) * bentDist;

      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * (0.8 + 0.2 * Math.sin(time * 2 + i))})`;
      ctx.beginPath();
      ctx.arc(bx, by, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Diffuse Gravitational Glow (Monochrome white/platinum outer corona)
    const coronaGrad = ctx.createRadialGradient(cx, cy, horizonR * 0.9, cx, cy, Math.min(width, height) * 0.48);
    coronaGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
    coronaGrad.addColorStop(0.15, "rgba(220, 220, 220, 0.25)");
    coronaGrad.addColorStop(0.4, "rgba(160, 160, 160, 0.08)");
    coronaGrad.addColorStop(0.8, "rgba(80, 80, 80, 0.02)");
    coronaGrad.addColorStop(1, "transparent");
    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(width, height) * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // 3. Render 3D Accretion Disk (Inclined Elliptical Orbit)
    const diskInclination = 0.38 + currentTiltY;
    const diskRotation = currentTiltX;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(diskRotation);

    // Sort particles into back-half (rendered behind black hole) and front-half
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.theta += p.speed;
      p.r += p.radialSpeed;
      if (p.r < horizonR * 1.05) {
        // Recycle swallowed particle to outer boundary
        p.r = maxRadius * (0.85 + Math.random() * 0.15);
      }

      // 3D projected coordinates on tilted accretion plane
      const cosTheta = Math.cos(p.theta);
      const sinTheta = Math.sin(p.theta);
      const px = p.r * cosTheta;
      const py = p.r * sinTheta * diskInclination + p.z;

      // Relativistic Doppler Beaming: Left side moves toward observer, highly amplified
      const dopplerBoost = 1.0 - sinTheta * 0.65;
      const alpha = Math.min(1, Math.max(0.08, p.lum * dopplerBoost * (1 - p.r / (maxRadius * 1.1))));

      // Behind the black hole event horizon check
      const distFromCenter = Math.hypot(px, py);
      const isBehindHorizon = sinTheta < 0 && distFromCenter < horizonR * 1.08;

      if (!isBehindHorizon) {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (dopplerBoost > 1 ? 1.25 : 0.9), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // 4. Photon Sphere (Intense, brilliant white ring around the Event Horizon)
    ctx.save();
    ctx.translate(cx, cy);
    const photonGrad = ctx.createRadialGradient(0, 0, horizonR * 0.95, 0, 0, photonSphereR * 1.15);
    photonGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    photonGrad.addColorStop(0.25, "rgba(255, 255, 255, 0.8)");
    photonGrad.addColorStop(0.6, "rgba(200, 200, 200, 0.35)");
    photonGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = photonGrad;
    ctx.beginPath();
    ctx.arc(0, 0, photonSphereR * 1.15, 0, Math.PI * 2);
    ctx.fill();

    // 5. Razor-thin brilliant white photon ring edge
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, horizonR * 1.04, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 6. Event Horizon (Pure Black Void Abyss)
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(0, 0, horizonR, 0, Math.PI * 2);
    ctx.fill();

    // 7. Secondary Gravitational Lensing Arc (Light bent around top of singularity)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, -horizonR * 0.3, horizonR * 1.35, horizonR * 0.45, 0, Math.PI, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  };

  animId = requestAnimationFrame(render);

  return {
    ready: Promise.resolve(),
    dispose: () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    },
  };
}
