import type { MetadataRoute } from "next";
import { articles, projects } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://devtork1.vercel.app";
  const staticRoutes = ["", "/services", "/work", "/studio", "/insights", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-07-18"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date("2026-07-18"), changeFrequency: "monthly" as const, priority: 0.75 })),
    ...articles.map((article) => ({ url: `${base}/insights/${article.slug}`, lastModified: new Date("2026-07-18"), changeFrequency: "yearly" as const, priority: 0.6 }))
  ];
}
