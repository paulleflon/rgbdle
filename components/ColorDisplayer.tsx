import { ReactElement } from 'react';
import ColorDisplayerProps from '../interfaces/ColorDisplayerProps';

const ColorDisplayer = ({ color, showRgb }: ColorDisplayerProps): ReactElement => {

	const contrastRatio = (color.rgb[0] + color.rgb[1] + color.rgb[2]) / (255 * 3);
	return (
		<div className='flex justify-center'>
			<div
				className='flex flex-col items-center justify-center rounded my-2
			w-32 h-32 md:w-48 md:h-48 text-center'
				style={{
					backgroundColor: `rgb(${color.rgb.join(',')})`,
					color: contrastRatio > 0.5 ? 'black' : 'white'
				}}
			>
				<div className='font-body text-xs md:text-lg md:mb-2'>
					{showRgb ? 'Today\'s color was' : 'Today\'s color is'}
				</div>
				<div className='font-title text-sm lg:text-xl'>
					{showRgb ? `rgb(${color.rgb.join(', ')})` : color.name}
				</div>
			</div>
		</div>
	)
};
export default ColorDisplayer;