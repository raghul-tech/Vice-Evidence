import ImageEditor from '@unlayer/react-image-editor';

export default function CropDesk({ incident, imageSrc, editorKey, onSave, onCancel, loadError, busy }) {
  const src =
    imageSrc.startsWith('http') || imageSrc.startsWith('data:')
      ? imageSrc
      : `${window.location.origin}${imageSrc}`;

  return (
    <main className="desk screen-in">
      <header className="desk-bar">
        <div>
          <p className="kicker">Costa Luma Central Blotter · Desk 4 · Unlayer</p>
          <h1>Suspect must fill the frame</h1>
        </div>
        <p className="desk-note">
          This is the whole job. Crop, draw, text, stickers. Save when the guilty party is the picture.
        </p>
      </header>

      {loadError ? (
        <p className="error" role="alert">
          Desk 4 could not load the still. Try another case or a smaller file.
        </p>
      ) : null}

      <div className="editor-shell">
        <ImageEditor
          key={`${incident.id}-${editorKey}`}
          image={src}
          minHeight={760}
          options={{
            theme: 'dark',
            features: {
              imageEditor: { dock: 'left' },
            },
          }}
          onSave={({ dataUrl }) => onSave(dataUrl)}
          onCancel={() => onCancel()}
          onLoadError={() => onCancel('load-error')}
        />
      </div>

      {busy ? <p className="busy">Holding the still…</p> : null}
    </main>
  );
}
