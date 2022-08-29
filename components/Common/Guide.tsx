import { ReactElement } from 'react';
import PopupProps from '../../interfaces/Common/PopupProps';
import ColorRow from '../Game/ColorRow';
import Popup from './Popup';

const Guide = ({ close, displayed }: PopupProps): ReactElement => {
	return (
		<Popup
			close={close}
			displayed={displayed}
		>
			<div className='text-center'>
				<div className='font-title text-sm md:text-2xl'>
					Guess the RGBDLE in 10 tries!
				</div>
				<div className='my-4 text-xs md:text-lg leading-5'>
					<div>
						In computers, colors are represented by a combination of three values: red, green, and blue.
						Each of them is an integer between 0 and 255.
					</div>
					<div className='font-bold'>
						Your mission is to guess the three values required to generate the given color.
					</div>
					<div className='w-[90%] mx-[5%] my-4 h-px bg-slate-500'></div>
					<div className='font-title text-sm md:text-2xl'>
						Example
					</div>
					<div className='text-sm'>
						<div
							className='mt-2 flex flex-row justify-center items-center h-6'
						>
							{
								['R', 'G', 'B'].map(c =>
									<div className='mx-2 w-12 text-center font-title text-xl' key={c}>
										{c}
									</div>
								)
							}
							<div className='mx-2 w-12 text-sm font-title'>
								Result
							</div>
						</div>
						<ColorRow
							correct={[25, 125, 225]}
							guesses={[[25, 150, 200]]}
							index={0}
							status='past'
							submitGuess={(): void => {}}
						/>
					</div>
					<div>
						Here, the correct values are 25, 125 and 225, and they make <span className='font-bold text-[#1996C8]'>Pacific Blue</span>.
					</div>
					<div>
						So, a <span className='font-bold text-[#49da1e]'>GREEN</span> cell means <span className='font-bold'>CORRECT</span>.
					</div>
					<div>
						An <span className='font-bold text-[#e9900a]'>ORANGE</span> cell means <span className='font-bold'>LOWER</span>.
					</div>
					<div>
						A <span className='font-bold text-[#da1e8d]'>MAGENTA</span> cell means <span className='font-bold'>HIGHER</span>.
					</div>
				</div>
			</div>
		</Popup>

	);
}
export default Guide;
