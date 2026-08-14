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
    { num: 12, label: "Projects Shipped" },
    { num: 20, label: "Tools & Tech" },
    { num: 3, label: "Languages" },
  ],

  /* ---- Skills constellation --------------------------------------------- */
  // pct = proficiency (shown on hover). size = orb diameter in px (mastery).
  skills: [
    { name: "JavaScript", pct: 90, size: 152 },
    { name: "React JS", pct: 88, size: 144 },
    { name: "Photoshop", pct: 88, size: 140 },
    { name: "Python", pct: 82, size: 130 },
    { name: "Illustrator", pct: 84, size: 134 },
    { name: "Flutter", pct: 80, size: 126 },
    { name: "Figma", pct: 82, size: 124 },
    { name: "Spring Boot", pct: 76, size: 128 },
    { name: "MongoDB", pct: 78, size: 120 },
    { name: "Premiere Pro", pct: 80, size: 124 },
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
        "A group selling into Europe and the Middle East had to earn buyers' trust in six languages, Arabic included.",
      solution:
        "I built a statically-rendered Next.js site: one design system, 775 keys per locale, full Arabic RTL, and a page per brand.",
      result:
        "Ninety prerendered pages that load instantly and read as one institution in every language.",
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
        "A brand-new beverage had to enter the Tunisian market with a premium identity and no existing audience.",
      solution:
        "I designed the identity, built the showcase site (teraenergy.at) and produced the full library of campaign visuals.",
      result:
        "A cohesive premium brand and a teaser campaign that generated real anticipation ahead of launch.",
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
        "A respected family business with 43+ remedies and a rich heritage had no digital presence at all.",
      solution:
        "I built an elegant heritage site around their flagship soap, pommade, honey and NONI juice, with direct call and WhatsApp paths.",
      result:
        "A premium online presence that turns generations of know-how into a brand ready for export.",
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
        "A direct-from-origin vanilla exporter had to earn professional buyers' trust and stand apart from resellers.",
      solution:
        "I built an animated one-page site with a custom 3D hero, the full grade catalog, the field-to-export process and quote CTAs.",
      result:
        "A high-end export experience that positions Soafeno as a direct-from-origin partner worldwide.",
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
        "A new Venezuelan restaurant needed a vibrant identity to introduce a little-known cuisine and drive orders.",
      solution:
        "I built a tropical site with a deep-teal and amber identity, an animated menu, the story of the arepa and clear ordering paths.",
      result:
        "A mouth-watering online home that makes Venezuelan cuisine feel irresistible and ready to order.",
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
        "An AI recruitment startup needed a product that felt cutting-edge yet instantly understandable.",
      solution:
        "I designed and built the landing page and a clean job-management dashboard with custom visuals and a fluid UX.",
      result:
        "A premium experience that communicates the AI value instantly and converts.",
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
        "People juggling fitness goals had no single smart place to track nutrition and progress with real guidance.",
      solution:
        "I built a daily overview, 7-day charts, TDEE & BMI, goal pacing and an AI coach — multilingual on a clean dark UI.",
      result:
        "A polished companion that turns raw metrics into actionable daily guidance.",
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
        "Recruiters ran sourcing, qualification and outreach across scattered tools with no single source of truth.",
      solution:
        "I built a unified dashboard with role-based access, Supabase auth, AI-assisted outreach and live pipeline analytics.",
      result:
        "One clean interface that runs the entire hiring workflow end to end.",
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
        "The historical heritage of Sbiba deserved a modern, engaging way to be explored and preserved digitally.",
      solution:
        "I built a WebXR experience with 3D-scanned monuments, an AI chatbot, and selfies transformed into historical portraits.",
      result:
        "A living, interactive museum of Mediterranean heritage, open from any browser.",
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
        "A premium nut & dried-fruit exporter had no digital presence worthy of its product quality.",
      solution:
        "I designed a conversion-focused storefront with refined typography, rich product cards and a warm premium aesthetic.",
      result:
        "A polished flagship that elevates the brand online and showcases the full range.",
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
        "An online retailer needed consistent, scroll-stopping creative to grow engagement across seasonal moments.",
      solution:
        "I produced a steady stream of campaign graphics and video ads on a cohesive identity across Facebook and Instagram.",
      result:
        "A high-engagement social presence that kept the store top-of-mind every season.",
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
        "Clients needed engaging, on-brand videos with clean pacing, color and sound — delivered fast.",
      solution:
        "I structured the narrative, graded color, synced audio and added AI-assisted effects for a polished final cut.",
      result:
        "Clean, engaging videos delivered on time and on brief, every time.",
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
  email: "slim.ahmed@esprit.tn",
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
      "Un groupe vendant en Europe et au Moyen-Orient devait gagner la confiance des acheteurs en six langues, arabe compris.",
    solution:
      "J'ai développé un site Next.js statique : un seul système de design, 775 clés par langue, le RTL arabe complet et une page par marque.",
    result:
      "Quatre-vingt-dix pages pré-rendues, instantanées, qui se lisent comme une seule institution dans chaque langue.",
    stack: ["Next.js 16", "Tailwind v4", "i18n · 6 Langues", "GSAP · Lenis", "SEO"],
  },
  "tera-energy": {
    tag: "Marque · Web · Marketing",
    sub: "Lancement d'une marque de boisson énergisante premium en Tunisie",
    overview:
      "J'ai piloté le lancement digital de Tera Energy — l'identité de marque, le site vitrine et la campagne qui a créé l'attente avant ses débuts.",
    problem:
      "Une toute nouvelle boisson devait entrer sur le marché tunisien avec une identité premium et sans audience.",
    solution:
      "J'ai conçu l'identité, développé le site vitrine (teraenergy.at) et produit toute la bibliothèque de visuels de campagne.",
    result:
      "Une marque premium cohérente et une campagne teaser qui a généré une vraie attente avant le lancement.",
    stack: ["Design de Marque", "Développement Web", "UI/UX", "Photoshop", "Campagne Sociale"],
  },
  koroko: {
    tag: "Web · Marque · Bien-être",
    sub: "Une maison digitale pour une maison familiale de remèdes naturels",
    overview:
      "Un site chaleureux pour l'Établissement Korokoro & Fils — une maison familiale béninoise qui façonne des remèdes à base de plantes depuis des générations.",
    problem:
      "Une entreprise familiale respectée, forte de plus de 43 remèdes et d'un riche héritage, n'avait aucune présence en ligne.",
    solution:
      "J'ai construit un site élégant autour de leur savon et pommade phares, du miel et du jus de NONI, avec appel et WhatsApp directs.",
    result:
      "Une présence en ligne premium qui transforme des générations de savoir-faire en une marque prête pour l'export.",
    stack: ["Next.js", "Design Web", "Identité de Marque", "UI/UX"],
  },
  "soafeno-vanilla": {
    tag: "Web · Export · B2B",
    sub: "Une vitrine B2B bilingue pour la vanille Bourbon de Madagascar",
    overview:
      "Une vitrine bilingue (FR/EN) raffinée pour Soafeno Trading — producteur et exportateur direct de vanille Bourbon premium de Madagascar.",
    problem:
      "Un exportateur de vanille en direct devait gagner la confiance des acheteurs professionnels et se démarquer des revendeurs.",
    solution:
      "J'ai développé un site one-page animé : hero 3D sur mesure, catalogue des grades, parcours champ-export et CTA de devis.",
    result:
      "Une expérience export haut de gamme qui positionne Soafeno comme partenaire direct de l'origine dans le monde entier.",
    stack: ["Next.js", "Three.js", "GSAP", "i18n FR/EN"],
  },
  palmiche: {
    tag: "Web · Restaurant · Marque",
    sub: "Un goût du Venezuela — un restaurant caribéen s'installe à Dijon",
    overview:
      "Une vitrine ensoleillée pour Palmiché, un restaurant vénézuélien qui apporte arepas, empanadas et tequeños à Dijon.",
    problem:
      "Un nouveau restaurant vénézuélien avait besoin d'une identité vibrante pour faire découvrir une cuisine méconnue.",
    solution:
      "J'ai construit un site tropical bleu-canard et ambre, avec un menu animé, l'histoire de l'arepa et des parcours de commande clairs.",
    result:
      "Une vitrine appétissante qui rend la cuisine vénézuélienne irrésistible et prête à commander.",
    stack: ["Next.js", "Framer Motion", "Design Web", "Identité de Marque"],
  },
  "talentmatch-ai": {
    tag: "IA · SaaS",
    sub: "Une plateforme SaaS nouvelle génération pour le recrutement par IA",
    overview:
      "Un produit SaaS à forte conversion pour TalentMatch AI, une plateforme qui optimise le recrutement par l'IA — high-tech et limpide.",
    problem:
      "Une startup de recrutement par IA avait besoin d'un produit à la fois avant-gardiste et immédiatement compréhensible.",
    solution:
      "J'ai conçu la landing page et un tableau de bord de gestion des offres épuré, avec des visuels sur mesure et une UX fluide.",
    result:
      "Une expérience premium qui communique instantanément la valeur de l'IA et convertit.",
    stack: ["Next.js", "Intégration IA", "UI SaaS", "Prototypage UI/UX"],
  },
  wakelni: {
    tag: "IA · Full-Stack",
    sub: "Un coach fitness IA et une plateforme de suivi santé",
    overview:
      "Une application full-stack de coaching fitness par IA qui suit calories, macros, hydratation, pas et mesures en temps réel, avec un coach IA.",
    problem:
      "Les personnes jonglant avec leurs objectifs fitness n'avaient aucun espace unique pour suivre nutrition et progression.",
    solution:
      "J'ai développé un aperçu quotidien, des graphiques sur 7 jours, le TDEE & l'IMC, le suivi d'objectifs et un coach IA — multilingue.",
    result:
      "Un compagnon soigné qui transforme des données brutes en conseils quotidiens concrets.",
    stack: ["Next.js", "Chatbot IA", "Full-Stack", "Prototypage UI/UX"],
  },
  "recruitment-control-room": {
    tag: "IA · Full-Stack",
    name: "Salle de Contrôle Recrutement",
    sub: "Un tableau de bord de sourcing de candidats propulsé par l'IA",
    overview:
      "Une plateforme full-stack qui centralise la qualification des candidats, les campagnes et la prise de contact par IA dans une seule salle de contrôle.",
    problem:
      "Les recruteurs géraient sourcing, qualification et prise de contact sur des outils éparpillés, sans source unique de vérité.",
    solution:
      "J'ai construit un tableau de bord unifié : gestion des rôles, auth Supabase, prise de contact par IA et analyses en temps réel.",
    result:
      "Une interface épurée qui pilote tout le flux de recrutement de bout en bout.",
    stack: ["Next.js", "Supabase", "Intégration IA", "Full-Stack"],
  },
  "sbiba-heritage": {
    tag: "IA · WebXR · 3D",
    sub: "Faire revivre un patrimoine ancien grâce à l'IA & la 3D",
    overview:
      "Une expérience web immersive qui fait revivre le patrimoine de Sbiba — monuments 3D par photogrammétrie, guide IA et communauté.",
    problem:
      "Le patrimoine historique de Sbiba méritait une manière moderne d'être exploré et préservé numériquement.",
    solution:
      "J'ai construit une expérience WebXR avec des monuments scannés en 3D, un chatbot IA et des selfies transformés en portraits historiques.",
    result:
      "Un musée vivant du patrimoine méditerranéen, ouvert depuis n'importe quel navigateur.",
    stack: ["WebXR", "Three.js", "Chatbot IA", "Photogrammétrie"],
  },
  "city-group": {
    tag: "Web · E-Commerce",
    sub: "Une vitrine de luxe pour des noix et exports premium",
    overview:
      "Une vitrine digitale sophistiquée pour City Group SARL, spécialiste des noix de cajou naturelles et des fruits secs premium.",
    problem:
      "Un exportateur premium de noix et fruits secs n'avait aucune présence digitale à la hauteur de ses produits.",
    solution:
      "J'ai conçu une vitrine orientée conversion, avec une typographie raffinée, de riches fiches produits et une esthétique premium.",
    result:
      "Une vitrine soignée qui valorise la marque en ligne et met en avant toute la gamme.",
    stack: ["Design Web", "Prototypage UI/UX", "HTML/CSS", "JavaScript"],
  },
  "mriguel-ecommerce": {
    tag: "Marketing · E-Commerce",
    sub: "Marketing e-commerce & campagnes saisonnières",
    overview:
      "Responsable marketing e-commerce de Mriguel Store, j'ai stimulé la croissance par des campagnes saisonnières — visuels et publicités vidéo courtes.",
    problem:
      "Un détaillant en ligne avait besoin de créations accrocheuses et cohérentes pour porter l'engagement à chaque temps fort.",
    solution:
      "J'ai produit un flux constant de visuels et de publicités vidéo sur une identité cohérente, sur Facebook et Instagram.",
    result:
      "Une présence sociale à fort engagement qui a gardé la boutique en tête à chaque saison.",
    stack: ["Design Graphique", "Publicités Vidéo", "Photoshop", "Réseaux Sociaux"],
  },
  "video-montage": {
    tag: "Vidéo · Motion",
    name: "Montage Vidéo",
    sub: "Montage cinématique — Premiere Pro, CapCut & IA",
    overview:
      "Une bobine de montages professionnels réalisés avec Premiere Pro, CapCut et l'IA — des rushes à l'étalonnage, au son et à la livraison.",
    problem:
      "Les clients avaient besoin de vidéos engageantes et fidèles à leur marque, au rythme maîtrisé, livrées rapidement.",
    solution:
      "J'ai structuré le récit, étalonné les couleurs, synchronisé l'audio et ajouté des effets assistés par IA pour un rendu final soigné.",
    result:
      "Des vidéos propres et engageantes, livrées dans les délais et conformes au brief, à chaque fois.",
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
      "مجموعة تبيع في أوروبا والشرق الأوسط كان عليها كسب ثقة المشترين بستّ لغات، من بينها العربية.",
    solution:
      "بنيتُ موقع Next.js مُولّدًا مسبقًا بالكامل: نظام تصميم واحد، و775 مفتاحًا لكل لغة، ودعم كامل للاتجاه من اليمين إلى اليسار، وصفحة لكل علامة.",
    result:
      "تسعون صفحة جاهزة مسبقًا تُفتح فورًا وتُقرأ كمؤسسة واحدة بكل لغة.",
    stack: ["Next.js 16", "Tailwind v4", "ستّ لغات", "GSAP · Lenis", "SEO"],
  },
  "tera-energy": {
    tag: "علامة · ويب · تسويق",
    sub: "إطلاق علامة مشروبات طاقة فاخرة في تونس",
    overview:
      "قدتُ الإطلاق الرقمي لـ Tera Energy — الهوية البصرية، والموقع التعريفي، والحملة التي صنعت الترقّب قبل النزول إلى السوق.",
    problem:
      "علامة مشروبات جديدة كليًا كان عليها دخول السوق التونسية بهوية فاخرة ومن دون أي جمهور سابق.",
    solution:
      "صمّمتُ الهوية، وطوّرتُ الموقع التعريفي (teraenergy.at)، وأنتجتُ مكتبة كاملة من تصاميم الحملة.",
    result:
      "حضور فاخر ومتماسك للعلامة، وحملة تشويقية صنعت ترقّبًا حقيقيًا قبل الإطلاق.",
    stack: ["تصميم الهوية", "تطوير الويب", "UI/UX", "Photoshop", "حملة رقمية"],
  },
  koroko: {
    tag: "ويب · علامة · صحّة",
    sub: "بيت رقمي لدار عائلية للعلاجات الطبيعية",
    overview:
      "موقع دافئ لمؤسسة Korokoro & Fils — دار عائلية في بنين تصنع علاجات نباتية تقليدية منذ أجيال.",
    problem:
      "شركة عائلية محترمة تملك أكثر من 43 علاجًا وإرثًا غنيًا لم يكن لها أي حضور رقمي.",
    solution:
      "بنيتُ موقعًا أنيقًا حول صابونها ومرهمها الأشهر والعسل وعصير النوني، مع مسارات اتصال وواتساب مباشرة.",
    result:
      "حضور رقمي راقٍ يحوّل أجيالًا من الخبرة إلى علامة جاهزة للتصدير.",
    stack: ["Next.js", "تصميم ويب", "هوية بصرية", "UI/UX"],
  },
  "soafeno-vanilla": {
    tag: "ويب · تصدير · B2B",
    sub: "واجهة تجارية ثنائية اللغة لفانيليا بوربون من مدغشقر",
    overview:
      "واجهة أنيقة ثنائية اللغة لشركة Soafeno Trading — منتِج ومصدِّر مباشر لفانيليا بوربون الفاخرة من مدغشقر.",
    problem:
      "مصدّر فانيليا من المنشأ مباشرة كان عليه كسب ثقة المشترين المحترفين وتمييز نفسه عن الوسطاء.",
    solution:
      "طوّرتُ موقعًا من صفحة واحدة متحرّكة: واجهة ثلاثية الأبعاد مخصّصة، وكتالوج الدرجات، ومسار الحقل إلى التصدير، وأزرار طلب عرض سعر.",
    result:
      "تجربة تصدير راقية تضع Soafeno كشريك مباشر من المنشأ حول العالم.",
    stack: ["Next.js", "Three.js", "GSAP", "لغتان"],
  },
  palmiche: {
    tag: "ويب · مطعم · علامة",
    sub: "مذاق من فنزويلا — مطعم كاريبي يحطّ في ديجون",
    overview:
      "واجهة مشمسة لمطعم Palmiché الفنزويلي الذي يقدّم الأريباس والإمبانادا والتيكينوس في مدينة ديجون الفرنسية.",
    problem:
      "مطعم فنزويلي جديد احتاج هوية نابضة تعرّف بمطبخ لا يعرفه كثيرون.",
    solution:
      "بنيتُ موقعًا استوائيًا بهوية زرقاء داكنة وكهرمانية، مع قائمة طعام متحرّكة، وقصّة الأريبا، ومسارات طلب واضحة.",
    result:
      "واجهة تفتح الشهية وتجعل المطبخ الفنزويلي مغريًا وجاهزًا للطلب.",
    stack: ["Next.js", "Framer Motion", "تصميم ويب", "هوية بصرية"],
  },
  "talentmatch-ai": {
    tag: "ذكاء اصطناعي · SaaS",
    sub: "منصّة SaaS من الجيل الجديد للتوظيف بالذكاء الاصطناعي",
    overview:
      "منتج SaaS عالي التحويل لـ TalentMatch AI، منصّة تُحسّن التوظيف بالذكاء الاصطناعي — تقنية متقدّمة وواضحة في آنٍ واحد.",
    problem:
      "شركة توظيف ناشئة احتاجت منتجًا يبدو متقدّمًا ومفهومًا من النظرة الأولى.",
    solution:
      "صمّمتُ وطوّرتُ صفحة الهبوط ولوحة إدارة الوظائف بتصاميم مخصّصة وتجربة استخدام سلسة.",
    result:
      "تجربة راقية توصل قيمة الذكاء الاصطناعي فورًا وتحوّل الزائر إلى عميل.",
    stack: ["Next.js", "تكامل ذكاء اصطناعي", "واجهة SaaS", "نماذج UI/UX"],
  },
  wakelni: {
    tag: "ذكاء اصطناعي · تطوير متكامل",
    sub: "مدرّب لياقة بالذكاء الاصطناعي ومنصّة لتتبّع الصحّة",
    overview:
      "تطبيق لياقة متكامل بالذكاء الاصطناعي يتتبّع السعرات والعناصر الغذائية والترطيب والخطوات وقياسات الجسم لحظيًا، مع مدرّب ذكي.",
    problem:
      "من يوازنون بين أهداف اللياقة لم يجدوا مكانًا واحدًا ذكيًا لتتبّع التغذية والتقدّم.",
    solution:
      "طوّرتُ لوحة يومية، ورسومًا بيانية لسبعة أيام، وحساب TDEE ومؤشّر كتلة الجسم، وتتبّع الأهداف، ومدرّبًا ذكيًا — متعدّد اللغات.",
    result:
      "رفيق مصقول يحوّل الأرقام الخام إلى إرشاد يومي قابل للتنفيذ.",
    stack: ["Next.js", "روبوت محادثة ذكي", "تطوير متكامل", "نماذج UI/UX"],
  },
  "recruitment-control-room": {
    tag: "ذكاء اصطناعي · تطوير متكامل",
    name: "غرفة التحكّم في التوظيف",
    sub: "لوحة تحكّم لاستقطاب المرشّحين مدعومة بالذكاء الاصطناعي",
    overview:
      "منصّة متكاملة تجمع تأهيل المرشّحين وتنفيذ الحملات والتواصل المولَّد بالذكاء الاصطناعي في غرفة تحكّم واحدة.",
    problem:
      "كان المسؤولون عن التوظيف يديرون الاستقطاب والتأهيل والتواصل عبر أدوات متفرّقة دون مصدر موحّد للحقيقة.",
    solution:
      "بنيتُ لوحة موحّدة بصلاحيات حسب الدور، ومصادقة Supabase، وتواصلًا بمساعدة الذكاء الاصطناعي، وتحليلات لحظية.",
    result:
      "واجهة واحدة نظيفة تدير مسار التوظيف كاملًا من أوّله إلى آخره.",
    stack: ["Next.js", "Supabase", "تكامل ذكاء اصطناعي", "تطوير متكامل"],
  },
  "sbiba-heritage": {
    tag: "ذكاء اصطناعي · WebXR · ثلاثي الأبعاد",
    name: "تراث سبيبة",
    sub: "إحياء تراث عريق بالذكاء الاصطناعي والتقنية ثلاثية الأبعاد",
    overview:
      "تجربة ويب غامرة تُحيي تراث سبيبة — معالم ثلاثية الأبعاد بالمسح التصويري، ودليل ذكي، ومجتمع تفاعلي.",
    problem:
      "تراث سبيبة التاريخي كان يستحقّ طريقة حديثة وجذّابة لاستكشافه وحفظه رقميًا.",
    solution:
      "بنيتُ تجربة WebXR بمعالم ممسوحة ثلاثية الأبعاد، وروبوت محادثة ذكي، وصور شخصية تتحوّل إلى بورتريهات تاريخية.",
    result:
      "متحف حيّ للتراث المتوسّطي، مفتوح من أي متصفّح.",
    stack: ["WebXR", "Three.js", "روبوت محادثة ذكي", "المسح التصويري"],
  },
  "city-group": {
    tag: "ويب · تجارة إلكترونية",
    sub: "واجهة فاخرة للمكسّرات والصادرات الراقية",
    overview:
      "واجهة رقمية راقية لشركة City Group SARL، المتخصّصة في الكاجو الطبيعي عالي الجودة والفواكه المجفّفة الفاخرة.",
    problem:
      "مصدّر مكسّرات وفواكه مجفّفة فاخرة لم يكن له حضور رقمي يليق بجودة منتجاته.",
    solution:
      "صمّمتُ واجهة موجّهة للتحويل بطباعة أنيقة وبطاقات منتجات غنيّة وجماليات فاخرة.",
    result:
      "واجهة مصقولة ترفع مكانة العلامة رقميًا وتعرض التشكيلة كاملة.",
    stack: ["تصميم ويب", "نماذج UI/UX", "HTML/CSS", "JavaScript"],
  },
  "mriguel-ecommerce": {
    tag: "تسويق · تجارة إلكترونية",
    sub: "تسويق التجارة الإلكترونية والحملات الموسمية",
    overview:
      "بصفتي مسؤول التسويق الإلكتروني لمتجر Mriguel، قدتُ النمو عبر حملات موسمية — تصاميم وإعلانات فيديو قصيرة.",
    problem:
      "متجر إلكتروني احتاج تصاميم متماسكة وجاذبة للنظر لرفع التفاعل في كل موسم.",
    solution:
      "أنتجتُ تدفّقًا مستمرًا من تصاميم الحملات وإعلانات الفيديو بهوية موحّدة على فيسبوك وإنستغرام.",
    result:
      "حضور اجتماعي عالي التفاعل أبقى المتجر حاضرًا في كل موسم.",
    stack: ["تصميم جرافيك", "إعلانات فيديو", "Photoshop", "التواصل الاجتماعي"],
  },
  "video-montage": {
    tag: "فيديو · موشن",
    name: "مونتاج الفيديو",
    sub: "مونتاج سينمائي — Premiere Pro و CapCut والذكاء الاصطناعي",
    overview:
      "شريط من أعمال المونتاج الاحترافي بـ Premiere Pro و CapCut وأدوات الذكاء الاصطناعي — من اللقطات الخام إلى التدرّج اللوني والصوت والتسليم.",
    problem:
      "احتاج العملاء مقاطع جذّابة ومطابقة لهويّتهم، بإيقاع محكم وتسليم سريع.",
    solution:
      "بنيتُ السرد، وضبطتُ التدرّج اللوني، وزامنتُ الصوت، وأضفتُ مؤثّرات بمساعدة الذكاء الاصطناعي لنسخة نهائية مصقولة.",
    result:
      "مقاطع نظيفة وجذّابة، تُسلَّم في وقتها ووفق المطلوب، في كل مرّة.",
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
  hero: { viewProjects: "View Projects", getInTouch: "Get in Touch", scroll: "Scroll" },
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
    rights:
      "All rights reserved. Crafted with light, sound & mechanism — the Chamber of Curiosities.",
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
  hero: { viewProjects: "Voir les Projets", getInTouch: "Me Contacter", scroll: "Défiler" },
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
    rights:
      "Tous droits réservés. Façonné avec lumière, son & mécanisme — le Chamber of Curiosities.",
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
  hero: { viewProjects: "استعرض المشاريع", getInTouch: "تواصل معي", scroll: "مرّر" },
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
    rights: "جميع الحقوق محفوظة. صُنع بالضوء والصوت والآلية — قاعة العجائب.",
  },
  lang: { label: "اللغة", english: "English", french: "Français", arabic: "العربية" },
};

/* ---- The locale registry consumed by the LanguageProvider ---- */
export const locales = {
  en: { site, sections, ui: uiEN },
  fr: { site: siteFR, sections: sectionsFR, ui: uiFR },
  ar: { site: siteAR, sections: sectionsAR, ui: uiAR, dir: "rtl" },
};
