const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'src', 'baked-groq-key.js');
if (fs.existsSync(p)) {
  fs.unlinkSync(p);
  console.log('[clear-baked-key] Removed src/baked-groq-key.js');
}
