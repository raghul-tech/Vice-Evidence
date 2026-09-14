export default function Verdict({
  incident,
  originalImage,
  croppedImage,
  cropRatio,
  verdict,
  onAgain,
  onAddMore,
  onStampExtra,
  onDownload,
  onDownloadPoster,
  onMenu,
}) {
  const radio = incident.radioLines[verdict];
  const percent = Math.round(cropRatio * 100);

  return (
    <main className="verdict screen-in">
      <p className="kicker">Case #{incident.caseNo} · filed</p>
      <p className={`stamp stamp-${verdict.replace(/\s+/g, '-').toLowerCase()}`}>{verdict}</p>

      <section className="compare">
        <figure>
          <figcaption>Original</figcaption>
          <img src={originalImage} alt="Original still" />
        </figure>
        <figure className="evidence">
          <figcaption>Your evidence</figcaption>
          <img src={croppedImage} alt="Cropped evidence" />
        </figure>
      </section>

      <article className="poster">
        <p className="poster-brand">Costa Luma Central Blotter</p>
        <h2>Wanted for filing</h2>
        <div className="poster-shot">
          <img src={croppedImage} alt="Official crop" />
        </div>
        <dl>
          <div>
            <dt>Subject</dt>
            <dd>{incident.subject}</dd>
          </div>
          <div>
            <dt>Charge</dt>
            <dd>{incident.charge}</dd>
          </div>
          <div>
            <dt>Frame used</dt>
            <dd>{percent}% of the original still</dd>
          </div>
        </dl>
        <p className="radio">Radio: “{radio}”</p>
      </article>

      <div className="row-actions">
        <button type="button" className="primary" onClick={onDownload}>
          Download evidence
        </button>
        <button type="button" className="ghost" onClick={onDownloadPoster}>
          Download poster
        </button>
      </div>
      <div className="row-actions">
        <button type="button" className="ghost" onClick={onAddMore}>
          Keep editing this pic
        </button>
        <button type="button" className="ghost" onClick={onStampExtra}>
          Stamp another still
        </button>
      </div>
      <div className="row-actions">
        <button type="button" className="primary" onClick={onAgain}>
          Another case
        </button>
        <button type="button" className="ghost" onClick={onMenu}>
          End shift
        </button>
      </div>
    </main>
  );
}
