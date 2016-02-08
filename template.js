function jadeTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (productsArray) {
var arr = productsArray
buf.push("<ul>");
for (var i = 0; i < arr.length; i++)
{
buf.push("<li><span>" + (jade.escape(null == (jade_interp = arr[i].name) ? "" : jade_interp)) + "</span><button id=\"arr[i].id\" class=\"buy-button\">BUY</button></li>");
}
buf.push("</ul>");}.call(this,"productsArray" in locals_for_with?locals_for_with.productsArray:typeof productsArray!=="undefined"?productsArray:undefined));;return buf.join("");
}