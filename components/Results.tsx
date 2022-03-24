import { useEffect, useRef, useState } from 'react';
import { IoMdCheckmark, IoMdShare } from 'react-icons/io';
import ResultsProps from '../interfaces/ResultsProps';
import ColorDisplayer from './Game/ColorDisplayer';
import Popup from './Popup';
import Diagram from './Results/Diagram';
import GuessGradient from './Results/GuessGradient';
import Statistics from './Results/Statistics';

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
						color={color.rgb}
						size={200}
					>
						<div className='font-default text-center'>Today's color was</div>
						<div className='font-title text-center'>rgb({color.rgb.join(', ')})</div>
					</ColorDisplayer>
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
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Statistics</div>
			<Statistics attempts={attempts} />
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Guess Distribution</div>
			{
				attempts.length
					?
					<div className='flex justify-center my-2'>
						<Diagram
							attempts={attempts}
						/>
					</div>
					:
					<div className='text-center'>
						No data.
					</div>
			}
			{
				ended &&
				<>
					<div className='my-4 text-lg md:text-2xl text-center font-title'>Guess Gradient</div>
					<div className='flex justify-center'>
						<GuessGradient guesses={guesses!} />
					</div>
				</>

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
