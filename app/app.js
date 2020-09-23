"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _SelecionarDiretorio = _interopRequireDefault(require("./SelecionarDiretorio"));

var _arquivos = require("./helpers/arquivos");

var _electron = _interopRequireWildcard(require("electron"));

var _AnalisarImagens = require("./analise/AnalisarImagens");

var _DetalhesDiretorio = _interopRequireDefault(require("./DetalhesDiretorio"));

var _Estruturados = _interopRequireDefault(require("./Estruturados"));

var _monitorar = require("./monitorar");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dialog = _electron["default"].remote;

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loading: false,
      model: "",
      progresso: {
        sucesso: 0,
        parar: false,
        progresso: 0,
        atual: 0,
        total: 0,
        progresso2: 0,
        atual2: 0,
        total2: 0,
        loading: false,
        pdf: false
      },
      caminho: {
        local: "",
        pastas: [],
        arquivos: {
          imagens: 0,
          pdfs: 0
        }
      },
      options: {
        imagens: false,
        pdf: false
      },
      logs: ["Arguardando seleção da pasta..."],
      logText: "Arguardando seleção da pasta..."
    });

    _defineProperty(_assertThisInitialized(_this), "getModel", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var model;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _monitorar.monitorar.loadModel();

            case 2:
              model = _context.sent;

              _this.setState({
                model: model
              });

              console.log(_this.state.model);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "log", function (msg) {
      var logs = _this.state.logs;
      var data = new Date().toLocaleDateString("pt-BR");
      logs.unshift("[".concat(data, "]").concat(msg));
      var logText = logs.join("\n");

      _this.setState({
        logs: logs,
        logText: logText
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renomearPastas", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var estruturados;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              estruturados = _this.state.caminho.estruturados;
              _context2.next = 3;
              return _arquivos.arquivos.renomearPastas(estruturados);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "pararProgresso", function () {
      if (confirm("Tem certeza que deseja parar a tarefa atual?")) {
        _this.log("Tem certeza que deseja parar a tarefa atual? SIM");

        _this.log("Processo cancelado.");

        _this.setState({
          caminho: _this.state.caminho,
          options: {
            imagens: false,
            pdf: false
          },
          loading: false,
          progresso: {
            parar: true,
            progresso: 0,
            sucesso: 0,
            atual: 0,
            total: 0,
            progresso2: 0,
            atual2: 0,
            total2: 0,
            loading: false,
            pdf: false
          }
        });
      } else {
        _this.log("Tem certeza que deseja parar a tarefa atual? NÃO");

        _this.log("continuando o trabalho...");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "localizarEstruturados", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var local,
          caminho,
          pastasEstruturadas,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              local = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : "";

              if (!_this.state.caminho) {
                _context3.next = 7;
                break;
              }

              caminho = _this.state.caminho;
              _context3.next = 5;
              return _arquivos.arquivos.localizarEstruturas(caminho.local);

            case 5:
              pastasEstruturadas = _context3.sent;

              if (pastasEstruturadas) {
                _this.setState({
                  caminho: _objectSpread(_objectSpread({}, caminho), {}, {
                    estruturados: pastasEstruturadas
                  })
                });

                _this.renomearPastas();
              }

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "selecionarCaminhoListarArquivos", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(local) {
        var options,
            caminho,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {
                  imagens: true,
                  pdf: true
                };

                _this.log("Pasta selecionada: " + local);

                _this.log("Buscando os arquivos. Por favor aguarde. ");

                _this.setState({
                  loading: true
                });

                _this.setState({
                  options: options
                });

                if (local) {
                  _context4.next = 9;
                  break;
                }

                _this.setState({
                  loading: false,
                  caminho: {
                    local: "",
                    pastas: [],
                    arquivos: {
                      imagens: [],
                      pdfs: []
                    }
                  },
                  progresso: {
                    parar: false,
                    loading: false,
                    progresso: 0,
                    sucesso: 0,
                    atual: 0,
                    progresso2: 0,
                    atual2: 0,
                    total2: 0,
                    total: 0
                  }
                });

                _context4.next = 14;
                break;

              case 9:
                _context4.next = 11;
                return _arquivos.arquivos.localizarArquivosPorPastas(local, options);

              case 11:
                caminho = _context4.sent;

                ///let caminho = { local: local, arquivos: arquivosLocalizados };
                _this.setState({
                  loading: false,
                  caminho: caminho,
                  progresso: {
                    parar: false,
                    loading: false,
                    progresso: 0,
                    sucesso: 0,
                    atual: 0,
                    total: 0,
                    progresso2: 0,
                    atual2: 0,
                    total2: 0
                  }
                });

                _this.log("Foi encontrado na pasta: ".concat(caminho.arquivos.pdfs, " PDFs e ").concat(caminho.arquivos.imagens, " imagens.")); //  this.monitorarArquivos();


              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "extrairPDF", function () {
      if (!_this.state.caminho.arquivos.pdfs.length || _this.state.caminho.arquivos.pdfs.length == 0) alert("Não há nada a ser convertido!");else {
        _this.log("Convertendo os arquivos PDF em imagens. Varias janelas serão abertas, por favor aguarde.");

        _this.setState({
          options: {
            pdf: true,
            imagens: false
          }
        });

        _this.monitorarArquivos(true);
      }
      return;
    });

    _defineProperty(_assertThisInitialized(_this), "organizarArquivos", function () {
      if (_this.state.caminho.arquivos.imagens == 0) _this.log("Não há nada a ser organizado!");else {
        _this.log("Analisando as imagens para organizá-las. Essa tarefa pode demorar, dependendo da quantidade de arquivos existentes");

        _this.setState({
          options: {
            pdf: false,
            imagens: true
          }
        });

        _this.monitorarArquivos(false);
      }
      return;
    });

    _defineProperty(_assertThisInitialized(_this), "monitorarArquivos", function () {
      var pdf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      _this.setState({
        loading: true
      });

      _this.percorrerArquivos(0, 0, pdf); //    if(!pdf) this.listarPastas()


      if (pdf) {
        _this.selecionarCaminhoListarArquivos(_this.state.local, {
          imagens: true,
          pdf: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "listarPastas", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _iterator, _step, pasta;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(_this.state.caminho.pastas.length > 0)) {
                _context5.next = 20;
                break;
              }

              _this.log("Removendo as pastas vazias. Por favor aguarde.");

              _iterator = _createForOfIteratorHelper(_this.state.caminho.pastas);
              _context5.prev = 3;

              _iterator.s();

            case 5:
              if ((_step = _iterator.n()).done) {
                _context5.next = 11;
                break;
              }

              pasta = _step.value;
              _context5.next = 9;
              return _arquivos.arquivos.removerPastasVazias(pasta);

            case 9:
              _context5.next = 5;
              break;

            case 11:
              _context5.next = 16;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](3);

              _iterator.e(_context5.t0);

            case 16:
              _context5.prev = 16;

              _iterator.f();

              return _context5.finish(16);

            case 19:
              _this.log("Pastas vazias removidas.");

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[3, 13, 16, 19]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "percorrerArquivos", function (posicaoPasta, posicaoArquivo) {
      var pdf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (_this.state.progresso.parar) {
        _this.log("Parada solicitada.");

        return;
      }

      if (posicaoPasta == _this.state.caminho.pastas.length && _this.state.caminho.pastas.length > 0) {
        _this.log("".concat(sucesso, " imagem processados com sucesso."));

        return;
      } else if (_this.state.caminho.pastas.length == 0) {
        _this.log("Não existe pastas ou arquivos no local selecionado.");

        return;
      }

      var tamanhoPasta = _this.state.caminho.pastas.length;
      var tamanhoArquivos = pdf ? _this.state.caminho.pastas[posicaoPasta].arquivos.pdfs.length : _this.state.caminho.pastas[posicaoPasta].arquivos.imagens.length;
      var arquivo = pdf ? _this.state.caminho.pastas[posicaoPasta].arquivos.pdfs[posicaoArquivo] : _this.state.caminho.pastas[posicaoPasta].arquivos.imagens[posicaoArquivo];
      var sucesso = posicaoPasta == 0 && posicaoArquivo == 0 ? 0 : _this.state.progresso.sucesso;

      if (posicaoPasta < tamanhoPasta && tamanhoArquivos == 0) {
        if (posicaoPasta == tamanhoPasta - 1 && tamanhoArquivos == 0) return;else return _this.percorrerArquivos(posicaoPasta + 1, 0, pdf);
      }

      var progresso = {
        parar: false,
        loading: posicaoPasta + 1 < tamanhoPasta && posicaoArquivo < tamanhoArquivos ? true : false,
        progresso: (posicaoArquivo + 1 / tamanhoArquivos) * 100,
        atual: posicaoArquivo,
        total: tamanhoArquivos,
        progresso2: (posicaoPasta + 1 / tamanhoPasta) * 100,
        atual2: posicaoPasta,
        total2: tamanhoPasta,
        sucesso: sucesso,
        pdf: pdf
      };
      console.log("pasta ".concat(posicaoPasta, "|").concat(tamanhoPasta, ", arquivos ").concat(posicaoArquivo, "|").concat(tamanhoArquivos));

      _electron["default"].remote.getCurrentWindow().setProgressBar(progresso.progresso2 / 100);

      _this.setState({
        loading: progresso.loading,
        progresso: progresso
      });

      var logPosicao = "[".concat(progresso.atual2 + 1, "][").concat(progresso.atual + 1, "/").concat(tamanhoArquivos, "]: ");
      logPosicao += pdf ? " Convertendo o arquivo pdf. " : " Analisando imagem. ";
      if (posicaoArquivo < tamanhoArquivos) _this.log(logPosicao);
      return _monitorar.monitorar.analisarArquivo(arquivo, _this.state.caminho.local, _this.state.model).then(function (resolve) {
        logPosicao = "[".concat(progresso.atual2 + 1, "][").concat(progresso.atual + 1, "/").concat(tamanhoArquivos, "]:");
        console.log("retorno da solicitacao", resolve);

        if (resolve.movido) {
          progresso.sucesso++;

          _this.setState({
            progresso: progresso
          });

          _this.log(logPosicao + "  Documento identificado e movido para a pasta correta");
        } else if (pdf) {
          _this.log(logPosicao + " Arquivo convertido");
        } else _this.log(logPosicao + "  Documento não identificado e/ou não atende os padrões de seleção");
      })["catch"](function (err) {
        console.log("error", err);
        logPosicao = "[".concat(progresso.atual2 + 1, "][").concat(progresso.atual + 1, "/").concat(tamanhoArquivos, "]:");

        _this.log(logPosicao + "  Documento não identificado e/ou não atende os padrões de seleção");
      })["finally"](function () {
        if (posicaoPasta == tamanhoPasta - 1 && posicaoArquivo == tamanhoArquivos - 1) {
          if (_this.state.options.pdf == true && _this.state.options.imagens == false && posicaoArquivo == tamanhoArquivos) {
            _this.selecionarCaminhoListarArquivos(_this.state.caminho.local, {
              imagens: true,
              pdf: false
            });
          }

          return;
        }

        if (posicaoPasta < tamanhoPasta && posicaoArquivo == tamanhoArquivos - 1) return _this.percorrerArquivos(posicaoPasta + 1, 0, pdf);
        if (posicaoPasta < tamanhoPasta && posicaoArquivo < tamanhoArquivos) return _this.percorrerArquivos(posicaoPasta, posicaoArquivo + 1, pdf);
      });
    });

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getModel();

      _electron.ipcRenderer.send("state", this.state);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      _electron.ipcRenderer.send("state", this.state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.state);
      return /*#__PURE__*/_react["default"].createElement(_core.Container, null, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "h6",
        gutterBottom: true
      }, "Organizar Documentos"), /*#__PURE__*/_react["default"].createElement(_SelecionarDiretorio["default"], {
        loading: this.state.loading,
        abrirPasta: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          var local;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _this2.setState({
                    loading: true
                  });

                  _context6.next = 3;
                  return _arquivos.arquivos.selecionarPasta();

                case 3:
                  local = _context6.sent;
                  if (local) _this2.selecionarCaminhoListarArquivos(local, {
                    imagens: true,
                    pdf: true
                  });

                  _this2.setState({
                    loading: false
                  });

                case 6:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        })),
        caminho: this.state.caminho
      }), /*#__PURE__*/_react["default"].createElement(_DetalhesDiretorio["default"], _defineProperty({
        carregandoDiretorio: this.state.loading,
        pararProgresso: this.pararProgresso,
        caminho: this.state.caminho,
        options: this.state.options,
        processar: this.analisar,
        progresso: this.state.progresso,
        progress: this.progresso,
        extrairPDF: this.extrairPDF,
        organizarArquivos: this.organizarArquivos
      }, "options", this.state.options)), /*#__PURE__*/_react["default"].createElement(_Estruturados["default"], {
        log: this.state.logs,
        logText: this.state.logText
      }), this.state.logText);
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;