"use strict";

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = _interopRequireDefault(require("../models"));

var _controller = require("../controller");

var _logger = require("../logger");

var _elastic = require("../controller/elastic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var dal = new _controller.DALController();
var elastic = new _elastic.ElasticService();

var userColl = _mongoose["default"].model('user', _models["default"]);

function findAll(filter, sort, limit, coll, res) {
  dal.findAll(filter, sort, limit, coll).then(function (docs) {
    _logger.logger.debug(docs);

    res.status(200).send(docs);
  })["catch"](function (err) {
    _logger.logger.error(err);

    res.status(500).send(err.message);
  });
}

router.get('/', function (req, res) {
  _logger.logger.info("GET /user");

  findAll({}, {
    '_id': 'desc'
  }, null, userColl, res);
});
router.get('/test', function (req, res) {
  res.render('index');
});
router.get('/:id', function (req, res) {
  _logger.logger.info("GET /user/".concat(req.params.id));

  findAll({
    '_id': req.params.id
  }, {
    '_id': 'desc'
  }, 1, userColl, res);
});
router.put('/:id', function (req, res) {
  _logger.logger.info("PUT /user/".concat(req.params.id));

  dal.findOneAndUpdate({
    '_id': req.params.id
  }, {
    'name': 'test deprecate'
  }, {
    'new': true
  }, userColl).then(function (docs) {
    _logger.logger.debug(docs);

    res.status(200).send(docs);
  })["catch"](function (err) {
    _logger.logger.error(err);

    res.status(500).send(err.message);
  });
});
router.post('/', function (req, res) {
  _logger.logger.info("POST /user");

  _logger.logger.info("req : ".concat(JSON.stringify(req.body)));

  var newUser = new userColl(req.body);
  dal.save(newUser).then(function (docs) {
    _logger.logger.debug(docs);

    res.status(200).send(docs);
    elastic.saveUser(req.body);
  })["catch"](function (err) {
    _logger.logger.error(err);

    res.status(500).send(err.message);
  });
});
router.post('/getUserById', function (req, res) {
  _logger.logger.info("POST /getUserByID");

  _logger.logger.info("req : ".concat(req.body.id));

  dal.findAll({
    '_id': req.body.id
  }, {
    '_id': 'desc'
  }, null, userColl).then(function (docs) {
    _logger.logger.debug(docs);

    var users = '<table><thead><td>id</td><td>name</td><td>text</td></thead><tbody>';
    docs.forEach(function (doc) {
      users += '<tr><td>' + doc._id + '</td><td>' + doc.username + '</td><td>' + doc.text + '</td></tr>';
    });
    users += '</tbody></table>';
    res.status(200).send(users);
  })["catch"](function (err) {
    _logger.logger.info(err);

    res.status(500).send(err.message);
  });
});
module.exports = router;
//# sourceMappingURL=user.js.map