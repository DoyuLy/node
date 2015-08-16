/**
 * Created by duyu on 2015/8/16.
 */
/*
 * 扩展了 Duplex ; 会修改 Readable流 和 Writable流之间的数据
 * eg : crypto流
 * ps : 不需要实现 _read() / _write();  需要实现 _transform() / _flush()
 */

var util = require('util');
var stream = require('stream');
var _ = require('underscore');

util.inherits(JSONObjectStream, stream.Transform);
function JSONObjectStream (opt){
    stream.Transform.call(this, opt);
};

JSONObjectStream.prototype._transform = function (data, encoding, callback) {
    var object = data ? JSON.parse(data.toString()) : '';
    //_.extend(object, {handled: true});
    this.emit('object', object); //由于Stream继承了Events.Emitter;JSONObjectStream继承了 Stream.Transform
    this.push(JSON.stringify(object));
    callback && callback();

};

JSONObjectStream.prototype._flush = function (cb) {
    cb && cb();
};
/************************************************/
var tc = new JSONObjectStream();
tc.addListener('object', function(object){
    console.log('Name: %s',  object.name);
    console.log('Color: %s',  object.color);
})
tc.addListener('data', function (data) {
    console.log('data: %s',  data.toString());
})
/************************************************/
tc.write('{"name":"duyu", "color":"blue"}');//node端的json必须按照严格模式
//tc.write("{'name':'tom', 'color':'red'}");
//tc.write("{'name':'lucy', 'color':'green'}");
//tc.write("{'name':'lily', 'color':'purple'}");
//tc.write("{'name':'jerry', 'color':'pink'}");

