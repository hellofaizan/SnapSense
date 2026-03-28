/* global snapsense */

const MIN_W = 24;
const MIN_H = 24;

const bg = document.getElementById('bg');
const sel = document.getElementById('sel');
const ctxBg = bg.getContext('2d');
const ctxSel = sel.getContext('2d');

let sourceId = null;
let dragging = false;
let startX = 0;
let startY = 0;
let curX = 0;
let curY = 0;
let ready = false;

function mapMouse(e) {
  const rect = bg.getBoundingClientRect();
  const sx = bg.width / rect.width;
  const sy = bg.height / rect.height;
  return {
    x: (e.clientX - rect.left) * sx,
    y: (e.clientY - rect.top) * sy
  };
}

function resizeSelCanvas() {
  sel.width = window.innerWidth;
  sel.height = window.innerHeight;
}

function drawSelection() {
  ctxSel.clearRect(0, 0, sel.width, sel.height);
  if (!ready) return;
  ctxSel.fillStyle = 'rgba(0, 0, 0, 0.42)';
  ctxSel.fillRect(0, 0, sel.width, sel.height);
  if (!dragging) return;
  const rect = bg.getBoundingClientRect();
  const scaleX = rect.width / bg.width;
  const scaleY = rect.height / bg.height;
  const x1 = Math.min(startX, curX);
  const y1 = Math.min(startY, curY);
  const x2 = Math.max(startX, curX);
  const y2 = Math.max(startY, curY);
  const rx = rect.left + x1 * scaleX;
  const ry = rect.top + y1 * scaleY;
  const rw = (x2 - x1) * scaleX;
  const rh = (y2 - y1) * scaleY;
  ctxSel.clearRect(rx, ry, rw, rh);
  ctxSel.strokeStyle = 'rgba(138, 180, 255, 0.95)';
  ctxSel.lineWidth = 2;
  ctxSel.strokeRect(rx + 0.5, ry + 0.5, Math.max(0, rw - 1), Math.max(0, rh - 1));
}

async function getDesktopStream() {
  const hi = {
    audio: false,
    video: {
      cursor: 'never',
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
        maxWidth: 7680,
        maxHeight: 4320,
        minWidth: 1,
        minHeight: 1,
        maxFrameRate: 60,
        googCaptureMouseCursor: false
      }
    }
  };
  const lo = {
    audio: false,
    video: {
      cursor: 'never',
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
        googCaptureMouseCursor: false
      }
    }
  };
  try {
    return await navigator.mediaDevices.getUserMedia(hi);
  } catch (e) {
    return navigator.mediaDevices.getUserMedia(lo);
  }
}

async function freezeFrame() {
  let stream;
  try {
    stream = await getDesktopStream();
  } catch (e) {
    console.error('[SnapSense capture] getUserMedia failed', e);
    window.snapsense.sendCaptureCancel();
    return;
  }
  const video = document.createElement('video');
  video.srcObject = stream;
  video.muted = true;
  await video.play();
  await new Promise((r) => {
    if (video.readyState >= 2) r();
    else video.addEventListener('loadeddata', r, { once: true });
  });
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (vw < 2 || vh < 2) {
    console.error('[SnapSense capture] Invalid video dimensions', vw, vh);
    window.snapsense.sendCaptureCancel();
    return;
  }
  /* Native stream resolution — avoids blur from scaling; CSS stretches canvas to fill the overlay */
  bg.width = vw;
  bg.height = vh;
  ctxBg.imageSmoothingEnabled = true;
  ctxBg.imageSmoothingQuality = 'high';
  ctxBg.drawImage(video, 0, 0, vw, vh);
  stream.getTracks().forEach((t) => t.stop());
  video.srcObject = null;
  ready = true;
  drawSelection();
}

function cropSelection() {
  const x1 = Math.min(startX, curX);
  const y1 = Math.min(startY, curY);
  const x2 = Math.max(startX, curX);
  const y2 = Math.max(startY, curY);
  let w = Math.round(x2 - x1);
  let h = Math.round(y2 - y1);
  if (w < MIN_W || h < MIN_H) {
    return null;
  }
  const sx = Math.round(x1);
  const sy = Math.round(y1);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const cctx = c.getContext('2d');
  cctx.imageSmoothingEnabled = true;
  cctx.imageSmoothingQuality = 'high';
  cctx.drawImage(bg, sx, sy, w, h, 0, 0, w, h);
  return c.toDataURL('image/png');
}

function onDown(e) {
  if (!ready) return;
  dragging = true;
  const p = mapMouse(e);
  startX = p.x;
  startY = p.y;
  curX = p.x;
  curY = p.y;
  drawSelection();
}

function onMove(e) {
  if (!dragging) return;
  const p = mapMouse(e);
  curX = p.x;
  curY = p.y;
  drawSelection();
}

function onUp() {
  if (!dragging) return;
  dragging = false;
  const dataUrl = cropSelection();
  drawSelection();
  if (!dataUrl) {
    document.getElementById('hint').textContent =
      'Selection too small — try a larger area (Esc to cancel)';
    return;
  }
  window.snapsense.sendCaptureResult({ imageDataUrl: dataUrl, mime: 'image/png' });
}

function cancel() {
  window.snapsense.sendCaptureCancel();
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    cancel();
  }
});

window.addEventListener('mousedown', onDown);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onUp);

window.addEventListener('resize', () => {
  resizeSelCanvas();
  drawSelection();
});

const unsub = window.snapsense.onCaptureInit((payload) => {
  sourceId = payload.sourceId;
  resizeSelCanvas();
  requestAnimationFrame(() => {
    freezeFrame().catch((err) => {
      console.error('[SnapSense capture] freezeFrame', err);
      cancel();
    });
  });
});

window.addEventListener('beforeunload', () => {
  if (typeof unsub === 'function') unsub();
});
// feat: basic screenshot capture flow @ 12:48:00
// feat: add selection rectangle drag logic @ 13:05:00
// fix: fullscreen capture (taskbar issue) @ 13:22:00
// ui: improve selection overlay visuals @ 14:05:00
// fix: crash on rescreenshot @ 16:35:00
// feat: basic screenshot capture flow @ 12:48:00
// feat: add selection rectangle drag logic @ 13:05:00
// fix: fullscreen capture (taskbar issue) @ 13:22:00
// ui: improve selection overlay visuals @ 14:05:00
// fix: crash on rescreenshot @ 16:35:00
// feat: basic screenshot capture flow @ 12:47:00
// feat: selection rectangle drag logic @ 13:03:00
// fix: fullscreen capture (taskbar overlap) @ 13:21:00
// ui: improve overlay + blur feel @ 14:04:00
// fix: crash on rescreenshot during active flow @ 16:33:00
// feat: basic screenshot capture flow @ 12:47:00
// feat: selection rectangle drag logic @ 13:03:00
// fix: fullscreen capture (taskbar overlap) @ 13:21:00
// ui: improve overlay + blur feel @ 14:04:00
// fix: crash on rescreenshot during active flow @ 16:33:00
// feat: basic screenshot capture flow @ 12:47:00
// feat: selection rectangle drag logic @ 13:03:00
// fix: fullscreen capture (taskbar overlap) @ 13:21:00
// ui: improve overlay + blur feel @ 14:04:00
// fix: crash on rescreenshot during active flow @ 16:33:00
