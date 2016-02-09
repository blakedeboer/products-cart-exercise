#products-cart-exercise


To start the app (assuming all node modules are loaded):

1.	Run the command `json-server data/db.json` from inside this folder to start the json server.
2.	On a separate tab in the console, run the command `node server.js` from inside this folder to 
		start the web server and compile the Jade templates.


Notes:

-Due to the simplicity of this app, the client side javascript has all been included in one file, main.js. 
Within main.js, the code is broken into different sections based on functionality. If in the future we wanted to
add onto these sections or reuse a section, we could easily break them into separate files and reference them via
Browserify or RequireJS. 

-Future work on this page would include handling server errors or delays. We may want to prepare for server
issues by displaying default template(s) in the event the data is delayed or there is a parsing error.

-Currently productsTemplate and minicartTemplate are global functions. If we believe this is a security risk, we
could again use something like Browserify or RequireJS to import them directly into the other JS files.