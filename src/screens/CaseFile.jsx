export default function CaseFile({
  incident,
  exhibits,
  filedAt,
  onAddCrop,
  onAddStill,
  onPrint,
  onAgain,
  onMenu,
}) {
  const filed = filedAt ? new Date(filedAt).toLocaleString() : new Date().toLocaleString();

  return (
    <main className="dossier screen-in">
      <article className="folder">
        <header className="folder-tab">
          <p className="kicker">Costa Luma Central Blotter · Desk 4</p>
          <h1>Case File #{incident.caseNo}</h1>
        </header>

        <dl className="folder-meta">
          <div>
            <dt>Incident</dt>
            <dd>{incident.title}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{incident.location}</dd>
          </div>
          <div>
            <dt>Subject</dt>
            <dd>{incident.subject}</dd>
          </div>
          <div>
            <dt>Charge</dt>
            <dd>{incident.charge}</dd>
          </div>
          <div>
            <dt>Proof count</dt>
            <dd>{exhibits.length}</dd>
          </div>
          <div>
            <dt>Filed</dt>
            <dd>{filed}</dd>
          </div>
        </dl>

        <ol className="exhibits">
          {exhibits.map((exhibit, index) => (
            <li key={exhibit.id} className="exhibit">
              <p className="exhibit-index">Exhibit {String(index + 1).padStart(2, '0')}</p>
              <h2>{exhibit.title}</h2>
              <p className="exhibit-sub">{exhibit.subtitle}</p>
              <figure>
                <img src={exhibit.image} alt={exhibit.title} />
              </figure>
              <p className="exhibit-meta">
                {Math.round(exhibit.ratio * 100)}% of source · {exhibit.verdict}
                {exhibit.size ? ` · ${exhibit.size.w}×${exhibit.size.h}` : ''}
              </p>
            </li>
          ))}
        </ol>
      </article>

      <div className="row-actions">
        <button type="button" className="primary" onClick={onPrint}>
          Print case file
        </button>
        <button type="button" className="ghost" onClick={onAddCrop}>
          Scope another still
        </button>
        <button type="button" className="ghost" onClick={onAddStill}>
          Attach a new picture
        </button>
      </div>
      <div className="row-actions">
        <button type="button" className="ghost" onClick={onAgain}>
          Another case
        </button>
        <button type="button" className="ghost" onClick={onMenu}>
          End shift
        </button>
      </div>
    </main>
  );
}
