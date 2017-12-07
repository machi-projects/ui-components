import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBoxBase extends Component {
	constructor(props) {
		super(props);
		this.state = { searchText: props.text };
		this.updateSearchItem = this.updateSearchItem.bind(this);
		this.clearSearchItem = this.clearSearchItem.bind(this);
		this.onSearchInput = this.onSearchInput.bind(this);
		this.triggerSearchItem = this.triggerSearchItem.bind(this);
	}

	componentWillReciverProps(prevProps) {
		//onSearchItem( trigger );
	}

	updateSearchItem(searchText) {
		this.setState(
			state => {
				state.searchText = searchText;
			},
			() => {
				this.triggerSearchItem();
			}
		);
	}

	clearSearchItem() {
		this.updateSearchItem('');
	}

	onSearchInput(ev) {
		this.updateSearchItem(ev.target.value);
	}

	triggerSearchItem() {
		this.props.onChange && this.props.onChange(this.state.searchText);
	}

	render() {
		let { searchOn, searchBoxStyle } = this.props;
		return (
			<div className={searchBoxStyle}>
				{React.Children.map(this.props.children, (child, i) => {
					if (child.type.name === 'InputBox') {
						return React.cloneElement(child, {
							[searchOn]: this.onSearchInput,
							value: this.state.searchText
						});
					} else if (child.type.name === 'SearchIcon') {
						return React.cloneElement(child, {
							onClick: this.triggerSearchItem
						});
					} else if (child.type.name === 'ClearIcon') {
						return this.state.searchText
							? React.cloneElement(child, {
									onClick: this.clearSearchItem
								})
							: null;
					}
					return null;
				})}
			</div>
		);
	}
}

SearchBoxBase.defaultProps = {
	searchOn: 'onChange'
};

SearchBoxBase.propTypes = {
	searchBoxStyle: PropTypes.string,
	searchOn: PropTypes.string,
	text: PropTypes.string,
	onChange: PropTypes.func
};
