// Shared site constants for metatoy-www — the Metatoy studio landing at
// metatoy.com. (The Sorb marketing site moved to its own repo/domain,
// www.sorbcloud.com, on 2026-08-05.) Kept dependency-free so any page or
// route handler can import it.

export const SITE = {
  name: "Metatoy",
  studio: "Metatoy",
  url: "https://metatoy.com",
  // The developer tool, now on its own domain.
  sorbUrl: "https://www.sorbcloud.com",
  // GitHub org (studio umbrella).
  githubUrl: "https://github.com/metatoy",
  // Public studio mailbox.
  contactEmail: "hello@metatoy.com",
  accent: "#f26722",
  description:
    "Metatoy is a workshop of one — a developer tool (Sorb) and a consumer game (woords) built side by side. One founder, two products.",
};

/**
 * Build a per-page metadata object (Next App Router `metadata` export).
 * @param {{ title?: string, description?: string, path?: string, noindex?: boolean }} opts
 */
export function pageMetadata({ title, description, path = "/", noindex = false } = {}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.name;
  const desc = description ?? SITE.description;
  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      type: "website",
      images: [{ url: "/og/metatoy-og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: ["/og/metatoy-og.png"],
    },
  };
}
