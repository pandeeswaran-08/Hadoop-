import React from 'react';
import RackSimulator from './RackSimulator';

export default function HdfsArchitecture({ playSound }) {
  return (
    <section id="hdfs" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/15">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-neutral-300 font-mono text-xs border border-white/20 mb-3 tracking-widest uppercase shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_#fff]"></span>
          <span className="text-white font-bold">MODULE 02</span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">STORAGE ARCHITECTURE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          HDFS:{' '}
          <span className="italic font-normal text-neutral-300 underline decoration-white/30 decoration-1 underline-offset-[8px] drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
            Hadoop Distributed File System
          </span>
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg mt-3 leading-relaxed">
          A master-worker distributed file system architected to store petabytes of data across commodity hardware with high-throughput streaming reads and write-once-read-many (WORM) semantics.
        </p>
      </div>

      {/* 3 Component Cards: NameNode, DataNode, Secondary NameNode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* NameNode */}
        <div className="tilt-card glass-panel p-6 rounded-2xl border border-white/15 hover:border-white/70 bg-black/85 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-semibold border border-white/20">MASTER NODE</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">NameNode (Active)</h3>
          <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
            The brain of HDFS. Maintains directory tree, file ownership, permissions, and exact block location mappings entirely in RAM for microsecond lookup speeds.
          </p>
          <div className="space-y-2 text-xs font-mono bg-black/80 p-3 rounded-xl border border-white/10 text-neutral-300">
            <div className="text-white font-semibold">• FsImage: Snapshot of file system namespace</div>
            <div className="text-neutral-300">• EditLog: Write-ahead log recording mutations</div>
            <div className="text-neutral-400">• Heartbeat Listener: 3-sec health check from DataNodes</div>
          </div>
        </div>

        {/* DataNodes */}
        <div className="tilt-card glass-panel p-6 rounded-2xl border border-white/15 hover:border-white/70 bg-black/85 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-semibold border border-white/20">WORKER NODES</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">DataNodes (Slaves)</h3>
          <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
            The muscle of HDFS. Stores and retrieves physical data blocks directly on local Linux drives (ext4/XFS). Performs block creation, deletion, and replication.
          </p>
          <div className="space-y-2 text-xs font-mono bg-black/80 p-3 rounded-xl border border-white/10 text-neutral-300">
            <div className="text-white font-semibold">• Direct Client IO: Clients stream data directly to DataNodes</div>
            <div className="text-neutral-300">• Heartbeats: Sent every 3 seconds to NameNode</div>
            <div className="text-neutral-400">• Block Report: Sent every 6 hours verifying block hashes</div>
          </div>
        </div>

        {/* Secondary NameNode */}
        <div className="tilt-card glass-panel p-6 rounded-2xl border border-white/15 hover:border-white/70 bg-black/85 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-semibold border border-white/20">CHECKPOINT NODE</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Secondary NameNode</h3>
          <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
            <strong className="text-white">Crucial Seminar Point:</strong> It is NOT a hot standby! It acts as a helper checkpointer that periodically merges EditLogs into FsImage to prevent log explosion.
          </p>
          <div className="space-y-2 text-xs font-mono bg-black/80 p-3 rounded-xl border border-white/10 text-neutral-300">
            <div className="text-white font-semibold">• Checkpointing: Merges FsImage + EditLog</div>
            <div className="text-neutral-300">• Reboots: Prevents hour-long reboots of NameNode</div>
            <div className="text-neutral-400">• In Hadoop 2+: Replaced by Standby NameNode (HA)</div>
          </div>
        </div>

      </div>

      {/* Visual SVG Diagram */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/20 bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">
              HDFS Read / Write Data Flow Diagram
            </h4>
            <p className="text-xs text-neutral-400">NameNode coordinates metadata; actual data never passes through the NameNode</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_6px_#fff]"></span> Metadata Query</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-neutral-400"></span> Direct Data Stream</span>
          </div>
        </div>

        <div className="w-full bg-black/90 rounded-xl border border-white/15 p-4 overflow-x-auto">
          <svg viewBox="0 0 900 320" className="w-full min-w-[700px] h-auto">
            {/* Client Box */}
            <g transform="translate(40, 110)">
              <rect width="130" height="90" rx="12" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
              <text x="65" y="40" fill="#ffffff" fontWeight="bold" fontSize="14" textAnchor="middle">HDFS Client</text>
              <text x="65" y="65" fill="#a3a3a3" fontSize="11" textAnchor="middle" fontFamily="monospace">Read / Write App</text>
            </g>

            {/* NameNode Box */}
            <g transform="translate(370, 20)">
              <rect width="180" height="95" rx="12" fill="#0a0a0a" stroke="#ffffff" strokeWidth="2" />
              <text x="90" y="38" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">Active NameNode</text>
              <text x="90" y="60" fill="#e5e5e5" fontSize="11" textAnchor="middle" fontFamily="monospace">RAM: Metadata Index</text>
              <text x="90" y="78" fill="#a3a3a3" fontSize="10" textAnchor="middle" fontFamily="monospace">FsImage + EditLog</text>
            </g>

            {/* Arrows */}
            <path d="M 170 135 L 370 70" stroke="#ffffff" strokeWidth="2" strokeDasharray="5,5" fill="none" className="flow-dash" />
            <text x="260" y="85" fill="#ffffff" fontSize="11" fontFamily="monospace">1. Request Block Locations</text>

            <path d="M 370 85 L 170 150" stroke="#d4d4d4" strokeWidth="2" fill="none" />
            <text x="250" y="130" fill="#d4d4d4" fontSize="10" fontFamily="monospace">2. Return DataNode IPs</text>

            {/* DataNode 1 */}
            <g transform="translate(680, 25)">
              <rect width="160" height="75" rx="10" fill="#0a0a0a" stroke="#ffffff" strokeWidth="1.5" />
              <text x="80" y="32" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">DataNode 1 (Rack 1)</text>
              <rect x="20" y="44" width="30" height="18" rx="4" fill="#262626" stroke="#ffffff" strokeWidth="0.5" />
              <rect x="58" y="44" width="30" height="18" rx="4" fill="#262626" stroke="#ffffff" strokeWidth="0.5" />
              <text x="35" y="57" fill="#fff" fontSize="9" textAnchor="middle">Blk A</text>
              <text x="73" y="57" fill="#fff" fontSize="9" textAnchor="middle">Blk B</text>
            </g>

            {/* DataNode 2 */}
            <g transform="translate(680, 120)">
              <rect width="160" height="75" rx="10" fill="#0a0a0a" stroke="#ffffff" strokeWidth="1.5" />
              <text x="80" y="32" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">DataNode 2 (Rack 1)</text>
              <rect x="20" y="44" width="30" height="18" rx="4" fill="#262626" stroke="#ffffff" strokeWidth="0.5" />
              <rect x="58" y="44" width="30" height="18" rx="4" fill="#262626" stroke="#ffffff" strokeWidth="0.5" />
              <text x="35" y="57" fill="#fff" fontSize="9" textAnchor="middle">Blk C</text>
              <text x="73" y="57" fill="#fff" fontSize="9" textAnchor="middle">Blk A</text>
            </g>

            {/* DataNode 3 */}
            <g transform="translate(680, 215)">
              <rect width="160" height="75" rx="10" fill="#0a0a0a" stroke="#ffffff" strokeWidth="1.5" />
              <text x="80" y="32" fill="#ffffff" fontWeight="bold" fontSize="13" textAnchor="middle">DataNode 3 (Rack 2)</text>
              <rect x="20" y="44" width="30" height="18" rx="4" fill="#262626" stroke="#ffffff" strokeWidth="0.5" />
              <rect x="58" y="44" width="30" height="18" rx="4" fill="#262626" stroke="#ffffff" strokeWidth="0.5" />
              <text x="35" y="57" fill="#fff" fontSize="9" textAnchor="middle">Blk B</text>
              <text x="73" y="57" fill="#fff" fontSize="9" textAnchor="middle">Blk C</text>
            </g>

            {/* Direct Data Streams */}
            <path d="M 170 170 C 350 200, 500 70, 680 60" stroke="#ffffff" strokeWidth="2.5" fill="none" className="flow-dash" />
            <text x="380" y="170" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">3. Direct Data Streaming (Parallel Blocks)</text>
            <path d="M 170 180 C 400 230, 530 160, 680 155" stroke="#ffffff" strokeWidth="2.5" fill="none" className="flow-dash" />
          </svg>
        </div>
      </div>

      {/* Interactive Simulator */}
      <RackSimulator playSound={playSound} />

    </section>
  );
}
