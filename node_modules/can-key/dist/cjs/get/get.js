/*can-key@1.1.0#get/get*/
'use strict';
var canReflect = require('can-reflect');
var utils = require('../utils.js');
function get(obj, name) {
    var parts = utils.parts(name);
    var length = parts.length, current, i, container;
    if (!length) {
        return obj;
    }
    current = obj;
    for (i = 0; i < length && utils.isContainer(current) && current !== null; i++) {
        container = current;
        current = canReflect.getKeyValue(container, parts[i]);
    }
    return current;
}
module.exports = get;