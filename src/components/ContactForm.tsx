"use client";

import { FormEvent, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = { type: "idle" | "success" | "error"; message: string };

export default function ContactForm() {
  const searchParams = useSearchParams();
  const proposalServices = searchParams.get("services");
  const proposalBudget = searchParams.get("budget");
  const isProposal = !!proposalServices;

  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  // Form states for preserving input during edits
  const [formDataState, setFormDataState] = useState({
    name: "",
    email: "",
    company: "",
    timeline: "",
    message: ""
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("contactFormData");
    if (saved) {
      try {
        setFormDataState(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newState = { ...formDataState, [name]: value };
    setFormDataState(newState);
    sessionStorage.setItem("contactFormData", JSON.stringify(newState));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });
    setFieldErrors({});
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json()) as { message?: string; errors?: Record<string, string[]> };
      if (!response.ok) {
        if (result.errors) setFieldErrors(result.errors);
        const firstError = result.errors ? Object.values(result.errors)[0]?.[0] : null;
        throw new Error(firstError || result.message || "We could not send your inquiry.");
      }
      form.reset();
      setFormDataState({ name: "", email: "", company: "", timeline: "", message: "" });
      sessionStorage.removeItem("contactFormData");
      setStatus({ type: "success", message: result.message || "Thanks. Your project inquiry has been sent." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Something went wrong. Please email hello@devtork.com." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate id="contact-form">
      <div className="field-row">
        <div className={`field ${fieldErrors.name ? "has-error" : ""}`}><label htmlFor="name">Your name *</label><input id="name" name="name" required maxLength={80} placeholder="Your full name" value={formDataState.name} onChange={handleChange} />{fieldErrors.name && <div className="error-text">{fieldErrors.name[0]}</div>}</div>
        <div className={`field ${fieldErrors.email ? "has-error" : ""}`}><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" required maxLength={160} placeholder="you@company.com" value={formDataState.email} onChange={handleChange} />{fieldErrors.email && <div className="error-text">{fieldErrors.email[0]}</div>}</div>
      </div>
      <div className={`field ${fieldErrors.company ? "has-error" : ""}`}><label htmlFor="company">Company or organisation</label><input id="company" name="company" maxLength={120} placeholder="Company name" value={formDataState.company} onChange={handleChange} />{fieldErrors.company && <div className="error-text">{fieldErrors.company[0]}</div>}</div>
      
      {isProposal ? (
        <div className="proposal-summary-block">
          <div className="proposal-summary-content">
            <strong>Your Proposal Request</strong>
            <p><strong>Services:</strong> {proposalServices}</p>
            <p><strong>Budget:</strong> {proposalBudget || "Not specified"}</p>
          </div>
          <Link href={`/pricing?services=${encodeURIComponent(proposalServices || "")}&budget=${encodeURIComponent(proposalBudget || "")}`} className="btn btn-ghost btn-small edit-proposal-btn">
            Edit Selection
          </Link>
          <input type="hidden" name="service" value={proposalServices || ""} />
          <input type="hidden" name="budget" value={proposalBudget || ""} />
        </div>
      ) : (
        <div className="field-row">
          <div className={`field ${fieldErrors.service ? "has-error" : ""}`}><label htmlFor="service">What do you need? *</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Choose a service</option><option>UI/UX design</option><option>Web development</option><option>Mobile app</option><option>AI automation</option><option>Graphic design</option><option>SEO & growth</option><option>Full digital project</option><option>Not sure yet</option></select>{fieldErrors.service && <div className="error-text">{fieldErrors.service[0]}</div>}</div>
          <div className={`field ${fieldErrors.budget ? "has-error" : ""}`}><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget" defaultValue=""><option value="">Choose a range</option><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,000</option><option>$2,000–$5,000</option><option>$5,000–$10,000</option><option>$10,000+</option><option>Need help defining it</option></select>{fieldErrors.budget && <div className="error-text">{fieldErrors.budget[0]}</div>}</div>
        </div>
      )}

      <div className={`field ${fieldErrors.timeline ? "has-error" : ""}`}><label htmlFor="timeline">Preferred timeline</label><select id="timeline" name="timeline" value={formDataState.timeline} onChange={handleChange}><option value="">Choose a timeline</option><option>As soon as possible</option><option>1–2 months</option><option>3–4 months</option><option>5+ months</option><option>Still exploring</option></select>{fieldErrors.timeline && <div className="error-text">{fieldErrors.timeline[0]}</div>}</div>
      <div className={`field ${fieldErrors.message ? "has-error" : ""}`}><label htmlFor="message">Tell us about the project *</label><textarea id="message" name="message" required minLength={20} maxLength={3000} placeholder="What are you trying to achieve? Who is it for? What is not working today?" value={formDataState.message} onChange={handleChange} />{fieldErrors.message && <div className="error-text">{fieldErrors.message[0]}</div>}</div>
      {status.type !== "idle" && <div className={`form-status is-visible ${status.type === "error" ? "is-error" : ""}`} role="status">{status.message}</div>}
      <div><button className="btn" data-magnetic type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send project inquiry \u2197\uFE0E"}</button></div>
      <p className="form-note">We usually reply within two working days. Your information is used only to respond to this inquiry.</p>
    </form>
  );
}
