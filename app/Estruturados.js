"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Estruturados;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      marginTop: 10,
      maxWidth: 550
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
    }
  };
});

function Estruturados(props) {
  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    className: classes.paper
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    sm: true,
    container: true
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    id: "outlined-multiline-static",
    label: "Log do servi\xE7o",
    multiline: true,
    disabled: true,
    rows: 12,
    rowsMax: 12,
    value: props.logText,
    variant: "outlined",
    fullWidth: true
  }))));
}