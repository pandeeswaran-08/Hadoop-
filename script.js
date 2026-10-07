/**
 * Hadoop Architecture Seminar - 3D Interactive Controller
 * Features:
 * - Three.js 3D Big Data Cluster Canvas (Master & Worker nodes, particle data bus)
 * - 3D Tilt Card Physics with mouse tracking
 * - Interactive MapReduce Word Count Engine with animated stages
 * - YARN Step-by-Step Execution Flow Controller
 * - HDFS Rack Awareness & Fault Tolerance Simulator
 * - 3D Isometric Layer Exploder
 * - Fullscreen Seminar Presentation Mode (Keyboard navigation)
 * - Web Audio API procedural sound feedback
 * - Theme Switcher (Dark/Light) & Smooth Scroll Spy
 */

// Global State
const state = {
  soundEnabled: false,
  isExploded3D: false,
  presentationMode: false,
  currentSectionIndex: 0,
  sections: ['hero', 'intro', 'hdfs', 'yarn', 'mapreduce', 'architecture', 'conclusion'],
  yarnStep: 1,
  audioCtx: null
};

// --- Web Audio Synthesizer (Zero external dependencies) ---
function playTechSound(type = 'click') {
  if (!state.soundEnabled) return;
  try {
    if (!state.audioCtx) {
      state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = state.audioCtx;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'step') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    }
  } catch (e) {
    console.warn("Audio unavailable", e);
  }
}

// --- Initialize Three.js 3D Big Data Cluster Canvas in Hero ---
function initThreeCluster() {
  const container = document.getElementById('three-cluster-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 500;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 85);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group to rotate everything
  const clusterGroup = new THREE.Group();
  scene.add(clusterGroup);

  // Master NameNode / ResourceManager (Glowing Core)
  const masterGeometry = new THREE.IcosahedronGeometry(7, 2);
  const masterMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const masterNode = new THREE.Mesh(masterGeometry, masterMaterial);
  clusterGroup.add(masterNode);

  // Solid Inner Core
  const coreGeometry = new THREE.SphereGeometry(4.5, 32, 32);
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    shininess: 100
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  clusterGroup.add(coreMesh);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x06b6d4, 2, 200);
  pointLight.position.set(20, 30, 40);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 200);
  pointLight2.position.set(-20, -30, -40);
  scene.add(pointLight2);

  // Worker DataNodes in orbit
  const workerNodes = [];
  const workerCount = 7;
  const orbitRadius = 32;

  for (let i = 0; i < workerCount; i++) {
    const angle = (i / workerCount) * Math.PI * 2;
    const yOffset = Math.sin(i * 1.7) * 12;

    const workerGeo = new THREE.SphereGeometry(2.4, 24, 24);
    const workerMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      emissive: 0x0d9488,
      roughness: 0.3,
      metalness: 0.6
    });
    const worker = new THREE.Mesh(workerGeo, workerMat);

    worker.position.set(
      Math.cos(angle) * orbitRadius,
      yOffset,
      Math.sin(angle) * orbitRadius
    );

    worker.userData = {
      angle: angle,
      speed: 0.005 + (i % 3) * 0.002,
      radius: orbitRadius + (i % 2 === 0 ? 4 : -4),
      yBase: yOffset
    };

    clusterGroup.add(worker);
    workerNodes.push(worker);

    // Dynamic line connecting Master to Worker
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      worker.position
    ]);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.25
    });
    const line = new THREE.Line(lineGeo, lineMat);
    clusterGroup.add(line);
    worker.userData.line = line;
  }

  // Floating Data Particle Cloud (Hadoop Data Streams)
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100;
    positions[i + 1] = (Math.random() - 0.5) * 80;
    positions[i + 2] = (Math.random() - 0.5) * 100;

    // Cyan / Teal / Blue palette
    colors[i] = 0.2 + Math.random() * 0.2;
    colors[i + 1] = 0.7 + Math.random() * 0.3;
    colors[i + 2] = 0.9 + Math.random() * 0.1;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.7
  });

  const particleCloud = new THREE.Points(particleGeo, particleMat);
  clusterGroup.add(particleCloud);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.6;
      targetRotationX = mouseY * 0.4;
    }
  });

  // Click to emit data pulse
  container.addEventListener('click', () => {
    playTechSound('step');
    masterGeometry.scale(1.15, 1.15, 1.15);
    setTimeout(() => {
      masterGeometry.scale(1 / 1.15, 1 / 1.15, 1 / 1.15);
    }, 150);
  });

  // Resize handler
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || 500;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Rotate group with smooth damping
    clusterGroup.rotation.y += (targetRotationY - clusterGroup.rotation.y) * 0.05 + 0.003;
    clusterGroup.rotation.x += (targetRotationX - clusterGroup.rotation.x) * 0.05;

    // Master node pulsing
    masterNode.rotation.y += 0.01;
    masterNode.rotation.x += 0.005;
    const scalePulse = 1 + Math.sin(time * 3) * 0.04;
    coreMesh.scale.set(scalePulse, scalePulse, scalePulse);

    // Orbit worker nodes and update link positions
    workerNodes.forEach((worker, index) => {
      worker.userData.angle += worker.userData.speed;
      const x = Math.cos(worker.userData.angle) * worker.userData.radius;
      const z = Math.sin(worker.userData.angle) * worker.userData.radius;
      const y = worker.userData.yBase + Math.sin(time * 2 + index) * 3;
      worker.position.set(x, y, z);

      // Update connector line
      if (worker.userData.line) {
        const linePos = worker.userData.line.geometry.attributes.position.array;
        linePos[3] = x;
        linePos[4] = y;
        linePos[5] = z;
        worker.userData.line.geometry.attributes.position.needsUpdate = true;
      }
    });

    // Particle cloud slow spin
    particleCloud.rotation.y = time * 0.04;

    renderer.render(scene, camera);
  }

  animate();
}

// --- 3D Tilt Card Interaction ---
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// --- Interactive MapReduce Word Count Engine ---
const wordCountEngine = {
  activeStep: 1,
  sampleInputs: {
    sample1: "Hadoop processes big data Hadoop scales out big data",
    sample2: "MapReduce breaks down tasks MapReduce counts words efficiently",
    sample3: "DataNodes store blocks NameNode manages metadata in HDFS"
  },
  
  setSample(key) {
    const text = this.sampleInputs[key];
    const inputEl = document.getElementById('wc-input');
    if (inputEl) {
      inputEl.value = text;
      playTechSound('click');
      this.runSimulation();
    }
  },

  runSimulation() {
    playTechSound('step');
    const inputEl = document.getElementById('wc-input');
    const rawText = inputEl ? inputEl.value.trim() : "";
    if (!rawText) return;

    // Tokens
    const cleanTokens = rawText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    // 1. Splits
    const midPoint = Math.ceil(cleanTokens.length / 2);
    const split1 = cleanTokens.slice(0, midPoint);
    const split2 = cleanTokens.slice(midPoint);

    // 2. Maps (Key, 1)
    const map1 = split1.map(word => ({ key: word, count: 1 }));
    const map2 = split2.map(word => ({ key: word, count: 1 }));

    // 3. Shuffle & Sort (Group by key)
    const grouped = {};
    [...map1, ...map2].forEach(item => {
      if (!grouped[item.key]) grouped[item.key] = [];
      grouped[item.key].push(1);
    });

    const sortedKeys = Object.keys(grouped).sort();

    // 4. Reduce (Sum values)
    const reduced = sortedKeys.map(key => ({
      key,
      count: grouped[key].reduce((a, b) => a + b, 0)
    }));

    // Render into UI containers
    this.renderSplits(split1, split2);
    this.renderMaps(map1, map2);
    this.renderShuffle(sortedKeys, grouped);
    this.renderReduce(reduced);

    this.goToStep(1);
  },

  renderSplits(s1, s2) {
    const el1 = document.getElementById('wc-split-1');
    const el2 = document.getElementById('wc-split-2');
    if (el1) el1.innerHTML = s1.map(w => `<span class="px-2 py-1 bg-sky-950/70 text-sky-300 border border-sky-800 rounded font-mono text-xs">${w}</span>`).join(' ');
    if (el2) el2.innerHTML = s2.map(w => `<span class="px-2 py-1 bg-teal-950/70 text-teal-300 border border-teal-800 rounded font-mono text-xs">${w}</span>`).join(' ');
  },

  renderMaps(m1, m2) {
    const el1 = document.getElementById('wc-map-1');
    const el2 = document.getElementById('wc-map-2');
    if (el1) el1.innerHTML = m1.map(item => `<span class="px-2 py-0.5 bg-blue-900/50 text-blue-200 border border-blue-700/50 rounded font-mono text-xs">&lt;${item.key}, 1&gt;</span>`).join(' ');
    if (el2) el2.innerHTML = m2.map(item => `<span class="px-2 py-0.5 bg-cyan-900/50 text-cyan-200 border border-cyan-700/50 rounded font-mono text-xs">&lt;${item.key}, 1&gt;</span>`).join(' ');
  },

  renderShuffle(keys, grouped) {
    const el = document.getElementById('wc-shuffle-container');
    if (!el) return;
    el.innerHTML = keys.map(k => `
      <div class="p-2 bg-slate-900/90 border border-cyan-500/30 rounded-lg flex items-center justify-between font-mono text-xs">
        <span class="text-cyan-300 font-semibold">&lt;${k}&gt;</span>
        <span class="text-slate-400">[${grouped[k].join(', ')}]</span>
      </div>
    `).join('');
  },

  renderReduce(reduced) {
    const el = document.getElementById('wc-reduce-container');
    if (!el) return;
    el.innerHTML = reduced.map(item => `
      <div class="p-2 bg-emerald-950/80 border border-emerald-500/40 rounded-lg flex items-center justify-between font-mono text-xs font-semibold">
        <span class="text-emerald-300">${item.key}</span>
        <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold border border-emerald-500/30">${item.count}</span>
      </div>
    `).join('');
  },

  goToStep(stepNumber) {
    this.activeStep = stepNumber;
    playTechSound('click');

    // Update badges
    for (let i = 1; i <= 4; i++) {
      const badge = document.getElementById(`wc-tab-${i}`);
      const pane = document.getElementById(`wc-pane-${i}`);
      if (badge) {
        if (i === stepNumber) {
          badge.classList.add('active', 'border-cyan-400');
          badge.classList.remove('opacity-60');
        } else {
          badge.classList.remove('active', 'border-cyan-400');
          badge.classList.add('opacity-60');
        }
      }
      if (pane) {
        if (i === stepNumber) {
          pane.classList.remove('hidden');
          pane.classList.add('block');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('block');
        }
      }
    }
  },

  nextStep() {
    let next = this.activeStep + 1;
    if (next > 4) next = 1;
    this.goToStep(next);
  }
};

// --- YARN Interactive Stepper ---
const yarnController = {
  currentStep: 1,
  steps: [
    {
      step: 1,
      title: "1. Client Submits Application",
      actor: "Client ➔ ResourceManager",
      desc: "The client application (e.g. Spark driver or MapReduce job) packages jar/configs and submits a request to the YARN ResourceManager.",
      highlight: ["yarn-node-client", "yarn-node-rm"],
      flowId: "flow-1"
    },
    {
      step: 2,
      title: "2. Allocate Container for ApplicationMaster",
      actor: "ResourceManager ➔ NodeManager (Host A)",
      desc: "ResourceManager finds an available NodeManager with free memory & CPU capacity and assigns Container 1 for the ApplicationMaster.",
      highlight: ["yarn-node-rm", "yarn-node-nma", "yarn-node-am"],
      flowId: "flow-2"
    },
    {
      step: 3,
      title: "3. ApplicationMaster Launches",
      actor: "NodeManager (Host A) ➔ ApplicationMaster",
      desc: "NodeManager A prepares the local working directory, extracts application resources, and boots the ApplicationMaster process.",
      highlight: ["yarn-node-nma", "yarn-node-am"],
      flowId: "flow-3"
    },
    {
      step: 4,
      title: "4. Resource Negotiation",
      actor: "ApplicationMaster ➔ ResourceManager Scheduler",
      desc: "AM reads input splits, calculates data locality, and sends heartbeat resource requests (RAM, vCores, rack preference) to RM Scheduler.",
      highlight: ["yarn-node-am", "yarn-node-rm"],
      flowId: "flow-4"
    },
    {
      step: 5,
      title: "5. Allocate Distributed Containers",
      actor: "ResourceManager ➔ ApplicationMaster",
      desc: "RM Scheduler allocates container leases to the AM, respecting data locality (Node-local > Rack-local > Off-rack).",
      highlight: ["yarn-node-rm", "yarn-node-am"],
      flowId: "flow-5"
    },
    {
      step: 6,
      title: "6. Launch Tasks in Worker Containers",
      actor: "ApplicationMaster ➔ NodeManagers (Host B & C)",
      desc: "AM contacts respective NodeManagers with ContainerLaunchContext. NodeManagers launch tasks inside isolated cgroup containers.",
      highlight: ["yarn-node-am", "yarn-node-nmb", "yarn-node-nmc", "yarn-c1", "yarn-c2"],
      flowId: "flow-6"
    },
    {
      step: 7,
      title: "7. Job Completion & Container Release",
      actor: "ApplicationMaster ➔ ResourceManager",
      desc: "Containers finish execution and write outputs. AM reports completion to RM, unregisters itself, and releases all cluster containers.",
      highlight: ["yarn-node-am", "yarn-node-rm", "yarn-node-client"],
      flowId: "flow-7"
    }
  ],

  setStep(stepNum) {
    if (stepNum < 1 || stepNum > 7) return;
    this.currentStep = stepNum;
    playTechSound('step');

    const stepData = this.steps[stepNum - 1];

    // Update display text
    const titleEl = document.getElementById('yarn-step-title');
    const actorEl = document.getElementById('yarn-step-actor');
    const descEl = document.getElementById('yarn-step-desc');
    const countEl = document.getElementById('yarn-step-count');

    if (titleEl) titleEl.innerText = stepData.title;
    if (actorEl) actorEl.innerText = stepData.actor;
    if (descEl) descEl.innerText = stepData.desc;
    if (countEl) countEl.innerText = `Step ${stepNum} of 7`;

    // Highlight timeline tabs
    for (let i = 1; i <= 7; i++) {
      const tab = document.getElementById(`yarn-btn-${i}`);
      if (tab) {
        if (i === stepNum) {
          tab.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold', 'scale-110');
          tab.classList.remove('bg-slate-800', 'text-slate-300');
        } else {
          tab.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold', 'scale-110');
          tab.classList.add('bg-slate-800', 'text-slate-300');
        }
      }
    }

    // Highlight diagram components
    document.querySelectorAll('.yarn-highlightable').forEach(el => {
      el.classList.remove('border-cyan-400', 'ring-2', 'ring-cyan-400', 'shadow-lg', 'shadow-cyan-500/50');
      el.classList.add('opacity-40');
    });

    stepData.highlight.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('opacity-40');
        el.classList.add('border-cyan-400', 'ring-2', 'ring-cyan-400', 'shadow-lg', 'shadow-cyan-500/50');
      }
    });
  },

  next() {
    let next = this.currentStep + 1;
    if (next > 7) next = 1;
    this.setStep(next);
  },

  prev() {
    let prev = this.currentStep - 1;
    if (prev < 1) prev = 7;
    this.setStep(prev);
  }
};

// --- HDFS Rack Awareness & Replication Simulator ---
const hdfsSimulator = {
  isSimulatingFailure: false,

  replicateFile() {
    playTechSound('step');
    const sizeInput = document.getElementById('hdfs-file-size');
    const mb = parseInt(sizeInput ? sizeInput.value : 350) || 350;
    const blockSize = 128;

    // Calculate blocks
    const totalBlocks = Math.ceil(mb / blockSize);
    const blocksInfo = [];
    let remaining = mb;
    for (let i = 1; i <= totalBlocks; i++) {
      const size = remaining >= blockSize ? blockSize : remaining;
      blocksInfo.push({ id: `Blk_${i}`, size: size });
      remaining -= size;
    }

    const logEl = document.getElementById('hdfs-calc-log');
    if (logEl) {
      logEl.innerHTML = `File size <strong>${mb} MB</strong> split into <strong>${totalBlocks} blocks</strong> (Default: 128 MB): ` +
        blocksInfo.map(b => `<span class="inline-block px-2 py-0.5 mx-1 bg-cyan-950 text-cyan-300 border border-cyan-700 rounded text-xs">${b.id}: ${b.size}MB</span>`).join('');
    }

    // Animate distribution on Rack 1 & Rack 2 nodes
    this.renderRackDistribution();
  },

  renderRackDistribution() {
    const n1 = document.getElementById('node-1-blocks');
    const n2 = document.getElementById('node-2-blocks');
    const n3 = document.getElementById('node-3-blocks');
    const n4 = document.getElementById('node-4-blocks');

    // Default 3x replication policy:
    // Blk 1: Node 1 (Rack 1), Node 3 (Rack 2), Node 4 (Rack 2)
    // Blk 2: Node 2 (Rack 1), Node 3 (Rack 2), Node 4 (Rack 2)
    // Blk 3: Node 1 (Rack 1), Node 2 (Rack 1), Node 3 (Rack 2)
    if (n1) n1.innerHTML = `<span class="block px-2 py-1 bg-sky-900/60 border border-sky-500 text-sky-200 rounded text-xs mb-1 font-mono">Blk_1 (Replica 1)</span><span class="block px-2 py-1 bg-purple-900/60 border border-purple-500 text-purple-200 rounded text-xs font-mono">Blk_3 (Replica 1)</span>`;
    if (n2) n2.innerHTML = `<span class="block px-2 py-1 bg-amber-900/60 border border-amber-500 text-amber-200 rounded text-xs mb-1 font-mono">Blk_2 (Replica 1)</span><span class="block px-2 py-1 bg-purple-900/60 border border-purple-500 text-purple-200 rounded text-xs font-mono">Blk_3 (Replica 2)</span>`;
    if (n3) n3.innerHTML = `<span class="block px-2 py-1 bg-sky-900/60 border border-sky-500 text-sky-200 rounded text-xs mb-1 font-mono">Blk_1 (Replica 2)</span><span class="block px-2 py-1 bg-amber-900/60 border border-amber-500 text-amber-200 rounded text-xs mb-1 font-mono">Blk_2 (Replica 2)</span><span class="block px-2 py-1 bg-purple-900/60 border border-purple-500 text-purple-200 rounded text-xs font-mono">Blk_3 (Replica 3)</span>`;
    if (n4) n4.innerHTML = `<span class="block px-2 py-1 bg-sky-900/60 border border-sky-500 text-sky-200 rounded text-xs mb-1 font-mono">Blk_1 (Replica 3)</span><span class="block px-2 py-1 bg-amber-900/60 border border-amber-500 text-amber-200 rounded text-xs font-mono">Blk_2 (Replica 3)</span>`;

    const statusEl = document.getElementById('rack-status-msg');
    if (statusEl) {
      statusEl.className = "text-xs font-mono text-emerald-400 mt-2";
      statusEl.innerHTML = "✓ All blocks safely replicated 3x across 2 independent racks according to HDFS Rack Awareness policy.";
    }
  },

  simulateNodeCrash() {
    if (this.isSimulatingFailure) return;
    this.isSimulatingFailure = true;
    playTechSound('alert');

    const node3 = document.getElementById('datanode-3');
    const statusEl = document.getElementById('rack-status-msg');

    if (node3) {
      node3.classList.add('border-red-500', 'bg-red-950/70', 'ring-2', 'ring-red-500');
      const badge = node3.querySelector('.status-dot');
      if (badge) {
        badge.className = "w-2.5 h-2.5 rounded-full bg-red-500 animate-ping";
      }
    }

    if (statusEl) {
      statusEl.className = "text-xs font-mono text-amber-400 mt-2";
      statusEl.innerHTML = "⚠️ DataNode 3 heartbeat missed! Under-replicated blocks detected. NameNode initiating auto-recovery...";
    }

    // Auto-heal simulation after 2.5 seconds
    setTimeout(() => {
      playTechSound('success');
      const n2 = document.getElementById('node-2-blocks');
      if (n2) {
        n2.innerHTML += `<span class="block px-2 py-1 bg-sky-900/80 border border-emerald-400 text-emerald-300 rounded text-xs mt-1 font-mono animate-pulse">Blk_1 (Re-replicated)</span>`;
      }
      if (statusEl) {
        statusEl.className = "text-xs font-mono text-emerald-400 mt-2";
        statusEl.innerHTML = "✓ Self-healing complete! NameNode commanded DataNode 4 to copy Blk_1 to DataNode 2. Cluster back at 3x replication factor!";
      }
      setTimeout(() => {
        if (node3) {
          node3.classList.remove('border-red-500', 'bg-red-950/70', 'ring-2', 'ring-red-500');
          const badge = node3.querySelector('.status-dot');
          if (badge) badge.className = "w-2.5 h-2.5 rounded-full bg-emerald-400";
        }
        this.isSimulatingFailure = false;
      }, 3000);
    }, 2500);
  }
};

// --- 3D Isometric Layer Exploder ---
function toggle3DExplode() {
  playTechSound('step');
  const stack = document.getElementById('iso-architecture-stack');
  const btn = document.getElementById('explode-btn');
  state.isExploded3D = !state.isExploded3D;

  if (stack) {
    if (state.isExploded3D) {
      stack.classList.add('iso-exploded');
      if (btn) btn.innerHTML = `<span>Collapse 3D Stack</span> <i data-lucide="layers" class="w-4 h-4 inline"></i>`;
    } else {
      stack.classList.remove('iso-exploded');
      if (btn) btn.innerHTML = `<span>Explode 3D Layers</span> <i data-lucide="layers-3" class="w-4 h-4 inline"></i>`;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// --- Presentation Mode Controller (Seminar Slides) ---
function togglePresentationMode() {
  playTechSound('click');
  state.presentationMode = !state.presentationMode;
  const banner = document.getElementById('presentation-bar');

  if (state.presentationMode) {
    document.body.classList.add('presentation-mode');
    if (banner) banner.classList.remove('hidden');
    // Try browser fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  } else {
    document.body.classList.remove('presentation-mode');
    if (banner) banner.classList.add('hidden');
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }
}

function nextSlide() {
  if (state.currentSectionIndex < state.sections.length - 1) {
    state.currentSectionIndex++;
    const target = document.getElementById(state.sections[state.currentSectionIndex]);
    if (target) {
      playTechSound('step');
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function prevSlide() {
  if (state.currentSectionIndex > 0) {
    state.currentSectionIndex--;
    const target = document.getElementById(state.sections[state.currentSectionIndex]);
    if (target) {
      playTechSound('step');
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// --- Sound Toggle ---
function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.innerHTML = state.soundEnabled 
      ? `<i data-lucide="volume-2" class="w-4 h-4 text-cyan-400"></i>` 
      : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  if (state.soundEnabled) playTechSound('success');
}

// --- Theme Switcher (Dark/Light) ---
function toggleTheme() {
  playTechSound('click');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('hadoop_theme', newTheme);

  const iconContainer = document.getElementById('theme-toggle-icon');
  if (iconContainer) {
    iconContainer.innerHTML = newTheme === 'light' 
      ? `<i data-lucide="moon" class="w-4 h-4 text-slate-700"></i>` 
      : `<i data-lucide="sun" class="w-4 h-4 text-amber-300"></i>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// --- Scroll Spy & Progress Bar ---
function initScrollSpy() {
  const progressBar = document.getElementById('reading-progress-bar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = state.sections.map(id => document.getElementById(id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    // Progress calculation
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Active Section Detection
    let currentId = 'hero';
    sections.forEach((sec, idx) => {
      const top = sec.offsetTop - 180;
      if (scrollTop >= top) {
        currentId = sec.id;
        state.currentSectionIndex = idx;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update presentation slide counter if active
    const counter = document.getElementById('pres-slide-counter');
    if (counter) counter.innerText = `Slide ${state.currentSectionIndex + 1} / ${state.sections.length}`;
  });

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

// --- Confetti & Seminar Reaction ---
function launchSeminarConfetti() {
  playTechSound('success');
  const container = document.getElementById('confetti-canvas-container');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const conf = document.createElement('div');
    const colors = ['#38bdf8', '#06b6d4', '#14b8a6', '#f59e0b', '#a855f7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = 1.5 + Math.random() * 2;

    conf.className = "absolute w-2 h-3 rounded-sm pointer-events-none";
    conf.style.backgroundColor = color;
    conf.style.left = `${left}%`;
    conf.style.top = "50%";
    conf.style.transform = `rotate(${Math.random() * 360}deg)`;
    conf.style.transition = `all ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
    conf.style.opacity = '1';

    container.appendChild(conf);

    setTimeout(() => {
      conf.style.top = `${-20 + Math.random() * 140}%`;
      conf.style.left = `${left + (Math.random() - 0.5) * 40}%`;
      conf.style.transform = `rotate(${Math.random() * 720}deg) scale(${0.5 + Math.random()})`;
      conf.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      conf.remove();
    }, duration * 1000 + 100);
  }
}

// --- Keyboard Navigation for Presentation ---
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') {
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    prevSlide();
  } else if (e.key === 'f' || e.key === 'F') {
    // Only if not focused in text input
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      togglePresentationMode();
    }
  }
});

// --- Lifecycle Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Restore theme
  const savedTheme = localStorage.getItem('hadoop_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Initialize features
  initThreeCluster();
  init3DTiltCards();
  initScrollSpy();
  yarnController.setStep(1);
  wordCountEngine.runSimulation();
  hdfsSimulator.replicateFile();
});
