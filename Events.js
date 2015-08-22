/*
    addListener(eventName, cb)
    on(eventName, cb)
    once(eventName, cb)

    .listeners(eventName) 返回监听事件的监听器数组
    .setMaxListeners(n)   设置监听器最大数,默认是10(大于10发出警报)
    .removeListener(eventName, cb) 移出cb
 */

var events = require('events');
//var emitter = new events.EventEmitter();

function myObj(){
    events.EventEmitter.call(this);
}
myObj.prototype.__proto__ = events.EventEmitter.prototype;

