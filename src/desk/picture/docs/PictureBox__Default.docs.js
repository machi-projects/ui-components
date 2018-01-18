import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PictureBox } from '../index';

export default class PictureBox__Default extends Component {
	render() {
		return (

				<div>

  					<PictureBox styleId="mypicture" src="https://my.com/img/mycom.png"  alt="mycom" />

						<br />

						<PictureBox src="https://my.com/img/mycom.png" alt="mycom" > This <b> is </b> my figure </PictureBox>

				</div>

		)
	}
}

if (__DOCS__) {

	PictureBox__Default.docs = {
		componentGroup: PictureBox.docs.componentGroup
	};

}
