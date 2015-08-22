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

//----------------------读写文件----------------
/**
 * 可以写入buffer 或 string
 * options : encoding/mode/flag
 *           flag: r/r+/rs/rs+ :读(不存在则异常) / 读写(不存在则异常) / 同步模式读(绕过缓存,且不同于openSync,避免使用) / 同步模式读写(同rs)
 *                 w/wx/w+/wx+ :写(不存在则创建,有则截断) / 写(存在则打开失败,同w相反) / 读写(不存在则创建,有则截断) / 读写(存在则打开失败,同w+相反)
 *                 a/ax/a+/ax+ :追加(不存在则追加) / 追加(存在则打开失败) / 读取,追加(不存在则追加) / 读取,追加(存在则打开失败)
 *           mode: 访问模式 默认0666(可读可写)
 * 简单写入
 * fs.writeFile(path, data, [options], cb) //不需要返回文件描述符来手动关闭文件
 * fs.writeFileSync(path, data, [options]) //它返回了一个文件描述符 fd
 * 同步写入
 * fs.writeSync(fd, data, offset, length, position) //需要使用fs.openSync(path, flag, [mode]) 来获取文件描述符fd
 * 异步写入
 * fs.write(fd, data, offset, length, position, cb)
 *    params{
 *      fd    :fs.open / fs.openSync 返回的文件描述符
 *      data  :string / buffer
 *      offset:要读取的 写入数据的索引
 *      length:写入的长度
 *      position:在文件写入的位置索引
  *     cb: 回调参数为(err, bytes) bytes为写入字节数
 *    }
 * 流式写入
 * fs.createWriteStream(path, [options])
 * createWriteStream.write(data)
 * createWriteStream.end() //需要手动触发close事件
 *
 *************************************************
 *
 * 简单读取
 *    fs.readFile(path, [options], cb)
 *    fs.readFileSync(path, [options]) //返回文件描述符fd
 * 同步读取
 *    fs.readSync(fd, buffer, offset, length, position) //返回bytes
 *    params {
 *      fd     : fs.open() / fs.openSync()返回的文件描述符
 *      buffer : 要读入数据的buffer
 *      offset : 要开始写入buffer的索引
 *      length : 要读取的字节数 //null 一直写到buffer末尾
 *      position: 读取文件的位置//null 读取文件当前位置
 *    }
 * 异步读取
 *     fs.read(fd, buffer, offset, length, position, cb) //cb(err, bytes, data)
 *
 * 流式读取
 *    fs.createReadStream(path, [options]) //返回一个readable 流
 *    createReadStream.read() 或 .on('data') 读取到数据, 读完会自动关闭,且自动触发close事件
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
//----------------------文件系统方法----------------
/**
 * fs.exists(path, cb) / fs.existsSync(path) -> true/false
 * fs.stats(path, cb) //cb(err, state)
 *    state对象方法: isFile()/isDirectory()/isSocket()/dev(设备id)/mode(文件访问模式)/size(文件大小)/blksize(存储当前文件的块大小)/blocks(占用的文件块)/
 *                   atime(上次访问时间)/mtime(z最后修改时间)/ctime(创建时间)
 * fs.readdir(path, cb) / fs.readdirSync(path) 返回名字字符串(包含相对路径)
 * fs.unlink(path, cb) / fs.unlinkSync(path) ->cb(err) 只返回是否出错
 * fs.truncate(path, length, cb) / fs.truncate(path,length) 截断(length为null则截断为0字节)
 * fs.mkdir(path, [mode], cb) / fs.mkdir(path, [mode])  //cb只返回错误信息, 注意异步创建目录必须等待父目录创建好, 同步则可以'./xxx/xxx/xxx'一步创建
 * fs.rename(oldPath, newPath, cb) / fs.renameSync(oldPath, newPath)
 * fs.watchFile(path, [options], cb)
 *    eg: fs.watchFile('./test.txt', {persistent: true, interval: 1000}, function(currentState, previousState){ console.log(currentState.ctime)}) currentState是State对象
 * */
