/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/mania',
				permanent: true
			},
			{
				source: '/_error',
				destination: '/mania',
			}
		];
	}
};

module.exports = nextConfig;
