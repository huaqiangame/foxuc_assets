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

		var setting:SettingObj=Json.parse(content);
		
	

		


		//step1: find packageassetas


		var packedassets=setting.packedAssets;


		//trace(packedassets);

		for(key=>value in packedassets){
			trace(key);
			//find key in assets import /import raw folder


			var folderName="";
			if(!FileSystem.exists(folderName)){

				FileSystem.createDirectory(folderName);
				
			}
	
		}


	}
}
