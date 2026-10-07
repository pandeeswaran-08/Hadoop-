import React, { useState } from 'react';

export default function ExplodedStack({ playSound }) {
  const [isExploded, setIsExploded] = useState(false);
  const [rotZ, setRotZ] = useState(-34);

  const handleToggle = () => {
    setIsExploded(!isExploded);
    if (playSound) playSound('step');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border-purple-500/20 mb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h4 className="text-2xl font-bold text-white flex items-center gap-2">
            Hadoop 4-Tier Architectural Stack (3D Perspective)
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            Click the button to explode the stack into 3D isometric layers, and use the slider to adjust 3D rotation angle
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-300">
            <span>3D Angle:</span>
            <input
              type="range"
              min="-70"
              max="0"
              value={rotZ}
              onChange={(e) => setRotZ(parseInt(e.target.value))}
              className="w-24 cursor-pointer accent-purple-500"
            />
          </div>
          <button
            onClick={handleToggle}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/25 transition font-mono"
          >
            <span>{isExploded ? 'Collapse 3D Stack' : 'Explode 3D Layers'}</span>
          </button>
        </div>
      </div>

      {/* Isometric Container */}
      <div className="iso-container py-14 flex justify-center items-center overflow-hidden">
        <div
          className={`iso-stack w-full max-w-[520px] space-y-4 ${
            isExploded ? 'iso-exploded' : ''
          }`}
          style={{ transform: `rotateX(54deg) rotateZ(${rotZ}deg)` }}
        >
          {/* Layer 4: Analytics */}
          <div className="iso-layer iso-layer-4 p-5 rounded-2xl bg-purple-950/90 border border-purple-400 shadow-2xl text-center">
            <span className="text-[10px] font-mono text-purple-300 tracking-widest uppercase block mb-1">
              TIER 4 • DATA ACCESS & ANALYTICS
            </span>
            <div className="text-base font-bold text-white mb-1">
              Apache Hive • Presto / Trino • Apache Pig • Impala
            </div>
            <p className="text-xs text-purple-200">
              Interactive SQL queries, ad-hoc reports & business intelligence
            </p>
          </div>

          {/* Layer 3: Compute */}
          <div className="iso-layer iso-layer-3 p-5 rounded-2xl bg-sky-950/90 border border-sky-400 shadow-2xl text-center">
            <span className="text-[10px] font-mono text-sky-300 tracking-widest uppercase block mb-1">
              TIER 3 • PROCESSING & COMPUTE ENGINES
            </span>
            <div className="text-base font-bold text-white mb-1">
              Apache Spark • MapReduce v2 • Apache Flink • Apache Tez
            </div>
            <p className="text-xs text-sky-200">
              Batch processing, streaming analytics, machine learning pipelines
            </p>
          </div>

          {/* Layer 2: Resource */}
          <div className="iso-layer iso-layer-2 p-5 rounded-2xl bg-teal-950/90 border border-teal-400 shadow-2xl text-center">
            <span className="text-[10px] font-mono text-teal-300 tracking-widest uppercase block mb-1">
              TIER 2 • RESOURCE NEGOTIATION
            </span>
            <div className="text-base font-bold text-white mb-1">
              YARN (ResourceManager + NodeManagers)
            </div>
            <p className="text-xs text-teal-200">
              Dynamic CPU & Memory scheduling, container orchestration
            </p>
          </div>

          {/* Layer 1: Storage */}
          <div className="iso-layer iso-layer-1 p-5 rounded-2xl bg-slate-900/95 border border-amber-400 shadow-2xl text-center">
            <span className="text-[10px] font-mono text-amber-300 tracking-widest uppercase block mb-1">
              TIER 1 • DISTRIBUTED STORAGE SYSTEM
            </span>
            <div className="text-base font-bold text-white mb-1">
              HDFS (Active/Standby NameNode + DataNodes)
            </div>
            <p className="text-xs text-amber-200">
              128MB block chunks, 3x rack replication, Erasure Coding
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
