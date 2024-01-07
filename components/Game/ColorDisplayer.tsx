import { ReactElement } from 'react';
import ColorDisplayerProps from '../../interfaces/Game/ColorDisplayerProps';

const ColorDisplayer = ({ color, children, size }: ColorDisplayerProps): ReactElement => {
	const contrastRatio = (color[0] + color[1] + color[2]) / (255 * 3);
	return (
		<div
			className='flex flex-col items-center justify-center rounded transition-colors duration-200'
			style={{
				backgroundColor: `rgb(${color.join(',')})`,
				color: contrastRatio > 0.5 ? 'black' : 'white',
				width: `${size}px`,
				height: `${size}px`
			}}
		>
			{children}
		</div>
	)
};
export default ColorDisplayer;