var express = require('express'); // 加载express
var router = express.Router(); 
var mongoose = require('mongoose'); // 需要操作数据库 故需加载mongoose
var User = require('../models/user'); // User的名字必须与数据库中表名保持一致

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

// 登录  可直接获取用户信息
router.post("/login", function (req,res,next) {
  // userName: '',
  // password: ''
  User.findOne({email: req.param("email"), password: req.param("password")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      if (doc) {
        res.json({
          success: true,
          message: '登录成功',
          data: doc
        });
      } else {
        res.json({
          success: false,
          message: '该用户不存在，请先注册',
          data: {}
        });
      }
    }
  });
});

// 注册
router.post("/register", function (req,res,next) {
  // userName: ''
	// email: '',
  // password: ''
  User.findOne({email: req.param("email")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      if (doc) {
        res.json({
          success: false,
          message: '该用户已存在，请重新输入注册信息',
          data: {}
        });
      } else {
        var newDoc = ({
          "name": req.param("userName"),
          "email": req.param("email"),
          "password": req.param("password"),
          "payPassword": req.param("password"),  // 默认为账号密码 可修改
          "headPic" : "hp1.jpg",
          "bgPic" : "ubg1.jpg",
          "intro": '暂无简介~',
          "corn": 0,
          "shoppingcar": [],  // 购物车列表
          "bought": [],
          "postRemarks": [], 
          "type": 'ordinary'
        });
        User.create(newDoc, function(err, docs){
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
      }
    }
  });
});

// 获取用户信息
router.get("/base-infor", function (req,res,next) {
  // email: ''  // 唯一不可修改
  User.findOne({email: req.param("email")}, function (err,doc) {
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

// 修改基本信息
router.post("/update-infor", function (req,res,next) {
  let updateDoc = {
    "name": req.param("userName"),
    "password": req.param("password"),
    "payPassword": req.param("password"),  // 默认为账号密码 可修改
    "headPic": req.param("headPic"),
    "bgPic": req.param("bgPic"),
    "intro": req.param("intro"),
  };
  User.update({_id: req.param("userId")}, { ...updateDoc }, {multi: true}, function (err,doc) {
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
})

// 充值接口  支付密码验证直接其前端用用户的信息对比
router.post("/put-corn", function (req,res,next) {
  // userId: 1,
	// coin: 56
  let cornCount = 0;
  User.findOne({_id: req.param("userId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      cornCount = doc.corn;
      cornCount = cornCount + parseInt(req.param("corn"));
      User.update({_id: req.param("userId")}, {corn: cornCount}, {multi: true}, function (err,doc) {
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
    }
  });
});

// 添加进购物车
router.post("/add-into-shoppingcar", function (req,res,next) {
  // userId: 1,
	// storyId: 1,
  let shoppingcar = 0;
  User.findOne({_id: req.param("userId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      shoppingcar = doc.shoppingcar;
      shoppingcar.push(req.param("storyId"));
      User.update({_id: req.param("userId")}, {shoppingcar: shoppingcar}, {multi: true}, function (err,doc) {
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
    }
  });
});

// 购买故事
router.post("/pay-corn", function (req,res,next) {
  // userId: 1,
	// corn: 15,
	// storyIdList: []
  let shoppingcar = [];
  let bought = [];
  let corn = 0;
  let storyIdList = req.param("storyIdList");
  let newShoppingCar = [];
  User.findOne({_id: req.param("userId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      shoppingcar = doc.shoppingcar;
      bought = doc.bought;
      corn = doc.corn;
      corn = corn - parseInt(req.param("corn"));
      if (corn < 0) {
        res.json({
          success: false,
          message: '币不足，请充值',
          data: {}
        });
      } else {
        bought.push(...storyIdList);
        shoppingcar.forEach((item) => {
          if (storyIdList.indexOf(item) == -1) {
            newShoppingCar.push(item);
          }
        });
        User.update({_id: req.param("userId")}, {bought: bought, shoppingcar: newShoppingCar, corn: corn}, {multi: true}, function (err,doc) {
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
      }
    }
  });
});

// 从购物车中移除故事
router.post("/remove-from-shoppingcar", function (req,res,next) {
  let storyIds = req.param("storyIds");
  let newShoppingCar = [];
  User.findOne({_id: req.param("userId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      newShoppingCar = doc.shoppingcar;
      storyIds.forEach((item) => {
        newShoppingCar.splice(newShoppingCar.indexOf(item),1);
      });
      User.update({_id: req.param("userId")}, {shoppingcar: newShoppingCar}, {multi: true}, function (err,doc) {
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
    }
  });
});

// 故事评论添加
router.post("/add-remark", function (req,res,next) {
  // remarkId: 1,
  // userId: 1
  let postRemarks = [];
  User.findOne({_id: req.param("userId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      postRemarks = doc.postRemarks;
      postRemarks.push(req.param("remarkId"));
      User.update({_id: req.param("userId")}, {postRemarks: postRemarks}, {multi: true}, function (err,doc) {
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
    }
  });
});

// 故事评论删除
router.post("/remove-remark", function (req,res,next) {
  // remarkId: 1,
  // userId: 1
  let postRemarks = [];
  let remarkId = req.param("remarkId");
  User.findOne({_id: req.param("userId")}, function (err,doc) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
        data: {}
      });
    } else {
      postRemarks = doc.postRemarks;
      postRemarks.splice(postRemarks.indexOf(remarkId),1);
      User.update({_id: req.param("userId")}, {postRemarks: postRemarks}, {multi: true}, function (err,doc) {
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
    }
  });
});

module.exports = router;