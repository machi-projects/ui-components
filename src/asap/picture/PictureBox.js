import React from 'react';
import PropTypes from 'prop-types';

import PictureBoxBase from '../../js/PictureBoxBase';
import styles from './picturebox.css';
import styleMapping from './styleMapping';

export default class PictureBox extends React.Component {
	render() {
		let { styleId, src, alt } = this.props;

		let picGroupStyle = styles[styleId];
		let pictureStyMapping = styleMapping[styleId];

		let picSourceStyle = styles[pictureStyMapping.sourceStyle];
		let picCaptionStyle = styles[pictureStyMapping.captionStyle];

		return (
			<PictureBoxBase
				src={src}
				alt={alt}
				groupStyle={picGroupStyle}
				sourceStyle={picSourceStyle}
				captionStyle={picCaptionStyle}
			>
				{this.props.children}
			</PictureBoxBase>
		);
	}
}

PictureBox.defaultProps = {
	styleId: 'default'
};

PictureBox.propTypes = {
	styleId: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
	isTextHtml: PropTypes.bool
};

if (__DOCS__) {
	PictureBox.docs = {
		componentGroup: 'Atom'
	};
}
