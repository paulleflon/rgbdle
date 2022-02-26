import { ReactElement, useRef } from 'react';
import ColorRowProps from '../interfaces/ColorRowProps';

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
			const displayedColors: string[] = Array(3)
				.fill('')
				.map((_, i) => (guess![i] === correct[i]) ? '#49da1e' : (guess![i] < correct[i]) ? '#da1e8d' : '#e9900a');
			return (
				<div className='color-row'>
					{
						guess!.map((value, i) => (
							<div
								className='color-row-cell'
								key={i}
								style={{ backgroundColor: displayedColors[i] }}
							>
								<div>
									{['R', 'G', 'B'][i]}
								</div>
								<div className='font-body'>
									{value}
								</div>
							</div>
						))
					}
					<div
						className='color-row-cell text-xs font-title'
						style={{ backgroundColor: `rgb(${guess![0]}, ${guess![1]}, ${guess![2]})` }}
						title={`This is what rgb(${guess![0]}, ${guess![1]}, ${guess![2]}) looks like!`}
					>
						Result
					</div>
				</div>
			);
		}
		case 'current': {
			const onSubmit = (): void => {
				const values: [number, number, number] = [-1, -1, -1];
				for (const i in refs) {
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
								<div className='color-row-cell bg-[#49da1e]' key={i}>
									<div>
										{['R', 'G', 'B'][i]}
									</div>
									<div className='font-body'>
										{correct[i]}
									</div>
								</div>
								:
								<input
									autoComplete='off'
									className='color-row-cell outline-none border-[3px] border-slate-600 dark:border-gray-500 bg-gray-50 focus:border-orange-500 
										font-body text-slate-800'
									data-lpignore={true}
									data-form-type='other'
									key={i}
									min={0}
									max={255}
									pattern='\d*'
									ref={ref}
									type='number'
								/>
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
					{
						// Array of length 3
						correct.map((_, i) =>
							<div className='color-row-cell bg-slate-800 dark:bg-gray-50' key={i}></div>
						)
					}
					<div className='color-row-cell bg-transparent'></div> {/* For alignment. */}
				</div>
			);
		}
	}
}
export default ColorRow;