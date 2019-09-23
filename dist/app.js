"use strict";

var _logger = require("./logger");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

var _database = _interopRequireDefault(require("./database"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(_express["default"]["static"](__dirname + '/public'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/', _routes["default"]);
var server = app.listen(_config.finalConfig.port, function () {
  _logger.logger.info("server is running on port ".concat(_config.finalConfig.port, " and in ").concat(_config.finalConfig.name, " mode"));
});
module.exports = server;
module.exports.db = _database["default"];
//# sourceMappingURL=app.js.map