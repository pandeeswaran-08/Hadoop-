import React from 'react';

export default function Introduction() {
  const fiveVs = [
    {
      title: 'Volume',
      scale: 'Terabytes to Exabytes',
      desc: 'Exploding volumes of enterprise transactions, social media feeds, IoT telemetry, and video streams exceeding single disk storage.',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="12" x2="2" y2="12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1="6" y1="16" x2="6.01" y2="16" />
          <line x1="10" y1="16" x2="10.01" y2="16" />
        </svg>
      )
    },
    {
      title: 'Velocity',
      scale: 'Real-Time Ingestion',
      desc: 'The extraordinary speed at which new data packets are produced and must be ingested, queued, and processed without dropping records.',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      )
    },
    {
      title: 'Variety',
      scale: 'Diverse Schemas',
      desc: 'Structured relational tables, semi-structured JSON/XML/logs, and unstructured media (audio, video, documents, clickstreams).',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      title: 'Veracity',
      scale: 'Data Quality & Trust',
      desc: 'Handling noise, missing values, anomalies, duplicates, and clock skews inherent in massive real-world distributed feeds.',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      title: 'Value',
      scale: 'Actionable Insights',
      desc: 'Extracting meaningful insights, customer recommendations, predictive maintenance, and fraud flags that justify storage costs.',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }
  ];

  const ecosystemTools = [
    { name: 'Apache Spark', role: 'In-Memory Engine' },
    { name: 'Apache Hive', role: 'SQL Data Warehouse' },
    { name: 'Apache HBase', role: 'NoSQL Column Store' },
    { name: 'Apache Kafka', role: 'Event Streaming' },
    { name: 'ZooKeeper', role: 'Cluster Coordination' },
    { name: 'Apache Oozie', role: 'Workflow Scheduler' }
  ];

  return (
    <section id="intro" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/15">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-neutral-300 font-mono text-xs border border-white/20 mb-3 tracking-widest uppercase shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_#fff]"></span>
          <span className="text-white font-bold">MODULE 01</span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">FOUNDATIONS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Introduction to{' '}
          <span className="italic font-normal text-neutral-300 underline decoration-white/30 decoration-1 underline-offset-[8px] drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
            Big Data & Hadoop
          </span>
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg mt-3 leading-relaxed">
          Before exploring Hadoop's internal machinery, let's understand the massive data dilemma that made traditional relational databases obsolete for web-scale analytics.
        </p>
      </div>

      {/* 5 Vs */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-white">✦</span>
              The 5 V's of Big Data
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">The defining dimensions of modern distributed information workloads</p>
          </div>
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">Hover cards for 3D tilt effect</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fiveVs.map((v, i) => (
            <div
              key={i}
              className="tilt-card glass-panel p-5 rounded-2xl border border-white/15 hover:border-white/70 bg-black/85 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-1">{v.title}</h4>
              <span className="text-[10px] font-mono text-neutral-400 block mb-2">{v.scale}</span>
              <p className="text-xs text-neutral-300 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RDBMS vs Hadoop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/20 bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/30 flex items-center justify-center text-white font-mono font-bold">
              [✕]
            </div>
            <h4 className="text-lg font-bold text-white">The RDBMS Bottleneck</h4>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
            <li className="flex items-start gap-2.5">
              <span className="text-neutral-500 font-bold">✕</span>
              <span><strong>Vertical Scaling (Scale-Up):</strong> Adding more CPUs or RAM to a single mainframe hits physical limits and incurs exponential hardware costs.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-neutral-500 font-bold">✕</span>
              <span><strong>Schema-on-Write:</strong> Strict relational schemas reject unstructured JSON, log files, or streaming sensor formats without tedious ETL pipelines.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-neutral-500 font-bold">✕</span>
              <span><strong>High Latency Over Networks:</strong> Moving terabytes of raw data across network cables to a centralized compute engine creates severe network saturation.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/40 bg-black/90 shadow-[0_10px_30px_rgba(255,255,255,0.06)] relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white text-black font-mono font-bold flex items-center justify-center shadow-[0_0_10px_#ffffff]">
              [✓]
            </div>
            <h4 className="text-lg font-bold text-white">The Hadoop Solution</h4>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
            <li className="flex items-start gap-2.5">
              <span className="text-white font-bold">✓</span>
              <span><strong>Horizontal Scaling (Scale-Out):</strong> Simply add standard, low-cost commodity servers to the cluster to linearly expand storage and processing power.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white font-bold">✓</span>
              <span><strong>Data Locality Principle:</strong> "Move Computation to Data" — compute jobs execute locally on the exact server where the data blocks physically reside.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white font-bold">✓</span>
              <span><strong>Built-in Hardware Fault Tolerance:</strong> Automatically handles node and disk failures through rack-aware replication with zero operator intervention.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Ecosystem Map */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/20 bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Hadoop Ecosystem Overview</h4>
            <p className="text-xs text-neutral-400 mt-0.5">The surrounding open-source technology stack built around HDFS & YARN</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-neutral-900 border border-white/15 text-neutral-300">Apache Big Data Stack</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {ecosystemTools.map((tool, i) => (
            <div key={i} className="p-3 rounded-xl bg-neutral-950 border border-white/15 hover:border-white/50 transition">
              <div className="text-xs font-bold text-white">{tool.name}</div>
              <span className="text-[10px] text-neutral-400 block mt-1 font-mono">{tool.role}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
