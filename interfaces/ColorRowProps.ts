/**
 * Props of `ColorRow` component.
 */
interface ColorRowProps {
	/**
	 * The RGB values of the correct color.
	 */
	correct: [number, number, number];
	/**
	 * *This prop is specified only when status is `past`.*  
	 * The guess this row represents.
	 */
	guess?: [number, number, number];
	/**
	 * *This prop is specified only when status is `current`.*  
	 * If the user has correctly guessed one of the values, this value is locked for their next guesses. 
	 * Therefore, we disable the corresponding input.
	 * Each boolean tells whether to disable or not this input.
	 */
	lock?: [boolean, boolean, boolean];
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
	submitGuess: (guess: [number, number, number]) => void;
}
export default ColorRowProps;