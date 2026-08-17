import Link from "next/link";
import { PERSON, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Privacy",
  description:
    "What this site stores, what the contact form does with your message, and how to have it deleted.",
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
};

/**
 * Privacy notice.
 *
 * Not decoration: the contact form collects a name, an email address and a
 * message from anyone in the world, including the EU, and hands them to a
 * third-party processor. Under GDPR Art. 13 that has to be disclosed at the
 * point of collection, in plain language, with a route to erasure.
 *
 * Written in English only — the site's default language — because a legal text
 * that has drifted between three translations is worse than one that has not.
 * The contact address at the bottom answers in French and Arabic too.
 *
 * LAST REVIEWED: 2026-08-17. Revisit if the form provider, the host, or the
 * analytics situation changes.
 */
const UPDATED = "17 August 2026";

export default function Privacy() {
  return (
    <main className="doc">
      <div className="doc-inner">
        <Link className="doc-back" href="/">
          ← Back to the portfolio
        </Link>

        <h1>Privacy Notice</h1>
        <p className="doc-meta">Last updated {UPDATED}</p>

        <p className="doc-lede">
          This is a personal portfolio. It has no accounts, no shopping cart, no advertising
          and no third-party analytics. The only moment it collects anything about you is
          when you choose to send a message.
        </p>

        <h2>Who is responsible</h2>
        <p>
          {PERSON.name}, an independent developer based in {PERSON.city}, {PERSON.countryName}.
          For anything in this notice, write to{" "}
          <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
        </p>

        <h2>The contact form</h2>
        <p>
          If you use the contact form, you send three things: your <strong>name</strong>,
          your <strong>email address</strong> and your <strong>message</strong>. They are
          used for one purpose — to read your message and reply to it. Nothing is added to a
          mailing list and nothing is sold or shared for marketing.
        </p>
        <p>
          Because the site is a static export with no server of its own, the submission is
          delivered by <strong>Formspree</strong> (Formspree, Inc.), which forwards it to my
          inbox. In doing so Formspree processes the content of your message and your IP
          address, and is subject to its own{" "}
          <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          . If Formspree cannot be reached, the site falls back to opening your own email
          client instead — in that case nothing passes through a third party at all.
        </p>
        <p>
          The legal basis is your consent, given by pressing send (GDPR Art. 6(1)(a)).
          Messages are kept in my inbox for as long as the conversation is useful, and no
          longer than <strong>24 months</strong>.
        </p>

        <h2>What is stored in your browser</h2>
        <p>
          <strong>No cookies are set — none at all.</strong> Two small preferences are kept
          in your browser&apos;s local storage so the site behaves the way you left it:
        </p>
        <ul>
          <li>
            <code>lang</code> — the language you chose (English, French or Arabic).
          </li>
          <li>
            <code>chamber:sound</code> — whether you muted the ambient sound.
          </li>
        </ul>
        <p>
          Both stay on your device, are never sent anywhere, and disappear when you clear
          your browser data. Because they are strictly necessary to honour a choice you
          made yourself, no consent banner is required for them.
        </p>

        <h2>Hosting and server logs</h2>
        <p>
          The site is served as static files by a hosting provider, which — like every web
          server — records requests, including IP addresses, for security and to keep the
          service running. Those logs belong to the host and I do not analyse them or build
          profiles from them.
        </p>

        <h2>Embedded media</h2>
        <p>
          Some project pages embed video hosted elsewhere (for example YouTube). A player is
          only loaded once you click it, so nothing is requested from the video host until
          you decide to watch. Once you do, that host may set its own cookies under its own
          policy.
        </p>

        <h2>Your rights</h2>
        <p>
          If you are in the EU or the UK you may ask for access to, correction of, or
          deletion of anything you sent me, and you may object to its processing or ask for
          it in a portable form. One email to{" "}
          <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> is enough — no form to fill
          in — and I will answer within 30 days. You also have the right to complain to your
          national data protection authority.
        </p>

        <h2>Changes</h2>
        <p>
          If this notice changes, the date at the top changes with it. The current version
          always lives at <code>{SITE_URL}/privacy/</code>.
        </p>

        <Link className="doc-back doc-back-end" href="/">
          ← Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
