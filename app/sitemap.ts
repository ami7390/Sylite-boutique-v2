import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sylite-boutique.vercel.app";
  return ["", "/collection", "/nouvel-arrivage", "/soins", "/electromenager", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: (path ? "weekly" : "daily") as "weekly" | "daily", priority: path ? 0.8 : 1 }));
}
