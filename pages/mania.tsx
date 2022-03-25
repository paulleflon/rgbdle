import RGBdleProps from '../interfaces/RGBdleProps';
import Home from './index';
import { getStaticProps as _getStaticProps } from './index';

const Mania = ({ context, build, colors }: RGBdleProps) => {
	return <Home context={context} build={build} colors={colors} mode={'mania'} />;
}
export default Mania;


export function getStaticProps(): { props: RGBdleProps } {
	return _getStaticProps();
}
