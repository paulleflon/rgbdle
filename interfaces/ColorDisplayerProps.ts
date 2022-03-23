import ColorInfo from './ColorInfo';

interface ColorDisplayerProps {
	/**
	 * Elements embedded in the component. The context is automatically displayed and doesn't need to be included in this prop.
	 */
	children?: JSX.Element | JSX.Element[] | string;
	/**
	 * Context about the color if there is any.
	 */
	context?: string;
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