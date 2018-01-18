import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonBase from '../../js/ButtonBase';
import styles from './button.css';

import {omit} from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export default class Button extends React.Component {

		render() {

			const {
				styleId,

				disabled,
				focused,

				mandatory,
				primary,
				success,
				info,
				warning,
				danger,

				hovered,
				errored,
				hidden,
				raised

			} = this.props;

			let newProps = omit(this.props,["className", "styleId", "disabled" , "focused" , "mandatory" , "primary" , "success" , "info",
			"warning", "danger", "hovered" , "errored" , "raised" ]);

			let classNames = cx(styles,{

				 [styleId] : true,

				 disabled : disabled,
				 focused : focused,

				 mandatory : mandatory,
				 primary : primary,
				 success : success,
				 info : info,
				 warning : warning,
				 danger : danger,

				 hovered : hovered,
				 errored : errored,
				 hidden : hidden,
				 raised : raised

			 });

	  	return ( <ButtonBase {...newProps} className={ classNames } />);

	  }

	}

	Button.defaultProps = {
		styleId : "default"
	}

	/*

		Button.stateStyles = [ "disabled", "enabled" , "focused" , "mandatory" , "primary" , "success" , "info",
		"warning", "danger", "hovered" , "errored" , "hidden", , "errored", "raised" ]

	*/

Button.propTypes = {

  id :  PropTypes.string,
  htmlFor :  PropTypes.string,
	styleId : PropTypes.string,

	disabled : PropTypes.bool,
	focused : PropTypes.bool,

	mandatory : PropTypes.bool,
	primary : PropTypes.bool,
	success : PropTypes.bool,
	info : PropTypes.bool,
	warning : PropTypes.bool,
	danger : PropTypes.bool,

	hovered : PropTypes.bool,
	errored : PropTypes.bool,
	hidden : PropTypes.bool,
	raised : PropTypes.bool

}

if(__DOCS__){
  Button.docs = {
    componentGroup: "Atom"
  };
}
