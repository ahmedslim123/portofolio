"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Contact() {
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

  // Last-resort fallback: open the visitor's mail client pre-filled.
  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "a traveler"}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim())
      return "Please fill in every field.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "That email address looks off.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const v = validate();
    if (v) {
      setError(v);
      setStatus("error");
      return;
    }
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Not configured yet (no API key) → fall back to the user's mail client.
      if (res.status === 503) {
        mailtoFallback();
        setStatus("idle");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Send failed");
      }

      // Success — celebrate.
      const r = btnRef.current.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", msg: "", company: "" });
      }, 3200);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again, or email me directly.");
      setStatus("error");
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
      ? "Sending…"
      : status === "sent"
      ? "Message Sent ◈"
      : "Send Message ◈";

  return (
    <section id="contact" className="section" data-name="Contact">
      <div className="wrap">
        <Reveal className="eyebrow" style={{ justifyContent: "center" }}>
          Open Channel
        </Reveal>
        <Reveal className="h-title" as="h2" style={{ textAlign: "center" }}>
          Let&apos;s Build Something
        </Reveal>
        <Reveal className="contact-card">
          <div className="ringfx" />
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="cName">Your Name</label>
              <input
                id="cName"
                type="text"
                placeholder="Traveler's name"
                value={form.name}
                onChange={set("name")}
                disabled={status === "sending"}
              />
            </div>
            <div className="field">
              <label htmlFor="cEmail">Email</label>
              <input
                id="cEmail"
                type="email"
                placeholder="you@realm.com"
                value={form.email}
                onChange={set("email")}
                disabled={status === "sending"}
              />
            </div>
            <div className="field">
              <label htmlFor="cMsg">Message</label>
              <textarea
                id="cMsg"
                rows={4}
                placeholder="Speak, and the door shall open…"
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
              {status === "sent" && "Thank you — your message is on its way. I'll reply soon."}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
