/* eslint-disable */


/**
 * 帮助类 dan.qi
 * @param  {Object} $ [添加相应属性的对象]
 * @return {[type]} [description]
 */

var BSHelp = {}; //帮助类
/////////////////////////////
///基础功能
/**
 * [log 打印数据 发现缺点就是打印不能定位准确的行和列(传参数的数据)]
 * @return {[type]}      [description]
 */
BSHelp.debug = false; //debug打印开关
BSHelp.log = function() {
    // console.log(JSON.stringify(arguments));
    if (BSHelp.debug) {
        var strArr = [];
        for (var k in arguments) {
            var str = JSON.stringify(arguments[k]);
            if (str == '{}') {
                str = arguments[k].toString();
            }
            strArr.push(str);
        }
        console.log(strArr.join(''));
    }
};

/**
 * [setStorage 设置键值对]
 * @param {String} key   [键值]
 * @param {String/Object} value [值]
 */
BSHelp.setStorage = function(key, value) {
    var storage = window.localStorage;
    if (arguments.length === 2) {
        var v = value;
        if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
        } else {
            v = 'str-' + v;
        }

        if (storage) {
            storage.setItem(key, v);
        }
    }
};

/**
 * [getStorage 获取值]
 * @param  {String} key [值对应的键值]
 * @return {Object/String}     [description]
 */
BSHelp.getStorage = function(key) {
    var storage = window.localStorage;
    if (storage) {
        var v = storage.getItem(key);

        if (!v) {
            return;
        }
        if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
        }
    }
};

/**
 * [isUndefined 是否是未定义的]
 * @param  {Anyone}  obj [要判断的参数]
 * @return {Boolean}     [true: 是undefined]
 */
BSHelp.isUndefined = function(obj) {
    return typeof obj == 'undefined';
};

/**
 * [isNull 是否是null]
 * @param  {Anyone}  obj [要判断的参数]
 * @return {Boolean}     [true: 是null]
 */
BSHelp.isNull = function(obj) {
    return obj === null;
};

/**
 * [isUndefinedOrNull 是否是未定义的或者为空]
 * @param  {Anyone}  obj [要判断的参数]
 * @return {Boolean}     [true: 是undefineded or null]
 */
BSHelp.isUndefinedOrNull = function(obj) {
    // return (BSHelp.isUndefined(obj) || BSHelp.isNull(obj));
    return obj == null;
};

/**
 * [isString 是否是字符串]
 * @param  {anyone}  str [要判断的参数]
 * @return {Boolean}     [true:是String]
 */

BSHelp.isString = function(str) {
    return typeof str == 'string';
};

/**
 * [isRightString 是否是正确的字符串]
 * @param  {anyone}  str [要判断的参数]
 * @return {Boolean}     [true:是字符串]
 */

BSHelp.isRightString = function(str) {
    return BSHelp.isString(str) && str.length > 0;
};

/**
 * [isRightNumber 是否是正确的数字]
 * @param  {anyone}  num [要判断的参数]
 * @return {Boolean}     [true:是正确Number]
 */
BSHelp.isRightNumber = function(num) {
    return !BSHelp.isUndefinedOrNull(num) && !isNaN(num);
};

/**
 * [isObject 是不是对象]
 * @param  {anyone}  obj [参数]
 * @return {Boolean}     [true:是对象]
 */
BSHelp.isObject = function(obj) {
    return typeof obj == 'object';
};

/**
 * [isArray 是否是数组]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是Array]
 */
BSHelp.isArray = function(arr) {
    return BSHelp.isObject(arr) && arr instanceof Array;
};

/**
 * [isRightArray 是否是正确的数组]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是正确的Array]
 */
BSHelp.isRightArray = function(arr) {
    return BSHelp.isArray(arr) && arr.length > 0;
};

/**
 * [isEmptyObject 是否是空对象]
 * @param  {anyone}  arr [要判断的参数]
 * @return {Boolean}     [true:是空对象]
 */
BSHelp.isEmptyObject = function(obj) {
    if (BSHelp.isObject(obj)) {
        //是对象?
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                //排除原型链上的属性
                return false; //不是空对象
            }
        }
        return true; //说明是空对象啦
    }

    return false;
};

/**
 * [isEmpty 是否是空(包含undefined, null, 空对象)]
 * @param  {anyone}  obj [要判断的参数]
 * @return {Boolean}     [true:是空]
 */
BSHelp.isEmpty = function(obj) {
    return BSHelp.isUndefinedOrNull(obj) || BSHelp.isEmptyObject(obj);
};

/**
 * [trim 去除左右空字符]
 * @param  {String} str [替换字符]
 * @return {String|Anyone}     [去除空格后的字符串或者原值]
 */
BSHelp.trim = function(str) {
    if (BSHelp.isRightString(str)) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

    return str;
};

/**
 * [lTrim 去除左空字符]
 * @param  {String} str [替换字符]
 * @return {String|Anyone}     [去除左空格后的字符串或者原值]
 */
BSHelp.lTrim = function(str) {
    if (BSHelp.isRightString(str)) {
        return str.replace(/(^\s*)/g, '');
    }

    return str;
};

/**
 * [rTrim 去除右空字符]
 * @param  {String} str [替换字符]
 * @return {String|Anyone}     [去除右空格后的字符串或者原值]
 */
BSHelp.rTrim = function(str) {
    if (BSHelp.isRightString(str)) {
        return str.replace(/(\s*$)/g, '');
    }

    return str;
};

/**
 * [getDateFormat 获取格式化时间]
 * @param  {String/Number/Date} time      [时间]
 * @param  {String} formatStr [约定的时间格式 具体看代码]
 * @return {String}           [格式化后的时间]
 */
BSHelp.getDateFormat = function(time, formatStr) {
    //http://www.w3school.com.cn/jsref/jsref_obj_date.asp  Date对象方法
    var date = new Date();
    if (time) {
        date = new Date(time);
    }
    var D = date.getDate(); //1~31
    var M = date.getMonth() + 1; //0~11
    var Y = date.getFullYear(); //四位数年份
    var h = date.getHours(); //获取小时 0~23
    var m = date.getMinutes(); //获取分钟数0~59
    var s = date.getSeconds(); //获取秒数0~59

    if (formatStr && formatStr == 'datetimes1') {
        return Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m + ':' + s;
    }

    if (formatStr && formatStr == 'datetimes2') {
        if (h > 11) {
            h = '下午' + h;
        } else {
            h = '上午' + h;
        }

        return Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m;
    }

    if (formatStr && formatStr == 'date') {
        return Y + '年' + M + '月' + D + '日';
    }

    return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s;
};

/////////////////////////////
///特殊功能
//获取设备号
BSHelp.getDeviceId = function getDeviceId() {
    return BSHelp.getStorage('bskey_device_id');
};

//设置设备号
BSHelp.setDeviceId = function setDeviceId(deviceId) {
    BSHelp.setStorage('bskey_device_id', deviceId);
};

//////////////////////////////
///base64 编码 src= http://git.oschina.net/loonhxl/jbase64/blob/master/jbase64.js
var BASE64_MAPPING = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/' ];
/**
 *ascii convert to binary
 */
var _toBinary = function(ascii) {
    var binary = new Array();
    while (ascii > 0) {
        var b = ascii % 2;
        ascii = Math.floor(ascii / 2);
        binary.push(b);
    }
    /*
          var len = binary.length;
          if(6-len > 0){
              for(var i = 6-len ; i > 0 ; --i){
                  binary.push(0);
              }
          }*/
    binary.reverse();
    return binary;
};
/**
 *binary convert to decimal
 */
var _toDecimal = function(binary) {
    var dec = 0;
    var p = 0;
    for (var i = binary.length - 1; i >= 0; --i) {
        var b = binary[i];
        if (b == 1) {
            dec += Math.pow(2, p);
        }
        ++p;
    }
    return dec;
};
/**
 *unicode convert to utf-8
 */
var _toUTF8Binary = function(c, binaryArray) {
    var mustLen = 8 - (c + 1) + (c - 1) * 6;
    var fatLen = binaryArray.length;
    var diff = mustLen - fatLen;
    while (--diff >= 0) {
        binaryArray.unshift(0);
    }
    var binary = [];
    var _c = c;
    while (--_c >= 0) {
        binary.push(1);
    }
    binary.push(0);
    var i = 0,
        len = 8 - (c + 1);
    for (; i < len; ++i) {
        binary.push(binaryArray[i]);
    }

    for (var j = 0; j < c - 1; ++j) {
        binary.push(1);
        binary.push(0);
        var sum = 6;
        while (--sum >= 0) {
            binary.push(binaryArray[i++]);
        }
    }
    return binary;
};

BSHelp.base64 = {
    /**
     *BASE64 Encode
     */
    encoder: function(str) {
        var base64_Index = [];
        var binaryArray = [];
        for (var i = 0, len = str.length; i < len; ++i) {
            var unicode = str.charCodeAt(i);
            var _tmpBinary = _toBinary(unicode);
            if (unicode < 0x80) {
                var _tmpdiff = 8 - _tmpBinary.length;
                while (--_tmpdiff >= 0) {
                    _tmpBinary.unshift(0);
                }
                binaryArray = binaryArray.concat(_tmpBinary);
            } else if (unicode >= 0x80 && unicode <= 0x7ff) {
                binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
            } else if (unicode >= 0x800 && unicode <= 0xffff) {
                //UTF-8 3byte
                binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
            } else if (unicode >= 0x10000 && unicode <= 0x1fffff) {
                //UTF-8 4byte
                binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
            } else if (unicode >= 0x200000 && unicode <= 0x3ffffff) {
                //UTF-8 5byte
                binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
            } else if (unicode >= 4000000 && unicode <= 0x7fffffff) {
                //UTF-8 6byte
                binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
            }
        }

        var extra_Zero_Count = 0;
        for (var i = 0, len = binaryArray.length; i < len; i += 6) {
            var diff = i + 6 - len;
            if (diff == 2) {
                extra_Zero_Count = 2;
            } else if (diff == 4) {
                extra_Zero_Count = 4;
            }
            //if(extra_Zero_Count > 0){
            //  len += extra_Zero_Count+1;
            //}
            var _tmpExtra_Zero_Count = extra_Zero_Count;
            while (--_tmpExtra_Zero_Count >= 0) {
                binaryArray.push(0);
            }
            base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
        }

        var base64 = '';
        for (var i = 0, len = base64_Index.length; i < len; ++i) {
            base64 += BASE64_MAPPING[base64_Index[i]];
        }

        for (var i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
            base64 += '=';
        }
        return base64;
    },
    /**
     *BASE64  Decode for UTF-8
     */
    decoder: function(_base64Str) {
        var _len = _base64Str.length;
        var extra_Zero_Count = 0;
        /**
         *计算在进行BASE64编码的时候，补了几个0
         */
        if (_base64Str.charAt(_len - 1) == '=') {
            //alert(_base64Str.charAt(_len-1));
            //alert(_base64Str.charAt(_len-2));
            if (_base64Str.charAt(_len - 2) == '=') {
                //两个等号说明补了4个0
                extra_Zero_Count = 4;
                _base64Str = _base64Str.substring(0, _len - 2);
            } else {
                //一个等号说明补了2个0
                extra_Zero_Count = 2;
                _base64Str = _base64Str.substring(0, _len - 1);
            }
        }

        var binaryArray = [];
        for (var i = 0, len = _base64Str.length; i < len; ++i) {
            var c = _base64Str.charAt(i);
            for (var j = 0, size = BASE64_MAPPING.length; j < size; ++j) {
                if (c == BASE64_MAPPING[j]) {
                    var _tmp = _toBinary(j);
                    /*不足6位的补0*/
                    var _tmpLen = _tmp.length;
                    if (6 - _tmpLen > 0) {
                        for (var k = 6 - _tmpLen; k > 0; --k) {
                            _tmp.unshift(0);
                        }
                    }
                    binaryArray = binaryArray.concat(_tmp);
                    break;
                }
            }
        }

        if (extra_Zero_Count > 0) {
            binaryArray = binaryArray.slice(
                0,
                binaryArray.length - extra_Zero_Count
            );
        }

        var unicode = [];
        var unicodeBinary = [];
        for (var i = 0, len = binaryArray.length; i < len; ) {
            if (binaryArray[i] == 0) {
                unicode = unicode.concat(
                    _toDecimal(binaryArray.slice(i, i + 8))
                );
                i += 8;
            } else {
                var sum = 0;
                while (i < len) {
                    if (binaryArray[i] == 1) {
                        ++sum;
                    } else {
                        break;
                    }
                    ++i;
                }
                unicodeBinary = unicodeBinary.concat(
                    binaryArray.slice(i + 1, i + 8 - sum)
                );
                i += 8 - sum;
                while (sum > 1) {
                    unicodeBinary = unicodeBinary.concat(
                        binaryArray.slice(i + 2, i + 8)
                    );
                    i += 8;
                    --sum;
                }
                unicode = unicode.concat(_toDecimal(unicodeBinary));
                unicodeBinary = [];
            }
        }
        return unicode;
    },
    /**
     *BASE64  Decode to String for UTF-8
     */
    decoderStr: function(_base64Str) {
        var codeArr = BSHelp.base64.decoder(_base64Str);
        for (var i = 0, arrLen = codeArr.length; i < arrLen; ++i) {
            codeArr[i] = String.fromCharCode(codeArr[i]);
        }

        return codeArr.join('');
    }
};

///////////////////////////
///md5 编码 src= https://github.com/blueimp/JavaScript-MD5
(function($) {
    'use strict';

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safeAdd(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bitRotateLeft(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5cmn(q, a, b, x, s, t) {
        return safeAdd(
            bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s),
            b
        );
    }
    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binlMD5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << len % 32;
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input) {
        var i;
        var output = '';
        var length32 = input.length * 32;
        for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
        }
        return output;
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl(input) {
        var i;
        var output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        var length8 = input.length * 8;
        for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
        }
        return output;
    }

    /*
     * Calculate the MD5 of a raw string
     */
    function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    function rstrHMACMD5(key, data) {
        var i;
        var bkey = rstr2binl(key);
        var ipad = [];
        var opad = [];
        var hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binlMD5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5c5c5c5c;
        }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex(input) {
        var hexTab = '0123456789abcdef';
        var output = '';
        var x;
        var i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
        }
        return output;
    }

    /*
     * Encode a string as utf-8
     */
    function str2rstrUTF8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
     * Take string arguments and return either raw or hex encoded strings
     */
    function rawMD5(s) {
        return rstrMD5(str2rstrUTF8(s));
    }
    function hexMD5(s) {
        return rstr2hex(rawMD5(s));
    }
    function rawHMACMD5(k, d) {
        return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
    }
    function hexHMACMD5(k, d) {
        return rstr2hex(rawHMACMD5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hexMD5(string);
            }
            return rawMD5(string);
        }
        if (!raw) {
            return hexHMACMD5(key, string);
        }
        return rawHMACMD5(key, string);
    }

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return md5;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = md5;
    } else {
        $.md5 = md5;
    }
})(BSHelp);

// $.BSHelp = BSHelp;

export default BSHelp;
