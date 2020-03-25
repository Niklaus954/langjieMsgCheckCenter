基于nest.js的后台项目脚手架

该脚手架配置了mysql操作，全局异常处理，成功返回的数据包装，session，用户身份登陆验证和角色区分，
业务异常码和异常消息，异常日志记录，Swagger文档等。

Installation
  npm i

Running the app
  npm run start
  npm run start:dev
  npm run start:prod

dist
  编译后的文件
env
  各种环境下的配置文件
log
  记录服务器异常
node_modules
  项目依赖
src
  Module
    模块
  Controller
    处理http请求的接收和返回
  Service
    Interface
      业务逻辑接口
    实现业务逻辑接口
  Dao
    数据访问，跟数据库的交互
  Entity
    实体，一般与表结构相对应
  Dto
    数据传输对象
  Decorator
    自定义的装饰器
  Guard
    守卫，用于身份验证和角色
  Util
    工具类
  Exception
    异常类
    Bo
      业务对象的异常码
  Common
    存放通用的类

nest.js文档链接
  https://docs.nestjs.com/