import ColorInfo from './ColorInfo';

interface ColorDisplayerProps {
	/**
	 * The info about the color to display.
	 */
	color: ColorInfo;
	/**
	 * Whether to show the answer.  
	 * `false` when this component is used in the `Game` component.  
	 * `true` when this component is used in the `Results` component.
	 */
	showRgb: boolean;
}

export default ColorDisplayerProps;