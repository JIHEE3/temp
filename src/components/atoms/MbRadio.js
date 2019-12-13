import React from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiSvgIcon-root:first-child': {
      color: '#e5e8eb',
    },
  },
}));

export default function MbRadio({ ...rest }) {
  const classes = useStyles();

  return <Radio className={classes.root} {...rest} />;
}
