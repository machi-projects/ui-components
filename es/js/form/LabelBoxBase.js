import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import LabelBase from '../core/LabelBase';
import PropTypes from 'prop-types';

var LabelBoxBase = function (_React$Component) {
	_inherits(LabelBoxBase, _React$Component);

	function LabelBoxBase() {
		_classCallCheck(this, LabelBoxBase);

		return _possibleConstructorReturn(this, (LabelBoxBase.__proto__ || _Object$getPrototypeOf(LabelBoxBase)).apply(this, arguments));
	}

	_createClass(LabelBoxBase, [{
		key: 'render',
		value: function render() {
			return React.createElement(LabelBase, this.props);
		}
	}]);

	return LabelBoxBase;
}(React.Component);

export default LabelBoxBase;


LabelBoxBase.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	htmlFor: PropTypes.string
};