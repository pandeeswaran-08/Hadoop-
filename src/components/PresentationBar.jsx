import React from 'react';

export default function PresentationBar({
  presentationMode,
  currentSectionIndex,
  totalSections,
  onPrev,
  onNext,
  onExit
}) {
  if (!presentationMode) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-2.5 rounded-full flex items-center gap-4 text-xs font-mono shadow-2xl border-white/30 bg-black/90 text-white">
      <span className="flex items-center gap-2 text-white font-semibold">
        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        SEMINAR MODE ACTIVE
      </span>
      <span className="text-neutral-500">|</span>
      <span className="text-neutral-300">
        Slide {currentSectionIndex + 1} / {totalSections}
      </span>
      <div className="flex items-center gap-1.5 ml-2">
        <button
          onClick={onPrev}
          className="p-1 px-3 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/20 transition"
        >
          ◀ Prev
        </button>
        <button
          onClick={onNext}
          className="p-1 px-3 rounded bg-white hover:bg-neutral-200 text-black font-bold border border-white transition shadow-[0_0_10px_#ffffff]"
        >
          Next ▶
        </button>
        <button
          onClick={onExit}
          title="Exit Presentation Mode"
          className="p-1 px-2.5 rounded bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-white/20 ml-1"
        >
          ✕ Exit
        </button>
      </div>
    </div>
  );
}
