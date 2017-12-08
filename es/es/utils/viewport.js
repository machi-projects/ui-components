import _Object$keys from 'babel-runtime/core-js/object/keys';
var viewPort = {
	frameRelativeRects: function frameRelativeRects(el, customFrame) {
		if (!el) return;

		var rect = el.getBoundingClientRect();
		customFrame = customFrame || document.documentElement;
		var customFrameRect = customFrame.getBoundingClientRect();

		var newReact = {
			top: rect.top - customFrameRect.top,
			left: rect.left - customFrameRect.left,
			bottom: rect.bottom - customFrameRect.top,
			right: rect.right - customFrameRect.left,
			height: rect.height,
			width: rect.width
		};

		newReact.x = newReact.left;
		newReact.y = newReact.top;

		var rectGap = {
			top: newReact.top,
			left: newReact.left,
			bottom: customFrameRect.height - newReact.bottom,
			right: customFrameRect.width - newReact.right
		};

		rectGap.center = {
			top: rectGap.top + newReact.height / 2,
			left: rectGap.left + newReact.width / 2,
			bottom: rectGap.bottom + newReact.height / 2,
			right: rectGap.right + newReact.width / 2
		};

		var adjustments = {};
		if (newReact.top < 0) {
			adjustments.top = Math.abs(newReact.top);
		}
		if (newReact.left < 0) {
			adjustments.left = Math.abs(newReact.left);
		}
		if (newReact.bottom > customFrameRect.height) {
			adjustments.bottom = newReact.bottom - customFrameRect.height;
		}
		if (newReact.right > customFrameRect.width) {
			adjustments.right = newReact.right - customFrameRect.width;
		}

		return { frameRect: customFrameRect, rect: newReact, rectGap: rectGap, adjustments: adjustments };
	},
	isInViewPort: function isInViewPort(el, customFrame) {
		if (!el) return;

		var elRects = viewPort.frameRelativeRects(el, customFrame);
		var react = elRects.rect;
		var frameReact = elRects.frameRect;

		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= frameReact.height && rect.right <= frameReact.width;
	},
	possibilities: function possibilities(el, relativeBox, customFrame) {
		if (!el) return;

		var elRects = viewPort.frameRelativeRects(el, customFrame);
		var rect = elRects.rect;
		var adjustments = elRects.adjustments;

		var relativeBoxReacts = viewPort.frameRelativeRects(relativeBox, customFrame);
		var relativeBoxReact = relativeBoxReacts.rect;
		var relativeBoxGap = relativeBoxReacts.rectGap;

		var views = {};

		//bottomCenter
		var bottomOverFlow = rect.height > relativeBoxGap.bottom;
		var bottomRightOverFlow = rect.width / 2 > relativeBoxGap.center.right;
		var bottomLeftOverFlow = rect.width / 2 > relativeBoxGap.center.left;
		views.bottomCenter = !(bottomOverFlow || bottomRightOverFlow || bottomLeftOverFlow);

		//bottomRight
		var bottomLeftOnlyOverFlow = rect.width > relativeBoxGap.center.left;
		views.bottomRight = !(bottomOverFlow || bottomLeftOnlyOverFlow);

		//bottomLeft
		var bottomRightOnlyOverFlow = rect.width > relativeBoxGap.center.right;
		views.bottomLeft = !(bottomOverFlow || bottomRightOnlyOverFlow);

		//topCenter
		var topOverFlow = rect.height > relativeBoxGap.top;
		var topRightOverFlow = rect.width / 2 > relativeBoxGap.center.right;
		var topLeftOverFlow = rect.width / 2 > relativeBoxGap.center.left;
		views.topCenter = !(topOverFlow || topRightOverFlow || topLeftOverFlow);

		//topRight
		var topLeftOnlyOverFlow = rect.width > relativeBoxGap.center.left;
		views.topRight = !(topOverFlow || topLeftOnlyOverFlow);

		//topLeft
		var topRightOnlyOverFlow = rect.width > relativeBoxGap.center.right;
		views.topLeft = !(topOverFlow || topRightOnlyOverFlow);

		//leftCenter
		var leftOverFlow = rect.width > relativeBoxGap.right;

		var leftTopOverFlow = rect.height / 2 > relativeBoxGap.center.top;
		var leftBottomOverFlow = rect.height / 2 > relativeBoxGap.center.bottom;
		views.leftCenter = !(topOverFlow || leftTopOverFlow || leftBottomOverFlow);

		//leftTop
		var leftTopOnlyOverFlow = rect.height > relativeBoxGap.center.top;
		views.leftTop = !(leftOverFlow || leftTopOnlyOverFlow);

		//leftBottom
		var leftBottomOnlyOverFlow = rect.height > relativeBoxGap.center.bottom;
		views.leftBottom = !(leftOverFlow || leftBottomOnlyOverFlow);

		//rightCenter
		var rightOverFlow = rect.width > relativeBoxGap.left;

		var rightTopOverFlow = rect.height / 2 > relativeBoxGap.center.top;
		var rightBottomOverFlow = rect.height / 2 > relativeBoxGap.center.bottom;
		views.rightCenter = !(topOverFlow || rightTopOverFlow || rightBottomOverFlow);

		//rightTop
		var rightTopOnlyOverFlow = rect.height > relativeBoxGap.center.top;
		views.rightTop = !(rightOverFlow || rightTopOnlyOverFlow);

		//rightBottom
		var rightBottomOnlyOverFlow = rect.height > relativeBoxGap.center.bottom;
		views.rightBottom = !(rightOverFlow || rightBottomOnlyOverFlow);

		return { views: views, adjustments: adjustments };
	},

	betterView: function betterView(popup, relativeBox, defaultView, customFrame) {
		var viewPortPossibilities = viewPort.possibilities(popup, relativeBox, customFrame);
		if (!viewPortPossibilities) {
			return;
		}

		var views = viewPortPossibilities.views;
		var adjustments = viewPortPossibilities.adjustments;
		var viewKeys = _Object$keys(views);
		var isViewFound = false;
		for (var i = 0; i < viewKeys.length; i++) {
			var viewKey = viewKeys[i];
			if (views[viewKey]) {
				isViewFound = true;
				break;
			}
		}

		if (!isViewFound) {
			return { view: null, adjustments: adjustments };
		}

		if (views[defaultView]) {
			return { view: defaultView, adjustments: adjustments };
		}

		var defaultPosition = defaultView.replace(/Center|Bottom|Top|Left|Right$/, '');
		var viewTypes = { top: ['Center', 'Right', 'Left'], left: ['Center', 'Top', 'Bottom'] };
		viewTypes.bottom = viewTypes.top;
		viewTypes.right = viewTypes.left;

		var defaultPositions = viewTypes[defaultPosition];
		for (var _i = 0, len = defaultPositions.length; _i < len; _i++) {
			var _viewKey = defaultPosition + defaultPositions[_i];
			if (views[_viewKey]) {
				return { view: _viewKey, adjustments: adjustments };
			}
		}

		var oppositePositionsOrder = {
			bottom: ['top', 'right', 'left'],
			top: ['bottom', 'right', 'left'],
			left: ['right', 'bottom', 'top'],
			right: ['bottom', 'top', 'left']
		};

		var oppositeViews = oppositePositionsOrder[defaultPosition];
		for (var _i2 = 0, _len = oppositeViews.length; _i2 < _len; _i2++) {
			var oppositeView = oppositeViews[_i2];
			var positions = viewTypes[oppositeView];
			for (var j = 0, _len2 = positions.length; j < _len2; j++) {
				var _viewKey2 = oppositeView + positions[_i2];
				if (views[_viewKey2]) {
					return { view: _viewKey2, adjustments: adjustments };
				}
			}
		}

		return { view: null, adjustments: adjustments };
	}
};

export default viewPort.betterView;

/*
	let frameWidth = window.innerHeight || document.documentElement.clientHeight;
	let frameHeight = window.innerWidth || document.documentElement.clientWidth;
	customFrame = customFrame || document.documentElement;


var customFrameRect = customFrame.getBoundingClientRect();

frameWidth = customFrameRect.width;
frameHeight = customFrameRect.height;

let newReact = {
	top : (rect.top - customFrameRect.top),
	left : (rect.left - customFrameRect.left),
	height : rect.height,
	width : rect.width
}

newReact.bottom = (newReact.top + rect.height);
newReact.right = (newReact.left - rect.width);
newReact.x = newReact.left;
newReact.y = newReact.top;
rect = newReact;

let topFrameExceeds = rect.top < 0; // (remainsPxNeeded --> el.top )
let leftFrameExceeds = rect.left < 0; // (remainsPxNeeded --> el.left )
let bottomFrameExceeds = frameHeight < rect.bottom; // (remainsPxNeeded --> (frameHeight - el.bottom))
let rightFrameExceeds = frameWidth < rect.right; //( remainsPxNeeded --> (frameWidth - el.right)

let topFrameGap = rect.top;
let leftFrameGap = rect.left;
let bottomFrameGap = (frameHeight - rect.bottom);
let rightFrameGap = (innerWidth - rect.right);

let rightPossible = leftFrameExceeds ? ( rightFrameGap >= Math.abs(leftFrameGap) ) : rightFrameExceeds;
let leftPossible = rightFrameExceeds ? ( leftFrameGap >= Math.abs(rightFrameGap) ) : leftFrameExceeds;

let views = {

	topLeft: !leftFrameExceeds && !topFrameExceeds,
	topRight: !rightFrameExceeds && !topFrameExceeds,
	topCenter: !topFrameExceeds && !leftFrameExceeds && !rightFrameExceeds,

	leftTop: views.topLeft,
	leftCenter: !leftFrameExceeds && !topFrameExceeds && !bottomFrameExceeds,
	leftBottom: !leftFrameExceeds && !bottomFrameExceeds,


	rightTop: views.topRight,
	rightCenter: !rightFrameExceeds && !topFrameExceeds && !bottomFrameExceeds,
	rightBottom: !rightFrameExceeds && !bottomFrameExceeds,

	bottomLeft: views.leftBottom,
	bottomCenter: !bottomFrameExceeds && (( !leftFrameExceeds &&   ) || ( !rightFrameExceeds  )),
	bottomRight: views.rightBottom

}
*/

// solving z-index problems -- nested scroll Component
// document.scrollingElement || document.documentElement;

// find  the scrollable parentNode
// if (node == null) {
// 	 return null;
//  }
//
//  if (node.scrollHeight > node.clientHeight) {
// 	 return node;
//  } else {
// 	 return getScrollParent(node.parentNode);
//  }
// }

// parentFrame --> document.documentElement.getBoundingClientRect()
// parentFrame --> div or tags

// document.scrollingElement || document.documentElement;
//
// if( document.documentElement == document.documentElement ){
//
// }