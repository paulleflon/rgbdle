import ColorInfo from '../ColorInfo';
import PopupProps from '../PopupProps';

/**
 * Props for `Results` component.
 */
interface ResultsContainerProps extends PopupProps {
	/**
	 * The color to guess.
	 */
	color: ColorInfo;
}
export default ResultsContainerProps;