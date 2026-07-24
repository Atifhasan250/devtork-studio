import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://devtork.com";
  const staticRoutes = ["", "/services", "/work", "/about", "/pricing", "/contact", "/privacy", "/terms"];
  const staticUrls = staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-07-18"), changeFrequency: "yearly" as const, priority: route === "" ? 1 : 0.8 }));
  const projectUrls = projects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date("2026-07-18"), changeFrequency: "yearly" as const, priority: 0.7 }));
  return [...staticUrls, ...projectUrls];
}
