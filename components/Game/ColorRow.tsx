import { ReactElement, useRef } from 'react';
import ColorRowProps from '../../interfaces/Game/ColorRowProps';
import ColorDisplayer from './ColorDisplayer';
import GuessCell from './GuessCell';
import GuessInput from './GuessInput';

/**
 * A row of color values.
 */
const ColorRow = ({ correct, guesses, index, status, submitGuess }: ColorRowProps): ReactElement => {
	// Refs to the input elements.
	// Any of these can be unused if some colors are locked.
	// Defined here because next refuses conditional refs.
	const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
	switch (status) {
		case 'past': {
			const guess = guesses[index];
			return (
				<div className='flex flex-row items-center justify-center my-3'>
					{
						guess!.map((value, i) => (
							<GuessCell expected={correct[i]} guess={value} />
						))
					}
					<div className='mx-2'>
						<ColorDisplayer color={guess!} size={48} />
					</div>
				</div>
			);
		}
		case 'current': {
			const onSubmit = (): void => {
				const values = [-1, -1, -1];
				for (const i in refs) {
					if (refs[i].current) {
						const v = parseInt(refs[i].current!.value); // why tf do i get ts 2532 without the !, i specifically do a non-null check. Fucking language.
						if (isNaN(v) || v < 0 || v > 255)
							refs[i].current!.style.borderColor = '#ff0000';
						else {
							refs[i].current!.style.borderColor = '';
							values[i] = v;
						}
					}
					else // If this ref has no current value, it is necesarrly because the value is locked. We can safely give out the correct value.
						values[i] = correct[i];
				}
				if (!values.includes(-1))
					submitGuess(values);
			}
			return (
				<div className='flex flex-row items-center justify-center my-3'>
					{
						refs.map((ref, i) => (
							guesses[index - 1] && guesses[index - 1][i] === correct[i] ?
								<GuessCell expected={correct[i]} guess={correct[i]} />
								:
								<GuessInput ref={ref} onSubmit={onSubmit} />
						))
					}
					<button
						className='flex flex-col items-center justify-center mx-2 rounded w-12 h-12 text-white text-xs font-title bg-slate-800 dark:bg-gray-50 dark:text-slate-800 
							focus-visible:border-[3px] focus-visible:border-orange-500 outline-none active:translate-y-[1px]'
						onClick={onSubmit}
					>
						Enter
					</button>
				</div>
			);
		}
		case 'upcoming': {
			return (
				<div className='flex flex-row items-center justify-center my-3 print:hidden'>
					<GuessCell inactive={true} expected={0} />
					<GuessCell inactive={true} expected={0} />
					<GuessCell inactive={true} expected={0} />
					{/* For alignment */}
					<div className='mx-2 opacity-0'>
						<ColorDisplayer color={[0, 0, 0]} size={48} />
					</div>
				</div>
			);
		}
	}
}
export default ColorRow;