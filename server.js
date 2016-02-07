'use strict';

var http = require('http'),
		url = require('url'),
		fs = require('fs'),		
		jade = require('jade');

var jsFunctionString = jade.compileFileClient('template.jade', {name: "jadeTemplate"});
fs.writeFileSync("template.js", jsFunctionString);

function onRequest (request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log("file request from path: " + pathname);

	pathname = pathname === "/" ? "index.html" : pathname.substring(1);

	fs.readFile(pathname, function (err, data) {
		if (!err) {
			response.write(data);
		} else {
			console.log("ERROR", err);
			response.writeHead(404);
		}
		response.end();
	});
}

http.createServer(onRequest).listen(8080);

console.log("server running at localhost:8080");