
/*
 * Readable 可读 -> eg :  http(res/req) fs  zlib crypto TCP stdout/stderr(child_process)  process.stdin
 * Writable 可写
 * Duplex   双工
 * Transform 变换
 *
 * write(chunk, [encoding], [callback])
 * return :true
 * event  :drain                           write()调用返回false后, 当准备写入更多数据时发出此事件
 *         finish                          当end()被调用,所有数据被刷新,且不会有更多的数据时
 *         pipe                            当pipe()在Readable流上被调用时
 *         unpipe                          同上
 * func   :write(chunk, [encoding], [callback])                    chunk 可以是Buffer  或  String;  若是string可指定encoding, callback在数据写完时调用
 *         end([chunk], [encoding], [callback])                    同上, 并且会发送finish 事件
 */

var util = require('util');
var stream = require('stream');
var _ = require('underscore');
util.inherits(Writer, stream.Writable);

function Writer(opt){
    //设置Writable对象实例
    stream.Writable.call(this, opt);
    this.data = new Array();
}
//复写Writable流对象的_write方法
Writer.prototype._write = function (data, enoding, callback) {
    this.data.push(data.toString('utf8'));
    callback && callback();
};

var writer = new Writer();
for(var i=1;i<=5;i++){
    writer.write(i.toString(),'utf8');
}
writer.end('last');
console.log(writer.data);