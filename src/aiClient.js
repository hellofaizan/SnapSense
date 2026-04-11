const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const { getOpenAiApiKeySync } = require('./secureCredentials');

const DUMMY_GROQ_KEY = 'groq-dummy-replace-with-your-key';
const DEFAULT_GROQ_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';
const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions';
const PROMPTS_PATH = path.join(__dirname, '..', 'config', 'ai-prompts.json');

/**
 * Settings are stored in the OS user-data directory so they survive asar packaging
 * and can be written to in production builds (the asar archive is read-only).
 * Falls back to the repo config/ folder in development for convenience.
 */
function getSettingsPath() {
  try {
    const userData = app.getPath('userData');
    return path.join(userData, 'ai-settings.json');
  } catch {
    // app not ready yet (unit-test context) – fall back to dev path
    return path.join(__dirname, '..', 'config', 'ai-settings.json');
  }
}

function getSettingsPathFallback() {
  return path.join(__dirname, '..', 'config', 'ai-settings.json');
}

/** Populated only when `npm run dist` / `pack` runs `scripts/bake-key-for-dist.js` (file is gitignored). */
function getBakedGroqKey() {
  try {
    return String(require('./baked-groq-key')).trim();
  } catch {
    return '';
  }
}

function getGroqKey() {
  const env = (process.env.GROQ_KEY || '').trim();
  if (env) return env;
  const baked = getBakedGroqKey();
  if (baked) return baked;
  return DUMMY_GROQ_KEY;
}

function readJsonSafe(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJsonSafe(filePath, value) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  } catch (e) {
    // Silently ignore write failures (e.g. read-only asar in production)
    console.warn('[SnapSense aiClient] writeJsonSafe failed:', e?.message, filePath);
  }
}

/**
 * Read settings: try userData first, fall back to bundled config/ for initial defaults.
 */
function readSettings() {
  const primary = getSettingsPath();
  const settings = readJsonSafe(primary, null);
  if (settings !== null) return settings;
  // First run in production: seed from bundled defaults if available
  const fallback = readJsonSafe(getSettingsPathFallback(), {});
  return fallback;
}

function writeSettings(settings) {
  writeJsonSafe(getSettingsPath(), settings);
}

function getModelMode() {
  const settings = readSettings();
  let m = settings.modelMode;
  if (m === 'test') {
    settings.modelMode = 'groq';
    writeSettings(settings);
    return 'groq';
  }
  if (m === 'openai') return 'openai';
  return 'groq';
}

function setModelMode(mode) {
  const normalized = mode === 'openai' ? 'openai' : 'groq';
  const settings = readSettings();
  settings.modelMode = normalized;
  writeSettings(settings);
  return normalized;
}

function getOpenAiModel() {
  const settings = readSettings();
  const fromFile = (settings.openaiModel || '').trim();
  if (fromFile) return fromFile;
  const env = (process.env.OPENAI_MODEL || '').trim();
  return env || DEFAULT_OPENAI_MODEL;
}

function setOpenAiModel(model) {
  const trimmed = typeof model === 'string' ? model.trim() : '';
  const value = trimmed || DEFAULT_OPENAI_MODEL;
  const settings = readSettings();
  settings.openaiModel = value;
  writeSettings(settings);
  return value;
}

function getStealthMode() {
  const settings = readSettings();
  return Boolean(settings.stealthMode);
}

function setStealthMode(enabled) {
  const value = Boolean(enabled);
  const settings = readSettings();
  settings.stealthMode = value;
  writeSettings(settings);
  return value;
}

function getOpenAiKey() {
  const env = (process.env.OPENAI_API_KEY || '').trim();
  if (env) return env;
  return getOpenAiApiKeySync();
}

function getGroqModel() {
  const configured = (process.env.GROQ_MODEL || '').trim();
  if (configured) return configured;
  return DEFAULT_GROQ_MODEL;
}

function getPrompt(name) {
  const defaults = {
    chatSystemPrompt:
      'You are SnapSense AI assistant. Give direct, practical answers about the screenshot. If output is JSON, format it in markdown code blocks.',
    ocrSystemPrompt:
      'You are an OCR extractor. Extract all visible text exactly as seen. Do not explain. Do not summarize. Preserve line breaks and order. Return only plain text.'
  };
  const prompts = readJsonSafe(PROMPTS_PATH, defaults);
  if (name === 'ocr') return String(prompts.ocrSystemPrompt || defaults.ocrSystemPrompt);
  return String(prompts.chatSystemPrompt || defaults.chatSystemPrompt);
}

function getAiKeyStatus() {
  const mode = getModelMode();
  if (mode === 'openai') {
    const key = getOpenAiKey();
    const isDummy = !key || key.length < 20;
    return {
      configured: Boolean(key && !isDummy),
      isDummy,
      provider: 'openai'
    };
  }
  return { configured: true, isDummy: false, provider: 'groq' };
}

async function requestGroq(messages, maxTokens = 4096, logger = null) {
  const apiKey = getGroqKey();
  if (!apiKey || apiKey === DUMMY_GROQ_KEY) {
    return {
      error: 'Groq API key is not configured.'
    };
  }
  const model = getGroqModel();
  if (logger?.debug) {
    const userMessageCount = Array.isArray(messages)
      ? messages.filter((m) => m && m.role === 'user').length
      : 0;
    logger.debug('aiClient', 'Groq request', { userMessageCount });
  }

  const body = {
    model,
    messages,
    max_tokens: maxTokens
  };
  let res;
  try {
    res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
  } catch (e) {
    if (logger?.error) {
      logger.error('aiClient', 'Groq fetch failed', { message: e.message, model });
    }
    return { error: e.message || 'Network error - check your connection.' };
  }

  const text = await res.text();
  if (!res.ok) {
    if (logger?.error) {
      logger.error('aiClient', 'Groq HTTP error', { status: res.status, body: text.slice(0, 500), model });
    }
    return { error: `Groq error ${res.status}: ${text.slice(0, 240)}` };
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    if (logger?.error) {
      logger.error('aiClient', 'Groq parse error', e);
    }
    return { error: 'Invalid response from Groq.' };
  }
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    if (logger?.error) {
      logger.error('aiClient', 'Groq unexpected shape', data);
    }
    return { error: 'Unexpected Groq response.' };
  }

  if (logger?.info) {
    logger.info('aiClient', 'Model resolved', { model });
  }
  return { content };
}

async function requestOpenAi(messages, maxTokens = 4096, logger = null) {
  const apiKey = getOpenAiKey();
  if (!apiKey || apiKey.length < 20) {
    return { error: 'OpenAI API key is not configured.' };
  }
  const model = getOpenAiModel();
  if (logger?.debug) {
    const userMessageCount = Array.isArray(messages)
      ? messages.filter((m) => m && m.role === 'user').length
      : 0;
    logger.debug('aiClient', 'OpenAI request', { userMessageCount, model });
  }

  const body = {
    model,
    messages,
    max_tokens: maxTokens
  };
  let res;
  try {
    res = await fetch(OPENAI_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
  } catch (e) {
    if (logger?.error) {
      logger.error('aiClient', 'OpenAI fetch failed', { message: e.message, model });
    }
    return { error: e.message || 'Network error - check your connection.' };
  }

  const text = await res.text();
  if (!res.ok) {
    if (logger?.error) {
      logger.error('aiClient', 'OpenAI HTTP error', {
        status: res.status,
        body: text.slice(0, 500),
        model
      });
    }
    return { error: `OpenAI error ${res.status}: ${text.slice(0, 240)}` };
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    if (logger?.error) {
      logger.error('aiClient', 'OpenAI parse error', e);
    }
    return { error: 'Invalid response from OpenAI.' };
  }
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    if (logger?.error) {
      logger.error('aiClient', 'OpenAI unexpected shape', data);
    }
    return { error: 'Unexpected OpenAI response.' };
  }

  if (logger?.info) {
    logger.info('aiClient', 'Model resolved', { model, provider: 'openai' });
  }
  return { content };
}

async function requestAi(messages, maxTokens = 4096, logger = null) {
  const modelMode = getModelMode();
  if (modelMode === 'openai') {
    return requestOpenAi(messages, maxTokens, logger);
  }
  return requestGroq(messages, maxTokens, logger);
}

module.exports = {
  getAiKeyStatus,
  getModelMode,
  setModelMode,
  getOpenAiModel,
  setOpenAiModel,
  getStealthMode,
  setStealthMode,
  getPrompt,
  requestAi
};
