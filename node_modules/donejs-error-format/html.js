module.exports = formatHTML;

function template(e, options) {
	const load = require("./lazy-load");
	const styles = load(__dirname + "/html.css");
	const liveReloadScript = require("./live-reload.js");
	let hasMessage = e.message && e.message.trim().length;

	return `
<!doctype html>
<html lang="en">
<title>DoneJS Error</title>

<link rel="icon" type="image/png" href="data:image/png;base64,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
">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css">
<style>${styles}</style>

<main>
  <header>
    <h1>${e.headline || "Error compiling"}</h1>
  </header>
  <div class="error-message">
  	${hasMessage ? `
      <div class="message">
       ${addLinks(e.message)}
      </div>
    ` : ''}

    ${e.codeFrame ? `
      <pre class="code-frame"><code class="hljs javascript">${formatCode(e.codeFrame)}</code></pre>
    ` : ''}
  </div>
  ${e.stack ? `
   <div class="stack-trace"><pre>${e.stack}</pre></div>
  ` : ''}
  ${options.liveReload ? `
	  <script id="live-reload">${liveReloadScript(options.liveReload)}</script>
  `: ''}

</main>
  `.trim();
}

const numberExp = /^>? +[0-9]+ \| /gm;
const replExp = /<span class="hljs-comment">\/\*DONEFORMAT\*\/<\/span>/g;
function formatCode(inCode) {
	const hljs = require("highlight.js");

	// strip the 5 | parts temporarily and plug in a comment.
	let lineParts = [];
	let code = inCode.replace(numberExp, function(p){
		lineParts.push(p);
		return "/*DONEFORMAT*/";
	});

	let out = hljs.highlightAuto(code).value;

	let final = out.replace(replExp, function (p){
		return `<span>${lineParts.shift()}</span>`;
	});

	return final;
}

const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
function addLinks(text) {
	let out = text.replace(urlExp, function(url){
		return `<a href="${url}">${url}</a>`;
	});
	return out;
}

function formatHTML(parts, options){
	let opts = {};
	if(options) {
		opts = Object.assign({}, options, {
			liveReload: options.liveReload === true ?
				{
					port: 8012
				} : options.liveReload
		})
	}

	return template(parts, opts);
}
