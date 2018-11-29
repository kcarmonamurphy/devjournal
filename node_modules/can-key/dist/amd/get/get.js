/*can-key@1.1.0#get/get*/
define([
    'require',
    'exports',
    'module',
    'can-reflect',
    '../utils'
], function (require, exports, module) {
    'use strict';
    var canReflect = require('can-reflect');
    var utils = require('../utils');
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
});