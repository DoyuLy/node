/**
 * fs.createWriteStream(path, [options])
 * createWriteStream.write(data)
 * createWriteStream.end() //触发close事件
 */
var fs = require('fs');

var friuts = ['apple', 'orange', 'banana', 'grapes'];
var options = {encoding: 'utf8', flag: 'a+', mode: '0666'};
var fileWriteStream = fs.createWriteStream('./test.txt', options);

fileWriteStream.addListener('close', function () { //on
    console.log('file closed.');
});

while(friuts.length){
    var data = friuts.pop() + ' ';
    fileWriteStream.write(data);
    console.log('write: %s', data);
}

fileWriteStream.end();