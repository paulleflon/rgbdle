import { execSync } from 'child_process';
import { parse } from 'comment-json';
import { readFileSync } from 'fs';
import { join } from 'path';
import { useEffect, useState } from 'react';
import Footer from '../components/Common/Footer';
import Head from '../components/Common/Head';
import Header from '../components/Common/Header';
import GameContainer from '../components/Game/GameContainer';
import Guide from '../components/Common/Guide';
import ResultsContainer from '../components/Results/ResultsContainer';
import Warning from '../components/Common/Warning';
import ColorInfo from '../interfaces/ColorInfo';
import RGBdleProps from '../interfaces/RGBdleProps';
import Maintenance from '../components/Common/Maintenance';

/**
 * The main page of the app.
 * @param props The props of the page.
 * @param props.colors ColorInfo objects for the upcoming games.
 */
const Home = ({ build, colors, context }: RGBdleProps) => {
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
	
	const onEnd = async (guesses: number[][], correct: ColorInfo): Promise<void> => {
		attempts.push(guesses.at(-1)!.toString() === correct.rgb.toString() ? guesses.length : -1);
		setAttempts(attempts);
		localStorage.setItem('RGBDLE_ATTEMPTS', JSON.stringify(attempts));
		display('results');
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

	/* Disable body scrolling when a popup is opened. */
	useEffect(() => {
		document.body.style.overflow = (showGuide || showResults) ? 'hidden' : '';
	}, [showGuide, showResults]);

	useEffect(() => {
		/* Checking the attempts array. */
			const arr = parse(localStorage.getItem('RGBDLE_ATTEMPTS') || '[]') as number[];
			setAttempts(arr);
		/* Opening guide if it's the first time the user is playing. */
		const alreadyPlayed = localStorage.getItem('RGBDLE_FIRST_TIME') === 'false';
		setShowGuide(!alreadyPlayed);
		localStorage.setItem('RGBDLE_FIRST_TIME', 'false');

		/* Keyboard shortcut to close popup. */
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape')
				display('none');
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (process.env.NEXT_PUBLIC_MAINTENANCE && process.env.NEXT_PUBLIC_MAINTENANCE[2] === '1') {
		return (
			<>
				<Head />
				<Maintenance mode='standard'/>
			</>
		)
	}

	return (
		<>
			<Head />
			<Header display={display} mode='standard' />
			<GameContainer
				context={context}
				color={color}
				mode='standard'
				onEnd={onEnd}
			/>
			<Footer build={build} />
			<ResultsContainer
				attempts={attempts}
				close={() => display('none')}
				displayed={showResults}
			/>
			<Guide
				close={() => display('none')}
				displayed={showGuide}
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
			colors
		}
	};
}