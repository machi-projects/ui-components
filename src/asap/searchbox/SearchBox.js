import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBoxBase from '../../js/SearchBoxBase';
import { InputText } from '../index';
import { Icon } from '../index';

import styles from './searchbox.css';
import styleMapping from './styleMapping';
import { omit } from '../../utils/objectUtils';

class InputBox extends React.Component {
	render() {
		let { textboxStyle, inputStyleId, placeholder } = this.props;
		let newProps = omit(this.props, ['textboxStyle', 'inputStyleId']);

		return (
			<div className={textboxStyle}>
				<InputText type="text" styleId={inputStyleId} placeholder={placeholder} {...newProps} />
			</div>
		);
	}
}

class SearchIcon extends React.Component {
	render() {
		let { onClick, iconstyle, iconInfo } = this.props;
		return (
			<div className={iconstyle} onClick={onClick}>
				<Icon styleId={iconInfo.styleId} id={iconInfo.id} />
			</div>
		);
	}
}

class ClearIcon extends SearchIcon {}

export default class SearchBox extends React.Component {
	render() {
		let { styleId, text, placeholder, viewOrder, searchOn, onChange } = this.props;

		let styleMappings = styleMapping[styleId];
		let { searchIcon = {}, clearIcon = {}, inputStyleId } = styleMappings;

		let searchBoxStyle = styles[styleId];

		let searchiconStyle = styles['searchicon'];
		let textboxStyle = styles['textbox'];
		let cleariconStyle = styles['clearicon'];

		return (
			<SearchBoxBase searchBoxStyle={searchBoxStyle} text={text} searchOn={searchOn} onChange={onChange}>
				{viewOrder.map((item, i) => {
					if (item == 'textbox') {
						return <InputBox textboxStyle={textboxStyle} inputStyleId={inputStyleId} key={i} />;
					} else if (item == 'searchIcon') {
						return <SearchIcon iconstyle={searchiconStyle} iconInfo={searchIcon} key={i} />;
					} else if (item == 'clearIcon') {
						return <ClearIcon iconstyle={cleariconStyle} iconInfo={clearIcon} key={i} />;
					}
					return null;
				})}
			</SearchBoxBase>
		);
	}
}

SearchBox.defaultProps = {
	styleId: 'default',
	viewOrder: ['textbox', 'searchIcon']
};

SearchBox.propTypes = {
	styleId: PropTypes.string,

	viewOrder: PropTypes.arrayOf(PropTypes.oneOf(['textbox', 'searchIcon', 'clearIcon'])),
	text: PropTypes.string,
	placeholder: PropTypes.string,

	searchOn: PropTypes.string,
	onChange: PropTypes.func
};

if (__DOCS__) {
	SearchBox.docs = {
		componentGroup: 'Atom'
	};
}
