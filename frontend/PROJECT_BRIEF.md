# SnapSense frontend brief

This file captures the product narrative used in the landing page content.

## Project idea

SnapSense is a Windows tray utility that helps users understand what is on screen without leaving their current app.  
The core interaction is screenshot-first: trigger shortcut, snip region, choose output mode, and continue working.

## Core features

- Global desktop capture from a tray app.
- AI chat analysis for screenshots (follow-up capable).
- Text extraction mode for OCR-style output.
- Google Lens mode with browser fallback.
- Fast side panel workflow designed for short feedback loops.

## How it works

1. User triggers capture with a global shortcut.
2. App freezes the current desktop frame and allows region selection.
3. User chooses mode (AI, Text, Lens) from the mode strip.
4. SnapSense opens a focused panel with the selected result flow.

## Positioning notes

- Target users: developers, students, designers, support and operations users.
- Main value: reduce context switching while investigating visual information.
- Trust framing: no background analysis; only selected regions are processed.
