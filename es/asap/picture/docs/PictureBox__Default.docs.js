import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PictureBox } from '../index';

var PictureBox__Default = function (_Component) {
	_inherits(PictureBox__Default, _Component);

	function PictureBox__Default() {
		_classCallCheck(this, PictureBox__Default);

		return _possibleConstructorReturn(this, (PictureBox__Default.__proto__ || _Object$getPrototypeOf(PictureBox__Default)).apply(this, arguments));
	}

	_createClass(PictureBox__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(PictureBox, { styleId: 'mypicture', src: 'https://my.com/img/mycom.png', alt: 'mycom' }),
				React.createElement('br', null),
				React.createElement(
					PictureBox,
					{ src: 'https://my.com/img/mycom.png', alt: 'mycom' },
					' This ',
					React.createElement(
						'b',
						null,
						' is '
					),
					' my figure '
				)
			);
		}
	}]);

	return PictureBox__Default;
}(Component);

export default PictureBox__Default;


if (__DOCS__) {

	PictureBox__Default.docs = {
		componentGroup: PictureBox.docs.componentGroup
	};
}