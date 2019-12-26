import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modalFooter: {
    height: 60,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    borderTop: '1px solid #e5e8eb',
  },
  modalFooterButton: {
    height: '100%',
    flex: '1 1 100px',
    backgroundColor: '#fff',
    borderRight: '1px solid #e5e8eb',
    borderRadius: 0,
    boxShadow: 'none',
    fontSize: 18,
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: 'none',
    },
    '&:last-child': {
      borderRight: 0,
    },
  },
  cancelBtn: {
    '&:hover': {
      color: '#9e9ea0',
    },
  },
  comfirmBtn: {
    '&:hover': {
      color: '#4ed1bd',
    },
  },
}));

const ModalBasic = ({
  cancelBtnOpen,
  comfirmBtnOpen,
  cancelOnClick,
  comfirmOnClick,
  cancelBtnTitle,
  comfirmBtnTitle,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.modalFooter}>
        {cancelBtnOpen && (
          <Button
            variant="contained"
            color="primary"
            className={`${classes.modalFooterButton} ${classes.cancelBtn}`}
            onClick={cancelOnClick}
          >
            {cancelBtnTitle}
          </Button>
        )}
        {comfirmBtnOpen && (
          <Button
            variant="contained"
            color="primary"
            className={`${classes.modalFooterButton} ${classes.comfirmBtn}`}
            onClick={comfirmOnClick}
          >
            {comfirmBtnTitle}
          </Button>
        )}
      </div>
    </>
  );
};

export default withRouter(ModalBasic);
