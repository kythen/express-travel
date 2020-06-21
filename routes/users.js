var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/us', function(req, res, next) {
  res.send('us');
});

router.get('/uuap', function(res, res, next) {
  res.send('/uuap');
})

module.exports = router;
