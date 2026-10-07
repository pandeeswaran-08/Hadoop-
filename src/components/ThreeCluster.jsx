import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCluster({ playSound }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 90);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // Gyroscopic Ring 1 (Inner Precision Ring - Pure White Wireframe)
    const ring1Geo = new THREE.TorusGeometry(12.5, 0.16, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.75 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    clusterGroup.add(ring1);

    // Gyroscopic Ring 2 (Orbital Meridian Ring - Silver Translucent)
    const ring2Geo = new THREE.TorusGeometry(17, 0.18, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.2;
    clusterGroup.add(ring2);

    // Gyroscopic Ring 3 (Outer Magnetic Horizon Ring - Platinum Wireframe)
    const ring3Geo = new THREE.TorusGeometry(22, 0.16, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true, transparent: true, opacity: 0.45 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    clusterGroup.add(ring3);

    // Gyroscopic Ring 4 (Equatorial Latitude Ring - Thin Pure White Hairline)
    const ring4Geo = new THREE.TorusGeometry(27, 0.12, 16, 120);
    const ring4Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });
    const ring4 = new THREE.Mesh(ring4Geo, ring4Mat);
    ring4.rotation.z = Math.PI / 6;
    clusterGroup.add(ring4);

    // Master NameNode (Glowing White Icosahedron Cage + Obsidian Glass Core + Inner Diamond)
    const masterGeo = new THREE.IcosahedronGeometry(6.8, 2);
    const masterMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.95
    });
    const masterNode = new THREE.Mesh(masterGeo, masterMat);
    clusterGroup.add(masterNode);

    // Obsidian Core Sphere with Ultra-Sharp White Specular Sheen
    const coreGeo = new THREE.SphereGeometry(4.4, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x050505,
      emissive: 0x181818,
      specular: 0xffffff,
      shininess: 160
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    clusterGroup.add(coreMesh);

    // Inner Sacred Geometry Diamond (Pulsing Octahedron)
    const diamondGeo = new THREE.OctahedronGeometry(2.6, 0);
    const diamondMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    clusterGroup.add(diamondMesh);

    // Lighting (Monochrome Chiaroscuro Studio Setup)
    scene.add(new THREE.AmbientLight(0x222222));
    const pl1 = new THREE.PointLight(0xffffff, 3.0, 300);
    pl1.position.set(30, 45, 55);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xaaaaaa, 2.0, 250);
    pl2.position.set(-30, -45, -55);
    scene.add(pl2);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(0, 50, 20);
    scene.add(dirLight);

    // 8 Worker DataNodes in 3D multi-planar orbits (Monochrome Chrome & Obsidian Nodes)
    const workerNodes = [];
    const packetMeshes = [];
    const workerCount = 8;
    const orbitRadius = 34;

    for (let i = 0; i < workerCount; i++) {
      const angle = (i / workerCount) * Math.PI * 2;
      const yOffset = Math.sin(i * 1.8) * 14;
      const wGeo = new THREE.SphereGeometry(2.4, 24, 24);
      const isChrome = i % 2 === 0;
      const wMat = new THREE.MeshStandardMaterial({
        color: isChrome ? 0xffffff : 0x151515,
        emissive: isChrome ? 0x222222 : 0x050505,
        roughness: isChrome ? 0.1 : 0.35,
        metalness: isChrome ? 0.95 : 0.8
      });
      const worker = new THREE.Mesh(wGeo, wMat);
      worker.position.set(Math.cos(angle) * orbitRadius, yOffset, Math.sin(angle) * orbitRadius);

      // Add a sleek white satellite ring around each worker node
      const satRingGeo = new THREE.TorusGeometry(3.6, 0.08, 8, 32);
      const satRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
      const satRing = new THREE.Mesh(satRingGeo, satRingMat);
      satRing.rotation.x = Math.PI / 2.5;
      worker.add(satRing);

      worker.userData = {
        angle,
        speed: 0.0016 + (i % 3) * 0.0006,
        radius: orbitRadius + (i % 2 === 0 ? 4 : -4),
        yBase: yOffset
      };
      clusterGroup.add(worker);
      workerNodes.push(worker);

      // Connecting Laser Ray (Pure White Laser)
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        worker.position
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45
      });
      const line = new THREE.Line(lineGeo, lineMat);
      clusterGroup.add(line);
      worker.userData.line = line;

      // Glowing Traveling Data Packet (Pure White Diamond Crystal)
      const pktGeo = new THREE.OctahedronGeometry(0.75, 0);
      const pktMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pkt = new THREE.Mesh(pktGeo, pktMat);
      clusterGroup.add(pkt);
      packetMeshes.push({ mesh: pkt, worker, progress: Math.random() });
    }

    // Particle Galaxy Cloud (350 Monochromatic Star Points)
    const pCount = 350;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 140;
      pPositions[i + 1] = (Math.random() - 0.5) * 100;
      pPositions[i + 2] = (Math.random() - 0.5) * 140;
      const lum = 0.75 + Math.random() * 0.25;
      pColors[i] = lum;
      pColors[i + 1] = lum;
      pColors[i + 2] = lum;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 1.8, vertexColors: true, transparent: true, opacity: 0.85 });
    const pCloud = new THREE.Points(pGeo, pMat);
    clusterGroup.add(pCloud);

    // Mouse Parallax & Shockwave physics (Double Concentric Pure White Rings)
    let targetRotX = 0;
    let targetRotY = 0;
    let shockwaveRadius = 0;
    let shockwaveActive = false;

    const shockRingGeo = new THREE.RingGeometry(1, 1.8, 60);
    const shockRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    const shockRing = new THREE.Mesh(shockRingGeo, shockRingMat);
    shockRing.rotation.x = Math.PI / 2;
    clusterGroup.add(shockRing);

    const shockRing2Geo = new THREE.RingGeometry(1.8, 2.3, 60);
    const shockRing2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    const shockRing2 = new THREE.Mesh(shockRing2Geo, shockRing2Mat);
    shockRing2.rotation.x = Math.PI / 2;
    clusterGroup.add(shockRing2);

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const mx = ((e.clientX - rect.left) / width) * 2 - 1;
        const my = -(((e.clientY - rect.top) / height) * 2 - 1);
        targetRotY = mx * 0.7;
        targetRotX = my * 0.45;
      }
    };

    const onClick = () => {
      if (playSound) playSound('step');
      shockwaveRadius = 1;
      shockwaveActive = true;
      masterGeo.scale(1.25, 1.25, 1.25);
      setTimeout(() => masterGeo.scale(1 / 1.25, 1 / 1.25, 1 / 1.25), 180);
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    let animId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      // Gyroscope Ring rotations (Smooth, cinematic speed)
      ring1.rotation.x = time * 0.18;
      ring1.rotation.y = time * 0.12;
      ring2.rotation.y = -time * 0.15;
      ring2.rotation.z = time * 0.09;
      ring3.rotation.z = time * 0.20;
      ring3.rotation.x = -time * 0.10;
      ring4.rotation.x = time * 0.08;
      ring4.rotation.y = -time * 0.14;

      // Main cluster inertia (Gentle idle drift)
      clusterGroup.rotation.y += (targetRotY - clusterGroup.rotation.y) * 0.05 + 0.0008;
      clusterGroup.rotation.x += (targetRotX - clusterGroup.rotation.x) * 0.05;

      // Master node pulse & Diamond spin (Calm pace)
      masterNode.rotation.y += 0.0035;
      diamondMesh.rotation.y = -time * 0.45;
      diamondMesh.rotation.z = time * 0.25;
      const scalePulse = 1 + Math.sin(time * 1.4) * 0.03;
      coreMesh.scale.set(scalePulse, scalePulse, scalePulse);

      // Worker Nodes orbit + line updates
      workerNodes.forEach((worker, idx) => {
        worker.userData.angle += worker.userData.speed;
        const x = Math.cos(worker.userData.angle) * worker.userData.radius;
        const z = Math.sin(worker.userData.angle) * worker.userData.radius;
        const y = worker.userData.yBase + Math.sin(time * 0.8 + idx) * 2.2;
        worker.position.set(x, y, z);

        if (worker.userData.line) {
          const pos = worker.userData.line.geometry.attributes.position.array;
          pos[3] = x; pos[4] = y; pos[5] = z;
          worker.userData.line.geometry.attributes.position.needsUpdate = true;
        }
      });

      // Traveling Data Packets along rays (Gentle streaming)
      packetMeshes.forEach(p => {
        p.progress += 0.0045;
        if (p.progress > 1) p.progress = 0;
        const target = p.worker.position;
        p.mesh.position.set(
          target.x * p.progress,
          target.y * p.progress,
          target.z * p.progress
        );
        p.mesh.rotation.x += 0.015;
        p.mesh.rotation.y += 0.015;
      });

      // Dual Shockwave ripple expansion on click
      if (shockwaveActive) {
        shockwaveRadius += 1.4;
        shockRing.scale.set(shockwaveRadius, shockwaveRadius, 1);
        shockRingMat.opacity = Math.max(0, 1 - shockwaveRadius / 50);
        shockRing2.scale.set(shockwaveRadius * 0.85, shockwaveRadius * 0.85, 1);
        shockRing2Mat.opacity = Math.max(0, 0.7 - (shockwaveRadius * 0.85) / 50);
        if (shockwaveRadius > 50) {
          shockwaveActive = false;
          shockRingMat.opacity = 0;
          shockRing2Mat.opacity = 0;
        }
      }

      pCloud.rotation.y = time * 0.009;
      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, [playSound]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing opacity-90"
    />
  );
}
