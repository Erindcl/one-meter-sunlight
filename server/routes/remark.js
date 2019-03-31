var express = require('express'); // 加载express
var router = express.Router(); 
var mongoose = require('mongoose'); // 需要操作数据库 故需加载mongoose
var Remark = require('../models/remark');

// 通过mongoose的api连接数据库 
// 如果是有密码和账号则以如下连接  mongodb://root:123456@127.0.0.1:27017/db_demo
mongoose.connect('mongodb://127.0.0.1:27017/story_station');
// 监听数据库是否连接成功 成功或失败都会调用相应的回调函数
mongoose.connection.on("connected", function () {
  console.log("story_station MongoDB connected success");
});
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail");
});
// 监听连接是否断开
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected");
});

// 通过id值查询评论
router.get("/list", function (req,res,next) {
  // id: [1,2],
	// pageSize: 10, 
	// pageNo: 1
  let page = parseInt(req.param("pageNo"));
  let pageSize = parseInt(req.param("pageSize"));
  let skip = (page-1)*pageSize;
  let initDoc = [];
  let resultDoc = [];
  Remark.find({}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      initDoc = doc;
    }
  });
  initDoc.forEach((item,index) => {
    if (req.param("id").indexOf(item.id)) {
      resultDoc.push(item);
    }
  })

  resultDoc = resultDoc.slice(skip,pageSize); // 翻页设置

  res.json({
    success: true,
    message: '',
    data: {
      count: resultDoc.length,
      list: resultDoc
    }
  });
});

// 评论添加
router.post("/add", function (req,res,next) {
  // userName: '',
	// userId: 1,
	// date: 2019-03-13,  
	// content: '',
	// support: 0,
	// against: 0,
  var newDoc = ({
    "userName": req.param("userName"),
		"userId": parseInt(req.param("userId")),
		"date": req.param("date"),  
		"content": req.param("content"),
		"support": parseInt(req.param("support")),
		"against": parseInt(req.param("against")),
  });
  Remark.create(newDoc, function(err, docs){
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      res.json({
        success: true,
        message: '',
        data: docs
      });
    }
  });
});

// 评论删除
router.post("/remove", function (req,res,next) {
  // remarkId: 1
  Remark.remove({id: req.param("remarkId")}, function(err, docs){
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      res.json({
        success: true,
        message: '',
        data: docs
      });
    }
  });
});

// 评论点赞与反对
router.post("/support-or-against", function (req,res,next) {
  // remarkId: 1
  // type: 'support|against'
  let changeObj = {};
  Remark.findOne({id: req.param("remarkId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      changeObj = req.param("type") == 'support' ? { support: doc.support } : { against: doc.against };
    }
  });
  Remark.update({id: req.param("remarkId")}, changeObj, {multi: true}, function(err, docs){
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      res.json({
        success: true,
        message: '',
        data: docs
      });
    }
  });
});

module.exports = router;