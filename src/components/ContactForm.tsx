"use client";

import { FormEvent, useState } from "react";

type Status = { type: "idle" | "success" | "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json()) as { message?: string; errors?: Record<string, string[]> };
      if (!response.ok) throw new Error(result.message || "We could not send your inquiry.");
      form.reset();
      setStatus({ type: "success", message: result.message || "Thanks. Your project inquiry has been sent." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Something went wrong. Please email hello@devtork.studio." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
      <div className="field-row">
        <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required maxLength={80} placeholder="Your full name" /></div>
        <div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" required maxLength={160} placeholder="you@company.com" /></div>
      </div>
      <div className="field"><label htmlFor="company">Company or organisation</label><input id="company" name="company" maxLength={120} placeholder="Company name" /></div>
      <div className="field-row">
        <div className="field"><label htmlFor="service">What do you need? *</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Choose a service</option><option>Website design</option><option>Web development</option><option>Mobile app</option><option>Brand identity</option><option>SEO & growth</option><option>Full digital project</option><option>Not sure yet</option></select></div>
        <div className="field"><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget" defaultValue=""><option value="">Choose a range</option><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,000</option><option>$2,000–$5,000</option><option>$5,000–$10,000</option><option>$10,000+</option><option>Need help defining it</option></select></div>
      </div>
      <div className="field"><label htmlFor="timeline">Preferred timeline</label><select id="timeline" name="timeline" defaultValue=""><option value="">Choose a timeline</option><option>As soon as possible</option><option>1–2 months</option><option>3–4 months</option><option>5+ months</option><option>Still exploring</option></select></div>
      <div className="field"><label htmlFor="message">Tell us about the project *</label><textarea id="message" name="message" required minLength={20} maxLength={3000} placeholder="What are you trying to achieve? Who is it for? What is not working today?" /></div>
      {status.type !== "idle" && <div className={`form-status is-visible ${status.type === "error" ? "is-error" : ""}`} role="status">{status.message}</div>}
      <div><button className="btn" data-magnetic type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send project inquiry ↗"}</button></div>
      <p className="form-note">We usually reply within two working days. Your information is used only to respond to this inquiry.</p>
    </form>
  );
}
