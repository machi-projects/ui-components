'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Layout = exports.Box = exports.View = undefined;

var _View = require('./View');

Object.defineProperty(exports, 'View', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_View).default;
	}
});

var _Box = require('./Box');

Object.defineProperty(exports, 'Box', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_Box).default;
	}
});

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = exports.Layout = _Grid2.default;

Layout.docs = {
	componentGroup: 'Template'
};