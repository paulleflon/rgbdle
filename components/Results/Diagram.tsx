import DiagramProps from '../../interfaces/Results/DiagramProps'

/**
 * Diagram representing the distribution of the amount of guesses submitted in every user's game.
 */
const Diagram = ({ attempts }: DiagramProps) => {
	const distribution = Array(10).fill(0);
	const clearAttempts = attempts.filter(attempt => attempt > 0 && attempt <= 10);
	for (const v of attempts) {
		if (v !== -1)
			distribution[v - 1]++;
	}
	// To avoid division by 0.
	if (clearAttempts.length === 0)
		clearAttempts.push('Never gonna give you up' as any as number);
	return (
		<div className='flex flex-row items-bottom justify-baseline border border-slate-500 w-[300px] max-w-[90%] h-[300px] overflow-x-auto'>
			{
				distribution.map((v, i) =>
					<div
						className='flex shrink-0 flex-col mt-auto justify-center items-center bottom-0 w-[10%] min-w-[29px] bg-cyan-500 overflow-y-hidden'
						key={i}
						title={`You won ${v} games in ${i + 1} attempts. (${(v / clearAttempts.length * 100).toFixed(2)}%)`}
						style={v === 0 ?
							{
								height: 50,
								backgroundColor: 'transparent'
							} :
							{
								height: `${Math.min(v / clearAttempts.length * 200, 100)}%`,
							}}
					// Tailwind arbitrary values can't be used with such volatile CSS.
					>
						<div className='cursor-default font-title text-xs'>{i + 1}</div>
						<div className='cursortext-2xl md:-default font-body text-sm'>{distribution[i]}</div>
					</div>
				)}
		</div>
	)
}
export default Diagram;