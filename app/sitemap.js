import { SITE } from "../lib/site.js";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE.url}/oss/validonce`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/oss/scout`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/writing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${SITE.url}/writing/rebuilding-bootstrap-5-in-styled-components`,
      lastModified: new Date("2026-08-24"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
