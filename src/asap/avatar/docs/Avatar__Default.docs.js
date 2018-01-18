import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../index';

export default class Avatar__Default extends Component {
	render() {
		return (

				<div>

						<Avatar styleId="myavatar" type="picture" picture="https://my.com/img/mycom.png" name="hello" shape="square" size="small" borderSize="small_2"  />

						<Avatar type="picture" picture="https://my.com/img/mycom.png"  name="hello" shape="square-rounded" size="medium" borderSize="xlarge" />

						<Avatar styleId="myavatar" type="icon" iconId="checkIcon" name="hello" shape="round" size="xlarge" borderSize="medium" />

						<Avatar type="text" text="SK" color="red" bgColor="green" name="Sh Ka" shape="round" size="small_2" borderSize="none" />

				</div>

		)
	}
}

if (__DOCS__) {

	Avatar__Default.docs = {
		componentGroup: Avatar.docs.componentGroup
	};

}
