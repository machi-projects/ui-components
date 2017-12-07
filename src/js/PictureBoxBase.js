import React from 'react';
import PropTypes from 'prop-types';
import { omit, extract } from '../utils/objectUtils';

export default class PictureBoxBase extends React.Component {
	render() {
		let { groupStyle, sourceStyle, captionStyle } = this.props;

		let imgTagProps = extract(this.props, ['src', 'alt']);
		let figureProps = omit(this.props, ['src', 'alt', 'children', 'groupStyle', 'sourceStyle', 'captionStyle']);

		return (
			<figure {...figureProps} className={groupStyle}>
				<img {...imgTagProps} className={sourceStyle} />

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

	groupStyle: PropTypes.string,
	sourceStyle: PropTypes.string,
	captionStyle: PropTypes.string
};
