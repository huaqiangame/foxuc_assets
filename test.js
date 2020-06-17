var Base64KeyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var AsciiTo64 = new Array(128);
for (var i = 0; i < 128; ++i) { AsciiTo64[i] = 0; }
for (i = 0; i < 64; ++i) { AsciiTo64[Base64KeyChars.charCodeAt(i)] = i; }

var decompressUuid=function (str) {


        if (str.length === 23) {
            // decode base64
            var hexChars = [];
            for (var i = 5; i < 23; i += 2) {
                var lhs = AsciiTo64[str.charCodeAt(i)];
                var rhs = AsciiTo64[str.charCodeAt(i + 1)];
                hexChars.push((lhs >> 2).toString(16));
                hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
                hexChars.push((rhs & 0xF).toString(16));
            }
            //
            str = str.slice(0, 5) + hexChars.join('');
        }
        else if (str.length === 22) {
            // decode base64
            var hexChars = [];
            for (var i = 2; i < 22; i += 2) {
                var q1=str.charCodeAt(i);
                var q2=str.charCodeAt(i + 1);
                var lhs = AsciiTo64[q1];
                var rhs = AsciiTo64[q2];
                var lhhs=lhs >> 2;
                var x16=(lhhs).toString(16);
                hexChars.push(x16);
                hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
                hexChars.push((rhs & 0xF).toString(16));
            }
            //
            str = str.slice(0, 2) + hexChars.join('');
        }
        return [str.slice(0, 8), str.slice(8, 12), str.slice(12, 16), str.slice(16, 20), str.slice(20)].join('-');
    }

console.log(decompressUuid("b4qe1ob3VMZouqMFrK5nd8"))