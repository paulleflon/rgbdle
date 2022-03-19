import { ReactElement, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import ColorDisplayerProps from '../interfaces/ColorDisplayerProps';

const ColorDisplayer = ({ about, color, mania, showRgb }: ColorDisplayerProps): ReactElement => {
	const [aboutDisplayed, setAboutDisplayed] = useState(false);
	const contrastRatio = (color.rgb[0] + color.rgb[1] + color.rgb[2]) / (255 * 3);
	return (
		<div
			className='flex justify-center'
		>
			<div
				className='flex flex-col items-center justify-center rounded my-2
				w-32 h-32 md:w-48 md:h-48 text-center transition-colors duration-200'
				onMouseLeave={() => setAboutDisplayed(false)}
				style={{
					backgroundColor: `rgb(${color.rgb.join(',')})`,
					color: contrastRatio > 0.5 ? 'black' : 'white'
				}}
			>
				{about && !showRgb && (
					<>
						<div
							className='absolute top-2 right-2 cursor-pointer'
							onMouseEnter={() => setAboutDisplayed(true)}
						>
							<FaQuestionCircle color={contrastRatio > 0.5 ? 'black' : 'white'}></FaQuestionCircle>
						</div>
						<span
							className='absolute text-center text-xs md:text-lg transition-opacity duration-75'
							dangerouslySetInnerHTML={{ __html: about }}
							style={aboutDisplayed ?
								{ opacity: 1, pointerEvents: 'all' } :
								{ opacity: 0, pointerEvents: 'none' }
							}
						></span>
					</>
				)}
				<div className='font-body text-xs md:text-lg md:mb-2 transition-opacity duration-75' style={aboutDisplayed ? { opacity: 0 } : { opacity: 1 }}>
					{mania ? 'You have to guess' : showRgb ? 'Today\'s color was' : 'Today\'s color is'}
				</div>
				<div className='font-title text-sm lg:text-xl transition-opacity duration-75' style={aboutDisplayed ? { opacity: 0 } : { opacity: 1 }}>
					{showRgb ? `rgb(${color.rgb.join(', ')})` : color.name}
				</div>
			</div>
		</div>
	)
};
export default ColorDisplayer;