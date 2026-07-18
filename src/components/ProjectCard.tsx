import Link from "next/link";
import type { Project } from "@/data/content";

export default function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <article className={`work-card ${className}`} data-reveal>
      <Link className="work-card-link" href={`/work/${project.slug}`}>
        <div className="work-visual">
          <span className="work-badge">{project.badge}</span>
          <div className="parallax-media" data-parallax data-parallax-speed="0.035">
            <div className={`work-art ${project.artClass}`} />
          </div>
        </div>
        <div className="work-meta"><h3 className="work-name">{project.name}</h3><p className="work-tags">{project.tags}</p></div>
      </Link>
    </article>
  );
}
