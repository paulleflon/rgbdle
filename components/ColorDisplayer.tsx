import { ReactElement, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import ColorDisplayerProps from '../interfaces/ColorDisplayerProps';

const ColorDisplayer = ({ context, color, children, size }: ColorDisplayerProps): ReactElement => {
	const [aboutDisplayed, setAboutDisplayed] = useState(false);
	const contrastRatio = (color[0] + color[1] + color[2]) / (255 * 3);
	return (
		<div
			className='flex flex-col items-center justify-center rounded transition-colors duration-200'
			onMouseLeave={() => setAboutDisplayed(false)}
			style={{
				backgroundColor: `rgb(${color.join(',')})`,
				color: contrastRatio > 0.5 ? 'black' : 'white',
				width: `${size}px`,
				height: `${size}px`
			}}
		>
			{context && (
				<>
					<div
						className='absolute top-2 right-2 cursor-pointer'
						onMouseEnter={() => setAboutDisplayed(true)}
					>
						<FaQuestionCircle color={contrastRatio > 0.5 ? 'black' : 'white'}></FaQuestionCircle>
					</div>
					<span
						className='absolute text-center text-xs md:text-lg transition-opacity duration-75'
						dangerouslySetInnerHTML={{ __html: context }}
						style={aboutDisplayed ?
							{ opacity: 1, pointerEvents: 'all' } :
							{ opacity: 0, pointerEvents: 'none' }
						}
					></span>
				</>
			)}
			{children}
		</div>
	)
};
export default ColorDisplayer;