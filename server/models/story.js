var mongoose = require('mongoose'); // 加载mongoose模块
var Schema = mongoose.Schema; // 定义表模型

var storySchema = new Schema({ // 具体表模型根据数据库中而定  列名：类型
  "id": Number,
  "title": String,
  "coverPic": String,
  "watchCount": Number,
  "remarkCount": Number,
  "payCorn": Number,
  "auther": String,
  "contentPart": String,  // 缩略版内容
  "contentAll": String,  // 完整版内容
  "remarkGroup": Array,
  "date": String,
  "tabs": Array, // 标签（专题）
  "boughters": Array  // 买了此故事的人   
});

module.exports = mongoose.model('Story',storySchema); // 不带名字的输出本文件