import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker/Coolify: emit a standalone server bundle (see Dockerfile).
  output: "standalone",
  outputFileTracingRoot: __dirname,
  // The Sorb marketing site moved off metatoy.com/sorb to its own domain
  // (2026-08-05). Permanently redirect all the old /sorb paths — including the
  // legal pages that lived under /sorb/legal and the pre-2026-06 /legal/* ones.
  async redirects() {
    return [
      { source: "/sorb", destination: "https://www.sorbcloud.com", permanent: true },
      { source: "/sorb/:path*", destination: "https://www.sorbcloud.com/:path*", permanent: true },
      { source: "/legal/terms", destination: "https://www.sorbcloud.com/legal/terms", permanent: true },
      { source: "/legal/privacy", destination: "https://www.sorbcloud.com/legal/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
