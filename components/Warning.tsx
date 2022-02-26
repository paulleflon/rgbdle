import { ReactElement } from 'react';
import { IoMdClose } from 'react-icons/io';
import WarningProps from '../interfaces/WarningProps';

const Warning = ({ close, displayed, message }: WarningProps): ReactElement => {
	return (
		<div
			className={(displayed ? 'open ' : '') + 'warning fixed left-[5%] w-[90%] flex items-center p-2 md:p-8 bg-teal-500 rounded-lg'}
		>
			<div
				className='z-50 absolute right-0 top-0 md:top-2 md:right-2 cursor-pointer text-3xl'
				onClick={close}
			>
				<IoMdClose></IoMdClose>
			</div>
			<div
				className='relative text-sm md:text-auto'
				dangerouslySetInnerHTML={{ __html: message }}
			>

			</div>
		</div>
	)
}
export default Warning;