import React from "react";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import SelecionarDiretorio from "./SelecionarDiretorio";
import { arquivos } from "./helpers/arquivos";
import electron from "electron";
const dialog = electron.remote;
import { AnalisarImagens } from "./analise/AnalisarImagens";
import DetalhesDiretorio from "./DetalhesDiretorio";
import Estruturados from "./Estruturados";
import { monitorar } from "./monitorar";
import fs from "fs";
import path from "path";

import { ipcRenderer } from "electron";

export default class App extends React.Component {
  state = {
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
      pdf: false,
    },
    caminho: {
      local: "",
      pastas: [],
      arquivos: {
        imagens: 0,
        pdfs: 0,
      },
    },
    options: {
      imagens: false,
      pdf: false,
    },
    logs: ["Arguardando seleção da pasta..."],
    logText: "Arguardando seleção da pasta...",
  };
  getModel = async () => {
    let model = await monitorar.loadModel();
    this.setState({ model });
    console.log(this.state.model);
  };
  componentDidMount() {
    this.getModel();
    ipcRenderer.send("state", this.state);
  }
  componentWillUpdate() {
    ipcRenderer.send("state", this.state);
  }
  log = (msg) => {
    let logs = this.state.logs;
    let data = new Date().toLocaleDateString("pt-BR");
    logs.unshift(`[${data}]${msg}`);
    let logText = logs.join("\n");
    this.setState({ logs, logText });
  };
  renomearPastas = async () => {
    const { estruturados } = this.state.caminho;
    await arquivos.renomearPastas(estruturados);
  };
  pararProgresso = () => {
    if (confirm("Tem certeza que deseja parar a tarefa atual?")) {
      this.log("Tem certeza que deseja parar a tarefa atual? SIM");
      this.log("Processo cancelado.");
      this.setState({
        caminho: this.state.caminho,
        options: {
          imagens: false,
          pdf: false,
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
          pdf: false,
        },
      });
    } else {
      this.log("Tem certeza que deseja parar a tarefa atual? NÃO");
      this.log("continuando o trabalho...");
    }
  };
  localizarEstruturados = async (local = "") => {
    if (this.state.caminho) {
      const caminho = this.state.caminho;

      let pastasEstruturadas = await arquivos.localizarEstruturas(
        caminho.local
      );
      if (pastasEstruturadas) {
        this.setState({
          caminho: {
            ...caminho,
            estruturados: pastasEstruturadas,
          },
        });
        this.renomearPastas();
      }
    }
  };

  selecionarCaminhoListarArquivos = async (
    local,
    options = { imagens: true, pdf: true }
  ) => {
    this.log("Pasta selecionada: " + local);
    this.log("Buscando os arquivos. Por favor aguarde. ");

    this.setState({ loading: true });
    this.setState({
      options,
    });

    if (!local) {
      this.setState({
        loading: false,
        caminho: {
          local: "",
          pastas: [],
          arquivos: {
            imagens: [],
            pdfs: [],
          },
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
          total: 0,
        },
      });
    } else {
      let caminho = await arquivos.localizarArquivosPorPastas(local, options);
      ///let caminho = { local: local, arquivos: arquivosLocalizados };

      this.setState({
        loading: false,
        caminho,
        progresso: {
          parar: false,
          loading: false,
          progresso: 0,
          sucesso: 0,
          atual: 0,
          total: 0,
          progresso2: 0,
          atual2: 0,
          total2: 0,
        },
      });
      this.log(
        `Foi encontrado na pasta: ${caminho.arquivos.pdfs} PDFs e ${caminho.arquivos.imagens} imagens.`
      );
      //  this.monitorarArquivos();
    }
  };

  extrairPDF = () => {
    if (
      !this.state.caminho.arquivos.pdfs.length ||
      this.state.caminho.arquivos.pdfs.length == 0
    )
      alert("Não há nada a ser convertido!");
    else {
      this.log(
        "Convertendo os arquivos PDF em imagens. Varias janelas serão abertas, por favor aguarde."
      );
      this.setState({ options: { pdf: true, imagens: false } });
      this.monitorarArquivos(true);
    }
    return;
  };
  organizarArquivos = () => {
    if (this.state.caminho.arquivos.imagens == 0)
      this.log("Não há nada a ser organizado!");
    else {
      this.log(
        "Analisando as imagens para organizá-las. Essa tarefa pode demorar, dependendo da quantidade de arquivos existentes"
      );
      this.setState({ options: { pdf: false, imagens: true } });

      this.monitorarArquivos(false);
    }
    return;
  };

  monitorarArquivos = (pdf = true) => {
    this.setState({ loading: true });
    this.percorrerArquivos(0, 0, pdf);
    //    if(!pdf) this.listarPastas()
    if (pdf) {
      this.selecionarCaminhoListarArquivos(this.state.local, {
        imagens: true,
        pdf: false,
      });
    }
  };
  listarPastas = async () => {
    if (this.state.caminho.pastas.length > 0) {
      this.log("Removendo as pastas vazias. Por favor aguarde.");
      for (let pasta of this.state.caminho.pastas) {
        await arquivos.removerPastasVazias(pasta);
      }
      this.log("Pastas vazias removidas.");
    }
  };
  percorrerArquivos = (posicaoPasta, posicaoArquivo, pdf = true) => {
    if (this.state.progresso.parar) {
      this.log("Parada solicitada.");
      return;
    }
    if (
      posicaoPasta == this.state.caminho.pastas.length &&
      this.state.caminho.pastas.length > 0
    ) {
      this.log(`${sucesso} imagem processados com sucesso.`);
      return;
    } else if (this.state.caminho.pastas.length == 0) {
      this.log("Não existe pastas ou arquivos no local selecionado.");
      return;
    }

    let tamanhoPasta = this.state.caminho.pastas.length;
    let tamanhoArquivos = pdf
      ? this.state.caminho.pastas[posicaoPasta].arquivos.pdfs.length
      : this.state.caminho.pastas[posicaoPasta].arquivos.imagens.length;
    let arquivo = pdf
      ? this.state.caminho.pastas[posicaoPasta].arquivos.pdfs[posicaoArquivo]
      : this.state.caminho.pastas[posicaoPasta].arquivos.imagens[
          posicaoArquivo
        ];
    let sucesso =
      posicaoPasta == 0 && posicaoArquivo == 0
        ? 0
        : this.state.progresso.sucesso;
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
    electron.remote
      .getCurrentWindow()
      .setProgressBar(progresso.progresso2 / 100);

    this.setState({ loading: progresso.loading, progresso });

    let logPosicao = `[${progresso.atual2 + 1}][${
      progresso.atual + 1
    }/${tamanhoArquivos}]: `;

    logPosicao += pdf ? ` Convertendo o arquivo pdf. ` : ` Analisando imagem. `;

    if (posicaoArquivo < tamanhoArquivos) this.log(logPosicao);

    return monitorar
      .analisarArquivo(arquivo, this.state.caminho.local, this.state.model)
      .then((resolve) => {
        logPosicao = `[${progresso.atual2 + 1}][${
          progresso.atual + 1
        }/${tamanhoArquivos}]:`;
        console.log("retorno da solicitacao", resolve);
        if (resolve.movido) {
          progresso.sucesso++;
          this.setState({ progresso });
          this.log(
            logPosicao +
              "  Documento identificado e movido para a pasta correta"
          );
        } else if (pdf) {
          this.log(logPosicao + " Arquivo convertido");
        } else
          this.log(
            logPosicao +
              "  Documento não identificado e/ou não atende os padrões de seleção"
          );
      })
      .catch((err) => {
        console.log("error", err);
        logPosicao = `[${progresso.atual2 + 1}][${
          progresso.atual + 1
        }/${tamanhoArquivos}]:`;

        this.log(
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
            this.state.options.pdf == true &&
            this.state.options.imagens == false &&
            posicaoArquivo == tamanhoArquivos
          ) {
            this.selecionarCaminhoListarArquivos(this.state.caminho.local, {
              imagens: true,
              pdf: false,
            });
          }
          return;
        }
        if (
          posicaoPasta < tamanhoPasta &&
          posicaoArquivo == tamanhoArquivos - 1
        )
          return this.percorrerArquivos(posicaoPasta + 1, 0, pdf);
        if (posicaoPasta < tamanhoPasta && posicaoArquivo < tamanhoArquivos)
          return this.percorrerArquivos(posicaoPasta, posicaoArquivo + 1, pdf);
      });
  };
  render() {
    console.log(this.state);
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Organizar Documentos
        </Typography>
        <SelecionarDiretorio
          loading={this.state.loading}
          abrirPasta={async () => {
            this.setState({ loading: true });
            let local = await arquivos.selecionarPasta();
            if (local)
              this.selecionarCaminhoListarArquivos(local, {
                imagens: true,
                pdf: true,
              });
            this.setState({ loading: false });
          }}
          caminho={this.state.caminho}
        />

        <DetalhesDiretorio
          carregandoDiretorio={this.state.loading}
          pararProgresso={this.pararProgresso}
          caminho={this.state.caminho}
          options={this.state.options}
          processar={this.analisar}
          progresso={this.state.progresso}
          progress={this.progresso}
          extrairPDF={this.extrairPDF}
          organizarArquivos={this.organizarArquivos}
          options={this.state.options}
        />
        <Estruturados log={this.state.logs} logText={this.state.logText} />
        {this.state.logText}
      </Container>
    );
  }
}
