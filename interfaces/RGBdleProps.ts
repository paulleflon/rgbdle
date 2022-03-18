import ColorInfo from './ColorInfo';

interface RGBdleProps {
	/**
	 * Data about the current build.
	 */
	build: {
		/**
		 * The hash of the commit that was used to build the current version.
		 */
		commit: string;
		/**
		 * The UTC date string of the date that the build was created.
		 */
		date: string;
		/**
		 * The sementic version of the current build.
		 */
		version: string;
	};
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