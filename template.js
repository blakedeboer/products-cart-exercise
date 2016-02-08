function productsTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (productsArray) {
var arr = productsArray
buf.push("<ul id=\"products-list\">");
for (var i = 0; i < arr.length; i++)
{
buf.push("<li class=\"product-listing\"><h4>" + (jade.escape(null == (jade_interp = arr[i].name) ? "" : jade_interp)) + "</h4><div class=\"description\"><p class=\"description\">" + (jade.escape(null == (jade_interp = arr[i].description) ? "" : jade_interp)) + "</p><div class=\"price\"><span>" + (jade.escape(null == (jade_interp = "Price: ") ? "" : jade_interp)) + "</span><span>" + (jade.escape(null == (jade_interp = arr[i].price) ? "" : jade_interp)) + "</span></div></div><div class=\"buy\"><button" + (jade.attr("id", arr[i].id, true, false)) + " class=\"buy-button\">BUY</button></div></li>");
}
buf.push("</ul>");}.call(this,"productsArray" in locals_for_with?locals_for_with.productsArray:typeof productsArray!=="undefined"?productsArray:undefined));;return buf.join("");
}function minicartTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (cartProducts) {
var arr = cartProducts
buf.push("<ul>");
for (var i = 0; i < arr.length; i++)
{
buf.push("<li><span>" + (jade.escape(null == (jade_interp = arr[i].name) ? "" : jade_interp)) + "</span><button" + (jade.attr("id", arr[i].id, true, false)) + " class=\"cancel-button\"></button></li>");
}
buf.push("</ul>");}.call(this,"cartProducts" in locals_for_with?locals_for_with.cartProducts:typeof cartProducts!=="undefined"?cartProducts:undefined));;return buf.join("");
}