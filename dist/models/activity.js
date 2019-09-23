"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acitvityModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var activitySchema = new Schema({
  username: String,
  location: {
    coordinates: [Number]
  }
}, {
  strict: false
});

var acitvityModel = _mongoose["default"].model('activity', activitySchema);

exports.acitvityModel = acitvityModel;
//# sourceMappingURL=activity.js.map