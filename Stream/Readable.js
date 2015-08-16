
/*
* Readable �ɶ� -> eg :  http(res/req) fs  zlib crypto TCP stdout/stderr(child_process)  process.stdin
* Writable ��д
* Duplex   ˫��
* Transform �任
*
* read([size])
* return :String / Buffer / Null
* event  :readable / data / end / close / error
* func   :read([size])                    ��ȡ�����Ϊ String Buffer Null
*         setEncoding(encoding)           ����string�ı���
*         pause()                         ��ͣ�Ӹö��󷢳���data�¼�
*         resume()                        �ظ��Ӹö��󷢳���data�¼�
*         pipe(destination, [options])    �������Ŀ�ĵ�ָ����Writable������ options: {end: true} ��ζ��Readable����ʱ����WritableĿ�ĵأ�Writable��ӵ�pipe�¼���
*         unpipe([deatination])           ��WritableĿ�ĵضϿ��˶���
*/

//����Readable������
var util = require('util');
var stream = require('stream');
var _ = require('underscore');
/*ע�� inherits ʵ�ֵ���ԭ�ͼ̳�,���캯���ڵ����Լ̳���Ҫ��ʽ�ĵ��ø������ſ��Լ̳и��๹�캯���ڶ��������
* function myObj(){
*   events.EventEmitter.call(this); //������ʽ�ĵ��òſɼ̳и�������
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
//��дReadable�������_read����
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