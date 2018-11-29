var assign = require('./can-assign');
var QUnit = require('steal-qunit');

QUnit.module("can-assign");

QUnit.test("Assign all properties to an object", function(){
	var a = {a: 1, b: 2, d: 3};
	var b = {a: 1, b: 3, c: 2};
	var expected =  {a: 1, b: 3, c: 2, d: 3};
	var actual = assign(a, b);

	for (var prop in actual){
		equal(expected[prop], actual[prop]);
	}
});

QUnit.test("Works with readonly properties", function(){
    var obj = {};
    Object.defineProperty(obj, "a", {
        value: "a",
        writable: false
    });

    Object.defineProperty(obj, "b", {
        value: "b",
        writable: true
    });

    Object.defineProperty(obj, "c", {
        get: function() { return "c"; },
        set: function(value) { this.b = value; },
        configurable: true
    });

    try {
        assign(obj, {a:"c", b:"f", d: "d"});

        QUnit.equal(obj.a, "a");
				QUnit.equal(obj.b, "f");
				QUnit.equal(obj.c, "c");
				QUnit.equal(obj.d, "d");

				assign(obj, {c:"h"});

				QUnit.equal(obj.a, "a");
				QUnit.equal(obj.b, "h");
				QUnit.equal(obj.c, "c");
				QUnit.equal(obj.d, "d");
    } catch(err) {
        QUnit.ok(false, err);
    }

});
