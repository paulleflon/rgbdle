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
	/*
	* All colors to play from this day.
	*/
	colors: Record<string, ColorInfo>;
	/**
	 * Context about the color if there is any.
	 */
	context?: string;
	/**
	 * The gamemode to use:
	 *  - `mania`: Mode where colors are randomly generated, as much as the user wants.
	 *  - `standard`: Mode with one color per day.
	 *  - `versus`: 1v1 mode where the user must guess the maxiumum amount of colors in a limited time. The user who guesses the highest amount of colors wins.
	 */
	mode: 'mania' | 'standard' | 'versus';
}
export default RGBdleProps;