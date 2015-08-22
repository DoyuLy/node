/**
 * Created by duyu on 2015/8/17.
 */

var util = require('util');
var stream = require('stream');
var _ = require('underscore');

util.inherits(Reader, stream.Readable);
util.inherits(Writer, stream.Writable);

function Reader(opt){
    stream.Readable.call(this, opt);
    this._index = 1;
};

Reader.prototype._read = function (size) {
    var i = this._index++;
    if(i>10){
        this.push(null);
    }else{
        this.push(i.toString());
    }
}

function Writer(opt){
    stream.Writable.call(this, opt);
    this._index = 1;
};

Writer.prototype._write = function (data, encoding, callback) {
    console.log(data.toString());
    callback && callback();
};

/*****************************************/
var r = new Reader();
var w = new Writer();
r.pipe(w);

//zlib 中压缩流    使用Gzip压缩流来把数据从一个流输送到另一个流
// inFileStream.pipe(zlib.CreateGzip()).pipe(outFileStream) //
