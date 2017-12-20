import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { FormatText } from 'fz-i18n';
import style from './DropDown.css';
import Popup from '../Popup';
import { Icon } from '../../index';
import { formatValue } from '../common';

import validator from '../../../utils/validator';
import {  equals } from '../../../utils/objectUtils';

const getSelectedValue = function(options, value) {
	var selected = value,
		count = 0,
		selectedOptName = value;

	options.forEach((opt, index) => {
		let val = opt,
			name = opt;
		if (typeof opt == 'object') {
			val = opt.id;
			name = opt.name;
		}

		if (value == val) {
			selected = val;
			count = index;
			selectedOptName = name;
		}
	});
	return { selected, count, selectedOptName, options };
};

class DropDown extends React.Component {
	constructor(props) {
		super(props);
		let { selected, count, selectedOptName, options } = getSelectedValue(
			formatValue(props.defaultOptions),
			props.defaultValue
		);
		this.state = {
			options,
			selectedOptName,
			selected,
			count,
			searchStr: ''
		};
		
		this.textidchange = this.textidchange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.filterSuggestion = this.filterSuggestion.bind(this);
		this.togglePopup = this.togglePopup.bind(this);

		this.setRef = this.setRef.bind(this);
		this.setDropPopupRef = this.setDropPopupRef.bind(this);
		this.setPlaceHolderRef = this.setPlaceHolderRef.bind(this);
		
	}

	setRef(el) {
		this.elementRef = el;
	}

	setDropPopupRef(el) {
		this.dropPopupRef = el;
	}
	
	setPlaceHolderRef(el) {
		this.placeHolderRef = el;
	}

	textidchange(id, opt, count, e) {
		this.setState({ selected: id, selectedOptName: opt, count: count }, () => {
			this.props.onChange && this.props.onChange(this.state.selected, this.props.groupName, e);
			if (this.props.validation && this.props.validation.validateOn) {
				this.validateOnSelect(this.state.selected, this.props);
			}
		});
	}

	componentWillReceiveProps(nextprops) {
		
		if ( (nextprops.value && nextprops.value !== this.props.value) || (nextprops.options && !equals(nextprops.options , this.props.options) )) {

			this.setState(getSelectedValue(formatValue(nextprops.options), nextprops.value));
		}

		if (nextprops.validation != null && nextprops.validation.validate) {
			this.validateOnSelect(this.state.selected, nextprops);
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
		let { onChange, id, togglePopup } = this.props;
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
					val = opt;
				if (typeof opt == 'object') {
					val = opt.id;
				}
				this.setState({ selected: val });
				onChange && onChange(val, id, e);
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
	handleChange(e) {
		this.setState({ searchStr: e.target.value, count: 0 });
	}

	filterSuggestion(options = [], searchStr) {
		let minimumResultsForSearch = this.props.minimumResultsForSearch;
		let suggestions = options.filter((opt, index) => {
			let val = opt.id,
				name = opt.name;
			return name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1;
		});

		suggestions = suggestions.length ? suggestions : [];
		if (minimumResultsForSearch > 0 && searchStr) {
			return suggestions.splice(0, minimumResultsForSearch);
		}

		return suggestions;
	}

	componentDidUpdate(prevProps) {
		
		if(this.props.fireEvent!==prevProps.fireEvent  && this.props.fireEvent){
			requestAnimationFrame(()=>{
				this.elementRef && this.elementRef[this.props.fireEvent] && this.elementRef[this.props.fireEvent]();
			})
		}
		
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
		if(this.props.fireEvent!=null){
			requestAnimationFrame(()=>{
				this.elementRef  && this.elementRef[this.props.fireEvent] && this.elementRef[this.props.fireEvent]();
			});
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
			focusIn,
			focusOut,
			onClick
			
		} = this.props;
		let options = this.state.options;

		let arrowopen = isPopupOpen ? style.arrowUp : style.arrowDown;
		let suggestions = this.filterSuggestion(options, this.state.searchStr);

		let enableSearch = minimumResultsForSearch > 0 && options.length >= enableSeachOptionsCount;
		return (
			<div className={style.main} ref={this.setRef} tabIndex={tabIndex} onFocus={focusIn} onBlur={focusOut} onClick={onClick} >
				<div onClick={(e)=>{ this.togglePopup(e , this.dropPopupRef , this.placeHolderRef ) }} 
				ref={this.setPlaceHolderRef}>
					<div
						className={
							isError ? style.isError + ' ' + style.dropdown + ' ' + arrowopen : style.dropdown + ' ' + arrowopen
						}
					>
						<span className={style.selectname}>
							{this.state.selectedOptName}
						</span>
					</div>
				</div>
				<div ref={this.setDropPopupRef} 
				className={
						style.droppopup+' '+ ( isPopupReady ? style.ready : '' ) +' '+ 
						( isPopupOpen ? style.opened : '')  +' '+
						(position == 'top' ? style.listViewTop : style.listview) 
				} >
				
				
					{enableSearch &&
						<div className={style.posRel}>
							<input
								type="text"
								ref="input"
								className={style.searchicon}
								placeholder={placeholder}
								onKeyDown={this.keyPress.bind(this)}
								onChange={this.handleChange}
								value={this.state.searchStr}
							/>
							<div className={style.searchIconPosSet}>
								<Icon id="searchIcon" color="greyshade2" size="size15" />
							</div>
						</div>}
					{suggestions.length
						? <ul className={style.listmenu} ref="suggestionContainer">
								{suggestions.map((opt, index) => {
									let val = opt,
										name = opt;
									if (typeof opt == 'object') {
										val = opt.id;
										name = opt.name;
									}
									return (
										<li
											key={index + 'opt'}
											ref={'suggestion_' + index}
											className={this.state.count == index ? style.bccolor : style.normal}
											onClick={this.textidchange.bind(this, val, name, index)}
										>
											{name}
										</li>
									);
								})}
							</ul>
						: <FormatText i18NKey="No matches found" className={style.notfound} type="div" />}
				</div>
			</div>
		);
	}
}

export default Popup(DropDown);

DropDown.defaultProps = {
	minimumResultsForSearch: Infinity,
	enableSeachOptionsCount: 1
};

DropDown.propTypes = {
	options: PropTypes.array,
	defaultOptions: PropTypes.array,
	id: PropTypes.string,
	isPopupOpen: PropTypes.bool,
	position: PropTypes.string,
	removeClose: PropTypes.func,
	isError: PropTypes.bool,
	onChange: PropTypes.func,
	groupName: PropTypes.string,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	togglePopup: PropTypes.func,

	fireEvent : PropTypes.string,
	tabIndex : PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func,
	onClick : PropTypes.func,
	
	raised : PropTypes.bool,
	focused : PropTypes.bool,
	
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
