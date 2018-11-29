var path = require('path');
var os = require('os');

var ssr = require("done-ssr");

module.exports = function(stealConfig, options) {
	var steal = stealConfig || {};
	var pkgPath = path.join(path.dirname(steal.config), 'package.json');
	var pkg = require(pkgPath);

	// Default to using the npm plugin
	if(!steal.config) {
		steal.config = pkgPath + '!npm';
	}
	// liveReload is off by default.
	steal.liveReload = !!steal.liveReload;
	steal.liveReloadAttempts = steal.liveReloadAttempts || 3;
	steal.liveReloadHost = os.hostname();

	// In production we need to pass in the main, otherwise it doesn't know what
	// bundle to load from.
	if(process.env.NODE_ENV === 'production' && !steal.main) {
		steal.main = (pkg.system && pkg.system.main) ||
			(pkg.steal && pkg.steal.main) || pkg.main;
	}

	var render = ssr(steal, options);

	return function (req, res, next) {
		var stream = render(req);
		stream.on("error", next);
		stream.pipe(res);
		res.type("html");
	};
};
