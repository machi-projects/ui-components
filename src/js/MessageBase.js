import React from 'react';
import PropTypes from 'prop-types';

export default class MessageBase extends React.Component {

	render() {

    return (<span {...this.props}  />);

  }

}
