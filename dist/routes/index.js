"use strict";

var _express = require("express");

var _config = require("../../config");

var _user = _interopRequireDefault(require("./user"));

var _activity = _interopRequireDefault(require("./activity"));

var _logger = require("../logger");

var _luxon = require("luxon");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var router = (0, _express.Router)();
router.use('/user', _user["default"]);
router.use('/activity', _activity["default"]);
router.get('/', function (req, res) {
  return res.send({
    'text': _config.finalConfig.name
  });
});
router.get('/time', function (req, res) {
  var today = {
    date: null,
    time: _momentTimezone["default"].tz(new Date(), 'Asia/Bangkok')
  };

  _logger.logger.debug(today.time.toString());

  _logger.logger.debug(_typeof(today.time));

  res.send({
    time: today.time.format()
  });
});
module.exports = router;
//# sourceMappingURL=index.js.map