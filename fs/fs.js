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
