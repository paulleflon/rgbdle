import { parse } from 'comment-json';
import { readFileSync } from 'fs';
import Head from 'next/head';
import { join } from 'path';
import { useEffect, useState } from 'react';
import { IoLogoGithub } from 'react-icons/io';
import Game from '../components/Game';
import Guide from '../components/Guide';
import Header from '../components/Header';
import Results from '../components/Results';
import Warning from '../components/Warning';
import ColorInfo from '../interfaces/ColorInfo';

/**
 * The main page of the app.
 * @param props The props of the page.
 * @param props.colors ColorInfo objects for the upcoming games.
 */
const Home = ({ colors }: { colors: Record<string, ColorInfo> }) => {
	const d = new Date();
	const formatted = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	// No need to use state for this value, it is not supposed to change.
	const color: ColorInfo = colors[formatted] || { rgb: [4, 20, 69], name: 'Backup color', day: 69420}; // In case something fucks up.
	// Array storing the amount of guesses ([1;10]) submitted by the user for each game they have played.
	// -1 means they didn't find the color after 10 attempts in that game.
	// If the user didn't finish a game, this game is not included in the array.
	const [attempts, setAttempts] = useState<number[]>([]);
	// Whether the game has ended, either because the user found the correct color or ran out of attempts.
	const [ended, setEnded] = useState(false);
	// The guesses made by the user for this game.
	const [guesses, setGuesses] = useState<[number, number, number][]>([]);
	// Whether the app is loading. This is because we need to access the localStorage from a useEffect hook.
	const [isLoading, setIsLoading] = useState(true);
	// Which inputs are locked.
	const [lock, setLock] = useState<[boolean, boolean, boolean]>([false, false, false]);
	// Whether the `Guide` component is visible.
	const [showGuide, setShowGuide] = useState(false);
	// Whether the `Results` component is visible.
	const [showResults, setShowResults] = useState(false);
	// Whether the `Warning` component is visible.
	const [showWarning, setShowWarning] = useState(false);
	// The warning message to display.
	const [warningMessage, setWarningMessage] = useState('');

	useEffect(() => {
		/* Checking the save of today's game. */

		const save = parse(localStorage.getItem('RGBDLE_SAVE') || '{}') as any;
		// It can be anything, the user may have messed up with localStorage. And `unknown` is a bullshit type.
		if (
			// Type checks
			typeof save.day === 'number' &&
			typeof save.ended === 'boolean' &&
			typeof save.guesses === 'object' &&
			// If no guess is stored, no need to consider this save. Well there is no reason for a save without guesses to exist but just in case.
			save.guesses.length > 0 &&
			// This save is relevant only if it's for the same game day.
			save.day === color.day
		) {
			setGuesses(save.guesses);
			setEnded(save.ended);
			const lastGuess = save.guesses.at(-1);
			setLock([lastGuess[0] === color.rgb[0], lastGuess[1] === color.rgb[1], lastGuess[2] === color.rgb[2]]);
		} else {
			localStorage.setItem('RGBDLE_SAVE', '');
		}

		/* Checking the attempts array. */
		const arr = parse(localStorage.getItem('RGBDLE_ATTEMPTS') || '[]') as number[];
		setAttempts(arr);
		setIsLoading(false);

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

	}, []);

	const submitGuess = (guess: [number, number, number]): void => {
		let correct = 0;
		setGuesses((prev) => [...prev, guess]);
		for (const [i, v] of guess.entries()) {
			if (v === color.rgb[i]) {
				correct++;
				lock[i] = true;
				setLock(lock);
			}
		}
		localStorage.setItem('RGBDLE_SAVE', JSON.stringify({
			day: color.day,
			ended: correct === 3 || guesses.length + 1 === 10,
			guesses: [...guesses, guess]
		}));
		if (correct === 3)
			endGame(guesses.length + 1);
		else if (guesses.length + 1 === 10)
			endGame(-1);
	};

	const endGame = (attemptsCount: number): void => {
		setEnded(true);
		attempts.push(attemptsCount);
		localStorage.setItem('RGBDLE_ATTEMPTS', JSON.stringify(attempts));
		setAttempts(attempts);
		display('results');
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
		<div className='relative h-full overflow-hidden'>
			{head}
			{
				isLoading ?
					<div className='flex justify-center my-4'>
						<div
							className='animate-spin border-4 border-slate-900 dark:border-gray-50 
							border-t-transparent dark:border-t-transparent rounded-full w-12 h-12'
						></div>
					</div>
					:
					<div className='relative h-full overflow-y-auto'>
						<Header display={display} />
						<Game
							color={color}
							ended={ended}
							guesses={guesses}
							lock={lock}
							submitGuess={submitGuess}
						/>
						<Results
							attempts={attempts}
							close={() => display('none')}
							color={color}
							displayed={showResults}
							ended={ended}
							guesses={guesses}
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
						<div className='px-4 pb-2 text-center text-slate-500/40 dark:text-gray-50/10'>
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
					</div>
			}
		</div>
	);
}
export default Home;

export function getStaticProps() {
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
			colors
		}
	};
}