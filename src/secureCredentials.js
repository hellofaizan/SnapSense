const { app, safeStorage } = require('electron');
const fs = require('fs');
const path = require('path');

const FILE_NAME = 'openai-api.token';

function tokenFilePath() {
  return path.join(app.getPath('userData'), FILE_NAME);
}

/**
 * Persists the OpenAI API key using the OS secret store (DPAPI on Windows via Chromium safeStorage).
 */
function setOpenAiApiKey(plain) {
  const trimmed = typeof plain === 'string' ? plain.trim() : '';
  if (!trimmed) {
    clearOpenAiApiKey();
    return { ok: true, cleared: true };
  }
  if (!safeStorage.isEncryptionAvailable()) {
    return {
      ok: false,
      error: 'OS encryption is not available; the API key cannot be stored securely.'
    };
  }
  try {
    const encrypted = safeStorage.encryptString(trimmed);
    const dir = path.dirname(tokenFilePath());
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(tokenFilePath(), encrypted);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message || 'Could not save API key.' };
  }
}

function getOpenAiApiKeySync() {
  const p = tokenFilePath();
  if (!fs.existsSync(p)) {
    return '';
  }
  if (!safeStorage.isEncryptionAvailable()) {
    return '';
  }
  try {
    const buf = fs.readFileSync(p);
    return safeStorage.decryptString(buf);
  } catch {
    return '';
  }
}

function clearOpenAiApiKey() {
  const p = tokenFilePath();
  if (fs.existsSync(p)) {
    try {
      fs.unlinkSync(p);
    } catch {
      /* ignore */
    }
  }
}

module.exports = {
  setOpenAiApiKey,
  getOpenAiApiKeySync,
  clearOpenAiApiKey
};
