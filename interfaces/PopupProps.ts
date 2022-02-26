import { ReactNode } from 'react';

/**
 * Props for `Popup` component.
 */
interface PopupProps {
	/**
	 * The content of the popup.
	 */
	children?: ReactNode;
	/**
	 * Function that closes the component.
	 */
	close: () => void;
	/**
	 * Whether the component is being displayed.
	 */
	displayed: boolean;
}
export default PopupProps;