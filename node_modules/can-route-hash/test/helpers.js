var QUnit = require("steal-qunit");

var helpers = {};

helpers.setup = function(callback){
	var testarea = document.getElementById('qunit-fixture');
	var iframe = document.createElement('iframe');
	QUnit.stop();
	window.routeTestReady = function(){
		callback.apply(iframe, arguments);
	};
	iframe.src = __dirname + "/testing.html?"+Math.random();
	testarea.appendChild(iframe);
	helpers.teardown = function(){
		setTimeout(function(){
			testarea.removeChild(iframe);
			setTimeout(function(){
				QUnit.start();
			},10);
		},1);
	};

	return function(){
		return helpers.teardown();
	};
};

module.exports = helpers;
