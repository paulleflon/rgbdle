import ColorInfo from '../ColorInfo';

/**
 * Props for `Game` component.
 */
interface GameProps {
	/**
	 * Context about the color if there is any.
	 */
	about?: string;
	/**
	 * The color to guess.
	 */
	color: ColorInfo;
	/**
	 * Whether the game is over.
	 */
	ended: boolean;
	/**
	 * The previous guesses the user has submitted.
	 */
	guesses: number[][];
	/**
	 * Whether the game is in mania mode.
	 */
	mania: boolean;
	/**
	 * Function that refreshes the color to guess. Only in mania.
	 */
	refreshColor: () => void;
	/**
	 * The function to call when the user submits a color guess.
	 */
	submitGuess: (guess: number[]) => void;
}
export default GameProps;