"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/content";

const filters = [
  ["all", "All work"],
  ["product", "Products"],
  ["web", "Web"],
  ["platform", "Platforms"],
  ["brand", "Brand"]
] as const;

export default function WorkFilter() {
  const [active, setActive] = useState("all");
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map(([value, label]) => (
          <button key={value} className={`filter-btn ${active === value ? "is-active" : ""}`} onClick={() => setActive(value)}>{label}</button>
        ))}
      </div>
      <div className="work-grid">
        {projects.map((project) => {
          const show = active === "all" || project.filters.includes(active);
          return (
            <article key={project.slug} className={`work-card ${show ? "" : "is-hidden"}`} data-reveal>
              <Link className="work-card-link" href={`/work/${project.slug}`}>
                <div className="work-visual"><span className="work-badge">{project.badge}</span><div className={`work-art ${project.artClass}`} /></div>
                <div className="work-meta"><h3 className="work-name">{project.name}</h3><p className="work-tags">{project.tags}</p></div>
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}
