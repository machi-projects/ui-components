"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.editorContentValidate = editorContentValidate;
exports.encodeForHtml = encodeForHtml;
function editorContentValidate() {
	var editorObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var content = editorObj.getContent ? editorObj.getContent() : "";
	if (content == "" || !content.length || content == "<div><br></div>" || editorObj.mode !== "plaintext" && !editorObj.doc.body.innerText.trim().length && !editorObj.doc.getElementsByTagName('img').length && !editorObj.doc.getElementsByTagName('iframe').length) {
		return false;
	}
	return true;
}

function encodeForHtml(str) {
	if (/<|>|&|"|'|\\/g.test(str) == true) {
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/"/g, '&quot;');
		str = str.replace(/\\/g, '&#x5c;');
		str = str.replace(/'/g, '&#39;');
	}
	return str;
}