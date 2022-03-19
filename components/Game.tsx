import { ReactElement } from 'react';
import { BiRefresh } from 'react-icons/bi';
import GameProps from '../interfaces/GameProps';
import ColorDisplayer from './ColorDisplayer';
import ColorRow from './ColorRow';

/**
 * Functional component for the RGBdle game.
 */
const Game = ({ about, color, ended, guesses, lock, mania, refreshColor, submitGuess }: GameProps): ReactElement => {
	const rows = Array(10).fill('');
	return (
		<div className='py-6'>
			<ColorDisplayer
				about={about}
				color={color}
				mania={mania}
				showRgb={false}
			/>
			{
				mania &&
				<div className='flex justify-center my-2'>
					<div
						className='border-2 rounded-full border-white/80 p-1 cursor-pointer transition-colors duration-100 hover:bg-white/40'
						onClick={refreshColor}
						title='Get a new color'
					>
						<BiRefresh size={32} />
					</div>
				</div>
			}
			<div
				className='mt-2 flex flex-row justify-center items-center h-6'
			>
				{
					['R', 'G', 'B'].map(c =>
						<div className='mx-2 w-12 text-center font-title text-xl' key={c}>
							{c}
						</div>
					)
				}
				<div className='mx-2 w-12 text-sm font-title'>
					Result
				</div> {/* Simulates the 'Enter' button for alignment */}
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