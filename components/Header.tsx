import { ReactElement } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoMdPodium } from 'react-icons/io';

/**
 * Header of the RGBdle app.
 */
const Header = ({ display }: { display: (component: 'none' | 'results' | 'guide') => void }): ReactElement => {
	return (
		<div
			className='flex items-center justify-center border-b border-gray-300
				 w-full p-2 md:p-4 dark:border-slate-700 dark:text-gray-50
				 print:border-0 print:justify-start'
		>
			<div className='font-title text-2xl md:text-4xl'>
				<span className='text-[#ff2e2e]'>R</span>
				<span className='text-[#3bdb40]'>G</span>
				<span className='text-[#3770db]'>B</span>
				<span className='print:text-black'>dle</span>
			</div>
			<div className='absolute right-1 flex flex-row text-xl md:right-2 md:text-3xl print:hidden'>
				<button
					className='mx-1 md:mx-2 transition-transform duration-100 
						motion-reduce:transition-none hover:scale-[1.05] focus-visible:text-orange-500 outline-none'
					onClick={() => display('guide')}
				>
					<FaQuestionCircle></FaQuestionCircle>
				</button>
				<button
					onClick={() => display('results')}
					className='mx-1 md:mx-2 transition-transform duration-100
						motion-reduce:transition-none  hover:scale-[1.05] focus-visible:text-orange-500 outline-none'
				>
					<IoMdPodium></IoMdPodium>
				</button>
			</div>
		</div>
	);
}
export default Header;