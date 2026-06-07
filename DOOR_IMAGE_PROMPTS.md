# 🚪 Door Cover Images — Dimensions & AI Prompts

This guide gives you **exact dimensions** and a **ready-to-paste AI prompt** for every
project door in the *Hall of Creations*. Generate each image, then send them to me and
I'll drop them in — they already wire up automatically to `cover.jpg` per project.

---

## 📐 Dimensions (read this first)

### 1. Door cover (the closed door face) — **the main thing you're generating**
- **Aspect ratio:** `3 : 4.4` (tall portrait) — this is fixed by the layout.
- **Recommended size:** **1200 × 1760 px** (or larger, same ratio: 1500 × 2200 px).
- **Fit:** the image *fills* the whole door (`object-fit: cover`), so design **edge to edge** —
  no important detail right at the borders (a few px may be cropped on different screens).
- **Safe zone:** the **bottom ~30%** gets a dark gradient + the project tag & name text on top.
  → Keep the lower third **calmer / darker** (no busy detail or text baked into the image).
  → Put your hero subject / focal glow in the **upper-middle**.
- **Format:** JPG (or PNG). Aim for a rich, dark, cinematic look so the gold UI text pops.

### 2. In-room gallery images (the screenshots/visuals inside each room)
Only relevant for projects that show **image** galleries (Tera Energy, Mriguel, Social Media Design).
- **Aspect ratio:** `16 : 9` (landscape).
- **Recommended size:** **1920 × 1080 px**.
- **Fit:** `object-fit: contain` — the whole image is always shown (letterboxed if needed),
  so nothing is ever cropped. Any ratio works, but 16:9 fills the frame edge-to-edge.

> Videos are now **YouTube** (lazy-loaded), so you no longer need to provide video files. ✅

---

## 🎨 Shared art direction (the "house style")

Paste this **STYLE BLOCK** at the end of *every* prompt so all 9 doors feel like one
cohesive set that matches the cosmic "Chamber of Curiosities" portfolio:

> **STYLE:** vertical portrait composition, an ornate sci-fi vault/portal door standing in a
> dark cosmic chamber, cinematic volumetric lighting, deep black background with subtle
> nebula dust and faint stars, fine engraved gold filigree framing the door, premium and
> mysterious museum-of-the-future mood, glowing accent rim-light, ultra-detailed, 8k, sharp
> focus, dramatic depth, the **lower third darker and calmer** to leave room for a title,
> elegant and luxurious, high contrast, photoreal render + concept-art polish.
>
> **NEGATIVE PROMPT:** text, words, letters, logos, watermark, signature, UI, buttons,
> people faces, low-res, blurry, flat lighting, cartoon, busy bottom edge, cluttered borders,
> oversaturated, jpeg artifacts.

**Aspect ratio flags** for popular tools:
- Midjourney: add `--ar 3:4 --style raw --q 2` (3:4 is the closest preset to 3:4.4).
- DALL·E / Ideogram / Leonardo: choose **portrait / 2:3** and crop to 3:4.4, or set 1200×1760.
- Stable Diffusion: set width 1200, height 1760 (or 768×1152 then upscale).

---

## 🗂️ Per-project prompts

For each, the **accent color** is the glow that should dominate the door's light so it
matches the door's UI color in the site. Save each as `cover.jpg`.

---

### 1. Tera Energy → `public/projects/tera-energy/cover.jpg`
**Theme:** premium energy-drink brand · **Accent:** gold `#E7B43A`

> A towering ornate vault door for a luxury energy-drink brand, a single radiant energy-drink
> can silhouette glowing at its center like a relic, streams of liquid-gold light and electric
> sparks arcing upward, warm amber and molten-gold glow, premium black-and-gold beverage-brand
> elegance, halo of light behind the can. **[STYLE BLOCK]** Dominant accent color: rich gold `#E7B43A`.

---

### 2. TalentMatch AI → `public/projects/talentmatch-ai/cover.jpg`
**Theme:** AI recruitment SaaS · **Accent:** emerald green `#46DE83`

> A futuristic portal door for an AI recruitment platform, glowing emerald-green neural network
> and node constellations forming an abstract human profile, holographic data streams and circuit
> filigree, clean high-tech SaaS elegance, soft green volumetric light, sense of intelligent
> matching and connection. **[STYLE BLOCK]** Dominant accent color: emerald green `#46DE83`.

---

### 3. Wakelni → `public/projects/wakelni/cover.jpg`
**Theme:** AI fitness coach & health tracking · **Accent:** blue `#4C8DFF`

> A sleek vault door for an AI fitness & health-tracking app, glowing blue heartbeat/ECG line and
> orbiting rings of activity metrics, an abstract athletic human energy form made of light,
> hydration and motion particles, calm electric-blue volumetric glow, healthy futuristic wellness
> mood. **[STYLE BLOCK]** Dominant accent color: vivid blue `#4C8DFF`.

---

### 4. Recruitment Control Room → `public/projects/recruitment-control-room/cover.jpg`
**Theme:** AI candidate-sourcing dashboard · **Accent:** indigo `#7C83FF`

> A commanding control-room vault door, glowing indigo-violet holographic dashboards, pipeline
> charts and candidate nodes floating like a mission-control hologram, interconnected data
> constellations, a sense of a single intelligent command center, soft indigo volumetric light.
> **[STYLE BLOCK]** Dominant accent color: indigo `#7C83FF`.

---

### 5. Sbiba Heritage → `public/projects/sbiba-heritage/cover.jpg`
**Theme:** AI + 3D/WebXR ancient heritage · **Accent:** terracotta orange `#E8814A`

> An ancient-meets-future portal door, weathered carved stone Roman/Mediterranean heritage
> archway fused with glowing orange holographic 3D-scan wireframes and photogrammetry point-clouds,
> a partially digitized historical monument, warm terracotta-and-amber light, time-travel between
> antiquity and AI, dust motes in golden light. **[STYLE BLOCK]** Dominant accent color: terracotta
> orange `#E8814A`.

---

### 6. City Group → `public/projects/city-group/cover.jpg`
**Theme:** luxury cashews & dried-fruit export storefront · **Accent:** warm gold `#CBA24B`

> A refined luxury vault door for a premium nuts & dried-fruit export brand, elegant arrangement
> of glowing golden cashews and dried fruits arranged like jewels, warm honey-gold light, rich
> textures of natural premium produce, sophisticated gourmet boutique elegance, soft golden
> volumetric glow. **[STYLE BLOCK]** Dominant accent color: warm gold `#CBA24B`.

---

### 7. Mriguel Store → `public/projects/mriguel-ecommerce/cover.jpg`
**Theme:** e-commerce marketing & seasonal campaigns · **Accent:** teal `#2DD4BF`

> A vibrant marketing vault door for an e-commerce store, glowing teal shopping-bag and
> rising-engagement / sales-growth arcs, floating product showcase cards and seasonal-campaign
> sparkles, social-media energy, bright modern retail vibe with a luxe twist, teal-cyan
> volumetric glow. **[STYLE BLOCK]** Dominant accent color: teal `#2DD4BF`.

---

### 8. Video Montage Reel → `public/projects/video-montage/cover.jpg`
**Theme:** cinematic editing (Premiere · CapCut · AI) · **Accent:** purple `#A855F7`

> A cinematic vault door for a video-editing & motion reel, glowing purple film-strip ribbons and
> a luminous play-triangle at the center, light-streak transitions, color-grade waveform glow,
> sparks of AI VFX particles, dramatic movie-premiere mood, rich violet-magenta volumetric light.
> **[STYLE BLOCK]** Dominant accent color: purple `#A855F7`.

---

> _(The "Social Media Design" door was removed from the portfolio — no image needed.)_

---

## 🛍️ BONUS — Mriguel Store hero thumbnail (inside the room)

This is **different from a door cover**: it's the **first image in the Mriguel room gallery**
(the big 16:9 viewer that opens when you click the Mriguel door). It should feature **your
Mriguel logo** on a beautiful branded "template" background, so the room opens on a polished
hero shot.

**Dimensions / fit**
- **Aspect ratio:** `16 : 9` (the gallery viewer is 16:9, `object-fit: contain` — so the whole
  image always shows, never cropped).
- **Exact size:** **1920 × 1080 px**.
- Keep the **logo centered** with comfortable margins (don't let it touch the edges).
- Save it as **`hero.jpg`** and send it — I'll place it as the first thumbnail automatically.

**How to build it (logo + template):**
Put your real Mriguel logo on top — let AI generate only the background/scene, then drop the
logo in (Photoshop/Canva), OR if your tool supports image input, upload the logo and ask it to
"keep this logo unchanged, centered."

**AI prompt (background / hero scene):**

> A premium 16:9 e-commerce brand hero banner for "Mriguel Store", an elegant dark teal and
> charcoal background with soft studio lighting, floating glossy shopping bags, gift boxes and
> abstract product cards arranged tastefully around a clean empty center reserved for a logo,
> subtle confetti and seasonal-sale sparkle, gentle teal `#2DD4BF` glow and bokeh, modern
> luxury retail mood, depth and soft shadows, lots of negative space in the middle, 8k, sharp,
> cinematic, high-end advertising look.
>
> **NEGATIVE PROMPT:** text, words, letters, existing logos, watermark, clutter in the center,
> busy middle, low-res, blurry, cheap, harsh lighting.
>
> Midjourney: add `--ar 16:9 --style raw --q 2`. Then place your Mriguel logo in the clear
> center. Brand accent to match the door: **teal `#2DD4BF`**.

---

## ✅ When your images are ready

1. Name each **door** image **`cover.jpg`**; name the **Mriguel hero** **`hero.jpg`**.
2. Send them to me (or drop each into its `public/projects/<slug>/` folder).
3. I'll optimize them and confirm they render perfectly.

> 💡 Tip: keep all the door covers in the **same lighting/style** (use the shared STYLE BLOCK
> every time) so the Hall of Creations looks like one premium, intentional set — that's what
> makes it feel "perfect."
