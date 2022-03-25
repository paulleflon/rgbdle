import { useState } from 'react';
import Footer from '../components/Common/Footer';
import Head from '../components/Common/Head';
import Header from '../components/Common/Header';
import GameContainer from '../components/Game/GameContainer';
import Guide from '../components/Guide';
import ColorInfo from '../interfaces/ColorInfo';
import RGBdleProps from '../interfaces/RGBdleProps';
import { getStaticProps as _getStaticProps } from './index';

const Mania = ({ context, build, colors }: RGBdleProps) => {
	// a bit WET..
	const display = (component: 'none' | 'results' | 'guide'): void => {
		switch (component) {
			case 'none':
				setShowGuide(false);
				break;
			case 'guide':
				setShowGuide(true);
				break;
		}
	}
	const onEnd = (guesses: number[][], correct: ColorInfo): void => {
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

	const [showGuide, setShowGuide] = useState(false);

	return (
		<>
			<Head />
			<Header display={display} mode='mania' />
			<GameContainer
				context={context}
				mode='mania'
				onEnd={onEnd}
			/>
			<Footer build={build} />
			<Guide
				close={() => setShowGuide(false)}
				displayed={showGuide}
			/>
		</>
	);
}
export default Mania;


export function getStaticProps(): { props: RGBdleProps } {
	return _getStaticProps();
}
