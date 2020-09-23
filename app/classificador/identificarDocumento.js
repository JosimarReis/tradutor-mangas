"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identificarDocumento = void 0;

var _stringSimilarity = _interopRequireDefault(require("string-similarity"));

var _helpers = require("../helpers");

var _classificador = require("./classificador");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var identificarDocumento = {
  conferir: conferir
};
exports.identificarDocumento = identificarDocumento;

function conferir(_x) {
  return _conferir.apply(this, arguments);
}

function _conferir() {
  _conferir = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(wordList) {
    var retorno, arrayPalavras, result, i, doc, maior, count, _iterator, _step, d, maior2, classificacao;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            retorno = {
              cpf: "",
              maior: _classificador.classificador.documentos[0],
              resultados: [],
              count: 0
            };
            _context.next = 4;
            return (0, _helpers.stringToArray)(wordList);

          case 4:
            arrayPalavras = _context.sent;
            result = [];

            for (i = 0; i < _classificador.classificador.documentos.length; i++) {
              doc = confereDoc(arrayPalavras.palavras, _classificador.classificador.documentos[i]);
              if (doc) result.push(doc);
            }

            if (result.length == 0) result.push(_classificador.classificador.documentos[0]);
            maior = result[0];
            count = result.filter(function (c) {
              if (c.rating > 0.5) return c;
            });

            if (result) {
              _iterator = _createForOfIteratorHelper(result);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  d = _step.value;
                  if (d.resultado.length > maior.resultado.length && d.rating > maior.rating || d.resultado.length > maior.resultado.length) maior = d;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            maior2 = !result ? _classificador.classificador.documentos[0] : result.filter(function (r) {
              return r.rating == Math.max.apply(Math, _toConsumableArray(result.map(function (c) {
                return c.rating;
              })));
            });
            classificacao = maior.document == maior2[0].document ? maior2[0] : _classificador.classificador.documentos[0];
            retorno = {
              cpf: (0, _helpers.removePontos)(arrayPalavras.cpf),
              maior: maior2[0],
              resultados: result,
              count: count.length
            };
            return _context.abrupt("return", retorno);

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              cpf: "",
              maior: _classificador.classificador.documentos[0],
              resultados: [],
              count: 0
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));
  return _conferir.apply(this, arguments);
}

function confereDoc(palavras, documento) {
  var resultado = [];
  var rating = 0;
  if (documento.keywords.length > 0) for (var i = 0; i < palavras.length; i++) {
    var similar = _stringSimilarity["default"].findBestMatch(palavras[i], documento.keywords);

    if (similar.bestMatch.rating > 0.35) {
      rating += similar.bestMatch.rating;
      resultado.push({
        palavra: palavras[i],
        comparacao: similar
      });
    }
  }
  if (resultado.length == 0) return;
  rating = rating / resultado.length;
  return {
    documento: documento.document,
    palavras: palavras.length,
    resultado: resultado,
    rating: rating != NaN ? rating : 0
  };
}