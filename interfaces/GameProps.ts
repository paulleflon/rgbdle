import ColorInfo from './ColorInfo';

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
	 * If the user has correctly guessed one of the values, this value is locked for their next guesses. 
	 * Therefore, we disable the corresponding input. 
	 * Each boolean tells whether to disable or not this input.
 	 */
	lock: [boolean, boolean, boolean];
	/**
	 * The function to call when the user submits a color guess.
	 */
	submitGuess: (guess: [number, number, number]) => void;
	/**
	 * The previous guesses the user has submitted.
	 */
	guesses: [number, number, number][];
}
export default GameProps;