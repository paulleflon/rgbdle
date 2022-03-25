import BuildInfo from './BuildInfo';
import ColorInfo from './ColorInfo';

interface RGBdleProps {
	/**
	 * Data about the current build.
	 */
	build: BuildInfo;
	/*
	* All colors to play from this day.
	*/
	colors: Record<string, ColorInfo>;
	/**
	 * Context about the color if there is any.
	 */
	context?: string;
}
export default RGBdleProps;