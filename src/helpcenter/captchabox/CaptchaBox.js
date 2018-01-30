import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputText } from '../index';

import { Icon } from '../index';


import styles from './captchabox.css';
import inputStyles from '../input/inputtext/inputtext.css';
import styleMapping from './styleMapping';



import cx from '../../utils/classNamesUtils/classNamesBind';

export default class CaptchaBox extends Component {
	
	render() {

		const {
			styleId,
			
			disabled,
			focused,
			errored,
			valid,
			raised
			
		} = this.props;

		let classNames = cx(styles, {
			[styleId]: true,

			disabled: disabled,
			focused: focused,
			errored: errored,
			valid: valid,
			raised: raised
		});
		
		
		let styleMappings = styleMapping[styleId];
		let textboxViewStyle = styles[styleMappings.textboxViewStyle];
		let captchaInnerViewStyle = styles[styleMappings.captchaInnerView];
		let captchaImgStyle = styles[styleMappings.captchaImgStyle];
		let refreshStyle = styles[styleMappings.refreshStyle];
		
		let inputStyleId = styleMappings.inputStyleId;
	
		let { value , maxLength , placeholder ,getValue, captchaUrl , onRefresh, getElementRef , onChange, validation , onFailValidation , onPassValidation } = this.props;
		
		return (<div className={classNames}>
			
					<div className={textboxViewStyle}>
						
					</div>
		
					<div className={captchaInnerViewStyle}>
						<img className={styles.captchaImgStyle} src={captchaUrl} />
						<span className={refreshStyle} onClick={onRefresh}>
							<Icon id="refresh" color="dustyGray" styleId="refresh_icon" />
						</span>
						
						<InputText type="text"
							styleId={inputStyleId}
							placeholder={placeholder}
							maxLength={maxLength} 
							value={value}
							onChange={onChange}
							getElementRef={getElementRef}
							getValue={getValue}
							validation={validation}
							onFailValidation={onFailValidation}
							onPassValidation={onPassValidation}
						/>
						
						</div>
						
			</div>
		);
	}
	
}

CaptchaBox.defaultProps = {
	styleId : "default"	
}

CaptchaBox.propTypes = {
		
	styleId: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.string,
	value: PropTypes.string,
	getValue : PropTypes.func,
	getElementRef: PropTypes.func,
	
	onChange: PropTypes.func,
	onRefresh: PropTypes.func,
	captchaUrl: PropTypes.string.isRequired,
	
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,
	
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool,
	
	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rules: PropTypes.object,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		messages: PropTypes.object
	})
	
};

if (__DOCS__) {
	CaptchaBox.docs = {
		componentGroup: 'Atom'
	};
}
