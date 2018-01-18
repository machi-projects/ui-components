import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { FormatText } from 'fz-i18n';
import style from './DropDown.css';
import Popup from '../Popup';
import { Icon } from '../../index';
import { formatValue , formatSelectedValue } from '../common';

import validator from '../../../utils/validator';
import { deepEqualObject } from '../../../utils/objectUtils';

class DropDown extends React.Component {
	constructor(props) {
		super(props);
		let { selected, count, selectedOptName, options } = formatSelectedValue(
			formatValue(props.options,props.valueField,props.textField),
			props.selectedValue,
			props.valueField ,
			props.textField
		);

		this.state = {
			options,
			selectedOptName,
			selected,
			count,
			searchStr: ''
		};

		this.handleOnSelect = this.handleOnSelect.bind(this);
		this.handleOnSearch = this.handleOnSearch.bind(this);
		this.filterSuggestion = this.filterSuggestion.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);

		this.setRef = this.setRef.bind(this);
		this.setDropPopupRef = this.setDropPopupRef.bind(this);
		this.setPlaceHolderRef = this.setPlaceHolderRef.bind(this);
		//this.setSearchInputRef = this.setSearchInputRef.bind(this);
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

	handleOnSelect(val, optName, count, e) {
		this.setState({ selected: val, selectedOptName: optName, count: count }, () => {
			this.onChangeValue(this.state.selected, this.props.groupName, e)
			if (this.props.validation && this.props.validation.validateOn) {
				this.validateOnSelect(this.state.selected, this.props);
			}
		});
		this.props.closePopupOnly && this.props.closePopupOnly(e);
	}

	shouldComponentUpdate(nextProps, nextState)
	{
		return ((deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false));
	}

	componentWillReceiveProps(nextProps) {

		if (	 deepEqualObject( nextProps.selectedValue , this.state.selected) == false ) {

			let { selected, count, selectedOptName } = formatSelectedValue(this.state.options,
					nextProps.selectedValue,
					this.props.valueField,
					this.props.textField)

			this.setState({ selectedOptName, selected, count });
		}

		if (	 deepEqualObject(nextProps.options , this.props.options) == false) {

			let options = formatValue(nextProps.options,this.props.valueField,this.props.textField);
			this.setState({options});
		}

		if( deepEqualObject(nextProps.validation,this.props.validation) == false && nextProps.validation && nextProps.validation.validate ){
			this.validateOnSelect(this.state.selected, nextProps);
		}
	}

	validateOnSelect(value, props) {
		let defaultCheckPropsRules = ['required'];
		let defaultValidateRules = ['required','minLength','maxLength'];
		let defaultType = 'onegroup';

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

	keyPress(e) {
		let keyCode = e.keyCode;
		let { togglePopup , valueField , groupName } = this.props;
		let { count, searchStr } = this.state;
		let options = this.filterSuggestion(this.state.options, searchStr);
		if (options.length) {
			if (keyCode == 38) {
				if (count === 0) {
					count = options.length - 1;
				} else {
					count -= 1;
				}
				this.setState({ count });
			}

			if (keyCode == 40) {
				if (count === options.length - 1) {
					count = 0;
				} else {
					count += 1;
				}
				this.setState({ count });
			}

			if (keyCode == 13) {
				var opt = options[this.state.count],
					val = opt[valueField];
				this.setState({ selected: val });

				this.onChangeValue(val, groupName, e);
				togglePopup && togglePopup(e);
			}
		}
	}
	togglePopup(e, dropRef , placeHolderRef ) {
		this.setState({ searchStr: '' });
		let con = this.refs.suggestionContainer;
		let elem = this.refs['suggestion_' + this.state.count];
		elem && ( con.scrollTop = elem.offsetTop - 33 )
		this.props.togglePopup(e, dropRef , placeHolderRef);
		requestAnimationFrame(() => {
			this.refs.input && this.refs.input.focus();
		});
	}
	handleOnSearch(e) {
		this.setState({ searchStr: e.target.value, count: 0 });
	}

	onChangeValue(val, groupName, e){
		this.props.onChange && this.props.onChange(val, groupName, e);
		this.props.getValue && this.props.getValue(val);
	}

	filterSuggestion(options = [], searchStr) {

		let textField = this.props.textField;
		let valueField = this.props.valueField;

		let minimumResultsForSearch = this.props.minimumResultsForSearch;
		let suggestions = options.filter((opt, index) => {
			let val = opt[valueField],
				name = opt[textField];
			return name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1;
		});

		suggestions = suggestions.length ? suggestions : [];
		if (minimumResultsForSearch > 0 && searchStr) {
			return suggestions.splice(0, minimumResultsForSearch);
		}

		return suggestions;
	}

	componentDidUpdate(prevProps,prevState) {

		var suggestionContainer = ReactDom.findDOMNode(this.refs.suggestionContainer);
		var selSuggestion = ReactDom.findDOMNode(this.refs['suggestion_' + this.state.count]);
		if (selSuggestion && suggestionContainer) {
			if (suggestionContainer.scrollHeight == selSuggestion.offsetTop + selSuggestion.offsetHeight) {
				suggestionContainer.scrollTop = selSuggestion.offsetTop - 200;
			} else if (selSuggestion.offsetTop == 0) {
				suggestionContainer.scrollTop = 0;
			} else if (suggestionContainer.offsetHeight + suggestionContainer.scrollTop < selSuggestion.offsetTop) {
				suggestionContainer.scrollTop = selSuggestion.offsetTop - 200;
			} else if (suggestionContainer.scrollTop > selSuggestion.offsetTop) {
				suggestionContainer.scrollTop = selSuggestion.offsetTop - 30;
			}
		}

	}

	componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(this.state.selected, this.props);
		}
	}

	render() {

		let {
			isPopupReady,
			isPopupOpen,
			position,
			removeClose,
			isError,
			placeholder,
			minimumResultsForSearch,
			enableSeachOptionsCount,

			tabIndex,
			onClick,
			textField,
			valueField,
			styleId

		} = this.props;

		let options = this.state.options;

		let arrowopen = isPopupOpen ? style[`${styleId}_arrowUp`] : style[`${styleId}_arrowDown`];
		let suggestions = this.filterSuggestion(options, this.state.searchStr);

		let enableSearch = minimumResultsForSearch > 0 && options.length >= enableSeachOptionsCount;
		return (
			<div className={style[`${styleId}_main`]} ref={this.setRef} tabIndex={tabIndex} onClick={onClick} >
				<div onClick={(e)=>{ this.togglePopup(e , this.dropPopupRef , this.placeHolderRef ) }}
				ref={this.setPlaceHolderRef}>
					<div
						className={
							isError ? style[`${styleId}_isError`] + ' ' + style[`${styleId}_dropdown`] + ' ' + arrowopen : style[`${styleId}_dropdown`] + ' ' + arrowopen
						}
					>
						<span className={style[`${styleId}_selectname`]}>
							{this.state.selectedOptName}
						</span>
					</div>
				</div>
				<div ref={this.setDropPopupRef}  onClick={removeClose}
				className={
						style[`${styleId}_droppopup`]+' '+ ( isPopupReady ?style.ready : '' ) +' '+
						( isPopupOpen ? style.opened : '')  +' '+
						(position == 'top' ? style[`${styleId}_listViewTop`] : style[`${styleId}_listview`])
				} >


					{enableSearch &&
						<div className={style[`${styleId}_posRel`]} >
							<input
								type="text"
								ref="input"
								className={style[`${styleId}_searchicon`]}
								placeholder={placeholder}
								onKeyDown={this.keyPress.bind(this)}
								onChange={this.handleOnSearch}
								value={this.state.searchStr}

							/>
							<div className={style[`${styleId}_searchIconPosSet`]}>
								<Icon id="searchIcon" color="greyshade2" size="size15" />
							</div>
						</div>}
					{suggestions.length
						? <ul className={style[`${styleId}_listmenu`]} ref="suggestionContainer">
								{suggestions.map((opt, index) => {

									let val = opt[valueField];
									let name = opt[textField];

									return (
										<li
											key={index + 'opt'}
											ref={'suggestion_' + index}
											className={this.state.count == index ? style[`${styleId}_bccolor`] : style[`${styleId}_normal`]}
											onClick={this.handleOnSelect.bind(this, val, name, index)}
										>
											{name}
										</li>
									);
								})}
							</ul>
						: <FormatText i18NKey="No matches found" className={style[`${styleId}_notfound`]} type="div" />}
				</div>
			</div>
		);
	}
}

export default Popup(DropDown);

DropDown.defaultProps = {
	minimumResultsForSearch: Infinity,
	enableSeachOptionsCount: 1,
	textField : "name",
	valueField : "id",
	styleId : "default"
};

DropDown.propTypes = {
	styleId:PropTypes.string,
	options: PropTypes.array,
	defaultOptions: PropTypes.array,
	id: PropTypes.string,
	textField : PropTypes.string,
	isPopupOpen: PropTypes.bool,
	position: PropTypes.string,
	removeClose: PropTypes.func,
	isError: PropTypes.bool,
	onChange: PropTypes.func,
	groupName: PropTypes.string,
	selectedValue: PropTypes.string,
	togglePopup: PropTypes.func,

	tabIndex : PropTypes.string,
	getElementRef : PropTypes.func,
	getValue : PropTypes.func,
	onClick : PropTypes.func,

	raised : PropTypes.bool,
	focused : PropTypes.bool,
	errored : PropTypes.bool,

	minimumResultsForSearch: PropTypes.number,
	enableSeachOptionsCount: PropTypes.number,

	placeholder: PropTypes.string,
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
