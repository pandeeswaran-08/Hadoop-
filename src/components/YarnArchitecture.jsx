import React from 'react';
import YarnStepper from './YarnStepper';

export default function YarnArchitecture({ playSound }) {
  const components = [
    {
      title: 'ResourceManager (RM)',
      role: 'Global Master Authority',
      desc: 'Arbitrates all cluster compute resources among competing applications via Pluggable Schedulers (Fair, Capacity, FIFO).',
      bullets: ['Scheduler', 'ApplicationsManager (ASM)'],
      color: 'border-purple-500/30 hover:border-purple-400',
      badge: 'text-purple-400'
    },
    {
      title: 'NodeManager (NM)',
      role: 'Per-Machine Slave Agent',
      desc: 'Monitors local hardware resource usage (CPU cores, RAM cgroups), launches task containers, and reports health via heartbeats to RM.',
      bullets: ['Container lifecycle', 'Resource usage telemetry'],
      color: 'border-teal-500/30 hover:border-teal-400',
      badge: 'text-teal-400'
    },
    {
      title: 'ApplicationMaster (AM)',
      role: 'Per-Application Coordinator',
      desc: 'A dedicated master spawned for each submitted job. Negotiates required containers from RM and works with NodeManagers to execute tasks.',
      bullets: ['Task scheduling', 'Fault recovery & retries'],
      color: 'border-amber-500/30 hover:border-amber-400',
      badge: 'text-amber-400'
    },
    {
      title: 'Container',
      role: 'Resource Slice Abstraction',
      desc: 'An isolated execution environment bundled with specific memory (e.g. 4GB RAM) and processing units (2 vCPUs) allocated to run tasks.',
      bullets: ['Memory & CPU limits', 'Sandboxed execution'],
      color: 'border-sky-500/30 hover:border-sky-400',
      badge: 'text-sky-400'
    }
  ];

  return (
    <section id="yarn" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 text-cyan-300 font-mono text-xs border border-cyan-800/60 mb-3">
          <span>MODULE 03</span> • RESOURCE NEGOTIATION
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          YARN: <span className="text-cyan-400">Yet Another Resource Negotiator</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Introduced in Hadoop 2.0 to decouple resource management from processing models, transforming Hadoop into a multi-tenant distributed operating system.
        </p>
      </div>

      {/* Why YARN: 1.0 vs 2.0 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass-panel p-6 rounded-2xl border-amber-500/20">
          <h4 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
            The Hadoop 1.x JobTracker Crisis
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In Hadoop 1.x, a single monolithic <strong>JobTracker</strong> was burdened with both managing cluster hardware resources and monitoring individual map/reduce task lifecycles. This caused severe bottlenecks at ~4,000 nodes, created a single point of failure (SPOF), and locked the entire cluster strictly to the MapReduce paradigm.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
          <h4 className="text-base font-bold text-cyan-300 mb-2 flex items-center gap-2">
            The YARN Architectural Breakthrough
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            YARN splits the JobTracker into two independent layers: a global <strong>ResourceManager</strong> that strictly allocates cluster CPU/RAM resources, and a per-application <strong>ApplicationMaster</strong> that negotiates resources and monitors task execution. Now Spark, Flink, and MapReduce can all run together!
          </p>
        </div>
      </div>

      {/* 4 Core Components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {components.map((comp, idx) => (
          <div
            key={idx}
            className={`tilt-card glass-panel p-5 rounded-2xl ${comp.color} relative`}
          >
            <h4 className="text-base font-bold text-white mb-1">{comp.title}</h4>
            <span className={`text-[10px] font-mono ${comp.badge} block mb-2`}>{comp.role}</span>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{comp.desc}</p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              {comp.bullets.map((b, i) => (
                <div key={i}>• {b}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stepper */}
      <YarnStepper playSound={playSound} />

    </section>
  );
}
