import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://retro-ai.example.com";
  return ["", "/app/dashboard", "/app/nostalgia", "/app/intelligence", "/app/social", "/app/persistence", "/app/analytics", "/app/monetization"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
