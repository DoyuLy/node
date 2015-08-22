var BufferHelper = function () {
    this.buffers = [];
};

BufferHelper.prototype.concat = function (buffer) {
    this.buffers.push(buffer);
    return this;
};

BufferHelper.prototype.empty = function () {
    this.buffers = [];
    return this;
};

BufferHelper.prototype.toBuffer = function () {
    return Buffer.concat(this.buffers);
};

BufferHelper.prototype.toString = function (encoding) {
    return this.toBuffer().toString(encoding);
};

BufferHelper.prototype.load = function (stream, callback) {
    var that = this;
    stream.on('data', function (trunk) {
        //size += chunk.length;
        //chunks.push(chunk);
        that.concat(trunk);
    });
    stream.on('end', function () {
        //var data = Buffer.concat(chunks, size);//注意此处的size 是指定copy第几个buffer(下标索引)
        //console.log(data.toString())
        callback(null, that.toBuffer());
    });
    stream.once('error', callback);
};

module.exports = BufferHelper;

/**
 var http = require('http');
 var BufferHelper = require('bufferhelper');

 http.createServer(function (request, response) {
  var bufferHelper = new BufferHelper();

  request.on("data", function (chunk) {
    bufferHelper.concat(chunk);//获取一次则立刻concat
  });
  request.on('end', function () {
    var html = bufferHelper.toBuffer().toString();
    response.writeHead(200);
    response.end(html);
  });

 }).listen(8001);
 *****************************************************
 var http = require('http');
 var BufferHelper = require('bufferhelper');

 http.createServer(function (request, response) {
  var bufferHelper = new BufferHelper();
  bufferHelper.load(response, function (err, buffer) {
    var html = buffer.toString();
    response.writeHead(200);
    response.end(html);
  });
  }).listen(8001);
 */