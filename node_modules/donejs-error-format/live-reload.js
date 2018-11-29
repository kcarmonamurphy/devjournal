
module.exports = function(data){
	let {host, port} = data;

	return `
(function(){
	if(typeof WebSocket === "undefined") return;

	var host = ${host ? `"${host}"` : "null"} || window.document.location.host.replace(/:.*/, '');
	var port = ${port ? port : "8012"};

	var protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
	var url = protocol + "//" + host + ":" + port;
	var ws = new WebSocket(url);

	ws.onmessage = function(){
		// Just reload and hope it's fixed.
		window.location.reload();
	};
})();
`;
};
