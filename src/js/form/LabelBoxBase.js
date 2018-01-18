import React from 'react';
import LabelBase from '../core/LabelBase';
import PropTypes from 'prop-types';

export default class LabelBoxBase extends React.Component {
	
	render() {
		return ( <LabelBase {...this.props} /> );
	}

}

LabelBoxBase.propTypes = {
	id : PropTypes.string ,
	className : PropTypes.string ,
	htmlFor : PropTypes.string
}
