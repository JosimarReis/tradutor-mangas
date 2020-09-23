import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { TextField } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
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
}));

export default function Estruturados(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.paper}>
        <Grid item xs={12} sm container>
          <TextField
            id="outlined-multiline-static"
            label="Log do serviço"
            multiline
            disabled={true}
            rows={
            12
            }
            rowsMax={12}
            value={props.logText}
            variant="outlined"
            fullWidth
          ></TextField>
        </Grid>
      </Grid>
    </div>
  );
}
