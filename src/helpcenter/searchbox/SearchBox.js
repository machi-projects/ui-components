import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBoxBase from '../../js/SearchBoxBase';
import { InputText } from '../index';
import { Icon } from '../index';

import styles from './searchbox.css';
import styleMapping from './styleMapping';
import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNames';

class InputBox extends React.Component {
	render() {
		let { textboxStyle, inputStyleId } = this.props;
		let newProps = omit(this.props, ['textboxStyle', 'inputStyleId','typeName']);
		return (
			<div className={textboxStyle}>
				<InputText type="text" styleId={inputStyleId} {...newProps}  />
			</div>
		);
	}
}

InputBox.defaultProps={
	typeName : "InputBox"
}

class SearchIcon extends React.Component {
	render() {
		let { onClick, iconstyle, iconInfo , isSearching } = this.props;
		
		let classNames = cx(iconstyle , isSearching ? styles["issearching"] : null );
		
		return (
			<div className={ classNames } onClick={onClick}>
				<Icon styleId={iconInfo.styleId} id={iconInfo.id} />
			</div>
		);
	}
}

SearchIcon.defaultProps={
	typeName : "SearchIcon"
}

class ClearIcon extends SearchIcon {}

ClearIcon.defaultProps={
	typeName : "ClearIcon"
}

export default class SearchBox extends React.Component {
	render() {
		let { styleId, text, placeholder, viewOrder, searchOn, onChange ,
			onClickClearSeach ,  onClickSearch ,isCollaspe , children } = this.props;

		let styleMappings = styleMapping[styleId];
		let { searchIcon = {}, clearIcon = {}, inputStyleId } = styleMappings;

		let searchBoxStyle = styles[styleId];
		let searchBoxCollaspeStyle = styles["iscollaspe"];
		let searchBoxFloatStyle = styles["isfloatlabel"];
		let searchBoxInnerStyle = styles["innerboxstyle"];
		
		let searchiconStyle = styles['searchicon'];
		let textboxStyle = styles['textbox'];
		let floatboxStyle = styles['floatbox'];
		let cleariconStyle = styles['clearicon'];		

		return (
			<SearchBoxBase searchBoxStyle={searchBoxStyle} text={text} searchOn={searchOn} 
			searchBoxCollaspeStyle={searchBoxCollaspeStyle}
			searchBoxFloatStyle={searchBoxFloatStyle}
			searchBoxInnerStyle={searchBoxInnerStyle}
			floatboxStyle={floatboxStyle}
			placeholder={placeholder}
			isCollaspe={isCollaspe}
			floatLabelOnSearchBox={children}
			onChange={onChange}
			onClickClearSeach={onClickClearSeach}
			onClickSearch={onClickSearch} >
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

	isCollaspe : PropTypes.bool,
	floatLabelOnSearchBox : PropTypes.any,
	
	searchOn: PropTypes.string,
	onChange: PropTypes.func,
	
	onClickClearSeach : PropTypes.func,
	onClickSearch : PropTypes.func
};

if (__DOCS__) {
	SearchBox.docs = {
		componentGroup: 'Atom'
	};
}
