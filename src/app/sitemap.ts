import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://lovebetter.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  // Note: /assessment, /individual-assessment, and /bundle-payment are
  // intentionally excluded — they already set robots: { index: false } in
  // their own layouts, and listing a noindex page in the sitemap sends
  // search engines a contradictory signal.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/store`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/the-uncommon-practice`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/angels`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const parsedDate = new Date(post.date);
    return {
      url: `${BASE_URL}/the-uncommon-practice/${post.slug}`,
      lastModified: Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
