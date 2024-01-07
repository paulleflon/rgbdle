import ColorInfo from '../ColorInfo';

interface ColorDisplayerProps {
	/**
	 * Elements embedded in the component.
	 */
	children?: JSX.Element | JSX.Element[] | string;
	/**
	 * The color to display.
	 */
	color: number[];
	/**
	 * The size in px of the component. (1:1 aspect ratio)
	 */
	size: number;
}

export default ColorDisplayerProps;