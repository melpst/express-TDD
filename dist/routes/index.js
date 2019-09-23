"use strict";

var _express = require("express");

var _config = require("../../config");

var _user = _interopRequireDefault(require("./user"));

var _activity = _interopRequireDefault(require("./activity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/user', _user["default"]);
router.use('/activity', _activity["default"]);
router.get('/', function (req, res) {
  return res.send({
    'text': _config.finalConfig.name
  });
});
module.exports = router;
//# sourceMappingURL=index.js.map