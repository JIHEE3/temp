import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import MainTemplate from 'pages/templates/MainTemplate';
import { makeStyles } from '@material-ui/core/styles';

import BasicModal from 'components/organisms/Modal/Basic';
import BasicModalHeader from 'components/molecules/Modal/Header';
import BasicModalSection from 'components/molecules/Modal/Section';
import BasicModalFooter from 'components/molecules/Modal/Footer';

import TextInput from 'components/atoms/TextInput';

const useStyles = makeStyles(theme => ({
  checkboxArea: {
    display: 'flex',
    '& > div': {
      display: 'inline-flex',
    },
  },
  checkboxBox: {
    display: 'inline-flex',
    paddingRight: 20,
    marginRight: 10,
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.box.secondaryBorderColor}`,
    borderRadius: 4,
  },
  checkboxTitle: {
    padding: '5px 20px',
    marginRight: 20,
    backgroundColor: '#fcfcff',
    borderRight: `1px solid ${theme.palette.box.secondaryBorderColor}`,
    '& .title': {
      fontSize: theme.palette.primary.defaultTextSize,
      color: '#9b9ca4',
      fontWeight: 'lighter',
    },
  },
  checkboxContents: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  checkboxContent: {
    marginLeft: 0,
    marginRight: 10,
    '& svg': {
      width: '.9em',
      height: '.9em',
    },
    '& > span:first-child': {
      padding: 1,
    },
    '& > span:last-child': {
      fontSize: theme.palette.primary.defaultTextSize,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

const RealTimeAdList = () => {
  // 공통
  const { t } = useTranslation();
  const classes = useStyles();

  // 계정관리 비밀번호 입력 모달 관련
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MainTemplate>
      <h2>실시간 광고 송출 리스트</h2>
      <div classes={classes.sample}></div>

      <BasicModal open={open}>
        <BasicModalHeader
          headerOpen={true}
          headerTitle={t('계정관리')}
          closeBtn={true}
          closeOnClick={handleClose}
        />
        <BasicModalSection
          textContent={t(
            '계정 관리 페이지로 이동하려면 비밀번호를 재임력 해주시기 바랍니다.'
          )}
        >
          <TextInput
            id={'sampleId'}
            label={t('비밀번호')}
            error={false}
            errorMessageOpen={false}
            errorMessage={t('error message')}
          ></TextInput>
        </BasicModalSection>
        <BasicModalFooter
          cancelOnClick={handleClose}
          cancelBtnOpen={true}
          cancelBtnTitle={t('확인')}
          comfirmOnClick={handleClose}
          comfirmBtnOpen={true}
          comfirmBtnTitle={t('확인')}
        />
      </BasicModal>
    </MainTemplate>
  );
};

export default RealTimeAdList;
