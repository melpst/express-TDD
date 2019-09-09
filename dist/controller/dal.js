"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DALController = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DALController =
/*#__PURE__*/
function () {
  function DALController() {
    _classCallCheck(this, DALController);
  }

  _createClass(DALController, [{
    key: "findAll",
    value: function () {
      var _findAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(filter, sort, limit, coll) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", coll.find(filter).sort(sort).limit(limit).exec());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findAll(_x, _x2, _x3, _x4) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(newDoc) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", newDoc.save());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function save(_x5) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "findOneAndUpdate",
    value: function () {
      var _findOneAndUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(filter, update, options, coll) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", coll.findOneAndUpdate(filter, update, options));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function findOneAndUpdate(_x6, _x7, _x8, _x9) {
        return _findOneAndUpdate.apply(this, arguments);
      }

      return findOneAndUpdate;
    }()
  }]);

  return DALController;
}();

exports.DALController = DALController;
//# sourceMappingURL=dal.js.map