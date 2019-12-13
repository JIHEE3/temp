import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    height: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(3),
  },
}));

function MbCircularProgress() {
  const classes = useStyles();
  return <CircularProgress className={classes.progress} />;
}

export default MbCircularProgress;
