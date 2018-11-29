/**
 * @module node-route/dom-id dom-id
 *
 * Utilities for finding DOM elements.
 *
 */

var slice = [].slice;

// An object for caching nodes
var nodeCache = exports.nodeCache = {};

/**
 * A data structure used to invalidate ids when new nodes are inserted into
 * the DOM. The structure is like:
 *
 * [
 *   10: [
 *     element: Element,
 *     2: [
 *       element: Element
 *     ]
 *   ]
 * ]
 *
 * If we insert an id of "0.2"
 */
var nodeTree = exports.nodeTree = [];

// Separator for our dom ids
var SEPARATOR = ".";

/**
 * @function node-route/dom-id.rootNode
 * @parent node-route/dom-id
 *
 * Get the root DOM element.
 *
 * @param {Document} [root] The root document.
 * @return {HTMLHtmlElement}
 */
var rootNode = exports.rootNode = function(root){
	if(!root) {
		return document.documentElement;
	}
	return root.documentElement || root;
};

var createRouteInfo = function(id, branch, value, collapsed){
	var routeInfo = Object.create(null);
	routeInfo.id = id;
	routeInfo.branch = branch;
	routeInfo.collapsed = collapsed;
	if(value !== undefined) {
		routeInfo.value = value;
	}
	return routeInfo;
};

var cache = function(node, routeInfo){
	node.__routeInfo = routeInfo;
	nodeCache[routeInfo.id] = node;
};

/**
 * @function node-route/dom-id.getID getID
 * @parent node-route/dom-id
 *
 * Get the ID for a given element.
 *
 * The id is represented as ".0.1.0.0.1" where each integer is the index of the
 * node within it's parent. This is computed by starting with the node and
 * walking up the document
 *
 * @param {Node} node
 * @param {Object} options
 * @return {String} id of the node
 */
var getID = exports.getID = function(node, options){
	var id;
	var info = getCachedInfo(node);
	if(info) {
		id = info.id;
		var invalid = info.collapsed !== (options && options.collapseTextNodes);
		if(invalid) {
			id = undefined;
		}
	}
	if(!id) {
		// Get the route to the node.
		var routeInfo = getRoute(node, options);
		id = routeInfo.id;
	}
	return id;
};

// Export getRoute for advanced use.
exports.getRoute = getRoute;

var getCachedInfo = exports.getCachedInfo = function(node){
	return node.__routeInfo;
};

var getCachedID = exports.getCachedID = function(node){
	var info = getCachedInfo(node);
	return info && info.id;
};

var getIndex = exports.getIndex = function(id){
	return +id.substr(id.lastIndexOf(".") + 1);
};

function getBranch(index, element, parentBranch) {
	parentBranch = parentBranch || nodeTree;
	var branch = parentBranch[index];
	if(!branch) {
		branch = parentBranch[index] = [];
		branch.element = element;
	} else if(branch.element !== element) {
		branch.element = element;
	}
	return branch;
}

exports.indexOfParent = function indexOfParent(parent, node, options){
	var index = -1;
	var collapseTextNodes = options && options.collapseTextNodes;

	var child = parent.firstChild, last, skip;
	while(child) {
		skip = collapseTextNodes && child.nodeType === 3 && last === 3;
		if(!skip)
			index++;
		if(child === node) {
			break;
		}
		last = child.nodeType;
		child = child.nextSibling;
	}
	return index;
};

/**
 * Generates the route for a particular node, caching the intermediate nodes
 * along the way.
 */
function getRoute(node, options) {
	var id = "", nodeType
	var collapseTextNodes = options && options.collapseTextNodes;

	var parent = node.parentNode;
	var index = -1;

	if(!parent) {
		return {id:"0"};
	}

	var child = parent.firstChild;
	var prevNodeType, siblingTag, value;
	while(child) {
		if(collapseTextNodes && child.nodeType === 3) {
			siblingTag = child.nextSibling && child.nextSibling.nodeName;
			if(prevNodeType === 3) {
				value += child.nodeValue;
			}
			// TextNodes before the <head> are ignored.
			else if(siblingTag !== "HEAD") {
				value = child.nodeValue;
				index++;
			}
		} else {
			value = undefined;
			index++;
		}

		if(child === node) {
			break;
		}
		prevNodeType = child.nodeType;
		child = child.nextSibling;
	}

	// ARG!
	
	var parentInfo;

	if(parent.nodeType === 9) {
		parentInfo = {id: ""};
	} else {
		parentInfo = getCachedInfo(parent);
		if(!parentInfo || collapseTextNodes) {
			parentInfo = getRoute(parent, options);
		}
	}

	var parentId = parentInfo.id;

	id = (parentId ? parentId + SEPARATOR : "") + index;

	var routeInfo = createRouteInfo(id,
		getBranch(index, node, parentInfo.branch),
		collapseTextNodes ? value : undefined, collapseTextNodes);

	cache(node, routeInfo);

	return routeInfo;
}

/**
 * @function node-route/dom-id.findNode findNode
 * @parent node-route/dom-id
 *
 * Find a DOM node by its id.
 */
var findNode = exports.findNode = function(id, root){
	var node = rootNode(root);
	var ids = id.split(".");
	var idIndex = 1;

	while(node) {
		var currentIndex = ids[idIndex];
		if(currentIndex == null) {
			break;
		}

		var nodeIndex = 0;
		var child = node.firstChild;

		while(child) {
			if(nodeIndex == currentIndex) {
				node = child;
				break;
			}
			nodeIndex++;
			child = child.nextSibling;
		}

		idIndex++;
		node = child;
	}

	return node;
};

/**
 * @function node-route/dom-id.getNode getNode
 * @parent node-route/dom-id
 *
 * Get the Node for a particular id.
 *
 * @param {String} id
 * @param {HTMLHtmlElement} [root] The root element to start with in the search
 * for a DOM node.
 * @return {Node} dom element matching the id.
 */
exports.getNode = function(id, root){
	var node;

	node = nodeCache[id];
	if(node && !root) {
		return node;
	}

	// Find the node with traversal
	node = findNode(id, root);
	if(!root && node != null) {
		cache(node, {id:id});
	}

	return node;
};

/**
 * @function node-route/dom-id.purgeID purgeID
 * @parent node-route/dom-id
 *
 * Remove caching associated with an id.
 */
exports.purgeID = function(id){
	var node = nodeCache[id];
	if(node) {
		delete node.__routeInfo;
		delete nodeCache[id];
	}
};

/**
 * Purge all caching for a node
 */
exports.purgeNode = function(node){
	var routeInfo = getCachedInfo(node);
	if(!routeInfo) return;
	var parentRouteInfo = getCachedInfo(node.parentNode);
	if(parentRouteInfo && parentRouteInfo.branch) {
		var parentBranch = parentRouteInfo.branch;
		var index = getIndex(routeInfo.id);

		// Remove this branch
		parentBranch.splice(index, 1);
		routeInfo.branch.length = 0;

		nodeCache = exports.nodeCache = {};
	} else {
		exports.purgeID(routeInfo.id);
	}
};

exports.purgeSiblings = function(node){
	var routeInfo = getCachedInfo(node);
	if(!routeInfo) {
		exports.getID(node);
		routeInfo = getCachedInfo(node);
	}
	var parentRouteInfo = getCachedInfo(node.parentNode);
	if(parentRouteInfo && parentRouteInfo.branch) {
		var parentBranch = parentRouteInfo.branch;
		var index = getIndex(routeInfo.id);
		var staleBranch = false;
		parentBranch.forEach(function(branch, i){
			if(i > index || (i === index && branch.element !== node)) {
				// This branch is stale, remove it.
				staleBranch = true;
				return false;
			}
		});
		if(staleBranch) {
			parentBranch.length = 0;
			parentBranch[index] = routeInfo.branch;
		}
	}
};

exports.purgeCache = function(){
	nodeCache = exports.nodeCache = {};
	nodeTree = exports.nodeTree = [];
};
