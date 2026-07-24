import Link from "next/link";
import Accordion from "@/components/Accordion";
import HeroVisual from "@/components/HeroVisual";
import ProjectCard from "@/components/ProjectCard";
import ServiceList from "@/components/ServiceList";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStat from "@/components/AnimatedStat";
import { projects } from "@/data/content";

const serviceRows = [
  ["01", "UI/UX design", "Clear structure, strong visual direction, and interfaces people understand quickly.", "/services#web", "#c77dff"],
  ["02", "Web development", "Fast, responsive, maintainable websites and web applications built for real use.", "/services#development", "#7dd3fc"],
  ["03", "Mobile apps", "Useful iOS and Android experiences with simple flows and a scalable foundation.", "/services#apps", "#f9c74f"],
  ["04", "AI automation", "Practical AI workflows that reduce repetitive work while keeping people in control.", "/services#automation", "#fb923c"],
  ["05", "Graphic design", "Visually stunning and effective designs that capture attention.", "/services#graphic-design", "#ff8fab"],
  ["06", "SEO & growth", "Practical search, content, and campaigns that help the right people find you.", "/services#growth", "#86efac"]
] as const;

export default function HomePage() {
  return (
    <div className="home-experience">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Global digital studio · Bangladesh</p>
            <h1 className="hero-title"><span className="line"><span className="line-inner">We make digital</span></span><span className="line"><span className="line-inner">ideas <span className="accent">easy to use,</span></span></span><span className="line"><span className="line-inner">hard to ignore.</span></span></h1>
            <p className="hero-copy">Websites, apps, brands, and growth systems that are designed clearly, built carefully, and explained in language everyone can understand.</p>
            <div className="hero-actions"><Link className="btn" data-magnetic href="/contact">Start a project <span className="btn-icon">↗&#xFE0E;</span></Link><Link className="btn btn-outline" data-magnetic href="/work">View works</Link></div>
          </div>
          <HeroVisual />
        </div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[...Array(2)].flatMap((_, set) => ["UI/UX design", "Web development", "Mobile apps", "AI automation", "Graphic design", "SEO & growth"].map((item) => <div className="ticker-item" key={`${set}-${item}`}>{item}</div>))}</div></div>
      <section className="section">
        <div className="container">
          <div className="split-heading belief-heading">
            <p className="eyebrow" data-reveal>What we believe</p>
            <h2 className="statement" data-reveal>A good digital experience should look distinctive <span className="soft">and still feel obvious to use.</span></h2>
          </div>
        </div>
      </section>

      <section className="section section-dark motion-surface"><div className="container"><div className="section-head section-head-services"><div><p className="eyebrow" data-reveal>What we do</p><h2 data-reveal>One studio.<br />From idea to growth.</h2></div><div className="service-intro"><p className="lead muted" data-reveal>You do not need six different teams. We connect strategy, design, technology, and marketing around one clear goal.</p><Link className="btn btn-outline service-all-link" href="/services">All services <span className="btn-icon">↗&#xFE0E;</span></Link></div></div><ServiceList rows={serviceRows} /></div></section>
      
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 data-reveal>Our achievements</h2>
          </div>
          <div className="stat-grid" data-stagger>
            {[[35, "+", "Clients handled"], [60, "+", "Projects delivered"], [96, "%", "Success rate"], [6, "", "Core services"]].map(([val, suf, label]) => <AnimatedStat key={label as string} value={val as number} suffix={suf as string} label={label as string} />)}
          </div>
        </div>
      </section>
      <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow" data-reveal>Selected work</p><h2 data-reveal>Proof through<br />the work.</h2></div><Link className="btn btn-outline work-all-link" href="/work">View all projects <span className="btn-icon">↗&#xFE0E;</span></Link></div><div className="work-grid"><ProjectCard project={projects[0]} className="wide" /><ProjectCard project={projects[1]} className="narrow" /><ProjectCard project={projects[2]} /><ProjectCard project={projects[3]} /></div></div></section>
      <section className="section section-paper-2"><div className="container"><div className="section-head"><div><p className="eyebrow" data-reveal>Client stories</p><h2 data-reveal>What clients say<br />about us.</h2></div></div><TestimonialCarousel /></div></section>
      <section className="section section-dark motion-surface"><div className="container"><div className="split-heading process-heading"><div><p className="eyebrow" data-reveal>Our process</p><h2 data-reveal>Clear from<br />day one.</h2></div><p className="lead muted" data-reveal>No confusing agency language. You will know what we are doing, why it matters, and what happens next.</p></div><div className="process-wrap" data-stagger>{[["01", "Discover", "We learn your goals, audience, offer, challenges, and the result the project needs to create."], ["02", "Define", "We agree on scope, structure, content, technology, timeline, and the decisions needed from each side."], ["03", "Design", "We turn the direction into a clear interface and clickable experience before full development begins."], ["04", "Build", "We develop, test, optimise, and keep you involved through useful progress reviews."], ["05", "Launch & grow", "We prepare the release, measure what matters, and improve the experience as your business grows."]].map(([no, title, copy]) => <div className="process-step" data-step={no} key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
      <section className="section" id="faq"><div className="container"><div className="split-heading"><div><p className="eyebrow">Common questions</p><h2>Before we start.</h2></div><Accordion /></div></div></section>
      <section className="section section-purple big-cta"><div className="container big-cta-inner"><div><p className="eyebrow" data-reveal>Have an idea?</p><h2 data-reveal>Let’s turn it into something people understand, trust, and remember.</h2><Link aria-label="Start a project" className="cta-pill" data-magnetic href="/contact"><span className="cta-pill-circle"><span>→&#xFE0E;</span></span><span className="cta-pill-text">Start project</span></Link></div></div></section>
    </div>
  );
}
