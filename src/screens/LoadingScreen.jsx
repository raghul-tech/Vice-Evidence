import { useEffect, useRef, useState } from 'react';

const SHOTS = [
  { src: '/loads/gta-background.jpg', tip: 'INITIALIZING VICE EVIDENCE SYSTEM...' },
  { src: '/loads/gta-background-image.jpg', tip: 'ANALYZING INCIDENT DOSSIER & BLOTTER...' },
  { src: '/loads/gta-wallpaper-image.jpg', tip: 'LOADING TACTICAL TARGETING & IMAGE TOOLS...' },
];

// Preload images
SHOTS.forEach((shot) => {
  const img = new Image();
  img.src = shot.src;
});

export default function LoadingScreen({ visible }) {
  const [shot, setShot] = useState(0);
  const [pct, setPct] = useState(0);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      setPct(0);
      setShot(0);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return undefined;
    }

    setPct(0);
    setShot(0);
    startTimeRef.current = performance.now();

    // Image crossfade timer (cycles max 3 images smoothly every 1000ms)
    const shotInterval = window.setInterval(() => {
      setShot((n) => (n + 1) % SHOTS.length);
    }, 800);

    // Smooth continuous progress bar animation using requestAnimationFrame
    const duration = 2200; // matches loading cinematic time
    const updateProgress = (now) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(100, (elapsed / duration) * 100);

      // Smooth cubic-bezier curve easing for realistic game load progress
      const eased = progress < 50
        ? 2 * Math.pow(progress / 100, 2) * 100
        : (1 - Math.pow(-2 * (progress / 100) + 2, 2) / 2) * 100;

      setPct(Math.min(99.9, Math.max(progress * 0.98, eased)));

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setPct(100);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      window.clearInterval(shotInterval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="load-overlay" role="status" aria-live="polite" aria-label="Loading Vice Evidence">
      {/* Background shots with smooth CSS cross-fade transition (max 3 pics) */}
      <div className="load-shots-container">
        {SHOTS.map((item, idx) => (
          <img
            key={item.src}
            className={`load-shot ${idx === shot ? 'active' : ''}`}
            src={item.src}
            alt=""
          />
        ))}
      </div>

      <div className="load-vignette" aria-hidden="true" />
      <div className="load-scanlines" aria-hidden="true" />

      {/* Game HUD overlay content */}
      <div className="load-hud">
        <div className="load-brand">
          <span className="load-badge">VICE POLICE DEPT</span>
          <span className="load-title">COSTA LUMA BLOTTER</span>
        </div>

        <div className="load-tip">
          <span className="load-tip-label">STATUS // </span>
          <span className="load-tip-text">{SHOTS[shot].tip}</span>
        </div>

        <div className="load-bar-wrapper">
          <div className="load-bar-info">
            <span className="load-bar-label">SYSTEM LOADING</span>
            <span className="load-bar-pct">{Math.floor(pct)}%</span>
          </div>
          <div className="load-line">
            <div className="load-line-fill" style={{ width: `${pct}%` }} />
            <div className="load-line-glow" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

