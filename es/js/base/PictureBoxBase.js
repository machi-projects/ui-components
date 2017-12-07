import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import { omit, extract } from '../../utils/objectUtils';

var PictureBoxBase = function (_React$Component) {
        _inherits(PictureBoxBase, _React$Component);

        function PictureBoxBase() {
                _classCallCheck(this, PictureBoxBase);

                return _possibleConstructorReturn(this, (PictureBoxBase.__proto__ || _Object$getPrototypeOf(PictureBoxBase)).apply(this, arguments));
        }

        _createClass(PictureBoxBase, [{
                key: 'render',
                value: function render() {
                        var _props = this.props,
                            groupStyle = _props.groupStyle,
                            sourceStyle = _props.sourceStyle,
                            captionStyle = _props.captionStyle;


                        var imgTagProps = extract(this.props, ["src", "alt"]);
                        var figureProps = omit(this.props, ["src", "alt", "children", "groupStyle", "sourceStyle", "captionStyle"]);

                        return React.createElement(
                                'figure',
                                _extends({}, figureProps, { className: groupStyle }),
                                React.createElement('img', _extends({}, imgTagProps, { className: sourceStyle })),
                                this.props.children ? React.createElement(
                                        'figcaption',
                                        { className: captionStyle },
                                        this.props.children
                                ) : null
                        );
                }
        }]);

        return PictureBoxBase;
}(React.Component);

export default PictureBoxBase;


PictureBoxBase.propTypes = {

        src: PropTypes.string,
        alt: PropTypes.string,

        groupStyle: PropTypes.string,
        sourceStyle: PropTypes.string,
        captionStyle: PropTypes.string
};