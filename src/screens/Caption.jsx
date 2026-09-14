import { useState } from 'react';

export default function Caption({ incident, pending, onFile, onBack }) {
  const [title, setTitle] = useState(pending?.title || incident.subject);
  const [subtitle, setSubtitle] = useState(pending?.subtitle || incident.charge);

  return (
    <main className="caption screen-in">
      <p className="kicker">Exhibit · Case #{incident.caseNo}</p>
      <h1>Label this still</h1>
      <p className="lede">Each proof is its own picture. Title it, then drop it into the case file.</p>

      <figure className="still caption-still">
        <img src={pending.image} alt="Pending exhibit" />
      </figure>

      <form
        className="caption-form"
        onSubmit={(event) => {
          event.preventDefault();
          onFile({
            title: title.trim() || `Exhibit`,
            subtitle: subtitle.trim() || incident.location,
          });
        }}
      >
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={80}
            required
          />
        </label>
        <label>
          Subtitle
          <input
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            maxLength={140}
          />
        </label>
        <div className="row-actions">
          <button type="submit" className="primary">
            Add to case file
          </button>
          <button type="button" className="ghost" onClick={onBack}>
            Back to crop
          </button>
        </div>
      </form>
    </main>
  );
}
