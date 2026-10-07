import React, { useState, useEffect } from 'react';

export default function Navbar({
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  onTogglePresentation,
  activeSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'intro', label: 'Introduction' },
    { id: 'hdfs', label: 'HDFS' },
    { id: 'yarn', label: 'YARN' },
    { id: 'mapreduce', label: 'MapReduce' },
    { id: 'architecture', label: 'Complete Architecture' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/60 z-50">
        <div
          className="h-full bg-gradient-to-r from-neutral-500 via-white to-neutral-400 shadow-[0_0_10px_#ffffff] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-white/15 bg-black/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-white text-black font-black flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform font-serif text-lg font-bold border border-white/40">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white">
                Hadoop Seminar
              </span>
              <span className="block text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                Big Data Architecture
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link px-3 py-1.5 rounded-md hover:text-white transition-colors ${
                  activeSection === link.id ? 'active text-white border-b-2 border-white bg-white/10 font-bold' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePresentation}
              title="Toggle Fullscreen Presentation Mode (F)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/25 bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Present</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={onToggleSound}
              title="Toggle Audio FX"
              className="p-2 rounded-lg border border-white/15 hover:border-white/40 bg-neutral-900 text-neutral-300 hover:text-white transition"
            >
              {soundEnabled ? (
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title="Toggle Theme"
              className="p-2 rounded-lg border border-white/15 hover:border-white/40 bg-neutral-900 text-neutral-300 hover:text-white transition"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-neutral-950/95 px-4 py-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-neutral-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
