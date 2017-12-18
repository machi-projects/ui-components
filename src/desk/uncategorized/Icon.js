import React from 'react';
import PropTypes from 'prop-types';
import style from './css/Icon.css';

export default class Icon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
  	var icons = { searchIcon:"#search", xCloseIcon:"#x" }
  	let {icon,size="",iconColor,hoverColor,onClick=null}=this.props;
    let hoverColorClass = hoverColor ? style[hoverColor] : "";
    iconColor = iconColor?style[iconColor]:"";
    return (
          <svg data-testid="icon" className={style.icon+" "+style[size]+" "+iconColor+" "+hoverColorClass} onClick={onClick}>
      		  <use xlinkHref={icons[icon]}></use>
      		</svg>
    );
  }
}

Icon.propTypes = {
  icon     : PropTypes.string.isRequired,
  size     : PropTypes.string,
  iconColor: PropTypes.string
}
