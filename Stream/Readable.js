
/**
* Readable 可读 -> eg :  http(res/req) fs  zlib crypto TCP stdout/stderr(child_process)  process.stdin
* Writable 可写
* Duplex   双工
* Transform 变换
*
* read([size])
* return :String / Buffer / Null
* event  :readable / data / end / close / error
* func   :read([size])                    读取对象可为 String Buffer Null
*         setEncoding(encoding)           返回string的编码
*         pause()                         暂停从该对象发出的data事件
*         resume()                        回复从该对象发出的data事件
*         pipe(destination, [options])    流输出到目的地指定的Writable对象流 options: {end: true} 意味着Readable结束时结束Writable目的地（Writable会接到pipe事件）
*         unpipe([deatination])           从Writable目的地断开此对象
*/

//定制Readable流对象
var util = require('util');
var stream = require('stream');
var _ = require('underscore');
/**注意 inherits 实现的是原型继承,构造函数内的属性继承需要显式的调用父类对象才可以继承父类构造函数内定义的属性
* function myObj(){
*   events.EventEmitter.call(this); //必须显式的调用才可继承父类属性
* }
* myObj.prototype.__proto__ = events.EventEmitter.prototype;
*
*/
util.inherits(Answers, stream.Readable);

function Answers(opt){
    stream.Readable.call(this, opt);
    this.quotes = ['yes', 'no', 'maybe'];
    this._index = 0;
}
//复写Readable流对象的_read方法
Answers.prototype._read = function () {
    if(this._index > _.size(this.quotes)){
        this.push(null);
    }
    else{
        this.push(this.quotes[this._index]);
        this._index ++;
    }
}

var answer = new Answers();
console.log('Direct read: ' +answer.read().toString());
//answer.on
answer.addListener('data', function (data) {
    console.log('Callback read: '+ data.toString());
});
answer.addListener('end', function(data){
   console.log('No more answers.')
});