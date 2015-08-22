/**
 * 所有fs 方法都提供同步与异步方式
 * fs.open(path, flag, [mode], cb)
 * fs.openSync(path, flag, [mode])
 * params: {
 *      path: 标准路径字符串
 *      flag: 打开文件的模式
 *      [mode]: 访问模式(default: 0666 可读可写)
 *      cb: 异步方式多一个回调参数
 *  }
 *  ps: 异步自动处理异常 (err, msg) /  同步必须手动try... catch...
 */

var util = require('util');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

//----------------------同步打开文件----------------
//var fd = fs.openSync("F:\\git\\node\\composer.json", 'w');
//console.log(fd);
//fs.closeSync(fd);

//----------------------异步打开文件----------------
//fs.open("F:\\git\\node\\composer.json", 'w', function (err, fd) {
//    console.log(fd);
//    if(!err)
//        fs.close(fd);
//})

//----------------------写入文件----------------
/**
 * 可以写入buffer 或 string
 * options : encoding/mode/flag
 *           flag: r/r+/rs/rs+ :读(不存在则异常) / 读写(不存在则异常) / 同步模式读(绕过缓存,且不同于openSync,避免使用) / 同步模式读写(同rs)
 *                 w/wx/w+/wx+ :写(不存在则创建,有则截断) / 写(存在则打开失败,同w相反) / 读写(不存在则创建,有则截断) / 读写(存在则打开失败,同w+相反)
 *                 a/ax/a+/ax+ :追加(不存在则追加) / 追加(存在则打开失败) / 读取,追加(不存在则追加) / 读取,追加(存在则打开失败)
 *           mode: 访问模式 默认0666(可读可写)
 * fs.writeFile(path, data, [options], cb) //不需要返回文件描述符来手动关闭文件
 * fs.writeFileSync(path, data, [options]) //它返回了一个文件描述符 fd
 * fs.write(fd, data, offset, length, position, cb)
 *    params{
 *      fd    :fs.open / fs.openSync 返回的文件描述符
 *      data  :string / buffer
 *      offset:写入数据的索引
 *      length:写入的长度
 *      position:在文件写入的位置索引
  *     cb: 回调参数为(err, bytes) bytes为写入字节数
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
    //只会拿到最后一个回调
    err ? console.log(err) : console.log("write : %s %d bytes", val, bytes);
})


