"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arquivos = void 0;

var _stream = require("stream");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var electron = require("electron").remote;

var dialog = electron.dialog;

var path = require("path");

var fs = require("fs");

var CPF = require("cpf");

var Finder = require("fs-finder");

var arquivos = {
  localizarEstruturas: localizarEstruturas,
  selecionarPasta: selecionarPasta,
  localizarArquivos: localizarArquivos,
  localizarArquivosPorPastas: localizarArquivosPorPastas,
  renomearPastas: renomearPastas,
  percorrerPastas: percorrerPastas,
  removerPastasVazias: removerPastasVazias
};
exports.arquivos = arquivos;

function removerPastasVazias(caminho) {
  Finder["in"](caminho).findDirectories(function (pastas) {
    for (var i = 0; i < pastas.length; i++) {
      fs.rmdirSync(pastas[i], function (err) {
        return console.log(err);
      });
    }
  });
}

function localizarEstruturas(caminho) {
  var estruturas = [];
  percorrerPastas(caminho, function (caminhoArquivo) {
    if (path.basename(caminhoArquivo).toLocaleLowerCase() == "estrutura.xls" || path.basename(caminhoArquivo).toLocaleLowerCase() == "estrutura.xlsx") {
      estruturas.push(caminhoArquivo);
    }
  });
  "";
  return estruturas;
}

function walkSync(dir, filelist) {
  var fs = fs || require("fs"),
      files = fs.readdirSync(dir);

  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + "/" + file).isDirectory()) {
      filelist = walkSync(dir + "/" + file, filelist);
    } else {
      if (path.extname(file).toLocaleLowerCase() == ".pdf" || path.extname(file).toLocaleLowerCase() == ".jpeg" || path.extname(file).toLocaleLowerCase() == ".jpg" || path.extname(file).toLocaleLowerCase() == ".png") {
        filelist.push(path.join(dir, file));
      } ///    filelist.push(file);

    }
  });
  return filelist;
}

function localizarArquivos(caminho) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    imagens: true,
    pdf: true
  };
  var pastas = Finder["in"](caminho).findDirectories();
  var arquivos = [];
  percorrerPastas(caminho, function (caminhoArquivo) {
    // const fileContents = fs.readFileSync(caminhoArquivo, 'utf8');
    //      path.extname(caminhoArquivo).toLocaleLowerCase() == ".pdf" ||
    if (options.imagens && options.pdf) if (path.extname(caminhoArquivo).toLocaleLowerCase() == ".pdf" || path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpeg" || path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpg" || path.extname(caminhoArquivo).toLocaleLowerCase() == ".png") arquivos.push(caminhoArquivo);
    if (!options.imagens && options.pdf) if (path.extname(caminhoArquivo).toLocaleLowerCase() == ".pdf") arquivos.push(caminhoArquivo);
    if (options.imagens && !options.pdf) if (path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpeg" || path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpg" || path.extname(caminhoArquivo).toLocaleLowerCase() == ".png") arquivos.push(caminhoArquivo);
  });
  return {
    local: caminho,
    pastas: pastas,
    arquivos: {
      imagens: arquivos.filter(function (a) {
        return path.extname(a) != ".pdf";
      }),
      pdfs: arquivos.filter(function (a) {
        return path.extname(a) == ".pdf";
      })
    }
  };
}

function localizarArquivosPorPastas(caminho) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    imagens: true,
    pdf: true
  };
  var pastas = Finder["in"](caminho).findDirectories();
  var arquivosLocalizados = {
    imagens: 0,
    pdfs: 0
  };
  var diretorios = [];

  if (pastas.length > 0) {
    var _iterator = _createForOfIteratorHelper(pastas),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var pasta = _step.value;
        if (pasta.search("rejeitados") != -1) continue;
        var dir = {
          local: pasta,
          arquivos: {
            imagens: [],
            pdf: []
          }
        };

        var _arquivos = walkSync(pasta); //retornar apenas as 10 primeiras imagens de cada pasta


        dir.arquivos.imagens = options.imagens ? _arquivos.filter(function (a, i) {
          return i < 10 && path.extname(a) != ".pdf";
        }) : [];
        dir.arquivos.pdf = options.pdf ? _arquivos.filter(function (a) {
          return path.extname(a) == ".pdf";
        }) : [];
        arquivosLocalizados.imagens += dir.arquivos.imagens.length;
        arquivosLocalizados.pdfs += dir.arquivos.pdf.length;
        diretorios.push(dir);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  if (pastas.length == 0) {
    var _dir = {
      local: caminho,
      arquivos: {
        imagens: [],
        pdf: []
      }
    };

    var _arquivos2 = walkSync(caminho); //retornar apenas as 10 primeiras imagens de cada pasta


    _dir.arquivos.imagens = options.imagens ? _arquivos2.filter(function (a, i) {
      return i < 10 && path.extname(a) != ".pdf";
    }) : [];
    _dir.arquivos.pdf = options.pdf ? _arquivos2.filter(function (a) {
      return path.extname(a) == ".pdf";
    }) : [];
    arquivosLocalizados.imagens += _dir.arquivos.imagens.length;
    arquivosLocalizados.pdfs += _dir.arquivos.pdf.length;
    diretorios.push(_dir);
  }

  return {
    local: caminho,
    pastas: diretorios,
    arquivos: arquivosLocalizados
  };
}

function percorrerPastas(dir, callback) {
  fs.readdirSync(dir).forEach(function (f) {
    var dirCaminho = path.join(dir, f);
    var isDirectory = fs.statSync(dirCaminho).isDirectory();
    isDirectory ? percorrerPastas(dirCaminho, callback) : callback(path.join(dir, f));
  });
}

function selecionarPasta() {
  return dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "Selecione a pasta onde contém os arquivos a serem verificados"
  }).then(function (result) {
    if (result.canceled) return;
    if (!result.filePaths) return;
    return result.filePaths[0];
  })["catch"](function (err) {
    return;
  });
}

function salvarArquivo() {
  dialog.showSaveDialog({
    defaultPath: "".concat(result.filePaths[0], "\\").concat(nomeResultado),
    filters: [{
      name: "Planilhas Excel",
      extensions: ["xlsx", "xls"]
    }],
    title: "Nome do arquivo a ser gerado"
  }).then(function (res) {
    if (res.canceled) throw "";
    lerArquivos(result.filePaths[0], res.filePath);
  })["catch"](function (err) {
    alert("Operação cancelada.");
  });
}

function renomearPastas(_x) {
  return _renomearPastas.apply(this, arguments);
}

function _renomearPastas() {
  _renomearPastas = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arquivos) {
    var _loop, i;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return arquivoEstruturado(arquivos[i]).then(function (result) {
                        var r = result[Object.keys(result)[0]];
                        var nomeNovo = r[0].CPF;
                        var nomeAntigo = path.dirname(arquivos[i]).split("\\");
                        nomeAntigo = nomeAntigo[nomeAntigo.length - 1];
                        var pasta = {
                          antigo: "".concat(path.dirname(arquivos[i])),
                          novo: "".concat(path.dirname(arquivos[i]).replace(nomeAntigo, nomeNovo))
                        };

                        if (nomeNovo != nomeAntigo) {
                          try {
                            if (!fs.renameSync(pasta.antigo, pasta.novo)) throw "Falha ao renomear " + pasta.antigo;
                          } catch (error) {}
                        }
                      })["catch"](function (e) {});

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });
            i = 0;

          case 2:
            if (!(i < arquivos.length)) {
              _context2.next = 7;
              break;
            }

            return _context2.delegateYield(_loop(i), "t0", 4);

          case 4:
            i++;
            _context2.next = 2;
            break;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _renomearPastas.apply(this, arguments);
}