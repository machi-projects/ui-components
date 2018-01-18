let viewPort = {
	frameRelativeRects: (el, customFrame) => {
		if (!el) return;

		var rect = el.getBoundingClientRect();
		//customFrame = customFrame || document.documentElement;
		
		var customFrameRect = {
				top : 0 ,
				left : 0 ,
				right : document.documentElement.clientWidth,
				bottom : document.documentElement.clientHeight,
				height : document.documentElement.clientHeight,
				width : document.documentElement.clientWidth,
				x : 0 ,
				y : 0
		}
		
		if( customFrame ){
			customFrameRect = customFrame.getBoundingClientRect();
		}
		
		let newReact = {
			top: rect.top - customFrameRect.top,
			left: rect.left - customFrameRect.left,
			height: rect.height,
			width: rect.width
		};
		
		newReact.bottom = newReact.top + newReact.height;
		newReact.right = newReact.left + newReact.width;

		newReact.x = newReact.left;
		newReact.y = newReact.top;

		let rectGap = {
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

		let adjustments = {};
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

		return { frameRect: customFrameRect, rect: newReact, rectGap, adjustments };
	},
	isInViewPort: (el, customFrame) => {
		if (!el) return;

		let elRects = viewPort.frameRelativeRects(el, customFrame);
		let react = elRects.rect;
		let frameReact = elRects.frameRect;

		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= frameReact.height && rect.right <= frameReact.width;
	},
	possibilities: (el, relativeBox, customFrame) => {
		if (!el) return;

		let elRects = viewPort.frameRelativeRects(el, customFrame);
		let rect = elRects.rect;
		let adjustments = elRects.adjustments;

		let relativeBoxReacts = viewPort.frameRelativeRects(relativeBox, customFrame);
		let relativeBoxReact = relativeBoxReacts.rect;
		let relativeBoxGap = relativeBoxReacts.rectGap;

		let views = {};

		//bottomCenter
		let bottomOverFlow = rect.height > relativeBoxGap.bottom;
		let bottomRightOverFlow = rect.width / 2 > relativeBoxGap.center.right;
		let bottomLeftOverFlow = rect.width / 2 > relativeBoxGap.center.left;
		views.bottomCenter = !(bottomOverFlow || bottomRightOverFlow || bottomLeftOverFlow);

		//bottomRight
		let bottomLeftOnlyOverFlow = rect.width > relativeBoxGap.center.left;
		views.bottomRight = !(bottomOverFlow || bottomLeftOnlyOverFlow);

		//bottomLeft
		let bottomRightOnlyOverFlow = rect.width > relativeBoxGap.center.right;
		views.bottomLeft = !(bottomOverFlow || bottomRightOnlyOverFlow);

		//topCenter
		let topOverFlow = rect.height > relativeBoxGap.top;
		let topRightOverFlow = rect.width / 2 > relativeBoxGap.center.right;
		let topLeftOverFlow = rect.width / 2 > relativeBoxGap.center.left;
		views.topCenter = !(topOverFlow || topRightOverFlow || topLeftOverFlow);

		//topRight
		let topLeftOnlyOverFlow = rect.width > relativeBoxGap.center.left;
		views.topRight = !(topOverFlow || topLeftOnlyOverFlow);

		//topLeft
		let topRightOnlyOverFlow = rect.width > relativeBoxGap.center.right;
		views.topLeft = !(topOverFlow || topRightOnlyOverFlow);

		//leftCenter
		let leftOverFlow = rect.width > relativeBoxGap.right;

		let leftTopOverFlow = rect.height / 2 > relativeBoxGap.center.top;
		let leftBottomOverFlow = rect.height / 2 > relativeBoxGap.center.bottom;
		views.leftCenter = !(topOverFlow || leftTopOverFlow || leftBottomOverFlow);

		//leftTop
		let leftTopOnlyOverFlow = rect.height > relativeBoxGap.center.top;
		views.leftTop = !(leftOverFlow || leftTopOnlyOverFlow);

		//leftBottom
		let leftBottomOnlyOverFlow = rect.height > relativeBoxGap.center.bottom;
		views.leftBottom = !(leftOverFlow || leftBottomOnlyOverFlow);

		//rightCenter
		let rightOverFlow = rect.width > relativeBoxGap.left;

		let rightTopOverFlow = rect.height / 2 > relativeBoxGap.center.top;
		let rightBottomOverFlow = rect.height / 2 > relativeBoxGap.center.bottom;
		views.rightCenter = !(topOverFlow || rightTopOverFlow || rightBottomOverFlow);

		//rightTop
		let rightTopOnlyOverFlow = rect.height > relativeBoxGap.center.top;
		views.rightTop = !(rightOverFlow || rightTopOnlyOverFlow);

		//rightBottom
		let rightBottomOnlyOverFlow = rect.height > relativeBoxGap.center.bottom;
		views.rightBottom = !(rightOverFlow || rightBottomOnlyOverFlow);

		return { views, adjustments };
	},

	betterView: (popup, relativeBox, defaultView, customFrame) => {
		let viewPortPossibilities = viewPort.possibilities(popup, relativeBox, customFrame);
		if (!viewPortPossibilities) {
			return;
		}

		let views = viewPortPossibilities.views;
		let adjustments = viewPortPossibilities.adjustments;
		let viewKeys = Object.keys(views);
		let isViewFound = false;
		for (let i = 0; i < viewKeys.length; i++) {
			let viewKey = viewKeys[i];
			if (views[viewKey]) {
				isViewFound = true;
				break;
			}
		}

		if (!isViewFound) {
			return { view: null, adjustments };
		}

		if (views[defaultView]) {
			return { view: defaultView, adjustments };
		}

		let defaultPosition = defaultView.replace(/Center|Bottom|Top|Left|Right$/, '');
		let viewTypes = { top: ['Center', 'Right', 'Left'], left: ['Center', 'Top', 'Bottom'] };
		viewTypes.bottom = viewTypes.top;
		viewTypes.right = viewTypes.left;

		let defaultPositions = viewTypes[defaultPosition];
		for (let i = 0, len = defaultPositions.length; i < len; i++) {
			let viewKey = defaultPosition + defaultPositions[i];
			if (views[viewKey]) {
				return { view: viewKey, adjustments };
			}
		}

		let oppositePositionsOrder = {
			bottom: ['top', 'right', 'left'],
			top: ['bottom', 'right', 'left'],
			left: ['right', 'bottom', 'top'],
			right: ['bottom', 'top', 'left']
		};

		let oppositeViews = oppositePositionsOrder[defaultPosition];
		for (let i = 0, len = oppositeViews.length; i < len; i++) {
			let oppositeView = oppositeViews[i];
			let positions = viewTypes[oppositeView];
			for (let j = 0, len = positions.length; j < len; j++) {
				let viewKey = oppositeView + positions[i];
				if (views[viewKey]) {
					return { view: viewKey, adjustments };
				}
			}
		}

		return { view: null, adjustments };
	}
};

export default {
	betterView : viewPort.betterView,
	frameRelativeRects : viewPort.frameRelativeRects
};

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
