import Link from 'next/link';
import { ReactElement } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoMdPodium } from 'react-icons/io';
import { MdHome } from 'react-icons/md';
import HeaderProps from '../../interfaces/Common/HeaderProps';
import IconButton from './IconButton';

/**
 * Header of the RGBdle app.
 */
const Header = ({ display, mode }: HeaderProps): ReactElement => {
	return (
		<div
			className='flex items-center justify-center border-b border-gray-300
				 w-full p-2 md:p-4 dark:border-slate-700 dark:text-gray-50
				 print:border-0 print:justify-start'
		>
			{
				mode === 'mania' ?
					<div className='absolute outline-none left-5 cursor-pointer transition-transform duration-75 hover:scale-125'>
						<Link href='/'>
							<a>
								<MdHome size={32} />
							</a>
						</Link>
					</div>
					:
					<div className='absolute left-5 cursor-pointer transition-all duration-75 font-title hover:scale-125 hover:text-red-500 hover:tracking-wider hover:animate-pulse'>
						<Link href='/mania'>
							<a className='no-underline'>
								Mania
							</a>
						</Link>
					</div>
			}
			<div className='font-title text-2xl md:text-4xl'>
				<span className='text-[#ff2e2e]'>R</span>
				<span className='text-[#3bdb40]'>G</span>
				<span className='text-[#3770db]'>B</span>
				<span className='print:text-black'>dle</span>
				{mode === 'mania' &&
					<div className='absolute right-[-25px] bottom-[2px] text-sm rotate-[-35deg] text-red-500'>
						MANIA
					</div>
				}
			</div>
			<div className='absolute right-1 flex flex-row text-xl md:right-2 md:text-3xl print:hidden'>
				<div className='mx-2 flex items-center'>
					<IconButton onClick={() => display('guide')} icon={<FaQuestionCircle />} />
				</div>
				{mode === 'mania' ||
					<div className='mx-2 flex items-center'>
						<IconButton onClick={() => display('results')} icon={<IoMdPodium />} />
					</div>

				}
			</div>
		</div>
	);
}
export default Header;