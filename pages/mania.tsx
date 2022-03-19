import RGBdleProps from '../interfaces/RGBdleProps';
import Home from './index';
import { getStaticProps as _getStaticProps } from './index';

const Mania = ({ about, build, colors }: RGBdleProps) => {
	return <Home about={about} build={build} colors={colors} mania />;
}
export default Mania;


export function getStaticProps(): { props: RGBdleProps } {
	return _getStaticProps();
}
