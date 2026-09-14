import { useEffect, useState } from 'react';

const OPTIONS = [
  { id: 'start', label: 'Start Shift', hint: 'Open the evidence locker' },
  { id: 'upload', label: 'Upload Evidence', hint: 'Open a case from your own picture' },
  { id: 'how', label: 'Standing Orders', hint: 'Desk 4. After hours.' },
];

export default function BootMenu({ onStart, onUpload, onHow }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'ArrowDown' || event.key === 's') {
        event.preventDefault();
        setIndex((i) => (i + 1) % OPTIONS.length);
      }
      if (event.key === 'ArrowUp' || event.key === 'w') {
        event.preventDefault();
        setIndex((i) => (i - 1 + OPTIONS.length) % OPTIONS.length);
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        pick(OPTIONS[index].id);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  function pick(id) {
    if (id === 'start') onStart();
    if (id === 'upload') onUpload();
    if (id === 'how') onHow();
  }

  return (
    <main className="boot screen-in">
      <div className="boot-bg" aria-hidden="true" />
      <p className="kicker">Costa Luma · Central Blotter</p>
      <h1>Vice Evidence</h1>
      <p className="brand-sub">Desk 4</p>
      <p className="tagline">The stills come in first. Names go on the wall after.</p>
      <p className="manifesto">Central Blotter · After hours</p>

      <nav className="menu" aria-label="Shift menu">
        {OPTIONS.map((option, i) => (
          <button
            key={option.id}
            type="button"
            className={`menu-item ${i === index ? 'selected' : ''}`}
            onMouseEnter={() => setIndex(i)}
            onClick={() => pick(option.id)}
          >
            <span className="menu-label">{option.label}</span>
            <span className="menu-hint">{option.hint}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}
