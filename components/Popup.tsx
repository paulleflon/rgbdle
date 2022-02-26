import { MouseEvent, ReactElement } from 'react';
import { IoMdClose } from 'react-icons/io';
import PopupProps from '../interfaces/PopupProps';

// wont jsdoc these props they're pretty self explanatory.
const Popup = ({ children, close, displayed }: PopupProps): ReactElement => {
	const onClick = (e: MouseEvent<HTMLDivElement>) => {
		let target = e.target as HTMLDivElement;
		while (target) {
			if (target.id === 'noclose')
				return;
			target = target.parentElement as HTMLDivElement;
		}
		close();
	}
	return (
		<div className={`pop-up-container ${displayed ? 'open' : ''}`} onClick={onClick}>
			<button className='pop-up-close' onClick={close}>
				<IoMdClose></IoMdClose>
			</button>
			<div className='pop-up-wrapper' id='noclose'>
				<div className='pop-up'>
					{children}
				</div>
			</div>
		</div>
	);
}
export default Popup;