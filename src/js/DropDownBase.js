import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlobalEventLayerBase from './GlobalEventsLayerBase';
import PickOneGroupBase, { PickOneItemBase } from '../core/PickOneGroupBase';
import contains from '../utils/dom/contains';

class DropDownItemsBase extends Component {
	constructor(props) {
		super(props);
	}

	filterChildrenList(childrenList, props) {
		let { searchText, searchTextMinLength, searchMatch, searchResultsOnQuery, searchResultsCount } = props;
		if (searchText && searchText.length >= searchTextMinLength) {
			let searchChildrenList = React.Children.map(childrenList, (child, i) => {
				if (searchMatch !== null) {
					if (props.searchMatch(searchText, child.props.searchText)) {
						return child;
					}
				} else if (child.props.searchText != null) {
					if (child.props.searchText.indexOf(searchText) !== -1) {
						return child;
					}
				} else if (child.props.value.indexOf(searchText) !== -1) {
					return child;
				}
			});

			return searchChildrenList.slice(0, searchResultsCount ? searchResultsCount : searchChildrenList.length);
		}

		return childrenList;
	}

	render() {
		let {
			dropDownItemsStyle,
			styles,
			selectedItem,
			onSelect,
			messages,
			required,
			validation,
			onPassValidation,
			onFailValidation
		} = this.props;
		let allStyles = { styles };

		let childrenList = filterChildrenList(this.props.children, this.props);
		let searchResultNotFound = this.props.searchText && childrenList.length < 0;
		let message = null;
		if (searchResultNotFound) {
			message = messages.searchOnEmpty ? messages.searchOnEmpty(this.props.searchText) : null;
		} else if (this.props.searching) {
			message = messages.onSearching ? messages.onSearching() : null;
		} else if (this.props.initialLoading) {
			message = messages.initialLoading ? messages.initialLoading() : null;
		} else if (this.props.loaded) {
			message = messages.loaded ? messages.loaded() : null;
		}
		message && message.type.name == 'Message' ? message : null;

		return (
			<div className={dropDownItemsStyle}>
				{childrenList && childrenList.length > 0
					? <PickOneGroupBase
							required={required}
							validation={validation}
							onPassValidation={onPassValidation}
							onFailValidation={onFailValidation}
							{...allStyles}
							selectedItem={selectedItem}
							onSelect={onSelect}
						>
							{childrenList.map((child, i) => {
								return (
									<PickOneItemBase key={i} pickId={child.props.value}>
										{child.props.children}
									</PickOneItemBase>
								);
							})}
						</PickOneGroupBase>
					: message ? message : 'No Results Found'}
			</div>
		);
	}
}

DropDownItemsBase.defaultProps = {
	styles: {},
	searchTextMinLength: 1
};

DropDownItemsBase.propTypes = {
	dropDownItemsStyle: PropTypes.string,
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),

	required: PropTypes.bool,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.oneOf(['onClick']),
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemBase']) }))
	])
};

//highlightSearchItems -- will be coming soon...
class DropDownItemBase extends Component {
	render() {
		return null;
	}
}

DropDownItemBase.propTypes = {
	value: PropTypes.string,
	searchText: PropTypes.string
};

export default class DropDownBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onOpen: props.isOpen || false,
			searchText: props.searchText || ''
		};

		this.toggleItem = this.toggleItem.bind(this);
		this.onSearchItem = this.onSearchItem.bind(this);
		this.setRef = this.setRef.bind(this);
	}

	setRef(el) {
		this.elementRef = el;
	}

	toggleItem(close) {
		this.setState(
			state => {
				state.isOpen = close == 'close' || !state.isOpen;
			},
			() => {
				if (this.state.isOpen) {
					this.props.onOpen && this.props.onOpen();
				} else {
					this.props.onClose && this.props.onClose();
				}
			}
		);
	}

	onSearchItem(text) {
		this.setState(
			state => {
				state.searchText = text;
			},
			() => {
				this.props.onSearch && this.props.onSearch();
			}
		);
	}

	onSelectItem(item, target) {
		this.setState(
			state => {
				state.selectedItem = item;
				state.displayText = target.innerText;
			},
			() => {
				toggleItem();
				this.props.onSelect && this.props.onSelect(this.props.groupName, this.state.selectedItem, target);
			}
		);
	}

	onClickDropDown() {}

	isNotDropDownElement(ev) {
		return;
	}

	onEscapeOutSide(ev) {
		if (ev.keyCode == 27) {
			toggleItem(true);
		}
	}

	onClickOutSide(ev) {
		if (!contains(this.elementRef, ev.currentTarget) || this.elementRef !== ev.currentTarget) {
			toggleItem(true);
		}
	}

	onKeyUpDropDown() {
		// adjument drop down items
	}

	render() {
		let {
			dropDownStyle,
			selectedItem,
			validation,
			groupName,
			required,
			onPassValidation,
			onFailValidation,
			messages,
			searchResultsOnQuery,
			searchMatch,
			searchResultCount,
			searchTextMinLength,
			enableSearchOnItemsCount
		} = this.props;

		return (
			<div className={dropDownStyle} ref={this.setRef} tabIndex="-1">
				{React.Children.map(this.props.children, (child, i) => {
					if (child.type.name === 'SelectionBox') {
						return React.cloneElement(
							child,
							{
								onClick: this.toggleItem,
								isDropOpen: this.state.isOpen
							},
							this.state.selectedItem
								? child.props.onselection ? child.props.onselection(this.state.selectedItem) : this.state.displayText
								: child.props.children
						);
					} else if (child.type.name === 'SearchBox') {
						return enableSearchOnItemsCount > 0
							? React.cloneElement(child, {
									onChange: this.onSearchItem,
									text: this.state.searchText
								})
							: null;
					} else if (child.type.name === 'DropDownItemsBase') {
						return this.state.isOpen
							? React.cloneElement(child, {
									searchText: this.state.searchText,

									searchTextMinLength: searchTextMinLength,
									searchResultsCount: searchResultCount,
									searchMatch: searchMatch,
									searchResultsOnQuery: searchResultsOnQuery,
									messages: messages,

									onSelect: this.onSelectItem,
									selectedItem: selectedItem,
									validation: validation,
									required: required,
									onPassValidation: onPassValidation,
									onFailValidation: onFailValidation
								})
							: null;
					}
					return null;
				})}

				<GlobalEventsLayerBase keyup={this.onEscapeOutSide} click={this.onClickOutSide} />
			</div>
		);
	}
}

DropDownBase.propTypes = {
	dropDownStyle: PropTypes.string,
	selectedItem: PropTypes.func,

	searchText: PropTypes.string,
	searchResultsOnQuery: PropTypes.func,
	searchTextMinLength: PropTypes.number,
	searchResultsCount: PropTypes.number,
	searchMatch: PropTypes.func,
	enableSearchOnItemsCount: PropTypes.number,

	messages: PropTypes.shape({
		searchOnEmpty: PropTypes.func
	}),

	required: PropTypes.bool,
	groupName: PropTypes.string,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.oneOf(['onClick']),
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemsBase', 'SearchBox', 'SelectionBox']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemsBase', 'SearchBox', 'SelectionBox']) }))
	])
};

//
// <DropDownBase selectedItem={} minimumResultsForSearch={0} searchLogic={} highlightSearchItems={} searchText="hhsh" searchComponent={} labelComponent={}  >
//
//   <div>  { labelComponent -- onClick --> this.state.isOpen }</div>
//
//   <div onUpArrow onDownArrow onRightArrow onLeftArrow >
//       <div> { searchComponent -- onSearch--> this.setState.searchText } <div>
//
//       {React.child.map( this.props.children ,(child , i )=>{
//
//           let renderChild = null;
//           if( this.state.searchText ){
//
//             if( this.props.searchLogic !== null ){
//               if( this.props.searchLogic( this.state.searchText , child.props.searchText ) ){
//                   renderChild =  child;
//               }
//             }
//             else if( child.props.searchText.indexOf(this.state.searchText) != -1 ){
//                 renderChild =  child;
//             }
//
//             if( this.props.highlightSearchItems ){
//                   renderChild = React.cloneElement(child,{},highlightSearchItems( React.only( child.children ) , text )) ;
//             }
//
//           }
//
//             if( selectedItem ){
//
//             }
//           return <div className={itemStyle} > renderChild </div>
//
//
//       } )}
//
//         <DropDownItem value=""  searchText="" >{ content }</DropDownItem>
//
//         <DropDownItem value=""  searchText="" >{ content }</DropDownItem>
//
//         <DropDownItem value=""  searchText="" >{ content }</DropDownItem>
//     </div>
//     <Freezelaer of the year onClick={}  onEscape onUpArrow onDownArrow onRightArrow onLeftArrow  />
// </DropDownBase>
//
//
// <searchComponent onSearch={ text } />
//
//
// Gdfult = obalalla(DropDownBase,{
// 		keyup : ()=>{}
// 		click : ()=>{}
// 		mousedown : ()=>{
// 			DropDownBase.this
// 		}
// })
//
// DropDownLabelBase;
//
// DropDownSearchBoxBase;
//
// DropDownBase;
//
// DropDownItems;
