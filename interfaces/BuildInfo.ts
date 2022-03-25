/**
 * Data about the current build.
 */
interface BuildInfo {
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
export default BuildInfo;