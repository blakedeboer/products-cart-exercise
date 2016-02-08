function productsTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (productsArray) {
var arr = productsArray
buf.push("<ul id=\"products-list\">");
for (var i = 0; i < arr.length; i++)
{
buf.push("<li class=\"product-listing\"><h4>" + (jade.escape(null == (jade_interp = arr[i].name) ? "" : jade_interp)) + "</h4><div class=\"description\"><p class=\"description\">" + (jade.escape(null == (jade_interp = arr[i].description) ? "" : jade_interp)) + "</p><div class=\"price\"><span>" + (jade.escape(null == (jade_interp = "Price: ") ? "" : jade_interp)) + "</span><span>" + (jade.escape(null == (jade_interp = arr[i].viewPrice) ? "" : jade_interp)) + "</span></div></div><div class=\"buy\"><button" + (jade.attr("id", arr[i].id, true, false)) + " class=\"buy-button\">BUY</button></div></li>");
}
buf.push("</ul>");}.call(this,"productsArray" in locals_for_with?locals_for_with.productsArray:typeof productsArray!=="undefined"?productsArray:undefined));;return buf.join("");
}function minicartTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (cartProducts, cartTotal, productCount) {
buf.push("<header id=\"cart-header\"><div id=\"cart-title\"><span id=\"cart-title\">" + (jade.escape(null == (jade_interp = "CART") ? "" : jade_interp)) + "</span></div><div id=\"cart-count\"><span id=\"cart-count\">" + (jade.escape(null == (jade_interp = productCount) ? "" : jade_interp)) + "</span></div></header>");
var arr = cartProducts
buf.push("<ul id=\"cart-list\"> ");
for (var i = 0; i < arr.length; i++)
{
buf.push("<li class=\"cart-listing\"><div class=\"product-name\"><p class=\"product-name\">" + (jade.escape(null == (jade_interp = arr[i].product.name) ? "" : jade_interp)) + "</p></div><div class=\"product-price\"><span class=\"product-price\">" + (jade.escape(null == (jade_interp = arr[i].product.viewPrice) ? "" : jade_interp)) + "</span></div><div class=\"cancel-section\"><button" + (jade.attr("id", arr[i].id, true, false)) + " class=\"cancel-button\"></button></div></li>");
}
buf.push("</ul><div id=\"total-cost-container\"><span id=\"total-title\">" + (jade.escape(null == (jade_interp = "Total: ") ? "" : jade_interp)) + "</span><span id=\"total-amount\">" + (jade.escape(null == (jade_interp = cartTotal) ? "" : jade_interp)) + "</span></div>");}.call(this,"cartProducts" in locals_for_with?locals_for_with.cartProducts:typeof cartProducts!=="undefined"?cartProducts:undefined,"cartTotal" in locals_for_with?locals_for_with.cartTotal:typeof cartTotal!=="undefined"?cartTotal:undefined,"productCount" in locals_for_with?locals_for_with.productCount:typeof productCount!=="undefined"?productCount:undefined));;return buf.join("");
}