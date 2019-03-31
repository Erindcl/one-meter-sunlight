var express = require('express'); // 加载express
var router = express.Router(); 
var mongoose = require('mongoose'); // 需要操作数据库 故需加载mongoose
var Stories = require('../models/story'); // Stories的名字必须与数据库中表名保持一致

// 通过mongoose的api连接数据库 
// 如果是有密码和账号则以如下连接  mongodb://root:123456@127.0.0.1:27017/db_demo
mongoose.connect('mongodb://127.0.0.1:27017/story_station');
// 监听数据库是否连接成功 成功或失败都会调用相应的回调函数
mongoose.connection.on("connected", function () {
  console.log("story_station MongoDB connected success");
});
mongoose.connection.on("error", function () {
  console.log("story_station MongoDB connected fail");
});
// 监听连接是否断开
mongoose.connection.on("disconnected", function () {
  console.log("story_station MongoDB connected disconnected");
});

router.get("/", function (req,res,next) {
  console.log('请求了storylist')
  Stories.find({}, function (err,doc) {
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
        data: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

// 通过主题或者id值筛选故事列表
router.get("/list", function (req,res,next) {
  // theme: 'all', // 可选
	// id: [1,2],  // 可选
	// pageSize: 10, 
	// pageNo: 1, 
  // sort: 'time|hot'
  let page = parseInt(req.param("pageNo"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param('sort');
  let skip = (page-1)*pageSize;
  let initDoc = [];
  let resultDoc = [];
  Stories.find({}, function (err,doc) {
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
  if (req.param("theme") && req.param("theme") != 'all') {
    initDoc.forEach((item,index) => {
      if (item.tabs.indexOf(req.param("theme"))) {
        resultDoc.push(item);
      }
    })
    if (sort == 'hot') {
      resultDoc.sort((itemA,itemB) => {return itemB.watchCount - itemA.watchCount;});
    }
    
  }
  if (req.param("id")) {
    initDoc.forEach((item,index) => {
      if (req.param("id").indexOf(item.id)) {
        resultDoc.push(item);
      }
    })
  }

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

// // 单个故事详情
router.get("/detail", function (req,res,next) {
  // storyId: 1
  Stories.findOne({id: req.param("storyId")}, function (err,doc) {
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
        data: doc
      });
    }
  });
});

// // 故事评论添加
router.post("/add-remark", function (req,res,next) {
  // remarkId: 1,
  // storyId: 1
  let remarkGroup = [];
  Stories.findOne({id: req.param("storyId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      remarkGroup = doc.remarkGroup;
    }
  });
  remarkGroup.push(req.param("remarkId"));
  Stories.update({id: req.param("storyId")}, {remarkGroup: remarkGroup}, {multi: true}, function (err,doc) {
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
        data: doc
      });
    }
  });
});

// // 故事评论删除
router.post("/remove-remark", function (req,res,next) {
  // remarkId: 1,
  // storyId: 1
  let remarkGroup = [];
  let remarkId = req.param("remarkId");
  Stories.findOne({id: req.param("storyId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      remarkGroup = doc.remarkGroup;
    }
  });
  remarkGroup.splice(remarkGroup.indexOf(remarkId),1);
  Stories.update({id: req.param("storyId")}, {remarkGroup: remarkGroup}, {multi: true}, function (err,doc) {
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
        data: doc
      });
    }
  });
});

module.exports = router;