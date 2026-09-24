export default function Brief({ incident, onCrop, onBack }) {
  return (
    <main className="brief screen-in">
      <p className="kicker">Case #{incident.caseNo}</p>
      <h1>{incident.title}</h1>
      <p className="location">Location: {incident.location}</p>
      <p className="orders">
        Identify the suspect.
        <br />
        Full frame.
        <br />
        Extra proofs are their own pictures. Never stacked on top.
      </p>
      <blockquote>“{incident.officerQuote}”</blockquote>
      <figure className="still">
        <img src={incident.image} alt="" />
      </figure>
      <div className="row-actions">
        <button type="button" className="primary" onClick={onCrop}>
          Open the scope
        </button>
        <button type="button" className="ghost" onClick={onBack}>
          Back
        </button>
      </div>
    </main>
  );
}
