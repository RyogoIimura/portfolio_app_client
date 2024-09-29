/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com",
		],
	},
  async redirects() {
    return [
      {
        source: '/', // リダイレクト元
        destination: '/lp', // リダイレクト先
        permanent: true,  // header指定（308）
      },
    ]
  },
  emotion: true
};
export default nextConfig;
