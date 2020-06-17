import haxe.display.Protocol.HaxeRequestMethod;
using StringTools;
class StringHelper {
    

    public static function slice(str:String,start:Int,?end:Null<Int>) :String{




        if(end==null){
            end=str.length;
        }

        return str.substring(start,end);
        
    }


    public static function toString(num:Int,len:Int):String {

        
        return  num.hex(1);
    }
}