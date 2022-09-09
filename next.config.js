/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["www.gravatar.com", "placeimg.com"],
	},
};

module.exports = nextConfig;
