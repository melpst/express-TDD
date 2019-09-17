"use strict";

var _express = require("express");

var _config = _interopRequireDefault(require("config"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/user', _user["default"]);
router.get('/', function (req, res) {
  return res.send({
    'text': _config["default"].get('name')
  });
});
module.exports = router;
//# sourceMappingURL=index.js.map