import { useEffect, useRef } from 'react';
import { FaRegClipboard } from 'react-icons/fa';
import GuessGradientProps from '../../interfaces/Results/GuessGradientProps';

const GuessGradient = ({ guesses }: GuessGradientProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const gradientCopyRef = useRef<HTMLSpanElement>(null);

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


	const copyGradient = () => {
		const canvas = canvasRef.current;
		if (!canvas || typeof ClipboardItem === 'undefined')
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
		<div
			className={'w-11/12 rounded overflow-hidden' + (typeof ClipboardItem !== 'undefined' ? ' cursor-pointer' : '')}
			onClick={copyGradient}
		>
			<canvas
				ref={canvasRef}
				className='object-fit w-full'
				width={1920}
				height={1080}
			/>
			{
				typeof ClipboardItem !== 'undefined' ?
					<div
						className='absolute top-0 left-0 w-full h-full flex justify-center items-center
					bg-black/40 font-title text-xl md:text-4xl
					opacity-0 hover:opacity-100 transition-opacity duration-100'
					>
						<FaRegClipboard className='mr-2' />
						<span ref={gradientCopyRef}>Click to copy</span>
					</div>
					:
					<div
						className='font-title text-xs text-center my-2'
					>
						Right click to copy
					</div>
			}
		</div>
	);
}
export default GuessGradient;