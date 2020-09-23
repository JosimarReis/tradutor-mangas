"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalisarImagens = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var vision = require("@google-cloud/vision");

var AnalisarImagens = {
  analisarImagem: analisarImagem
};
exports.AnalisarImagens = AnalisarImagens;

function analisarImagem(_x) {
  return _analisarImagem.apply(this, arguments);
}

function _analisarImagem() {
  _analisarImagem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(image) {
    var client, request;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //image = image.replace(`\\`, "/");
            console.log(image); //  image = image.replace("\\", "/");
            // Imports the Google Cloud client library
            // Creates a client
            //  const client = new vision.ImageAnnotatorClient();

            client = new vision.ImageAnnotatorClient({
              projectId: "ocrdocumentos-270422",
              keyFilename: "../config/ocrdocumentos-270422-bb7b5569349c.json"
            });
            request = {
              image: {
                source: {
                  filename: "".concat(image)
                }
              }
            }; //extrair texto do documento

            client.textDetection(request) // extrair textos
            //.faceDetection(request)
            .then(function (response) {
              response = [response]; // doThingsWith(response);
              //  var fs = require("fs");
              // fs.writeFileSync("myjsonfile.json", JSON.stringify(response));

              return response;
            })["catch"](function (err) {
              console.error(err);
              return;
            });
            return _context.abrupt("return");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _analisarImagem.apply(this, arguments);
}