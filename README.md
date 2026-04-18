<p align="center">
  <a href="https://github.com/hellofaizan/SnapSense/releases/latest">
    <img src="assets/icon.png" alt="SnapSense" width="160" height="160" />
  </a>
</p>

<h1 align="center">SnapSense</h1>

<p align="center">
  Tray screenshot tool with AI chat, text extraction, and Google Lens — built with Electron.
</p>

<p align="center">
  <a href="https://snapsense-tawny.vercel.app/">Website</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/hellofaizan/SnapSense/releases/latest">Download latest release</a>
</p>

---

## Features

- **Capture** — Global shortcut freezes the desktop and lets you drag a region to analyze.
- **AI** — Send the capture to **Groq** for chat-style answers and follow-up questions.
- **Text** — OCR-style extraction from the screenshot.
- **Lens** — Open or route captures toward Google Lens workflows.

## Requirements

- **Windows** (x64), **Linux** (x86_64 AppImage), or **macOS** (Apple Silicon DMG) for running release builds.
- **Node.js** 18+ for development and builds.
- A **Groq API key** ([Groq Console](https://console.groq.com/)) for live AI (not needed for **Test** mode).

### macOS (Apple Silicon DMG)

| Topic | What to do |
|--------|------------|
| **Capture shortcut** | **⌘⌥S** — **Command + Option + S** (same idea as Win+Alt+S on Windows). The app registers this explicitly on macOS. |
| **Gatekeeper / “damaged” app** | Unsigned builds: **Right‑click the app → Open** the first time, or allow in **System Settings → Privacy & Security**. |
| **Screen Recording** | Required for `desktopCapturer`. Go to **System Settings → Privacy & Security → Screen Recording** and enable **SnapSense**, then **quit and reopen** the app. If the shortcut “does nothing” or capture never starts, this is usually the cause. |
| **Accessibility** | If the global shortcut still never fires, enable **SnapSense** under **System Settings → Privacy & Security → Accessibility** (Electron may prompt when you first run the app). |
| **Tray** | SnapSense lives in the **menu bar**. Use **Capture region** if the shortcut is blocked by another app. |
| **Install location** | Prefer dragging **SnapSense.app** into **Applications** before running (more stable than running only from the DMG mount). |

---

## Quick start (development)

```bash
npm install
```

Create a `.env` file in the **project root** (same folder as `package.json`):

```env
GROQ_KEY=your_groq_api_key_here
```

```bash
npm run dev
```

The app runs in the system tray / menu bar. Use the shortcut (**Win + Alt + S** on Windows, **⌘ + Option + S** on macOS) or the tray menu → **Capture region**.

---

## Groq key: local vs packaged builds

Release installers can **embed** a Groq key so users do not need their own key. That happens in `scripts/bake-key-for-dist.js`, which runs **before** every `dist:*` / `pack` command.

### Local builds (your machine)

The bake script looks for the key in this order:

1. **`GROQ_KEY` environment variable** (highest priority)
2. **`GROQ_KEY=` in `.env`** in the project root

If neither is set or the key is too short, the bake step exits with an error.

Example using only the shell (no `.env`):

```bash
# Windows PowerShell
$env:GROQ_KEY="gsk_..."; npm run dist:win:local

# macOS / Linux
GROQ_KEY="gsk_..." npm run dist:mac:local
```

`.env` is gitignored — do not commit it.

### GitHub Actions (CI releases)

The workflow **`.github/workflows/release.yml`** runs on **tag pushes** and passes the key into the build environment as:

```yaml
GROQ_KEY: ${{ secrets.GROQ_KEY }}
```

**You must create the secret in the GitHub UI** (the workflow cannot read your local `.env`):

1. Open the repository on GitHub.
2. **Settings** → **Secrets and variables** → **Actions**.
3. **New repository secret**.
4. **Name:** `GROQ_KEY` (exact spelling).
5. **Value:** your Groq API key.
6. Save.

Then push a version tag (e.g. `v0.1.3`) or **re-run failed jobs** after adding the secret. If `GROQ_KEY` is missing, the log will show:

`[bake-key-for-dist] GROQ_KEY not found. Set the GROQ_KEY env var (CI) or add it to .env (local).`

`GITHUB_TOKEN` is provided automatically for **electron-builder** to upload installers to the release — you do not add it manually for standard builds.

---

## Building installers

All `dist` scripts run `bake-key-for-dist.js` first, then **electron-builder**.

| Command | Output (under `dist/`) |
|---------|------------------------|
| `npm run dist:win` | Windows NSIS `SnapSense-Setup-<version>.exe` |
| `npm run dist:linux` | Linux `SnapSense-<version>-x86_64.AppImage` |
| `npm run dist:mac` | macOS `SnapSense-<version>-arm64.dmg` |
| `npm run dist` | Default targets from `package.json` |
| `npm run pack` | Unpacked app dir for quick testing |

Use **`*:local`** variants (`dist:win:local`, etc.) to build **without** publishing to GitHub (adds `--publish never`).

After a full multi-target build, `scripts/prune-release-artifacts.js` keeps primary installers (`.exe`, `.dmg`, `.AppImage`) and removes extra side files in `dist/` before upload.

---

## Releases (tags & CI)

- Pushing a **git tag** matching `*` triggers **Build Release** on Ubuntu, Windows, and macOS runners.
- Each job runs the matching `npm run dist:*`, publishes installers to that tag’s **GitHub Release** (via electron-builder + `GH_TOKEN`), and uploads `dist/**` as workflow artifacts for backup.

---

## Frontend (marketing site)

The `frontend/` folder is a separate Vite + React landing page. See `frontend/package.json` for `dev` / `build` scripts.

---

## Project layout

| Path | Role |
|------|------|
| `src/main.js` | Electron main: tray, shortcuts, capture & panel windows |
| `src/panel/` | Results UI (AI / text / Lens) |
| `src/capture/` | Full-screen selection overlay |
| `scripts/bake-key-for-dist.js` | Embeds `GROQ_KEY` into a generated file for packaged builds (gitignored) |
| `scripts/prune-release-artifacts.js` | Post-build cleanup of `dist/` for releases |
| `.github/workflows/release.yml` | Tagged release builds + publish |
| `assets/` | Icons for the app and docs |
| `frontend/` | Marketing website |

---

## License

Copyright © SnapSense. All rights reserved. *(Update this section when you choose a license.)*
