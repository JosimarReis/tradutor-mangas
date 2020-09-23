const CPF = require("cpf");
module.exports = {
  removeDuplicateUsingSet: arr => {
    let unique_array = Array.from(new Set(arr));
    return unique_array;
  },
  stringToArray: string => {
    let arrayPalavras = [];
    let temp = string.map(e => {
      let t = e.split(",");
      t = t.map(f => f.split(" "));
      return t;
    });
    let cpf = "";
    temp.forEach(row => {
      row.forEach(col => {
        col.forEach(element => {
          let t = element.toLowerCase();
          if (t == "do" || t == "de" || t == "da") return;

          let hifem = element.indexOf("-");
          if (hifem >= 11) {
            let inicioCpf = element.hasOwnProperty(hifem - 11)
              ? hifem - 11
              : false;
            let fimCpf = element.hasOwnProperty(hifem + 3) ? hifem + 3 : false;
            let verificarCpf =
              element.substring(inicioCpf, hifem) +
              element.substring(hifem, fimCpf);
            if (CPF.isValid(verificarCpf)) {
              cpf = verificarCpf;
            }
          }

          arrayPalavras.pushIfNotExist(element, e => {
            if (element == e) return element;
            return;
          });
        });
      });
    });
    return {
      cpf,
      palavras: arrayPalavras.map(e => e.toLowerCase())
    };
  },
  getCpf: arrayString => {
    let cpf = "";
    arrayString.forEach(c => {
      c = `${c}`;
      let hifem = c.indexOf("-");
      if (hifem == -1) return;
      let inicioCpf = c.hasOwnProperty(hifem - 11) ? hifem - 11 : false;
      let fimCpf = c.hasOwnProperty(hifem + 3) ? hifem + 3 : false;
      if (!inicioCpf) return;
      if (!fimCpf) return;
      let verificarCpf =
        c.substring(inicioCpf, hifem) + c.substring(hifem, fimCpf);
      if (CPF.isValid(verificarCpf)) {
        cpf = verificarCpf;
        return cpf;
      }
    });

    return cpf;
  },
  removePontos: cpf => {
    return cpf
      .split(".")
      .join("")
      .split("-")
      .join("")
      .split(/[a-z.]+/).join('');
  }
};

Array.prototype.inArray = function(comparer) {
  for (var i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }
  return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};
