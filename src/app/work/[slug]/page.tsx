import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectArtwork from "@/components/ProjectArtwork";
import { projectBySlug, projects } from "@/data/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) return {};
  return { title: project.name, description: project.intro, alternates: { canonical: `/work/${slug}` } };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();
  const nextProject = projectBySlug[project.next];

  return (
    <>
      <section className="case-hero">
        <div className="container case-hero-grid parallax-layer" data-parallax data-parallax-speed="0.03">
          <div><p className="eyebrow case-category">{project.category}</p><h1>{project.name}</h1></div>
          <p className="case-intro">{project.intro}</p>
        </div>
      </section>
      <section className="section-tight"><div className="container"><div className="case-facts"><div className="case-fact"><span>Year</span><strong>{project.year}</strong></div><div className="case-fact"><span>Project type</span><strong>{project.type}</strong></div><div className="case-fact"><span>Services</span><strong>{project.services}</strong></div><div className="case-fact"><span>Status</span><strong>{project.status}</strong></div></div></div></section>
      <section className="section"><div className="container case-section-grid"><div><p className="eyebrow">The project</p><h2>Clear thinking before the interface.</h2></div><div className="case-body"><h3>The challenge</h3><p>{project.challenge}</p><h3>Our approach</h3><p>{project.approach}</p><h3>The solution</h3><p>{project.solution}</p><ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
      <section className="section section-dark motion-surface"><div className="container"><p className="eyebrow">Project focus</p><div className="metric-strip">{project.metrics.map((metric) => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div></section>
      <section className="section"><div className="container"><div className="case-gallery"><div className="case-gallery-item wide"><ProjectArtwork project={project} /></div></div></div></section>
      <section className="section section-purple big-cta"><div className="container big-cta-inner"><Link href={`/work/${nextProject.slug}`}><p className="eyebrow">Next project</p><h2>{nextProject.name}</h2><div className="cta-circle"><span>View<br />case ↗</span></div></Link></div></section>
    </>
  );
}
