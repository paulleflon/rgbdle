/**
 * Props for `Warning` component.
 */
interface WarningProps {
	/**
	 * Function to close the component.
	 */
	close: () => void;
	/**
	 * Whether the component is being displayed.
	 */
	displayed: boolean;
	/**
	 * The content of the warning. Accepts html.
	 */
	message: string;
}
export default WarningProps;