import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteConfig.url}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        "/dashboard/",
        "/admin/",
        "/perfil/",
        "/login",
        "/registro",
        "/api/",
      ],
    },

    sitemap: sitemapUrl,
  };
}
