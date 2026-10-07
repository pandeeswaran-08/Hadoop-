import React, { useState } from 'react';

export default function Conclusion({ playSound }) {
  const [openFaq, setOpenFaq] = useState(null);

  const takeaways = [
    { num: '01', title: 'Scale-Out Commodity', desc: 'Replaced expensive proprietary mainframes with clusters of standard commercial servers that scale linearly.', color: 'border-sky-500/20' },
    { num: '02', title: 'Data Locality', desc: 'Compute code is sent to where data blocks physically reside, preventing massive network saturation.', color: 'border-teal-500/20' },
    { num: '03', title: 'Decoupled YARN', desc: 'Storage (HDFS) and compute (MapReduce/Spark) are completely decoupled, enabling multi-tenant cluster sharing.', color: 'border-cyan-500/20' },
    { num: '04', title: 'Modern Foundation', desc: 'Hadoop remains the intellectual foundation of modern Cloud Object Stores (S3/GCS) and Lakehouses (Iceberg/Delta).', color: 'border-purple-500/20' }
  ];

  const faqs = [
    {
      id: 1,
      q: 'Q1: Why doesn\'t the Secondary NameNode take over if the NameNode fails?',
      a: 'The Secondary NameNode does not hold real-time metadata. It merely downloads the FsImage and EditLog at checkpoint intervals (e.g. once an hour), merges them, and uploads the new checkpoint back. Any mutations written after the last checkpoint are missing from the Secondary NameNode. Only a Standby NameNode in High Availability (HA) mode, synchronized via Quorum Journal Manager (QJM), can immediately take over.'
    },
    {
      id: 2,
      q: 'Q2: Why is the default HDFS block size so large (128 MB vs OS 4 KB)?',
      a: 'Standard operating systems optimize for random access to tiny files, requiring small 4 KB blocks. HDFS is designed for streaming petabytes of continuous data. A 128 MB block minimizes seek time overhead: disk transfer rate (e.g. 100 MB/s) dominates seeking (~10ms seek represents less than 1% of transfer time). Furthermore, fewer blocks keep the NameNode\'s RAM metadata footprint compact!'
    },
    {
      id: 3,
      q: 'Q3: How does Erasure Coding in Hadoop 3.x save 50% storage compared to 3x replication?',
      a: 'With 3x replication, storing 6 blocks requires 18 blocks of physical disk (200% overhead). Hadoop 3.x introduces Reed-Solomon Erasure Coding (e.g. RS 6,3). It splits data into 6 data cells and computes 3 parity cells (total 9 cells). Any 3 cell failures can be reconstructed mathematically. This provides equal or better fault tolerance with only 50% storage overhead instead of 200%!'
    },
    {
      id: 4,
      q: 'Q4: What is the primary difference between a Combiner and a Reducer?',
      a: 'A Combiner has the exact same signature as a Reducer, but it runs locally on the individual Mapper node before data hits the network. Its sole purpose is optimization to reduce network bandwidth. The framework cannot guarantee how many times (or even if) a Combiner will execute. Therefore, Combiners can only be used for associative and commutative operations (like SUM, COUNT, MAX), not non-associative calculations (like AVERAGE).'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
    if (playSound) playSound('click');
  };

  const handleConfetti = () => {
    if (playSound) playSound('success');
    const container = document.getElementById('confetti-canvas-container');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const conf = document.createElement('div');
      const colors = ['#38bdf8', '#06b6d4', '#14b8a6', '#f59e0b', '#a855f7'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = 1.5 + Math.random() * 2;

      conf.className = 'absolute w-2 h-3 rounded-sm pointer-events-none';
      conf.style.backgroundColor = color;
      conf.style.left = `${left}%`;
      conf.style.top = '50%';
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
  };

  return (
    <section id="conclusion" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 text-emerald-300 font-mono text-xs border border-emerald-800/60 mb-3">
          <span>MODULE 06</span> • SUMMARY & SEMINAR REVIEW
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Conclusion & <span className="text-emerald-400">Key Takeaways</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Reviewing the core pillars of distributed big data systems and addressing essential viva/seminar discussion questions.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {takeaways.map((item, idx) => (
          <div key={idx} className={`tilt-card glass-panel p-5 rounded-2xl ${item.color}`}>
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 mb-3 font-bold font-mono">
              {item.num}
            </div>
            <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* College Seminar Q&A */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-700/60 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold text-white">
              Common University Seminar & Viva Questions
            </h4>
            <p className="text-xs text-slate-400 mt-1">Click any question to reveal technical answers with diagrams & references</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 hidden sm:inline-block">Interactive Q&A</span>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <div
              key={f.id}
              onClick={() => toggleFaq(f.id)}
              className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 cursor-pointer transition-all hover:border-slate-700"
            >
              <div className="font-bold text-white text-sm flex items-center justify-between">
                <span>{f.q}</span>
                <span className={`text-cyan-400 transition-transform ${openFaq === f.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              {openFaq === f.id && (
                <div className="text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Presenter Podium */}
      <div className="relative glass-panel p-8 sm:p-10 rounded-3xl border-emerald-500/30 text-center max-w-3xl mx-auto overflow-hidden">
        <div id="confetti-canvas-container" className="absolute inset-0 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 mx-auto flex items-center justify-center text-slate-950 shadow-xl shadow-teal-500/20 mb-6 font-bold text-xl">
            🎓
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Thank You!</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Thank you for attending this seminar presentation on Hadoop Architecture. The floor is now open for audience questions, discussions, and technical demonstrations.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-300 mb-8">
            <span>Topic: <strong className="text-cyan-300">Hadoop Architecture</strong></span>
            <span>•</span>
            <span>Department of Computer Science & Engineering</span>
            <span>•</span>
            <span className="text-emerald-400">Questions & Answers Session</span>
          </div>

          <div>
            <button
              onClick={handleConfetti}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 transition transform hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Celebrate / Trigger Confetti Burst</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
