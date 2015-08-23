/**
 * http.STATUS_CODES     :全部标准HTTP响应状态码的集合和简短描述。例如http.STATUS_CODES[404] === 'Not Found'
 * http.createServer([requestListener])
 * http.createClient([port],
 *
 *   附注: request 和 response 分为 client 和 server
 *   直接通过http对象使用的有：
 *   http.STATUS_CODES                  :http: {STATUS_CODE: {'100': 'Continue', ... ,'511': 'Network Authentication Required'}}
 *
 *
 *   http.createServer                  :返回 http.server 实例
 *                                       方式1: http.createServer(function(http.IcomingMessage req, http.serverResponse res)
 *                                       方式2: var server = new http.Server(); //这是一个包含事件的EventEmitter
 *                                              server.on('request',function(http.IncomingMessag req, http.ServerResponse res){
 *                                                res.writeHeader(200,{'Content-Type':'text/'});
 *                                                res.end('hello world');
 *                                              }
 *                                              //http.server事件有 request
 *                                                                  connection
 *                                                                  close
 *                                                                  checkContinue
 *                                                                  connect
 *                                                                  upgrade
 *                                                                  clientError
 *                                              //http.server方法有 listen('path', cb || port, [hostname], [backlog], [callback] || handle, [callback])
 *                                                                  setTimeout()/...
 *                                              //http.server属性有 maxHeadersCount
 *                                                                  timeout...
 *
 *
 *   http.server                         :是一个继承EventEmitter的对象,事件如上所述
 *
 *
 *   http.ServerResponse                 :是实现了Writable 并继承了EventEmitter的对象,由系统自动创建并传递到'request'事件的第二个参数
 *                                        事件: close
 *                                        方法: writeContinue() 对应'checkContinue'事件
 *                                              writeHead(statusCode, [reasonPhrase], [headers])
 *                                              setTimeout(msecs, callback)
 *                                              setHeader(name, value)
 *                                              getHeader(name)
 *                                              removeHeader(name)
 *                                              write(chunk, [encoding]) //chunk可以是buffer or string, 若是string则可按指定encoding
 *                                              addTrailers(headers)     //很少使用
 *                                              end([data], [encoding])  //每次响应完成必须调用end()
 *                                         属性:headersSent/sendDate(一般不会禁用)/statusCode int型状态码
 *
 *
 *   http.createClient               :已被 http.request 替换
 *
 *   http.request(options, cb(http.IncomingMessag res){})     : 替代了http.createClient([port], [host])
 *                                                              返回http.ClientRequest实例 (http客户端工具,模拟请求/转发/爬虫)
 *                                                              //ClientRequest事件有 response
 *                                                                                    connect
 *                                                                                    socket
 *                                                                                    upgrade
 *                                                                                    continue
 *                                                                                    error
 *                                                              //ClientRequest方法有 write(chunk, [encoding])
 *                                                                                    abort
 *                                                                                    setTimeout
 *                                                                                    setNoDelay
 *                                                                                    setSocketKeepAlive([enable], [initialDelay])
 *                                                                                    end(请求完毕需要手动声明调用req.end([data], [encoding]))
 *                                                              //IncomingMessag事件有 data/end
 *
 *
 *   http.get(url, cb(http.IncomingMessag res))               :http.request()简化版,不需要指定method,同时自动调用req.end()
 *
 *
 *   http.ClientRequest         :参见http.request
 *
 *   http.IncomingMessage       :http.Server或http.ClientRequest创建, 并作为第一参数分别传递给'request'和'response' 事件
 *
 *   http.globalAgent
 *
 *
 *   http.IcomingMessage
 *
 */


var http = require('http');
/************************************************** http.createServer ***************************************************************/
/**
 * 创建服务器的两种写法，第一种写法如下
 * 由于server已经继承了EventEmitter的事件功能，所以可以使用高级函数编写方式监控事件
 * @param {Function} request event
 */
var server = http.createServer(function(req,res)
{
    //这里的req为http.serverRequest
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('hello world');
});


/**
 * 说明：创建服务器的第二种写法
 * 有关server对象的事件监听
 * @param {Object} req 是http.IncomingMessag的一个实例，在keep-alive连接中支持多个请求
 * @param {Object} res 是http.ServerResponse的一个实例
 */
var server = new http.Server();
server.on('request',function(req,res){
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('hello world');
});

/**
 * 说明：新的TCP流建立时出发。 socket是一个net.Socket对象。 通常用户无需处理该事件。
 * 特别注意，协议解析器绑定套接字时采用的方式使套接字不会出发readable事件。 还可以通过request.connection访问socket。
 * @param {Object} socket
 */
server.on('connection',function(socket){});

/**
 * 源API: Event: 'close'
 * 说明：关闭服务器时触发
 */
server.on('close',function(){});

/**
 * 说明：每当收到Expect: 100-continue的http请求时触发。 如果未监听该事件，服务器会酌情自动发送100 Continue响应。
 * 处理该事件时，如果客户端可以继续发送请求主体则调用response.writeContinue， 如果不能则生成合适的HTTP响应（例如，400 请求无效）
 * 需要注意到, 当这个事件触发并且被处理后, request 事件将不再会触发.
 * @param {Object} req
 * @param {Object} req
 */
server.on('checkContinue',function(req,res){});

/**
 * 说明：如果客户端发起connect请求，如果服务器端没有监听，那么于客户端请求的该连接将会被关闭
 * @param {Object} req 是该HTTP请求的参数，与request事件中的相同。
 * @param {Object} socket 是服务端与客户端之间的网络套接字。需要自己写一个data事件监听数据流
 * @param {Object} head 是一个Buffer实例，隧道流的第一个包，该参数可能为空。
 */
server.on('connect',function(req,socket,head){});

/**
 * 说明：这个事件主要是对HTTP协议升级为其他协议后的事件监听，如果服务器端没有监听，那么于客户端请求的该连接将会被关闭
 * @param {Object} req 是该HTTP请求的参数，与request事件中的相同。
 * @param {Object} socket 是服务端与客户端之间的网络套接字。需要自己写一个data事件监听数据流
 * @param {Object} head 是一个Buffer实例，升级后流的第一个包，该参数可能为空。
 */
server.on('upgrade',function(req,socket,head){});

/**
 * 说明：如果一个客户端连接触发了一个 'error' 事件, 它就会转发到这里
 * @param {Object} exception
 * @param {Object} socket
 */
server.on('clientError',function(exception,socket){});

/**
 * 源API：server.listen(port, [hostname], [backlog], [callback])
 * 说明：监听一个 unix socket, 需要提供一个文件名而不是端口号和主机名。
 * @param {Number} port 端口
 * @param {String} host 主机
 * @param {Number} backlog 等待队列的最大长度，决定于操作系统平台，默认是511
 * @param {Function} callback 异步回调函数
 */
//server.listen(3000,'localhost',100,function(){});

/**
 * 源API：server.listen(path, [callback])
 * 说明：启动一个 UNIX 套接字服务器在所给路径 path 上监听连接。
 * 可能用处：多路径或渠道数据来源监听分隔
 * @param {String} path
 * @param {Function} callback
 */
//server.listen('path',function(){})

/**
 * 源API：server.listen(handle, [callback])
 * 说明：Windows 不支持监听一个文件描述符。
 * @param {Object} handle 变量可以被设置为server 或者 socket
 * @param {Function} callback
 */
//server.listen({},function(){});

/**
 * 说明：最大请求头数目限制, 默认 1000 个. 如果设置为0, 则代表不做任何限制.
 * @type {number}
 */
server.maxHeadersCount = 1000;

/**
 * 源API：server.setTimeout(msecs, callback)
 * 说明：为套接字设定超时值。如果一个超时发生，那么Server对象上会分发一个'timeout'事件，同时将套接字作为参数传递。
 * 设置为0将阻止之后建立的连接的一切自动超时行为
 * @param {Number} msecs
 * @param
 */
server.setTimeout(1000,function(){});

/**
 * 说明：一个套接字被判断为超时之前的闲置毫秒数。 默认 120000 (2 分钟)
 * @type {number}
 */
server.timeout = 120000;

/**
 * 说明：这里的主机将是本地
 * @param {Number} port 端口
 * @param {Function} callback 异步回调函数
 */
server.listen(3000,function(){
    console.log('Listen port 3000');
});

/************************************************** http.request ***************************************************************/
/**
 * 参数配置
 * @type {{hostname: string, port: number, method: string, path: string,handers: {}}}
 * host:请求的服务器域名或者IP地址
 * port:端口
 * method:请求方式有POST,GET,INPUT,DELETE,CONNECT，默认为GET
 * path：请求地址，可包含查询字符串以及可能存在的锚点。例如'/index.html?page=12'
 * handers: 一个包含请求头的对象。
 */
var options =
{
    hostname : 'www.google.com',
    port : 80,
    method : 'POST',
    path : '/upload',
    handers:{}
};

/**
 * 如下特别的消息头应当注意：
 * 发送'Connection: keep-alive'头部将通知Node此连接将保持到下一次请求。
 * 发送'Content-length'头将使默认的分块编码无效。
 * 发送'Expect'头部将引起请求头部立即被发送。
 * 通常情况，当发送'Expect: 100-continue'时，你需要监听continue事件的同时设置超时。参见RFC2616 8.2.3章节以获得更多的信息。
 */

/**
 * 说明：官方给出的例子
 * 应用场景：模拟客服端请求服务器，是一个HTTP 客户端工具，用于向 HTTP 服务器发起请求。
 * @param {Object} options
 * @param {Function} callback
 */
var req = http.request(options,function(res){
    console.log(res);
    console.log('STATUS:' + res.statusCode);
    console.log('HEADERS:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        console.log('BODY' + chunk);
    });
});

req.on('response',function(){

});

req.on('connect',function(){

});

req.on('socket',function(){

});

req.on('upgrade',function(){

});

req.on('continue',function(){

})

//如果在请求过程中出现了错误（可能是DNS解析、TCP的错误、或者HTTP解析错误），返回的请求对象上的'error'的事件将被触发。
req.on('error',function(e){
    console.log(e.message);
});

/**
 * 源API：request.write(chunk, [encoding])
 * 说明：发送正文中的一块。用户可以通过多次调用这个方法将请求正文以流的方式发送到服务器。此种情况建议在建立请求时使用['Transfer-Encoding', 'chunked']请求头。
 * @param {Object or String} chunk 参数chunk应当是一个整数数组或字符串。
 * @param {String} encoding 参数encoding是可选的，仅在chunk为字符串时可用。
 */
req.write('data\n');

/**
 * 源API：request.end(chunk, [encoding])
 * 说明：完成本次请求的发送。如果正文中的任何一个部分没有来得及发送，将把他们全部刷新到流中。如果本次请求是分块的，这个函数将发出结束字符'0\r\n\r\n'。如果使用参数data，就等于在调用request.write(data, encoding)之后紧接着调用request.end()。
 * @param {Object or String} chunk 参数chunk应当是一个整数数组或字符串。
 * @param {String} encoding 参数encoding是可选的，仅在chunk为字符串时可用。
 * example: req.end(),req.end('data\n'),req.end('data','utf8'),req.end(chunk)
 */
req.end();

/**
 * 阻止一个请求。（v0.3.8中新增的方法。）
 */
req.abort();

/**
 * 源API：request.setTimeout(timeout, [callback])
 * 说明：一旦给这个请求分配的是一个socket时此函数会被调用
 * @param {Number} timeout 毫秒
 * @param {Function} callback 回到函数
 */
req.setTimeout(1000,function(){});

/**
 * 源API :request.setNoDelay([noDelay])
 * 说明：默认有一定的延迟，设置为0表示无延迟
 * @param {Number} noDelay
 */
req.setNoDelay(0)
/**
 * 源API：request.setSocketKeepAlive([enable], [initialDelay])
 *     类似同上
 */