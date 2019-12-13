import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  modalSection: {
    padding: '33px 75px',
    fontSize: 15,
    '& .box': {
      height: 400,
      width: 500,
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'space-between',
      '& > div': {
        padding: 20,
        border: '2px solid rgb(96, 139, 168)',
        borderRadius: 5,
        backgroundColor: 'rgba(96, 139, 168, .2)',
        flex: '1 1 100px',
      },
    },
  },
}));

const ModalBasic = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.modalSection}>
        {props.textContent && (
          <p className={classes.modalTitleContent}>{props.textContent}</p>
        )}
        {props.children}
      </div>
    </>
  );
};

export default withRouter(ModalBasic);
