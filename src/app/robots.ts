import type { MetadataRoute } from "next";

const BASE_URL = "https://lovebetter.co.za";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/report", "/individual-report", "/linkedin-callback", "/store/delivery-x7k2m9"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
