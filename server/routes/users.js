var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 此为users下的一个子路由test
router.get('/test', function(req, res, next) {
  res.send('test');
});

module.exports = router;
