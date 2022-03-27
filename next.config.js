/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirectos() {
		return [
			{
				source: '/(.*)',
				destination: '/mania',
				permanent: true
			}
		];
	}
};

module.exports = nextConfig;
