import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonBase,
  Typography,
  Badge,
  Grid,
  Paper,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import FolderSharpIcon from "@material-ui/icons/FolderSharp";
import NumberFormat from "react-number-format";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: 10,
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));
function Numero(props) {
  return <>{new Intl.NumberFormat("pt-BR").format(props.value)}</>;
}
export default function DetalhesDiretorio(props) {
  const classes = useStyles();
  //  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  ///const [loading, setLoading] = React.useState(false);
  const { progresso, options, carregandoDiretorio } = props;
  const { local, pastas, arquivos } = props.caminho;
  const { loading } = props.progresso;
  const monitorar = () => {
    if (!props.progresso.loading) {
      props.monitorarDiretorios();
    }
  };
  return (
    <div className={classes.root}>
      {local != "" && (
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={1}>
            <Grid item sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item>
                  <Typography gutterBottom display="block" variant="button">
                    Detalhes da local selecionado
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    [
                    {progresso.loading && (
                      <Numero value={progresso.atual2 + 1} />
                    )}
                    {progresso.loading && "/"}
                    <Numero value={pastas.length} />] pastas localizados.
                  </Typography>
                  {progresso.loading && (
                    <LinearProgress
                      variant="buffer"
                      value={progresso.progresso2}
                      valueBuffer={1}
                      color="primary"
                    />
                  )}
                  <Typography variant="body1" gutterBottom>
                    {progresso.pdf && progresso.loading && "["}
                    {progresso.pdf && progresso.loading && (
                      <Numero value={progresso.atual + 1} />
                    )}
                    {progresso.pdf && progresso.loading && "/"}
                    <Numero value={arquivos.pdfs} />
                    {progresso.pdf && progresso.loading && "]"}
                    arquivos PDF localizados.
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={carregandoDiretorio}
                      onClick={props.extrairPDF}
                    >
                      Converter/JPG
                      {carregandoDiretorio && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Button>
                  </Typography>
                  {progresso.pdf && progresso.loading && (
                    <LinearProgress
                      variant="buffer"
                      value={progresso.progresso}
                      valueBuffer={1}
                      color="secondary"
                    />
                  )}
                  <Typography variant="body1" gutterBottom>
                    
                    {!progresso.pdf && progresso.loading && '['}
                    {!progresso.pdf && progresso.loading && (
                      <Numero value={progresso.atual + 1} />
                    )}
                    {!progresso.pdf && progresso.loading && "/"}
                    <Numero
                      value={pastas[progresso.atual2].arquivos.imagens.length}
                    />
                    {!progresso.pdf && progresso.loading && ']'}
                    <Numero value={arquivos.imagens} /> imagens localizadas.
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={carregandoDiretorio}
                      onClick={props.organizarArquivos}
                    >
                      Organizar
                      {carregandoDiretorio && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Button>
                    {loading && (
                      <Button
                        variant="text"
                        color="default"
                        size="small"
                        onClick={props.pararProgresso}
                      >
                        Parar
                      </Button>
                    )}
                  </Typography>
                  {!progresso.pdf && progresso.loading && (
                    <LinearProgress
                      variant="buffer"
                      value={progresso.progresso}
                      valueBuffer={progresso.progresso * 1.15}
                      color="secondary"
                    />
                  )}
                </Grid>
                <Grid item>
                  {options.pdf && progresso.loading && (
                    <Typography gutterBottom display="block" variant="button">
                      Convertendo os arquivos pdf em imagens.
                    </Typography>
                  )}
                  {options.imagens && progresso.loading && (
                    <Typography gutterBottom display="block" variant="button">
                      Verificando as imagens.
                    </Typography>
                  )}
                  {options.pdf && progresso.loading && (
                    <Typography variant="body1" component={"span"} gutterBottom>
                      Isso pode demorar um pouco. Varias janelas poderão ser abertas
                      durante o processo.
                    </Typography>
                  )}
                  {options.imagens && progresso.loading && (
                    <Typography variant="body1" component={"span"} gutterBottom>
                      Isso pode demorar alguns minutos, dependendo da quantidade
                      de arquivos. Por favor aguarde.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
