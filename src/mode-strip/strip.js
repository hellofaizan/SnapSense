/* global snapsense */

function setMode(mode) {
  const segs = document.querySelectorAll('.seg');
  segs.forEach((b) => {
    const on = b.getAttribute('data-mode') === mode;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  window.snapsense.sendCaptureMode(mode);
}

document.querySelectorAll('.seg').forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = btn.getAttribute('data-mode');
    if (mode) setMode(mode);
  });
});

const unsub = window.snapsense.onModeStripInit((payload) => {
  const mode = payload?.defaultMode || 'ai';
  setMode(mode);
});

window.addEventListener('beforeunload', () => {
  if (typeof unsub === 'function') unsub();
});
