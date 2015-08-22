/**
 * ClientRequest
 *       http.request(options, cb(IncomingMessage))
 * ServerResponse
 *       res
 * IncomingMessage
 *       res
 * Server
 */


var http = require('http');
var bufferHelper = require('../BufferHelper');
var bufferhelper = new bufferHelper();

var options = {
    hostname: 'www.baidu.com'
    //path:'/',
    //port:'8080',
    //method:'get'
}
var req = http.request(options, function (res) {
    //var str = '';
    //res.on('data', function (chunk) {
    //    str += chunk;
    //});
    //res.on('end', function () {
    //    console.log(str);
    //})
    bufferhelper.load(res, function (err, buffer) {
        var html = buffer.toString();
        console.log(html);
        console.log(process);
    });
});
req.end();