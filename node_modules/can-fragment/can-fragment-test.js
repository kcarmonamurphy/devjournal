var QUnit = require('steal-qunit');
var fragment = require('./can-fragment');
var makeDocument = require('can-vdom/make-document/make-document');
var childNodes = require("can-child-nodes");
var canReflect = require("can-reflect");

QUnit.module('can-fragment');

QUnit.test('string conversion', function(){
    var frag = fragment("<div></div><span></span>");
    QUnit.equal(frag.childNodes.length, 2);
});

QUnit.test('array element conversion', function(){
    var div = document.createElement("div"),
        span = document.createElement("span");
    var frag = fragment([
        div,
        span
    ]);
    QUnit.equal(frag.childNodes.length, 2);
    QUnit.deepEqual(Array.from( frag.childNodes ), [div, span]);
});

QUnit.test("create a frag with the vdom", function(){
    var doc = makeDocument();

    var frag = fragment("<div></div><span></span>", doc);
    QUnit.equal(childNodes(frag).length, 2);
});

QUnit.test("can.toDOM symbol works", function(){
	var frag = fragment( canReflect.assignSymbols({},{
		"can.toDOM": function(){
			return "<div></div><span></span>";
		}
	}));
    QUnit.equal(frag.childNodes.length, 2);
});
