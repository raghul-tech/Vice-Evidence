export default function HowWeWork({ onBack }) {
  return (
    <main className="how screen-in">
      <p className="kicker">Desk 4 · After hours</p>
      <h1>Standing Orders</h1>
      <p className="lede">
        Costa Luma only. This blotter covers jobs on the map — raids, getaways, blasts.
        Nobody walks in. Nobody talks. You work from the still.
      </p>
      <ul className="policy">
        <li>A still from the job is enough. Isolate the gunman, the bomber, the lookout.</li>
        <li>If they fill the frame, they go on the wall. That is the wanted poster.</li>
        <li>Each still is its own proof. Name it. File it. Do not stack pictures.</li>
        <li>The folder is the warrant. Print it like the city can see it.</li>
        <li>The heat stays on the map. Nothing here leaves the game.</li>
      </ul>
      <button type="button" className="ghost" onClick={onBack}>
        Back
      </button>
    </main>
  );
}
