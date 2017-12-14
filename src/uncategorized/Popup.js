import React from 'react';
import ReactDOM from 'react-dom';
import hoistStatics from 'hoist-non-react-statics';

var popups = {};
global.closeGroupPopups = function(groupName) {
	let groupPopups = popups[groupName] || [];
	groupPopups.forEach(popup => {
		popup.state.isPopupOpen &&
			popup.setState({
				isPopupOpen: false
			});
	});
};

var Popup = function(Component, group = 'global') {
	class Popup extends React.Component {
		constructor(props) {
			super(props);
			this.state = { isPopupOpen: false, position: 'bottom', height: '0px' };
			this.togglePopup = this.togglePopup.bind(this);
			this.documentClickHandler = this.documentClickHandler.bind(this);
			this.removeClose = this.removeClose.bind(this);
			this.documentKeyupHandler = this.documentKeyupHandler.bind(this);
			this.openPopupOnly = this.openPopupOnly.bind(this);
			this.closePopupOnly = this.closePopupOnly.bind(this);
			this.setRef = this.setRef.bind(this);
		}

		setRef(el){
			this.elementRef = el;
		}
		
		componentDidMount() {
			let groupPopups = popups[group] || [];
			groupPopups.push(this);
			popups[group] = groupPopups;
			if (groupPopups.length == 1) {
				document.addEventListener('click', this.documentClickHandler, false);
				document.addEventListener('keyup', this.documentKeyupHandler, false);
			}
		}

		componentWillUnmount() {
			popups = Object.keys(popups).reduce((res, groupName) => {
				if (groupName == group) {
					let groupPopups = popups[group];
					let newGroupPopups = groupPopups.filter(popup => {
						return popup !== this;
					});
					res[group] = newGroupPopups;
				}
				return res;
			}, popups);

			if (popups.length == 0) {
				document.removeEventListener('click', this.documentClickHandler);
				document.removeEventListener('keyup', this.documentKeyupHandler);
			}
		}

		togglePopup(e) {
			this.removeClose(e);
			let groupPopups = popups[group];
			groupPopups.forEach(popup => {
				if (popup != this) {
					popup.state.isPopupOpen &&
						popup.setState({
							isPopupOpen: false,
							position: 'bottom'
						});
				}
			});
			
			requestAnimationFrame(()=>{
				
				var element = ReactDOM.findDOMNode(this.elementRef).getBoundingClientRect();
				var  frame = this.props.frameId ? document.getElementById(this.props.frameId) : null;
				frame = frame || document.documentElement
				var frameRects  = frame.getBoundingClientRect()
				if ( frameRects.height < element.bottom ) {
					this.setState({ isPopupOpen: !this.state.isPopupOpen, position: 'top', height: element.height });
				} else {
					this.setState({ isPopupOpen: !this.state.isPopupOpen, position: 'bottom' });
				}
				
			})
			
		}

		openPopupOnly(e) {
			this.removeClose(e);
			this.setState({ isPopupOpen: true });
		}

		closePopupOnly(e) {
			this.removeClose(e);
			this.setState({ isPopupOpen: false });
		}

		documentClickHandler(e) {
			try {
				Object.keys(popups).forEach(groupName => {
					let groupPopups = popups[groupName];
					groupPopups.forEach(popup => {
						popup.state.isPopupOpen &&
							popup.setState({
								isPopupOpen: false
							});
					});
				});
			} catch (e) {
				console.error('popup component not unmounted properly', e);
			}
		}

		documentKeyupHandler(e) {
			try {
				if (e.keyCode == 27) {
					Object.keys(popups).forEach(groupName => {
						let groupPopups = popups[groupName];
						groupPopups.forEach(popup => {
							popup.state.isPopupOpen &&
								popup.setState({
									isPopupOpen: false
								});
						});
					});
				}
			} catch (e) {
				console.log('error', e);
			}
		}
		
		removeClose(e) {
			e.stopPropagation && e.stopPropagation();
			e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
		}

		render() {
			return (
				<Component
					ref={this.setRef}
					{...this.props}
					{...this.state}
					openPopupOnly={this.openPopupOnly}
					closePopupOnly={this.closePopupOnly}
					togglePopup={this.togglePopup}
					isPopupOpen={this.state.isPopupOpen}
					removeClose={this.removeClose}
				/>
			);
		}
	}

	return hoistStatics(Popup, Component);
};

export default Popup;
