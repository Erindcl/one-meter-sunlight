var mongoose = require('mongoose'); // 加载mongoose模块
var Schema = mongoose.Schema; // 定义表模型

var userSchema = new Schema({ // 具体表模型根据数据库中而定  列名：类型
  "id" : Number,
  "name": String,
  "password": String,
  "payPassword": String,
  "headPic": String,
  "bgPic": String,
  "intro": String,
  "corn": Number,
  "shoppingcar": Array,  // 购物车列表
  "bought": Array,
  "postRemarks": Array
});

module.exports = mongoose.model('User',userSchema); // 不带名字的输出本文件