/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
	images: {
		domains: ["www.gravatar.com", "placeimg.com"],
	},
};

module.exports = nextConfig;
