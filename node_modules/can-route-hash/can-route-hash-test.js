var QUnit = require('steal-qunit');
var helpers = require("./test/helpers");

QUnit.module('can-route-hash');

QUnit.test('Basics', function(){
	var teardown = helpers.setup(function(RouteHash){
		var hash = new RouteHash();

		QUnit.equal(hash.value, "", "read as empty");

		hash.value = "foo/bar";

		QUnit.equal(hash.value, "foo/bar");
		teardown();
	});
});

QUnit.test('Event handlers are called', function(){
	var teardown = helpers.setup(function(RouteHash, canReflect){
		var hash = new RouteHash();
		canReflect.onValue(hash, function(){
			QUnit.ok(true, "it worked");
			teardown();
		});
		hash.value = "foo/bar";
	});
});

QUnit.test("test both sides of live binding", function(){
	var teardown = helpers.setup(function(RouteHash, canReflect, win){
		win.location.hash = "#!foo";
		var routeHash = new RouteHash();

		QUnit.equal(routeHash.value, "foo", "routeHash is initialized to window's hash");


		var next;
		// Setup a binding
		var bindingChanges = [];
		canReflect.onValue(routeHash, function(newVal){
			bindingChanges.push(newVal);
			next();
		});

		next = function(){
			next = function(){
				QUnit.deepEqual(bindingChanges,["bar","zed"],"dispatched events");
				teardown();
			};
			// Updating the observable changes the hash
			routeHash.value = "zed";
			QUnit.equal(win.location.hash, "#!zed");
		};

		// Updating the hash changes the observable
		win.location.hash = "#!bar";
		QUnit.equal(routeHash.value, "bar");
	});
});

QUnit.test('Can set hash to empty string after it has a value (#3)', function(){
	var teardown = helpers.setup(function(RouteHash, canReflect, win){
		win.location.hash = "";
		var routeHash = new RouteHash();

		// Set up a binding
		canReflect.onValue(routeHash, function() {});

		QUnit.equal(win.location.hash, "", "Hash is initialized");
		QUnit.equal(routeHash.value, "", "Observable is initialized to window's hash");

		routeHash.value = "";
		QUnit.equal(win.location.hash, "", "Updating the observable to an empty string does not change the hash");

		win.location.hash = "#!foo";
		QUnit.equal(routeHash.value, "foo", "Setting the hash changes the observable");

		routeHash.value = "bar";
		QUnit.equal(win.location.hash, "#!bar", "Setting the observable changes the hash");

		routeHash.value = "";
		QUnit.equal(win.location.hash, "#!", "Updating the observable back to an empty string changes the hash");

		teardown();
	});
});
