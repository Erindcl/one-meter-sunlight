var mongoose = require('mongoose'); // 加载mongoose模块
var Schema = mongoose.Schema; // 定义表模型

var remarkSchema = new Schema({ // 具体表模型根据数据库中而定  列名：类型
  "id" : Number,
  "userName": String,
  "userId": Number,
  "userHp": String,
  "date": String,
  "content": String,
  "support": Number,
  "against": Number,
});

module.exports = mongoose.model('Remark',remarkSchema, 'remark'); // 不带名字的输出本文件