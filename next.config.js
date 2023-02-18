/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')


const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  video: {
  },
  experimental: {
    scrollRestoration: true,
  },
}


// module.exports = withVideos()

module.exports = nextConfig
