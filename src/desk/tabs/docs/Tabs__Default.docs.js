import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsHeader, TabItem, TabsBody, TabContent } from '../index';

export default class Tabs__Default extends Component {
	render() {
		return (
			<div>
				<b> Tabs group + custom styles </b> <br /> <br />
				Group 1 : <br />
				<Tabs styleId="myTabsNew" groupName="How" selectedTab="B" onSelectTab={(a, b) => {}}>
					<TabsHeader>
						<TabItem id="A"> asdasd </TabItem>
						<TabItem id="B"> sfsdfsdfsdf </TabItem>
						<TabItem id="C"> fsadsadsadasdasasd </TabItem>
					</TabsHeader>

					<TabsBody>
						<TabContent id="A"> Apple </TabContent>
						<TabContent id="B"> Animals </TabContent>
						<TabContent id="B"> how old are you ? </TabContent>
					</TabsBody>
				</Tabs>
				<Tabs selectedTab="C" groupName="Animals" onSelectTab={(a, b) => {}}>
					<TabsHeader>
						<TabItem id="A"> asdasd </TabItem>
						<TabItem id="B"> sfsdfsdfsdf </TabItem>
						<TabItem id="C"> fsadsadsadasdasasd </TabItem>
					</TabsHeader>

					<TabsBody>
						<TabContent id="A"> Apple </TabContent>
						<TabContent id="B"> Animals </TabContent>
						<TabContent id="C"> how old are you ? </TabContent>
					</TabsBody>
				</Tabs>
			</div>
		);
	}
}

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
