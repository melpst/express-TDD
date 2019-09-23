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

var activityColl = _mongoose["default"].model('activity', _models["default"]);

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
  _logger.logger.info("GET /activity");

  findAll({}, {
    '_id': 'desc'
  }, null, activityColl, res);
});
router.post('/', function (req, res) {
  _logger.logger.info("POST /activity");

  _logger.logger.info("req : ".concat(JSON.stringify(req.body)));

  var newactivity = new activityColl(req.body);
  dal.save(newactivity).then(function (docs) {
    _logger.logger.debug(docs);

    res.status(200).send(docs);
    elastic.saveActivity(req.body);
  })["catch"](function (err) {
    _logger.logger.error(err);

    res.status(500).send(err.message);
  });
});
module.exports = router;
//# sourceMappingURL=activity.js.map