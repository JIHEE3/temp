import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

const useStyles = makeStyles(theme => ({
  modalHeader: {
    position: 'relative',
    height: 60,
    borderBottom: '1px solid #e5e8eb',
  },
  title: {
    fontSize: 18,
    color: '#4d4f5c',
    textAlign: 'center',
    lineHeight: '60px',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 20,
    cursor: 'pointer',
  },
}));

/**
 *
 */
const ModalBasic = ({
  headerOpen,
  headerTitle,
  closeBtn,
  closeOnClick,
  children,
}) => {
  const classes = useStyles();

  return (
    <>
      {headerOpen && (
        <div className={classes.modalHeader}>
          <h2 className={classes.title}>{headerTitle}</h2>
          {closeBtn && (
            <div className={classes.closeBtn}>
              <FontAwesomeIcon
                icon={faTimes}
                color="#4d5059"
                size="2x"
                onClick={closeOnClick}
              />
            </div>
          )}
          {children}
        </div>
      )}
    </>
  );
};

export default withRouter(ModalBasic);
