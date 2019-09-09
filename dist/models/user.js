"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: String,
  text: String
}, {
  strict: false
});

var userModel = _mongoose["default"].model('user', userSchema);

exports.userModel = userModel;
//# sourceMappingURL=user.js.map