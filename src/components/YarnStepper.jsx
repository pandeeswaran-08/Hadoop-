import React, { useState } from 'react';

export default function YarnStepper({ playSound }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: "1. Client Submits Application",
      actor: "Client ➔ ResourceManager",
      desc: "The client application (e.g. Spark driver or MapReduce job) packages jar/configs and submits a request to the YARN ResourceManager.",
      highlight: ["client", "rm"]
    },
    {
      step: 2,
      title: "2. Allocate Container for ApplicationMaster",
      actor: "ResourceManager ➔ NodeManager (Host A)",
      desc: "ResourceManager finds an available NodeManager with free memory & CPU capacity and assigns Container 1 for the ApplicationMaster.",
      highlight: ["rm", "nma", "am"]
    },
    {
      step: 3,
      title: "3. ApplicationMaster Launches",
      actor: "NodeManager (Host A) ➔ ApplicationMaster",
      desc: "NodeManager A prepares the local working directory, extracts application resources, and boots the ApplicationMaster process.",
      highlight: ["nma", "am"]
    },
    {
      step: 4,
      title: "4. Resource Negotiation",
      actor: "ApplicationMaster ➔ ResourceManager Scheduler",
      desc: "AM reads input splits, calculates data locality, and sends heartbeat resource requests (RAM, vCores, rack preference) to RM Scheduler.",
      highlight: ["am", "rm"]
    },
    {
      step: 5,
      title: "5. Allocate Distributed Containers",
      actor: "ResourceManager ➔ ApplicationMaster",
      desc: "RM Scheduler allocates container leases to the AM, respecting data locality (Node-local > Rack-local > Off-rack).",
      highlight: ["rm", "am"]
    },
    {
      step: 6,
      title: "6. Launch Tasks in Worker Containers",
      actor: "ApplicationMaster ➔ NodeManagers (Host B & C)",
      desc: "AM contacts respective NodeManagers with ContainerLaunchContext. NodeManagers launch tasks inside isolated cgroup containers.",
      highlight: ["am", "nmb", "c1", "c2"]
    },
    {
      step: 7,
      title: "7. Job Completion & Container Release",
      actor: "ApplicationMaster ➔ ResourceManager",
      desc: "Containers finish execution and write outputs. AM reports completion to RM, unregisters itself, and releases all cluster containers.",
      highlight: ["am", "rm", "client"]
    }
  ];

  const handleStepChange = (num) => {
    setActiveStep(num);
    if (playSound) playSound('step');
  };

  const handleNext = () => {
    let next = activeStep + 1;
    if (next > 7) next = 1;
    handleStepChange(next);
  };

  const handlePrev = () => {
    let prev = activeStep - 1;
    if (prev < 1) prev = 7;
    handleStepChange(prev);
  };

  const currentData = steps[activeStep - 1];

  const isHighlighted = (key) => currentData.highlight.includes(key);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold text-white">
            YARN Job Execution Lifecycle (Interactive Stepper)
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Click the steps or use Next/Prev to trace an application's execution path across cluster entities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
          >
            ◀ Prev
          </button>
          <button
            onClick={handleNext}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono transition"
          >
            Next Step ▶
          </button>
        </div>
      </div>

      {/* Timeline Tabs */}
      <div className="grid grid-cols-7 gap-1.5 mb-6 text-center font-mono text-xs">
        {steps.map((s) => (
          <button
            key={s.step}
            onClick={() => handleStepChange(s.step)}
            className={`p-2 rounded transition ${
              activeStep === s.step
                ? 'bg-cyan-500 text-slate-950 font-bold scale-105 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {s.step}. {s.step === 1 ? 'Submit' : s.step === 2 ? 'Alloc AM' : s.step === 3 ? 'Launch AM' : s.step === 4 ? 'Negotiate' : s.step === 5 ? 'Lease' : s.step === 6 ? 'Execute' : 'Done'}
          </button>
        ))}
      </div>

      {/* Active Step Card */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
              Step {activeStep} of 7
            </span>
            <span className="text-xs font-mono text-slate-400">{currentData.actor}</span>
          </div>
          <h5 className="text-base font-bold text-white">{currentData.title}</h5>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{currentData.desc}</p>
        </div>
      </div>

      {/* Diagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-xs font-mono">
        
        {/* Client */}
        <div
          className={`p-4 rounded-xl bg-slate-900 border transition-all duration-300 ${
            isHighlighted('client')
              ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 opacity-100'
              : 'border-slate-700 opacity-40'
          }`}
        >
          <span className="font-bold text-white block">Client Node</span>
          <span className="text-[10px] text-slate-400 block mt-1">CLI / Spark Submit</span>
        </div>

        {/* ResourceManager */}
        <div
          className={`p-4 rounded-xl bg-purple-950/60 border transition-all duration-300 ${
            isHighlighted('rm')
              ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 opacity-100'
              : 'border-purple-700 opacity-40'
          }`}
        >
          <span className="font-bold text-white block">ResourceManager</span>
          <span className="text-[10px] text-purple-300 block mt-1">Scheduler & ASM</span>
        </div>

        {/* NodeManager A */}
        <div
          className={`p-4 rounded-xl bg-slate-900 border transition-all duration-300 ${
            isHighlighted('nma')
              ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 opacity-100'
              : 'border-slate-700 opacity-40'
          }`}
        >
          <span className="font-bold text-white block">NodeManager A</span>
          <div
            className={`mt-2 p-1.5 rounded border text-[10px] font-bold ${
              isHighlighted('am')
                ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            ApplicationMaster
          </div>
        </div>

        {/* NodeManager B & C */}
        <div
          className={`p-4 rounded-xl bg-slate-900 border transition-all duration-300 ${
            isHighlighted('nmb')
              ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 opacity-100'
              : 'border-slate-700 opacity-40'
          }`}
        >
          <span className="font-bold text-white block">NodeManager B & C</span>
          <div className="mt-2 flex gap-1 justify-center">
            <span
              className={`px-1.5 py-0.5 rounded border text-[9px] ${
                isHighlighted('c1')
                  ? 'bg-sky-500/40 border-sky-300 text-sky-100'
                  : 'bg-sky-900/60 border-sky-700 text-sky-300'
              }`}
            >
              Container 1
            </span>
            <span
              className={`px-1.5 py-0.5 rounded border text-[9px] ${
                isHighlighted('c2')
                  ? 'bg-sky-500/40 border-sky-300 text-sky-100'
                  : 'bg-sky-900/60 border-sky-700 text-sky-300'
              }`}
            >
              Container 2
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
