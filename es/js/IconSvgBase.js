import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var IconSvgBase = function (_React$Component) {
  _inherits(IconSvgBase, _React$Component);

  function IconSvgBase() {
    _classCallCheck(this, IconSvgBase);

    return _possibleConstructorReturn(this, (IconSvgBase.__proto__ || _Object$getPrototypeOf(IconSvgBase)).apply(this, arguments));
  }

  _createClass(IconSvgBase, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'svg',
        { className: this.props.className, onClick: this.props.onClick },
        React.createElement('use', { xlinkHref: this.props.icon })
      );
    }
  }]);

  return IconSvgBase;
}(React.Component);

export default IconSvgBase;


IconSvgBase.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};