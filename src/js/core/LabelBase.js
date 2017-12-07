import React from 'react';
import PropTypes from 'prop-types';

export default class LabelBase extends React.Component {
	render() {
		return <label {...this.props} />;
	}
}

LabelBase.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	htmlFor: PropTypes.string
};
