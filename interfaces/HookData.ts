/**
 * Data to send to the /sendGame API route.
 */
interface HookData {
	/**
	 * The correct RGB values of this game.
	 */
	correct: number[];
	/**
	 * The guesses made by the user.
	 */
	guesses: number[][];
	/**
	 * The day of the game.
	 */
	day: number;
	/**
	 * The name of the color.
	 */
	name: string;
}
export default HookData;