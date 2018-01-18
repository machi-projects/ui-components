import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var ButtonBase = function (_React$Component) {
	_inherits(ButtonBase, _React$Component);

	function ButtonBase() {
		_classCallCheck(this, ButtonBase);

		return _possibleConstructorReturn(this, (ButtonBase.__proto__ || _Object$getPrototypeOf(ButtonBase)).apply(this, arguments));
	}

	_createClass(ButtonBase, [{
		key: 'render',
		value: function render() {

			return React.createElement('button', this.props);
		}
	}]);

	return ButtonBase;
}(React.Component);

export default ButtonBase;


ButtonBase.propTypes = {

	id: PropTypes.string,
	className: PropTypes.string

};