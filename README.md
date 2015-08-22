/*
    Node.js 核心模块

    1.全局对象
    1.1 global  : 作为Node.js全局变量的宿主(js中window是全局对象)
    1.2 process :global 对象的属性,它用于描述当前 Node.js 进程状态
               process.stdout是标准输出流 / process.stdin是标准输入流 / process.argv是命令行参数数组 / process.pid 当前进程编号
    1.3 console :console.log() / console.error() / console.trace()
    1.4 Buffer  :缓存
    1.5 require :加载器
    1.6 _filenmae:
    1.7 _dirname :
    1.8 module   :
    1.9 exports  :
    1.10 setTimeout/setInterval/setImmediate   :与process.nextTick不同(轻量级,立刻触发,时间精度高)

    2.util 常用函数集合
    2.1 inherits(sub,base) :只继承原型链上的属性与方法,构造器的属性不会继承
    2.2 util.inspect(object,[showHidden],[depth],[colors]) :将任意对象转换为字符串的方法,通常用于调试和错误输出

    3.events 事件驱动
    3.1 events.EventEmitter :唯一的一个对象
    3.2 error 事件 :内置的特殊事件,若无监听器,node会抛出异常
    3.3 events.EventEmitter继承 --> fs/net/http...

    4.fs 文件系统
    5.http/https

    Node.js 第三方包
    1.http相关
    1.1 url              :提供url解析(parse/format/resolve)
    1.2 querystring      :url参数字符串与对象间的转换(stringify/parse/escape/unescape)
    1.3 path             :处理转换文件路径工具集
    1.4

    2.fs相关



    n.框架级
    n.1 express :对http做了大量基础设施包装,依赖connect中间件
    n.2 koa     :采用了ES6,去掉了connect中间件依赖
    n.3 restify :只专注RESTful
    n.4

    n.部署
    n.1 forever
    n.2 pm2
    n.3 supervisor(开发时)
*/
