const electron = require("electron").remote;
const dialog = electron.dialog;
const path = require("path");
const fs = require("fs");
const CPF = require("cpf");
const Finder = require("fs-finder");
module.exports = {
  localizarEstruturas,
  selecionarPasta,
  localizarArquivos,
  localizarArquivosPorPastas,
  renomearPastas,
  percorrerPastas,
  removerPastasVazias,
};
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
  let estruturas = [];
  percorrerPastas(caminho, function (caminhoArquivo) {
    if (
      path.basename(caminhoArquivo).toLocaleLowerCase() == "estrutura.xls" ||
      path.basename(caminhoArquivo).toLocaleLowerCase() == "estrutura.xlsx"
    ) {
      estruturas.push(caminhoArquivo);
    }
  });
  ("");
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
      if (
        path.extname(file).toLocaleLowerCase() == ".pdf" ||
        path.extname(file).toLocaleLowerCase() == ".jpeg" ||
        path.extname(file).toLocaleLowerCase() == ".jpg" ||
        path.extname(file).toLocaleLowerCase() == ".png"
      ) {
        filelist.push(path.join(dir, file));
      }
      ///    filelist.push(file);
    }
  });
  return filelist;
}
function localizarArquivos(caminho, options = { imagens: true, pdf: true }) {
  let pastas = Finder.in(caminho).findDirectories();

  let arquivos = [];
  percorrerPastas(caminho, function (caminhoArquivo) {
    // const fileContents = fs.readFileSync(caminhoArquivo, 'utf8');
    //      path.extname(caminhoArquivo).toLocaleLowerCase() == ".pdf" ||
    if (options.imagens && options.pdf)
      if (
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".pdf" ||
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpeg" ||
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpg" ||
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".png"
      )
        arquivos.push(caminhoArquivo);

    if (!options.imagens && options.pdf)
      if (path.extname(caminhoArquivo).toLocaleLowerCase() == ".pdf")
        arquivos.push(caminhoArquivo);

    if (options.imagens && !options.pdf)
      if (
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpeg" ||
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".jpg" ||
        path.extname(caminhoArquivo).toLocaleLowerCase() == ".png"
      )
        arquivos.push(caminhoArquivo);
  });

  return {
    local: caminho,
    pastas,
    arquivos: {
      imagens: arquivos.filter((a) => path.extname(a) != ".pdf"),
      pdfs: arquivos.filter((a) => path.extname(a) == ".pdf"),
    },
  };
}
function localizarArquivosPorPastas(
  caminho,
  options = { imagens: true, pdf: true }
) {
  let pastas = Finder.in(caminho).findDirectories();
  let arquivosLocalizados = {
    imagens: 0,
    pdfs: 0,
  };
  let diretorios = [];
  if (pastas.length > 0)
    for (const pasta of pastas) {
      if (pasta.search("rejeitados") != -1) continue;
      let dir = {
        local: pasta,
        arquivos: {
          imagens: [],
          pdf: [],
        },
      };
      let arquivos = walkSync(pasta);
      //retornar apenas as 10 primeiras imagens de cada pasta
      dir.arquivos.imagens = options.imagens
        ? arquivos.filter((a, i) => i < 10 && path.extname(a) != ".pdf")
        : [];
      dir.arquivos.pdf = options.pdf
        ? arquivos.filter((a) => path.extname(a) == ".pdf")
        : [];
      arquivosLocalizados.imagens += dir.arquivos.imagens.length;
      arquivosLocalizados.pdfs += dir.arquivos.pdf.length;
      diretorios.push(dir);
    }
  if (pastas.length == 0) {
    let dir = {
      local: caminho,
      arquivos: {
        imagens: [],
        pdf: [],
      },
    };
    let arquivos = walkSync(caminho);
    //retornar apenas as 10 primeiras imagens de cada pasta
    dir.arquivos.imagens = options.imagens
      ? arquivos.filter((a, i) => i < 10 && path.extname(a) != ".pdf")
      : [];
    dir.arquivos.pdf = options.pdf
      ? arquivos.filter((a) => path.extname(a) == ".pdf")
      : [];
    arquivosLocalizados.imagens += dir.arquivos.imagens.length;
    arquivosLocalizados.pdfs += dir.arquivos.pdf.length;

    diretorios.push(dir);
  }

  return { local: caminho, pastas: diretorios, arquivos: arquivosLocalizados };
}

function percorrerPastas(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirCaminho = path.join(dir, f);

    let isDirectory = fs.statSync(dirCaminho).isDirectory();
    isDirectory
      ? percorrerPastas(dirCaminho, callback)
      : callback(path.join(dir, f));
  });
}
function selecionarPasta() {
  return dialog
    .showOpenDialog({
      properties: ["openDirectory"],
      title: "Selecione a pasta onde contém os arquivos a serem verificados",
    })
    .then((result) => {
      if (result.canceled) return;
      if (!result.filePaths) return;
      return result.filePaths[0];
    })
    .catch((err) => {
      return;
    });
}

function salvarArquivo() {
  dialog
    .showSaveDialog({
      defaultPath: `${result.filePaths[0]}\\${nomeResultado}`,
      filters: [{ name: "Planilhas Excel", extensions: ["xlsx", "xls"] }],
      title: "Nome do arquivo a ser gerado",
    })
    .then((res) => {
      if (res.canceled) throw "";
      lerArquivos(result.filePaths[0], res.filePath);
    })
    .catch((err) => {
      alert("Operação cancelada.");
    });
}

async function renomearPastas(arquivos) {
  for (let i = 0; i < arquivos.length; i++) {
    await arquivoEstruturado(arquivos[i])
      .then((result) => {
        let r = result[Object.keys(result)[0]];
        let nomeNovo = r[0].CPF;
        let nomeAntigo = path.dirname(arquivos[i]).split("\\");
        nomeAntigo = nomeAntigo[nomeAntigo.length - 1];
        let pasta = {
          antigo: `${path.dirname(arquivos[i])}`,
          novo: `${path.dirname(arquivos[i]).replace(nomeAntigo, nomeNovo)}`,
        };
        if (nomeNovo != nomeAntigo) {
          try {
            if (!fs.renameSync(pasta.antigo, pasta.novo))
              throw "Falha ao renomear " + pasta.antigo;
          } catch (error) {}
        }
      })
      .catch((e) => {});
  }
}
