import { Resend } from "resend";

/**
 * POST /api/contact — delivers a portfolio contact message to the owner's inbox
 * via Resend. Configure with two env vars in `.env.local`:
 *
 *   RESEND_API_KEY = re_xxxxxxxx        (from https://resend.com/api-keys)
 *   CONTACT_TO     = ahmedslim007@gmail.com   (optional — defaults below)
 *
 * The "from" address uses Resend's shared onboarding sender so it works on the
 * free tier with no domain setup; the visitor's address is set as Reply-To so
 * a single tap in your inbox replies straight to them.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO || "ahmedslim007@gmail.com";
const FROM = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

// Best-effort in-memory throttle (per warm server instance): 5 msgs / 10 min / IP.
const hits = new Map();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
}

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clean = (s) => String(s || "").trim();
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field.
  if (clean(body.company)) return Response.json({ ok: true });

  const name = clean(body.name).slice(0, 120);
  const email = clean(body.email).slice(0, 200);
  const msg = clean(body.msg).slice(0, 5000);

  if (!name || !email || !msg) {
    return Response.json({ ok: false, error: "Please fill in every field." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return Response.json({ ok: false, error: "That email address looks off." }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "A few too many messages — please try again later." },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    // Not configured yet — tell the client so it can fall back to a mailto link.
    return Response.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMsg = escapeHtml(msg).replace(/\n/g, "<br/>");

  const html = `
  <div style="margin:0;padding:32px 0;background:#070a1e;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#0e1230;border:1px solid rgba(229,193,111,.25);border-radius:16px;overflow:hidden;">
      <div style="padding:28px 32px;background:linear-gradient(135deg,#141a3d,#0a0d24);border-bottom:1px solid rgba(229,193,111,.18);">
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#00f7ff;">New message · Chamber of Curiosities</div>
        <div style="font-size:22px;color:#e5c16f;margin-top:8px;font-weight:bold;">${safeName} reached out</div>
      </div>
      <div style="padding:28px 32px;color:#d9dcec;font-size:15px;line-height:1.65;">
        <p style="margin:0 0 18px;white-space:pre-wrap;">${safeMsg}</p>
        <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);font-size:13px;color:#8a8fb0;">
          From <strong style="color:#d9dcec;">${safeName}</strong><br/>
          <a href="mailto:${safeEmail}" style="color:#00f7ff;text-decoration:none;">${safeEmail}</a>
        </div>
      </div>
    </div>
  </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio · ${name}`,
      html,
      text: `${msg}\n\n— ${name} (${email})`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false, error: "Mail service rejected the message." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ ok: false, error: "Something went wrong sending your message." }, { status: 500 });
  }
}
