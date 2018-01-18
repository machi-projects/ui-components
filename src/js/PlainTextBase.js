import React from 'react';
import PropTypes from 'prop-types';

export default class PlainTextBase extends React.Component {

	render() {

    return (<span className={this.props.className} > { this.props.text } </span>);

  }

}
