import type { MetadataRoute } from "next"

import { getAbsoluteUrl } from "@/utils/get-absolute-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
    },
  ]
}
