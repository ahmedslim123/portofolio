# Going live on ahmedslim.com

Everything in this file is a step **you** have to take — an account to open, a
DNS record to type, a token to paste. Everything that could be done in the code
has been done and is listed at the bottom so you know what is already handled.

The build itself needs nothing special:

```bash
cd chamber
npm ci
npm run build          # writes out/ — a complete static site
```

`out/` is the whole website. No Node server, no database, no environment
variable is required for it to work.

---

## 1. Buy the domain

`ahmedslim.com`, at **Cloudflare Registrar** if you can (it sells at cost and
never raises the renewal price) or **Namecheap**. Check the *renewal* price, not
the first year.

Immediately after purchase, in the registrar's dashboard:

- **WHOIS privacy** → on (free everywhere now; without it your home address and
  phone number are in a public database)
- **Auto-renew** → on
- **Registrar lock / transfer lock** → on

Before you pay, spend two minutes on the domain's past — a name that used to
host spam carries the penalty with it:

- <https://web.archive.org/web/*/ahmedslim.com> — what was there before
- Google `site:ahmedslim.com` — anything still indexed from an old owner
- <https://mxtoolbox.com/blacklists.aspx> — blacklisted?

## 2. Pick a host and point the domain at it

The site is static, so any of these works and all three are free at this size.
Each one already has its header configuration committed:

| Host | Config file already in the repo | Notes |
|---|---|---|
| **Vercel** | `vercel.json` | Simplest. Connect the GitHub repo, framework = Next.js, done. |
| **Cloudflare Pages** / **Netlify** | `public/_headers` | Build command `npm run build`, output directory `out`. |
| **InfinityFree** / any Apache host | `public/.htaccess` | Upload the contents of `out/` into `htdocs/`. |

Then in the host's dashboard add `ahmedslim.com` **and** `www.ahmedslim.com` as
custom domains, and set one of them to redirect to the other — pick
`ahmedslim.com` as the real one. Two live copies of the same site is the
duplicate-content problem the SEO checklist warns about.

DNS records at the registrar (the host will tell you the exact values):

```
A     @      <host IP>            or  CNAME @ → <host>.
CNAME www    ahmedslim.com.
```

Wait for <https://dnschecker.org> to show the same answer worldwide before you
announce anything.

## 3. Turn on HTTPS

Every host above issues a free Let's Encrypt certificate automatically once DNS
resolves — you usually only have to wait a few minutes. Confirm two things:

- <https://ahmedslim.com> loads with a padlock and no "mixed content" warning
- <http://ahmedslim.com> (no s) **redirects** to https

Then check the headers landed: <https://securityheaders.com> should grade **A**.
If it grades lower, the host is not reading the config file for its platform —
see the table above.

## 4. Email on the domain (optional, but do it before printing a card)

If you want `hello@ahmedslim.com`, set it up at a mail provider (Zoho Mail has a
free tier, Google Workspace is paid) and add **MX**, **SPF**, **DKIM** and
**DMARC** records at the registrar.

Two traps:

- Changing nameservers **replaces the whole DNS zone**. Screenshot every record
  first, and re-create the MX records afterwards or your mail dies silently.
- There must be exactly **one** SPF record. Two breaks authentication for both.

Start DMARC at `v=DMARC1; p=none; rua=mailto:you@ahmedslim.com`, watch it for a
few weeks, then tighten. Test the result at <https://mail-tester.com> — aim 10/10.

## 5. Register the site with search engines

1. **Google Search Console** → add the property, verify by DNS TXT record.
   - You can also verify with the meta tag: put the token in the environment as
     `NEXT_PUBLIC_GOOGLE_VERIFICATION=…` and rebuild; the tag is emitted for you.
   - Then submit `https://ahmedslim.com/sitemap.xml`.
   - Come back after 48–72h and read the Coverage report.
2. **Bing Webmaster Tools** → it can import everything from Search Console.
3. Check indexing a week later with `site:ahmedslim.com`.

## 6. Check the link preview before you send the link to anyone

Paste `https://ahmedslim.com` into each and force a re-scrape:

- <https://developers.facebook.com/tools/debug/> — also covers Instagram
- <https://www.linkedin.com/post-inspector/>
- WhatsApp: just send yourself the link in a chat

They all cache. If you change `og.jpg` later, re-scrape here or people keep
seeing the old card for weeks.

## 7. Analytics (optional)

If you want to know who visits, use **Plausible** or **Umami**, not Google
Analytics: they set no cookies, which is why this site currently needs no cookie
banner at all. Adding GA4 or a Meta Pixel means adding a real consent banner
that blocks the script until the visitor agrees — a legal requirement in the EU,
not a nicety. Whichever you choose, add its domain to `connect-src` in the CSP
(three files: `vercel.json`, `public/_headers`, `public/.htaccess`).

## 8. Watch it

- **UptimeRobot** (free) — pings the site every 5 minutes, emails you if it dies.
- **Sentry** (free tier) — only worth it if you add server-side code later.

---

## Already done in the code

You do not need to touch any of this.

- **Icons** — `favicon.ico` (16/32/48), `icon.svg`, `apple-icon.png` (180),
  `icon-192/512/maskable.png`, and a web manifest, all generated from one source
  by `node scripts/make-icons.cjs`.
- **Share card** — `public/og.jpg`, 1200×630, 69 kB, regenerated by
  `node scripts/make-og.cjs`. Open Graph and Twitter Card tags point at it.
- **Title and description** — set in `lib/seo.js`, the one file to edit if the
  wording changes.
- **Structured data** — `Person`, `WebSite` and `ProfessionalService` JSON-LD in
  the static HTML, so scrapers that don't run JavaScript still see it.
- **robots.txt** and **sitemap.xml** — generated at build, allow everything.
- **Canonical URL** on every page.
- **Custom 404** at `/404.html`, marked `noindex`.
- **Privacy notice** at `/privacy/`, linked from the footer.
- **Security headers** — HSTS, CSP, nosniff, frame-deny, referrer and
  permissions policy, in all three host formats.
- **HTTPS redirect** and **no directory listing** (Apache).
- **Self-hosted fonts** — nothing is fetched from Google at build or at runtime.
- **Keyboard focus rings**, `prefers-reduced-motion`, 44px tap targets.

### If you deploy somewhere other than the root of ahmedslim.com

Two environment variables, both build-time:

```bash
# a sub-path deploy, e.g. https://ahmedslim123.github.io/portofolio
NEXT_PUBLIC_BASE_PATH=/portofolio
# whatever origin the site actually answers on, for canonical / og / sitemap
NEXT_PUBLIC_SITE_URL=https://ahmedslim123.github.io/portofolio
```

Leave both unset for `https://ahmedslim.com`.
