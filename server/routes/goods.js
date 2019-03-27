var express = require('express'); // 加载express
var router = express.Router(); 
var mongoose = require('mongoose'); // 需要操作数据库 故需加载mongoose
var Goods = require('../models/goods');

// 通过mongoose的api连接数据库 
// 如果是有密码和账号则以如下连接  mongodb://root:123456@127.0.0.1:27017/db_demo
mongoose.connect('mongodb://127.0.0.1:27017/db_demo');
// 监听数据库是否连接成功 成功或失败都会调用相应的回调函数
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success");
});
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail");
});
// 监听连接是否断开
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected");
});

// 添加数据进数据库  creat
router.get("/creat", function (req,res,next) {
  var newDoc = ({
    "productId" : "024",
    "productName" : "小花花",
    "productImage" : ".././",
    "salePrice" : "553",
    "checked" : "false",
    "productNum" : 79
  });
  Goods.create(newDoc, function(err, docs){
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        });
      } else {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: docs.length, 
            list: docs // docs -> newDoc
          }
        });
      }
  });
});

// 从数据库中删除指定数据 删 remove
router.get("/remove", function (req,res,next) {
  Goods.remove({productId: "024"}, function(err, docs){
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        });
      } else {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: docs.length, 
            list: docs // docs -> {n: 1, ok: 1}
          }
        });
      }
  });
});

// 修改数据库中指定数据 改 update 
// 注意 查找条件属性的值的类型必须与数据库中的一致 否则会查找不到要修改的记录
router.get("/update", function (req,res,next) {
  Goods.update({productNum: 20}, {productName: "小花花花"}, {multi: true},  function(err, docs){
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        });
      } else {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: docs.length, 
            list: docs  // docs -> {n: 1, nModified: 1, ok: 1}
          }
        });
      }
  });
});

// 无参数的从数据库中获取数据的方法  查  find
// 获取路由 获取成功就查询数据库
router.get("/", function (req,res,next) {
  // res.send('hello,goods list');  // 定义输出到页面中的信息
  Goods.find({}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } else {
      res.json({
        success: true,
        message: '',
        data: {
          count: doc.length, // 查询中的聊表行数
          list: doc // 查询出来的列表集合
        }
      });
    }
  }); //上面引用的Goods自动封装了find这个api 用于查找 在这个api中 第一个参数是查找的条件 第二个参数是一个回调函数
});

//当URL中有参数时 通过参数的值来获取相应的数据 如分页实现
router.get("/find", function (req,res,next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param('sort'); // 取得的值 -1 为降序  1 为升序
  let skip = (page-1)*pageSize; // 跳过前面多少条数据
  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize); // 跳过指定条数据后返回指定条数的数据
  goodsModel.sort({'salePrice':sort}); // 根据价格进行排序
  goodsModel.exec( function (err,doc) {  // 有了以上条件后执行
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } else {
      res.json({
        success: true,
        message: '',
        data: {
          count: doc.length, // 查询中的聊表行数
          list: doc // 查询出来的列表集合
        }
      });
    }
  }); //上面引用的Goods自动封装了find这个api 用于查找 在这个api中 第一个参数是查找的条件 第二个参数是一个回调函数
});

module.exports = router;