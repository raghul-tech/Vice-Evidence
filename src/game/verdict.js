export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not read image'));
    img.src = src;
  });
}

export function verdictFromRatio(ratio) {
  if (ratio <= 0.3) return 'WANTED';
  if (ratio <= 0.6) return 'POSSIBLE SUSPECT';
  if (ratio <= 0.9) return 'INSUFFICIENT EVIDENCE';
  return 'DENIED';
}

export async function measureCrop(originalSrc, croppedSrc) {
  const original = await loadImage(originalSrc);
  const cropped = await loadImage(croppedSrc);
  const originalArea = original.naturalWidth * original.naturalHeight;
  const cropArea = cropped.naturalWidth * cropped.naturalHeight;
  const ratio = Math.min(1, cropArea / originalArea);
  return {
    ratio,
    verdict: verdictFromRatio(ratio),
    originalSize: { w: original.naturalWidth, h: original.naturalHeight },
    cropSize: { w: cropped.naturalWidth, h: cropped.naturalHeight },
  };
}
