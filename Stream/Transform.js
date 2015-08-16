/**
 * Created by duyu on 2015/8/16.
 */
/*
 * ��չ�� Duplex ; ���޸� Readable�� �� Writable��֮�������
 * eg : crypto��
 * ps : ����Ҫʵ�� _read() / _write();  ��Ҫʵ�� _transform() / _flush()
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
    this.emit('object', object); //����Stream�̳���Events.Emitter;JSONObjectStream�̳��� Stream.Transform
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
tc.write('{"name":"duyu", "color":"blue"}');//node�˵�json���밴���ϸ�ģʽ
//tc.write("{'name':'tom', 'color':'red'}");
//tc.write("{'name':'lucy', 'color':'green'}");
//tc.write("{'name':'lily', 'color':'purple'}");
//tc.write("{'name':'jerry', 'color':'pink'}");

