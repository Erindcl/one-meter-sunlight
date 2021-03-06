var mongoose = require('mongoose'); // 加载mongoose模块
var Schema = mongoose.Schema; // 定义表模型

var userSchema = new Schema({ // 具体表模型根据数据库中而定  列名：类型
  "name": String,
  "email": String,
  "password": String,
  "payPassword": String,
  "headPic": String,
  "bgPic": String,
  "intro": String,
  "corn": Number,
  "shoppingcar": Array,  // 购物车列表
  "bought": Array,
  "postRemarks": Array,
  "type": String
});

module.exports = mongoose.model('User',userSchema,'user'); // 不带名字的输出本文件