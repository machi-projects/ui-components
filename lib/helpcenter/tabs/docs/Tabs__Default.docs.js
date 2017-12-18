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

var Tabs__Default = function (_Component) {
	_inherits(Tabs__Default, _Component);

	function Tabs__Default() {
		_classCallCheck(this, Tabs__Default);

		return _possibleConstructorReturn(this, (Tabs__Default.__proto__ || Object.getPrototypeOf(Tabs__Default)).apply(this, arguments));
	}

	_createClass(Tabs__Default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'b',
					null,
					' Tabs group + custom styles '
				),
				' ',
				_react2.default.createElement('br', null),
				' ',
				_react2.default.createElement('br', null),
				'Group 1 : ',
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					_index.Tabs,
					{ styleId: 'myTabsNew', groupName: 'How', selectedTab: 'B', onSelectTab: function onSelectTab(a, b) {} },
					_react2.default.createElement(
						_index.TabsHeader,
						null,
						_react2.default.createElement(
							_index.TabItem,
							{ id: 'A' },
							' asdasd '
						),
						_react2.default.createElement(
							_index.TabItem,
							{ id: 'B' },
							' sfsdfsdfsdf '
						),
						_react2.default.createElement(
							_index.TabItem,
							{ id: 'C' },
							' fsadsadsadasdasasd '
						)
					),
					_react2.default.createElement(
						_index.TabsBody,
						null,
						_react2.default.createElement(
							_index.TabContent,
							{ id: 'A' },
							' Apple '
						),
						_react2.default.createElement(
							_index.TabContent,
							{ id: 'B' },
							' Animals '
						),
						_react2.default.createElement(
							_index.TabContent,
							{ id: 'B' },
							' how old are you ? '
						)
					)
				),
				_react2.default.createElement(
					_index.Tabs,
					{ selectedTab: 'C', groupName: 'Animals', onSelectTab: function onSelectTab(a, b) {} },
					_react2.default.createElement(
						_index.TabsHeader,
						null,
						_react2.default.createElement(
							_index.TabItem,
							{ id: 'A' },
							' asdasd '
						),
						_react2.default.createElement(
							_index.TabItem,
							{ id: 'B' },
							' sfsdfsdfsdf '
						),
						_react2.default.createElement(
							_index.TabItem,
							{ id: 'C' },
							' fsadsadsadasdasasd '
						)
					),
					_react2.default.createElement(
						_index.TabsBody,
						null,
						_react2.default.createElement(
							_index.TabContent,
							{ id: 'A' },
							' Apple '
						),
						_react2.default.createElement(
							_index.TabContent,
							{ id: 'B' },
							' Animals '
						),
						_react2.default.createElement(
							_index.TabContent,
							{ id: 'C' },
							' how old are you ? '
						)
					)
				)
			);
		}
	}]);

	return Tabs__Default;
}(_react.Component);

exports.default = Tabs__Default;


if (__DOCS__) {
	Tabs__Default.docs = {
		componentGroup: _index.Tabs.docs.componentGroup
	};
}

// <Tabs selectedItem="A" >
//        <TabItem value="A" label="Apple" />
//        <TabItem value="B" >  <span> Banana </span>    </TabItem>
//        <TabItem value="C" > <div> cappuccino  </div>  </TabItem>
//  </Tabs>