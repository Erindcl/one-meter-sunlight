var mongoose = require('mongoose'); // 加载mongoose模块
var Schema = mongoose.Schema; // 定义表模型

var produtSchema = new Schema({ // 具体表模型根据数据库中而定  列名：类型
  "productId" : String,
  "productName" : String,
  "salePrice" : Number,
  "productImage" : String,
});

module.exports = mongoose.model('Good',produtSchema); // 不带名字的输出本文件