// Generated by Haxe 4.2.0-rc.1+4475dc30f
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var content = js_node_Fs.readFileSync("bin/data/settings.89580.json",{ encoding : "utf8"});
	var setting = JSON.parse(content);
	var packedassets = setting.packedAssets;
	setting.md5AssetsMap.importKeys = PackedAssetsParse.createMap(setting.md5AssetsMap.import2);
	setting.md5AssetsMap.rawassetKeys = PackedAssetsParse.createMap(setting.md5AssetsMap.rawassets);
	var assets = setting.rawAssets.assets;
	var disMap_h = Object.create(null);
	var _g_keys = Reflect.fields(assets);
	var _g_index = 0;
	while(_g_index < _g_keys.length) {
		var key = _g_keys[_g_index++];
		var value = ({ value : assets[key], key : key}).value;
		var path = value[0];
		Main.createFloder(Main.getPath(path));
	}
	var findNums = 0;
	var copyNums = 0;
	var disFiles = [];
	var _g_keys = Reflect.fields(packedassets);
	var _g_index = 0;
	while(_g_index < _g_keys.length) {
		var key = _g_keys[_g_index++];
		var _g = { value : packedassets[key], key : key};
		var key1 = _g.key;
		var value = _g.value;
		haxe_Log.trace(key1,{ fileName : "src/Main.hx", lineNumber : 55, className : "Main", methodName : "main"});
		var importFolder = HxOverrides.substr(key1,0,2);
		var filesName = "bin/res/import/" + importFolder + "/" + key1 + "." + setting.md5AssetsMap.importKeys.h[key1 == null ? "null" : "" + key1] + ".json";
		var file = haxe_io_Path.withoutDirectory(filesName);
		if(sys_FileSystem.exists(filesName)) {
			++findNums;
			var _g1 = 0;
			while(_g1 < value.length) {
				var fo = value[_g1];
				++_g1;
				if(fo != null) {
					if(Std.string(fo) == "1340") {
						haxe_Log.trace("fuck",{ fileName : "src/Main.hx", lineNumber : 70, className : "Main", methodName : "main"});
					}
					var distFolder = assets[Std.string(fo)];
					if(distFolder != null) {
						var distFile = Main.createFloder(distFolder[0]) + "/" + file;
						if(!sys_FileSystem.exists(distFile)) {
							sys_io_File.copy(filesName,distFile);
						}
						if(disFiles.indexOf(distFile) == -1) {
							if(distFile.indexOf("0bc18e477.0942f") != -1) {
								haxe_Log.trace("ok",{ fileName : "src/Main.hx", lineNumber : 83, className : "Main", methodName : "main"});
							}
							disFiles.push(distFile);
							var v = Std.string(fo);
							disMap_h[distFile] = v;
						}
						++copyNums;
					} else {
						haxe_Log.trace("不存在" + Std.string(distFolder) + ("原始文件 " + filesName),{ fileName : "src/Main.hx", lineNumber : 92, className : "Main", methodName : "main"});
					}
				}
			}
		}
	}
	haxe_Log.trace("创建目录完毕  找到文件 " + findNums + " 拷贝文件 " + copyNums,{ fileName : "src/Main.hx", lineNumber : 99, className : "Main", methodName : "main"});
	var keyMaps = new haxe_ds_StringMap();
	var _g = 0;
	while(_g < disFiles.length) {
		var fs = disFiles[_g];
		++_g;
		if(fs.indexOf("0fad7c004.00762") != -1) {
			haxe_Log.trace("-1",{ fileName : "src/Main.hx", lineNumber : 109, className : "Main", methodName : "main"});
		}
		var content = js_node_Fs.readFileSync(fs,{ encoding : "utf8"});
		var r = new EReg("texture\".+?,","g");
		var arr = Main.getMatches(r,content);
		var _g1 = 0;
		while(_g1 < arr.length) {
			var e = arr[_g1];
			++_g1;
			var key = StringTools.replace(e," ","").substring(10,e.length - 2);
			if(key.indexOf("es") != -1) {
				haxe_Log.trace("ok",{ fileName : "src/Main.hx", lineNumber : 121, className : "Main", methodName : "main"});
			}
			if(key.length < 16) {
				continue;
			}
			var v = UUIDHelper.decompressUuid(key);
			keyMaps.h[key] = v;
			var importFolder = v.substring(0,2);
			var folder = "bin/res/raw-assets/" + importFolder + "/";
			var files = js_node_Fs.readdirSync(folder);
			var _g2 = 0;
			while(_g2 < files.length) {
				var fss = files[_g2];
				++_g2;
				var ext = haxe_io_Path.withoutDirectory(fss);
				var disFile = haxe_io_Path.directory(fs) + "/" + ext;
				var fromFile = folder + fss;
				if(sys_FileSystem.exists(fromFile)) {
					sys_io_File.copy(fromFile,disFile);
				} else {
					haxe_Log.trace("error " + fromFile,{ fileName : "src/Main.hx", lineNumber : 154, className : "Main", methodName : "main"});
				}
			}
		}
	}
	js_node_Fs.writeFileSync("bin/assets/uuid.json",JSON.stringify(keyMaps));
	haxe_Log.trace("保存完毕",{ fileName : "src/Main.hx", lineNumber : 165, className : "Main", methodName : "main"});
};
Main.getMatches = function(ereg,input,index) {
	if(index == null) {
		index = 0;
	}
	var matches = [];
	while(ereg.match(input)) {
		matches.push(ereg.matched(index));
		input = ereg.matchedRight();
	}
	return matches;
};
Main.createFloder = function(folderName) {
	folderName = StringTools.replace(haxe_io_Path.withoutExtension("bin/assets/" + folderName)," ","");
	if(!sys_FileSystem.exists(folderName)) {
		sys_FileSystem.createDirectory(folderName);
	}
	return folderName;
};
Main.getPath = function(p) {
	return haxe_io_Path.directory(p);
};
Math.__name__ = true;
var PackedAssetsParse = function() { };
PackedAssetsParse.__name__ = true;
PackedAssetsParse.createMap = function(d) {
	var map = new haxe_ds_StringMap();
	var i = 0;
	var len = d.length;
	while(i < len) {
		map.h[Std.string(d[i])] = d[i + 1];
		i += 2;
	}
	return map;
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringHelper = function() { };
StringHelper.__name__ = true;
StringHelper.slice = function(str,start,end) {
	if(end == null) {
		end = str.length;
	}
	return str.substring(start,end);
};
StringHelper.toString = function(num,len) {
	return StringTools.hex(num,1);
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	while(true) {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var UUIDHelper = function() { };
UUIDHelper.__name__ = true;
UUIDHelper.decompressUuid = function(str) {
	var _g = 0;
	while(_g < 64) {
		var i = _g++;
		UUIDHelper.AsciiTo64[HxOverrides.cca(UUIDHelper.Base64KeyChars,i)] = i;
	}
	if(str.length == 23) {
		var hexChars = [];
		var i = 5;
		while(i < 23) {
			var lhs = UUIDHelper.AsciiTo64[HxOverrides.cca(str,i)];
			var rhs = UUIDHelper.AsciiTo64[HxOverrides.cca(str,i + 1)];
			hexChars.push(StringHelper.toString(lhs >> 2,16));
			hexChars.push(StringHelper.toString((lhs & 3) << 2 | rhs >> 4,16));
			hexChars.push(StringHelper.toString(rhs & 15,16));
			i += 2;
		}
		str = StringHelper.slice(str,0,5) + hexChars.join("");
	} else if(str.length == 22) {
		var hexChars = [];
		var i = 2;
		while(i < 22) {
			var key1 = HxOverrides.cca(str,i);
			var key2 = HxOverrides.cca(str,i + 1);
			var lhs = UUIDHelper.AsciiTo64[key1];
			var rhs = UUIDHelper.AsciiTo64[key2];
			var lhhs = lhs >> 2;
			var xk = StringHelper.toString(lhhs,16);
			haxe_Log.trace(lhhs,{ fileName : "src/UUIDHelper.hx", lineNumber : 63, className : "UUIDHelper", methodName : "decompressUuid", customParams : [xk]});
			hexChars.push(xk);
			hexChars.push(StringHelper.toString((lhs & 3) << 2 | rhs >> 4,16));
			hexChars.push(StringHelper.toString(rhs & 15,16));
			i += 2;
		}
		str = StringHelper.slice(str,0,2) + hexChars.join("");
	}
	return [StringHelper.slice(str,0,8),StringHelper.slice(str,8,12),StringHelper.slice(str,12,16),StringHelper.slice(str,16,20),StringHelper.slice(str,20)].join("-").toLowerCase();
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
});
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
});
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = true;
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) {
		return "";
	}
	return s.dir;
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (this.ext == null ? "" : "." + this.ext);
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_Fs = require("fs");
var js_node_Path = require("path");
var js_node_buffer_Buffer = require("buffer").Buffer;
var sys_FileSystem = function() { };
sys_FileSystem.__name__ = true;
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _g ) {
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( _g ) {
		var _g1 = haxe_Exception.caught(_g).unwrap();
		if(_g1.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _g ) {
				throw _g1;
			}
			if(!stat.isDirectory()) {
				throw _g1;
			}
		}
	}
};
var sys_io_File = function() { };
sys_io_File.__name__ = true;
sys_io_File.copy = function(srcPath,dstPath) {
	var src = js_node_Fs.openSync(srcPath,"r");
	var stat = js_node_Fs.fstatSync(src);
	var dst = js_node_Fs.openSync(dstPath,"w",stat.mode);
	var bytesRead;
	var pos = 0;
	while(true) {
		bytesRead = js_node_Fs.readSync(src,sys_io_File.copyBuf,0,65536,pos);
		if(!(bytesRead > 0)) {
			break;
		}
		js_node_Fs.writeSync(dst,sys_io_File.copyBuf,0,bytesRead);
		pos += bytesRead;
	}
	js_node_Fs.closeSync(src);
	js_node_Fs.closeSync(dst);
};
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
UUIDHelper.Base64KeyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
UUIDHelper.AsciiTo64 = (function($this) {
	var $r;
	var _g = [];
	{
		var _g1 = 0;
		while(_g1 < 128) {
			++_g1;
			_g.push(0);
		}
	}
	$r = _g;
	return $r;
}(this));
sys_io_File.copyBuf = js_node_buffer_Buffer.alloc(65536);
Main.main();
})({});

//# sourceMappingURL=main.js.map