"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

export default function Contact() {
  const { site, ui } = useI18n();
  const btnRef = useRef(null);
  // status: "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", msg: "", company: "" });

  const burst = (cx, cy) => {
    const colors = ["#00F7FF", "#E5C16F", "#1E9FFF"];
    for (let i = 0; i < 32; i++) {
      const p = document.createElement("div");
      p.className = "burst";
      document.body.appendChild(p);
      const ang = Math.random() * Math.PI * 2;
      const dist = 70 + Math.random() * 140;
      gsap.set(p, { left: cx, top: cy, background: colors[i % 3] });
      gsap.to(p, {
        left: cx + Math.cos(ang) * dist,
        top: cy + Math.sin(ang) * dist,
        opacity: 0,
        scale: 0,
        duration: 0.9 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }
  };

  // Has a real Web3Forms key been configured (not the placeholder)? If so we
  // POST the message straight to the inbox; otherwise we fall back to mailto so
  // the form never silently fails on a fresh deploy.
  const web3Key = site.web3formsKey;
  const hasW3F = !!web3Key && !/^PASTE-/.test(web3Key);

  // Static export (no server) — when no form service is configured we open the
  // visitor's mail client pre-filled to me. Works on any static host.
  const openMail = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || ui.contact.traveler}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  // POST to Web3Forms — emails the submission straight to my inbox, no server
  // needed. Returns true on success, else throws with the server's reason
  // (bots never reach here — they're short-circuited in onSubmit).
  const sendViaWeb3Forms = async () => {
    const res = await fetch("https://api.web3forms.com/post", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
        name: form.name,
        email: form.email,
        message: form.msg,
        subject: `Portfolio message from ${form.name}`,
        from_name: "slimportofolio contact form",
        replyto: form.email,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success)
      throw new Error(data.message || `HTTP ${res.status}`);
    return true;
  };

  const celebrate = () => {
    const r = btnRef.current.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", msg: "", company: "" });
    }, 3200);
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim())
      return ui.contact.fillAll;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return ui.contact.badEmail;
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const v = validate();
    if (v) {
      setError(v);
      setStatus("error");
      return;
    }
    setError("");

    // Silently drop bots that filled the hidden honeypot — pretend success.
    if (form.company) {
      celebrate();
      return;
    }

    // No form service configured → open the mail client and celebrate.
    if (!hasW3F) {
      openMail();
      celebrate();
      return;
    }

    setStatus("sending");
    try {
      await sendViaWeb3Forms();
      celebrate();
    } catch (err) {
      // The form service was unreachable — domain restriction on the Web3Forms
      // key, an ad-/tracker-blocker, or the visitor being offline. Surface the
      // real reason in the console for debugging, then never lose the message:
      // fall back to the visitor's mail client and still celebrate.
      console.error("Contact form (Web3Forms) failed:", err?.message || err);
      openMail();
      celebrate();
    }
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const label =
    status === "sending"
      ? ui.contact.sending
      : status === "sent"
      ? ui.contact.sent
      : ui.contact.send;

  return (
    <section id="contact" className="section" data-name="Contact">
      <div className="wrap">
        <Reveal className="eyebrow" style={{ justifyContent: "center" }}>
          {ui.contact.eyebrow}
        </Reveal>
        <Reveal className="h-title" as="h2" style={{ textAlign: "center" }}>
          {ui.contact.title}
        </Reveal>
        <Reveal className="contact-card">
          <div className="ringfx" />
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="cName">{ui.contact.name}</label>
              <input
                id="cName"
                type="text"
                placeholder={ui.contact.namePh}
                value={form.name}
                onChange={set("name")}
                disabled={status === "sending"}
              />
            </div>
            <div className="field">
              <label htmlFor="cEmail">{ui.contact.email}</label>
              <input
                id="cEmail"
                type="email"
                placeholder={ui.contact.emailPh}
                value={form.email}
                onChange={set("email")}
                disabled={status === "sending"}
              />
            </div>
            <div className="field">
              <label htmlFor="cMsg">{ui.contact.message}</label>
              <textarea
                id="cMsg"
                rows={4}
                placeholder={ui.contact.messagePh}
                value={form.msg}
                onChange={set("msg")}
                disabled={status === "sending"}
              />
            </div>

            {/* Honeypot — hidden from humans, catches bots. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={set("company")}
              />
            </div>

            <button
              ref={btnRef}
              type="submit"
              className={`btn primary send-btn${status === "sending" ? " is-sending" : ""}`}
              disabled={status === "sending"}
            >
              {label}
            </button>

            <div className={`form-status${status === "error" ? " err" : status === "sent" ? " ok" : ""}`} role="status">
              {status === "error" && error}
              {status === "sent" && ui.contact.statusSent}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
