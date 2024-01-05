import BuildInfo from './BuildInfo';
import ColorInfo from './ColorInfo';

interface RGBdleProps {
	/**
	 * Data about the current build.
	 */
	build: BuildInfo;
	/**
	 * Context about the color if there is any.
	 */
	context?: string;
}
export default RGBdleProps;