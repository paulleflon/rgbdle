import StatisticsProps from '../../interfaces/Results/StatisticsProps';

/**
 * Displays statistics about the user's games.
 */
const Statistics = ({ attempts }: StatisticsProps) => {
	let currentStreak = 0;
	attempts.reverse();
	for (const i of attempts) {
		if (i === -1)
			break;
		currentStreak++;
	}
	attempts.reverse();
	let bestStreak = 0;
	let currentBest = 0;
	for (const i of attempts) {
		if (i === -1) {
			if (currentBest > bestStreak)
				bestStreak = currentBest;
			currentBest = 0;
		}
		else
			currentBest++;
	}
	if (currentBest > bestStreak)
		bestStreak = currentBest;

	return (
		<div className='flex flex-row justify-center text-center'>
			<div className='mx-1 sm:mx-4'>
				<div className='text-2xl md:text-5xl font-title'>
					{attempts.length}
				</div>
				<div className='text-xs md:text-sm'>
					Games played
				</div>
			</div>
			<div className='mx-1 sm:mx-4'>
				<div className='text-2xl md:text-5xl font-title'>
					{
						attempts.length ?
							Math.round(attempts.filter(a => a !== -1).length / attempts.length * 100) + '%'
							:
							'0'
					}
				</div>
				<div className='text-xs md:text-sm'>
					Wins
				</div>
			</div>
			<div className='mx-1 sm:mx-4'>
				<div className='text-2xl md:text-5xl font-title'>
					{currentStreak}
				</div>
				<div className='text-xs md:text-sm'>
					Current win streak
				</div>
			</div>
			<div className='mx-1 sm:mx-4'>
				<div className='text-2xl md:text-5xl font-title'>
					{bestStreak}
				</div>
				<div className='text-xs md:text-sm'>
					Best win streak
				</div>
			</div>
		</div>
	);
}
export default Statistics;