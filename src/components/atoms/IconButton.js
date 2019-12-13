import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  label: {
    '& > :first-child': {
      marginRight: '5px',
    },
  },
}));

const IconButton = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Button classes={{ label: classes.label }} {...rest}>
      {children}
    </Button>
  );
};

export default IconButton;
