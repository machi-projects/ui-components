import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropDownBase, { DropDownItemsBase, DropDownItemBase } from '../../js/DropDownBase';
import { InputText } from '../index';
import { Icon } from '../index';

import styles from './searchbox.css';
import styleMapping from './styleMapping';
import { omit } from '../../utils/objectUtils';

class DropDownSelection extends Component {}

class DropDownItems extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div>MyComponent</div>;
	}
}

class DropDownItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div>MyComponent</div>;
	}
}

export default class DropDown extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div>MyComponent</div>;
	}
}

DropDown.propTypes = {};

if (__DOCS__) {
	DropDown.docs = {
		componentGroup: 'Atom'
	};
}
