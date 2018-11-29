let msg = `
Error: ENOENT: no such file or directory, open '/Users/matthew/dev/break-donejs/src/not-exists.js'
The module [break-donejs/not-exists] couldn't be fetched.
Clicking the link in the stack trace below takes you to the import.
See https://stealjs.com/docs/StealJS.error-messages.html#404-not-found for more information.

  4 | import 'can-debug#?./is-dev';
  5 | import './cjs-module';
> 6 | import './not-exists';
    |       ^
  7 |
  8 | const AppViewModel = DefineMap.extend({
  9 |   env: {
`.trim();

let trace = '    at (file:/Users/matthew/dev/break-donejs/src/app.js:6:7)';

let error = new Error(msg);
error.stack = msg + '\n' + trace;

module.exports = error;
