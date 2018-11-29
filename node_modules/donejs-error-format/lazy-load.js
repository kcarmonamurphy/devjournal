
const cache = new Map();

function load(pth) {
	if(cache.has(pth)) {
		return cache.get(pth);
	}

	const fs = require("fs");
	let src = fs.readFileSync(pth, "utf8");
	cache.set(pth, src);
	return src;
}

module.exports = load;
