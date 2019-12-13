import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

/**
 * 기본 레이아웃 모달 불러오기
 */
const ModalBasic = ({ basicModalState, handleModalClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      {/* <Button
        variant="contained"
        color="primary"
        className={`${classes.modalFooterButton} ${classes.cancelBtn}`}
        // onClick={handleModalClose}
      >
        {t('취소')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={`${classes.modalFooterButton} ${classes.cancelBtn}`}
      >
        {basicModalState}
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        className={`${classes.modalFooterButton} ${classes.confirmBtn}`}
        onClick={handleModalClose}
      >
        {t('확인')}
      </Button>
    </>
  );
};

export default withRouter(ModalBasic);
