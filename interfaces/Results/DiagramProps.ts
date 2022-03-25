/**
 * Props for `DiagramProps` component.
 */
interface DiagramProps {
	/**
	 * Array storing the amount of guesses ([1;10]) submitted by the user for each game they have played.
	 * -1 means they didn't find the color after 10 attempts in that game.
	 * If the user didn't finish a game, this game is not included in the array.
	 */
	attempts: number[];
}
export default DiagramProps;