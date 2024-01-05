import ColorInfo from '../ColorInfo';

/**
 * Props for `GameContainer` component.
 */
interface GameContainerProps {
	/**
	 * The color to guess. If this is not provided, the color is randomly generated.
	 */
	color?: ColorInfo;
	/**
	 * Context about the color if there is any.
	 */
	context?: string;
	/**
	 * The gamemode to use:
	 *  - `standard`: Mode with one color per day.
	 *  - `versus`: 1v1 mode where the user must guess the maxiumum amount of colors in a limited time. The user who guesses the highest amount of colors wins.
	 */
	mode: 'standard' | 'versus';
	/**
	 * Function fired when the game is over.
	 */
	onEnd: (guesses: number[][], correct: ColorInfo) => void;
}
export default GameContainerProps;