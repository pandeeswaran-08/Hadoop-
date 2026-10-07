import React, { useState } from 'react';

export default function WordCountSimulator({ playSound }) {
  const [inputText, setInputText] = useState('Hadoop processes big data Hadoop scales out big data');
  const [activeTab, setActiveTab] = useState(1);

  const presets = {
    p1: 'Hadoop processes big data Hadoop scales out big data',
    p2: 'MapReduce breaks down tasks MapReduce counts words efficiently',
    p3: 'DataNodes store blocks NameNode manages metadata in HDFS'
  };

  const cleanTokens = inputText
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const midPoint = Math.ceil(cleanTokens.length / 2);
  const split1 = cleanTokens.slice(0, midPoint);
  const split2 = cleanTokens.slice(midPoint);

  const map1 = split1.map((w) => ({ key: w, count: 1 }));
  const map2 = split2.map((w) => ({ key: w, count: 1 }));

  const grouped = {};
  [...map1, ...map2].forEach((item) => {
    if (!grouped[item.key]) grouped[item.key] = [];
    grouped[item.key].push(1);
  });

  const sortedKeys = Object.keys(grouped).sort();

  const reduced = sortedKeys.map((key) => ({
    key,
    count: grouped[key].reduce((a, b) => a + b, 0)
  }));

  const handleTabChange = (tabNum) => {
    setActiveTab(tabNum);
    if (playSound) playSound('click');
  };

  const handleRun = () => {
    if (playSound) playSound('step');
    setActiveTab(1);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border-sky-500/30 mb-16">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold text-white">
            Live Interactive Word Count Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Type custom text or choose a preset to trace MapReduce pipeline transformation stages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setInputText(presets.p1); if (playSound) playSound('click'); }}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
          >
            Preset 1
          </button>
          <button
            onClick={() => { setInputText(presets.p2); if (playSound) playSound('click'); }}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
          >
            Preset 2
          </button>
          <button
            onClick={() => { setInputText(presets.p3); if (playSound) playSound('click'); }}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
          >
            Preset 3
          </button>
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-sm focus:border-cyan-400 outline-none"
        />
        <button
          onClick={handleRun}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition"
        >
          Run Pipeline
        </button>
      </div>

      {/* Stage Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        {[
          { num: 1, label: '1. Input Splits' },
          { num: 2, label: '2. Map Phase' },
          { num: 3, label: '3. Shuffle & Sort' },
          { num: 4, label: '4. Reduce (Final HDFS)' }
        ].map((tab) => (
          <button
            key={tab.num}
            onClick={() => handleTabChange(tab.num)}
            className={`wc-step-badge px-3.5 py-1.5 rounded-lg border text-xs font-mono transition ${
              activeTab === tab.num
                ? 'active border-cyan-400 bg-gradient-to-r from-sky-600 to-cyan-600 text-white'
                : 'border-slate-700 opacity-60 text-slate-300 hover:opacity-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => handleTabChange(activeTab >= 4 ? 1 : activeTab + 1)}
          className="ml-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
        >
          Next Stage ➔
        </button>
      </div>

      {/* Stage Contents */}
      {activeTab === 1 && (
        <div>
          <div className="text-xs text-slate-400 mb-3">
            Input text is divided into parallel splits processed by independent Mappers:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-800/40">
              <span className="text-xs font-bold text-sky-400 block mb-2 font-mono">Split 1 (Mapper 1)</span>
              <div className="flex flex-wrap gap-1.5">
                {split1.map((w, idx) => (
                  <span key={idx} className="px-2 py-1 bg-sky-950/70 text-sky-300 border border-sky-800 rounded font-mono text-xs">
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-800/40">
              <span className="text-xs font-bold text-teal-400 block mb-2 font-mono">Split 2 (Mapper 2)</span>
              <div className="flex flex-wrap gap-1.5">
                {split2.map((w, idx) => (
                  <span key={idx} className="px-2 py-1 bg-teal-950/70 text-teal-300 border border-teal-800 rounded font-mono text-xs">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <div className="text-xs text-slate-400 mb-3">
            Each mapper emits intermediate key-value pairs <code>&lt;word, 1&gt;</code>:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-800/40">
              <span className="text-xs font-bold text-sky-400 block mb-2 font-mono">Mapper 1 Output</span>
              <div className="flex flex-wrap gap-1.5">
                {map1.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-900/50 text-blue-200 border border-blue-700/50 rounded font-mono text-xs">
                    &lt;{item.key}, 1&gt;
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-800/40">
              <span className="text-xs font-bold text-teal-400 block mb-2 font-mono">Mapper 2 Output</span>
              <div className="flex flex-wrap gap-1.5">
                {map2.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-cyan-900/50 text-cyan-200 border border-cyan-700/50 rounded font-mono text-xs">
                    &lt;{item.key}, 1&gt;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div>
          <div className="text-xs text-slate-400 mb-3">
            The cluster framework transfers keys across the network and sorts them alphabetically:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {sortedKeys.map((k) => (
              <div key={k} className="p-2 bg-slate-900/90 border border-cyan-500/30 rounded-lg flex items-center justify-between font-mono text-xs">
                <span className="text-cyan-300 font-semibold">&lt;{k}&gt;</span>
                <span className="text-slate-400">[{grouped[k].join(', ')}]</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 4 && (
        <div>
          <div className="text-xs text-slate-400 mb-3">
            Reducers iterate over values for each unique key and sum counts to generate final HDFS file:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {reduced.map((item) => (
              <div key={item.key} className="p-2 bg-emerald-950/80 border border-emerald-500/40 rounded-lg flex items-center justify-between font-mono text-xs font-semibold">
                <span className="text-emerald-300">{item.key}</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold border border-emerald-500/30">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
