/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/_error',
				destination: '/',
				permanent: true
			}
		];
	}
};

module.exports = nextConfig;
