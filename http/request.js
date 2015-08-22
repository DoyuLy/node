/**
 * ClientRequest
 *       http.request(options, cb)
 * ServerResponse
 *       response
 * IncomingMessage
 *       response
 * Server
 */


var http = require('http');
var options = {
    hostname: 'www.baidu.com'
    //path:'/',
    //port:'8080',
    //method:'get'
}
var req = http.request(options, function (res) {
    var str = '';
    res.on('data', function (chunk) {
        str += chunk;
    });
    res.on('end', function () {
        console.log(str);
    })
});
req.end();