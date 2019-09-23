"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticService = void 0;

var _logger = require("../logger");

var _config = require("../../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('@elastic/elasticsearch'),
    Client = _require.Client;

var client = new Client({
  node: _config.finalConfig.ELASTIC_URL
});
var userMapping = {
  "properties": {
    "username": {
      "type": "text"
    },
    "text": {
      "type": "text"
    }
  }
};
var activityMapping = {
  "properties": {
    "username": {
      "type": "text"
    },
    "location": {
      "properties": {
        "coordinates": {
          "type": 'geo_point'
        }
      }
    }
  }
};

function insertUser(_x) {
  return _insertUser.apply(this, arguments);
}

function _insertUser() {
  _insertUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(user) {
    var indexStr, haveIndex;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            indexStr = "user-".concat(user.username);

            _logger.logger.info(user);

            haveIndex = false;
            _context.prev = 3;
            _context.next = 6;
            return client.indices.exists({
              index: indexStr
            });

          case 6:
            if (_context.sent) {
              _context.next = 11;
              break;
            }

            _logger.logger.debug("try create index: [".concat(indexStr, "]"));

            _context.next = 10;
            return client.indices.create({
              index: indexStr,
              body: {
                mappings: userMapping,
                settings: {}
              }
            });

          case 10:
            _logger.logger.info("create index: [".concat(indexStr, "] success"));

          case 11:
            haveIndex = true;
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);

            if (_context.t0.body !== undefined && _context.t0.body.error !== undefined) {
              if (_context.t0.body.error.type === 'resource_already_exists_exception') {
                haveIndex = true;

                _logger.logger.debug("create index: [".concat(indexStr, "] already exist"));
              } else {
                _logger.logger.info("cannot create index: ", _context.t0.body);
              }
            } else {
              _logger.logger.error("error is undefined" + _context.t0);
            }

          case 17:
            if (!haveIndex) {
              _context.next = 28;
              break;
            }

            _context.prev = 18;
            _context.next = 21;
            return client.index({
              index: indexStr,
              type: '_doc',
              refresh: true,
              body: user
            });

          case 21:
            _logger.logger.debug("insert user: " + JSON.stringify(user) + " success");

            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](18);
            console.log("from elastic", JSON.stringify(_context.t1));

            _logger.logger.error("cannot insert user: ", _context.t1.body.error.type);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14], [18, 24]]);
  }));
  return _insertUser.apply(this, arguments);
}

function insertActivity(_x2) {
  return _insertActivity.apply(this, arguments);
}

function _insertActivity() {
  _insertActivity = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(activity) {
    var indexStr, haveIndex, indexExists;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            indexStr = "activity-".concat(activity.username);

            _logger.logger.info('activity', activity);

            haveIndex = false;
            _context2.prev = 3;
            _context2.next = 6;
            return client.indices.exists({
              index: indexStr
            });

          case 6:
            indexExists = _context2.sent;
            haveIndex = indexExists.body;

            if (haveIndex) {
              _context2.next = 14;
              break;
            }

            _logger.logger.debug("try create index: [".concat(indexStr, "]"));

            _context2.next = 12;
            return client.indices.create({
              index: indexStr,
              body: {
                mappings: activityMapping,
                settings: {}
              }
            });

          case 12:
            _logger.logger.info("create index: [".concat(indexStr, "] success"));

            haveIndex = true;

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](3);

            if (_context2.t0.body !== undefined && _context2.t0.body.error !== undefined) {
              if (_context2.t0.body.error.type === 'resource_already_exists_exception') {
                haveIndex = true;

                _logger.logger.debug("create index: [".concat(indexStr, "] already exist"));
              } else {
                _logger.logger.info("cannot create index: ", _context2.t0.body);
              }
            } else {
              _logger.logger.error("error is undefined" + _context2.t0);
            }

          case 19:
            if (!haveIndex) {
              _context2.next = 30;
              break;
            }

            _context2.prev = 20;
            _context2.next = 23;
            return client.index({
              index: indexStr,
              type: '_doc',
              refresh: true,
              body: activity
            });

          case 23:
            _logger.logger.debug("insert activity: " + JSON.stringify(activity) + " success");

            _context2.next = 30;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t1 = _context2["catch"](20);
            console.log("from elastic", JSON.stringify(_context2.t1));

            _logger.logger.error("cannot insert activity: ", _context2.t1.body.error.type);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 16], [20, 26]]);
  }));
  return _insertActivity.apply(this, arguments);
}

var ElasticService = function ElasticService() {
  _classCallCheck(this, ElasticService);

  this.indexTable = {};
  this.saveUser = insertUser;
  this.saveActivity = insertActivity; //this.update = elastic_update;
};

exports.ElasticService = ElasticService;
//# sourceMappingURL=elastic.js.map