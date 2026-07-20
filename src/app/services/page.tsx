import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/content";

export const metadata: Metadata = { title: "Services", description: "UI/UX design, web development, mobile apps, AI automation, graphic design, SEO, growth, and ongoing digital support." };

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero page-hero-animated"><div className="container parallax-layer" data-parallax data-parallax-speed="0.035"><div className="page-hero-row"><div><p className="eyebrow">Services</p><h1 className="page-title">One studio, from first idea to launch.</h1><p className="lead">Choose one focused service or bring us in for the full journey. We keep every step clear.</p></div><div className="page-number">07</div></div></div></section>
      <section className="section section-paper-2"><div className="container">{services.map((service) => <article className="service-detail" data-reveal id={service.id} key={service.id}><h2>{service.title}</h2><div className="service-detail-copy"><p>{service.summary}</p><div className="pill-list">{service.items.map((item) => <span className="pill" key={item}>{item}</span>)}</div><div className="outcome-box"><strong>The outcome</strong>{service.outcome}</div></div></article>)}</div></section>
      <section className="section section-dark motion-surface"><div className="container"><div className="split-heading"><div><p className="eyebrow">Not sure what you need?</p><h2>Start with the problem.</h2></div><div><p className="lead muted">Tell us what is not working, what you are trying to achieve, and who the experience is for. We will help define the right scope.</p><Link className="btn top-gap" href="/contact">Discuss your project <span className="btn-icon">↗</span></Link></div></div></div></section>
    </>
  );
}
