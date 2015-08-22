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
        that.concat(trunk);
    });
    stream.on('end', function () {
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
    bufferHelper.concat(chunk);
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
  bufferHelper.load(request, function (err, buffer) {
    var html = buffer.toString();
    response.writeHead(200);
    response.end(html);
  });
  }).listen(8001);
 */