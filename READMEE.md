# Chamber of Curiosities — Portfolio

A single-file, cinematic WebGL portfolio. Open `index.html` in any modern browser. No build step, no install.

The experience: a **grand door** opens on load (~4s), warps you through, and reveals a full
scrollable portfolio — hero/about, a **skill constellation**, **project doors** that swing open
into case-study rooms, a glowing timeline, and a contact form with a particle burst.

Built with **Three.js** (3D door + particle void), **GSAP + ScrollTrigger** (choreography &
scroll reveals), and **Lenis** (buttery smooth scroll). Loaded from CDN — fully offline-capable
once cached. Respects `prefers-reduced-motion` and falls back gracefully if WebGL is unavailable.

---

## 1. Make it yours (the only file you edit)

Open `index.html` and find the **`DATA` object** near the top of the `<script id="app">` block.
Everything personal lives there:

```js
const DATA = {
  name: "YOUR NAME",          // appears in hero + footer
  skills:   [ ... ],          // name, pct (proficiency), size (orb diameter px)
  projects: [ ... ],          // each becomes a clickable door + case-study room
  timeline: [ ... ],          // your journey nodes
};
```

For each **project**, fill in:
- `tag, name, sub` — labels
- `problem / solution / result` — the three monolith cards
- `stack` — array of tech pills
- `github`, `live` — your real links
- `video` — paste a **YouTube/Vimeo *embed* URL** (e.g. `https://www.youtube.com/embed/XXXX`)
  to show a real player. Leave `""` and it shows a tasteful placeholder.
- `accent`, `bg`, `glow` — per-door colors (the door's personality)

**Your photo:** in the HTML, the hero uses a `.portal .photo` with initials. To use a real
image, replace the `<div class="initials">YN</div>` with
`<img src="your-photo.jpg" style="width:100%;height:100%;object-fit:cover">` and drop the photo
next to `index.html`.

**Footer links:** edit the `<a href="#" data-edit>` tags in the footer.

## 2. Colors / fonts

All design tokens are CSS variables in `:root` at the top of the `<style>` block
(`--gold`, `--blue`, `--cyan`, `--void`, fonts, etc.). Change them once, everywhere updates.

## 3. Deploy (free)

Drag the folder onto **Netlify Drop**, or push to GitHub and enable **GitHub Pages**, or
`vercel deploy`. It's static — any host works.

---

## 4. Porting to Next.js (optional, for a "real project")

If you want the production React/Next stack from your brief:

```bash
npx create-next-app@latest chamber --js --app
cd chamber
npm i three @react-three/fiber @react-three/drei gsap lenis framer-motion
```

Then split this file into components, roughly:
- `DoorScene.jsx` — the Three.js intro (port the `initThree` logic to an R3F `<Canvas>`;
  use `@react-three/drei` `<Float>`, `<Environment>`, and `@react-three/postprocessing`
  `<Bloom>` for the glow instead of the additive fake here).
- `Hero / About / Skills / Projects / Timeline / Contact` — one component each; the markup
  and CSS transfer almost verbatim (move CSS into CSS Modules or Tailwind).
- Use the `lenis` React hook + GSAP `ScrollTrigger` exactly as wired here.
- Each project room becomes a real route (`app/projects/[slug]/page.jsx`) using
  `router.push` instead of the modal, matching the brief's `pushState` flow.

The single-file version already encodes all the timing, easing, and color decisions — treat it
as the working spec to translate.

Enjoy. Open the door. ◈
