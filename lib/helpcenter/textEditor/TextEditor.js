'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectn = require('selectn');

var _selectn2 = _interopRequireDefault(_selectn);

var _common = require('../../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextEditor = function (_Component) {
	_inherits(TextEditor, _Component);

	function TextEditor(props) {
		_classCallCheck(this, TextEditor);

		var _this = _possibleConstructorReturn(this, (TextEditor.__proto__ || Object.getPrototypeOf(TextEditor)).call(this, props));

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
			if (!(0, _common.editorContentValidate)(editorObj)) {
				content = "";
			}
			content = editorObj.mode == "plaintext" ? (0, _common.encodeForHtml)(content) : content;
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
			var moreOptElement = (0, _selectn2.default)("toolbarobject.moreoptions", editorObj) || {};
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


			return _react2.default.createElement(
				'div',
				{ className: 'editDraft' },
				_react2.default.createElement('div', { id: id })
			);
		}
	}]);

	return TextEditor;
}(_react.Component);

exports.default = TextEditor;


TextEditor.propTypes = {
	id: _propTypes2.default.string,
	value: _propTypes2.default.string,
	onUpload: _propTypes2.default.func.isRequired,
	getImgViewURL: _propTypes2.default.func,
	onChange: _propTypes2.default.func.isRequired,
	content: _propTypes2.default.string
};