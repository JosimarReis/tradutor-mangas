"use strict";

var CPF = require("cpf");

module.exports = {
  removeDuplicateUsingSet: function removeDuplicateUsingSet(arr) {
    var unique_array = Array.from(new Set(arr));
    return unique_array;
  },
  stringToArray: function stringToArray(string) {
    var arrayPalavras = [];
    var temp = string.map(function (e) {
      var t = e.split(",");
      t = t.map(function (f) {
        return f.split(" ");
      });
      return t;
    });
    var cpf = "";
    temp.forEach(function (row) {
      row.forEach(function (col) {
        col.forEach(function (element) {
          var t = element.toLowerCase();
          if (t == "do" || t == "de" || t == "da") return;
          var hifem = element.indexOf("-");

          if (hifem >= 11) {
            var inicioCpf = element.hasOwnProperty(hifem - 11) ? hifem - 11 : false;
            var fimCpf = element.hasOwnProperty(hifem + 3) ? hifem + 3 : false;
            var verificarCpf = element.substring(inicioCpf, hifem) + element.substring(hifem, fimCpf);

            if (CPF.isValid(verificarCpf)) {
              cpf = verificarCpf;
            }
          }

          arrayPalavras.pushIfNotExist(element, function (e) {
            if (element == e) return element;
            return;
          });
        });
      });
    });
    return {
      cpf: cpf,
      palavras: arrayPalavras.map(function (e) {
        return e.toLowerCase();
      })
    };
  },
  getCpf: function getCpf(arrayString) {
    var cpf = "";
    arrayString.forEach(function (c) {
      c = "".concat(c);
      var hifem = c.indexOf("-");
      if (hifem == -1) return;
      var inicioCpf = c.hasOwnProperty(hifem - 11) ? hifem - 11 : false;
      var fimCpf = c.hasOwnProperty(hifem + 3) ? hifem + 3 : false;
      if (!inicioCpf) return;
      if (!fimCpf) return;
      var verificarCpf = c.substring(inicioCpf, hifem) + c.substring(hifem, fimCpf);

      if (CPF.isValid(verificarCpf)) {
        cpf = verificarCpf;
        return cpf;
      }
    });
    return cpf;
  },
  removePontos: function removePontos(cpf) {
    return cpf.split(".").join("").split("-").join("").split(/[a-z.]+/).join('');
  }
};

Array.prototype.inArray = function (comparer) {
  for (var i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }

  return false;
}; // adds an element to the array if it does not already exist using a comparer
// function


Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};