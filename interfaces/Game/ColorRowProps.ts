/**
 * Props of `ColorRow` component.
 */
interface ColorRowProps {
	/**
	 * The RGB values of the correct color.
	 */
	correct: number[];
	/**
	 * The guesses sent by the user.
	 */
	guesses: number[][];
	/**
	 * The index of the guess this row represents.
	 */
	index: number;
	/**
	 * The status of this row, either:
	 *  - `current`: This row is the one in which the user is submitting their guess.
	 *  - `past`: This row shows a past guess of the user's in the current game.
	 *  - `upcoming`: This row is not yet used.
	 */
	status: 'current' | 'past' | 'upcoming';
	/**
	 * The function to call when the user submits a color guess.
	 */
	submitGuess: (guess: number[]) => void;
}
export default ColorRowProps;