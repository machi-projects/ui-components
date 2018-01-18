import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBoxBase extends Component {
	constructor(props) {
		super(props);
		this.state = { searchText: props.text, isCollaspe : props.isCollaspe  };
		this.updateSearchItem = this.updateSearchItem.bind(this);
		this.clearSearchItem = this.clearSearchItem.bind(this);
		this.onSearchInput = this.onSearchInput.bind(this);
		this.triggerSearchIconItem = this.triggerSearchIconItem.bind(this);
	}

	updateSearchItem(searchText) {
		this.setState(
			state => {
				state.searchText = searchText;
				return state;
			},
			() => {
				this.props.onChange && this.props.onChange(this.state.searchText);
			}
		);
	}
	
	componentWillReceiveProps(nextProps) {
	    if (nextProps.text != this.state.text) {
	    		this.setState({ searchText : nextProps.text });
	    	    //this.updateSearchItem(nextProps.text)
		}
	}

	clearSearchItem() {
	
		this.setState({ searchText : ''},()=>{
			this.props.onClickClearSeach && this.props.onClickClearSeach();
		});
	}

	onSearchInput(ev) {
		this.updateSearchItem(ev.target.value);
	}

	componentDidUpdate(prevProps,prevState){
		
		if(prevProps.isCollaspe !== this.props.isCollaspe && this.props.isCollaspe == false){
			this.inputElementRef && this.inputElementRef.focus();
		}
		
	}
	
	triggerSearchIconItem() {
		
		this.props.onClickSearch && this.props.onClickSearch(this.state.searchText);
	
	}

	render() {
		
		let { searchOn, searchBoxStyle , isCollaspe , placeholder, searchBoxCollaspeStyle , searchBoxFloatStyle , floatboxStyle, searchBoxInnerStyle, floatLabelOnSearchBox  } = this.props;
		let isFloatLabel = floatLabelOnSearchBox ? true : false;
	
		return (
			<div className={ searchBoxStyle +' '+( isCollaspe ? searchBoxCollaspeStyle : '' )+' '+(isFloatLabel? searchBoxFloatStyle : '') }>
				
			  { isFloatLabel ? (<span className={ floatboxStyle }>{ floatLabelOnSearchBox }</span>) : null }
			  
			   <div className={searchBoxInnerStyle} >
			   
			   {React.Children.map(this.props.children, (child, i) => {
					if (child.props.typeName === 'InputBox') {
						return React.cloneElement(child, {
							[searchOn]: this.onSearchInput,
							value: this.state.searchText,
							placeholder ,
							getElementRef : (a)=>{
								this.inputElementRef = a;
							}
						});
					} else if (child.props.typeName === 'SearchIcon') {
						
						return React.cloneElement(child, {
							onClick: this.triggerSearchIconItem,
							isSearching : this.state.searchText ? true : false
						});
						
					} else if (child.props.typeName === 'ClearIcon') {
						return React.cloneElement(child, {
							onClick: this.clearSearchItem,
							isSearching : this.state.searchText ? true : false
						});
					}
					return null;
				})}
			   
			   </div>
			</div>
			
		);
	}
}

SearchBoxBase.defaultProps = {
	searchOn: 'onChange',
	isCollaspe : false
};

SearchBoxBase.propTypes = {
	searchBoxStyle: PropTypes.string,
	searchBoxInnerStyle:PropTypes.string,
	searchBoxCollaspeStyle : PropTypes.string,
	searchBoxFloatStyle : PropTypes.string,
	floatboxStyle : PropTypes.string,
	searchOn: PropTypes.string,
	placeholder : PropTypes.string,
	text: PropTypes.string,
	isCollaspe : PropTypes.bool,
	onChange: PropTypes.func,
	onClickClearSeach : PropTypes.func,
	onClickSearch : PropTypes.func
};
