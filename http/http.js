/**
 * http.STATUS_CODES     :ȫ����׼HTTP��Ӧ״̬��ļ��Ϻͼ������������http.STATUS_CODES[404] === 'Not Found'
 * http.createServer([requestListener])
 * http.createClient([port],
 *
 *   ��ע: request �� response ��Ϊ client �� server
 *   ֱ��ͨ��http����ʹ�õ��У�
 *   http.STATUS_CODES                  :http: {STATUS_CODE: {'100': 'Continue', ... ,'511': 'Network Authentication Required'}}
 *
 *
 *   http.createServer                  :���� http.server ʵ��
 *                                       ��ʽ1: http.createServer(function(http.IcomingMessage req, http.serverResponse res)
 *                                       ��ʽ2: var server = new http.Server(); //����һ�������¼���EventEmitter
 *                                              server.on('request',function(http.IncomingMessag req, http.ServerResponse res){
 *                                                res.writeHeader(200,{'Content-Type':'text/'});
 *                                                res.end('hello world');
 *                                              }
 *                                              //http.server�¼��� request
 *                                                                  connection
 *                                                                  close
 *                                                                  checkContinue
 *                                                                  connect
 *                                                                  upgrade
 *                                                                  clientError
 *                                              //http.server������ listen('path', cb || port, [hostname], [backlog], [callback] || handle, [callback])
 *                                                                  setTimeout()/...
 *                                              //http.server������ maxHeadersCount
 *                                                                  timeout...
 *
 *
 *   http.server                         :��һ���̳�EventEmitter�Ķ���,�¼���������
 *
 *
 *   http.ServerResponse                 :��ʵ����Writable ���̳���EventEmitter�Ķ���,��ϵͳ�Զ����������ݵ�'request'�¼��ĵڶ�������
 *                                        �¼�: close
 *                                        ����: writeContinue() ��Ӧ'checkContinue'�¼�
 *                                              writeHead(statusCode, [reasonPhrase], [headers])
 *                                              setTimeout(msecs, callback)
 *                                              setHeader(name, value)
 *                                              getHeader(name)
 *                                              removeHeader(name)
 *                                              write(chunk, [encoding]) //chunk������buffer or string, ����string��ɰ�ָ��encoding
 *                                              addTrailers(headers)     //����ʹ��
 *                                              end([data], [encoding])  //ÿ����Ӧ��ɱ������end()
 *                                         ����:headersSent/sendDate(һ�㲻�����)/statusCode int��״̬��
 *
 *
 *   http.createClient               :�ѱ� http.request �滻
 *
 *   http.request(options, cb(http.IncomingMessag res){})     : �����http.createClient([port], [host])
 *                                                              ����http.ClientRequestʵ�� (http�ͻ��˹���,ģ������/ת��/����)
 *                                                              //ClientRequest�¼��� response
 *                                                                                    connect
 *                                                                                    socket
 *                                                                                    upgrade
 *                                                                                    continue
 *                                                                                    error
 *                                                              //ClientRequest������ write(chunk, [encoding])
 *                                                                                    abort
 *                                                                                    setTimeout
 *                                                                                    setNoDelay
 *                                                                                    setSocketKeepAlive([enable], [initialDelay])
 *                                                                                    end(���������Ҫ�ֶ���������req.end([data], [encoding]))
 *                                                              //IncomingMessag�¼��� data/end
 *
 *
 *   http.get(url, cb(http.IncomingMessag res))               :http.request()�򻯰�,����Ҫָ��method,ͬʱ�Զ�����req.end()
 *
 *
 *   http.ClientRequest         :�μ�http.request
 *
 *   http.IncomingMessage       :http.Server��http.ClientRequest����, ����Ϊ��һ�����ֱ𴫵ݸ�'request'��'response' �¼�
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
 * ����������������д������һ��д������
 * ����server�Ѿ��̳���EventEmitter���¼����ܣ����Կ���ʹ�ø߼�������д��ʽ����¼�
 * @param {Function} request event
 */
var server = http.createServer(function(req,res)
{
    //�����reqΪhttp.serverRequest
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('hello world');
});


/**
 * ˵���������������ĵڶ���д��
 * �й�server������¼�����
 * @param {Object} req ��http.IncomingMessag��һ��ʵ������keep-alive������֧�ֶ������
 * @param {Object} res ��http.ServerResponse��һ��ʵ��
 */
var server = new http.Server();
server.on('request',function(req,res){
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('hello world');
});

/**
 * ˵�����µ�TCP������ʱ������ socket��һ��net.Socket���� ͨ���û����账����¼���
 * �ر�ע�⣬Э����������׽���ʱ���õķ�ʽʹ�׽��ֲ������readable�¼��� ������ͨ��request.connection����socket��
 * @param {Object} socket
 */
server.on('connection',function(socket){});

/**
 * ԴAPI: Event: 'close'
 * ˵�����رշ�����ʱ����
 */
server.on('close',function(){});

/**
 * ˵����ÿ���յ�Expect: 100-continue��http����ʱ������ ���δ�������¼����������������Զ�����100 Continue��Ӧ��
 * ������¼�ʱ������ͻ��˿��Լ��������������������response.writeContinue�� ������������ɺ��ʵ�HTTP��Ӧ�����磬400 ������Ч��
 * ��Ҫע�⵽, ������¼��������ұ������, request �¼������ٻᴥ��.
 * @param {Object} req
 * @param {Object} req
 */
server.on('checkContinue',function(req,res){});

/**
 * ˵��������ͻ��˷���connect���������������û�м�������ô�ڿͻ�������ĸ����ӽ��ᱻ�ر�
 * @param {Object} req �Ǹ�HTTP����Ĳ�������request�¼��е���ͬ��
 * @param {Object} socket �Ƿ������ͻ���֮��������׽��֡���Ҫ�Լ�дһ��data�¼�����������
 * @param {Object} head ��һ��Bufferʵ����������ĵ�һ�������ò�������Ϊ�ա�
 */
server.on('connect',function(req,socket,head){});

/**
 * ˵��������¼���Ҫ�Ƕ�HTTPЭ������Ϊ����Э�����¼������������������û�м�������ô�ڿͻ�������ĸ����ӽ��ᱻ�ر�
 * @param {Object} req �Ǹ�HTTP����Ĳ�������request�¼��е���ͬ��
 * @param {Object} socket �Ƿ������ͻ���֮��������׽��֡���Ҫ�Լ�дһ��data�¼�����������
 * @param {Object} head ��һ��Bufferʵ�������������ĵ�һ�������ò�������Ϊ�ա�
 */
server.on('upgrade',function(req,socket,head){});

/**
 * ˵�������һ���ͻ������Ӵ�����һ�� 'error' �¼�, ���ͻ�ת��������
 * @param {Object} exception
 * @param {Object} socket
 */
server.on('clientError',function(exception,socket){});

/**
 * ԴAPI��server.listen(port, [hostname], [backlog], [callback])
 * ˵��������һ�� unix socket, ��Ҫ�ṩһ���ļ��������Ƕ˿ںź���������
 * @param {Number} port �˿�
 * @param {String} host ����
 * @param {Number} backlog �ȴ����е���󳤶ȣ������ڲ���ϵͳƽ̨��Ĭ����511
 * @param {Function} callback �첽�ص�����
 */
//server.listen(3000,'localhost',100,function(){});

/**
 * ԴAPI��server.listen(path, [callback])
 * ˵��������һ�� UNIX �׽��ַ�����������·�� path �ϼ������ӡ�
 * �����ô�����·��������������Դ�����ָ�
 * @param {String} path
 * @param {Function} callback
 */
//server.listen('path',function(){})

/**
 * ԴAPI��server.listen(handle, [callback])
 * ˵����Windows ��֧�ּ���һ���ļ���������
 * @param {Object} handle �������Ա�����Ϊserver ���� socket
 * @param {Function} callback
 */
//server.listen({},function(){});

/**
 * ˵�����������ͷ��Ŀ����, Ĭ�� 1000 ��. �������Ϊ0, ��������κ�����.
 * @type {number}
 */
server.maxHeadersCount = 1000;

/**
 * ԴAPI��server.setTimeout(msecs, callback)
 * ˵����Ϊ�׽����趨��ʱֵ�����һ����ʱ��������ôServer�����ϻ�ַ�һ��'timeout'�¼���ͬʱ���׽�����Ϊ�������ݡ�
 * ����Ϊ0����ֹ֮���������ӵ�һ���Զ���ʱ��Ϊ
 * @param {Number} msecs
 * @param
 */
server.setTimeout(1000,function(){});

/**
 * ˵����һ���׽��ֱ��ж�Ϊ��ʱ֮ǰ�����ú������� Ĭ�� 120000 (2 ����)
 * @type {number}
 */
server.timeout = 120000;

/**
 * ˵����������������Ǳ���
 * @param {Number} port �˿�
 * @param {Function} callback �첽�ص�����
 */
server.listen(3000,function(){
    console.log('Listen port 3000');
});

/************************************************** http.request ***************************************************************/
/**
 * ��������
 * @type {{hostname: string, port: number, method: string, path: string,handers: {}}}
 * host:����ķ�������������IP��ַ
 * port:�˿�
 * method:����ʽ��POST,GET,INPUT,DELETE,CONNECT��Ĭ��ΪGET
 * path�������ַ���ɰ�����ѯ�ַ����Լ����ܴ��ڵ�ê�㡣����'/index.html?page=12'
 * handers: һ����������ͷ�Ķ���
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
 * �����ر����ϢͷӦ��ע�⣺
 * ����'Connection: keep-alive'ͷ����֪ͨNode�����ӽ����ֵ���һ������
 * ����'Content-length'ͷ��ʹĬ�ϵķֿ������Ч��
 * ����'Expect'ͷ������������ͷ�����������͡�
 * ͨ�������������'Expect: 100-continue'ʱ������Ҫ����continue�¼���ͬʱ���ó�ʱ���μ�RFC2616 8.2.3�½��Ի�ø������Ϣ��
 */

/**
 * ˵�����ٷ�����������
 * Ӧ�ó�����ģ��ͷ����������������һ��HTTP �ͻ��˹��ߣ������� HTTP ��������������
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

//�������������г����˴��󣨿�����DNS������TCP�Ĵ��󡢻���HTTP�������󣩣����ص���������ϵ�'error'���¼�����������
req.on('error',function(e){
    console.log(e.message);
});

/**
 * ԴAPI��request.write(chunk, [encoding])
 * ˵�������������е�һ�顣�û�����ͨ����ε�������������������������ķ�ʽ���͵���������������������ڽ�������ʱʹ��['Transfer-Encoding', 'chunked']����ͷ��
 * @param {Object or String} chunk ����chunkӦ����һ������������ַ�����
 * @param {String} encoding ����encoding�ǿ�ѡ�ģ�����chunkΪ�ַ���ʱ���á�
 */
req.write('data\n');

/**
 * ԴAPI��request.end(chunk, [encoding])
 * ˵������ɱ�������ķ��͡���������е��κ�һ������û�����ü����ͣ���������ȫ��ˢ�µ����С�������������Ƿֿ�ģ�������������������ַ�'0\r\n\r\n'�����ʹ�ò���data���͵����ڵ���request.write(data, encoding)֮������ŵ���request.end()��
 * @param {Object or String} chunk ����chunkӦ����һ������������ַ�����
 * @param {String} encoding ����encoding�ǿ�ѡ�ģ�����chunkΪ�ַ���ʱ���á�
 * example: req.end(),req.end('data\n'),req.end('data','utf8'),req.end(chunk)
 */
req.end();

/**
 * ��ֹһ�����󡣣�v0.3.8�������ķ�������
 */
req.abort();

/**
 * ԴAPI��request.setTimeout(timeout, [callback])
 * ˵����һ�����������������һ��socketʱ�˺����ᱻ����
 * @param {Number} timeout ����
 * @param {Function} callback �ص�����
 */
req.setTimeout(1000,function(){});

/**
 * ԴAPI :request.setNoDelay([noDelay])
 * ˵����Ĭ����һ�����ӳ٣�����Ϊ0��ʾ���ӳ�
 * @param {Number} noDelay
 */
req.setNoDelay(0)
/**
 * ԴAPI��request.setSocketKeepAlive([enable], [initialDelay])
 *     ����ͬ��
 */