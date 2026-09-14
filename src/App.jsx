import { useRef, useState } from 'react';
import { customIncident } from './data/incidents.js';
import { measureCrop } from './game/verdict.js';
import BootMenu from './screens/BootMenu.jsx';
import HowWeWork from './screens/HowWeWork.jsx';
import EvidenceLocker from './screens/EvidenceLocker.jsx';
import Brief from './screens/Brief.jsx';
import CropDesk from './screens/CropDesk.jsx';
import Caption from './screens/Caption.jsx';
import CaseFile from './screens/CaseFile.jsx';
import LoadingScreen from './screens/LoadingScreen.jsx';

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const [screen, setScreen] = useState('boot');
  const [incident, setIncident] = useState(null);
  const [workingImage, setWorkingImage] = useState(null);
  const [sourceImage, setSourceImage] = useState(null);
  const [editorKey, setEditorKey] = useState(0);
  const [pending, setPending] = useState(null);
  const [exhibits, setExhibits] = useState([]);
  const [filedAt, setFiledAt] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const uploadRef = useRef(null);
  const extraRef = useRef(null);
  const loadTimer = useRef(null);

  function cinematic(next, ms = 2400) {
    window.clearTimeout(loadTimer.current);
    setLoading(true);
    loadTimer.current = window.setTimeout(() => {
      setScreen(next);
      setLoading(false);
    }, ms);
  }

  function resetCase() {
    setIncident(null);
    setWorkingImage(null);
    setSourceImage(null);
    setPending(null);
    setExhibits([]);
    setFiledAt(null);
    setLoadError(false);
  }

  function pickIncident(next) {
    setIncident(next);
    setWorkingImage(next.image);
    setSourceImage(next.image);
    setEditorKey((n) => n + 1);
    setLoadError(false);
    setPending(null);
    setExhibits([]);
    setFiledAt(null);
    setScreen('brief');
  }

  async function handleUpload(file) {
    const src = await readFile(file);
    pickIncident(customIncident(src, file.name));
  }

  function openUpload() {
    uploadRef.current?.click();
  }

  async function handleSave(dataUrl) {
    setBusy(true);
    try {
      const measured = await measureCrop(sourceImage || incident.image, dataUrl);
      setPending({
        image: dataUrl,
        ratio: measured.ratio,
        verdict: measured.verdict,
        size: measured.cropSize,
        title: incident.subject,
        subtitle: incident.charge,
      });
      setScreen('caption');
    } catch (error) {
      console.error(error);
      setLoadError(true);
    } finally {
      setBusy(false);
    }
  }

  function handleCancel(reason) {
    if (reason === 'load-error') {
      setLoadError(true);
      return;
    }
    if (exhibits.length) {
      setScreen('dossier');
      return;
    }
    setScreen('brief');
  }

  function fileExhibit({ title, subtitle }) {
    const next = {
      id: `ex-${Date.now()}`,
      image: pending.image,
      title,
      subtitle,
      ratio: pending.ratio,
      verdict: pending.verdict,
      size: pending.size,
    };
    setExhibits((list) => [...list, next]);
    setFiledAt(Date.now());
    setPending(null);
    setScreen('dossier');
  }

  function openCrop(image) {
    setWorkingImage(image);
    setSourceImage(image);
    setEditorKey((n) => n + 1);
    setLoadError(false);
    setScreen('desk');
  }

  async function handleNewStill(file) {
    const src = await readFile(file);
    openCrop(src);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <input
        ref={uploadRef}
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleUpload(file);
          event.target.value = '';
        }}
      />
      <input
        ref={extraRef}
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleNewStill(file);
          event.target.value = '';
        }}
      />

      {screen === 'boot' ? (
        <BootMenu
          onStart={() => cinematic('locker')}
          onUpload={openUpload}
          onHow={() => setScreen('how')}
        />
      ) : null}

      {screen === 'how' ? <HowWeWork onBack={() => setScreen('boot')} /> : null}

      {screen === 'locker' ? (
        <EvidenceLocker
          onPick={pickIncident}
          onUpload={handleUpload}
          onBack={() => setScreen('boot')}
        />
      ) : null}

      {screen === 'brief' && incident ? (
        <Brief
          incident={incident}
          onCrop={() => openCrop(incident.image)}
          onBack={() => setScreen('locker')}
        />
      ) : null}

      {screen === 'desk' && incident && workingImage ? (
        <CropDesk
          incident={incident}
          imageSrc={workingImage}
          editorKey={editorKey}
          onSave={handleSave}
          onCancel={handleCancel}
          loadError={loadError}
          busy={busy}
        />
      ) : null}

      {screen === 'caption' && incident && pending ? (
        <Caption
          key={pending.image.slice(-48)}
          incident={incident}
          pending={pending}
          onFile={fileExhibit}
          onBack={() => setScreen('desk')}
        />
      ) : null}

      {screen === 'dossier' && incident ? (
        <CaseFile
          incident={incident}
          exhibits={exhibits}
          filedAt={filedAt}
          onAddCrop={() => openCrop(incident.image)}
          onAddStill={() => extraRef.current?.click()}
          onPrint={handlePrint}
          onAgain={() => {
            resetCase();
            setScreen('locker');
          }}
          onMenu={() => {
            resetCase();
            setScreen('boot');
          }}
        />
      ) : null}

      <LoadingScreen visible={loading} />
    </>
  );
}
