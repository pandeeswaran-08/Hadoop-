import React from 'react';
import ExplodedStack from './ExplodedStack';

export default function CompleteArchitecture({ playSound }) {
  return (
    <section id="architecture" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/70 text-purple-300 font-mono text-xs border border-purple-800/60 mb-3">
          <span>MODULE 05</span> • COMPLETE ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Complete Architecture & <span className="text-purple-400">Evolution</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          From Hadoop 1.x single point of failure to modern High Availability (HA), multi-standby clusters, Erasure Coding, and integrated cloud data lakes.
        </p>
      </div>

      {/* 3D Exploded Layer View */}
      <ExplodedStack playSound={playSound} />

      {/* Comparison Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-700/60 mb-16 overflow-hidden">
        <div className="mb-6">
          <h4 className="text-xl font-bold text-white">
            Evolution: Hadoop 1.x vs 2.x vs 3.x
          </h4>
          <p className="text-xs text-slate-400 mt-1">A direct comparison of architectural leaps across major Hadoop generations</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-950/80 text-slate-300">
                <th className="p-3">Feature</th>
                <th className="p-3 text-amber-400">Hadoop 1.x</th>
                <th className="p-3 text-sky-400">Hadoop 2.x</th>
                <th className="p-3 text-emerald-400">Hadoop 3.x</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Resource Layer</td>
                <td className="p-3">JobTracker + TaskTrackers</td>
                <td className="p-3 text-sky-300">YARN (RM + NodeManagers)</td>
                <td className="p-3 text-emerald-300">YARN Timeline Service v2</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Single Point of Failure (SPOF)</td>
                <td className="p-3 text-red-400">Yes (Only 1 NameNode)</td>
                <td className="p-3 text-sky-300">Solved (Active/Standby HA)</td>
                <td className="p-3 text-emerald-300">Multiple Standby NameNodes</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Default Block Size</td>
                <td className="p-3">64 MB</td>
                <td className="p-3">128 MB</td>
                <td className="p-3">128 MB (Configurable up to 256MB)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Storage Fault Tolerance</td>
                <td className="p-3">3x Replication only (200% overhead)</td>
                <td className="p-3">3x Replication only</td>
                <td className="p-3 text-emerald-300"><strong>Erasure Coding:</strong> Saves ~50% raw storage!</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Workload Ecosystem</td>
                <td className="p-3 text-red-400">MapReduce only</td>
                <td className="p-3">MapReduce, Spark, Flink, Storm</td>
                <td className="p-3 text-emerald-300">Docker Containers & GPU scheduling</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Java Minimum Requirement</td>
                <td className="p-3">Java 6 / 7</td>
                <td className="p-3">Java 7 / 8</td>
                <td className="p-3">Java 8 / Java 11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* HA & Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
          <h4 className="text-lg font-bold text-white mb-3">
            NameNode High Availability (HA) Architecture
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            To eliminate the single point of failure, modern Hadoop clusters configure an <strong>Active NameNode</strong> alongside one or more <strong>Standby NameNodes</strong> ready for immediate automated failover.
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-cyan-300">
              <strong>ZKFC (ZooKeeper Failover Controller):</strong> Monitors active NameNode health and coordinates master election.
            </div>
            <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-teal-300">
              <strong>QJM (Quorum Journal Manager):</strong> Distributed shared storage keeping Active and Standby NameNode EditLogs in lockstep synchrony.
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-teal-500/20">
          <h4 className="text-lg font-bold text-white mb-3">
            Real-World Enterprise Deployments
          </h4>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white">Spotify:</strong> Processes hundreds of billions of user listening events daily over Hadoop/Spark for personalized "Discover Weekly" recommendations.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white">Uber:</strong> Collects petabytes of trip GPS coordinates and driver telemetry into HDFS data lakes to optimize dynamic surge pricing models.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white">Global Financial Banks:</strong> Runs daily fraud scoring algorithms across all credit card transactions using YARN multi-tenant clusters.
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
