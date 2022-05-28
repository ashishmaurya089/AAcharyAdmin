import React, { useState } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  title: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    marginTop: '35%',
    textAlign: 'center',
    verticalAlign: 'middle'
  }
}));


export default function BigStat(props) {
  var { product, total, color, registrations, bounce } = props;
  var classes = useStyles();
  var theme = useTheme();

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={3}>
          <div style={{ height: '100%' }}>
            <h4 className={classes.title}>{product}</h4>

          </div>
        </Paper>
      </div>
    </>
  )
}

