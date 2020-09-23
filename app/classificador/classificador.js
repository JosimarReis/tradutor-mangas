"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classificador = void 0;
var classificador = {
  documentos: [{
    document: "naodentificado",
    keywords: []
  }, {
    document: "cnh",
    keywords: ["acc", "carteira", "cat", "departamento", "hab", "habilitacao", "permissao", "transito", "habilitação", "nacional", "federativa"]
  }, {
    document: "rg",
    keywords: ["assinatura", "cientifico", "civil", "data", "diretor", "doc", "estado", "expediçao", "filiaçao", "geral", "identificacao", "instituto", "nascimento", "naturalidade", "origem", "pericia", "policia", "registro", "secretaria", "segurança", "tecnico", "titular"]
  }, {
    document: "cartao",
    keywords: ["banco24", "caixa", "corrente", "credito", "débito", "master", "mastercard", "poupança", "visa", "visaelectron"]
  }, {
    document: "cpf",
    keywords: ["ministerio", "fazenda", "receita", "cpf"]
  }, {
    document: "titulo",
    keywords: ["título", "eleitoral", "zona", "comarca", "eleitor", "seção"]
  }, {
    document: "endereco",
    keywords: ["agua", "amarela", "automático", "avenida", "bairro", "cep", "cliente", "consumo", "consumo", "corte", "distruibuição", "elétrica", "energetica", "energia", "esgoto", "fatura", "faturamento", "fornecimento", "iluminação", "kwh", "leitura", "matricula", "neoenergia", "referencia", "rua", "saneamento", "serie", "tarifa", "vecimento", "vencimento", "vermelha", "via"]
  }, {
    document: "ctps",
    keywords: ["anotacoes", "anotações", "contrato", "ctps", "empregador", "emprego", "estabelecimento", "experiência", "ferias", "função", "previdencia", "salário", "trabalho", "doc", "quilificação", "situação militar"]
  }, {
    document: "certidaoobito",
    keywords: ["naturais", "obito", "civil", "pessoas", "certidão", "óbito", "cartório", "falecido", "morte", "cemiterio", "sepultamento", "falecido", "falecida", "invetario", "sepultado"]
  }, {
    document: "certidaocasamento",
    keywords: ["naturais", "casamento", "civil", "pessoas", "certidão", "cartório", "comunhão", "parcial", "universal", "bens", "côjuge"]
  }, {
    document: "certidaonascimento",
    keywords: ["naturais", "nascimento", "civil", "pessoas", "certidão", "cartório"]
  }, {
    document: "requerimento",
    keywords: ["inss", "requerimento", "ctc", "requerente", "especial", "inss"]
  }]
}; // MODELO { document: "", keywords: [] }

exports.classificador = classificador;