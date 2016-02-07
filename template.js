function jadeTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (products) {
var arr = products
buf.push("<ul>");
for (var i = 0; i < arr.length; i++)
{
buf.push("<li><span>" + (jade.escape(null == (jade_interp = arr[i].name) ? "" : jade_interp)) + "</span></li>");
}
buf.push("</ul>");}.call(this,"products" in locals_for_with?locals_for_with.products:typeof products!=="undefined"?products:undefined));;return buf.join("");
}