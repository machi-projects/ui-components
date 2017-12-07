import React from 'react';
import PickOneGroupBase, { PickOneItemBase } from '../core/PickOneGroupBase';
import PropTypes from 'prop-types';

export class TabItemBase extends React.Component {
	render() {
		return null;
	}
}

TabItemBase.propTypes = {
	id: PropTypes.string.isRequired
};

export class TabsHeaderBase extends React.Component {
	render() {
		let {
			selectedTab,
			styles = {},

			onSelectTabItem,
			groupName
		} = this.props;

		let allStyles = { styles };

		return (
			<PickOneGroupBase
				{...allStyles}
				selectedItem={selectedTab}
				onSelect={(val, el) => {
					onSelectTabItem && onSelectTabItem(val, el);
				}}
			>
				{React.Children.map(this.props.children, (child, i) => {
					//let uniqueId = uniqueName + (i+1);
					//let childStyles  = child.props.styles || {};
					return (
						<PickOneItemBase key={i} pickId={child.props.id}>
							{child.props.children}
						</PickOneItemBase>
					);
				})}
			</PickOneGroupBase>
		);
	}
}

TabsHeaderBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	})
};

export class TabContentBase extends React.Component {
	render() {
		return null;
	}
}

TabContentBase.propTypes = {
	id: PropTypes.string.isRequired
};

export class TabsBodyBase extends React.Component {
	render() {
		let { selectedTab, styles = {} } = this.props;

		let allStyles = { styles };

		return (
			<PickOneGroupBase {...allStyles} selectedItem={selectedTab} itemsControls={true}>
				{React.Children.map(this.props.children, (child, i) => {
					//let childStyles  = child.props.styles || {};
					return (
						<PickOneItemBase key={i} pickId={child.props.id}>
							{child.props.children}
						</PickOneItemBase>
					);
				})}
			</PickOneGroupBase>
		);
	}
}

TabsBodyBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	})
};

export default class TabsBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = { selectedTab: this.props.selectedTab };
		// Bind the method to the component context
		this.onSelectTabItem = this.onSelectTabItem.bind(this);
	}

	onSelectTabItem(newSelectedTab, el, ev) {
		let currentTarget = ev ? ev.currentTarget : null;
		this.setState({ selectedTab: newSelectedTab }, function() {
			this.props.onSelectTab && this.props.onSelectTab(this.props.groupName, this.state.selectedTab, currentTarget);
		});
	}

	render() {
		let { tabsStyle, groupName } = this.props;

		return (
			<div className={tabsStyle}>
				{React.Children.map(this.props.children, (child, i) => {
					if (child.type.prototype === TabsHeaderBase.prototype) {
						return React.cloneElement(child, {
							onSelectTabItem: this.onSelectTabItem,
							selectedTab: this.state.selectedTab,
							groupName: groupName
						});
					} else if (child.type.prototype === TabsBodyBase.prototype) {
						return React.cloneElement(child, { selectedTab: this.state.selectedTab });
					}
				})}
			</div>
		);
	}
}

TabsBase.defaultProps = {
	styles: {}
};

TabsBase.propTypes = {
	tabsStyle: PropTypes.string,
	groupName: PropTypes.string,
	selectedTab: PropTypes.string,
	onSelectTab: PropTypes.func,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['TabsHeaderBase', 'TabsBodyBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['TabsHeaderBase', 'TabsBodyBase']) }))
	])
};
