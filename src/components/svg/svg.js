import SVG from 'react-inlinesvg';
import './svg.css';

const CustomSvg = ({ icon, isActive, styles }, { ...rest }) => {
  return <SVG {...rest} src={icon} className={`${isActive} ${styles}`} />;
};

export default CustomSvg;
