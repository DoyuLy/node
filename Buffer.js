/**
 * Created by duyu on 2015/8/16.
 */
var buf256 = new Buffer(256);

//buffer.fill(value, [offset], [end]) ���0
buf256.fill();//initialize buf 0��Ϊ��
console.log(buf256.toString());
//buffer.wwrite(string, [offset], [length], [encoding])
buf256.write('add some text');
console.log(buf256.toString());
buf256.write('more text', 9, 9, 'utf8');
console.log(buf256.toString());
//�滻ָ��offsetλ��ֵ
buf256[18] =43;
console.log(buf256.toString());

//string_decoder ��ȡ��������������
var stringDecoder = require('string_decoder').StringDecoder;
var decoder = new stringDecoder('utf8');
console.log(decoder.write(buf256));

//ȷ�����������ȣ�ע�������ַ����� ���ֽڳ���
console.log('test length \u00b6'.length);//13
console.log(Buffer.byteLength('test length \u00b6', 'utf8')); //˫�ֽڶ�ռһλ 14
console.log(Buffer('test length \u00b6').length); //˫�ֽڶ�ռһλ 14

//����������
//source.copy(target, [targetStart], [sourceStart], [sourEnd])
var copyBuf = new Buffer(26);
copyBuf.fill('.');
console.log(decoder.write(copyBuf));
buf256.copy(copyBuf, 0, 0, 17);
console.log(decoder.write(copyBuf));

//��Ƭ:����Buffer, ע����Ƭ�ǽ�ȡԴ������һ��,�༭��Ƭ��ı�Դ������(���Ǹ���)
//slice([start], [end])
var slice = buf256.slice(5,15);
console.log(decoder.write(slice));
slice[0] = '#'.charCodeAt(0);
console.log(decoder.write(buf256)) ;//�ı���Դ������

//ƴ��
var b1 = new Buffer('1');
var b2 = new Buffer('2');
var b3 = new Buffer('3');
slice[0] = '#'.charCodeAt(0);
console.log(Buffer.concat([b1,b2,b3],100).toString()) ;
