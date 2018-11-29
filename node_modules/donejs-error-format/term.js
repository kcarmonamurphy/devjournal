
function format(parts) {
	// TODO having done this one yet.
	let out = `${parts.headline}\n${parts.message}\n${parts.codeFrame}\n${parts.stack}`;
	return out;
}

module.exports = format;
