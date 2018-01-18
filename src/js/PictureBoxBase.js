import React from 'react';
import PropTypes from 'prop-types';
import { omit, extract } from '../utils/objectUtils';

export default class PictureBoxBase extends React.Component {
	render() {
		let { groupStyle, sourceStyle, captionStyle } = this.props;

		let imgTagProps = extract(this.props, ['src', 'alt', 'onError']);
		let figureProps = omit(this.props, ['src', 'alt', 'onError', 'children', 'groupStyle', 'sourceStyle', 'captionStyle']);

		return (
			<figure {...figureProps} className={groupStyle}>
				<img {...imgTagProps} className={sourceStyle}  />

				{this.props.children
					? <figcaption className={captionStyle}>
							{this.props.children}
						</figcaption>
					: null}
			</figure>
		);
	}
}

PictureBoxBase.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,

	onError : PropTypes.func,
	groupStyle: PropTypes.string,
	sourceStyle: PropTypes.string,
	captionStyle: PropTypes.string
};
