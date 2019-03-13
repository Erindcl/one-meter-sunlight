var mongoose = require('mongoose'); // 加载mongoose模块
var Schema = mongoose.Schema; // 定义表模型

var storySchema = new Schema({ // 具体表模型根据数据库中而定  列名：类型
  "id" : Number,
  "title" : String,
  "coverPic" : String,
  "watchCount" : Number,
  "remarkCount" : Number,
  "payCorn" : Number,
  "auther" : String,
  "content" : String,
});

module.exports = mongoose.model('Story',storySchema); // 不带名字的输出本文件