import Link from "next/link";
import type { Article } from "@/data/content";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card" data-reveal>
      <Link href={`/insights/${article.slug}`}>
        <div className="article-thumb">
          <div className="parallax-media" data-parallax data-parallax-speed="0.03">
            <div className={`article-thumb-inner ${article.visual}`} />
          </div>
        </div>
        <div className="article-meta"><span>{article.category}</span><span>{article.read}</span></div>
        <h3>{article.title}</h3>
        <p>{article.intro}</p>
      </Link>
    </article>
  );
}
