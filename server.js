'use strict';

var http = require('http'),
		url = require('url'),
		fs = require('fs'),		
		jade = require('jade');

//compile Jade templates to javascript functions
var productsTemplateFn = jade.compileFileClient('templates/productsTemplate.jade', {name: "productsTemplate"});
var jadeMinicartTemplateFn = jade.compileFileClient('templates/minicartTemplate.jade', {name: "minicartTemplate"});

//create template.js file to store the Jade templates
fs.writeFile("templates/template.js", productsTemplateFn, function () {
	//once the products function is written, append the minicart function to the same file
	fs.appendFile("templates/template.js", jadeMinicartTemplateFn);
});

//set up function to handle http requests and response for logging activity and errors
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