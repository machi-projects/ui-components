'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRowProps = getRowProps;
exports.default = View;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('./Layout.css');

var _Layout2 = _interopRequireDefault(_Layout);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowKeys = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between'];

var propTypes = {
	reverse: _propTypes2.default.bool,
	start: _utils.ViewportSizeType,
	center: _utils.ViewportSizeType,
	end: _utils.ViewportSizeType,
	top: _utils.ViewportSizeType,
	middle: _utils.ViewportSizeType,
	bottom: _utils.ViewportSizeType,
	around: _utils.ViewportSizeType,
	between: _utils.ViewportSizeType,
	className: _propTypes2.default.string,
	tagName: _propTypes2.default.string
};

function getRowClassNames(props) {
	var modificators = [props.className, (0, _utils.getClass)(_Layout2.default, 'row')];

	var _loop = function _loop(i) {
		var key = rowKeys[i];
		var value = props[key];
		if (!Array.isArray(value)) {
			modificators.push((0, _utils.getClass)(_Layout2.default, key + '-' + value));
		} else {
			value.forEach(function (val) {
				modificators.push((0, _utils.getClass)(_Layout2.default, key + '-' + val));
			});
		}
	};

	for (var i = 0; i < rowKeys.length; ++i) {
		_loop(i);
	}

	if (props.reverse) {
		modificators.push((0, _utils.getClass)(_Layout2.default, 'reverse'));
	}

	return modificators;
}

function getRowProps(props) {
	return (0, _utils.createProps)(propTypes, props, getRowClassNames(props));
}

function View(props) {
	return _react2.default.createElement(props.tagName || 'div', getRowProps(props));
}

View.propTypes = propTypes;