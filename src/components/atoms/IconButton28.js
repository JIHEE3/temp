import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '28px',
    height: '28px',
    boxSizing: 'border-box',
    padding: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
  },
}));

const IconButton28 = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button classes={{ root: classes.root }} {...rest}>
      {children}
    </Button>
  );
};

export default IconButton28;
