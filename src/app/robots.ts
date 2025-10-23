import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { ADMIN_DASHBOARD, LOGIN } from "@/constants/routes";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteConfig.url}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        ADMIN_DASHBOARD,
        "/admin/",
        "/perfil/",
        LOGIN,
        "/registro",
        "/api/",
      ],
    },

    sitemap: sitemapUrl,
  };
}
