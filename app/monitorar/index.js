"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monitorar = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _identificarDocumento = require("../classificador/identificarDocumento");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var arquivosHelper = require("../helpers/arquivos");

var path = require("path");

var googleapi = require("../vision/googleapi");

var imageSize = require("image-size");

var _require = require("child_process"),
    spawn = _require.spawn;

var util = require("util");

var criarpasta = util.promisify(_fs["default"].mkdirSync);
var moverarquivo = util.promisify(_fs["default"].renameSync);
var removerarquivo = util.promisify(_fs["default"].unlinkSync);

var tf = require("@tensorflow/tfjs-node");

var automl = require("@tensorflow/tfjs-automl");

var monitorar = {
  analisarArquivo: analisarArquivo,
  loadModel: loadModel
};
exports.monitorar = monitorar;

function analisarArquivo(_x, _x2, _x3) {
  return _analisarArquivo.apply(this, arguments);
}

function _analisarArquivo() {
  _analisarArquivo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arquivo, raiz, model) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              if (arquivo) {
                var tipoArquivo = path.extname(arquivo) == ".pdf" ? "pdf" : path.extname(arquivo).toLocaleLowerCase() == ".jpeg" || path.extname(arquivo).toLocaleLowerCase() == ".jpg" || path.extname(arquivo).toLocaleLowerCase() == ".png" ? "imagem" : "";

                if (tipoArquivo == "imagem") {
                  var tratarIMG = tratarImagem(arquivo, raiz, model).then(function (retorno) {
                    resolve(retorno);
                  })["catch"](function (err) {
                    console.log(err);
                    reject(arquivo);
                  });
                  Promise.resolve(tratarIMG)["catch"](function (err) {
                    console.log(err);
                    reject(arquivo);
                  });
                } else if (tipoArquivo == "pdf") {
                  var tratarPDF = tratarPdf(arquivo, raiz).then(function (retorno) {
                    resolve(retorno);
                  });
                  Promise.resolve(tratarPDF)["catch"](function (err) {
                    console.log(err);
                    reject(arquivo);
                  });
                } else reject("Arquivo não suportado! =>" + arquivo);
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _analisarArquivo.apply(this, arguments);
}

function tratarPdf(_x4, _x5) {
  return _tratarPdf.apply(this, arguments);
}

function _tratarPdf() {
  _tratarPdf = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(arquivo, raiz) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var caminhoArquivo = path.join(path.dirname(arquivo), path.basename(arquivo, ".pdf"), path.basename(arquivo, ".pdf") + "_TEMPREMOVER_%03d.jpg");

              _fs["default"].mkdirSync(path.dirname(caminhoArquivo), {
                recursive: true
              }, function (err) {
                if (err) {
                  reject(err);
                }
              });

              var gsf = path.join(__dirname, "../src/gs/bin/gswin64.exe"); //const script = `-sDEVICE=jpeg -r300 -o ${caminhoArquivo} ${arquivo}`;

              var script = "c:/gs/bin/gswin64.exe -sDEVICE=jpeg -r300 -o ".concat(caminhoArquivo, " ").concat(arquivo);
              var gsC = "C:/gs/bin/gswin64.exe";
              var gsExecute = spawn(gsC, ["-sDEVICE=jpeg", "-r300", "-dGraphicsAlphaBits=4", "-dNOPAUSE", "-dBATCH", "-sOutputFile=".concat(caminhoArquivo.replace(path.sep, "/")), "".concat(arquivo.replace(path.sep, "/"))], {
                timeout: 60 * 1000
              });
              gsExecute.on("error", function () {
                reject({
                  local: arquivo
                });
              });
              gsExecute.on("disconnect", function () {
                reject({
                  local: arquivo
                });
              });
              gsExecute.on("close", function (code) {
                resolve({
                  local: arquivo
                });
              });
              gsExecute.on("exit", function (code) {
                resolve({
                  local: arquivo
                });
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _tratarPdf.apply(this, arguments);
}

function tratarImagem(_x6, _x7, _x8) {
  return _tratarImagem.apply(this, arguments);
}

function _tratarImagem() {
  _tratarImagem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(arquivo, raiz, model) {
    var predicoes, retorno;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return detectObject(arquivo, model);

          case 2:
            predicoes = _context3.sent;
            retorno = {
              cpf: path.basename(arquivo).substring(0, 11),
              local: arquivo,
              novoLocal: "",
              documento: predicoes.filter(function (i) {
                return i.label == "rg" || i.label == "cnh" || i.label == "cnh";
              }),
              movido: false
            };
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              if (retorno.documento.length > 0) {
                var novoPath = path.join(raiz, retorno.cpf);
                var criarPasta = criarpasta(novoPath, {
                  recursive: true
                }, function (err) {
                  if (err) {
                    console.log(err);
                    reject(_objectSpread(_objectSpread({}, retorno), {}, {
                      movido: false
                    }));
                  }
                });
                var mover = moverarquivo(retorno.local, path.join(novoPath, path.basename(retorno.local)), function (err) {
                  if (err) {
                    console.log(err);
                    reject(_objectSpread(_objectSpread({}, retorno), {}, {
                      movido: false
                    }));
                  }

                  resolve(_objectSpread(_objectSpread({}, retorno), {}, {
                    movido: true
                  }));
                });
                Promise.all([criarPasta, mover]);
                resolve(_objectSpread(_objectSpread({}, retorno), {}, {
                  movido: true
                }));
              } else {
                var _novoPath = path.join(raiz, "rejeitados");

                var _criarPasta = criarpasta(_novoPath, {
                  recursive: true
                }, function (err) {
                  if (err) {
                    console.log(err);
                    reject(_objectSpread(_objectSpread({}, retorno), {}, {
                      movido: false
                    }));
                  }
                });

                var _mover = moverarquivo(retorno.local, path.join(_novoPath, path.basename(retorno.local)), function (err) {
                  if (err) {
                    console.log(err);
                    reject(_objectSpread(_objectSpread({}, retorno), {}, {
                      movido: false
                    }));
                  }

                  resolve(_objectSpread(_objectSpread({}, retorno), {}, {
                    movido: false
                  }));
                });

                Promise.all([_criarPasta, _mover]);
                resolve(_objectSpread(_objectSpread({}, retorno), {}, {
                  movido: false
                }));
              }
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _tratarImagem.apply(this, arguments);
}

function readImage(_x9) {
  return _readImage.apply(this, arguments);
}

function _readImage() {
  _readImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(path) {
    var imgSize, img;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return imageSize(path);

          case 2:
            imgSize = _context4.sent;
            img = new Image(imgSize.width, imgSize.height);
            img.src = path;
            return _context4.abrupt("return", img);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _readImage.apply(this, arguments);
}

function detectObject(_x10, _x11) {
  return _detectObject.apply(this, arguments);
}

function _detectObject() {
  _detectObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(arquivo, model) {
    var img, options, predictions;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return readImage(arquivo);

          case 2:
            img = _context5.sent;
            options = {
              score: 0.5,
              iou: 0.5,
              topk: 20
            };
            _context5.next = 6;
            return model.detect(img, options);

          case 6:
            predictions = _context5.sent;
            console.log(predictions);
            return _context5.abrupt("return", predictions);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _detectObject.apply(this, arguments);
}

function loadModel() {
  return _loadModel.apply(this, arguments);
}

function _loadModel() {
  _loadModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var modelJson;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            modelJson = "./assets/model/model.json";
            _context6.next = 3;
            return automl.loadObjectDetection(modelJson);

          case 3:
            return _context6.abrupt("return", _context6.sent);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _loadModel.apply(this, arguments);
}