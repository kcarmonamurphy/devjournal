var copy = require("recursive-copy");

var p = copy("node_modules", "test/tests/node_modules", { overwrite: true });

p.catch(function(err){
	console.error(err);
	process.exit(1);
});
