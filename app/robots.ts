import type { MetadataRoute } from "next";
import { NOINDEX } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: NOINDEX ? "/" : undefined,
    },
  };
}
