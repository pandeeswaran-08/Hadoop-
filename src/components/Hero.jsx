import React, { useState } from 'react';
import ThreeCluster from './ThreeCluster';
import BlackHole from './ui/black-hole';

export default function Hero({ soundEnabled, playSound }) {
  const [bgMode, setBgMode] = useState('blackhole'); // 'blackhole' | 'hybrid' | 'cluster'

  const stats = [
    {
      title: 'Volume Horizon',
      value: 'Exabyte-Scale',
      desc: 'Distributed horizontally across thousands of commodity server nodes.',
      num: '01'
    },
    {
      title: 'Fault Tolerance',
      value: '3× Replicas',
      desc: 'Automated cross-rack topology with zero single-point failure.',
      num: '02'
    },
    {
      title: 'Block Granularity',
      value: '128 MB',
      desc: 'Large contiguous blocks optimized for sustained sequential disk I/O.',
      num: '03'
    },
    {
      title: 'Compute Model',
      value: 'Data Locality',
      desc: 'Computations execute where blocks reside, saving cross-rack bandwidth.',
      num: '04'
    }
  ];

  return (
    <header id="hero" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-black">
      
      {/* Dynamic Background: Black Hole / 3D Cluster / Hybrid */}
      {(bgMode === 'blackhole' || bgMode === 'hybrid') && (
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <BlackHole />
        </div>
      )}

      {(bgMode === 'cluster' || bgMode === 'hybrid') && (
        <div className={`absolute inset-0 w-full h-full pointer-events-auto ${bgMode === 'hybrid' ? 'opacity-80' : 'opacity-100'}`}>
          <ThreeCluster soundEnabled={soundEnabled} playSound={playSound} />
        </div>
      )}

      {/* Pure Monochromatic Radial Vignettes */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-white/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[360px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        
        {/* Unique Academic Crest / Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/25 bg-black/85 backdrop-blur-xl text-neutral-300 text-xs tracking-widest uppercase mb-7 shadow-[0_4px_30px_rgba(0,0,0,0.9)] pointer-events-auto hover:border-white/70 transition-all font-serif">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_#ffffff]"></span>
          </span>
          <span className="font-semibold text-white tracking-widest">CSE ADVANCED SEMINAR</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">DISTRIBUTED COMPUTING ARCHITECTURE</span>
        </div>

        {/* Unique Headline in Times New Roman */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white mb-6">
          HADOOP{' '}
          <span className="italic font-normal text-neutral-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.35)] underline decoration-white/30 decoration-1 underline-offset-[12px]">
            Architecture
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl sm:text-3xl text-neutral-200 font-normal max-w-3xl mx-auto mb-4 leading-relaxed italic">
          "The Foundations of Planetary-Scale Distributed Storage & High-Throughput Processing"
        </p>

        {/* Short Description */}
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          An authoritative academic seminar monograph covering HDFS metadata choreography, YARN two-tier resource scheduling, MapReduce distributed shuffle mechanics, and the fault-tolerant ecosystem.
        </p>

        {/* Unique Live Cluster Telemetry HUD */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-2.5 rounded-2xl border border-white/20 bg-black/85 backdrop-blur-xl text-xs font-mono text-neutral-300 mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_#fff]"></span>
            <span className="text-neutral-400">CLUSTER:</span> <span className="text-white font-bold">NOMINAL</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">DATANODES:</span> <span className="text-white font-bold">8 ACTIVE</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">REPLICATION:</span> <span className="text-white font-bold">3× RACK-AWARE</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">THROUGHPUT:</span> <span className="text-white font-bold">1.24 PB/s</span>
          </div>
        </div>

        {/* High Contrast Monochrome Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 pointer-events-auto mb-14">
          <a
            href="#intro"
            onClick={() => playSound('click')}
            className="sheen-active px-8 py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-wide shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-3 border border-white"
          >
            <span>Explore Architecture</span>
            <span className="text-lg">↓</span>
          </a>
          <a
            href="#mapreduce"
            onClick={() => playSound('click')}
            className="px-8 py-4 rounded-xl glass-panel bg-black/80 border border-white/30 hover:border-white text-white font-semibold text-sm transition-all hover:bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform hover:-translate-y-0.5 flex items-center gap-3"
          >
            <span>Live MapReduce Simulator</span>
            <span className="text-neutral-400">→</span>
          </a>
        </div>

        {/* 4 Unique Architectural Monolith Cards (High Contrast Monochrome) */}
        <div className="pointer-events-auto max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="tilt-card glass-panel p-5 rounded-2xl text-left border border-white/20 hover:border-white/80 bg-black/90 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                  {stat.title}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">{stat.num}</span>
              </div>
              <div className="text-3xl font-bold text-white mt-1">{stat.value}</div>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Visual Engine Mode Switcher & Interactivity Guidance */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <div className="inline-flex p-1 rounded-xl bg-black/90 border border-white/20 backdrop-blur-xl shadow-lg">
            <button
              onClick={() => { setBgMode('blackhole'); if (playSound) playSound('click'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${bgMode === 'blackhole' ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-neutral-400 hover:text-white'}`}
            >
              🌌 Black Hole Singularity
            </button>
            <button
              onClick={() => { setBgMode('hybrid'); if (playSound) playSound('click'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${bgMode === 'hybrid' ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-neutral-400 hover:text-white'}`}
            >
              🌀 Cosmic Hybrid
            </button>
            <button
              onClick={() => { setBgMode('cluster'); if (playSound) playSound('click'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${bgMode === 'cluster' ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-neutral-400 hover:text-white'}`}
            >
              ⚛ 3D Node Cluster
            </button>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]"></span>
            <span className="font-mono tracking-wide">Move cursor to warp gravitational accretion disk</span>
          </div>
        </div>

      </div>
    </header>
  );
}
