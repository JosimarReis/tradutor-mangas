const electron = require("electron");
const dialog = electron.remote.dialog;
const { ipcRenderer } = electron;

const fs = require("fs"),
  path = require("path");
const Finder = require("fs-finder");
const uuidv1 = require("uuid").v1;

const win = electron.remote.getCurrentWindow();
const helper = require("../helpers/index");
const arquivos = require("../helpers/arquivos");
const monitorar = require('../monitorar/index')
var progressoPDF = document.getElementById("pdfsLocalizados");
var progressoIMAGEM = document.getElementById("imagensLocalizados");
var detalhes = document.getElementById("detalhes");
var JSONFINAL = [];
var state = {
  model: "",
  caminho: {
    local: "",
    pastas: [],
    arquivos: {
      imagens: 0,
      pdfs: 0,
    },
  },
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
    pdf: false,
  },
  options: {
    imagens: false,
    pdf: false,
  },
  logs: ["Arguardando seleção da pasta..."],
  logText: "Arguardando seleção da pasta...",
};

ipcRenderer.on("state", (event, statet) => {
  state = statet;
  console.log("index.html", statet);
});
function setState(data) {
  state = { ...state, ...data };
  ipcRenderer.send("state", state);
}
function localArquivos() {
  dialog
    .showOpenDialog({
      properties: ["openDirectory"],
      title: "Selecione a pasta onde contém os arquivos a serem verificados",
    })
    .then((result) => {
      if (result.canceled) throw "";
      log("<br>");
      log("Pasta selecionada: " + result.filePaths[0]);

      log("Buscando os arquivos. Por favor aguarde. ");
      log("Buscando os arquivos. Por favor aguarde. ", true);

      let = caminho = arquivos.localizarArquivosPorPastas(result.filePaths[0], {
        imagens: true,
        pdf: true,
      });
      setState({ caminho });
      log(
        `Foi encontrado na pasta: ${state.caminho.arquivos.pdfs} PDFs e ${state.caminho.arquivos.imagens} imagens.`
      );
      progressoPDF.innerHTML = ` [${state.caminho.arquivos.pdfs}] arquivos PDF localizados`;
      progressoIMAGEM.innerHTML = ` [${state.caminho.arquivos.imagens}] imagens localizados`;
      detalhes.setAttribute("style", "margin-top: 20px;");
    })
    .catch((err) => {
      alert("Operação cancelada." + err);
    });
}
function log(mensagem, progresso = false, reset = false) {
  let botao = document.getElementById("botao");

  if (reset) {
    let logs = document.getElementById("logs");
    logs.innerHTML = "";
  }
  if (progresso) {
    botao.setAttribute("onclick", "");
    botao.innerHTML = mensagem;
  } else {
    let logs = document.getElementById("logs");
    logs.innerHTML = "<p>" + mensagem + "</p>" + logs.innerHTML;
    botao.setAttribute("onclick", "localArquivos()");
    botao.innerHTML = "Selecionar Pasta";
  }
}

function converterArquivos() {
  if (confirm("Desejar converter os arquivos em JPG agora?")) {
  }
}
function organizarArquivos() {
  if (confirm("Desejar organizar os arquivos agora?")) {
    log("", 0, true);
    //  progresso(0, arquivos.length);

    document.getElementById("botao").innerHTML = `Trabalhando...`;
    document.getElementById("botao").classList.add("disabled");
    document.body.setAttribute("style", "cursor:progress");

    log(
      `Abrindo os arquivos, conferindo se são os arquivos corretos para serem analisados. Por favor, aguarde.`
    );

    let i = 0;
    percorrerArquivos(0, 0, false);
  }
}
function percorrerArquivos(posicaoPasta, posicaoArquivo, pdf = true) {
  if (
    posicaoPasta == state.caminho.pastas.length &&
    state.caminho.pastas.length > 0
  ) {
    log(`${sucesso} imagem processados com sucesso.`);
    return;
  } else if (state.caminho.pastas.length == 0) {
    log("Não existe pastas ou arquivos no local selecionado.");
    return;
  }

  let tamanhoPasta = state.caminho.pastas.length;
  let tamanhoArquivos = pdf
    ? state.caminho.pastas[posicaoPasta].arquivos.pdfs.length
    : state.caminho.pastas[posicaoPasta].arquivos.imagens.length;
  let arquivo = pdf
    ? state.caminho.pastas[posicaoPasta].arquivos.pdfs[posicaoArquivo]
    : state.caminho.pastas[posicaoPasta].arquivos.imagens[posicaoArquivo];
  let sucesso =
    posicaoPasta == 0 && posicaoArquivo == 0 ? 0 : state.progresso.sucesso;
  if (posicaoPasta < tamanhoPasta && tamanhoArquivos == 0) {
    if (posicaoPasta == tamanhoPasta - 1 && tamanhoArquivos == 0) return;
    else return this.percorrerArquivos(posicaoPasta + 1, 0, pdf);
  }

  let progresso = {
    parar: false,
    loading:
      posicaoPasta + 1 < tamanhoPasta && posicaoArquivo < tamanhoArquivos
        ? true
        : false,
    progresso: (posicaoArquivo + 1 / tamanhoArquivos) * 100,
    atual: posicaoArquivo,
    total: tamanhoArquivos,
    progresso2: (posicaoPasta + 1 / tamanhoPasta) * 100,
    atual2: posicaoPasta,
    total2: tamanhoPasta,
    sucesso: sucesso,
    pdf,
  };

  console.log(
    `pasta ${posicaoPasta}|${tamanhoPasta}, arquivos ${posicaoArquivo}|${tamanhoArquivos}`
  );
  electron.remote.getCurrentWindow().setProgressBar(progresso.progresso2 / 100);

  setState({ loading: progresso.loading, progresso });

  let logPosicao = `[${progresso.atual2 + 1}][${
    progresso.atual + 1
  }/${tamanhoArquivos}]: `;

  logPosicao += pdf ? ` Convertendo o arquivo pdf. ` : ` Analisando imagem. `;

  if (posicaoArquivo < tamanhoArquivos) log(logPosicao);

  return monitorar
    .analisarArquivo(arquivo, state.caminho.local, state.model)
    .then((resolve) => {
      logPosicao = `[${progresso.atual2 + 1}][${
        progresso.atual + 1
      }/${tamanhoArquivos}]:`;
      console.log("retorno da solicitacao", resolve);
      if (resolve.movido) {
        progresso.sucesso++;
        setState({ progresso });
        log(
          logPosicao + "  Documento identificado e movido para a pasta correta"
        );
      } else if (pdf) {
        log(logPosicao + " Arquivo convertido");
      } else
        log(
          logPosicao +
            "  Documento não identificado e/ou não atende os padrões de seleção"
        );
    })
    .catch((err) => {
      console.log("error", err);
      logPosicao = `[${progresso.atual2 + 1}][${
        progresso.atual + 1
      }/${tamanhoArquivos}]:`;

      log(
        logPosicao +
          "  Documento não identificado e/ou não atende os padrões de seleção"
      );
    })
    .finally(() => {
      if (
        posicaoPasta == tamanhoPasta - 1 &&
        posicaoArquivo == tamanhoArquivos - 1
      ) {
        if (
          state.options.pdf == true &&
          state.options.imagens == false &&
          posicaoArquivo == tamanhoArquivos
        ) {
          this.selecionarCaminhoListarArquivos(state.caminho.local, {
            imagens: true,
            pdf: false,
          });
        }
        return;
      }
      if (posicaoPasta < tamanhoPasta && posicaoArquivo == tamanhoArquivos - 1)
        return this.percorrerArquivos(posicaoPasta + 1, 0, pdf);
      if (posicaoPasta < tamanhoPasta && posicaoArquivo < tamanhoArquivos)
        return this.percorrerArquivos(posicaoPasta, posicaoArquivo + 1, pdf);
    });
}
function progresso(atual, maximo) {
  let percentual = (atua / maximo) * 100;
  let barra = document.getElementById("progresso");

  barra.setAttribute("style", `width: ${percentual}%;`);
  barra.setAttribute("aria-valuenow", percentual);
  barra.innerHTML = `${percentual}%`;
}

function percorrerPasta(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirCaminho = path.join(dir, f);

    let isDirectory = fs.statSync(dirCaminho).isDirectory();
    isDirectory
      ? percorrerPasta(dirCaminho, callback)
      : callback(path.join(dir, f));
  });
}

function removerArquivosTemporarios(tempDir) {
  fs.mkdir(tempDir, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(tempDir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
async function lerArquivos(raiz, arquivoResultado) {
  let tempDir = `${raiz}\\temp\\coleta`;

  log("", 0, true);
  let arquivos = [];
  //percorre o diretorio selecionado e pesquista os arquivos PDF
  percorrerPasta(raiz, function (caminhoArquivo) {
    // const fileContents = fs.readFileSync(caminhoArquivo, 'utf8');
    if (
      path.extname(caminhoArquivo) == ".pdf" ||
      path.extname(caminhoArquivo) == ".txt"
    )
      arquivos.push(caminhoArquivo);
    //if (path.extname(caminhoArquivo) == ".txt") arquivos.push(caminhoArquivo);
  });
  if (arquivos.length == 0) {
    alert("Nenhum arquivo encontado na pasta selecionada.");
    return;
  }

  log(`Arquivos localizados na pasta selecionada.`);

  //  progresso(0, arquivos.length);

  document.getElementById("botao").innerHTML = `Trabalhando...`;
  document.getElementById("botao").classList.add("disabled");
  document.body.setAttribute("style", "cursor:progress");

  log(
    `Abrindo os arquivos, conferindo se são os arquivos corretos para serem analisados. Por favor, aguarde.`
  );

  let i = 0;
  lerArquivo(arquivos, 0, raiz, arquivoResultado, tempDir);
}

function lerArquivo(array, posicao, raiz, arquivoResultado, tempDir) {
  if (posicao < array.length) {
    let arquivo = array[posicao];
    ////console.log(arquivo);
    let percentual = ((posicao + 1) / array.length) * 100;
    log(`${percentual.toFixed()}% analizados...`, true);
    win.setProgressBar(percentual / 100);

    fs.readFile(arquivo, function (err, buffer) {
      if (err)
        return lerArquivo(array, posicao + 1, raiz, arquivoResultado, tempDir);

      try {
        //
      } catch (error) {
        console.log(error);
      } finally {
        return lerArquivo(array, posicao + 1, raiz, arquivoResultado, tempDir);
      }
    });
  } else {
    let arr = [];
    let arquivosT = [];
    log("Fazendo algumas verificações. Por favor aguarde.");

    setTimeout(() => {
      if (JSONFINAL.length > 0) {
        log(`Reunindo as informaçoes dos ${JSONFINAL.length} arquivos...`);
      }
    }, 3000);
    setTimeout(() => {
      if (JSONFINAL.length > 0) {
        //salvar arquivo final
        document.getElementById("botao").innerHTML =
          "Buscar e processar arquivos";
        document.getElementById("botao").classList.remove("disabled");
        document
          .getElementById("botao")
          .setAttribute("onclick", "localArquivos()");
        document.body.setAttribute("style", "cursor:auto");
        log(`${JSONFINAL.length} CNIS foram estruturados com sucesso`);
        // log(`Os documentos tiveram seus dados extraídos com sucesso`);
        let data = new Date();
        let tempNome = `CNIS - ${data.getUTCFullYear()}.${
          data.getMonth() + 1
        }.${data.getDate()}.json`;

        let nomeResultado =
          path.basename(arquivoResultado) != tempNome
            ? path.join(
                path.dirname(arquivoResultado),
                `${JSONFINAL.length} ${path.basename(arquivoResultado)}`
              )
            : `${path.dirname(arquivoResultado)}\\${
                JSONFINAL.length
              } CNIS - ${data.getUTCFullYear()}.${
                data.getMonth() + 1
              }.${data.getDate()} ${data.getHours()}.${data.getMinutes()}.${data.getSeconds()}.json`;

        log(
          `O arquivo com os resultados foi salvo em ${path.dirname(
            nomeResultado
          )}`
        );
        JSONFINAL = [];
        // });
      } else {
        document.getElementById("botao").innerHTML =
          "Buscar e processar arquivos";
        document.getElementById("botao").classList.remove("disabled");
        document
          .getElementById("botao")
          .setAttribute("onclick", "localArquivos()");
        document.body.setAttribute("style", "cursor:auto");
        log(`Não há nada a ser processado.`);
      }
      return;
    }, 4000);
  }
}

var uniqEs6 = (arrArg) =>
  arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
