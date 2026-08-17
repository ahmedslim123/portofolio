/* ============================================================================
   Single source of truth for everything that identifies the site to the outside
   world: the public URL, the words in a Google result, the words in a WhatsApp
   preview. Metadata, JSON-LD, the sitemap and robots.txt all read from here, so
   there is exactly one place to change when the domain changes.
   ============================================================================ */

/**
 * The public origin the site is served from.
 *
 * Every absolute URL a crawler or a chat client sees is built from this — the
 * canonical link, the og:image, the sitemap, the JSON-LD @id. Getting it wrong
 * does not break the site, it breaks the link preview and the search result,
 * silently.
 *
 * Override at build time for a preview deploy:
 *     NEXT_PUBLIC_SITE_URL=https://ahmedslim123.github.io/portofolio npm run build
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ahmedslim.com").replace(
  /\/+$/,
  ""
);

export const PERSON = {
  name: "Ahmed Slim",
  jobTitle: "Software Engineer & Creative Developer",
  email: "ahmedslim007@gmail.com",
  phone: "+21694687669",
  city: "Sousse",
  region: "Sousse Governorate",
  country: "TN",
  countryName: "Tunisia",
  alumniOf: "ESPRIT — École Supérieure Privée d'Ingénierie et de Technologies",
  profiles: [
    "https://www.linkedin.com/in/ahmed-s-307897226",
    "https://www.upwork.com/freelancers/~012340f5cbd8f352dc",
    "https://github.com/ahmedslim123",
  ],
};

// The browser tab, and the blue line in a Google result. Front-loaded with the
// name because that is what people search for, then the role for everyone who
// has never heard it.
export const SITE_TITLE = "Ahmed Slim Portfolio — Software Engineer & Creative Developer";

// Shorter and warmer: this is the bold line in a WhatsApp / LinkedIn card,
// where the long SEO title would wrap to three lines and get truncated.
export const SHARE_TITLE = "Ahmed Slim — Portfolio";

// 150 characters. Google cuts around 160; WhatsApp shows roughly the first two
// lines. Says what he does, where, and gives a reason to click.
export const SITE_DESC =
  "Software engineer & creative developer in Sousse, Tunisia. Web and mobile apps, AI features and brand design — 12 shipped projects you can walk through.";

export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Ahmed Slim — Software Engineer & Creative Developer, Sousse, Tunisia",
  type: "image/jpeg",
};

export const THEME_COLOR = "#070A1E";

/**
 * Structured data, as one @graph so the three entities can reference each
 * other by @id instead of being repeated. Google reads this to decide whether
 * to show a knowledge panel for the name and to link the social profiles to it.
 */
export const jsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      url: SITE_URL,
      image: `${SITE_URL}/ahmed.webp`,
      jobTitle: PERSON.jobTitle,
      description: SITE_DESC,
      email: `mailto:${PERSON.email}`,
      telephone: PERSON.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.city,
        addressRegion: PERSON.region,
        addressCountry: PERSON.country,
      },
      alumniOf: { "@type": "CollegeOrUniversity", name: PERSON.alumniOf },
      knowsLanguage: ["en", "fr", "ar"],
      knowsAbout: [
        "Web Development",
        "Next.js",
        "React",
        "Three.js",
        "Mobile Development",
        "Artificial Intelligence",
        "UI/UX Design",
        "Graphic Design",
      ],
      sameAs: PERSON.profiles,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SHARE_TITLE,
      description: SITE_DESC,
      inLanguage: ["en", "fr", "ar"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Ahmed Slim — Web, Mobile & AI Development",
      url: SITE_URL,
      image: `${SITE_URL}/og.jpg`,
      description:
        "Freelance development and design studio of one: showcase websites, mobile and desktop applications, AI features, and the brand design around them.",
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "Country", name: "Tunisia" },
        { "@type": "Country", name: "France" },
        "Worldwide",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.city,
        addressCountry: PERSON.country,
      },
      email: `mailto:${PERSON.email}`,
      telephone: PERSON.phone,
      priceRange: "$$",
      sameAs: PERSON.profiles,
    },
  ],
});
