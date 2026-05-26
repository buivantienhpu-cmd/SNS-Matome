/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output a static export of the Next.js app suitable for easy deployment to GitHub Pages or Cloudflare Pages
  output: 'export',
  // Disable image optimization for static exports as there is no server-side component running on GitHub/Cloudflare Pages
  images: {
    unoptimized: true,
  },
  // Keep base path clean for custom domains or Cloudflare Pages root directory deployments
  basePath: '',
};

module.exports = nextConfig;
