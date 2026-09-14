import { INCIDENTS } from '../data/incidents.js';

export default function EvidenceLocker({ onPick, onUpload, onBack }) {
  return (
    <main className="locker screen-in">
      <p className="kicker">Evidence locker · Desk 4</p>
      <h1>Select Incident</h1>
      <p className="lede">Four jobs on the board. Or upload your own picture.</p>

      <div className="card-grid">
        {INCIDENTS.map((incident) => (
          <button
            key={incident.id}
            type="button"
            className="case-card"
            onClick={() => onPick(incident)}
          >
            <img src={incident.image} alt="" />
            <span className="case-meta">
              <em>Case #{incident.caseNo}</em>
              <strong>{incident.title}</strong>
              <span>{incident.location}</span>
              <span className="desc">{incident.description}</span>
            </span>
          </button>
        ))}

        <label className="case-card upload-card">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(file);
              event.target.value = '';
            }}
          />
          <span className="case-meta">
            <em>Civilian</em>
            <strong>Upload your own evidence</strong>
            <span>Open a case from your own picture</span>
          </span>
        </label>
      </div>

      <button type="button" className="ghost" onClick={onBack}>
        Back
      </button>
    </main>
  );
}
