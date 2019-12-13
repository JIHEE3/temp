import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: `24px !important`,
  },
}));

export default function PopoverFooter({ children }) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}
