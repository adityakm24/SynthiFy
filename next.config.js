const path = require("path");

module.exports = {
  basePath: "", // Empty base path for hosting at the root
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    render: {
      document: path.join(__dirname, "public/_app.html"), // Specify the custom HTML file path
    },
  },
};
