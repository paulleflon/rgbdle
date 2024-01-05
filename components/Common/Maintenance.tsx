import Link from 'next/link';

/**
 * Whole content of the app if it is under maintenance.
 */
const Maintenance = ({ mode }: { mode: 'standard' | 'versus' }) => {
	const modes = {
		// [Path, Page title]
		'standard': ['/', 'RGBdle'],
		// Versus will be added when it's actually implemented.
	}
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<div className='font-title text-lg md:text-4xl my-7'>{modes[mode as keyof typeof modes][1]} is currently under maintenance.</div>
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
						<div className='absolute bottom-2 text-center text-white/50 text-sm'>
							{
								Object.entries(modes).map(([k, v]) => (
									k !== mode && (
										<Link href={v[0]} key={k}>
											<a>{v[1]}</a>
										</Link>
									)
								))
							}
						</div>
					</>
				)
			}
		</div>
	);
}

export default Maintenance;