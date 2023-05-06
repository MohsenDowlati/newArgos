/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withVideos = require('next-videos')
const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: false,
  images: {
    disableStaticImages: true
  },
  experimental: {
    scrollRestoration: true,
  }
}

module.exports = withPlugins([withVideos, withImages], nextConfig)
