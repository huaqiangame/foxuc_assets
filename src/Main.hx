import haxe.io.Path;
import sys.FileSystem;
import haxe.Json;
import Setting.SettingObj;
import sys.io.File;


using StringTools;

class Main {
	static function main() {
		//	trace("Hello, world!");
		// var x=UUIDHelper.decompressUuid('3aTva/v/lOc7vg1JhzKyWH');

		var time=Date.now().getTime();
		var content:String = File.getContent('bin/data/settings.89580.json');

		var setting:SettingObj = Json.parse(content);

		// step1: find packageassetas

		var packedassets = setting.packedAssets;

		// 分析对应的key.
		setting.md5AssetsMap.importKeys = PackedAssetsParse.createMap(setting.md5AssetsMap.import2);
		setting.md5AssetsMap.rawassetKeys = PackedAssetsParse.createMap(setting.md5AssetsMap.rawassets);
	//	setting.uuidsCrack=UUIDHelper.decompressUuidArray(setting.uuids);
		
		
		

		// trace(packedassets);
		// for(key=>value in packedassets){
		// 	trace(key);
		// 	//find key in assets import /import raw folder

		// }

		var assets = setting.rawAssets.assets;

		var disMap:Map<String,String>=[];
		for (keys => value in assets) {
			var path = value[0];
			var ex = value[1];

			createFloder(getPath(path));
		}

		var findNums = 0;

		var copyNums = 0;

		var disFiles:Array<String>=[];
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

						if(Std.string(fo)=='1340'){
							trace('fuck');
						}
						var distFolder:Array<Dynamic> = assets.get(Std.string(fo));
						if (distFolder != null) {
							// var distFiles=distFolder[0]+"/"
							var distFile = createFloder(distFolder[0]) + "/" + file;
							if (!FileSystem.exists(distFile)) {
								File.copy(filesName, distFile);
								
							}
							if(disFiles.indexOf(distFile)==-1){

								if(distFile.indexOf("0bc18e477.0942f")!=-1){
									trace('ok');
								}
								disFiles.push(distFile);
								disMap[distFile]=Std.string(fo);//setting.md5AssetsMap.importKeys[Std.string(key)];
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



		var keyMaps:Map<String,String>=[];


		for(fs in disFiles){

			if(fs.indexOf('0fad7c004.00762')!=-1){
				trace('-1');
			}
			var content=File.getContent(fs);
			var r:EReg=~/texture".+?,/g;

			var arr=getMatches(r,content);

			for(e in arr){

				var key=e.replace(" ","").substring(10,e.length-2);

				if(key.indexOf('es')!=-1){
					trace('ok');
				}
				if(key.length<16){
					continue;
				}



				var v=UUIDHelper.decompressUuid(key);
				keyMaps[key]=v;

				var importFolder=v.substring(0,2);

				var assetsKey=disMap[fs];
	
				var  assetsV=setting.md5AssetsMap.rawassetKeys[assetsKey];

				var folder='bin/res/raw-assets/' + importFolder + "/";

				var files=FileSystem.readDirectory(folder);
				//var filesName = 'bin/res/raw-assets/' + importFolder + "/" + v +"." +assetsV + ".png";


				
				

				for(fss in files){
					var ext=Path.withoutDirectory(fss);
					var disFile=Path.directory(fs)+"/" + ext;
					var fromFile=folder+  fss;
					if(FileSystem.exists(fromFile)){
						
						if(!FileSystem.exists(disFile)){
							File.copy(fromFile,disFile);
						}
						
					}else{
						trace('error $fromFile');
					}
					
				}

			}


		}

		File.saveContent("bin/assets/uuid.json",Json.stringify(keyMaps));
		trace('保存完毕'+(Date.now().getTime()-time));
	}

	
	static function getMatches(ereg:EReg, input:String, index:Int = 0):Array<String> {
		var matches = [];
		while (ereg.match(input)) {
		  matches.push(ereg.matched(index)); 
		  input = ereg.matchedRight();
		}
		return matches;
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
