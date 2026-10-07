import React from 'react';
import WordCountSimulator from './WordCountSimulator';

export default function MapReduce({ playSound }) {
  const phases = [
    {
      num: 'PHASE 01',
      title: 'Map Phase',
      desc: 'Reads raw input split line-by-line via RecordReader.',
      signature: '(k1, v1) ➔ list(k2, v2)',
      color: 'border-sky-500/20',
      badgeColor: 'bg-sky-950 text-sky-300'
    },
    {
      num: 'PHASE 02',
      title: 'Combiner (Optional)',
      desc: '"Mini-reducer" running locally on the Map node to aggregate data.',
      signature: 'Saves ~70% network IO',
      color: 'border-teal-500/20',
      badgeColor: 'bg-teal-950 text-teal-300'
    },
    {
      num: 'PHASE 03',
      title: 'Partitioner',
      desc: 'Determines which reducer receives which intermediate key.',
      signature: 'hash(key) % numReducers',
      color: 'border-cyan-500/20',
      badgeColor: 'bg-cyan-950 text-cyan-300'
    },
    {
      num: 'PHASE 04',
      title: 'Shuffle & Sort',
      desc: 'Transfers data over network and merges sorted lists by key.',
      signature: 'list(k2, list(v2))',
      color: 'border-purple-500/20',
      badgeColor: 'bg-purple-950 text-purple-300'
    },
    {
      num: 'PHASE 05',
      title: 'Reduce Phase',
      desc: 'Applies aggregation function and writes output to HDFS.',
      signature: '(k2, list(v2)) ➔ list(k3, v3)',
      color: 'border-emerald-500/20',
      badgeColor: 'bg-emerald-950 text-emerald-300'
    }
  ];

  return (
    <section id="mapreduce" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 text-blue-300 font-mono text-xs border border-blue-800/60 mb-3">
          <span>MODULE 04</span> • COMPUTE ENGINE
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          MapReduce: <span className="text-sky-400">Distributed Compute Paradigm</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          A software framework and mathematical paradigm for processing massive datasets in parallel across clusters of commodity hardware using divide-and-conquer principles.
        </p>
      </div>

      {/* 5 Phases */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-16 text-xs">
        {phases.map((p, idx) => (
          <div key={idx} className={`p-4 rounded-xl bg-slate-900/70 border ${p.color}`}>
            <span className={`px-2 py-0.5 rounded ${p.badgeColor} font-mono text-[10px] block w-fit mb-2`}>
              {p.num}
            </span>
            <h4 className="font-bold text-white text-sm mb-1">{p.title}</h4>
            <p className="text-slate-400 mb-2">{p.desc}</p>
            <div className="p-2 rounded bg-slate-950 text-cyan-300 font-mono text-[10px] border border-slate-800">
              {p.signature}
            </div>
          </div>
        ))}
      </div>

      {/* Live Interactive Word Count */}
      <WordCountSimulator playSound={playSound} />

      {/* Limitations Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h4 className="text-base font-bold text-amber-300 mb-1">
            MapReduce Limitations & The Shift to Apache Spark
          </h4>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            MapReduce persists every intermediate state to physical disk, resulting in heavy disk I/O penalties. For iterative algorithms (machine learning, PageRank) and real-time streaming, MapReduce is too slow. <strong>Apache Spark</strong> emerged as the modern successor by holding intermediate data in-memory (RAM), running queries up to <strong>100x faster</strong> while still using HDFS and YARN.
          </p>
        </div>
        <a
          href="#architecture"
          onClick={() => playSound('click')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-semibold whitespace-nowrap transition border border-cyan-500/30"
        >
          View Ecosystem Stack ➔
        </a>
      </div>

    </section>
  );
}
