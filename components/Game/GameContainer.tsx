import { ReactElement, useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import GameContainerProps from '../../interfaces/Game/GameContainerProps';
import GuessGradient from '../Results/GuessGradient';
import ColorDisplayer from './ColorDisplayer';
import ColorRow from './ColorRow';

/**
 * Contains all the game logic and interface.
 */
const GameContainer = ({ color: propColor, context, mode, onEnd }: GameContainerProps): ReactElement => {
	const refreshColor = () => {
		// Resetting the state to welcome the new color.
		setGuesses([]);
		setIsEnded(false);
		// Setting a new color to guess.
		const random = () => Math.floor(Math.random() * 255);
		const rgb = [random(), random(), random()];
		const day = -25;
		setColor({ rgb, name: '...', day });
		// Fetching the color name in a non-blocking way.
		let name: string;
		fetch('https://www.thecolorapi.com/id?rgb=' + rgb.join(','))
			.then(res => res.json())
			.then(res => name = res.name.value)
			.catch(_ => name = 'Random color')
			.finally(() => setColor({ rgb, name, day }));
	}
	const submitGuess = (guess: number[]): void => {
		let correct = 0;
		setGuesses((prev) => [...prev, guess]);
		for (const [i, v] of guess.entries()) {
			if (v === color.rgb[i])
				correct++;
		}
		if (correct === 3)
			endGame([...guesses, guess]);
		else if (guesses.length + 1 === 10) // +1 because the length is not yet updated as state is async.
			endGame([...guesses, guess]);

		if (mode === 'standard') {
			localStorage.setItem('RGBDLE_SAVE', JSON.stringify({
				day: color.day,
				ended: correct === 3 || guesses.length + 1 === 10,
				guesses: [...guesses, guess]
			}));
		}
	};

	const endGame = async (guesses: number[][]): Promise<void> => {
		setIsEnded(true);
		onEnd(guesses, color);
	}

	const [color, setColor] = useState((mode === 'standard' && propColor) || { rgb: [4, 20, 69], name: 'Loading...', day: 69420 });
	const [guesses, setGuesses] = useState<number[][]>([]);
	const [isEnded, setIsEnded] = useState(false);

	useEffect(() => {
		if (!propColor || mode !== 'standard')
			refreshColor();
		if (mode === 'standard') {

			const save = JSON.parse(localStorage.getItem('RGBDLE_SAVE') || '{}') as any;
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
				setIsEnded(save.ended);
			} else {
				localStorage.setItem('RGBDLE_SAVE', '');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='py-6'>
			<div className='flex justify-center my-4'>
				<ColorDisplayer
					context={context}
					color={color.rgb}
					size={200}
				>
					<div className='font-default text-center'>{mode === 'mania' ? 'You have to guess' : 'Today\'s color is'</div>
					<div className='font-title text-center'>{color.name}</div>
				</ColorDisplayer>
			</div>
			{
				mode === 'mania' &&
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
				</div>
			</div>
			{
				Array(10).fill(null).map((_, i) => (
					guesses.length > i
						?
						<ColorRow
							correct={color.rgb}
							guesses={guesses}
							index={i}
							key={i}
							status='past'
							submitGuess={submitGuess}
						/>
						:
						guesses.length === i && !isEnded
							?
							<ColorRow
								correct={color.rgb}
								guesses={guesses}
								index={i}
								key={i}
								status='current'
								submitGuess={submitGuess}
							/>
							:
							<ColorRow
								correct={color.rgb}
								guesses={guesses}
								index={i}
								key={i}
								status='upcoming'
								submitGuess={submitGuess}
							/>
				))
			}
			{
				isEnded && mode === 'mania' && guesses.at(-1) !== color.rgb &&
				<ColorRow
					correct={color.rgb}
					guesses={[color.rgb]}
					index={0}
					status='past'
					submitGuess={submitGuess}
				/>
			}
			{
				isEnded &&
				<>
					<div className='my-4 text-lg md:text-2xl text-center font-title'>Guess Gradient</div>
					<div className='flex justify-center'>
						<div className='w-1/2 flex justify-center'>
							<GuessGradient guesses={guesses!} />
						</div>
					</div>
				</>
			}
			{
				isEnded &&
				/* Who the fuck would print RGBdle results? I'm wondering too. But just in case. */
				<div className='hidden print:block text-center text-black'>
					Answer: <span className='font-title'>{color.rgb.join(', ')}</span>
				</div>
			}
		</div>
	);
}

export default GameContainer;
