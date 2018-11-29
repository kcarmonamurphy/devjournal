let msg = 'Error: oops';

let trace = `
    at DefineMap.init (file:/Users/matthew/dev/break-donejs/src/app.js!eval:30:17)
    at Function.newInstance (file:/Users/matthew/dev/break-donejs/node_modules/can-construct/can-construct.js:296:14)
    at DefineMap.init (file:/Users/matthew/dev/break-donejs/node_modules/can-construct/can-construct.js:635:29)
    at new DefineMap (eval at <anonymous> (evalmachine.<anonymous>:88:57), <anonymous>:3:32)
    at createViewModelAndRender (file:/Users/matthew/dev/break-donejs/src/index.stache:420:19)
    at /Users/matthew/dev/break-donejs/node_modules/done-ssr/zones/steal/load.js:67:9
    at /Users/matthew/dev/break-donejs/node_modules/can-zone/lib/tasks.js:146:15
    at Task.run (/Users/matthew/dev/break-donejs/node_modules/can-zone/lib/zone.js:38:17)
    at Zone.runTask (/Users/matthew/dev/break-donejs/node_modules/can-zone/lib/zone.js:180:14)
    at /Users/matthew/dev/break-donejs/node_modules/can-zone/lib/zone.js:281:15
`;

let error = new Error(msg);
error.stack = msg + '\n' + trace;

module.exports = error;
