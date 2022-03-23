import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';
import GuessCellProps from '../../interfaces/Game/GuessCellProps';

/**
 * Displays one value of a user's previous guess.
 */
function GuessCell({ expected, guess, inactive }: GuessCellProps) {
	let backgroundColor;
	let valueIndicator;
	if (!inactive) {
		backgroundColor = (expected === guess) ? '#49da1e' : (expected < guess!) ? '#e9900a' : '#da1e8d';
		// The MdDone icon looks too big in size 24, but we have to give all icons the same size for alignment.
		valueIndicator = (expected === guess) ? <MdDone size={24} className='scale-[0.9]' /> : (expected < guess!) ? <HiMinusSm size={24} /> : <HiOutlinePlusSm size={24} />;
	}
	return (
		<div
			className='flex flex-col items-center justify-center mx-2 rounded w-12 h-12 font-title text-center text-white'
			style={{ backgroundColor: backgroundColor || '#D1D5DB' }}
		>
			{inactive ||
				<>
					{valueIndicator}
					<div className='font-body'>
						{guess
						}
					</div>
				</>
			}
		</div>
	);
}
export default GuessCell;