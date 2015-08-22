/**
 * url组件  npm install url
 * url: http://user:pass@host.com:80/resource/path/?query=xxx#hash
 *      协议     身份验证  主机  端口         路径     查询   散列hash
 * url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
 *                   true:解析为JSON      true: 解析为{host: 'host', pathname: '/path'} 而非 {pathname:'//host/path'}
 *
 * 返回: href/protocol/host/auth/hostname/port/pathname/search/path/query/hash
 * url.format(urlObj);    //转换为url字符串
 * url.resolve(form, to); //一般用于重定向或者url重写(只能改变端口号之后的资源路径,查询,hash)
 */

var url = require('url');
var urlStr = 'http://user:pass@host.com:8080/resource/path?query=xxx#hash';
var urlObj = url.parse(urlStr,true,true);
console.log(JSON.stringify(urlObj));
var urlString  =url.format(urlObj);
console.log(urlString);
