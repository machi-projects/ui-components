import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlainText } from '../index';

export default class PlainText__Default extends Component {
	render() {
		return (

				<div>

  					<PlainText styleId="mytext" text="helolasd s ds d s dasd" />
						<PlainText raised={true} > This is my figure </PlainText>

				</div>

		)
	}
}

if (__DOCS__) {

	PlainText__Default.docs = {
		componentGroup: PlainText.docs.componentGroup
	};

}
