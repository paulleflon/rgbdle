import NextHead from 'next/head';

/**
 * Head of RGBdle app.
*/
const Head = () => {
	return (
		<NextHead>
			{/* Visual assets */}
			<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
			<link rel='manifest' href='/site.webmanifest' />
			<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#1e293b' />
			<link rel='shortcut icon' href='/favicon.ico' />
			<meta name='msapplication-TileColor' content='#1e293b' />
			<meta name='msapplication-config' content='/browserconfig.xml' />
			<meta name='theme-color' content='#1e293b' />
			{/* OpenGraph meta */}
			<meta property='og:title' content='RGBdle' />
			<meta property='og:site_name' content='RGBdle' />
			<meta property='og:description' content='Demonstrate your skills in design: Guess a RGB code every day!' />
			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://rgbdle.hicka.world' />
			<meta property='og:image' content='https://rgbdle.hicka.world/card.png' />
			{/* Twitter meta */}
			<meta name='twitter:title' content='RGBdle' />
			<meta name='twitter:description' content='Demonstrate your skills in design: Guess a RGB code every day!' />
			<meta name='twitter:image' content='https://rgbdle.hicka.world/card.png' />
			<meta name='twitter:image:alt' content='RGBdle - Demonstrate your skills in design: Guess a RGB code every day!' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:site' content='@hickatheworld' />
			<title>RGBdle</title>
		</NextHead>
	);
}
export default Head;