const assert = require('assert');
const {extract, html: formatHTML} = require('../main');

// Fixtures
var fourOhFourError = require('./fixtures/404');
var stackError = require('./fixtures/stack');

describe('HTML options', function(){
	describe('liveReload', function(){
		it('liveReload: null', function(){
			let parts = extract(fourOhFourError);
			let html = formatHTML(parts, {
				liveReload: null
			});
			assert.ok(!/id="live-reload"/.test(html), "includes the script");
		})

		it('liveReload: true', function(){
			let parts = extract(fourOhFourError);
			let html = formatHTML(parts, {
				liveReload: true
			});

			assert.ok(/id="live-reload"/.test(html), "includes the script");
			assert.ok(/var port = 8012/.test(html), "Sets the default port");
		});

		it('liveReload: {} uses the default port', function(){
			let parts = extract(fourOhFourError);
			let html = formatHTML(parts, {
				liveReload: {}
			});

			assert.ok(/id="live-reload"/.test(html), "includes the script");
			assert.ok(/var port = 8012/.test(html), "Sets the default port");
		});

		it('liveReload: {port} uses the chosen port', function(){
			let parts = extract(fourOhFourError);
			let html = formatHTML(parts, {
				liveReload: {
					port: 4044
				}
			});

			assert.ok(/id="live-reload"/.test(html), "includes the script");
			assert.ok(/var port = 4044/.test(html), "Sets the default port");
		});
	});
})

describe('Errors with codeFrame', function(){
	it('Creates good HTML', function(){
		let parts = extract(fourOhFourError);
		let html = formatHTML(parts);

		assert.ok(html, "got some html");
	});
});

describe('Errors with a stack', function(){
	it('Creates good HTML', function(){
		let parts = extract(stackError);
		let html = formatHTML(parts);

		assert.ok(!/class="message"/.test(html), "Message not included");
		assert.ok(/class="stack-trace"/.test(html), "Stack trace is included");
	});
});
