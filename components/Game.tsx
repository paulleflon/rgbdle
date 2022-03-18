import { ReactElement } from 'react';
import GameProps from '../interfaces/GameProps';
import ColorDisplayer from './ColorDisplayer';
import ColorRow from './ColorRow';

/**
 * Functional component for the RGBdle game.
 */
const Game = ({ about, color, ended, lock, mania, submitGuess, guesses }: GameProps): ReactElement => {
	const rows = Array(10).fill('');
	return (
		<div className='py-6'>
			<ColorDisplayer
				about={about}
				color={color}
				mania={mania}
				showRgb={false}
			/>
			<div
				className='mt-2 flex flex-row justify-center h-6'
			>
				{
					['R', 'G', 'B'].map(c => 
						<div className='mx-2 w-12 text-center font-title text-xl' key={c}>
							{c}
						</div>
						)
				}
				<div className='mx-2 w-12 h-12'></div> {/* Simulates the 'Enter' button for alignment */}
			</div>
			{
				rows.map((_, i) => (
					guesses.length > i
						?
						<ColorRow
							correct={color.rgb}
							key={i}
							guess={guesses[i]}
							status='past'
							submitGuess={submitGuess}
						/>
						:
						guesses.length === i && !ended
							?
							<ColorRow
								correct={color.rgb}
								key={i}
								lock={lock}
								status='current'
								submitGuess={submitGuess}
							/>
							:
							<ColorRow
								correct={color.rgb}
								key={i}
								status='upcoming'
								submitGuess={submitGuess}
							/>
				))
			}
			{
				ended &&
				/* Who the fuck would print RGBdle results? I'm wondering too. But just in case. */
				<div className='hidden print:block text-center text-black'>
					Answer: <span className='font-title'>{color.rgb.join(', ')}</span>
				</div>
			}
		</div>
	);
}

export default Game;