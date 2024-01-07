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
						In computers, colors are usually represented as a combination of three values:
					</div>
					<div>
						<b className='text-[#ff2e2e]'> red</b>,
						<b className='text-[#3bdb40]'> green</b>, and
						<b className='text-[#3770db]'> blue</b>.
					</div>
						Each value is an integer between <b>0</b> and <b>255</b>.
					<div className='font-bold bold'>
						Your goal is to guess the Red, Green, and Blue values of the given golor!
					</div>
					<div className='w-[90%] mx-[5%] my-4 h-px bg-slate-500'></div>
					<div className='font-title text-sm md:text-2xl'>
						Example
					</div>
					<div className='text-sm'>
						<div
							className='mt-2 flex flex-row justify-center items-center h-6'>
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
						<ColorRow
							correct={[25, 125, 225]}
							guesses={[[25, 125, 225]]}
							index={0}
							status='past'
							submitGuess={(): void => {}}
						/>
					</div>
					<div>
						A <span className='font-bold text-[#49da1e]'>GREEN</span> cell means the value is <span className='font-bold'>CORRECT</span>.
					</div>
					<div>
						An <span className='font-bold text-[#e9900a]'>ORANGE</span> cell means the correct value is <span className='font-bold'>LOWER</span>.
					</div>
					<div>
						A <span className='font-bold text-[#da1e8d]'>MAGENTA</span> cell means the correct value is <span className='font-bold'>HIGHER</span>.
					</div>
				</div>
			</div>
		</Popup>

	);
}
export default Guide;
