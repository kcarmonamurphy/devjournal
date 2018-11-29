/*can-key@1.1.0#can-key*/
'use strict';
var deleteKey = require('./delete/delete.js'), get = require('./get/get.js'), replaceWith = require('./replace-with/replace-with.js'), set = require('./set/set.js'), transform = require('./transform/transform.js'), walk = require('./walk/walk.js'), namespace = require('can-namespace');
module.exports = namespace.key = {
    deleteKey: deleteKey,
    get: get,
    replaceWith: replaceWith,
    set: set,
    transform: transform,
    walk: walk
};