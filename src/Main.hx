import haxe.io.Path;
import sys.FileSystem;
import haxe.Json;
import Setting.SettingObj;
import sys.io.File;
import json2object.JsonParser;

using StringTools;

class Main {
	static function main() {
		//	trace("Hello, world!");
		// var x=UUIDHelper.decompressUuid('3aTva/v/lOc7vg1JhzKyWH');

		var content:String = File.getContent('bin/data/Setting.json');

		var setting:SettingObj = Json.parse(content);

		// step1: find packageassetas

		var packedassets = setting.packedAssets;

		// 分析对应的key.
		setting.md5AssetsMap.importKeys = PackedAssetsParse.createMap(setting.md5AssetsMap.import2);
		setting.md5AssetsMap.rawassetKeys = PackedAssetsParse.createMap(setting.md5AssetsMap.rawassets);
		setting.uuidsCrack=UUIDHelper.decompressUuidArray(setting.uuids);
		
		
		

		// trace(packedassets);
		// for(key=>value in packedassets){
		// 	trace(key);
		// 	//find key in assets import /import raw folder

		// }

		var assets = setting.rawAssets.assets;

		for (keys => value in assets) {
			var path = value[0];
			var ex = value[1];

			createFloder(getPath(path));
		}

		var findNums = 0;

		var copyNums = 0;
		// key+"."+key.
		for (key => value in packedassets) {
			trace(key);
			// step 1 find key in assets import /import raw folder
			var importFolder = key.substr(0, 2); // 这个是在 res import 的文件夹里面

			var filesName = 'bin/res/import/' + importFolder + "/" + key + "." + setting.md5AssetsMap.importKeys[Std.string(key)] + ".json";

			var file = Path.withoutDirectory(filesName);

			// copy json到文件夹
			if (FileSystem.exists(filesName)) {
				findNums++;
				for (fo in value) {
					if (fo != null) {
						var distFolder:Array<Dynamic> = assets.get(Std.string(fo));
						if (distFolder != null) {
							// var distFiles=distFolder[0]+"/"
							var distFile = createFloder(distFolder[0]) + "/" + file;
							if (!FileSystem.exists(distFile)) {
								File.copy(filesName, distFile);
							}

							copyNums++;
						} else {
							trace('不存在' + distFolder + '原始文件 ${filesName}');
						}
					}
				}
			}
		}

		trace('创建目录完毕  找到文件 $findNums 拷贝文件 $copyNums');



		

		File.saveContent("bin/assets/uuid.json",Json.stringify(setting));
	}

	static function createFloder(folderName:String):String {
		folderName = Path.withoutExtension("bin/assets/" + folderName).replace(" ", "");
		if (!FileSystem.exists(folderName)) {
			FileSystem.createDirectory(folderName);
		}

		return folderName;
	}

	static function getPath(p:String) {
		return Path.directory(p);
	}
}
