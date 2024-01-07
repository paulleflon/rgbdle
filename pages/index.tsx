import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, parse } from 'path';
import { useEffect, useState } from 'react';
import Footer from '../components/Common/Footer';
import Guide from '../components/Common/Guide';
import Head from '../components/Common/Head';
import Header from '../components/Common/Header';
import Maintenance from '../components/Common/Maintenance';
import GameContainer from '../components/Game/GameContainer';
import ResultsContainer from '../components/Results/ResultsContainer';
import ColorInfo from '../interfaces/ColorInfo';
import RGBdleProps from '../interfaces/RGBdleProps';

const Home = ({ build }: RGBdleProps) => {
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
	const onEnd = (guesses: number[][], correct: ColorInfo): void => {
		const count = guesses.at(-1)?.toString() === correct.rgb.toString() ? guesses.length : -1;
		setAttempts([...attempts, count]);
		localStorage.setItem('RGBDLE_ATTEMPTS', JSON.stringify([...attempts, count]));
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

	// Array storing the amount of guesses ([1;10]) submitted by the user for each game they have played.
	// -1 means they didn't find the color after 10 attempts in that game.
	const [attempts, setAttempts] = useState<number[]>([]);
	const [showGuide, setShowGuide] = useState(false);
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
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

	if (process.env.NEXT_PUBLIC_MAINTENANCE && process.env.NEXT_PUBLIC_MAINTENANCE[1] === '1') {
		return (
			<>
				<Head />
				<Maintenance mode='standard' />
			</>
		)
	}
	return (
		<>
			<Head />
			<Header display={display} mode='standard' />
			<GameContainer
				mode='standard'
				onEnd={onEnd}
			/>
			<Footer build={build} />
			<Guide
				close={() => setShowGuide(false)}
				displayed={showGuide}
			/>
			<ResultsContainer
				attempts={attempts}
				close={() => display('none')}
				displayed={showResults}
			/>
		</>
	);
}
export default Home;

export function getStaticProps(): { props: RGBdleProps } {
	// Build data
	const commit = execSync('git rev-parse HEAD').toString().trim();
	const version = require('../package.json').version;
	const date = new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
	return {
		props: {
			build: { commit, date, version },
		}
	};
}