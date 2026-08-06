import { SITE } from "../lib/site.js";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
  ];
}
