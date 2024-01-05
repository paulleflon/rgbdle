/**
 * Props for `Header` component.
 */
interface HeaderProps {
	/**
	 * Function to display/close a Pop-up.
	 */
	display: (component: 'none' | 'results' | 'guide') => void;
	/**
	 * The gamemode to use:
	 *  - `standard`: Mode with one color per day.
	 *  - `versus`: 1v1 mode where the user must guess the maxiumum amount of colors in a limited time. The user who guesses the highest amount of colors wins.
	 */
	mode: 'standard' | 'versus';
}
export default HeaderProps;