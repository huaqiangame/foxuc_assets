// Generated by Haxe 4.2.0-rc.1+4475dc30f
(function ($global) { "use strict";
var Main = function() { };
Main.main = function() {
	console.log("src/Main.hx:15:",js_node_Fs.readFileSync("Setting.json",{ encoding : "utf8"}));
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_node_Fs = require("fs");
Main.main();
})({});
