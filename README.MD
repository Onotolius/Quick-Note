# Quick Note

Small, responsive notes app built with **HTML + CSS + Vanilla JS**.

You can create, edit and delete notes in a clean UI. All notes are stored in `localStorage`, so they stay after page reload. The app also supports a dark theme toggle.

---

## Preview

_Add screenshots here:_

- `screenshots/desktop.png`
- `screenshots/mobile.png`

---

## Features

- 📝 **Create notes** via modal dialog
- ✏️ **Edit existing notes** (inline update with saved date)
- 🗑️ **Delete notes**
- 💾 **Persistence with `localStorage`** – notes survive page refresh
- 🌗 **Light / dark theme toggle** with saved preference
- 📱 **Responsive layout**
  - mobile-first design
  - grid layout for notes on larger screens
- 🙅 **Empty state** when there are no notes yet

---

## Tech Stack

- **HTML5**
- **CSS3**
  - custom properties (CSS variables) for colors
  - flexbox / grid layout
  - responsive styles
- **Vanilla JavaScript**
  - `dialog` element for modal
  - `localStorage` for persistence
  - DOM manipulation & event delegation

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
