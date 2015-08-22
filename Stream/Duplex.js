/**
 * Created by duyu on 2015/8/16.
 */
/*
    双向流 eg: TCP套接字
 */

var util = require('util');
var stream = require('stream');
var _ = require('underscore');

util.inherits(Duplexer, stream.Duplex);

function Duplexer(opt){
    stream.Duplex.call(this, opt);
    this.data = new Array();
};

Duplexer.prototype._read = function readItem(size) {
    var chunk = this.data.shift();
    //console.log('------------'+chunk)
    if(chunk =='stop'){
        this.push(null);
    }else{
        if(chunk){
            this.push(chunk);
        }else{
            setTimeout(readItem.apply(this), 500, size);
        }
    }
};

Duplexer.prototype._write = function(data, encoding, callback){
    this.data.push(data);
    callback && callback();
}

/********************************************************************/

var duplexer = new Duplexer();
duplexer.addListener('data', function(chunk){
    console.log('read:', chunk.toString());
});

duplexer.addListener('end', function () {
    console.log('message complete.');
});
/*********************************************************************/
duplexer.write('1');
duplexer.write('2');
duplexer.write('3');
duplexer.write('stop');










