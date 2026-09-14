import type { MetadataRoute } from "next";
import { NOINDEX, SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: NOINDEX ? "/" : undefined,
    },
    sitemap: NOINDEX ? undefined : `${SITE_URL}/sitemap.xml`,
  };
}
