/*can-key@1.1.0#delete/delete*/
'use strict';
var canReflect = require('can-reflect');
var utils = require('../utils.js');
module.exports = function deleteAtPath(data, path) {
    var parts = utils.parts(path);
    var current = data;
    for (var i = 0; i < parts.length - 1; i++) {
        if (current) {
            current = canReflect.getKeyValue(current, parts[i]);
        }
    }
    if (current) {
        canReflect.deleteKeyValue(current, parts[parts.length - 1]);
    }
};