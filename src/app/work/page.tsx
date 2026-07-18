import type { Metadata } from "next";
import WorkFilter from "@/components/WorkFilter";

export const metadata: Metadata = { title: "Work", description: "Selected DevTork Studio products, platforms, brand systems, and digital experience concepts." };

export default function WorkPage() {
  return (
    <>
      <section className="page-hero page-hero-animated"><div className="container parallax-layer" data-parallax data-parallax-speed="0.035"><p className="eyebrow">Selected work</p><h1 className="page-title">Ideas made useful, clear, and memorable.</h1><p className="lead">A mix of studio products, active builds, internal systems, and concept studies that show how we think.</p></div></section>
      <section className="section section-paper-2"><div className="container"><WorkFilter /></div></section>
      <section className="section section-purple big-cta"><div className="container big-cta-inner"><div><p className="eyebrow">Your project could be next</p><h2>Bring us the goal. We’ll help shape the right digital experience.</h2><a className="cta-circle" href="/contact"><span>Start<br />project ↗</span></a></div></div></section>
    </>
  );
}
