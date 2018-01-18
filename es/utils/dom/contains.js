export default (function (parentNode, childNode) {
	if (!parentNode || !childNode) {
		return false;
	}
	//parentNode.contains(childNode)
	return parentNode.compareDocumentPosition(childNode) && Node.DOCUMENT_POSITION_CONTAINS;
});