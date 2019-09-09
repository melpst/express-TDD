"use strict";

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = _interopRequireDefault(require("../models"));

var _controller = require("../controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var dal = new _controller.DALController();

var userColl = _mongoose["default"].model('user', _models["default"]);

function findAll(filter, sort, limit, coll, res) {
  dal.findAll(filter, sort, limit, coll).then(function (docs) {
    // console.log(docs)
    res.status(200).send(docs);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err.message);
  });
}

router.get('/', function (req, res) {
  findAll({}, {
    '_id': 'desc'
  }, null, userColl, res);
});
router.get('/test', function (req, res) {
  return res.render('index');
});
router.get('/:id', function (req, res) {
  // findAll({'_id': req.params.id}, {'_id': 'desc'}, 1, userColl, res)
  dal.findAll({
    '_id': req.params.id
  }, {
    '_id': 'desc'
  }, 1, userColl).then(function (docs) {
    console.log(docs);
    res.render('all', {
      users: docs
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err.message);
  });
});
router.put('/:id', function (req, res) {
  dal.findOneAndUpdate({
    '_id': req.params.id
  }, {
    'name': 'test deprecate'
  }, {
    'new': true
  }, userColl).then(function (docs) {
    console.log(docs);
    res.status(200).send(docs);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err.message);
  });
});
router.post('/', function (req, res) {
  console.log(req.body);
  var newUser = new userColl(req.body);
  dal.save(newUser).then(function (docs) {
    console.log(docs);
    res.status(200).send(docs);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err.message);
  });
});
router.post('/getUserById', function (req, res) {
  console.log(req.body);
  dal.findAll({
    '_id': req.body.id
  }, {
    '_id': 'desc'
  }, null, userColl).then(function (docs) {
    console.log(docs);
    var users = '<table><thead><td>id</td><td>name</td><td>text</td></thead><tbody>';
    docs.forEach(function (doc) {
      users += '<tr><td>' + doc._id + '</td><td>' + doc.username + '</td><td>' + doc.text + '</td></tr>';
    });
    users += '</tbody></table>';
    res.status(200).send(users);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err.message);
  });
});
module.exports = router;
//# sourceMappingURL=user.js.map