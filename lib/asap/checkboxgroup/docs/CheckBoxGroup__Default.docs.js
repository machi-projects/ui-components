'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBoxGroup__Default = function (_Component) {
  _inherits(CheckBoxGroup__Default, _Component);

  function CheckBoxGroup__Default() {
    _classCallCheck(this, CheckBoxGroup__Default);

    return _possibleConstructorReturn(this, (CheckBoxGroup__Default.__proto__ || Object.getPrototypeOf(CheckBoxGroup__Default)).apply(this, arguments));
  }

  _createClass(CheckBoxGroup__Default, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        null,
        'CheckBoxGroup styles...',
        _react2.default.createElement(
          _index.CheckBoxGroup,
          { selectedItems: ["B", "C"] },
          _react2.default.createElement(
            _index.CheckBoxItem,
            { value: 'A' },
            ' Apple '
          ),
          _react2.default.createElement(
            _index.CheckBoxItem,
            { value: 'B' },
            ' Banana '
          ),
          _react2.default.createElement(
            _index.CheckBoxItem,
            { value: 'C' },
            ' Car '
          )
        ),
        'CheckBoxGroup styles...',
        _react2.default.createElement(
          _index.CheckBoxGroup,
          { styleId: 'mycheckbox', selectedItems: ["B", "C"] },
          _react2.default.createElement(
            _index.CheckBoxItem,
            { value: 'A' },
            ' Apple '
          ),
          _react2.default.createElement(
            _index.CheckBoxItem,
            { value: 'B' },
            ' Banana '
          ),
          _react2.default.createElement(
            _index.CheckBoxItem,
            { value: 'C' },
            ' Car '
          )
        )
      );
    }
  }]);

  return CheckBoxGroup__Default;
}(_react.Component);

exports.default = CheckBoxGroup__Default;


if (__DOCS__) {
  CheckBoxGroup__Default.docs = {
    componentGroup: _index.CheckBoxGroup.docs.componentGroup
  };
}

// <CheckBoxGroup selectedItems={["B","A"]} >
//
//         <CheckBoxItem value="A" label="Apple" />
//
//         <CheckBoxItem value="B" >  <span> Banana </span>    </CheckBoxItem>
//
//         <CheckBoxItem value="C" > <div> cappuccino  </div>  </CheckBoxItem>
//
//   </CheckBoxGroup>