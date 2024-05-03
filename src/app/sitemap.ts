import type { MetadataRoute } from "next"

import { getAbsoluteUrl } from "@/utils/getAbsoluteUrl"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
    },
  ]
}
