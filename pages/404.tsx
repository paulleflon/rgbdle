import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page404 = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace('/mania');
	});
	return (<></>);
}
export default Page404;
