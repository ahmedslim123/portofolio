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

  // The site is a fully static export (no server), so submitting opens the
  // visitor's mail client pre-filled to me — works on any static host.
  const openMail = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || ui.contact.traveler}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim())
      return ui.contact.fillAll;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return ui.contact.badEmail;
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const v = validate();
    if (v) {
      setError(v);
      setStatus("error");
      return;
    }
    setError("");

    openMail();

    // Celebrate — the mail client opens with the message ready to send.
    const r = btnRef.current.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", msg: "", company: "" });
    }, 3200);
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
