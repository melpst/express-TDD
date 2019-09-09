"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = require('debug')('server:debug');

_mongoose["default"].connect(process.env.MONGODB_URL + _config["default"].get('database'), {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(function () {
  return console.log('connected');
})["catch"](function (err) {
  return console.log(err);
});

var app = (0, _express["default"])();
app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(_express["default"]["static"](__dirname + '/public'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/', _routes["default"]);
app.listen(4000, function () {
  debug("server is running on port ".concat(_config["default"].get('port'), " and in ").concat(_config["default"].get('name'), " mode"));
  console.log("server is running on port ".concat(_config["default"].get('port'), " and in ").concat(_config["default"].get('name'), " mode"));
});
console.log(app.get('port'));
//# sourceMappingURL=app.js.map