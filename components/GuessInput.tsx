import { forwardRef } from 'react';
import GuessInputProps from '../interfaces/GuessInputProps';

const GuessInput = forwardRef(({ onSubmit }: GuessInputProps, ref: React.Ref<HTMLInputElement>) => {
	return (
		<input
			autoComplete='off'
			className='appearance-none flex flex-col items-center justify-center mx-2 outline-none rounded border-[3px] w-12 h-12
					border-slate-600 dark:border-gray-500 bg-gray-50 focus:border-orange-500 font-body text-slate-800 text-center'
			data-lpignore={true}
			data-form-type='other'
			min={0}
			max={255}
			onKeyDown={e => e.key === 'Enter' && onSubmit()}
			pattern='\d*'
			ref={ref}
			type='number'
		/>
	);
});
export default GuessInput;