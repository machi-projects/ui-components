import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsHeader, TabItem, TabsBody, TabContent } from '../index';

var Tabs__Default = function (_Component) {
	_inherits(Tabs__Default, _Component);

	function Tabs__Default() {
		_classCallCheck(this, Tabs__Default);

		return _possibleConstructorReturn(this, (Tabs__Default.__proto__ || _Object$getPrototypeOf(Tabs__Default)).apply(this, arguments));
	}

	_createClass(Tabs__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'b',
					null,
					' Tabs group + custom styles '
				),
				' ',
				React.createElement('br', null),
				' ',
				React.createElement('br', null),
				'Group 1 : ',
				React.createElement('br', null),
				React.createElement(
					Tabs,
					{ styleId: 'myTabsNew', groupName: 'How', selectedTab: 'B', onSelectTab: function onSelectTab(a, b) {} },
					React.createElement(
						TabsHeader,
						null,
						React.createElement(
							TabItem,
							{ id: 'A' },
							' asdasd '
						),
						React.createElement(
							TabItem,
							{ id: 'B' },
							' sfsdfsdfsdf '
						),
						React.createElement(
							TabItem,
							{ id: 'C' },
							' fsadsadsadasdasasd '
						)
					),
					React.createElement(
						TabsBody,
						null,
						React.createElement(
							TabContent,
							{ id: 'A' },
							' Apple '
						),
						React.createElement(
							TabContent,
							{ id: 'B' },
							' Animals '
						),
						React.createElement(
							TabContent,
							{ id: 'B' },
							' how old are you ? '
						)
					)
				),
				React.createElement(
					Tabs,
					{ selectedTab: 'C', groupName: 'Animals', onSelectTab: function onSelectTab(a, b) {} },
					React.createElement(
						TabsHeader,
						null,
						React.createElement(
							TabItem,
							{ id: 'A' },
							' asdasd '
						),
						React.createElement(
							TabItem,
							{ id: 'B' },
							' sfsdfsdfsdf '
						),
						React.createElement(
							TabItem,
							{ id: 'C' },
							' fsadsadsadasdasasd '
						)
					),
					React.createElement(
						TabsBody,
						null,
						React.createElement(
							TabContent,
							{ id: 'A' },
							' Apple '
						),
						React.createElement(
							TabContent,
							{ id: 'B' },
							' Animals '
						),
						React.createElement(
							TabContent,
							{ id: 'C' },
							' how old are you ? '
						)
					)
				)
			);
		}
	}]);

	return Tabs__Default;
}(Component);

export default Tabs__Default;


if (__DOCS__) {
	Tabs__Default.docs = {
		componentGroup: Tabs.docs.componentGroup
	};
}

// <Tabs selectedItem="A" >
//        <TabItem value="A" label="Apple" />
//        <TabItem value="B" >  <span> Banana </span>    </TabItem>
//        <TabItem value="C" > <div> cappuccino  </div>  </TabItem>
//  </Tabs>