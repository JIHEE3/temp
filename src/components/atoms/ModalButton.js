import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

const ModalButtonStyles = makeStyles(theme => ({
  button: {
    marginRight: 5,
    color: '#8d9ba2',
    '&:last-child': {
      marginRight: 0,
    },
  },
  buttonHover: {
    '&:hover': {
      background: '#4ed1bd',
      color: '#fff',
    },
  },
  red: {
    border: '1px solid red',
  },
}));

const ModalButton = ({ buttonText, buttonClickEvent = null, value, name }) => {
  const classes = ModalButtonStyles();

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        size="small"
        className={classes.button}
        classes={{
          contained: classes.buttonHover,
        }}
        onClick={buttonClickEvent}
        value={value}
        name={name}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ModalButton;
