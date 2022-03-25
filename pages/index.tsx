import { execSync } from 'child_process';
import { parse } from 'comment-json';
import { readFileSync } from 'fs';
import Head from 'next/head';
import { join } from 'path';
import { useEffect, useState } from 'react';
import { IoLogoGithub } from 'react-icons/io';
import GameContainer from '../components/Game/GameContainer';
import Guide from '../components/Guide';
import Header from '../components/Header';
import ResultsContainer from '../components/Results/ResultsContainer';
import Warning from '../components/Warning';
import ColorInfo from '../interfaces/ColorInfo';
import RGBdleProps from '../interfaces/RGBdleProps';

/**
 * The main page of the app.
 * @param props The props of the page.
 * @param props.colors ColorInfo objects for the upcoming games.
 */
const Home = ({ build, colors, context, mode }: RGBdleProps) => {
	const d = new Date();
	const formatted = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	const [color, _setColor] = useState<ColorInfo>(colors[formatted] || { rgb: [4, 20, 69], name: 'Backup color', day: 69420 }); // In case something fucks up.
	// Array storing the amount of guesses ([1;10]) submitted by the user for each game they have played.
	// -1 means they didn't find the color after 10 attempts in that game.
	// If the user didn't finish a game, this game is not included in the array.
	const [attempts, setAttempts] = useState<number[]>([]);
	// Whether the `Guide` component is visible.
	const [showGuide, setShowGuide] = useState(false);
	// Whether the `Results` component is visible.
	const [showResults, setShowResults] = useState(false);
	// Whether the `Warning` component is visible.
	const [showWarning, setShowWarning] = useState(false);
	// The warning message to display.
	const [warningMessage, setWarningMessage] = useState('');

	const onEnd = async (guesses: number[][], correct: ColorInfo): Promise<void> => {
		console.log(guesses, correct);
		attempts.push(guesses.at(-1)!.toString() === correct.rgb.toString() ? guesses.length : -1);
		setAttempts(attempts);
		if (mode === 'standard') {
			localStorage.setItem('RGBDLE_ATTEMPTS', JSON.stringify(attempts));
			display('results');
		}
		// Sending game results to webhook.
		fetch('/api/sendGame', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				correct: correct.rgb,
				day: correct.day,
				guesses,
				name: correct.name
			})
		}).then(() => {
			console.log('Resuls sent to webhook.');
		}).catch(e => {
			console.error('Failed to send game results. Error:');
			console.error(e);
		});
	}

	// If the user somehow triggers the display of one popup while another is already open, we make sure to avoid overlapping.
	const display = (component: 'none' | 'results' | 'guide'): void => {
		switch (component) {
			case 'none':
				setShowGuide(false);
				setShowResults(false);
				break;
			case 'results':
				setShowGuide(false);
				setShowResults(true);
				break;
			case 'guide':
				setShowResults(false);
				setShowGuide(true);
				break;
		}
	}

	const closeWaring = (): void => {
		setShowWarning(false);
		localStorage.setItem('RGBDLE_LAST_IGNORED_WARNING', process.env.NEXT_PUBLIC_WARNING!);
	};

	/* Disable body scrolling when a popup is opened. */
	useEffect(() => {
		document.body.style.overflow = (showGuide || showResults) ? 'hidden' : '';
	}, [showGuide, showResults]);

	useEffect(() => {
		/* Checking the attempts array. */
		if (mode === 'standard') {
			const arr = parse(localStorage.getItem('RGBDLE_ATTEMPTS') || '[]') as number[];
			setAttempts(arr);
		}

		/* Opening guide if it's the first time the user is playing. */
		const alreadyPlayed = localStorage.getItem('RGBDLE_FIRST_TIME') === 'false';
		setShowGuide(!alreadyPlayed);
		localStorage.setItem('RGBDLE_FIRST_TIME', 'false');

		/* Opening Warning if needed */
		if (process.env.NEXT_PUBLIC_WARNING && process.env.NEXT_PUBLIC_WARNING_MESSAGE) {
			const lastIgnored = localStorage.getItem('RGBDLE_LAST_IGNORED_WARNING') || '';
			if (lastIgnored !== process.env.NEXT_PUBLIC_WARNING) {
				setShowWarning(true);
				setWarningMessage(process.env.NEXT_PUBLIC_WARNING_MESSAGE);
			}
		}

		/* Keyboard shortcut to close popup. */
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape')
				display('none');
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const head = (
		<Head>
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
		</Head>
	);

	if (process.env.NEXT_PUBLIC_MAINTENANCE === '1') {
		return (
			<>
				{head}
				<div className='flex flex-col justify-center items-center h-full'>
					<div className='font-title text-lg md:text-4xl my-7'>RGBdle is currently under maintenance.</div>
					<div className='font-body text-lg md:text-3xl'>Please try again later!</div>
					{
						process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE &&
						(
							<>
								<div className='my-10 w-1/2 min-w-1/3 h-px bg-slate-500'></div>
								<div
									className='font-[monospace] text-sm md:text-xl text-center px-20'
									dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE }}
								>
								</div>
							</>
						)
					}
				</div>
			</>
		)
	}

	return (
		<>
			{head}
			<Header display={display} mania={mode === 'mania'} />
			<GameContainer
				context={mode === 'standard' ? context : ''}
				color={color}
				mode={mode}
				onEnd={onEnd}
			/>
			<div className='px-4 text-center text-slate-500/40 dark:text-gray-50/30'>
				<div className='inline mr-2'>
					Report bugs, see source code, star or contribute on
				</div>
				<a
					className='inline-flex flex-row items-baseline no-underline transition-colors duration-100 hover:text-gray-50'
					href='https://github.com/hickatheworld/rgbdle'
					rel='noopener noreferrer'
					target='_blank'
				>

					<IoLogoGithub size={18} className='translate-y-[2px]'></IoLogoGithub>
					<div className='ml-1'>
						GitHub
					</div>
				</a>
			</div>
			<div className='font-mono text-slate-500/40 dark:text-gray-50/20 text-center text-xs py-1'>
				Built at {build.date}
				<br />
				Version {build.version} |
				Commit : <a href={`https://github.com/hickatheworld/rgbdle/commit/${build.commit}`} target='_blank' rel='noreferrer'>
					{build.commit.substring(0, 7)}
				</a>
			</div>
			<ResultsContainer
				close={() => display('none')}
				color={color}
				displayed={showResults}
			/>
			<Guide
				close={() => display('none')}
				displayed={showGuide}
			/>
			<Warning
				close={closeWaring}
				displayed={showWarning}
				message={warningMessage}
			/>
		</>
	);
}
export default Home;

export function getStaticProps(): { props: RGBdleProps } {
	// Build data
	const commit = execSync('git rev-parse HEAD').toString().trim();
	const version = require('../package.json').version;
	const date = new Date().toUTCString();

	// Color Data
	const data = parse(readFileSync(join(process.cwd(), 'COLORS.json'), 'utf8')) as any as Record<string, ColorInfo & { date: string }>;
	let d = new Date();
	const formatted = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	d = new Date(formatted); // This removes all hours, minutes, seconds, etc, so that today's color can match.
	// We only keep today's color and future ones.
	// Like this, we're sure every needed color is loaded in the app at each build without bloating the bundle with older colors.
	const colors = {} as Record<string, ColorInfo>;
	for (const [k, v] of Object.entries(data)) {
		const date = new Date(v.date);
		if (date.getTime() >= d.getTime()) {
			colors[k] = v;
		}
	}
	return {
		props: {
			build: { commit, date, version },
			context: process.env.COLOR_ABOUT || '',
			colors,
			// mania is to be set to true manually in mania.tsx
			mode: 'standard'
		}
	};
}