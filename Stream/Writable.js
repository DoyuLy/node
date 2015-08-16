
/*
 * Readable �ɶ� -> eg :  http(res/req) fs  zlib crypto TCP stdout/stderr(child_process)  process.stdin
 * Writable ��д
 * Duplex   ˫��
 * Transform �任
 *
 * write(chunk, [encoding], [callback])
 * return :true
 * event  :drain                           write()���÷���false��, ��׼��д���������ʱ�������¼�
 *         finish                          ��end()������,�������ݱ�ˢ��,�Ҳ����и��������ʱ
 *         pipe                            ��pipe()��Readable���ϱ�����ʱ
 *         unpipe                          ͬ��
 * func   :write(chunk, [encoding], [callback])                    chunk ������Buffer  ��  String;  ����string��ָ��encoding, callback������д��ʱ����
 *         end([chunk], [encoding], [callback])                    ͬ��, ���һᷢ��finish �¼�
 */

var util = require('util');
var stream = require('stream');
var _ = require('underscore');
util.inherits(Writer, stream.Writable);

function Writer(opt){
    //����Writable����ʵ��
    stream.Writable.call(this, opt);
    this.data = new Array();
}
//��дWritable�������_write����
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