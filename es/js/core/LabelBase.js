import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var LabelBase = function (_React$Component) {
	_inherits(LabelBase, _React$Component);

	function LabelBase() {
		_classCallCheck(this, LabelBase);

		return _possibleConstructorReturn(this, (LabelBase.__proto__ || _Object$getPrototypeOf(LabelBase)).apply(this, arguments));
	}

	_createClass(LabelBase, [{
		key: 'render',
		value: function render() {
			return React.createElement('label', this.props);
		}
	}]);

	return LabelBase;
}(React.Component);

export default LabelBase;


LabelBase.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	htmlFor: PropTypes.string
};