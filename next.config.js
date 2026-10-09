
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/image/[...path]": ["./private-assets/**/*"],
  },
};

module.exports = nextConfig;