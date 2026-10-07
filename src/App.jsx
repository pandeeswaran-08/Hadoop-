import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import PresentationBar from './components/PresentationBar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import HdfsArchitecture from './components/HdfsArchitecture';
import YarnArchitecture from './components/YarnArchitecture';
import MapReduce from './components/MapReduce';
import CompleteArchitecture from './components/CompleteArchitecture';
import Conclusion from './components/Conclusion';
import { playTechSound } from './utils/audio';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('hadoop_theme') || 'dark');
  const [presentationMode, setPresentationMode] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = ['hero', 'intro', 'hdfs', 'yarn', 'mapreduce', 'architecture', 'conclusion'];

  // Sound handler
  const playSound = useCallback((type) => {
    playTechSound(type, soundEnabled);
  }, [soundEnabled]);

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hadoop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    playSound('click');
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (!soundEnabled) {
      playTechSound('success', true);
    }
  };

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          setCurrentSectionIndex(i);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Tilt Card effect
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-card');
    const handleMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleLeave = (e) => {
      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    cards.forEach((c) => {
      c.addEventListener('mousemove', handleMove);
      c.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      cards.forEach((c) => {
        c.removeEventListener('mousemove', handleMove);
        c.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  // Presentation Mode Navigation
  const scrollToSlide = (idx) => {
    if (idx >= 0 && idx < sections.length) {
      setCurrentSectionIndex(idx);
      const target = document.getElementById(sections[idx]);
      if (target) {
        playSound('step');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNextSlide = () => {
    scrollToSlide(currentSectionIndex + 1);
  };

  const handlePrevSlide = () => {
    scrollToSlide(currentSectionIndex - 1);
  };

  const togglePresentation = () => {
    const next = !presentationMode;
    setPresentationMode(next);
    playSound('click');
    if (next && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!next && document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Keyboard shortcut for presentation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        togglePresentation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex, presentationMode]);

  return (
    <div className={`min-h-screen ${presentationMode ? 'presentation-mode' : ''}`}>
      
      {/* Presentation Bar */}
      <PresentationBar
        presentationMode={presentationMode}
        currentSectionIndex={currentSectionIndex}
        totalSections={sections.length}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onExit={() => setPresentationMode(false)}
      />

      {/* Sticky Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        theme={theme}
        onToggleTheme={toggleTheme}
        onTogglePresentation={togglePresentation}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main>
        <Hero soundEnabled={soundEnabled} playSound={playSound} />
        <Introduction />
        <HdfsArchitecture playSound={playSound} />
        <YarnArchitecture playSound={playSound} />
        <MapReduce playSound={playSound} />
        <CompleteArchitecture playSound={playSound} />
        <Conclusion playSound={playSound} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-semibold">Seminar Presentation • Hadoop Architecture</span>
          </div>
          <div className="text-slate-400 text-center sm:text-right font-mono">
            Designed for University Big Data Systems & Distributed Computing Curriculum
          </div>
        </div>
      </footer>

    </div>
  );
}
