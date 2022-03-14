import ColorInfo from './ColorInfo';

interface RGBdleProps {
	/**
	 * Context about the color if there is any.
	 */
	about?: string;
	/*
	 * All colors to play from this day.
	*/
	colors: Record<string, ColorInfo>;
}
export default RGBdleProps;