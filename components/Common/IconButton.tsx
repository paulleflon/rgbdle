import IconButtonProps from '../../interfaces/Common/IconButtonProps';

const IconButton = ({ icon, onClick }: IconButtonProps) => {
	return (

		<button
			className='transition-transform duration-100 
			motion-reduce:transition-none hover:scale-125 focus-visible:scale-125 outline-none'
			onClick={onClick}
		>
			{icon}
		</button>
	);
}
export default IconButton;