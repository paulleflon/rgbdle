/**
 * Whole content of the app if it is under maintenance.
 */
const Maintenance = ({ mode }: { mode: 'mania' | 'standard' | 'versus' }) => {
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<div className='font-title text-lg md:text-4xl my-7'>RGBdle {mode !== 'standard' && mode.toUpperCase()} is currently under maintenance.</div>
			<div className='font-body text-lg md:text-3xl'>Please try again later!</div>
			{
				process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE &&
				(
					<>
						<div className='my-10 w-1/2 min-w-1/3 h-px bg-slate-500'></div>
						<div
							className='font-[monospace] text-sm md:text-xl text-center px-20'
							dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE }}
						>
						</div>
					</>
				)
			}
		</div>
	);
}

export default Maintenance;