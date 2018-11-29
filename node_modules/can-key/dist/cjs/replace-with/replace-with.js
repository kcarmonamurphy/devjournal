/*can-key@1.1.0#replace-with/replace-with*/
'use strict';
var utils = require('../utils.js');
var get = require('../get/get.js');
var deleteKey = require('../delete/delete.js');
module.exports = function (str, data, replacer, shouldRemoveMatchedPaths) {
    return str.replace(utils.strReplacer, function (whole, path) {
        var value = get(data, path);
        if (shouldRemoveMatchedPaths) {
            deleteKey(data, path);
        }
        return replacer ? replacer(path, value) : value;
    });
};