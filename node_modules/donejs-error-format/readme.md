# donejs-error-format

[![Build Status](https://travis-ci.org/donejs/donejs-error-format.svg?branch=master)](https://travis-ci.org/donejs/donejs-error-format)
[![npm version](https://badge.fury.io/js/donejs-error-format.svg)](http://badge.fury.io/js/donejs-error-format)

An error formatter for Errors that are emitted by [done-ssr](https://github.com/donejs/done-ssr).

<img src="https://user-images.githubusercontent.com/361671/37160048-4c2f266c-22bd-11e8-885d-687bb6428860.png" alt="donejs-error-format example" style="max-width:100%;">

# Install

```shell
npm install donejs-error-format --save
```

# Usage

If you are using done-serve, it already uses donejs-error-format internally. If you use done-ssr or done-ssr-middleware, you can use this module to format your error messages.

## done-ssr

```js
const errorFormat = require("donejs-error-format");
const ssr = require("done-ssr");

const render = ssr({ config: __dirname + "/package.json" });

function app(request, response) {
	// More stuff here, obviously, like static assets, etc.

	let stream = render(request);

	stream.on("error", function(error){
		let parts = errorFormat.extract(error);
		let html = errorFormat.html(parts);

		console.error(error);

		response.writeHead(200, { type: "text/html" });
		response.end(html);
	});

	stream.pipe(response);
}

require("http").createServer(app).listen(8080);
```

## done-ssr-middleware

```js
const express = require("express");
const errorFormat = require("donejs-error-format");
const ssr = require("done-ssr-middleware");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(ssr({ config: __dirname + "/package.json!npm" }));


// The last middleware should be the error handler
app.use(function(error, request, response, next) {
	let parts = errorFormat.extract(error);
	let html = errorFormat.html(parts);

	console.error(error);

	response.type("html").end(html);
});
```

# API

## .extract(error)

This function takes an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and returns an object with parts extracted. This is used to pass into `.html()` and other formatting functions (currently there is only HTML).

## .html(parts)

This function is used to generate formatted HTML. It takes a __parts__ object that comes from using `.extract`.

```js
let parts = errorFormat.extract(error);
let html = errorFormat.html(parts);
```

### .html(parts, options)

The second signature is like the first but takes an __options__ object. The options are:

* __liveReload__: This can either be the boolean `true` or an object that provides the port like: `{ port: 4044 }`. By default the port __8012__ is used (which is the default in DoneJS apps). You only need to set this option if you are using an alternative port in your development server.

Enabling the live-reload script:

```js
let parts = errorFormat.extract(error);
let html = errorFormat.html(parts, {
	liveReload: true
})
```

Or with a port:

```js
let parts = errorFormat.extract(error);
let html = errorFormat.html(parts, {
	liveReload: {
		port: 4044
	}
})
```

# License

MIT
