/**
 * querystring.parse(str, [sep], [eq], [options])
 */

var querystring = require('querystring');
var params = 'name=duyu&color=blue&age=26';
var obj = querystring.parse(params);
console.log(JSON.stringify(obj));
var str = querystring.stringify(obj);
console.log(str);
