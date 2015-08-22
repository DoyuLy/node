/**
 * ����fs �������ṩͬ�����첽��ʽ
 * fs.open(path, flag, [mode], cb)
 * fs.openSync(path, flag, [mode])
 * params: {
 *      path: ��׼·���ַ���
 *      flag: ���ļ���ģʽ
 *      [mode]: ����ģʽ(default: 0666 �ɶ���д)
 *      cb: �첽��ʽ��һ���ص�����
 *  }
 *  ps: �첽�Զ������쳣 (err, msg) /  ͬ�������ֶ�try... catch...
 */

var util = require('util');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

//----------------------ͬ�����ļ�----------------
//var fd = fs.openSync("F:\\git\\node\\composer.json", 'w');
//console.log(fd);
//fs.closeSync(fd);

//----------------------�첽���ļ�----------------
//fs.open("F:\\git\\node\\composer.json", 'w', function (err, fd) {
//    console.log(fd);
//    if(!err)
//        fs.close(fd);
//})

//----------------------д���ļ�----------------
/**
 * ����д��buffer �� string
 * options : encoding/mode/flag
 *           flag: r/r+/rs/rs+ :��(���������쳣) / ��д(���������쳣) / ͬ��ģʽ��(�ƹ�����,�Ҳ�ͬ��openSync,����ʹ��) / ͬ��ģʽ��д(ͬrs)
 *                 w/wx/w+/wx+ :д(�������򴴽�,����ض�) / д(�������ʧ��,ͬw�෴) / ��д(�������򴴽�,����ض�) / ��д(�������ʧ��,ͬw+�෴)
 *                 a/ax/a+/ax+ :׷��(��������׷��) / ׷��(�������ʧ��) / ��ȡ,׷��(��������׷��) / ��ȡ,׷��(�������ʧ��)
 *           mode: ����ģʽ Ĭ��0666(�ɶ���д)
 * fs.writeFile(path, data, [options], cb) //����Ҫ�����ļ����������ֶ��ر��ļ�
 * fs.writeFileSync(path, data, [options]) //��������һ���ļ������� fd
 * fs.write(fd, data, offset, length, position, cb)
 *    params{
 *      fd    :fs.open / fs.openSync ���ص��ļ�������
 *      data  :string / buffer
 *      offset:д�����ݵ�����
 *      length:д��ĳ���
 *      position:���ļ�д���λ������
  *     cb: �ص�����Ϊ(err, bytes) bytesΪд���ֽ���
 *    }
 */

//var config = {
//    maxFiles: 20,
//    maxConnections: 10,
//    rootPath: '/webroot'
//};
//
//var options = {encoding: 'utf8', flag: 'w'};
//
//fs.writeFile('./test.txt', JSON.stringify(config), options, function (err) {
//    if(err) console.log('config write failed.');
//    else console.log('config saved.')
//});

var friut = ['apple', 'orange', 'banana', 'grapes'];
async.waterfall([
    function(cb){
        fs.open('./test.txt', 'w', '0666', function (err, fd) {
            err ? cb(err) : cb(null, fd);
        })
    },
    function(fd, cb){
        if(fd){
            _.each(friut, function(val, i){
                (function(val){
                    fs.write(fd, val+ ' '+i, null, null, function(err, bytes){
                        console.log(i); //0 3 2 1
                        err ? cb(err) : cb(null, val, bytes);
                    })
                })(val)
            });
        }else{
            cb('open file error.')
        }
    }
],function(err, val, bytes){
    //ֻ���õ����һ���ص�
    err ? console.log(err) : console.log("write : %s %d bytes", val, bytes);
})


