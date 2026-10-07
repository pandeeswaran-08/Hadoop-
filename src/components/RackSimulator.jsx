import React, { useState } from 'react';

export default function RackSimulator({ playSound }) {
  const [fileSize, setFileSize] = useState(350);
  const [isFailing, setIsFailing] = useState(false);
  const [healed, setHealed] = useState(false);

  const blockSize = 128;
  const totalBlocks = Math.ceil(fileSize / blockSize);
  const blocks = [];
  let remaining = fileSize;
  for (let i = 1; i <= totalBlocks; i++) {
    const size = remaining >= blockSize ? blockSize : remaining;
    blocks.push({ id: `Blk_${i}`, size });
    remaining -= size;
  }

  const handleSimulateCrash = () => {
    if (isFailing) return;
    setIsFailing(true);
    setHealed(false);
    if (playSound) playSound('alert');

    // Auto-heal simulation after 2.5 seconds
    setTimeout(() => {
      if (playSound) playSound('success');
      setHealed(true);
      setTimeout(() => {
        setIsFailing(false);
      }, 3500);
    }, 2500);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/20 bg-black/85 mb-16 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></span>
            Interactive HDFS Rack Awareness Simulator
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            <strong>Rule:</strong> Replica 1 on Local Node • Replica 2 on Remote Rack Node • Replica 3 on Alternate Node in Remote Rack.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateCrash}
            disabled={isFailing}
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 font-mono shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            <span>{isFailing ? 'Simulating Fault...' : 'Simulate Node Failure'}</span>
          </button>
        </div>
      </div>

      {/* Input Calculator */}
      <div className="bg-black/90 p-4 rounded-xl border border-white/15 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-neutral-300">File Size (MB):</label>
          <input
            type="number"
            value={fileSize}
            min="50"
            max="1000"
            step="50"
            onChange={(e) => setFileSize(parseInt(e.target.value) || 128)}
            className="w-24 px-2.5 py-1.5 rounded bg-neutral-950 border border-white/25 text-white font-mono text-xs focus:border-white outline-none"
          />
        </div>
        <div className="text-xs text-neutral-400 font-mono">
          File size <strong className="text-white">{fileSize} MB</strong> split into <strong className="text-white">{totalBlocks} blocks</strong> (Default: 128 MB):{' '}
          {blocks.map((b) => (
            <span key={b.id} className="inline-block px-2.5 py-0.5 mx-1 bg-white/10 text-white border border-white/25 rounded text-xs font-mono">
              {b.id}: {b.size}MB
            </span>
          ))}
        </div>
      </div>

      {/* 2 Racks Representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Rack 1 */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/20">
          <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
            <span className="text-sm font-bold text-white tracking-wide">
              RACK 1 (Switch A)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/20">
              Top of Rack Switch
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Node 1 */}
            <div className="p-3.5 rounded-xl bg-black/90 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white font-mono">DataNode 1</span>
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#fff]"></span>
              </div>
              <div className="space-y-1">
                <span className="block px-2 py-1 bg-white/15 border border-white/40 text-white rounded text-xs font-mono">Blk_1 (Replica 1)</span>
                <span className="block px-2 py-1 bg-white/10 border border-white/25 text-neutral-300 rounded text-xs font-mono">Blk_3 (Replica 1)</span>
              </div>
            </div>

            {/* Node 2 */}
            <div className="p-3.5 rounded-xl bg-black/90 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white font-mono">DataNode 2</span>
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#fff]"></span>
              </div>
              <div className="space-y-1">
                <span className="block px-2 py-1 bg-white/10 border border-white/25 text-neutral-300 rounded text-xs font-mono">Blk_2 (Replica 1)</span>
                <span className="block px-2 py-1 bg-white/5 border border-white/15 text-neutral-400 rounded text-xs font-mono">Blk_3 (Replica 2)</span>
                {healed && (
                  <span className="block px-2 py-1 bg-white text-black font-bold border border-white rounded text-xs font-mono animate-pulse shadow-[0_0_10px_#ffffff]">
                    Blk_1 (Re-replicated)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rack 2 */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/20">
          <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
            <span className="text-sm font-bold text-white tracking-wide">
              RACK 2 (Switch B)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/20">
              Isolated Power/Network
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Node 3 */}
            <div
              className={`p-3.5 rounded-xl border transition-all duration-300 ${
                isFailing && !healed
                  ? 'bg-neutral-900 border-2 border-white ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-black/90 border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white font-mono">DataNode 3</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isFailing && !healed ? 'bg-white animate-ping' : 'bg-white shadow-[0_0_6px_#fff]'
                  }`}
                ></span>
              </div>
              <div className="space-y-1">
                <span className="block px-2 py-1 bg-white/15 border border-white/40 text-white rounded text-xs font-mono">Blk_1 (Replica 2)</span>
                <span className="block px-2 py-1 bg-white/10 border border-white/25 text-neutral-300 rounded text-xs font-mono">Blk_2 (Replica 2)</span>
              </div>
            </div>

            {/* Node 4 */}
            <div className="p-3.5 rounded-xl bg-black/90 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white font-mono">DataNode 4</span>
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#fff]"></span>
              </div>
              <div className="space-y-1">
                <span className="block px-2 py-1 bg-white/15 border border-white/40 text-white rounded text-xs font-mono">Blk_1 (Replica 3)</span>
                <span className="block px-2 py-1 bg-white/10 border border-white/25 text-neutral-300 rounded text-xs font-mono">Blk_2 (Replica 3)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="text-xs font-mono mt-4 text-center">
        {isFailing && !healed ? (
          <span className="text-white font-bold animate-pulse">
            ⚠️ DataNode 3 heartbeat lost! Under-replicated blocks detected. NameNode initiating auto-recovery...
          </span>
        ) : healed ? (
          <span className="text-white font-bold">
            ✓ Self-healing complete! NameNode commanded DataNode 4 to copy Blk_1 to DataNode 2. Cluster back at 3x replication factor!
          </span>
        ) : (
          <span className="text-neutral-300">
            ✓ All blocks safely replicated 3x across 2 independent racks according to HDFS Rack Awareness policy.
          </span>
        )}
      </div>

    </div>
  );
}
