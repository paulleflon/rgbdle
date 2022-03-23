import ColorInfo from './ColorInfo';
import PopupProps from './PopupProps';

/**
 * Props for `Results` component.
 */
interface ResultsProps extends PopupProps {
	/**
	 * Array storing the amount of guesses ([1;10]) submitted by the user for each game they have played.
	 * -1 means they didn't find the color after 10 attempts in that game.
	 * If the user didn't finish a game, this game is not included in the array.
	 */
	attempts: number[];
	/**
	 * The color to guess.
	 */
	color: ColorInfo;
	/**
	 * Whether the game is over.
	 * If the game isn't over, we don't show the answer in the Results component.
	 */
	ended: boolean;
	/**
	 * All the guesses of today's game, if played.
	 */
	guesses?: number[][];
}
export default ResultsProps;