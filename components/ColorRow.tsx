import { ReactElement, useRef } from 'react';
import { MdDone } from 'react-icons/md';
import ColorRowProps from '../interfaces/ColorRowProps';
import ColorDisplayer from './ColorDisplayer';
import GuessCell from './GuessCell';
import GuessInput from './GuessInput';

/**
 * A row of color values.
 */
const ColorRow = ({ correct, guess, lock, status, submitGuess }: ColorRowProps): ReactElement => {
	// Refs to the input elements.
	// Any of these can be unused if some colors are locked.
	// Defined here because next refuses conditional refs.
	const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

	switch (status) {
		case 'past': {
			return (
				<div className='color-row'>
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
				const values: [number, number, number] = [-1, -1, -1];
				for (const i in refs) {
					console.log(refs[i]);
					if (refs[i].current) {
						const v = parseInt(refs[i].current!.value); // why tf do i get ts 2532 without the !, i specifically do a non-null check. Fucking language.
						if (isNaN(v) || v < 0 || v > 255)
							refs[i].current!.classList.add('error');
						else {
							refs[i].current!.classList.remove('error');
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
				<div className='color-row'>
					{
						refs.map((ref, i) => (
							lock![i] ?
								<GuessCell expected={correct[i]} guess={correct[i]} />
								:
								<GuessInput ref={ref} onSubmit={onSubmit} />
						))
					}
					<button
						className='color-row-cell text-xs font-title bg-slate-800 dark:bg-gray-50 dark:text-slate-800 
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
				<div className='color-row print:hidden'>
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