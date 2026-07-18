import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/content";

export const metadata: Metadata = { title: "Insights", description: "Clear thinking about design, development, motion, content, performance, and digital growth." };

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero page-hero-animated"><div className="container parallax-layer" data-parallax data-parallax-speed="0.035"><p className="eyebrow">Studio insights</p><h1 className="page-title">Useful thinking, without the agency jargon.</h1><p className="lead">Practical notes about making websites, products, brands, and digital projects work better.</p></div></section>
      <section className="section section-paper-2"><div className="container"><div className="article-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div></section>
    </>
  );
}
