import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

import PictureBoxBase from './PictureBoxBase';
import PlainTextBase from './PlainTextBase';
import IconSvgBase from './IconSvgBase';

var FrameShapeBase = function (_React$Component) {
	_inherits(FrameShapeBase, _React$Component);

	function FrameShapeBase() {
		_classCallCheck(this, FrameShapeBase);

		return _possibleConstructorReturn(this, (FrameShapeBase.__proto__ || _Object$getPrototypeOf(FrameShapeBase)).apply(this, arguments));
	}

	_createClass(FrameShapeBase, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    type = _props.type,
			    name = _props.name,
			    picture = _props.picture,
			    text = _props.text,
			    iconId = _props.iconId,
			    frameStyle = _props.frameStyle,
			    iconStyle = _props.iconStyle,
			    textStyle = _props.textStyle,
			    picStyles = _props.picStyles;


			var frameContent = null;
			if (type == 'picture') {
				frameContent = React.createElement(PictureBoxBase, _extends({ alt: name, src: picture }, picStyles));
			} else if (type == 'text') {
				frameContent = React.createElement(PlainTextBase, { className: textStyle, text: text });
			} else if (type == 'icon') {
				frameContent = React.createElement(IconSvgBase, { className: iconStyle, icon: iconId });
			}

			return React.createElement(
				'div',
				{ className: frameStyle },
				frameContent
			);
		}
	}]);

	return FrameShapeBase;
}(React.Component);

export default FrameShapeBase;


FrameShapeBase.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf(['picture', 'text', 'icon']),
	name: PropTypes.string,
	picture: PropTypes.string,
	text: PropTypes.string,
	iconId: PropTypes.string,

	textStyle: PropTypes.string,
	frameStyle: PropTypes.string,
	iconStyle: PropTypes.string,

	picStyles: PropTypes.shape({
		groupStyle: PropTypes.string,
		sourceStyle: PropTypes.string,
		captionStyle: PropTypes.string
	})
};