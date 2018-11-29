const assert = require('assert');
const {extract, html: formatHTML} = require('./main');
const fs = require("fs");

// Fixture
var error = require('./test/fixtures/stack');

debugger;

let parts = extract(error);
let html = formatHTML(parts);

fs.writeFileSync(__dirname + "/example/error.html", html, "utf8");
