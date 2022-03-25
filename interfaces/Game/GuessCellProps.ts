/**
 * Props for `GuessCell` component.
 */
interface GuessCellProps {
	/*
	 * The value expected for the RGB value this cell represents.
	 */
	expected: number;
	/**
	 * The guess sent by the user for RGB value this cell represents.  
	 * `undefined` if `inactive` is `true`.
	 */
	guess?: number;
	/**
	 * Whether this cell displays a guess (`false`) or is a placeholder for upcoming guesses (`true`).
	 */
	inactive?: boolean;
}
export default GuessCellProps;