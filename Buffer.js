/**
 * Created by duyu on 2015/8/16.
 */
var buf256 = new Buffer(256);

//buffer.fill(value, [offset], [end]) 填充0
buf256.fill();//initialize buf 0即为空
console.log(buf256.toString());
//buffer.wwrite(string, [offset], [length], [encoding])
buf256.write('add some text');
console.log(buf256.toString());
buf256.write('more text', 9, 9, 'utf8');
console.log(buf256.toString());
//替换指定offset位置值
buf256[18] =43;
console.log(buf256.toString());

//string_decoder 读取缓冲区解码内容
var stringDecoder = require('string_decoder').StringDecoder;
var decoder = new stringDecoder('utf8');
console.log(decoder.write(buf256));

//确定缓冲区长度：注意区分字符长度 和字节长度
console.log('test length \u00b6'.length);//13
console.log(Buffer.byteLength('test length \u00b6', 'utf8')); //双字节多占一位 14
console.log(Buffer('test length \u00b6').length); //双字节多占一位 14

//缓冲区复制
//source.copy(target, [targetStart], [sourceStart], [sourEnd])
var copyBuf = new Buffer(26);
copyBuf.fill('.');
console.log(decoder.write(copyBuf));
buf256.copy(copyBuf, 0, 0, 17);
console.log(decoder.write(copyBuf));

//切片:返回Buffer, 注意切片是截取源缓冲区一截,编辑切片会改变源缓冲区(而非副本)
//slice([start], [end])
var slice = buf256.slice(5,15);
console.log(decoder.write(slice));
slice[0] = '#'.charCodeAt(0);
console.log(decoder.write(buf256)) ;//改变了源缓冲区

//拼接
var b1 = new Buffer('1');
var b2 = new Buffer('2');
var b3 = new Buffer('3');
slice[0] = '#'.charCodeAt(0);
console.log(Buffer.concat([b1,b2,b3],100).toString()) ;
