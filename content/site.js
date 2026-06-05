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
    "My work spans <hl>full-stack web &amp; mobile development</hl>, <hl>AI &amp; data science</hl>, and the brand design that makes products feel alive. From LLaMA-powered RAG systems to text-to-video pipelines and responsive showcase sites, I love building things end to end.",
    "When I'm not shipping code, I lead <hl>marketing &amp; content</hl> for growing brands — designing posters, editing video, and growing communities from the ground up.",
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
      media: [
        { type: "image", src: "/projects/tera-energy/img1.jpg" },
        { type: "image", src: "/projects/tera-energy/img2.jpg" },
        { type: "image", src: "/projects/tera-energy/img3.jpg" },
        { type: "image", src: "/projects/tera-energy/img4.jpg" },
        { type: "image", src: "/projects/tera-energy/img5.jpg" },
        { type: "image", src: "/projects/tera-energy/img6.jpg" },
        { type: "image", src: "/projects/tera-energy/img7.jpg" },
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
        { type: "video", src: "/projects/talentmatch-ai/demo.mp4", poster: "/projects/talentmatch-ai/demo.jpg" },
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
        { type: "video", src: "/projects/wakelni/demo.mp4", poster: "/projects/wakelni/demo.jpg" },
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
        { type: "video", src: "/projects/recruitment-control-room/demo.mp4", poster: "/projects/recruitment-control-room/demo.jpg" },
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
        { type: "video", src: "/projects/sbiba-heritage/demo.mp4", poster: "/projects/sbiba-heritage/demo.jpg" },
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
        { type: "video", src: "/projects/city-group/demo.mp4", poster: "/projects/city-group/demo.jpg" },
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
      media: [
        { type: "video", src: "/projects/mriguel-ecommerce/ad1.mp4", poster: "/projects/mriguel-ecommerce/ad1.jpg" },
        { type: "image", src: "/projects/mriguel-ecommerce/img1.jpg" },
        { type: "image", src: "/projects/mriguel-ecommerce/img2.jpg" },
        { type: "image", src: "/projects/mriguel-ecommerce/img3.jpg" },
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
        { type: "video", src: "/projects/video-montage/reel.mp4", poster: "/projects/video-montage/reel.jpg" },
        { type: "video", src: "/projects/video-montage/mojito.mp4", poster: "/projects/video-montage/mojito.jpg" },
        { type: "video", src: "/projects/video-montage/sou9.mp4", poster: "/projects/video-montage/sou9.jpg" },
      ],
    },
    {
      slug: "social-media-design",
      tag: "Graphic Design",
      name: "Social Media Design",
      accent: "#FF7A1A",
      bg: "linear-gradient(160deg,#2a1707,#0e0703)",
      glow: "rgba(255,122,26,.30)",
      sub: "High-impact ads for food, beverage & products",
      cover: "/projects/social-media-design/cover.jpg",
      overview:
        "A series of high-impact social media visuals for brands across industries — a tech retailer, a fast-food spot, a smoothie bar and more — each crafted to match brand identity and stop the scroll.",
      problem:
        "Multiple brands needed feed-stopping creative that matched their identity and drove action.",
      solution:
        "I designed promotional visuals combining strong typography, product photography composition, color psychology and clear messaging — production-ready for Instagram and Facebook.",
      result:
        "On-brand, attention-grabbing ad creative that drives clicks and conversions across feeds.",
      stack: ["Photoshop", "Brand Identity", "Typography", "Social Media"],
      media: [
        { type: "image", src: "/projects/social-media-design/img1.jpg" },
        { type: "image", src: "/projects/social-media-design/img2.jpg" },
        { type: "image", src: "/projects/social-media-design/img3.jpg" },
        { type: "image", src: "/projects/social-media-design/img4.jpg" },
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
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-s-307897226" },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~012340f5cbd8f352dc" },
    { label: "Email", href: "mailto:slim.ahmed@esprit.tn" },
    { label: "Phone", href: "tel:+21694687669" },
  ],
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
