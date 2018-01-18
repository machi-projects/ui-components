import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import selectn from 'selectn';

import { encodeForHtml, editorContentValidate } from '../../utils/common';

var TextEditor = function (_Component) {
	_inherits(TextEditor, _Component);

	function TextEditor(props) {
		_classCallCheck(this, TextEditor);

		var _this = _possibleConstructorReturn(this, (TextEditor.__proto__ || _Object$getPrototypeOf(TextEditor)).call(this, props));

		_this.editorCallback = _this.editorCallback.bind(_this);
		_this.handleUpload = _this.handleUpload.bind(_this);
		_this.handleChange = _this.handleChange.bind(_this);
		return _this;
	}

	_createClass(TextEditor, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    id = _props.id,
			    value = _props.value;

			if (id && global.ZohoDeskEditor) {
				ZohoDeskEditor.create && ZohoDeskEditor.create({
					id: id,
					content: value,
					callback: this.editorCallback,
					imageuploadcallback: this.handleUpload,
					contentChanged: this.handleChange
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount(np) {
			global.editor = {};
		}

		// componentWillReceiveProps(np){
		// 	if(this.props.value !== np.value){
		// 		this.state.editorObj && this.state.editorObj.setContent(np.value);
		// 	}
		// }

	}, {
		key: 'handleUpload',
		value: function handleUpload(file, successCallback, failureCallback, target, description) {
			var _props2 = this.props,
			    onUpload = _props2.onUpload,
			    getImgViewURL = _props2.getImgViewURL;

			onUpload && onUpload(file).then(function (res) {
				var payload = {};
				var attachmentId = res.data.result;
				// url : getImgViewURL ? getImgViewURL(attachmentId) : "",
				payload[0] = {
					url: "sdfsd",
					desc: description
				};
				successCallback(payload, target);
			}, function (error) {
				failureCallback(target);
			});
		}
	}, {
		key: 'handleChange',
		value: function handleChange() {
			var _props3 = this.props,
			    onChange = _props3.onChange,
			    id = _props3.id;

			var editorObj = editor[id] ? editor[id] : {};
			var content = editorObj.getContent ? editorObj.getContent() : "";
			if (!editorContentValidate(editorObj)) {
				content = "";
			}
			content = editorObj.mode == "plaintext" ? encodeForHtml(content) : content;
			onChange && onChange(content.trim(), id);
		}
	}, {
		key: 'editorCallback',
		value: function editorCallback(editorObj) {
			var id = this.props.id;

			global.editor = global.editor || {};
			var css = 'blockquote {margin:0 0 0 4px; }',
			    head = editorObj.doc.head || editorObj.doc.getElementsByTagName('head')[0],
			    style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(editorObj.doc.createTextNode(css));
			}

			head.appendChild(style);
			var moreOptElement = selectn("toolbarobject.moreoptions", editorObj) || {};
			var moreIconElement = "<svg class='icon size15' style='color: #8f8f8f;top:-6px;transform: rotate(90deg);'><use xlink:href='#more1'></use></svg>";
			moreOptElement.innerHTML = moreIconElement;
			if (!editor[id]) {
				editor[id] = editorObj;
			};
			// this.setState({editorObj})
		}
	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    id = _props4.id,
			    content = _props4.content;


			return React.createElement(
				'div',
				{ className: 'editDraft' },
				React.createElement('div', { id: id })
			);
		}
	}]);

	return TextEditor;
}(Component);

export default TextEditor;


TextEditor.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	onUpload: PropTypes.func.isRequired,
	getImgViewURL: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	content: PropTypes.string
};