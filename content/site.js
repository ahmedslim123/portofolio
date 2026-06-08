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
  photo: "/ahmed.jpg",

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
    { num: 9, label: "Projects Shipped" },
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
      slug: "tera-energy",
      tag: "Brand · Web · Marketing",
      name: "Tera Energy",
      accent: "#E7B43A",
      bg: "linear-gradient(160deg,#2a2008,#0c0a03)",
      glow: "rgba(231,180,58,.32)",
      sub: "Launching a premium energy-drink brand in Tunisia",
      cover: "/projects/tera-energy/cover.jpg",
      overview:
        "I led the end-to-end digital launch of Tera Energy — a new premium beverage brand — owning the brand identity, the showcase website, and the full social campaign that built anticipation before its market debut.",
      problem:
        "A brand-new beverage brand had to enter the Tunisian market with a premium identity and no existing audience.",
      solution:
        "I designed the visual identity, built a responsive showcase site (live at teraenergy.at), and produced a full library of campaign posters, product visuals and teaser content across every channel.",
      result:
        "A cohesive, premium brand presence and a 'coming soon' campaign that generated real anticipation ahead of launch.",
      stack: ["Brand Design", "Web Development", "UI/UX", "Photoshop", "Social Campaign"],
      live: "https://www.teraenergy.at",
      social: {
        facebook: "https://www.facebook.com/TeraEnergyOfficial",
        instagram: "https://www.instagram.com/teraenergyx/",
      },
      media: [
        { type: "image", src: "/projects/tera-energy/img1.jpg" },
        { type: "image", src: "/projects/tera-energy/img3.jpg" },
        { type: "image", src: "/projects/tera-energy/img5.jpg" },
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
      cover: "/projects/talentmatch-ai/cover.jpg",
      overview:
        "A high-converting SaaS product for TalentMatch AI, a platform that optimizes hiring with artificial intelligence — blending high-tech aesthetics with extreme user clarity.",
      problem:
        "An AI recruitment startup needed a landing page and product UI that felt cutting-edge yet effortless to understand.",
      solution:
        "I designed and built a high-converting landing page and a clean job-management dashboard with custom visual assets and a fluid, interactive UX.",
      result:
        "A premium, high-tech product experience that communicates the AI value instantly and converts.",
      stack: ["Next.js", "AI Integration", "SaaS UI", "UI/UX Prototyping"],
      media: [
        { type: "vimeo", id: "1199156171", poster: "/projects/talentmatch-ai/demo.jpg" },
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
      cover: "/projects/wakelni/cover.jpg",
      overview:
        "A full-stack AI fitness coaching app that tracks calories, macros, hydration, steps and body metrics in real time — with a personal AI coach for smart daily guidance.",
      problem:
        "People juggling fitness goals lacked a single, smart place to track nutrition and progress with real guidance.",
      solution:
        "I built a full-stack app with a personalized daily overview, 7-day progress charts, TDEE & BMI calculation, goal pacing and an AI coach — multilingual (EN/FR/AR) on a clean dark UI.",
      result:
        "A polished, intelligent fitness companion that turns raw metrics into actionable daily guidance.",
      stack: ["Next.js", "AI Chatbot", "Full-Stack", "UI/UX Prototyping"],
      media: [
        { type: "youtube", id: "773TvTNtYtE", poster: "/projects/wakelni/demo.jpg" },
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
      cover: "/projects/recruitment-control-room/cover.jpg",
      overview:
        "A full-stack recruitment platform that centralizes candidate qualification, campaign execution and AI-generated outreach in one clean control room.",
      problem:
        "Recruiters ran sourcing, qualification and outreach across scattered tools with no single source of truth.",
      solution:
        "I built a unified dashboard with role-based access (Admin, Recruiter, Viewer), Supabase authentication, AI-assisted outreach and live pipeline analytics.",
      result:
        "One clean interface that runs the entire hiring workflow efficiently, end to end.",
      stack: ["Next.js", "Supabase", "AI Integration", "Full-Stack"],
      media: [
        { type: "youtube", id: "E6lU7RN1UJE", poster: "/projects/recruitment-control-room/demo.jpg" },
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
      cover: "/projects/sbiba-heritage/cover.jpg",
      overview:
        "An immersive web experience that brings the rich heritage of Sbiba to life — combining photogrammetry 3D models of historical monuments, an AI chatbot guide, and an interactive community.",
      problem:
        "The historical heritage of Sbiba deserved a modern, engaging way to be explored and preserved digitally.",
      solution:
        "I built an interactive WebXR experience featuring 3D-scanned monuments, an AI chatbot, and a community where visitors transform their selfies into historical versions of themselves — with seamless navigation built for the new WebXR generation.",
      result:
        "A living, interactive museum of Mediterranean heritage, accessible from any browser.",
      stack: ["WebXR", "Three.js", "AI Chatbot", "Photogrammetry"],
      media: [
        { type: "youtube", id: "HIAKOd00bEg", poster: "/projects/sbiba-heritage/demo.jpg" },
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
      cover: "/projects/city-group/cover.jpg",
      overview:
        "A sophisticated digital storefront for City Group SARL, specialists in high-quality natural cashews and premium dried fruits — built to match the superior quality of their products.",
      problem:
        "A premium nut & dried-fruit exporter had no digital presence worthy of its product quality.",
      solution:
        "I designed and developed an elegant, conversion-focused storefront with refined typography, rich product cards and a warm, premium aesthetic.",
      result:
        "A polished flagship that elevates the brand online and showcases the full product range.",
      stack: ["Web Design", "UI/UX Prototyping", "HTML/CSS", "JavaScript"],
      live: "https://snoussimohamedmokhtar.github.io/city-group/",
      media: [
        { type: "youtube", id: "bqU7jNR7fPs", poster: "/projects/city-group/demo.jpg" },
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
      cover: "/projects/mriguel-ecommerce/cover.jpg",
      overview:
        "As e-commerce marketing manager for Mriguel Store, I drove online growth through seasonal campaigns — designing high-impact graphics and short-form video ads for Ramadan, Eid and product launches.",
      problem:
        "An online retailer needed consistent, scroll-stopping creative to grow engagement and sales across seasonal moments.",
      solution:
        "I produced a steady stream of branded campaign graphics and video ads, managing a cohesive visual identity across Facebook and Instagram.",
      result:
        "A high-engagement social presence that kept the store top-of-mind through every key season.",
      stack: ["Graphic Design", "Video Ads", "Photoshop", "Social Media"],
      social: {
        facebook: "https://www.facebook.com/MriguelStore",
        instagram: "https://www.instagram.com/mriguelstoree/",
      },
      media: [
        { type: "image", src: "/projects/mriguel-ecommerce/thumb.jpg" },
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
      cover: "/projects/video-montage/cover.jpg",
      overview:
        "A reel of professional video montages produced with Adobe Premiere Pro, CapCut and AI tools — from organizing raw footage to color grading, sound design, transitions and polished delivery.",
      problem:
        "Clients needed engaging, on-brand videos with clean pacing, color and sound — delivered fast.",
      solution:
        "I edited and produced cinematic montages: structuring the narrative flow, grading color, syncing audio, and adding AI-assisted effects and transitions for a polished final cut.",
      result:
        "Clean, engaging videos delivered on time and on brief, with full attention to pacing, tone and visual quality.",
      stack: ["Premiere Pro", "CapCut", "AI VFX", "Color Grading"],
      media: [
        { type: "youtube", id: "sSIguVxr9NU", poster: "/projects/video-montage/reel.jpg" },
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
  "tera-energy": {
    tag: "Marque · Web · Marketing",
    sub: "Lancement d'une marque de boisson énergisante premium en Tunisie",
    overview:
      "J'ai piloté le lancement digital de bout en bout de Tera Energy — une nouvelle marque de boisson premium — en gérant l'identité de marque, le site vitrine et toute la campagne sociale qui a créé l'attente avant ses débuts sur le marché.",
    problem:
      "Une toute nouvelle marque de boisson devait entrer sur le marché tunisien avec une identité premium et sans audience existante.",
    solution:
      "J'ai conçu l'identité visuelle, développé un site vitrine responsive (en ligne sur teraenergy.at) et produit une bibliothèque complète d'affiches de campagne, de visuels produits et de contenus teaser sur tous les canaux.",
    result:
      "Une présence de marque cohérente et premium, et une campagne « bientôt disponible » qui a généré une réelle attente avant le lancement.",
    stack: ["Design de Marque", "Développement Web", "UI/UX", "Photoshop", "Campagne Sociale"],
  },
  "talentmatch-ai": {
    tag: "IA · SaaS",
    sub: "Une plateforme SaaS nouvelle génération pour le recrutement par IA",
    overview:
      "Un produit SaaS à forte conversion pour TalentMatch AI, une plateforme qui optimise le recrutement grâce à l'intelligence artificielle — alliant une esthétique high-tech à une clarté d'usage extrême.",
    problem:
      "Une startup de recrutement par IA avait besoin d'une landing page et d'une interface produit à la fois avant-gardistes et faciles à comprendre.",
    solution:
      "J'ai conçu et développé une landing page à forte conversion et un tableau de bord de gestion des offres épuré, avec des visuels sur mesure et une UX fluide et interactive.",
    result:
      "Une expérience produit premium et high-tech qui communique instantanément la valeur de l'IA et convertit.",
    stack: ["Next.js", "Intégration IA", "UI SaaS", "Prototypage UI/UX"],
  },
  wakelni: {
    tag: "IA · Full-Stack",
    sub: "Un coach fitness IA et une plateforme de suivi santé",
    overview:
      "Une application full-stack de coaching fitness par IA qui suit en temps réel les calories, macros, hydratation, pas et mesures corporelles — avec un coach IA personnel pour des conseils quotidiens intelligents.",
    problem:
      "Les personnes jonglant avec leurs objectifs fitness manquaient d'un espace unique et intelligent pour suivre nutrition et progression avec de vrais conseils.",
    solution:
      "J'ai développé une application full-stack avec un aperçu quotidien personnalisé, des graphiques de progression sur 7 jours, le calcul du TDEE & de l'IMC, le suivi des objectifs et un coach IA — multilingue (EN/FR/AR) sur une interface sombre épurée.",
    result:
      "Un compagnon fitness soigné et intelligent qui transforme des données brutes en conseils quotidiens concrets.",
    stack: ["Next.js", "Chatbot IA", "Full-Stack", "Prototypage UI/UX"],
  },
  "recruitment-control-room": {
    tag: "IA · Full-Stack",
    name: "Salle de Contrôle Recrutement",
    sub: "Un tableau de bord de sourcing de candidats propulsé par l'IA",
    overview:
      "Une plateforme de recrutement full-stack qui centralise la qualification des candidats, l'exécution des campagnes et la prise de contact générée par IA dans une salle de contrôle épurée.",
    problem:
      "Les recruteurs géraient le sourcing, la qualification et la prise de contact à travers des outils éparpillés, sans source unique de vérité.",
    solution:
      "J'ai construit un tableau de bord unifié avec gestion des rôles (Admin, Recruteur, Observateur), authentification Supabase, prise de contact assistée par IA et analyses de pipeline en temps réel.",
    result:
      "Une interface épurée qui pilote tout le flux de recrutement de bout en bout, efficacement.",
    stack: ["Next.js", "Supabase", "Intégration IA", "Full-Stack"],
  },
  "sbiba-heritage": {
    tag: "IA · WebXR · 3D",
    sub: "Faire revivre un patrimoine ancien grâce à l'IA & la 3D",
    overview:
      "Une expérience web immersive qui fait revivre le riche patrimoine de Sbiba — combinant des modèles 3D par photogrammétrie de monuments historiques, un guide chatbot IA et une communauté interactive.",
    problem:
      "Le patrimoine historique de Sbiba méritait une manière moderne et engageante d'être exploré et préservé numériquement.",
    solution:
      "J'ai construit une expérience WebXR interactive avec des monuments scannés en 3D, un chatbot IA et une communauté où les visiteurs transforment leurs selfies en versions historiques d'eux-mêmes — avec une navigation pensée pour la nouvelle génération WebXR.",
    result:
      "Un musée vivant et interactif du patrimoine méditerranéen, accessible depuis n'importe quel navigateur.",
    stack: ["WebXR", "Three.js", "Chatbot IA", "Photogrammétrie"],
  },
  "city-group": {
    tag: "Web · E-Commerce",
    sub: "Une vitrine de luxe pour des noix et exports premium",
    overview:
      "Une vitrine digitale sophistiquée pour City Group SARL, spécialiste des noix de cajou naturelles de haute qualité et des fruits secs premium — conçue pour égaler la qualité supérieure de leurs produits.",
    problem:
      "Un exportateur premium de noix et fruits secs n'avait aucune présence digitale à la hauteur de la qualité de ses produits.",
    solution:
      "J'ai conçu et développé une vitrine élégante et orientée conversion, avec une typographie raffinée, de riches fiches produits et une esthétique chaleureuse et premium.",
    result:
      "Une vitrine soignée qui valorise la marque en ligne et met en avant toute la gamme de produits.",
    stack: ["Design Web", "Prototypage UI/UX", "HTML/CSS", "JavaScript"],
  },
  "mriguel-ecommerce": {
    tag: "Marketing · E-Commerce",
    sub: "Marketing e-commerce & campagnes saisonnières",
    overview:
      "En tant que responsable marketing e-commerce de Mriguel Store, j'ai stimulé la croissance en ligne grâce à des campagnes saisonnières — création de visuels percutants et de publicités vidéo courtes pour le Ramadan, l'Aïd et les lancements de produits.",
    problem:
      "Un détaillant en ligne avait besoin de créations cohérentes et accrocheuses pour augmenter l'engagement et les ventes lors des temps forts saisonniers.",
    solution:
      "J'ai produit un flux constant de visuels de campagne et de publicités vidéo de marque, en gérant une identité visuelle cohérente sur Facebook et Instagram.",
    result:
      "Une présence sociale à fort engagement qui a maintenu la boutique en tête des esprits à chaque saison clé.",
    stack: ["Design Graphique", "Publicités Vidéo", "Photoshop", "Réseaux Sociaux"],
  },
  "video-montage": {
    tag: "Vidéo · Motion",
    name: "Montage Vidéo",
    sub: "Montage cinématique — Premiere Pro, CapCut & IA",
    overview:
      "Une bobine de montages vidéo professionnels réalisés avec Adobe Premiere Pro, CapCut et des outils d'IA — de l'organisation des rushes au color grading, en passant par le sound design, les transitions et une livraison soignée.",
    problem:
      "Les clients avaient besoin de vidéos engageantes et fidèles à leur marque, au rythme maîtrisé, livrées rapidement.",
    solution:
      "J'ai monté et produit des montages cinématiques : structuration du récit, étalonnage des couleurs, synchronisation audio, et ajout d'effets et transitions assistés par IA pour un rendu final soigné.",
    result:
      "Des vidéos propres et engageantes, livrées dans les délais et conformes au brief, avec une attention totale au rythme, au ton et à la qualité visuelle.",
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

/* ---- UI string dictionaries (hard-coded labels in the components) ---- */
const uiEN = {
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
  lang: { label: "Language", english: "English", french: "Français" },
};

const uiFR = {
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
  lang: { label: "Langue", english: "English", french: "Français" },
};

/* ---- The locale registry consumed by the LanguageProvider ---- */
export const locales = {
  en: { site, sections, ui: uiEN },
  fr: { site: siteFR, sections: sectionsFR, ui: uiFR },
};
