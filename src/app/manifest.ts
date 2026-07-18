import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevTork Studio",
    short_name: "DevTork",
    description: "Design, development, and digital growth studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#9200bd",
    icons: [
      { src: "/brand/app-icon-light.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/app-icon-dark.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
