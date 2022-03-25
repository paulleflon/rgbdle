/**
 * Informations about the color to guess.
 */
interface ColorInfo {
	/**
	 * The rgb values of the color.
	 */
	rgb: number[];
	/**
	 * The english name of the color.
	 */
	name: string;
	/**
	 * The amount of days since the first game this color comes.
	 */
	day: number;
}
export default ColorInfo;