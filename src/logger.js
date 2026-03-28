const { app } = require('electron');

function ts() {
  return new Date().toISOString();
}

function log(level, scope, message, meta) {
  const line = `[${ts()}] [${level.toUpperCase()}] [${scope}] ${message}`;
  if (meta !== undefined) {
    console[level === 'error' ? 'error' : 'log'](line, meta);
  } else {
    console[level === 'error' ? 'error' : 'log'](line);
  }
}

module.exports = {
  info(scope, message, meta) {
    log('info', scope, message, meta);
  },
  warn(scope, message, meta) {
    log('warn', scope, message, meta);
  },
  error(scope, message, meta) {
    log('error', scope, message, meta);
  },
  debug(scope, message, meta) {
    if (!app.isPackaged || process.env.SNAPSENSE_DEBUG === '1') {
      log('info', scope, `[debug] ${message}`, meta);
    }
  }
};
