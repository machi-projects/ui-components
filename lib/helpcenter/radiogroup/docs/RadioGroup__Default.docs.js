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

var RadioGroup__Default = function (_Component) {
   _inherits(RadioGroup__Default, _Component);

   function RadioGroup__Default() {
      _classCallCheck(this, RadioGroup__Default);

      return _possibleConstructorReturn(this, (RadioGroup__Default.__proto__ || Object.getPrototypeOf(RadioGroup__Default)).apply(this, arguments));
   }

   _createClass(RadioGroup__Default, [{
      key: 'render',
      value: function render() {

         return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
               'b',
               null,
               ' Radio group + custom styles '
            ),
            ' ',
            _react2.default.createElement('br', null),
            '  ',
            _react2.default.createElement('br', null),
            'Group 1 : ',
            _react2.default.createElement('br', null),
            _react2.default.createElement(
               _index.RadioGroup,
               { selectedItem: 'B' },
               _react2.default.createElement(
                  _index.RadioItem,
                  { value: 'A' },
                  ' Apple '
               ),
               _react2.default.createElement(
                  _index.RadioItem,
                  { value: 'B' },
                  ' Banana '
               ),
               _react2.default.createElement(
                  _index.RadioItem,
                  { value: 'C' },
                  ' Pinapple '
               )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
               _index.RadioGroup,
               { styleId: 'myradio', groupName: 'hello', selectedItem: 'BC' },
               _react2.default.createElement(
                  _index.RadioItem,
                  { value: 'AA' },
                  ' Car '
               ),
               _react2.default.createElement(
                  _index.RadioItem,
                  { value: 'BC' },
                  ' Flight '
               ),
               _react2.default.createElement(
                  _index.RadioItem,
                  { value: 'CD' },
                  ' Bus '
               )
            )
         );
      }
   }]);

   return RadioGroup__Default;
}(_react.Component);

exports.default = RadioGroup__Default;


if (__DOCS__) {
   RadioGroup__Default.docs = {
      componentGroup: _index.RadioGroup.docs.componentGroup
   };
}

// <RadioGroup selectedItem="A" >
//        <RadioItem value="A" label="Apple" />
//        <RadioItem value="B" >  <span> Banana </span>    </RadioItem>
//        <RadioItem value="C" > <div> cappuccino  </div>  </RadioItem>
//  </RadioGroup>