

exports.extract = extractParts;

// HTML formatter
exports.html = exports.HTML = require("./html");

// Terminal formatter
exports.term = require("./term");


const cfExp = /^>? +[0-9]+ \| /gm;
const stExp = /^ +at .*?\(?/gm;
function extractParts(error) {
	let text = error.stack || error;
	let parts = {};

	// the headline is the first line
	let firstLineEnd = text.indexOf("\n");
	parts.headline = text.substr(0, firstLineEnd);

	text = text.substr(firstLineEnd + 1);

	// code-frame
	let frame = snippet(cfExp, text);
	if(frame) {
		parts.codeFrame = frame.within();
		text = frame.without();
	}

	// stack trace
	let stack = snippet(stExp, text);
	if(stack) {
		parts.stack = stack.within();
		text = stack.without();
	}

	// Rest of the message
	parts.message = text;

	return parts;
}

function snippet(exp, text) {
	exp.lastIndex = 0;
	let match = exp.exec(text);

	if(match) {
		let start = match.index;
		let end;
		do {
			// Find the end of the current line.
			end = text.indexOf('\n', match.index);
		} while((match = exp.exec(text)) !== null);

		// If the end is -1 it means there were no newlines.
		if(end === -1) {
			end = text.length;
		}

		return {
			start, end,
			within: function(){
				return text.substr(start, end - start);
			},
			without: function(){
				return text.substr(0, start) + text.substr(end + 1);
			}
		};
	}
	return undefined;
}
