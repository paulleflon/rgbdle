import { useEffect, useRef, useState } from 'react';
import { FaRegClipboard } from 'react-icons/fa';
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
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const gradientCopyRef = useRef<HTMLSpanElement>(null);
	const shareIconRef = useRef<HTMLDivElement>(null);
	const checkIconRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearTimeout(timer);
	});

	useEffect(() => {
		if (!guesses?.length)
			return;
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d');
			if (!ctx)
				return;
			const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current.height);
			for (const i in guesses) {
				const guess = guesses[i];
				gradient.addColorStop(parseInt(i) / guesses.length, `rgba(${guess[0]}, ${guess[1]}, ${guess[2]})`);
			}
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		}
	}, [guesses]);

	const distribution = Array(10).fill(0);
	const clearAttempts = attempts.filter(attempt => attempt > 0 && attempt <= 10);
	for (const v of attempts) {
		if (v !== -1)
			distribution[v - 1]++;
	}
	// To avoid division by 0.
	if (clearAttempts.length === 0)
		clearAttempts.push('Never gonna give you up' as any as number); // I do what I want and I will put string in number array.

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

	const copyGradient = () => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;
		canvas.toBlob(blob => {
			if (blob) {
				navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
				if (!gradientCopyRef.current)
					return;
				gradientCopyRef.current.innerText = 'Copied!';
				setTimeout(() => {
					gradientCopyRef.current!.innerText = 'Click to copy';
				}, 2000);
			}
		});
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
						mania={false}
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
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Statistics</div>
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
						{Math.round(attempts.filter(a => a !== -1).length / attempts.length * 100)}%
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
			<div className='my-4 text-lg md:text-2xl text-center font-title'>Guess Distribution</div>
			{
				attempts.length
					?
					<div className='flex justify-center my-2'>
						<div className='flex flex-row items-bottom justify-baseline border border-slate-500 w-[300px] max-w-[90%] h-[300px] overflow-x-auto'>
							{
								Array(10).fill(0).map((_, i) =>
									<div
										className='flex shrink-0 flex-col mt-auto justify-center items-center bottom-0 w-[10%] min-w-[29px] bg-cyan-500 overflow-y-hidden'
										key={i}
										title={`You won ${distribution[i]} games in ${i + 1} attempts. (${(distribution[i] / clearAttempts.length * 100).toFixed(2)}%)`}
										style={distribution[i] === 0 ?
											{
												height: 50,
												backgroundColor: 'transparent'
											} :
											{
												height: `${Math.min(distribution[i] / clearAttempts.length * 200, 100)}%`,
											}}
									// Tailwind arbitrary values can't be used with such volatile CSS.
									>
										<div className='cursor-default font-title text-xs'>{i + 1}</div>
										<div className='cursortext-2xl md:-default font-body text-sm'>{distribution[i]}</div>
									</div>
								)}
						</div>

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
						<div
							className='w-11/12 rounded overflow-hidden cursor-pointer'
							onClick={copyGradient}
						>
							<canvas
								ref={canvasRef}
								className='object-fit w-full'
								width={1920}
								height={1080}
							/>
							<div
								className='absolute top-0 left-0 w-full h-full flex justify-center items-center
								bg-black/40 font-title text-xl md:text-4xl
								opacity-0 hover:opacity-100 transition-opacity duration-100'
							>
								<FaRegClipboard className='mr-2' />
								<span ref={gradientCopyRef}>Click to copy</span>
							</div>
						</div>
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
