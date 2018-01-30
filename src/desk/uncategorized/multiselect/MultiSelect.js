import React from 'react';
import PropTypes from 'prop-types';

import style from './MultiSelect.css';
import { formatValue , bind , getSelectedValue } from '../common';

import { deepEqualObject } from '../../../utils/objectUtils';
import validator from '../../../utils/validator';
import Popup from '../Popup';
import Pill from '../Pill';

class MultiSelect extends React.Component {
	constructor(props) {
		super(props);
		bind.apply(this, [
			'handleSearchFocus',
			'handleKeyUp',
			'handleSelect',
			'handleChange',
			'handleRemove',
			'handleHover',
			'handleToggle',
			'handleToggleClick',
			'handleKeyDown',
			'onSelectedItem',
			'onChangeValue',
		]);

		this.state = {
			focusedSuggestionIndex: 0,
			searchString: '',
			selectedValues : props.selectedValues,
			formattedSuggestions : formatValue(props.suggestions,props.valueField,props.textField),
			formattedSelectedValues : formatValue(props.selectedValues,props.valueField,props.textField)
		};

		this.setRef = this.setRef.bind(this);
		this.setDropPopupRef = this.setDropPopupRef.bind(this);
		this.setPlaceHolderRef = this.setPlaceHolderRef.bind(this);
		this.setSearchInputRef = this.setSearchInputRef.bind(this);
	}

	setRef(el) {
		this.elementRef = el;
		this.props.getElementRef && this.props.getElementRef(el);
	}

	setDropPopupRef(el) {
		this.dropPopupRef = el;
	}

	setPlaceHolderRef(el) {
		this.placeHolderRef = el;
	}

	setSearchInputRef(el) {
		this.searchInputRef = el;
	}

	shouldComponentUpdate(nextProps, nextState)
	{
		return ( (deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false) )
	}

	componentWillReceiveProps(nextProps) {

		if( deepEqualObject(nextProps.selectedValues, this.state.selectedValues) == false ) {

			this.setState({
				selectedValues : nextProps.selectedValues,
				formattedSelectedValues : formatValue(nextProps.selectedValues,this.props.valueField,this.props.textField)
			},()=>{

				let selectedValues = getSelectedValue(this.state.formattedSelectedValues,this.props.valueField);
				this.onChangeValue(selectedValues);

			});
		}

		if( deepEqualObject(nextProps.suggestions, this.props.suggestions) == false ) {
			this.setState({
				formattedSuggestions : formatValue(nextProps.suggestions,this.props.valueField,this.props.textField)
			});
		}

		if( deepEqualObject(nextProps.validation,this.props.validation) == false && nextProps.validation && nextProps.validation.validate ){
			this.validateOnSelect(getSelectedValue(this.state.formattedSelectedValues,this.props.valueField), nextProps);
		}

	}

	validateOnSelect(value, props) {
		let defaultCheckPropsRules = ['required'];
		let defaultValidateRules = ['required','minLength','maxLength'];
		let defaultType = 'multigroup';

		const { validation, onPassValidation, onFailValidation } = props;

		let targetTag = this.elementRef;
		if (validation != null) {
			//validateOn won't work here ...
			let newValidation = validator.combinePropsValidation(
				this.props,
				defaultType,
				'onChange',
				validation,
				defaultCheckPropsRules,
				defaultValidateRules
			);

			let validationObj = {
				validation: newValidation,
				onPassValidation: onPassValidation,
				onFailValidation: onFailValidation
			};

			validator.executeValidation(value, targetTag, validationObj, defaultType);
		} else {
			onPassValidation && onPassValidation(value, targetTag);
		}
	}

	componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(getSelectedValue(this.state.formattedSelectedValues,this.props.valueField), this.props);
		}
	}

	handleChange(e) {
		let { isPopupOpen, togglePopup } = this.props;
		this.setState({ searchString: e.target.value });
		if (!isPopupOpen) {
			togglePopup(e);
		}
	}

	handleToggle(e,dropRef,placeHolderRef) {
		e.stopPropagation && e.stopPropagation();
		e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
		let { isPopupOpen, togglePopup } = this.props;
		this.handleSearchFocus();
		!isPopupOpen && togglePopup(e, dropRef, placeHolderRef);
	}

	handleSelect(selectedValue, e) {
		let { closePopupOnly, isPopupOpen } = this.props;
		this.setState((state)=>{

			state.focusedSuggestionIndex = 0 ;
			state.searchString = '';
			state.formattedSelectedValues = [...state.formattedSelectedValues, selectedValue];

		},() => {
			this.onSelectedItem();
		});

		isPopupOpen && closePopupOnly(e);
		this.handleSearchFocus();
	}

	onSelectedItem() {

		let selectedValues = getSelectedValue(this.state.formattedSelectedValues,this.props.valueField);
		this.onChangeValue( selectedValues, this.props.groupName);
		if (this.props.validation && this.props.validation.validateOn) {
			this.validateOnSelect(selectedValues, this.props);
		}
	}

	onChangeValue(val, groupName){
		this.props.onChange && this.props.onChange(val, groupName);
		this.props.getValue && this.props.getValue(val);
	}

	handleSearchFocus() {
		this.searchInputRef && this.searchInputRef.focus();
	}

	handleRemove(selectedValue, e) {
		let { valueField, isPopupOpen, closePopupOnly, groupName } = this.props;
		let selectedValues = this.state.formattedSelectedValues;
		let newSelectedSuggestions = selectedValues.filter((selectedSuggestion, i) => {
			return !(selectedSuggestion[valueField] === selectedValue[valueField]);
		});

		isPopupOpen && closePopupOnly(e);
		this.handleSearchFocus();
		this.setState({ focusedSuggestionIndex: 0, formattedSelectedValues: newSelectedSuggestions }, () => {
			this.onSelectedItem();
		});
	}

	handleKeyDown(e) {
		let keyCode = e.keyCode;
		let searchString = e.target.value;
		let { valueField, searchKeys, searchType, isPopupOpen, closePopupOnly, groupName } = this.props;

		let { focusedSuggestionIndex, formattedSuggestions, formattedSelectedValues } = this.state;
		let suggestionList = this.filterSuggestions(
			searchString,
			formattedSuggestions,
			formattedSelectedValues,
			searchKeys,
			searchType,
			valueField
		);

		let suggestionLength = suggestionList.length;
		switch (keyCode) {
			case 8:
				if (formattedSelectedValues.length && searchString.length == 0) {
					let newSelectedSuggestions = formattedSelectedValues.slice(0, -1);
					focusedSuggestionIndex = 0;
					this.setState({ focusedSuggestionIndex, formattedSelectedValues: newSelectedSuggestions }, () => {
						this.onSelectedItem();
					});

					//isPopupOpen && closePopupOnly(e)
					this.handleSearchFocus();
				}
				break;
		}
	}
	handleKeyUp(e) {
		let keyCode = e.keyCode;
		let searchString = e.target.value;
		let {
			textField,
			valueField,
			searchKeys,
			searchType,
			isPopupOpen,
			togglePopup,
			closePopupOnly,
			groupName
		} = this.props;
		let { focusedSuggestionIndex, formattedSuggestions, formattedSelectedValues } = this.state;
		let suggestionList = this.filterSuggestions(
			searchString,
			formattedSuggestions,
			formattedSelectedValues,
			searchKeys,
			searchType,
			valueField
		);
		let suggestionLength = suggestionList.length;
		switch (keyCode) {
			case 40:
			case 34:
				if (suggestionLength) {
					if (focusedSuggestionIndex === suggestionLength - 1) {
						focusedSuggestionIndex = 0;
					} else {
						focusedSuggestionIndex += 1;
					}
				}
				break;
			case 38:
			case 33:
				if (suggestionLength) {
					if (focusedSuggestionIndex === 0) {
						focusedSuggestionIndex = suggestionLength - 1;
					} else {
						focusedSuggestionIndex -= 1;
					}
				}
				break;
			case 13:
				if (suggestionLength) {
					this.handleSearchFocus();
					let selectedSuggestion = suggestionList[focusedSuggestionIndex];
					let newSelectedSuggestions = [...formattedSelectedValues, selectedSuggestion];

					//if (isPopupOpen) {
						focusedSuggestionIndex = 0;
						searchString = '';
						//closePopupOnly(e);
					//}

					/*else{
						togglePopup(e);
					}*/

					//togglePopup(e);
					this.setState({ focusedSuggestionIndex, searchString, formattedSelectedValues: newSelectedSuggestions }, () => {
						//if (isPopupOpen) {
							this.onSelectedItem();
							this.handleSearchFocus();
						//}
					});

					return;
				}
				break;

			case 9:
			case 27:
				isPopupOpen && closePopupOnly(e);
				break;
			default:
				focusedSuggestionIndex = 0;
				break;
		}

		this.setState({ focusedSuggestionIndex, searchString });
	}

	filterSuggestions(searchString, suggestions = [], selectedValues = [], searchKeys, searchType, valueField) {
		searchString = typeof searchString === 'number' ? searchString.toString() : searchString;
		suggestions =
			(selectedValues.length &&
				suggestions.filter(suggestion => {
					return !selectedValues.some(value => {
						return suggestion[valueField] === value[valueField];
					});
				})) ||
			suggestions;
		return (
			(searchString &&
				suggestions.filter(suggestion => {
					return (
						searchKeys &&
						searchKeys.some(searchKey => {
							let result = suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchString);
							return !(result === false || result === -1);
						})
					);
				})) ||
			suggestions
		);
	}

	handleHover(focusedSuggestionIndex) {
		this.state.focusedSuggestionIndex !== focusedSuggestionIndex && this.setState({ focusedSuggestionIndex });
	}

	handleToggleClick(ev){

		this.handleToggle(ev,this.dropPopupRef,this.placeHolderRef)
	}

	render() {
		let { searchString, focusedSuggestionIndex, inputFocus } = this.state;

		let {
			groupName,
			searchKeys,
			searchType,
			textField,
			valueField,
			styleId,
			isReadOnly,
			isPopupReady,
			isPopupOpen,
			position,
			togglePopup,
			removeClose,
			placeholder,
			noMatchesLabel,
			allowClear,

			tabIndex,
			onClick

		} = this.props;

		let stateSuggestions = this.state.formattedSuggestions;
		let stateSelectedValues = this.state.formattedSelectedValues;

		let displaySelectedItems = stateSelectedValues.map((selectedValue, i) => {
			return [
				<SelectedItem
					value={selectedValue}
					allowClear={allowClear}
					textField={textField}
					onDelete={this.handleRemove}
					key={i}
					styleId={styleId}
				/>
			];
		});

		let suggestions = this.filterSuggestions(
			searchString,
			stateSuggestions,
			stateSelectedValues,
			searchKeys,
			searchType,
			valueField
		);

		let suggestionList = null;
		if (suggestions.length) {
			suggestionList = suggestions.map((suggestion, i) => {
				let focus = focusedSuggestionIndex === i;
				return (
					<SuggestionItem
						index={i}
						key={i}
						textField={textField}
						valueField={valueField}
						onHover={this.handleHover}
						option={suggestion}
						onChange={this.handleSelect}
						focus={focus}
						styleId={styleId}
					/>
				);
			});
		} else {
			suggestionList = (<div className={style[`${styleId}_notfound`]} >{noMatchesLabel}</div>);
		}
		
		return (
			<div className={style[`${styleId}_mainrel`]} ref={this.setRef}  tabIndex={tabIndex} onClick={onClick} >
				<div ref={this.setPlaceHolderRef} className={isPopupOpen ? style[`${styleId}_mainFlexWrap`] : style[`${styleId}_mainBorder`]}
						onClick={!isReadOnly && this.handleToggleClick }>
					{displaySelectedItems}
					<span className={style[`${styleId}_inputAdjust`]}>
						<input
							className={style[`${styleId}_inputFocus`]}
							placeholder={placeholder}
							ref={this.setSearchInputRef}
							readOnly={isReadOnly}
							onKeyDown={this.handleKeyDown}
							onKeyUp={this.handleKeyUp}
							onChange={this.handleChange}
							value={searchString}
						/>
					</span>
					<div className={style[`${styleId}_clr`]} />
				</div>
				<div ref={this.setDropPopupRef}  onClick={removeClose}
				
				className={
						style[`${styleId}_droppopup`]+' '+ ( isPopupReady ? style.ready : '' ) +' '+
						( isPopupOpen ? style.opened : '')  +' '+
						(position == 'topCenter' ? style[`${styleId}_ListAdsTop`] : style[`${styleId}_ListAds`])
				}>
					{suggestionList}
				</div>
				<div className={style[`${styleId}_clr`]} />
			</div>
		);
	}
}

export default Popup(MultiSelect);

MultiSelect.defaultProps = {
	valueField: 'id',
	textField: 'name',
	searchKeys: ['name'],
	searchType: 'indexOf',
	allowClear: true,
	styleId: "default"
};

MultiSelect.propTypes = {
	styleId: PropTypes.string,
	groupName: PropTypes.string,
	placeholder: PropTypes.string,
	noMatchesLabel : PropTypes.string,
	selectedValues: PropTypes.array,
	searchKeys: PropTypes.array,
	searchType: PropTypes.string,
	textField: PropTypes.string,
	valueField: PropTypes.string,
	suggestions: PropTypes.array,
	isReadOnly: PropTypes.bool,
	isPopupOpen: PropTypes.bool,
	togglePopup: PropTypes.func,
	removeClose: PropTypes.func,
	onChange: PropTypes.func,
	closePopupOnly: PropTypes.func,

	tabIndex : PropTypes.string,
	getElementRef : PropTypes.func,
	getValue : PropTypes.func,
	onClick : PropTypes.func,

	errored : PropTypes.bool,
	focused : PropTypes.bool,
	errored : PropTypes.bool,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func
};

class SuggestionItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleHover = this.handleHover.bind(this);
	}

	handleHover() {
		let { onHover, index } = this.props;
		onHover && onHover(index);
	}

	handleSelect(e) {
		let { onChange, option } = this.props;
		onChange && onChange(option, e);
	}

	render() {
		let { focus, textField, option = {}, styleId } = this.props;

		let className = focus ? style[`${styleId}_suggestionFocus`] : style[`${styleId}_suggestion`];
		return (
			<div className={className} onClick={this.handleSelect} onMouseOver={this.handleHover}>
				{option[textField]}
			</div>
		);
	}
}

SuggestionItem.propTypes = {
	option: PropTypes.object,
	textField: PropTypes.string,
	onHover: PropTypes.func,
	onChange: PropTypes.func
};

class SelectedItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleRemove(groupName, e) {
		e.stopPropagation();

		e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
		let { onDelete, value } = this.props;
		onDelete && onDelete(value, e);
	}

	render() {
		let { textField, value = {}, allowClear,styleId } = this.props;
		return (
			<span className={style[`${styleId}_multiSel`]}>
				<Pill
					backIcon={allowClear ? { name: 'closeicon', size: 'small' } : null}
					text={value[textField]}
					onBackIconClick={this.handleRemove}
				/>
			</span>
		);
	}
}

SelectedItem.propTypes = {
	value: PropTypes.object,
	textField: PropTypes.string,
	onDelete: PropTypes.func
};
