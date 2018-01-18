import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from '../index';

export default class Message__Default extends Component {
	render() {
		return (

				<div>

  					<Message styleId="mytext" >  text  ="helolasd s ds d s dasd"  </Message>
						<Message raised={true} > This is my figure </Message>

				</div>

		)
	}
}

if (__DOCS__) {

	Message__Default.docs = {
		componentGroup: Message.docs.componentGroup
	};

}
