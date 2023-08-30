/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
          return [
            {
              source: '/',
              destination: '/shop',
              permanent: true,
            },
          ];
        },

}

module.exports = nextConfig
