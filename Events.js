var events = require('events');
//var emitter = new events.EventEmitter();

function myObj(){
    events.EventEmitter.call(this);
}
myObj.prototype.__proto__ = events.EventEmitter.prototype;

