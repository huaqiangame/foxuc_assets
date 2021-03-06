import haxe.DynamicAccess;

typedef SettingObj = {
	var rawAssets:RawAssetsObj;
	var md5AssetsMap:MD5AssetsMap;
	var uuids:Array<String>;
	var ?uuidsCrack:Map<String,String>;
	var packedAssets:DynamicAccess<Array<Dynamic>>;
}

typedef RawAssetsObj = {
	var assets:DynamicAccess<Array<Dynamic>>;
	var internal:DynamicAccess<Array<Dynamic>>;
	var assetTypes:Array<String>;
	var jsList:Array<String>;
	var launchScene:String;
	var scenes:Array<Dynamic>;
	var packedAssets:Map<String, String>;
	var md5AssetsMap:MD5AssetsMap;
	var orientation:String;
	var debug:Bool;
	var uuids:Array<String>;

}

typedef MD5AssetsMap = {
	var import2:Array<Dynamic>;
	var rawassets:Array<Dynamic>;

	var ?importKeys:Map<String, String>; // import
	var ?rawassetKeys:Map<String, String>; // import
}
