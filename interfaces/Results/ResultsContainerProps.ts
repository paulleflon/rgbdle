import ColorInfo from '../ColorInfo';
import PopupProps from '../Common/PopupProps';

/**
 * Props for `Results` component.
 */
interface ResultsContainerProps extends PopupProps {
	/* Array storing the amount of guesses ([1;10]) submitted by the user for each game they have played.
	 * -1 means they didn't find the color after 10 attempts in that game.
	 */
	attempts: number[];
}
export default ResultsContainerProps;