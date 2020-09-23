"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DetalhesDiretorio;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _colors = require("@material-ui/core/colors");

var _FolderSharp = _interopRequireDefault(require("@material-ui/icons/FolderSharp"));

var _reactNumberFormat = _interopRequireDefault(require("react-number-format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      marginTop: 10,
      maxWidth: 500
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    buttonProgress: {
      color: _colors.green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    },
    buttonSuccess: {
      backgroundColor: _colors.green[500],
      "&:hover": {
        backgroundColor: _colors.green[700]
      }
    }
  };
});

function Numero(props) {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, new Intl.NumberFormat("pt-BR").format(props.value));
}

function DetalhesDiretorio(props) {
  var classes = useStyles(); //  const [loading, setLoading] = React.useState(false);

  var _React$useState = _react["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      success = _React$useState2[0],
      setSuccess = _React$useState2[1]; ///const [loading, setLoading] = React.useState(false);


  var progresso = props.progresso,
      options = props.options,
      carregandoDiretorio = props.carregandoDiretorio;
  var _props$caminho = props.caminho,
      local = _props$caminho.local,
      pastas = _props$caminho.pastas,
      arquivos = _props$caminho.arquivos;
  var loading = props.progresso.loading;

  var monitorar = function monitorar() {
    if (!props.progresso.loading) {
      props.monitorarDiretorios();
    }
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root
  }, local != "" && /*#__PURE__*/_react["default"].createElement(_core.Paper, {
    className: classes.paper,
    elevation: 3
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    sm: true,
    container: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: true,
    container: true,
    direction: "column",
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    gutterBottom: true,
    display: "block",
    variant: "button"
  }, "Detalhes da local selecionado"), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "body1",
    gutterBottom: true
  }, "[", progresso.loading && /*#__PURE__*/_react["default"].createElement(Numero, {
    value: progresso.atual2 + 1
  }), progresso.loading && "/", /*#__PURE__*/_react["default"].createElement(Numero, {
    value: pastas.length
  }), "] pastas localizados."), progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.LinearProgress, {
    variant: "buffer",
    value: progresso.progresso2,
    valueBuffer: 1,
    color: "primary"
  }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "body1",
    gutterBottom: true
  }, progresso.pdf && progresso.loading && "[", progresso.pdf && progresso.loading && /*#__PURE__*/_react["default"].createElement(Numero, {
    value: progresso.atual + 1
  }), progresso.pdf && progresso.loading && "/", /*#__PURE__*/_react["default"].createElement(Numero, {
    value: arquivos.pdfs
  }), progresso.pdf && progresso.loading && "]", "arquivos PDF localizados.", /*#__PURE__*/_react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    size: "small",
    disabled: carregandoDiretorio,
    onClick: props.extrairPDF
  }, "Converter/JPG", carregandoDiretorio && /*#__PURE__*/_react["default"].createElement(_core.CircularProgress, {
    size: 24,
    className: classes.buttonProgress
  }))), progresso.pdf && progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.LinearProgress, {
    variant: "buffer",
    value: progresso.progresso,
    valueBuffer: 1,
    color: "secondary"
  }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "body1",
    gutterBottom: true
  }, !progresso.pdf && progresso.loading && '[', !progresso.pdf && progresso.loading && /*#__PURE__*/_react["default"].createElement(Numero, {
    value: progresso.atual + 1
  }), !progresso.pdf && progresso.loading && "/", /*#__PURE__*/_react["default"].createElement(Numero, {
    value: pastas[progresso.atual2].arquivos.imagens.length
  }), !progresso.pdf && progresso.loading && ']', /*#__PURE__*/_react["default"].createElement(Numero, {
    value: arquivos.imagens
  }), " imagens localizadas.", /*#__PURE__*/_react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    size: "small",
    disabled: carregandoDiretorio,
    onClick: props.organizarArquivos
  }, "Organizar", carregandoDiretorio && /*#__PURE__*/_react["default"].createElement(_core.CircularProgress, {
    size: 24,
    className: classes.buttonProgress
  })), loading && /*#__PURE__*/_react["default"].createElement(_core.Button, {
    variant: "text",
    color: "default",
    size: "small",
    onClick: props.pararProgresso
  }, "Parar")), !progresso.pdf && progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.LinearProgress, {
    variant: "buffer",
    value: progresso.progresso,
    valueBuffer: progresso.progresso * 1.15,
    color: "secondary"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, options.pdf && progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    gutterBottom: true,
    display: "block",
    variant: "button"
  }, "Convertendo os arquivos pdf em imagens."), options.imagens && progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    gutterBottom: true,
    display: "block",
    variant: "button"
  }, "Verificando as imagens."), options.pdf && progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "body1",
    component: "span",
    gutterBottom: true
  }, "Isso pode demorar um pouco. Varias janelas poder\xE3o ser abertas durante o processo."), options.imagens && progresso.loading && /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "body1",
    component: "span",
    gutterBottom: true
  }, "Isso pode demorar alguns minutos, dependendo da quantidade de arquivos. Por favor aguarde.")))))));
}