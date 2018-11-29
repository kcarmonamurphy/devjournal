/*can-key@1.1.0#can-key*/
define([
    'require',
    'exports',
    'module',
    './delete/delete',
    './get/get',
    './replace-with/replace-with',
    './set/set',
    './transform/transform',
    './walk/walk',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var deleteKey = require('./delete/delete'), get = require('./get/get'), replaceWith = require('./replace-with/replace-with'), set = require('./set/set'), transform = require('./transform/transform'), walk = require('./walk/walk'), namespace = require('can-namespace');
    module.exports = namespace.key = {
        deleteKey: deleteKey,
        get: get,
        replaceWith: replaceWith,
        set: set,
        transform: transform,
        walk: walk
    };
});