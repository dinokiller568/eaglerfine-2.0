# eaglerfine-2.0

> ⚠️ **This GitHub repository page is not the playable client UI.**
>
> ✅ To test the browser-based playable demo, open: **https://dinokiller568.github.io/eaglerfine-2.0/**

If you only see a big bold `eaglerfine-2.0`, you are on `github.com` (repo view), not `github.io` (live Pages site).

## Quick links

- **Play prototype (GitHub Pages):** https://dinokiller568.github.io/eaglerfine-2.0/
- **Play prototype (docs fallback):** https://dinokiller568.github.io/eaglerfine-2.0/docs/
- **Play prototype (no Pages setup required / preview):**
  - https://htmlpreview.github.io/?https://raw.githubusercontent.com/dinokiller568/eaglerfine-2.0/main/index.html


## Browser-based game controls

The prototype is now directly playable in-browser:

- Click the game canvas in the **Play** tab
- Move with **WASD**
- Hold **Shift** to sprint
- **F3** cycles debug levels
- **F5** cycles camera mode labels
- **F7** opens Mod Hub

## What is currently included

- Product/technical specification: `docs/specs/eaglerfine-12.2-spec.md`
- A lightweight static **UI prototype** (`index.html`, `styles.css`, `app.js`) showing:
  - Singleplayer/Multiplayer screens
  - Mod Hub screen
  - Keyboard shortcut behavior stubs (`F3`, `F5`, `F7`)

> Note: this is not a full game runtime yet. It is a testable front-end prototype of the client UX.

## Required GitHub Pages setting (important)

If you want `github.io` to work, set:

1. **Settings → Pages**
2. **Build and deployment → Source: GitHub Actions**
3. Ensure the workflow named **Deploy static prototype to GitHub Pages** runs successfully.

## If GitHub Pages shows “does not contain the requested file”

- Make sure the repo default branch has this latest commit.
- Re-run the Pages workflow from the **Actions** tab.
- Wait 1–3 minutes and hard refresh.

## Test locally

From the repository root, run:

```bash
python3 -m http.server 8080
```

Then open:

- http://localhost:8080/
- http://localhost:8080/docs/
