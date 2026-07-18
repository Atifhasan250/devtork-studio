import Link from "next/link";
import HeroVisual from "@/components/HeroVisual";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/content";

const serviceRows = [
  ["01", "Web design", "Clear structure, strong visual direction, and interfaces people understand quickly.", "/services#web"],
  ["02", "Development", "Fast, responsive, maintainable websites and web applications built for real use.", "/services#development"],
  ["03", "Mobile apps", "Useful iOS and Android experiences with simple flows and a scalable foundation.", "/services#apps"],
  ["04", "Brand identity", "A recognisable system for how your business looks, sounds, and feels.", "/services#brand"],
  ["05", "SEO & growth", "Practical search, content, and campaigns that help the right people find you.", "/services#growth"]
];

export default function HomePage() {
  return (
    <div className="home-experience">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Global digital studio · Bangladesh</p>
            <h1 className="hero-title"><span className="line"><span className="line-inner">We make digital</span></span><span className="line"><span className="line-inner">ideas <span className="accent">easy to use,</span></span></span><span className="line"><span className="line-inner">hard to ignore.</span></span></h1>
            <p className="hero-copy">Websites, apps, brands, and growth systems—designed clearly, built carefully, and explained in language everyone can understand.</p>
            <div className="hero-actions"><Link className="btn" data-magnetic href="/contact">Start a project <span className="btn-icon">↗</span></Link><Link className="btn btn-outline" data-magnetic href="/work">See our work</Link></div>
            <div className="hero-meta"><div><span />Strategy before decoration</div><div><span />Responsive by default</div><div><span />Built for real people</div></div>
          </div>
          <HeroVisual />
        </div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[...Array(2)].flatMap((_, set) => ["Web design", "Development", "Mobile apps", "Brand identity", "SEO", "Digital marketing"].map((item) => <div className="ticker-item" key={`${set}-${item}`}>{item}</div>))}</div></div>
      <section className="section"><div className="container"><div className="split-heading"><p className="eyebrow" data-reveal>What we believe</p><h2 className="statement" data-reveal>A good digital experience should look distinctive <span className="soft">and still feel obvious to use.</span></h2></div></div></section>
      <section className="section section-dark motion-surface"><div className="container"><div className="section-head"><div><p className="eyebrow" data-reveal>What we do</p><h2 data-reveal>One studio.<br />From idea to growth.</h2></div><p className="lead muted" data-reveal>You do not need six different teams. We connect strategy, design, technology, and marketing around one clear goal.</p></div><div className="services-list" data-stagger>{serviceRows.map(([number, title, description, href]) => <Link className="service-row" href={href} key={number}><span className="service-no">{number}</span><h3 className="service-title">{title}</h3><p className="service-desc">{description}</p><span className="service-arrow">↗</span></Link>)}</div></div></section>
      <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow" data-reveal>Selected work</p><h2 data-reveal>Proof through<br />the work.</h2></div><Link className="text-link" data-reveal href="/work">View all projects</Link></div><div className="work-grid"><ProjectCard project={projects[0]} className="wide" /><ProjectCard project={projects[1]} className="narrow" /><ProjectCard project={projects[2]} /><ProjectCard project={projects[3]} /></div></div></section>
      <section className="section section-paper-2"><div className="container"><div className="section-head"><div><p className="eyebrow" data-reveal>How we make it better</p><h2 data-reveal>Simple principles.<br />Serious craft.</h2></div></div><div className="principles" data-stagger><article className="principle"><div className="principle-no">01 / Clarity</div><h3>Easy to understand.</h3><p>We remove noise, organise information, and write plain language so every visitor knows what to do next.</p></article><article className="principle"><div className="principle-no">02 / Character</div><h3>Not another template.</h3><p>Your website should feel like your business. We create a recognisable visual and motion system instead of adding random effects.</p></article><article className="principle"><div className="principle-no">03 / Care</div><h3>Built beyond launch.</h3><p>Responsive layouts, accessibility, performance, clean code, and useful documentation are part of the work—not extras.</p></article></div></div></section>
      <section className="section section-dark motion-surface"><div className="container"><div className="split-heading"><div><p className="eyebrow" data-reveal>Our process</p><h2 data-reveal>Clear from<br />day one.</h2></div><p className="lead muted" data-reveal>No confusing agency language. You will know what we are doing, why it matters, and what happens next.</p></div><div className="process-wrap" data-stagger>{[["01", "Discover", "We learn your goals, audience, offer, challenges, and the result the project needs to create."], ["02", "Define", "We agree on scope, structure, content, technology, timeline, and the decisions needed from each side."], ["03", "Design", "We turn the direction into a clear interface and clickable experience before full development begins."], ["04", "Build", "We develop, test, optimise, and keep you involved through useful progress reviews."], ["05", "Launch & grow", "We prepare the release, measure what matters, and improve the experience as your business grows."]].map(([no, title, copy]) => <div className="process-step" key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
      <section className="section section-purple big-cta"><div className="container big-cta-inner"><div><p className="eyebrow" data-reveal>Have an idea?</p><h2 data-reveal>Let’s turn it into something people understand, trust, and remember.</h2><Link aria-label="Start a project" className="cta-circle" data-magnetic href="/contact"><span>Start<br />project ↗</span></Link></div></div></section>
    </div>
  );
}
