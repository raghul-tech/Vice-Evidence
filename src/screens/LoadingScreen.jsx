import { useEffect, useRef, useState } from 'react';

const SHOTS = [
  '/loads/gta-background.jpg',
  '/loads/gta-background-image.jpg',
  '/loads/gta-wallpaper-image.jpg',
];

SHOTS.forEach((src) => {
  const img = new Image();
  img.src = src;
});

export default function LoadingScreen({ visible }) {
  const [shot, setShot] = useState(0);
  const [pct, setPct] = useState(0);
  const slowCap = useRef(18);
  const phase = useRef('slow');

  useEffect(() => {
    if (!visible) {
      setPct(0);
      phase.current = 'slow';
      return undefined;
    }

    slowCap.current = 12 + Math.random() * 18;
    phase.current = 'slow';
    setPct(1 + Math.random() * 4);
    setShot(0);

    const frames = window.setInterval(() => {
      setShot((n) => (n + 1) % SHOTS.length);
    }, 520);

    const bar = window.setInterval(() => {
      setPct((n) => {
        if (phase.current === 'slow') {
          const next = n + 0.12 + Math.random() * 0.28;
          if (next >= slowCap.current) {
            phase.current = 'fast';
            return slowCap.current;
          }
          return next;
        }
        return Math.min(99, n + 5 + Math.random() * 9);
      });
    }, 45);

    return () => {
      window.clearInterval(frames);
      window.clearInterval(bar);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="load-overlay" role="status" aria-live="polite" aria-label="Loading">
      <img
        className="load-shot"
        src={SHOTS[shot]}
        alt=""
        onError={() => setShot((n) => (n + 1) % SHOTS.length)}
      />
      <div className="load-grade" aria-hidden="true" />
      <div className="load-line">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
