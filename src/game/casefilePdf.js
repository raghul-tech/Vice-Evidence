import { jsPDF } from 'jspdf';
import { imageToJpegDataUrl } from './composite.js';

function wrap(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(String(text || '—'), maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export async function downloadCasePdf({ incident, exhibits, filedAt }) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const filed = filedAt
    ? new Date(filedAt).toLocaleString()
    : new Date().toLocaleString();

  drawCover(doc, { incident, exhibits, filed, pageW, margin });

  for (let i = 0; i < exhibits.length; i += 1) {
    doc.addPage();
    await drawExhibit(doc, {
      incident,
      exhibit: exhibits[i],
      index: i + 1,
      total: exhibits.length,
      filed,
      pageW,
      pageH,
      margin,
    });
  }

  doc.save(`vice-evidence-case-${incident.caseNo}.pdf`);
}

function drawCover(doc, { incident, exhibits, filed, pageW, margin }) {
  doc.setFillColor(18, 16, 14);
  doc.rect(0, 0, pageW, 120, 'F');
  doc.setTextColor(212, 179, 106);
  doc.setFont('courier', 'normal');
  doc.setFontSize(10);
  doc.text('COSTA LUMA CENTRAL BLOTTER  ·  DESK 4', margin, 42);
  doc.setTextColor(239, 228, 200);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('CASE FILE', margin, 78);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Case #${incident.caseNo}`, margin, 102);

  let y = 160;
  doc.setTextColor(26, 20, 12);
  const rows = [
    ['Incident', incident.title],
    ['Location', incident.location],
    ['Subject', incident.subject],
    ['Charge', incident.charge],
    ['Proof count', String(exhibits.length)],
    ['Filed', filed],
    ['Desk', 'Desk 4'],
    ['Agency', 'Costa Luma Central Blotter'],
  ];

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  for (const [label, value] of rows) {
    doc.setTextColor(140, 110, 50);
    doc.text(label.toUpperCase(), margin, y);
    doc.setTextColor(26, 20, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    y = wrap(doc, value, margin, y + 16, pageW - margin * 2, 16);
    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    y += 18;
  }

  doc.setDrawColor(226, 61, 61);
  doc.setLineWidth(2);
  doc.line(margin, y + 4, pageW - margin, y + 4);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(80, 70, 55);
  doc.text('Each exhibit is a separate still. The crop is the accusation.', margin, y + 28);
}

async function drawExhibit(doc, { incident, exhibit, index, total, filed, pageW, pageH, margin }) {
  doc.setFillColor(18, 16, 14);
  doc.rect(0, 0, pageW, 72, 'F');
  doc.setTextColor(212, 179, 106);
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.text(`CASE #${incident.caseNo}  ·  ${incident.location}`, margin, 28);
  doc.setTextColor(239, 228, 200);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`EXHIBIT ${String(index).padStart(2, '0')}  /  ${String(total).padStart(2, '0')}`, margin, 52);

  let y = 100;
  doc.setTextColor(26, 20, 12);
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(140, 110, 50);
  doc.text('TITLE', margin, y);
  doc.setTextColor(26, 20, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  y = wrap(doc, exhibit.title, margin, y + 20, pageW - margin * 2, 20);

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(140, 110, 50);
  y += 18;
  doc.text('SUBTITLE', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(26, 20, 12);
  y = wrap(doc, exhibit.subtitle, margin, y + 16, pageW - margin * 2, 16);

  const jpeg = await imageToJpegDataUrl(exhibit.image, 0.82);
  const maxW = pageW - margin * 2;
  const maxH = 340;
  const scale = Math.min(maxW / jpeg.width, maxH / jpeg.height);
  const dw = jpeg.width * scale;
  const dh = jpeg.height * scale;
  y += 20;
  doc.setFillColor(17, 17, 17);
  doc.rect(margin, y, maxW, dh + 12, 'F');
  doc.addImage(jpeg.dataUrl, 'JPEG', margin + (maxW - dw) / 2, y + 6, dw, dh);
  y += dh + 28;

  const meta = [
    `Location: ${incident.location}`,
    `Frame used: ${Math.round(exhibit.ratio * 100)}% of source still`,
    `Pixels: ${exhibit.size?.w || jpeg.width} × ${exhibit.size?.h || jpeg.height}`,
    `Desk stamp: ${exhibit.verdict}`,
    `Filed: ${filed}`,
    `Proof ${index} of ${total}`,
  ];
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 50, 40);
  for (const line of meta) {
    if (y > pageH - 48) break;
    doc.text(line, margin, y);
    y += 14;
  }
}
