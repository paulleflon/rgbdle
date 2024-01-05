import { ReactElement } from 'react';
import { IoLogoGithub } from 'react-icons/io';
import BuildInfo from '../../interfaces/BuildInfo';

/**
 * Footer of the RGBdle app.
 */
const Footer = ({ build }: { build: BuildInfo }): ReactElement => {
	return (
		<div className='px-4 text-center text-slate-500/40 dark:text-gray-50/30'>
			<div className='inline mr-2'>
				See source code on
			</div>
			<a
				className='inline-flex flex-row items-baseline no-underline transition-colors duration-100 hover:text-gray-50'
				href='https://github.com/hickatheworld/rgbdle'
				rel='noopener noreferrer'
				target='_blank'
			>

				<IoLogoGithub size={18} className='translate-y-[2px]'></IoLogoGithub>
				<div className='ml-1'>
					GitHub
				</div>
			</a>
			<div className='font-mono text-slate-500/40 dark:text-gray-50/20 text-center text-xs py-1'>
				Built on {build.date}
				<br />
				Version {build.version} |
				Commit : <a href={`https://github.com/hickatheworld/rgbdle/commit/${build.commit}`} target='_blank' rel='noreferrer'>
					{build.commit.substring(0, 7)}
				</a>
			</div>
		</div>
	);
}
export default Footer;
