import "./globals.css";
import "./tokens.css";
import Script from "next/script";
import { SITE } from "../lib/site.js";

// metatoy.com keeps its own GA4 property (the Sorb site has a separate one).
const GA_ID = "G-DNW50VHNVC";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Metatoy: Build the tool, Ship the toy",
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Metatoy: Build the tool, Ship the toy",
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/og/metatoy-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metatoy: Build the tool, Ship the toy",
    description: SITE.description,
    images: ["/og/metatoy-og.png"],
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
};

export const viewport = {
  themeColor: SITE.accent,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        {/* Umami (stats.n8plusus.com) -- self-hosted, cookieless; data-domains keeps local dev and previews out. */}
        <Script src="https://stats.n8plusus.com/script.js" data-website-id="d63c53e4-2545-48b5-a670-5fd1ec53659c" data-domains="metatoy.com,www.metatoy.com" strategy="afterInteractive" />
      </body>
    </html>
  );
}
