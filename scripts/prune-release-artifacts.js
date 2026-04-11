'use strict';

const fs = require('fs');
const path = require('path');

/**
 * After electron-builder finishes, keep only primary installers for GitHub Releases:
 * .exe (NSIS), .dmg, .AppImage — drops blockmaps, latest*.yml, mac .zip, and other side files.
 */
module.exports = async function pruneReleaseArtifacts() {
  const dist = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(dist)) return;

  for (const name of fs.readdirSync(dist)) {
    const full = path.join(dist, name);
    let st;
    try {
      st = fs.statSync(full);
    } catch {
      continue;
    }
    if (!st.isFile()) continue;

    const keep =
      /\.exe$/i.test(name) || /\.dmg$/i.test(name) || /\.AppImage$/i.test(name);
    if (!keep) {
      fs.unlinkSync(full);
      console.log('[SnapSense] pruned dist file:', name);
    }
  }
};
