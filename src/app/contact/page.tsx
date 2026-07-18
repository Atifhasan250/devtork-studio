import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = { title: "Contact", description: "Tell DevTork Studio about your website, app, brand, or digital growth project." };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero-animated"><div className="container parallax-layer" data-parallax data-parallax-speed="0.035"><p className="eyebrow">Start a project</p><h1 className="page-title">Tell us what you want to make better.</h1><p className="lead">A complete brief is not required. Share the goal, the problem, and what you know so far.</p></div></section>
      <section className="section section-paper-2"><div className="container contact-grid"><aside className="contact-sidebar"><p className="eyebrow">Contact</p><h2>Let’s begin with a clear conversation.</h2><div className="contact-list"><div className="contact-item"><span>Email</span><a href="mailto:hello@devtork.studio">hello@devtork.studio</a></div><div className="contact-item"><span>Location</span><strong>Bangladesh</strong></div><div className="contact-item"><span>Typical reply</span><strong>Within two working days</strong></div></div></aside><ContactForm /></div></section>
      <section className="section" id="faq"><div className="container"><div className="split-heading"><div><p className="eyebrow">Common questions</p><h2>Before we start.</h2></div><Accordion /></div></div></section>
    </>
  );
}
