import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBySlug, articles } from "@/data/content";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) return {};
  return { title: article.title, description: article.intro, alternates: { canonical: `/insights/${slug}` } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) notFound();
  return (
    <>
      <section className="page-hero page-hero-animated"><div className="container article-page parallax-layer" data-parallax data-parallax-speed="0.03"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><div className="article-meta"><span>{article.date}</span><span>{article.read}</span></div><div className="article-thumb article-hero-thumb"><div className="parallax-media" data-parallax data-parallax-speed="0.025"><div className={`article-thumb-inner ${article.visual}`} /></div></div></div></section>
      <section className="section"><article className="container article-page article-content"><p className="lead">{article.intro}</p>{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<blockquote>{article.quote}</blockquote><h2>Keep the next step obvious</h2><p>A strong website does not ask visitors to admire it forever. It helps them understand the offer, trust the team, and take the next useful step.</p></article></section>
      <section className="section section-purple big-cta"><div className="container big-cta-inner"><div><p className="eyebrow">Need help with your project?</p><h2>Let’s make the complicated parts feel clear.</h2><Link className="cta-circle" href="/contact"><span>Talk to<br />us ↗</span></Link></div></div></section>
    </>
  );
}
