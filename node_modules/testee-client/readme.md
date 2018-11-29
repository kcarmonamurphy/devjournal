# Testee client adapters

[![Build Status](https://travis-ci.org/bitovi/testee-client.svg?branch=master)](https://travis-ci.org/bitovi/testee-client)

Testee client side adapters for Mocha, QUnit and Jasmine (1 and 2) that convert test results into Feathers service calls (`runs`, `suites`, `tests` and `coverages`).

## Initializing options

In your test page you can set Testee options using `window.Testee`. 

### BaseURL

By default, the client will use the url the tests are running at (`window.location.protocol + '//' + window.location.host`). you can change this using the `baseURL` option:

```html
<script type="text/javascript">
window.Testee = {
  baseURL: 'http://testee-server.com/'
}
</script>
<script type="text/javascript" src="testee-client.js"></script>
```

### Provider

By default, the client will use socket.io to make Feathers service calls. You can change this to use REST by specifying the `provider` option:

```html
<script type="text/javascript">
window.Testee = {
  provider: {
    type: 'rest'
  }
}
</script>
<script type="text/javascript" src="testee-client.js"></script>
```

### Socket

You can provide your own socket instance to make Feathers service calls using the `socket` option:

```html
<script type="text/javascript" src="http://testee-server.com/socket.io/socket.io.js"></script>
<script type="text/javascript">
window.Testee = {
  socket: io('http://testee-server.com/')
}
</script>
<script type="text/javascript" src="testee-client.js"></script>
```

## Asynchronous Loading

When loading files asynchronously, you need to stop your testing framework from running until all test files are loaded. Then call `window.Testee.init()`. If you're using [steal](https://www.npmjs.com/package/steal), you can use the [steal-mocha](https://www.npmjs.com/package/steal-mocha), [steal-qunit](https://www.npmjs.com/package/steal-qunit) or [steal-jasmine](https://www.npmjs.com/package/steal-jasmine) libraries.

### Mocha

```html
<script type="text/javascript" src="//best/cdn/ever/mocha/mocha.js"></script>
<script type="text/javascript" src="testee-client.js"></script>
<script type="text/javascript">
define(['tests.js'], function() {
  if(window.Testee) {
    window.Testee.init();
  }
  mocha.run();
});
</script>
```

### QUnit

```html
<script type="text/javascript" src="//best/cdn/ever/qunit.js"></script>
<script type="text/javascript" src="testee-client.js"></script>
<script type="text/javascript">
QUnit.config.autorun = false;
define(['tests.js'], function() {
  if(window.Testee) {
    window.Testee.init();
  }
  QUnit.load();
});
</script>
```

### Jasmine

```html
<script type="text/javascript" src="//best/cdn/ever/jasmine/jasmine.js"></script>
<script type="text/javascript" src="//best/cdn/ever/jasmine/jasmine-html.js"></script>
<script type="text/javascript" src="//best/cdn/ever/jasmine/boot.js"></script>
<script type="text/javascript" src="testee-client.js"></script>
<script type="text/javascript">
define(['tests.js'], function() {
  if(window.Testee) {
    window.Testee.init();
  }
  window.onload();
});
</script>
```

## A test flow:

```js
var ids = {
  run: guid(),
  suite: guid(),
  childsuite: guid(),
  testpass: guid(),
  testfail: guid()
};

Testee.start({
  id: ids.run,
  environment : navigator.userAgent,
  runner : 'Jasmine'
});

Testee.suite({
  "title": "Main test suite title",
  "root": true, // If it is the root level test suite
  "id": ids.suite,
  "parent": runId
});

Testee.suite({
  "title": "Child test suite",
  "parent": ids.suite,
  "id": ids.childsuite
});

Testee.test({
  "title": "The test title",
  "parent": ids.childsuite, // Parent suite id
  "id": ids.testpass
});

Testee.pass({
  "duration": 0,
  "id": ids.testpass
});

Testee.testEnd({
  "id": ids.testspass
});

Testee.test({
  "title": "A failing test",
  "parent": ids.childsuite,
  "id": ids.testfail
});

Testee.fail({
  "id": ids.testfail,
  "err": {
    "message": "expected 1 to equal 2",
    "stack": "Error: expected 1 to equal 2\n    at Assertion.assert (/Users/daff/Development/node/swarmling/node_modules/expect.js/expect.js:99:13)\n    CUSTOM STACK TRACE"
  }
});

Testee.testEnd({
  "id": ids.testfail
});

Testee.suiteEnd({
  "id": ids.childsuite
});

Testee.suiteEnd({
  "id": ids.suite
});

Testee.end({});
```