import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

import PictureBoxBase from '../../js/PictureBoxBase';
import styles from './picturebox.css';
import styleMapping from './styleMapping';

var PictureBox = function (_React$Component) {
	_inherits(PictureBox, _React$Component);

	function PictureBox() {
		_classCallCheck(this, PictureBox);

		return _possibleConstructorReturn(this, (PictureBox.__proto__ || _Object$getPrototypeOf(PictureBox)).apply(this, arguments));
	}

	_createClass(PictureBox, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    styleId = _props.styleId,
			    src = _props.src,
			    alt = _props.alt;


			var picGroupStyle = styles[styleId];
			var pictureStyMapping = styleMapping[styleId];

			var picSourceStyle = styles[pictureStyMapping.sourceStyle];
			var picCaptionStyle = styles[pictureStyMapping.captionStyle];

			return React.createElement(
				PictureBoxBase,
				{
					src: src,
					alt: alt,
					groupStyle: picGroupStyle,
					sourceStyle: picSourceStyle,
					captionStyle: picCaptionStyle
				},
				this.props.children
			);
		}
	}]);

	return PictureBox;
}(React.Component);

export default PictureBox;


PictureBox.defaultProps = {
	styleId: 'default'
};

PictureBox.propTypes = {
	styleId: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
	isTextHtml: PropTypes.bool
};

if (__DOCS__) {
	PictureBox.docs = {
		componentGroup: 'Atom'
	};
}