import React from 'react';
import PropTypes from 'prop-types';

import PictureBoxBase from './PictureBoxBase';
import PlainTextBase from './PlainTextBase';
import IconSvgBase from './IconSvgBase';

export default class FrameShapeBase extends React.Component {
	render() {
		let { type, name, picture, text, iconId, frameStyle, iconStyle, textStyle, picStyles , onPictureError } = this.props;

		let frameContent = null;
		if (type == 'picture') {
			frameContent = <PictureBoxBase alt={name} src={picture} {...picStyles} onError={onPictureError} />;
		} else if (type == 'text') {
			frameContent = <PlainTextBase className={textStyle} text={text} />;
		} else if (type == 'icon') {
			frameContent = <IconSvgBase className={iconStyle} icon={iconId} />;
		}

		return (
			<div className={frameStyle}>
				{frameContent}
			</div>
		);
	}
}

FrameShapeBase.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf(['picture', 'text', 'icon']),
	name: PropTypes.string,
	picture: PropTypes.string,
	text: PropTypes.string,
	iconId: PropTypes.string,
	onPictureError : PropTypes.func,

	textStyle: PropTypes.string,
	frameStyle: PropTypes.string,
	iconStyle: PropTypes.string,

	picStyles: PropTypes.shape({
		groupStyle: PropTypes.string,
		sourceStyle: PropTypes.string,
		captionStyle: PropTypes.string
	})
};
