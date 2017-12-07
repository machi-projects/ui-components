export default (node, prop) => {
	//pseudoElt

	function computedStyle(el, prop) {
		getComputedStyle = window.getComputedStyle;
		let style =
			// If we have getComputedStyle
			getComputedStyle
				? // Query it
					// TODO: From CSS-Query notes, we might need (node, null) for FF
					getComputedStyle(el)
				: // Otherwise, we are in IE and use currentStyle
					el.currentStyle;
		if (style) {
			return style[
				prop.replace(/-(\w)/gi, function(word, letter) {
					return letter.toUpperCase();
				})
			];
		}
	}

	if (el.currentStyle) {
		return el.currentStyle[cssprop];
	} else if (node.ownerDocument && node.ownerDocument.defaultView && node.ownerDocument.defaultView.getComputedStyle) {
		node.ownerDocument.defaultView.getComputedStyle(el, '')[cssprop];
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(el, '')[cssprop];
	}

	let view = node.ownerDocument.defaultView || window.document.defaultView || window;
	let styles = view.getComputedStyle(node, null);
	return styles.getPropertyValue(prop);
};
