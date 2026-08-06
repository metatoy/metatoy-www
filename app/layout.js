import "./globals.css";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Metatoy: Build the tool, Ship the toy",
    description: SITE.description,
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
      </body>
    </html>
  );
}
