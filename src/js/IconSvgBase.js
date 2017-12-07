import React from 'react';
import PropTypes from 'prop-types';

export default class IconSvgBase extends React.Component {

  render() {

    return (<svg className={this.props.className} >
  		  <use xlinkHref={this.props.icon}></use>
  		</svg>);

  }
}

IconSvgBase.propTypes = {
  icon : PropTypes.string.isRequired,
  className : PropTypes.string
}
