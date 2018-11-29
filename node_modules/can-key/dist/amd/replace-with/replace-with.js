/*can-key@1.1.0#replace-with/replace-with*/
define([
    'require',
    'exports',
    'module',
    '../utils',
    '../get/get',
    '../delete/delete'
], function (require, exports, module) {
    'use strict';
    var utils = require('../utils');
    var get = require('../get/get');
    var deleteKey = require('../delete/delete');
    module.exports = function (str, data, replacer, shouldRemoveMatchedPaths) {
        return str.replace(utils.strReplacer, function (whole, path) {
            var value = get(data, path);
            if (shouldRemoveMatchedPaths) {
                deleteKey(data, path);
            }
            return replacer ? replacer(path, value) : value;
        });
    };
});