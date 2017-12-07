import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonBase extends React.Component {

	render() {

    return ( <button {...this.props} /> );

  }

}

ButtonBase.propTypes = {

	id : PropTypes.string ,
	className : PropTypes.string

}
