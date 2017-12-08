import React from 'react';
import PropTypes from 'prop-types';

import PlainTextBase from '../../js/PlainTextBase';
import styles from './plaintext.css';
import {omit} from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export default class PlainText extends React.Component {

	render() {

			const {
				styleId,
				src,
				alt,
				text,

				disabled,
				focused,

				primary,
				success,
				info,
				warning,
				danger,

				hovered,
				hidden,
				raised

			} = this.props;

			let newProps = omit(this.props,["className", "styleId", "disabled" , "focused" , "primary" , "success" , "info",
			"warning", "danger", "hovered" , "raised" ]);

			let classNames = cx(styles,{

				 [styleId] : true,

				 disabled : disabled,
				 focused : focused,

				 primary : primary,
				 success : success,
				 info : info,
				 warning : warning,
				 danger : danger,

				 hovered : hovered,
				 hidden : hidden,
				 raised : raised

			 });

      return (<PlainTextBase src={this.props.src} alt={this.props.alt} className={classNames} text={this.props.text} />);

  }

}

PlainText.defaultProps = {
		styleId : "default"
}

PlainText.propTypes = {
    styleId : PropTypes.string,
		disabled : PropTypes.bool,
		focused : PropTypes.bool,

		primary : PropTypes.bool,
		success : PropTypes.bool,
		info : PropTypes.bool,
		warning : PropTypes.bool,
		danger : PropTypes.bool,

		hovered : PropTypes.bool,
		hidden : PropTypes.bool,
		raised : PropTypes.bool
}

if(__DOCS__){
  PlainText.docs = {
    componentGroup: "Atom"
  };
}
