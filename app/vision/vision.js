"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleVision = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PredictionServiceClient = require("electron").remote.require("@google-cloud/automl").v1beta1.PredictionServiceClient;

var fs = require("fs");

var path = require("path"); //const config = require("../config/ocrimagens-1b069cc4306d.json");


var googleVision = {
  analisarImagem: analisarImagem,
  predict: predict
};
exports.googleVision = googleVision;
var config = {
  "type": "service_account",
  "project_id": "agile-device-270422",
  "private_key_id": "1a4bedfd9da4c53307e47456ff4acb35087391d2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCq1BAI5BztIqKU\nMUcfZKW8v1DIXszpwDfDZVJXhUDJKUw1f+lAIZ5e3hSh0WDEaiw++JIPRSpMDLkV\n6DUIAU1V8nJRXhYHM/gOkStsVlbCNCgtajKcHG2j8rW+5LcqMinqcqLiXi4GBs5Y\nDG0Ig1qIQ8Z3E59Ud2wZf2nA3VaAkO1Le2cJiLKdPT9XB2atUE+twzDiTIVHp0wb\n8FV030QdVcVKvX8F0QjkLCYtqXlhh7IfiZzeB1rNtDc1EmNQ1CdH+hDhs9QFMGkd\newWFQ3AjPOkwIUppXqo004AWyG1fk+OgKuc2V4itHaPbFXdRUx8R8azNBwK797CV\ne+eP5X6xAgMBAAECggEAGscNEGe5hQ51z6b90BT1yeVvY0lA8682zoE2bBOuORop\nIQXA6VWbvqEvOMJaWc+Oyfwq4QvlenBQHvf8QBn8JmnPs6N87nod+yKUXPIXvW9x\nkNThxAjMwvNLu/WcJJgia+a2U6eRrU4p0DF6cegtK8j79jR0OEhUAJcxW5MWeSZ8\nbphe4cn3I6XLmZLNmp3uhpe06WuNPJGdnVcYJ4yBpnwHDAe54p4fgQhs/91H5FLW\nj5TcJqOCpglaoZ7SUct+zcX/pAXMhE+9xcIFlDlwZ0PoD20fKf5ZeyUlT1SvPoJW\naXZA4d4UedOQ1yYcVyIF8F06pWuvcuHFs1i87xiFpQKBgQDv0CM1bbFRzcPZHUu6\ndlQwDmDyfdJ3ZT7qSOcP2VE8gVL8dcbUcKsuXZOrKtIe2HO1FeVSFR/ha+CgUMSb\n6RAFf9bNPVF2PM1X+xq+LPDBHTC5TwOH1EOQiPqzZJfgXiiEWF7onWdyNoQ2i6RU\nyOlwpJMC1VNbtGqQ8SkcCh/bRwKBgQC2W+aZEkN058XFokLbjT5U40i9AZvamL+y\nN2Ujc53yzTw8btLIuhQh93Vq7kAlpAxEJePk023CW7icE2QIoTXs3t6TQpBBRZoc\nyMUey2bT/KUpMU2kGlBRIVPd2pWpHDGPeupc8LsZlKBjTLoWanNGDcxvVxxrCJ4H\nkQZPOi3iRwKBgD4QTtxn/CkgqJwLEes67oTVY8++MncF8+dsYKhgZL7U9WYzEPcw\nBY1lWG9HEMQ83o0yEnxQzURox+SVopx7D9Nsh2nsgaWpDLfFW+F1/gTsigybX12K\n2MWSPdeppAjENZYyzLVE713GsCbxsuDick/dt9JW5VDpe17xmuMP17jHAoGANi0L\nTwJ8A+kvek2Aa1WE5Rc47t3hfYnPuZR3eZbJn+6VLKcH/BY8EPNBcOkjKYuZEU3o\nbHzbqNgy+jtQhrfOG3cCzOEDlkClTlPfLAzlmaj/MEOze0NOBSxPjCN6PulfV+7+\nXWovS6Q6GgYbarlpUbCbwaAxkyLWQA03wKXaJ9UCgYAlCkVuusrl8t5kvb6AL2K2\n37OL9sXbtg04yzNnpmDNqQCmwFA94wmHaNOor5lZMw8Um7MWr5GSmcokH7TPKZmm\nhgbug2lrIxDPs0BL2RrwGrsWIhJdQSjkr25vzrz93RvH7AP0Iu1rvLROhaLT2pG6\n4queLaoHSFh8Rgn2i4snJw==\n-----END PRIVATE KEY-----\n",
  "client_email": "botanalisedocumentos@agile-device-270422.iam.gserviceaccount.com",
  "client_id": "117595042141934372467",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/botanalisedocumentos%40agile-device-270422.iam.gserviceaccount.com"
};

function analisarImagem(_x) {
  return _analisarImagem.apply(this, arguments);
}

function _analisarImagem() {
  _analisarImagem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(image) {
    var vision, client, request, _yield$client$labelDe, _yield$client$labelDe2, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(image);
            vision = require("@google-cloud/vision"); ///image = image.replace("\\", "\\\\");
            // Imports the Google Cloud client library
            // Creates a client
            //  const client = new vision.ImageAnnotatorClient();

            client = new vision.ImageAnnotatorClient({
              projectId: config.project_id,
              keyFilename: "../config/agile-device-270422-1a4bedfd9da4.json"
            });
            request = {
              image: {
                source: {
                  filename: image
                }
              }
            };
            _context.next = 6;
            return client.labelDetection(request);

          case 6:
            _yield$client$labelDe = _context.sent;
            _yield$client$labelDe2 = _slicedToArray(_yield$client$labelDe, 1);
            result = _yield$client$labelDe2[0];
            console.log(result);
            return _context.abrupt("return", result);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _analisarImagem.apply(this, arguments);
}

function predict(_x2) {
  return _predict.apply(this, arguments);
} //predict();


function _predict() {
  _predict = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(filePath) {
    var projectId, computeRegion, modelId, scoreThreshold, predictionServiceClient, modelFullId, content, params, payload, _yield$predictionServ, _yield$predictionServ2, response, _iterator, _step, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            /**
             * Demonstrates using the AutoML client to detect the object in an image.
             * TODO(developer): Uncomment the following lines before running the sample.
             */
            projectId = config.project_id; // '[PROJECT_ID]' e.g., "my-gcloud-project";

            computeRegion = "us-central1";
            modelId = "modelo_rg_20200305094411"; // const filePath = '[GCS_PATH]' e.g., "/home/ubuntu/salad.jpg",
            // `local text file path of content to be extracted`;

            scoreThreshold = 0.5; // `Set the score threshold for Prediction of the created model`;
            //Imports the Google Cloud Automl library
            // Instantiates a client

            predictionServiceClient = new PredictionServiceClient(); // Get the full path of the model.

            modelFullId = predictionServiceClient.modelPath(projectId, computeRegion, modelId); // Read the file content for prediction.

            content = fs.readFileSync(filePath, "base64");
            params = {};

            if (scoreThreshold) {
              params = {
                score_threshold: scoreThreshold
              };
            } // Set the payload by giving the content and type of the file.


            payload = {
              image: {
                imageBytes: content
              }
            };
            _context2.prev = 10;
            _context2.next = 13;
            return predictionServiceClient.predict({
              name: modelFullId,
              payload: payload,
              params: params
            });

          case 13:
            _yield$predictionServ = _context2.sent;
            _yield$predictionServ2 = _slicedToArray(_yield$predictionServ, 1);
            response = _yield$predictionServ2[0];
            console.log("Prediction results:");
            _iterator = _createForOfIteratorHelper(response[0].payload);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                result = _step.value;
                console.log("\nPredicted class name:  ".concat(result.displayName));
                console.log("Predicted class score:  ".concat(result.imageObjectDetection.score));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](10);
            console.log(_context2.t0);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[10, 21]]);
  }));
  return _predict.apply(this, arguments);
}