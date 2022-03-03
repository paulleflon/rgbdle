import { useEffect, useRef, useState } from 'react';
import { IoMdCheckmark, IoMdShare } from 'react-icons/io';
import ResultsProps from '../interfaces/ResultsProps';
import ColorDisplayer from './ColorDisplayer';
import Popup from './Popup';

const calculateTimeLeft = () => {
	const now = new Date();
	const next = new Date();
	next.setDate(next.getDate() + 1);
	next.setHours(0);
	next.setMinutes(0);
	next.setSeconds(0);
	next.setMilliseconds(0);
	const diff = next.getTime() - now.getTime();
	let hours: string = '' + Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes: string = '' + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds: string = '' + Math.floor((diff % (1000 * 60)) / 1000);
	hours = hours.length === 1 ? '0' + hours : hours;
	minutes = minutes.length === 1 ? '0' + minutes : minutes;
	seconds = seconds.length === 1 ? '0' + seconds : seconds;
	return `${hours}:${minutes}:${seconds}`;
};

const Results = ({ attempts, close, color, displayed, ended, guesses }: ResultsProps) => {


	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const shareIconRef = useRef<HTMLDivElement>(null);
	const checkIconRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearTimeout(timer);
	});

	const distribution = Array(10).fill(0);
	const clearAttempts = attempts.filter(attempt => attempt > 0 && attempt <= 10);
	for (const v of attempts) {
		if (v !== -1)
			distribution[v - 1]++;
	}
	 // To avoid division by 0.
	if (clearAttempts.length === 0)
		clearAttempts.push('Never gonna give you up' as any as number); // I do what I want and I will put string in number array.

	const shareString = () => {
		const lastAttempt = attempts.at(-1);
		let str = `RGBdle ${color.day} ${lastAttempt === -1 ? 'X' : lastAttempt}/10`;
		for (const row of guesses!) {
			str += '\n';
			for (const j in row) {
				const c = row[j];
				str += c === color.rgb[j] ? '🟩' : c < color.rgb[j] ? '🟪' : '🟧';
			}
		}
		navigator.clipboard.writeText(str);
		shareIconRef.current!.classList.add('scale-0');
		checkIconRef.current!.classList.remove('scale-0');
		setTimeout(() => {
			shareIconRef.current!.classList.remove('scale-0');
			checkIconRef.current!.classList.add('scale-0');
		}, 2000);
	}
	return (
		<Popup
			close={close}
			displayed={displayed}
		>
			{
				ended &&
				<>
					<ColorDisplayer
						color={color}
						showRgb={true}
					/>
					<div className='text-center'>
						{attempts.at(-1) === -1
							?
							'You didn\'t guess it.'
							:
							`You guessed it in ${attempts.at(-1)} attempt${attempts.at(-1)! > 1 ? 's' : ''}.`
							// Actually if you guess it in 1 try you probably cheated so I shouldn't bother for you.
							// But you know, I'm a cool guy.
						}
					</div>
				</>
			}
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Guess Distribution</div>
			{
				attempts.length
					?
					<div className='flex justify-center my-2'>
						<div className='relative border border-slate-500 w-[300px] max-w-[90%] h-[300px] overflow-x-auto'>
							{
								Array(10).fill(0).map((_, i) =>
									<div
										className='absolute flex flex-col justify-center items-center bottom-0 w-[30px] bg-cyan-500'
										key={i}
										title={`You won ${distribution[i]} games in ${i + 1} attempts. (${(distribution[i] / clearAttempts.length * 100).toFixed(2)}%)`}
										style={{
											// 30px causes a permanent overflow. 29.7 is hardly noticed  and fixes the overflow.
											left: `${i * 29.7}px`,
											// * 200 because with 100, the bars look to small. For attempt arrays of length 1, we make sure not to
											// go above 100%.
											height: `${distribution[i] / clearAttempts.length * 100}%`,
											// This fixes the position of bars with a height of 0.
											bottom: distribution[i] === 0 ? '20px' : ''
										}} // Tailwind arbitrary values can't be used with such volatile CSS.
									>
										<div className='cursor-default font-title text-xs'>{i + 1}</div>
										<div className='cursor-default font-body text-sm'>{distribution[i]}</div>
									</div>
								)
							}
						</div>

					</div>
					:
					<div className='text-center'>
						No data.
					</div>
			}
			<div className='relative flex flex-col md:flex-row justify-center items-center my-4'>
				<div className='text-center'>
					<div className='font-title text-lg md:text-2xl'>Next RGBdle</div>
					<div className='font-[Arial] text-2xl md:text-3xl'>
						{timeLeft}
					</div>
				</div>
				{
					ended &&
					<>
						<div className='my-4 md:my-0 md:mx-10 w-1/2 h-px md:w-px md:h-24 bg-slate-500 z-50'></div>
						<button
							className='flex flex-row items-center rounded bg-green-500 px-4 py-2 text-lg text-gray-50 md:text-2xl
								focus-visible:bg-orange-500 outline-none'
							onClick={shareString}
						>
							<div className='flex justify-center items-center pl-2 pr-5'>
								<div className='absolute motion-reduce:transition-none transition-transform duration-150' ref={shareIconRef}>
									<IoMdShare></IoMdShare>
								</div>
								<div className='absolute scale-0 motion-reduce:transition-none transition-transform duration-150' ref={checkIconRef}>
									<IoMdCheckmark></IoMdCheckmark>
								</div>
							</div>
							<span>Share</span>
						</button>
					</>
				}
			</div>
		</Popup>
	);
}
export default Results;
