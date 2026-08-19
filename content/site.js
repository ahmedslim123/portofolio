/* ============================================================================
   CHAMBER OF CURIOSITIES — SITE CONTENT
   ----------------------------------------------------------------------------
   ⮞ THIS IS THE ONLY FILE YOU NEED TO EDIT TO MAKE THE SITE YOURS.
     Change your name, bio, skills, projects, timeline and links below.
     Everything else (the 3D door, animations, layout) is the engine.
   ============================================================================ */

export const site = {
  /* ---- Identity ---------------------------------------------------------- */
  name: "Ahmed Slim",
  // Shown as the small uppercase eyebrow above your name in the hero.
  role: "Software Engineer · Creative Developer",
  // The rotating subtitle under your name (kept short — appears in mono caps).
  tagline: "Web · Mobile · AI · Graphic Design",
  // The logo wordmark in the navbar (split on the middle dot).
  brand: "AHMED·SLIM",
  // Your initials — shown in the photo portal until you drop in a real image.
  initials: "AS",
  // Drop a square image in /public and set this to e.g. "/me.jpg" to replace
  // the initials. Leave "" to keep the animated initials portal.
  photo: "/ahmed.webp",

  /* ---- Hero / About ------------------------------------------------------ */
  heroBio:
    "I bridge the gap between engineering and creative design — building web & mobile apps, training AI systems, and scaling brands with clean code and compelling visuals.",

  about: [
    "I'm a <hl>software engineer</hl> and <hl>graphic designer</hl> based in Sousse, Tunisia — a fresh ESPRIT graduate with a Master's in Computer Software Engineering. I live where logic meets aesthetics.",
    "My work spans <hl>full-stack web & mobile development</hl>, <hl>AI & data science</hl>, and the brand design that makes products feel alive. From LLaMA-powered RAG systems to text-to-video pipelines and responsive showcase sites, I love building things end to end.",
    "When I'm not shipping code, I lead <hl>marketing & content</hl> for growing brands — designing posters, editing video, and growing communities from the ground up.",
  ],

  stats: [
    { num: 5, label: "Years Building" },
    { num: 14, label: "Projects Shipped" },
    { num: 20, label: "Tools & Tech" },
    { num: 3, label: "Languages" },
  ],

  /* ---- Skills constellation --------------------------------------------- */
  // pct = proficiency (shown on hover). size = orb diameter in px (mastery).
  //
  // Curated against the fourteen projects below, so every orb is something a
  // visitor can go and verify by opening a door. Counted across the project
  // stacks: Next.js carries 9 of the 14, AI and UI/UX work 5 each, i18n 4,
  // Three.js and video 2 each.
  //
  // CSS and Canva are the everyday tools behind the same work; Supabase is here
  // because it is the database that actually ships (Recruitment Control Room)
  // and because two projects are tagged "Full-Stack" — without it the list
  // reads as front-end only, which the About section contradicts.
  //
  // Deliberately dropped, because no project on this site demonstrates them:
  // MongoDB (Supabase replaced it), Illustrator (Photoshop covers the design
  // story), Flutter and Spring Boot (real skills, but nothing here proves them
  // — put them back the day a mobile or Java project joins the hall), and
  // Python (the AI work is better represented by "AI Integration", which is
  // what the projects are actually tagged with).
  //
  // The order matters: SPOTS in components/Skills.jsx places orb `i` at
  // position `i`, and the two are laid out together so nothing collides.
  skills: [
    { name: "Next.js", pct: 92, size: 156 },
    { name: "React", pct: 90, size: 148 },
    { name: "JavaScript", pct: 90, size: 146 },
    { name: "CSS", pct: 90, size: 142 },
    { name: "AI Integration", pct: 84, size: 134 },
    { name: "UI/UX Design", pct: 86, size: 136 },
    { name: "Three.js", pct: 82, size: 128 },
    { name: "GSAP", pct: 85, size: 132 },
    { name: "Supabase", pct: 78, size: 120 },
    { name: "Photoshop", pct: 88, size: 138 },
    { name: "Canva", pct: 85, size: 118 },
    { name: "Premiere Pro", pct: 80, size: 122 },
  ],

  /* ---- Project doors ----------------------------------------------------- */
  // Each project is a clickable door that opens into a case-study room.
  //   accent / bg / glow → the door's personality (colors)
  //   cover → image shown on the closed door leaf
  //   media → gallery inside the room. { type:"video", src, poster } or
  //           { type:"image", src }. The first item is the room's hero.
  projects: [
    {
      slug: "anadani-group",
      tag: "Web · Corporate · i18n",
      name: "ANADANI GROUP",
      accent: "#DCA62C",
      bg: "linear-gradient(160deg,#1c1509,#050506)",
      glow: "rgba(220,166,44,.30)",
      sub: "A Luxembourg trading group and its three brands, in six languages",
      cover: "/projects/anadani-group/cover.webp",
      overview:
        "The corporate site of ANADANI GROUP S.à r.l. — a Luxembourg trading group and its three owned brands, in one black-and-gold identity across six languages.",
      problem:
        "A Luxembourg trading group was selling into Europe and the Middle East off a PDF profile — buyers in six languages had nothing to check it against.",
      solution:
        "I built one statically-rendered Next.js site for the group and its three brands: a single design system, 775 translated keys per locale, and full Arabic right-to-left.",
      result:
        "Ninety prerendered pages on one domain. Six markets now read the same institution, each in its own language and script — no attachment, no separate site per brand.",
      stack: ["Next.js 16", "Tailwind v4", "i18n · 6 Locales", "GSAP · Lenis", "SEO"],
      live: "https://anadanigroupbyahmedslim.vercel.app",
      media: [
        { type: "image", src: "/projects/anadani-group/img1.webp" },
        { type: "image", src: "/projects/anadani-group/img2.webp" },
        { type: "image", src: "/projects/anadani-group/img3.webp" },
        { type: "image", src: "/projects/anadani-group/img4.webp" },
        { type: "image", src: "/projects/anadani-group/img5.webp" },
      ],
    },
    {
      slug: "nes-academy",
      tag: "Web · Education · Agency",
      name: "NES Academy",
      accent: "#E45BD8",
      bg: "linear-gradient(160deg,#2a0d2c,#0a0410)",
      glow: "rgba(228,91,216,.32)",
      sub: "One site for two audiences that share nothing",
      cover: "/projects/nes-academy/cover.webp",
      overview:
        "The site of NES Academy — a Tunisian academy and digital agency that walks engineering students through their graded projects and builds web, mobile and AI products for everyone else.",
      problem:
        "NES Academy sells to two audiences with nothing in common — a student three weeks from a defence, and a founder who needs an app — and one Facebook page was trying to speak to both at once.",
      solution:
        "I built a nine-page Next.js 16 site that forks the two paths from the navigation down: Services and Portfolio for clients, Encadrement and Formations for students, joined by a living aurora hero, a scroll-driven method timeline and a drag-to-explore project carousel — in French, English and Arabic, right-to-left included.",
      result:
        "Each audience now lands on a page written for it alone, and the academy's own proof — the project count, the student count, the rating — sits on the same screen as the contact button.",
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "GSAP · Lenis", "i18n FR/EN/AR"],
      live: "https://nes-academy.vercel.app/",
      social: {
        facebook: "https://www.facebook.com/profile.php?id=61554040184314",
      },
      media: [
        { type: "image", src: "/projects/nes-academy/img1.webp" },
        { type: "image", src: "/projects/nes-academy/img2.webp" },
        { type: "image", src: "/projects/nes-academy/img3.webp" },
        { type: "image", src: "/projects/nes-academy/img4.webp" },
        { type: "image", src: "/projects/nes-academy/img5.webp" },
      ],
    },
    {
      slug: "nes-studio",
      tag: "Web · Studio · i18n",
      name: "NES Studio",
      accent: "#EBDCC0",
      bg: "linear-gradient(160deg,#241f18,#0a0806)",
      glow: "rgba(235,220,192,.28)",
      sub: "Ivory Atelier — a studio's pitch in three languages",
      cover: "/projects/nes-studio/cover.webp",
      overview:
        "NES Studio is the client-facing studio of NES Academy. Its site makes a single argument, in three languages: own the booking, don't rent it from a platform that takes a cut of each one.",
      problem:
        "Guesthouses, clinics and restaurants across Tunisia were handing every reservation — and a commission on it — to a booking platform, because a social page was the only thing they owned online.",
      solution:
        "I built the studio's trilingual showcase on an \"Ivory Atelier\" system — warm porcelain, editorial Fraunces, an accent spectrum running magenta to lime — with a before/after argument, published prices, and a free first mockup that opens the conversation on WhatsApp.",
      result:
        "French, Arabic right-to-left and English, every page prerendered, no server route anywhere: the fonts ship inside the repository and the contact form posts straight to Formspree from the browser, so the build makes no network call at all.",
      stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n FR/AR/EN", "Formspree"],
      live: "https://www.nes-studios.com/",
      media: [
        { type: "image", src: "/projects/nes-studio/img1.webp" },
        { type: "image", src: "/projects/nes-studio/img2.webp" },
        { type: "image", src: "/projects/nes-studio/img3.webp" },
        { type: "image", src: "/projects/nes-studio/img4.webp" },
        { type: "image", src: "/projects/nes-studio/img5.webp" },
      ],
    },
    {
      slug: "tera-energy",
      tag: "Brand · Web · Marketing",
      name: "Tera Energy",
      accent: "#E7B43A",
      bg: "linear-gradient(160deg,#2a2008,#0c0a03)",
      glow: "rgba(231,180,58,.32)",
      sub: "Launching a premium energy-drink brand in Tunisia",
      cover: "/projects/tera-energy/cover.webp",
      overview:
        "I led the digital launch of Tera Energy — owning the brand identity, the showcase site and the campaign that built anticipation before its debut.",
      problem:
        "A new energy drink had to launch in Tunisia against established imports — with no brand, no audience and no site.",
      solution:
        "I owned the whole launch: the visual identity, the showcase site at teraenergy.at, and the campaign library that fed Facebook and Instagram.",
      result:
        "The brand reached shelves with one coherent look across can, web and social, and a teaser campaign already running before the first can shipped.",
      stack: ["Brand Design", "Web Development", "UI/UX", "Photoshop", "Social Campaign"],
      live: "https://www.teraenergy.at",
      social: {
        facebook: "https://www.facebook.com/TeraEnergyOfficial",
        instagram: "https://www.instagram.com/teraenergyx/",
      },
      media: [
        { type: "image", src: "/projects/tera-energy/img1.webp" },
        { type: "image", src: "/projects/tera-energy/img3.webp" },
        { type: "image", src: "/projects/tera-energy/img5.webp" },
      ],
    },
    {
      slug: "koroko",
      tag: "Web · Brand · Wellness",
      name: "Korokoro & Fils",
      accent: "#7FB84E",
      bg: "linear-gradient(160deg,#12240c,#050a03)",
      glow: "rgba(127,184,78,.30)",
      sub: "A digital home for a family house of natural remedies",
      cover: "/projects/koroko/cover.webp",
      overview:
        "A warm, story-driven site for Établissement Korokoro & Fils — a family house in Bénin crafting traditional plant-based remedies for generations.",
      problem:
        "Four generations of plant-based remedies in Bénin, 43 products, and not one page online — buyers abroad had no way to find or verify the house.",
      solution:
        "I built a heritage-led site around the flagship soap, pommade, honey and NONI juice, putting the family story up front and a one-tap call or WhatsApp on every product.",
      result:
        "The full catalogue of 43 remedies is online with the story behind it, and an enquiry now reaches the workshop directly from any phone.",
      stack: ["Next.js", "Web Design", "Brand Identity", "UI/UX"],
      live: "https://korokobyahmedslim.vercel.app/",
      media: [
        { type: "image", src: "/projects/koroko/img1.webp" },
        { type: "image", src: "/projects/koroko/img2.webp" },
        { type: "image", src: "/projects/koroko/img3.webp" },
      ],
    },
    {
      slug: "soafeno-vanilla",
      tag: "Web · Export · B2B",
      name: "Soafeno Trading",
      accent: "#C7A24E",
      bg: "linear-gradient(160deg,#20160d,#080503)",
      glow: "rgba(199,162,78,.30)",
      sub: "A bilingual B2B storefront for Bourbon vanilla from Madagascar",
      cover: "/projects/soafeno-vanilla/cover.webp",
      overview:
        "A refined bilingual (FR/EN) showcase for Soafeno Trading — a direct producer and exporter of premium Bourbon vanilla from Madagascar.",
      problem:
        "A direct-from-origin vanilla producer looked identical online to the resellers sitting between it and European buyers.",
      solution:
        "I built a bilingual one-page storefront: a custom 3D vanilla hero, the full grade catalogue, the field-to-export chain step by step, and a quote request at every stage.",
      result:
        "The chain from Madagascar plantation to shipped crate reads in a single scroll, in French and English — the one argument that separates a producer from a middleman.",
      stack: ["Next.js", "Three.js", "GSAP", "i18n FR/EN"],
      live: "https://soafenotradingbyahmedslim.vercel.app/",
      media: [
        { type: "image", src: "/projects/soafeno-vanilla/img1.webp" },
        { type: "image", src: "/projects/soafeno-vanilla/img2.webp" },
        { type: "image", src: "/projects/soafeno-vanilla/img3.webp" },
      ],
    },
    {
      slug: "palmiche",
      tag: "Web · Restaurant · Brand",
      name: "Palmiché",
      accent: "#F2A81D",
      bg: "linear-gradient(160deg,#0c3b39,#04100e)",
      glow: "rgba(242,168,29,.32)",
      sub: "A taste of Venezuela — a Caribbean restaurant lands in Dijon",
      cover: "/projects/palmiche/cover.webp",
      overview:
        "A sun-soaked showcase for Palmiché, a Venezuelan restaurant bringing arepas, empanadas and tequeños to Dijon, France.",
      problem:
        "A Venezuelan restaurant opening in Dijon had to explain arepas, empanadas and tequeños to a city that had never eaten them.",
      solution:
        "I built a warm teal-and-amber site that leads with the food: an animated menu, the story of the arepa, and an ordering path that never leaves the page.",
      result:
        "The menu now does the explaining before anyone walks in, and every dish is one tap from an order.",
      stack: ["Next.js", "Framer Motion", "Web Design", "Brand Identity"],
      live: "https://palmichebyahmedslim.vercel.app/",
      media: [
        { type: "image", src: "/projects/palmiche/img1.webp" },
        { type: "image", src: "/projects/palmiche/img2.webp" },
        { type: "image", src: "/projects/palmiche/img3.webp" },
      ],
    },
    {
      slug: "talentmatch-ai",
      tag: "AI · SaaS",
      name: "TalentMatch AI",
      accent: "#46DE83",
      bg: "linear-gradient(160deg,#0e2a1a,#05100a)",
      glow: "rgba(70,222,131,.30)",
      sub: "A next-gen SaaS platform for AI recruitment",
      cover: "/projects/talentmatch-ai/cover.webp",
      overview:
        "A high-converting SaaS product for TalentMatch AI, a platform that optimizes hiring with AI — high-tech, yet effortless to read.",
      problem:
        "An AI recruitment startup had a genuinely technical product and about thirty seconds to make a hiring manager understand it.",
      solution:
        "I designed and built the landing page and the job-management dashboard together, so the promise on the page and the product behind it speak the same language.",
      result:
        "A visitor understands what the AI actually does before the second scroll, and the dashboard on the next click proves it rather than restating it.",
      stack: ["Next.js", "AI Integration", "SaaS UI", "UI/UX Prototyping"],
      media: [
        { type: "vimeo", id: "1199156171", poster: "/projects/talentmatch-ai/demo.webp" },
      ],
    },
    {
      slug: "wakelni",
      tag: "AI · Full-Stack",
      name: "Wakelni",
      accent: "#4C8DFF",
      bg: "linear-gradient(160deg,#0e1d3a,#05080f)",
      glow: "rgba(76,141,255,.32)",
      sub: "An AI fitness coach & health-tracking platform",
      cover: "/projects/wakelni/cover.webp",
      overview:
        "A full-stack AI fitness app tracking calories, macros, hydration, steps and body metrics in real time, with a personal AI coach.",
      problem:
        "Tracking calories, macros, hydration, steps and body metrics meant four apps — and no advice at the end of any of them.",
      solution:
        "I built one full-stack app: a daily overview, seven-day charts, TDEE and BMI, goal pacing, and an AI coach reading the same data — multilingual, on a dark UI.",
      result:
        "One screen answers “am I on track?”, and the coach turns that answer into the next action instead of leaving it on a chart.",
      stack: ["Next.js", "AI Chatbot", "Full-Stack", "UI/UX Prototyping"],
      media: [
        { type: "youtube", id: "773TvTNtYtE", poster: "/projects/wakelni/demo.webp" },
      ],
    },
    {
      slug: "recruitment-control-room",
      tag: "AI · Full-Stack",
      name: "Recruitment Control Room",
      accent: "#7C83FF",
      bg: "linear-gradient(160deg,#161a3a,#07060f)",
      glow: "rgba(124,131,255,.32)",
      sub: "An AI-powered candidate sourcing dashboard",
      cover: "/projects/recruitment-control-room/cover.webp",
      overview:
        "A full-stack platform that centralizes candidate qualification, campaign execution and AI-generated outreach in one control room.",
      problem:
        "Recruiters ran sourcing, qualification and outreach across scattered tools, with no single source of truth on any candidate.",
      solution:
        "I built one dashboard on Supabase: role-based access, AI-assisted outreach drafting, and pipeline analytics updating live.",
      result:
        "The whole hiring workflow runs in one place, and every recruiter sees the same pipeline state instead of their own copy of it.",
      stack: ["Next.js", "Supabase", "AI Integration", "Full-Stack"],
      media: [
        { type: "youtube", id: "E6lU7RN1UJE", poster: "/projects/recruitment-control-room/demo.webp" },
      ],
    },
    {
      slug: "sbiba-heritage",
      tag: "AI · WebXR · 3D",
      name: "Sbiba Heritage",
      accent: "#E8814A",
      bg: "linear-gradient(160deg,#2c1810,#0e0805)",
      glow: "rgba(232,129,74,.30)",
      sub: "Bringing ancient heritage to life with AI & 3D",
      cover: "/projects/sbiba-heritage/cover.webp",
      overview:
        "An immersive web experience bringing the heritage of Sbiba to life — photogrammetry 3D monuments, an AI guide and a community.",
      problem:
        "Sbiba's Roman and Byzantine heritage sat in archives almost nobody visits, and was eroding faster than it was being recorded.",
      solution:
        "I scanned the monuments into 3D by photogrammetry and wrapped them in a WebXR experience with an AI guide, plus portraits that place a visitor inside the period.",
      result:
        "The monuments are explorable from any browser with no app to install — and the scans stand as a record that outlives the stone.",
      stack: ["WebXR", "Three.js", "AI Chatbot", "Photogrammetry"],
      live: "https://sbiba.vercel.app",
      media: [
        { type: "youtube", id: "HIAKOd00bEg", poster: "/projects/sbiba-heritage/demo.webp" },
      ],
    },
    {
      slug: "city-group",
      tag: "Web · E-Commerce",
      name: "City Group",
      accent: "#CBA24B",
      bg: "linear-gradient(160deg,#241c0c,#0c0a05)",
      glow: "rgba(203,162,75,.30)",
      sub: "A luxury storefront for premium nuts & exports",
      cover: "/projects/city-group/cover.webp",
      overview:
        "A sophisticated storefront for City Group SARL, specialists in high-quality natural cashews and premium dried fruits.",
      problem:
        "A premium cashew and dried-fruit exporter was claiming quality it had no way to show a buyer.",
      solution:
        "I designed a conversion-focused storefront: refined typography, product cards that carry the grades and tasting notes, and a palette matched to the goods.",
      result:
        "The whole range is now presentable in a single link, and the product finally looks the way the exporter describes it.",
      stack: ["Web Design", "UI/UX Prototyping", "HTML/CSS", "JavaScript"],
      live: "https://snoussimohamedmokhtar.github.io/city-group/",
      media: [
        { type: "youtube", id: "bqU7jNR7fPs", poster: "/projects/city-group/demo.webp" },
      ],
    },
    {
      slug: "mriguel-ecommerce",
      tag: "Marketing · E-Commerce",
      name: "Mriguel Store",
      accent: "#2DD4BF",
      bg: "linear-gradient(160deg,#0c2a28,#05100e)",
      glow: "rgba(45,212,191,.30)",
      sub: "E-commerce marketing & seasonal campaigns",
      cover: "/projects/mriguel-ecommerce/cover.webp",
      overview:
        "As e-commerce marketing manager for Mriguel Store, I drove growth through seasonal campaigns — graphics and short-form video ads.",
      problem:
        "An online store needed creative that could stop a scroll every season — not one good campaign followed by silence.",
      solution:
        "As e-commerce marketing manager I ran a steady output of campaign graphics and short-form video ads on one identity, across Facebook and Instagram.",
      result:
        "The store held one visual voice through every seasonal peak, with new creative shipping on a schedule instead of ad hoc.",
      stack: ["Graphic Design", "Video Ads", "Photoshop", "Social Media"],
      social: {
        facebook: "https://www.facebook.com/MriguelStore",
        instagram: "https://www.instagram.com/mriguelstoree/",
      },
      media: [
        { type: "image", src: "/projects/mriguel-ecommerce/thumb.webp" },
      ],
    },
    {
      slug: "video-montage",
      tag: "Video · Motion",
      name: "Video Montage Reel",
      accent: "#A855F7",
      bg: "linear-gradient(160deg,#1f1238,#0a0610)",
      glow: "rgba(168,85,247,.32)",
      sub: "Cinematic editing — Premiere Pro, CapCut & AI",
      cover: "/projects/video-montage/cover.webp",
      overview:
        "A reel of professional montages made with Premiere Pro, CapCut and AI tools — from raw footage to color, sound and delivery.",
      problem:
        "Clients needed video that holds attention — cut to rhythm, colour-graded, properly mixed — and needed it on a campaign deadline.",
      solution:
        "I built a repeatable pipeline in Premiere Pro and CapCut — rough cut, colour grade, sound mix, delivery — using AI tools only where they save real time.",
      result:
        "Short-form edits that keep pace with a feed, on a turnaround that fits a campaign calendar rather than a film schedule.",
      stack: ["Premiere Pro", "CapCut", "AI VFX", "Color Grading"],
      media: [
        { type: "youtube", id: "sSIguVxr9NU", poster: "/projects/video-montage/reel.webp" },
      ],
    },
  ],

  /* ---- Journey / Timeline ------------------------------------------------ */
  timeline: [
    {
      yr: "2026 — Present",
      role: "E-commerce Marketing Manager",
      org: "Mriguel Store",
      desc: "Driving online retail growth and digital marketing for the Mriguel store.",
    },
    {
      yr: "2025 — Present",
      role: "Marketing Manager · Digital & Creative",
      org: "Tera Energy",
      desc: "Led the digital launch of a new beverage & snack brand — designed and built the showcase website, ran every social channel, and produced the visual campaigns from the ground up.",
    },
    {
      yr: "2025",
      role: "AI & Data Science Intern",
      org: "BNS Engineering",
      desc: "Built an intelligent verification system for customs forms (GUCE 3+) using LLaMA-based LLMs and RAG to automatically detect, explain, and correct input errors.",
    },
    {
      yr: "2024",
      role: "AI & Design Intern",
      org: "Educanet",
      desc: "Developed an end-to-end Text-to-Video pipeline in Python with synchronized text-to-speech voiceovers to automate educational storytelling content.",
    },
    {
      yr: "2023 — Present",
      role: "Marketing Manager",
      org: "Nes Academy",
      desc: "Grew an educational community — publishing summaries, exam resources, and academic content for thousands of students.",
    },
    {
      yr: "2022 — 2025",
      role: "M.Eng, Computer Software Engineering",
      org: "ESPRIT University",
      desc: "Master of Engineering in computer software engineering — full-stack web, mobile, and AI.",
    },
    {
      yr: "2020 — 2022",
      role: "Web & Design — First Steps",
      org: "Slim Optic · Medicars",
      desc: "Built Medicars' product website and designed advertising for Slim Optic — where code first met design.",
    },
  ],

  /* ---- Contact + footer links ------------------------------------------- */
  // Shown as a pill in the hero beside the phone, and used by the contact
  // section and footer. FR/AR inherit it — it is language-neutral.
  email: "ahmedslim007@gmail.com",
  phone: "+21694687669",
  phoneDisplay: "+216 94 687 669",
  // WhatsApp deep-link — wa.me wants the number in international form with NO
  // "+", spaces or dashes (country code + number). +216 94 687 669 → 21694687669.
  whatsapp: "https://wa.me/21694687669",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-s-307897226" },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~012340f5cbd8f352dc" },
    { label: "WhatsApp", href: "https://wa.me/21694687669" },
  ],

  /* ---- Contact form delivery (Formspree) --------------------------------
     The site is a STATIC export (no server), so the contact form posts to
     Formspree, which emails the submission straight to your inbox.
     (We left Web3Forms because it blocks free .great-site.net domains.)

     ⮞ Your form endpoint from formspree.io → just paste it below.
     Leave it empty ("") to fall back to opening the visitor's mail app.       */
  formspreeEndpoint: "https://formspree.io/f/mbdeoawa",
};

/* ----------------------------------------------------------------------------
   Navigation sections (id must match the section components' ids).
---------------------------------------------------------------------------- */
export const sections = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "timeline", name: "Journey" },
  { id: "contact", name: "Contact" },
];

/* ============================================================================
   FRENCH (FR) — full translation. Structural data (colors, media, links) is
   shared from the English `site` above; only the human-readable text is
   overridden here, so the two languages can never drift out of sync.
   ============================================================================ */

// Per-project translated text, keyed by slug. Media / accents / links untouched.
const projectsFR = {
  "anadani-group": {
    tag: "Web · Corporate · i18n",
    sub: "Un groupe de négoce luxembourgeois et ses trois marques, en six langues",
    overview:
      "Le site corporate d'ANADANI GROUP S.à r.l. — un groupe de négoce luxembourgeois et ses trois marques, sous une identité noir et or, en six langues.",
    problem:
      "Un groupe de négoce luxembourgeois vendait en Europe et au Moyen-Orient avec un simple PDF — les acheteurs, en six langues, n'avaient rien pour le vérifier.",
    solution:
      "J'ai développé un seul site Next.js statique pour le groupe et ses trois marques : un système de design unique, 775 clés traduites par langue, et le RTL arabe complet.",
    result:
      "Quatre-vingt-dix pages pré-rendues sur un seul domaine. Six marchés lisent désormais la même institution, chacun dans sa langue et son écriture — sans pièce jointe ni site séparé par marque.",
    stack: ["Next.js 16", "Tailwind v4", "i18n · 6 Langues", "GSAP · Lenis", "SEO"],
  },
  "nes-academy": {
    tag: "Web · Éducation · Agence",
    sub: "Un seul site pour deux publics qui n'ont rien en commun",
    overview:
      "Le site de NES Academy — une académie et agence digitale tunisienne qui accompagne les étudiants ingénieurs jusqu'à la soutenance et développe sites, applications et IA pour tous les autres.",
    problem:
      "NES Academy s'adresse à deux publics qui n'ont rien en commun — un étudiant à trois semaines de sa soutenance, et un porteur de projet qui a besoin d'une application — et une seule page Facebook essayait de parler aux deux à la fois.",
    solution:
      "J'ai développé un site Next.js 16 de neuf pages qui sépare les deux parcours dès la navigation : Services et Portfolio pour les clients, Encadrement et Formations pour les étudiants, reliés par un hero aurore vivant, une frise de méthode animée au défilement et un carrousel de projets qui se fait glisser — en français, anglais et arabe, RTL compris.",
    result:
      "Chaque public arrive désormais sur une page écrite pour lui seul, et les preuves de l'académie — nombre de projets, nombre d'étudiants, note de satisfaction — sont sur le même écran que le bouton de contact.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "GSAP · Lenis", "i18n FR/EN/AR"],
  },
  "nes-studio": {
    tag: "Web · Studio · i18n",
    sub: "Ivory Atelier — l'argumentaire d'un studio en trois langues",
    overview:
      "NES Studio est le studio client de NES Academy. Son site défend un seul argument, en trois langues : possédez la réservation, ne la louez pas à une plateforme qui prélève sa commission sur chacune.",
    problem:
      "Maisons d'hôtes, cliniques et restaurants de Tunisie confiaient chaque réservation — et la commission qui va avec — à une plateforme, faute de posséder autre chose qu'une page sociale.",
    solution:
      "J'ai construit la vitrine trilingue du studio sur un système « Ivory Atelier » — porcelaine chaude, Fraunces éditorial, un spectre d'accent du magenta au vert tilleul — avec une démonstration avant/après, des prix publiés, et une première maquette offerte qui ouvre la conversation sur WhatsApp.",
    result:
      "Français, arabe de droite à gauche et anglais, chaque page pré-rendue, aucune route serveur : les polices sont dans le dépôt et le formulaire poste directement vers Formspree depuis le navigateur — le build ne fait pas un seul appel réseau.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n FR/AR/EN", "Formspree"],
  },
  "tera-energy": {
    tag: "Marque · Web · Marketing",
    sub: "Lancement d'une marque de boisson énergisante premium en Tunisie",
    overview:
      "J'ai piloté le lancement digital de Tera Energy — l'identité de marque, le site vitrine et la campagne qui a créé l'attente avant ses débuts.",
    problem:
      "Une nouvelle boisson énergisante devait se lancer en Tunisie face aux imports installés — sans marque, sans audience et sans site.",
    solution:
      "J'ai porté tout le lancement : l'identité visuelle, le site vitrine teraenergy.at, et la bibliothèque de campagne qui a alimenté Facebook et Instagram.",
    result:
      "La marque est arrivée en rayon avec une identité cohérente de la canette au web et au social, et une campagne teaser déjà en ligne avant la première canette.",
    stack: ["Design de Marque", "Développement Web", "UI/UX", "Photoshop", "Campagne Sociale"],
  },
  koroko: {
    tag: "Web · Marque · Bien-être",
    sub: "Une maison digitale pour une maison familiale de remèdes naturels",
    overview:
      "Un site chaleureux pour l'Établissement Korokoro & Fils — une maison familiale béninoise qui façonne des remèdes à base de plantes depuis des générations.",
    problem:
      "Quatre générations de remèdes à base de plantes au Bénin, 43 produits, et pas une seule page en ligne — les acheteurs étrangers ne pouvaient ni la trouver ni la vérifier.",
    solution:
      "J'ai construit un site porté par l'héritage familial autour du savon, de la pommade, du miel et du jus de NONI, avec l'histoire de la maison en ouverture et un appel ou un WhatsApp à portée de doigt sur chaque produit.",
    result:
      "Le catalogue complet des 43 remèdes est en ligne avec l'histoire qui va avec, et une demande atteint désormais l'atelier directement depuis n'importe quel téléphone.",
    stack: ["Next.js", "Design Web", "Identité de Marque", "UI/UX"],
  },
  "soafeno-vanilla": {
    tag: "Web · Export · B2B",
    sub: "Une vitrine B2B bilingue pour la vanille Bourbon de Madagascar",
    overview:
      "Une vitrine bilingue (FR/EN) raffinée pour Soafeno Trading — producteur et exportateur direct de vanille Bourbon premium de Madagascar.",
    problem:
      "Un producteur de vanille en direct de l'origine était, en ligne, indiscernable des revendeurs placés entre lui et les acheteurs européens.",
    solution:
      "J'ai développé une vitrine bilingue en une page : hero 3D sur mesure, catalogue complet des grades, chaîne du champ à l'export étape par étape, et une demande de devis à chaque niveau.",
    result:
      "La chaîne, de la plantation malgache à la caisse expédiée, se lit d'un seul défilement, en français et en anglais — le seul argument qui distingue un producteur d'un intermédiaire.",
    stack: ["Next.js", "Three.js", "GSAP", "i18n FR/EN"],
  },
  palmiche: {
    tag: "Web · Restaurant · Marque",
    sub: "Un goût du Venezuela — un restaurant caribéen s'installe à Dijon",
    overview:
      "Une vitrine ensoleillée pour Palmiché, un restaurant vénézuélien qui apporte arepas, empanadas et tequeños à Dijon.",
    problem:
      "Un restaurant vénézuélien ouvrant à Dijon devait expliquer arepas, empanadas et tequeños à une ville qui n'en avait jamais mangé.",
    solution:
      "J'ai construit un site chaleureux bleu-canard et ambre qui met la cuisine en avant : menu animé, histoire de l'arepa, et un parcours de commande qui ne quitte jamais la page.",
    result:
      "Le menu fait la pédagogie avant même qu'on pousse la porte, et chaque plat est à un geste d'une commande.",
    stack: ["Next.js", "Framer Motion", "Design Web", "Identité de Marque"],
  },
  "talentmatch-ai": {
    tag: "IA · SaaS",
    sub: "Une plateforme SaaS nouvelle génération pour le recrutement par IA",
    overview:
      "Un produit SaaS à forte conversion pour TalentMatch AI, une plateforme qui optimise le recrutement par l'IA — high-tech et limpide.",
    problem:
      "Une startup de recrutement par IA avait un produit réellement technique et une trentaine de secondes pour le faire comprendre à un responsable RH.",
    solution:
      "J'ai conçu et développé la landing page et le tableau de bord de gestion des offres ensemble, pour que la promesse de la page et le produit derrière parlent la même langue.",
    result:
      "Le visiteur comprend ce que fait réellement l'IA avant le deuxième défilement, et le tableau de bord, au clic suivant, le démontre au lieu de le répéter.",
    stack: ["Next.js", "Intégration IA", "UI SaaS", "Prototypage UI/UX"],
  },
  wakelni: {
    tag: "IA · Full-Stack",
    sub: "Un coach fitness IA et une plateforme de suivi santé",
    overview:
      "Une application full-stack de coaching fitness par IA qui suit calories, macros, hydratation, pas et mesures en temps réel, avec un coach IA.",
    problem:
      "Suivre calories, macros, hydratation, pas et mesures corporelles imposait quatre applications — et aucun conseil au bout d'aucune.",
    solution:
      "J'ai développé une seule application full-stack : aperçu quotidien, graphiques sur sept jours, TDEE et IMC, suivi d'objectifs, et un coach IA qui lit les mêmes données — multilingue, sur une interface sombre.",
    result:
      "Un seul écran répond à « est-ce que je suis dans les clous ? », et le coach transforme cette réponse en action suivante au lieu de la laisser sur un graphique.",
    stack: ["Next.js", "Chatbot IA", "Full-Stack", "Prototypage UI/UX"],
  },
  "recruitment-control-room": {
    tag: "IA · Full-Stack",
    name: "Salle de Contrôle Recrutement",
    sub: "Un tableau de bord de sourcing de candidats propulsé par l'IA",
    overview:
      "Une plateforme full-stack qui centralise la qualification des candidats, les campagnes et la prise de contact par IA dans une seule salle de contrôle.",
    problem:
      "Les recruteurs géraient sourcing, qualification et prise de contact sur des outils éparpillés, sans source unique de vérité sur le moindre candidat.",
    solution:
      "J'ai construit un seul tableau de bord sur Supabase : accès par rôle, rédaction des prises de contact assistée par IA, et analyses du pipeline mises à jour en direct.",
    result:
      "Tout le flux de recrutement tient au même endroit, et chaque recruteur voit le même état du pipeline au lieu de sa propre copie.",
    stack: ["Next.js", "Supabase", "Intégration IA", "Full-Stack"],
  },
  "sbiba-heritage": {
    tag: "IA · WebXR · 3D",
    sub: "Faire revivre un patrimoine ancien grâce à l'IA & la 3D",
    overview:
      "Une expérience web immersive qui fait revivre le patrimoine de Sbiba — monuments 3D par photogrammétrie, guide IA et communauté.",
    problem:
      "Le patrimoine romain et byzantin de Sbiba dormait dans des archives que presque personne ne consulte, et s'érodait plus vite qu'il n'était documenté.",
    solution:
      "J'ai scanné les monuments en 3D par photogrammétrie et les ai enveloppés dans une expérience WebXR avec un guide IA, plus des portraits qui placent le visiteur dans l'époque.",
    result:
      "Les monuments s'explorent depuis n'importe quel navigateur, sans rien installer — et les scans constituent un relevé qui survivra à la pierre.",
    stack: ["WebXR", "Three.js", "Chatbot IA", "Photogrammétrie"],
  },
  "city-group": {
    tag: "Web · E-Commerce",
    sub: "Une vitrine de luxe pour des noix et exports premium",
    overview:
      "Une vitrine digitale sophistiquée pour City Group SARL, spécialiste des noix de cajou naturelles et des fruits secs premium.",
    problem:
      "Un exportateur premium de noix de cajou et de fruits secs revendiquait une qualité qu'il n'avait aucun moyen de montrer à un acheteur.",
    solution:
      "J'ai conçu une vitrine orientée conversion : typographie raffinée, fiches produits qui portent les calibres et les notes de dégustation, et une palette accordée à la marchandise.",
    result:
      "Toute la gamme se présente désormais en un seul lien, et le produit ressemble enfin à ce que l'exportateur en dit.",
    stack: ["Design Web", "Prototypage UI/UX", "HTML/CSS", "JavaScript"],
  },
  "mriguel-ecommerce": {
    tag: "Marketing · E-Commerce",
    sub: "Marketing e-commerce & campagnes saisonnières",
    overview:
      "Responsable marketing e-commerce de Mriguel Store, j'ai stimulé la croissance par des campagnes saisonnières — visuels et publicités vidéo courtes.",
    problem:
      "Une boutique en ligne avait besoin de créations capables d'arrêter le scroll à chaque saison — pas d'une bonne campagne suivie d'un silence.",
    solution:
      "Comme responsable marketing e-commerce, j'ai assuré une production régulière de visuels de campagne et de publicités vidéo courtes sur une identité unique, sur Facebook et Instagram.",
    result:
      "La boutique a tenu une seule voix visuelle sur chaque pic saisonnier, avec de nouvelles créations livrées à un rythme régulier plutôt qu'au coup par coup.",
    stack: ["Design Graphique", "Publicités Vidéo", "Photoshop", "Réseaux Sociaux"],
  },
  "video-montage": {
    tag: "Vidéo · Motion",
    name: "Montage Vidéo",
    sub: "Montage cinématique — Premiere Pro, CapCut & IA",
    overview:
      "Une bobine de montages professionnels réalisés avec Premiere Pro, CapCut et l'IA — des rushes à l'étalonnage, au son et à la livraison.",
    problem:
      "Les clients avaient besoin de vidéos qui retiennent l'attention — montées au rythme, étalonnées, mixées proprement — et dans un délai de campagne.",
    solution:
      "J'ai mis en place une chaîne reproductible sous Premiere Pro et CapCut — dérushage, étalonnage, mixage, livraison — avec l'IA seulement là où elle fait gagner du temps.",
    result:
      "Des montages courts qui tiennent le rythme d'un fil d'actualité, dans un délai calé sur un calendrier de campagne et non sur un planning de tournage.",
    stack: ["Premiere Pro", "CapCut", "VFX IA", "Color Grading"],
  },
};

const statsFR = ["Années d'Expérience", "Projets Livrés", "Outils & Tech", "Langues"];

const timelineFR = [
  {
    yr: "2026 — Présent",
    role: "Responsable Marketing E-commerce",
    org: "Mriguel Store",
    desc: "Pilotage de la croissance du commerce en ligne et du marketing digital de la boutique Mriguel.",
  },
  {
    yr: "2025 — Présent",
    role: "Responsable Marketing · Digital & Créatif",
    org: "Tera Energy",
    desc: "Pilotage du lancement digital d'une nouvelle marque de boisson & snack — conception et développement du site vitrine, gestion de tous les canaux sociaux et production des campagnes visuelles de A à Z.",
  },
  {
    yr: "2025",
    role: "Stagiaire IA & Data Science",
    org: "BNS Engineering",
    desc: "Développement d'un système de vérification intelligent pour les formulaires douaniers (GUCE 3+) à l'aide de LLM basés sur LLaMA et du RAG pour détecter, expliquer et corriger automatiquement les erreurs de saisie.",
  },
  {
    yr: "2024",
    role: "Stagiaire IA & Design",
    org: "Educanet",
    desc: "Développement d'un pipeline Text-to-Video de bout en bout en Python avec voix off synchronisées par synthèse vocale pour automatiser la création de contenus pédagogiques.",
  },
  {
    yr: "2023 — Présent",
    role: "Responsable Marketing",
    org: "Nes Academy",
    desc: "Développement d'une communauté éducative — publication de résumés, ressources d'examen et contenus académiques pour des milliers d'étudiants.",
  },
  {
    yr: "2022 — 2025",
    role: "Mastère en Génie Logiciel",
    org: "Université ESPRIT",
    desc: "Master en génie logiciel — web full-stack, mobile et IA.",
  },
  {
    yr: "2020 — 2022",
    role: "Web & Design — Premiers Pas",
    org: "Slim Optic · Medicars",
    desc: "Création du site produit de Medicars et conception publicitaire pour Slim Optic — là où le code a rencontré le design pour la première fois.",
  },
];

const siteFR = {
  ...site,
  role: "Ingénieur Logiciel · Développeur Créatif",
  tagline: "Web · Mobile · IA · Design Graphique",
  heroBio:
    "Je fais le lien entre l'ingénierie et le design créatif — je conçois des applications web et mobiles, j'entraîne des systèmes d'IA et je fais grandir des marques avec un code propre et des visuels percutants.",
  about: [
    "Je suis <hl>ingénieur logiciel</hl> et <hl>designer graphique</hl> basé à Sousse, en Tunisie — jeune diplômé d'ESPRIT avec un Mastère en Génie Logiciel. Je vis là où la logique rencontre l'esthétique.",
    "Mon travail couvre le <hl>développement web & mobile full-stack</hl>, l'<hl>IA & la science des données</hl>, et le design de marque qui donne vie aux produits. Des systèmes RAG propulsés par LLaMA aux pipelines text-to-video et sites vitrines responsives, j'adore construire de bout en bout.",
    "Quand je ne code pas, je dirige le <hl>marketing & le contenu</hl> de marques en croissance — création d'affiches, montage vidéo et animation de communautés depuis zéro.",
  ],
  stats: site.stats.map((s, i) => ({ ...s, label: statsFR[i] })),
  projects: site.projects.map((p) => ({ ...p, ...(projectsFR[p.slug] || {}) })),
  timeline: timelineFR,
  // socials / phone / email inherited from the base `site` (language-neutral).
};

export const sectionsFR = [
  { id: "hero", name: "Accueil" },
  { id: "about", name: "À Propos" },
  { id: "skills", name: "Compétences" },
  { id: "projects", name: "Projets" },
  { id: "timeline", name: "Parcours" },
  { id: "contact", name: "Contact" },
];

/* ============================================================================
   ARABIC (AR) — full translation, right-to-left.

   Same contract as the French block: only human-readable text is overridden,
   structure (colors, media, links) is shared from `site`.

   Two deliberate rules about what is NOT translated:
     • Brand names stay in Latin — ANADANI GROUP, Tera Energy, Soafeno,
       LUXSAFE. Transliterating a company's own mark would misname it.
       Descriptive titles DO get translated (Recruitment Control Room,
       Sbiba Heritage, Video Montage Reel), exactly as the French block does.
     • Technology names stay in Latin (Next.js, Three.js, Supabase). That is
       how they are written in Arabic technical writing.
   ============================================================================ */

const projectsAR = {
  "anadani-group": {
    tag: "ويب · مؤسسي · تعدّد اللغات",
    sub: "مجموعة تجارية لوكسمبورغية وعلاماتها الثلاث، بستّ لغات",
    overview:
      "الموقع المؤسسي لشركة ANADANI GROUP — مجموعة تجارية مقرّها لوكسمبورغ وعلاماتها الثلاث، بهوية واحدة من الأسود والذهبي عبر ستّ لغات.",
    problem:
      "مجموعة تجارية لوكسمبورغية كانت تبيع في أوروبا والشرق الأوسط بملفّ PDF فقط — والمشترون، بستّ لغات، لم يكن لديهم ما يتحقّقون منه.",
    solution:
      "بنيتُ موقع Next.js واحدًا مُولّدًا مسبقًا للمجموعة وعلاماتها الثلاث: نظام تصميم واحد، و775 مفتاحًا مترجمًا لكل لغة، ودعم كامل للاتجاه من اليمين إلى اليسار.",
    result:
      "تسعون صفحة مُولّدة مسبقًا على نطاق واحد. ستّة أسواق تقرأ اليوم المؤسّسة ذاتها، كلٌّ بلغته وحرفه — بلا مرفقات ولا موقع منفصل لكل علامة.",
    stack: ["Next.js 16", "Tailwind v4", "ستّ لغات", "GSAP · Lenis", "SEO"],
  },
  "nes-academy": {
    tag: "ويب · تعليم · وكالة",
    sub: "موقع واحد لجمهورين لا يجمع بينهما شيء",
    overview:
      "موقع NES Academy — أكاديمية ووكالة رقمية تونسية ترافق طلبة الهندسة حتى المناقشة، وتطوّر المواقع والتطبيقات والذكاء الاصطناعي لبقيّة العملاء.",
    problem:
      "تخاطب NES Academy جمهورين لا يجمع بينهما شيء — طالبٌ تفصله ثلاثة أسابيع عن مناقشته، وصاحب مشروع يحتاج تطبيقًا — وصفحة فيسبوك واحدة كانت تحاول مخاطبتهما معًا.",
    solution:
      "بنيتُ موقع Next.js 16 من تسع صفحات يفصل المسارين منذ شريط التنقّل: الخدمات والأعمال للعملاء، والتأطير والدورات للطلبة، تربطهما واجهة شفقيّة متحرّكة، وخطّ زمني للمنهجية يتحرّك مع التمرير، وشريط مشاريع يُسحب باليد — بالفرنسية والإنجليزية والعربية، مع دعم الاتجاه من اليمين إلى اليسار.",
    result:
      "كل جمهور يصل اليوم إلى صفحة مكتوبة له وحده، وأدلّة الأكاديمية — عدد المشاريع، وعدد الطلبة، ومعدّل الرضا — صارت على الشاشة نفسها التي يوجد فيها زرّ التواصل.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "GSAP · Lenis", "ثلاث لغات"],
  },
  "nes-studio": {
    tag: "ويب · استوديو · تعدّد اللغات",
    sub: "Ivory Atelier — عرض استوديو بثلاث لغات",
    overview:
      "NES Studio هو الذراع التجارية لـ NES Academy. يدافع موقعه عن فكرة واحدة، بثلاث لغات: امتلك الحجز، ولا تستأجره من منصّة تقتطع عمولتها من كلّ حجز.",
    problem:
      "كانت دور الضيافة والعيادات والمطاعم في تونس تسلّم كلّ حجز — والعمولة معه — إلى منصّة، لأن صفحة على مواقع التواصل كانت كلّ ما تملكه على الإنترنت.",
    solution:
      "بنيتُ الواجهة الثلاثية اللغات على نظام «Ivory Atelier» — بورسلان دافئ، وخطّ Fraunces التحريري، وطيف لوني يمتدّ من الأرجواني إلى الأخضر الليموني — مع مقارنة قبل/بعد، وأسعار معلنة، ونموذج أوّل مجاني يفتح المحادثة على واتساب.",
    result:
      "الفرنسية والعربية من اليمين إلى اليسار والإنجليزية، وكلّ صفحة مُولّدة مسبقًا، وبلا أيّ مسار خادم: الخطوط داخل المستودع، ونموذج التواصل يُرسل مباشرةً إلى Formspree من المتصفّح — فلا يُجري البناء أيّ اتصال بالشبكة.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "ثلاث لغات", "Formspree"],
  },
  "tera-energy": {
    tag: "علامة · ويب · تسويق",
    sub: "إطلاق علامة مشروبات طاقة فاخرة في تونس",
    overview:
      "قدتُ الإطلاق الرقمي لـ Tera Energy — الهوية البصرية، والموقع التعريفي، والحملة التي صنعت الترقّب قبل النزول إلى السوق.",
    problem:
      "مشروب طاقة جديد كان عليه دخول السوق التونسية في مواجهة الماركات المستوردة الراسخة — بلا هوية ولا جمهور ولا موقع.",
    solution:
      "تولّيتُ الإطلاق كاملًا: الهوية البصرية، والموقع التعريفي teraenergy.at، ومكتبة الحملة التي غذّت فيسبوك وإنستغرام.",
    result:
      "وصلت العلامة إلى الرفوف بمظهر واحد متماسك من العلبة إلى الموقع إلى وسائل التواصل، وبحملة تشويقية كانت تعمل قبل وصول أوّل علبة.",
    stack: ["تصميم الهوية", "تطوير الويب", "UI/UX", "Photoshop", "حملة رقمية"],
  },
  koroko: {
    tag: "ويب · علامة · صحّة",
    sub: "بيت رقمي لدار عائلية للعلاجات الطبيعية",
    overview:
      "موقع دافئ لمؤسسة Korokoro & Fils — دار عائلية في بنين تصنع علاجات نباتية تقليدية منذ أجيال.",
    problem:
      "أربعة أجيال من العلاجات النباتية في بنين، و43 منتجًا، ولا صفحة واحدة على الإنترنت — لم يكن للمشترين في الخارج سبيل لإيجاد الدار أو التحقّق منها.",
    solution:
      "بنيتُ موقعًا يقوده الإرث العائلي حول الصابون والمرهم والعسل وعصير NONI، مع قصّة الدار في الواجهة وزرّ اتصال أو واتساب على كل منتج.",
    result:
      "الكتالوج الكامل بعلاجاته الثلاثة والأربعين صار على الإنترنت مع القصّة التي تسنده، وأيّ استفسار يصل الورشة مباشرةً من أي هاتف.",
    stack: ["Next.js", "تصميم ويب", "هوية بصرية", "UI/UX"],
  },
  "soafeno-vanilla": {
    tag: "ويب · تصدير · B2B",
    sub: "واجهة تجارية ثنائية اللغة لفانيليا بوربون من مدغشقر",
    overview:
      "واجهة أنيقة ثنائية اللغة لشركة Soafeno Trading — منتِج ومصدِّر مباشر لفانيليا بوربون الفاخرة من مدغشقر.",
    problem:
      "منتج فانيليا من المنشأ مباشرةً كان يبدو على الإنترنت مطابقًا تمامًا للوسطاء الواقفين بينه وبين المشترين الأوروبيين.",
    solution:
      "طوّرتُ واجهة بيع ثنائية اللغة من صفحة واحدة: واجهة ثلاثية الأبعاد مخصّصة، وكتالوج الدرجات كاملًا، وسلسلة الحقل إلى التصدير خطوةً بخطوة، وطلب عرض سعر عند كل مرحلة.",
    result:
      "السلسلة، من مزرعة مدغشقر إلى الصندوق المشحون، تُقرأ في تمرير واحد بالفرنسية والإنجليزية — وهي الحجّة الوحيدة التي تفصل المنتِج عن الوسيط.",
    stack: ["Next.js", "Three.js", "GSAP", "لغتان"],
  },
  palmiche: {
    tag: "ويب · مطعم · علامة",
    sub: "مذاق من فنزويلا — مطعم كاريبي يحطّ في ديجون",
    overview:
      "واجهة مشمسة لمطعم Palmiché الفنزويلي الذي يقدّم الأريباس والإمبانادا والتيكينوس في مدينة ديجون الفرنسية.",
    problem:
      "مطعم فنزويلي يفتح أبوابه في ديجون كان عليه أن يشرح الأريبا والإمبانادا والتيكينيوس لمدينة لم تذقها قطّ.",
    solution:
      "بنيتُ موقعًا دافئًا بالأزرق المخضرّ والكهرماني يضع الطعام في المقدّمة: قائمة متحرّكة، وقصّة الأريبا، ومسار طلب لا يغادر الصفحة أبدًا.",
    result:
      "القائمة تتكفّل بالشرح قبل أن يدخل أحد من الباب، وكل طبق على بُعد لمسة واحدة من الطلب.",
    stack: ["Next.js", "Framer Motion", "تصميم ويب", "هوية بصرية"],
  },
  "talentmatch-ai": {
    tag: "ذكاء اصطناعي · SaaS",
    sub: "منصّة SaaS من الجيل الجديد للتوظيف بالذكاء الاصطناعي",
    overview:
      "منتج SaaS عالي التحويل لـ TalentMatch AI، منصّة تُحسّن التوظيف بالذكاء الاصطناعي — تقنية متقدّمة وواضحة في آنٍ واحد.",
    problem:
      "شركة توظيف ناشئة بالذكاء الاصطناعي كان لديها منتج تقنيّ فعلًا، وثلاثون ثانية تقريبًا لتجعل مسؤول التوظيف يفهمه.",
    solution:
      "صمّمتُ وطوّرتُ صفحة الهبوط ولوحة إدارة الوظائف معًا، حتى يتحدّث الوعد المكتوب في الصفحة والمنتج الذي خلفه اللغة نفسها.",
    result:
      "يفهم الزائر ما يفعله الذكاء الاصطناعي فعلًا قبل التمرير الثاني، ولوحة التحكّم في النقرة التالية تُثبت ذلك بدل أن تكرّره.",
    stack: ["Next.js", "تكامل ذكاء اصطناعي", "واجهة SaaS", "نماذج UI/UX"],
  },
  wakelni: {
    tag: "ذكاء اصطناعي · تطوير متكامل",
    sub: "مدرّب لياقة بالذكاء الاصطناعي ومنصّة لتتبّع الصحّة",
    overview:
      "تطبيق لياقة متكامل بالذكاء الاصطناعي يتتبّع السعرات والعناصر الغذائية والترطيب والخطوات وقياسات الجسم لحظيًا، مع مدرّب ذكي.",
    problem:
      "تتبّع السعرات والعناصر الغذائية والترطيب والخطوات وقياسات الجسم كان يتطلّب أربعة تطبيقات — ولا نصيحة واحدة في نهاية أيٍّ منها.",
    solution:
      "طوّرتُ تطبيقًا متكاملًا واحدًا: لوحة يومية، ورسوم بيانية لسبعة أيام، وحساب TDEE ومؤشّر كتلة الجسم، وتتبّع الأهداف، ومدرّبًا ذكيًا يقرأ البيانات نفسها — متعدّد اللغات، بواجهة داكنة.",
    result:
      "شاشة واحدة تجيب عن سؤال «هل أنا على المسار؟»، والمدرّب يحوّل تلك الإجابة إلى الخطوة التالية بدل أن يتركها رسمًا بيانيًا.",
    stack: ["Next.js", "روبوت محادثة ذكي", "تطوير متكامل", "نماذج UI/UX"],
  },
  "recruitment-control-room": {
    tag: "ذكاء اصطناعي · تطوير متكامل",
    name: "غرفة التحكّم في التوظيف",
    sub: "لوحة تحكّم لاستقطاب المرشّحين مدعومة بالذكاء الاصطناعي",
    overview:
      "منصّة متكاملة تجمع تأهيل المرشّحين وتنفيذ الحملات والتواصل المولَّد بالذكاء الاصطناعي في غرفة تحكّم واحدة.",
    problem:
      "كان المسؤولون عن التوظيف يديرون الاستقطاب والتأهيل والتواصل عبر أدوات متفرّقة، دون مصدر موحّد للحقيقة عن أي مرشّح.",
    solution:
      "بنيتُ لوحة واحدة على Supabase: صلاحيات حسب الدور، وصياغة رسائل التواصل بمساعدة الذكاء الاصطناعي، وتحليلات لمسار التوظيف تتحدّث لحظيًا.",
    result:
      "مسار التوظيف كلّه يجري في مكان واحد، ويرى كل مسؤول توظيف الحالة نفسها للمسار بدل نسخته الخاصة منها.",
    stack: ["Next.js", "Supabase", "تكامل ذكاء اصطناعي", "تطوير متكامل"],
  },
  "sbiba-heritage": {
    tag: "ذكاء اصطناعي · WebXR · ثلاثي الأبعاد",
    name: "تراث سبيبة",
    sub: "إحياء تراث عريق بالذكاء الاصطناعي والتقنية ثلاثية الأبعاد",
    overview:
      "تجربة ويب غامرة تُحيي تراث سبيبة — معالم ثلاثية الأبعاد بالمسح التصويري، ودليل ذكي، ومجتمع تفاعلي.",
    problem:
      "تراث سبيبة الروماني والبيزنطي كان قابعًا في أرشيفات لا يكاد أحد يزورها، ويتآكل أسرع ممّا يُوثَّق.",
    solution:
      "مسحتُ المعالم ثلاثيّ الأبعاد بالمسح التصويري، وغلّفتها في تجربة WebXR مع دليل ذكي، إضافةً إلى بورتريهات تضع الزائر داخل الحقبة.",
    result:
      "المعالم تُستكشف من أي متصفّح دون تثبيت أي تطبيق — وتبقى المسوحات سجلًّا يعمّر أطول من الحجر نفسه.",
    stack: ["WebXR", "Three.js", "روبوت محادثة ذكي", "المسح التصويري"],
  },
  "city-group": {
    tag: "ويب · تجارة إلكترونية",
    sub: "واجهة فاخرة للمكسّرات والصادرات الراقية",
    overview:
      "واجهة رقمية راقية لشركة City Group SARL، المتخصّصة في الكاجو الطبيعي عالي الجودة والفواكه المجفّفة الفاخرة.",
    problem:
      "مصدّر كاجو وفواكه مجفّفة فاخرة كان يدّعي جودةً لا يملك أي وسيلة لعرضها على مشترٍ.",
    solution:
      "صمّمتُ واجهة موجّهة للتحويل: طباعة أنيقة، وبطاقات منتجات تحمل الأحجام وملاحظات التذوّق، ولوحة ألوان متناغمة مع البضاعة.",
    result:
      "التشكيلة كاملةً صارت تُعرَض برابط واحد، وأصبح المنتج أخيرًا يبدو كما يصفه المصدّر.",
    stack: ["تصميم ويب", "نماذج UI/UX", "HTML/CSS", "JavaScript"],
  },
  "mriguel-ecommerce": {
    tag: "تسويق · تجارة إلكترونية",
    sub: "تسويق التجارة الإلكترونية والحملات الموسمية",
    overview:
      "بصفتي مسؤول التسويق الإلكتروني لمتجر Mriguel، قدتُ النمو عبر حملات موسمية — تصاميم وإعلانات فيديو قصيرة.",
    problem:
      "متجر إلكتروني احتاج تصاميم قادرة على إيقاف التمرير في كل موسم — لا حملة واحدة ناجحة يتبعها صمت.",
    solution:
      "بصفتي مسؤول التسويق للتجارة الإلكترونية، أدرتُ إنتاجًا منتظمًا لتصاميم الحملات وإعلانات الفيديو القصيرة بهوية واحدة، على فيسبوك وإنستغرام.",
    result:
      "حافظ المتجر على صوت بصري واحد في كل ذروة موسمية، مع تصاميم جديدة تُسلَّم وفق إيقاع منتظم لا حسب الظروف.",
    stack: ["تصميم جرافيك", "إعلانات فيديو", "Photoshop", "التواصل الاجتماعي"],
  },
  "video-montage": {
    tag: "فيديو · موشن",
    name: "مونتاج الفيديو",
    sub: "مونتاج سينمائي — Premiere Pro و CapCut والذكاء الاصطناعي",
    overview:
      "شريط من أعمال المونتاج الاحترافي بـ Premiere Pro و CapCut وأدوات الذكاء الاصطناعي — من اللقطات الخام إلى التدرّج اللوني والصوت والتسليم.",
    problem:
      "احتاج العملاء فيديو يمسك الانتباه — مونتاج على الإيقاع، وتدرّج لوني، ومزج صوتي سليم — وضمن مهلة حملة تسويقية.",
    solution:
      "أنشأتُ سلسلة عمل قابلة للتكرار على Premiere Pro و CapCut — مونتاج أوّلي، وتدرّج لوني، ومزج صوتي، وتسليم — مع استخدام الذكاء الاصطناعي حيث يوفّر وقتًا فعليًا فقط.",
    result:
      "مقاطع قصيرة تجاري إيقاع خطّ الأخبار، ضمن مهلة تناسب تقويم حملة تسويقية لا جدول تصوير سينمائي.",
    stack: ["Premiere Pro", "CapCut", "مؤثّرات ذكية", "التدرّج اللوني"],
  },
};

const statsAR = ["سنوات من البناء", "مشروعًا منجزًا", "أداة وتقنية", "لغات"];

const timelineAR = [
  {
    yr: "2026 — الآن",
    role: "مسؤول التسويق الإلكتروني",
    org: "Mriguel Store",
    desc: "قيادة نمو التجارة الإلكترونية والتسويق الرقمي لمتجر Mriguel.",
  },
  {
    yr: "2025 — الآن",
    role: "مسؤول التسويق · الرقمي والإبداعي",
    org: "Tera Energy",
    desc: "قيادة الإطلاق الرقمي لعلامة مشروبات ووجبات خفيفة جديدة — تصميم وتطوير الموقع التعريفي، وإدارة كل القنوات الاجتماعية، وإنتاج الحملات البصرية من الصفر.",
  },
  {
    yr: "2025",
    role: "متدرّب في الذكاء الاصطناعي وعلوم البيانات",
    org: "BNS Engineering",
    // "(GUCE 3+)" is dropped in favour of plain "GUCE": a "+" and parentheses
    // are bidi-neutral, so inside an Arabic sentence they detach from the Latin
    // run and render as "(+GUCE 3)". The version number is not worth the glitch.
    desc: "بناء نظام تحقّق ذكي لاستمارات الجمارك في منظومة GUCE باستخدام نماذج لغوية مبنية على LLaMA وتقنية RAG لاكتشاف أخطاء الإدخال وشرحها وتصحيحها تلقائيًا.",
  },
  {
    yr: "2024",
    role: "متدرّب في الذكاء الاصطناعي والتصميم",
    org: "Educanet",
    desc: "تطوير مسار متكامل لتحويل النص إلى فيديو بلغة Python مع تعليق صوتي مُزامَن لأتمتة إنتاج المحتوى التعليمي.",
  },
  {
    yr: "2023 — الآن",
    role: "مسؤول التسويق",
    org: "Nes Academy",
    desc: "تنمية مجتمع تعليمي — نشر الملخّصات وموارد الامتحانات والمحتوى الأكاديمي لآلاف الطلاب.",
  },
  {
    yr: "2022 — 2025",
    role: "ماجستير في هندسة البرمجيات",
    org: "جامعة ESPRIT",
    desc: "ماجستير هندسة في هندسة البرمجيات — تطوير الويب المتكامل والموبايل والذكاء الاصطناعي.",
  },
  {
    yr: "2020 — 2022",
    role: "ويب وتصميم — الخطوات الأولى",
    org: "Slim Optic · Medicars",
    desc: "بناء موقع منتجات Medicars وتصميم إعلانات Slim Optic — حيث التقى الكود بالتصميم لأوّل مرّة.",
  },
];

const siteAR = {
  ...site,
  // The name is shown in Arabic script; `brand` (the navbar wordmark) stays
  // Latin, the way a logotype does.
  name: "أحمد سليم",
  role: "مهندس برمجيات · مطوّر مبدع",
  tagline: "ويب · موبايل · ذكاء اصطناعي · تصميم جرافيك",
  heroBio:
    "أصنع الجسر بين الهندسة والتصميم الإبداعي — أطوّر تطبيقات الويب والموبايل، وأدرّب أنظمة الذكاء الاصطناعي، وأنمّي العلامات التجارية بكود نظيف وهوية بصرية مؤثّرة.",
  about: [
    "أنا <hl>مهندس برمجيات</hl> و<hl>مصمّم جرافيك</hl> مقيم في سوسة، تونس — خرّيج حديث من جامعة ESPRIT بشهادة ماجستير في هندسة البرمجيات. أعيش حيث يلتقي المنطق بالجمال.",
    "يمتدّ عملي من <hl>تطوير الويب والموبايل المتكامل</hl> إلى <hl>الذكاء الاصطناعي وعلوم البيانات</hl>، وصولًا إلى تصميم الهوية الذي يمنح المنتجات روحها. من أنظمة RAG المبنية على LLaMA إلى مسارات تحويل النص إلى فيديو والمواقع التعريفية المتجاوبة، أحبّ أن أبني الأشياء من أوّلها إلى آخرها.",
    "وحين لا أكتب الكود، أقود <hl>التسويق والمحتوى</hl> لعلامات تجارية صاعدة — أصمّم الملصقات، وأركّب الفيديو، وأبني المجتمعات من الصفر.",
  ],
  stats: site.stats.map((s, i) => ({ ...s, label: statsAR[i] })),
  projects: site.projects.map((p) => ({ ...p, ...(projectsAR[p.slug] || {}) })),
  timeline: timelineAR,
};

export const sectionsAR = [
  { id: "hero", name: "الرئيسية" },
  { id: "about", name: "نبذة عني" },
  { id: "skills", name: "المهارات" },
  { id: "projects", name: "المشاريع" },
  { id: "timeline", name: "المسيرة" },
  { id: "contact", name: "تواصل معي" },
];

/* ---- UI string dictionaries (hard-coded labels in the components) ---- */
const uiEN = {
  // The grand-door overlay. The name and role themselves come from `site.name`
  // and `site.role`, so the intro can never drift from the rest of the site.
  intro: {
    eyebrow: "You are entering the portfolio of",
    hint: "The door is opening",
    // Non-breaking spaces — plain ones collapse in HTML and the diamonds end
    // up hugging the word.
    pulse: "◈  ENTERING  ◈",
    enter: "Enter the Portfolio",
  },
  hero: {
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
    scroll: "Scroll",
    callMe: "Call me",
    emailMe: "Email me",
  },
  sound: { on: "Turn the music on", off: "Turn the music off" },
  about: { eyebrow: "About · The Maker", title: "Behind the Door" },
  skills: {
    eyebrow: "Arsenal · Languages & Tools",
    title: "Constellation of Skills",
    lead: "Each orb is a craft I work in — the ring shows proficiency, the size reflects mastery. Hover to read the numbers.",
  },
  projects: {
    eyebrow: "Hall of Creations",
    title: "Open a Door",
    lead: "Every door is a real project I designed or built. Step inside for the story, the visuals and the live work.",
    stepInside: "Step Inside",
    problem: "Problem",
    solution: "Solution",
    result: "Result",
    visitLive: "Visit Live Site →",
  },
  timeline: { eyebrow: "The Path of Light", title: "My Journey" },
  contact: {
    eyebrow: "Open Channel",
    title: "Let's Build Something",
    name: "Your Name",
    email: "Email",
    message: "Message",
    namePh: "Traveler's name",
    emailPh: "you@realm.com",
    messagePh: "Speak, and the door shall open…",
    send: "Send Message ◈",
    sending: "Sending…",
    sent: "Message Sent ◈",
    statusSent: "Thank you — your message is on its way. I'll reply soon.",
    fillAll: "Please fill in every field.",
    badEmail: "That email address looks off.",
    genericErr: "Something went wrong. Try again, or email me directly.",
    traveler: "a traveler",
  },
  footer: {
    privacy: "Privacy",
    // Shown next to the copyright. A real place under a real name is the
    // cheapest trust signal a freelance site has.
    location: "Sousse, Tunisia · Available worldwide",
  },
  lang: { label: "Language", english: "English", french: "Français", arabic: "العربية" },
};

const uiFR = {
  intro: {
    eyebrow: "Vous entrez dans le portfolio de",
    hint: "La porte s'ouvre",
    pulse: "◈  ENTRÉE  ◈",
    enter: "Entrer dans le Portfolio",
  },
  hero: {
    viewProjects: "Voir les Projets",
    getInTouch: "Me Contacter",
    scroll: "Défiler",
    callMe: "M'appeler",
    emailMe: "M'écrire",
  },
  sound: { on: "Activer la musique", off: "Couper la musique" },
  about: { eyebrow: "À Propos · L'Artisan", title: "Derrière la Porte" },
  skills: {
    eyebrow: "Arsenal · Langages & Outils",
    title: "Constellation de Compétences",
    lead: "Chaque orbe est un métier que je pratique — l'anneau montre la maîtrise, la taille reflète l'expertise. Survolez pour voir les chiffres.",
  },
  projects: {
    eyebrow: "Hall des Créations",
    title: "Ouvrez une Porte",
    lead: "Chaque porte est un vrai projet que j'ai conçu ou développé. Entrez pour découvrir l'histoire, les visuels et le travail en ligne.",
    stepInside: "Entrez",
    problem: "Problème",
    solution: "Solution",
    result: "Résultat",
    visitLive: "Voir le Site →",
  },
  timeline: { eyebrow: "Le Chemin de Lumière", title: "Mon Parcours" },
  contact: {
    eyebrow: "Canal Ouvert",
    title: "Créons Quelque Chose",
    name: "Votre Nom",
    email: "E-mail",
    message: "Message",
    namePh: "Nom du voyageur",
    emailPh: "vous@royaume.com",
    messagePh: "Parlez, et la porte s'ouvrira…",
    send: "Envoyer le Message ◈",
    sending: "Envoi…",
    sent: "Message Envoyé ◈",
    statusSent: "Merci — votre message est en route. Je répondrai bientôt.",
    fillAll: "Veuillez remplir tous les champs.",
    badEmail: "Cette adresse e-mail semble incorrecte.",
    genericErr: "Une erreur est survenue. Réessayez, ou écrivez-moi directement.",
    traveler: "un voyageur",
  },
  footer: {
    privacy: "Confidentialité",
    location: "Sousse, Tunisie · Disponible partout dans le monde",
  },
  lang: { label: "Langue", english: "English", french: "Français", arabic: "العربية" },
};

const uiAR = {
  intro: {
    eyebrow: "أنت على وشك الدخول إلى معرض أعمال",
    hint: "الباب يُفتح",
    pulse: "◈  دخول  ◈",
    enter: "ادخل إلى المعرض",
  },
  hero: {
    viewProjects: "استعرض المشاريع",
    getInTouch: "تواصل معي",
    scroll: "مرّر",
    callMe: "اتّصل بي",
    emailMe: "راسلني",
  },
  sound: { on: "تشغيل الموسيقى", off: "إيقاف الموسيقى" },
  about: { eyebrow: "نبذة · الصانع", title: "خلف الباب" },
  skills: {
    eyebrow: "الترسانة · اللغات والأدوات",
    title: "كوكبة المهارات",
    lead: "كل مدار حرفة أمارسها — الحلقة تُظهر مستوى الإتقان، والحجم يعكس عمق الخبرة. مرّر المؤشّر لقراءة الأرقام.",
  },
  projects: {
    eyebrow: "قاعة الإبداعات",
    title: "افتح بابًا",
    lead: "كل باب مشروع حقيقي صمّمته أو طوّرته. ادخل لتكتشف القصة والصور والعمل المنشور.",
    stepInside: "ادخل",
    problem: "المشكلة",
    solution: "الحل",
    result: "النتيجة",
    // The arrow points left because left is "forward" in a right-to-left page.
    visitLive: "زيارة الموقع ←",
  },
  timeline: { eyebrow: "درب النور", title: "مسيرتي" },
  contact: {
    eyebrow: "قناة مفتوحة",
    title: "لنصنع شيئًا معًا",
    name: "اسمك",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    namePh: "اسم المسافر",
    emailPh: "you@realm.com",
    messagePh: "تكلّم، وسيُفتح الباب…",
    send: "أرسل الرسالة ◈",
    sending: "جارٍ الإرسال…",
    sent: "تمّ إرسال الرسالة ◈",
    statusSent: "شكرًا لك — رسالتك في طريقها إليّ. سأردّ عليك قريبًا.",
    fillAll: "يرجى ملء جميع الحقول.",
    badEmail: "يبدو أنّ هذا البريد الإلكتروني غير صحيح.",
    genericErr: "حدث خطأ ما. حاول مجدّدًا، أو راسلني مباشرة.",
    traveler: "مسافر",
  },
  footer: {
    privacy: "الخصوصية",
    location: "سوسة، تونس · متاح للعمل في كل مكان",
  },
  lang: { label: "اللغة", english: "English", french: "Français", arabic: "العربية" },
};

/* ---- The locale registry consumed by the LanguageProvider ---- */
export const locales = {
  en: { site, sections, ui: uiEN },
  fr: { site: siteFR, sections: sectionsFR, ui: uiFR },
  ar: { site: siteAR, sections: sectionsAR, ui: uiAR, dir: "rtl" },
};
