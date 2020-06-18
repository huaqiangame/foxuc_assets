import haxe.ds.Map;
using StringTools;
using StringHelper;
class UUIDHelper {
	static var Base64KeyChars:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	static var AsciiTo64:Array<Int> = [for(i in 0...128) 0];

	static function main() {
	
	}


	public static function decompressUuidArray(arr:Array<String>):Map<String,String>{


		var out:Map<String,String>=[];
		for(i in 0...arr.length){

			out[arr[i]]=(decompressUuid(arr[i]));
		}

		return out;
		
	}

	public static function decompressUuid(str:String) {

		
		
			for(i in 0...64){
				AsciiTo64[Base64KeyChars.charCodeAt(i)] = i;
			}
		
		if (str.length == 23) {
			// decode base64
			var hexChars = [];
			// for (var i = 5; i < 23; i += 2) {
			// for(i in 5..)
			var i = 5;
			while (i < 23) {
				var lhs = AsciiTo64[str.charCodeAt(i)];
				var rhs = AsciiTo64[str.charCodeAt(i + 1)];
				hexChars.push((lhs >> 2).toString(16));
				hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
				hexChars.push((rhs & 0xF).toString(16));
				i += 2;
			}

			//
			str = str.slice(0, 5) + hexChars.join('');
		} else if (str.length == 22) {
			// decode base64
			var hexChars = [];
			var i = 2;
			while (i < 22) {
				var key1=str.charCodeAt(i);
				var key2=str.charCodeAt(i + 1);
				var lhs = AsciiTo64[key1];
				var rhs = AsciiTo64[key2];
				var lhhs=lhs >> 2;
				var xk=lhhs.toString(16);
				trace(lhhs,xk);
				hexChars.push(xk);
				hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
				hexChars.push((rhs & 0xF).toString(16));
				i += 2;
			}
			//
			str = str.slice(0, 2) + hexChars.join('');
		}
		return [
			str.slice(0, 8),
			str.slice(8, 12),
			str.slice(12, 16),
			str.slice(16, 20),
			str.slice(20)
		].join('-').toLowerCase();
	}
}
