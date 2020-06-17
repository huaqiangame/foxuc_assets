import haxe.DynamicAccess;

using Lambda;

class PackedAssetsParse {
	public static function createMap(d:Array<Dynamic>) :Map<String, String> {
		var map:Map<String, String> = [];

		var i:Int = 0;

		var len = d.length;

		while (i < len) {
			map.set(Std.string(d[i]), d[i+1]);

			i += 2;
        }
        

        return map;
	}
}
