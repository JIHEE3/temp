import React, { useState } from 'react';

import MainTemplate from 'pages/templates/MainTemplate';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getUserInfo } from 'lib/api/member';
import { checkPassword, changePassword } from 'lib/api/auth';

import { useTranslation } from 'react-i18next';

import BasicModal from 'components/organisms/Modal/Basic';
import BasicModalSection from 'components/molecules/Modal/Section';
import BasicModalFooter from 'components/molecules/Modal/Footer';

import { passwordRegexp } from 'lib/regexp/regexpConst';

const useStyles = makeStyles(theme => ({
  infoSection: {
    display: 'flex',
    width: '100%',
    paddingRight: 20,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    '& > ul': {
      width: '100%',
      '& li': {
        listStyle: 'none',
        boxSizing: 'border-box',
        '&first-child': {
          borderBottom: '1px solid #e5e8eb',
        },
      },
    },
    '& li:first-child': {
      borderBottom: '1px solid #e5e8eb',
      '& > h3': {
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
    '& > div': {
      display: 'inline-flex',
    },
  },
  infoList: {
    display: 'flex',
  },
  sectionTitle: {
    display: 'inline-flex',
    width: '100%',
    minWidth: 210,
    maxWidth: 230,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    boxSizing: 'border-box',
    backgroundColor: '#f6f6f9',
    borderRight: '1px solid #e5e8eb',
    fontSize: 15,
    fontWeight: 500,
    color: '#9b9ca4',
    '&:first-child': {
      color: '#898c9c',
      lineHeight: 1.9,
    },
  },
  inputBox: {
    width: 'calc(100% - 210px)',
    paddingLeft: 20,
    '& p': {
      margin: 0,
      color: '#ff2c2c',
    },
  },
  customInputBox: {
    paddingTop: 11,
  },
  textField: {
    width: '100%',
    maxWidth: 350,
    margin: 0,
    '& > div': {
      margin: '12px 0',
    },
    '& input': {
      padding: '8px 10px 7px',
      fontSize: 14,
    },
  },
  textFieldEmail: {
    width: 490,
  },
  buttonLi: {
    '& > div': {
      paddingTop: 10,
      paddingBottom: 10,
      '& > button': {
        width: 150,
        color: '#fff',
      },
    },
  },
  helperText: {
    color: '#c4c6c9 !important',
  },
  confirmPassword: {
    width: 410,
    margin: '17px 10px 8px',
    height: 50,
    color: '#fff',
  },
  beforeAuthSection: {
    background: '#fff',
    boxShadow: '0.1px 1px 3px 0 rgba(16, 17, 21, 0.03)',
  },
  centerBox: {
    width: 450,
    padding: '150px 0 200px',
    margin: '0 auto',
    textAlign: 'center',
    '& > .title': {
      marginBottom: 10,
      fontSize: 22,
    },
    '& > .titleContent': {
      marginBottom: 10,
      fontSize: 15,
      '& > span': {
        color: theme.palette.primary.mainColor,
      },
    },
  },
  confirmPasswordInput: {
    width: 410,
  },
  modalTitleContent: {
    marginBottom: 20,
  },
  modalConfirmButton: {
    width: 200,
    color: '#fff',
  },
}));

let errorText = '';
let password = '';

const ChangeInfo = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    USER_ID: '',
    EMAIL: '',
    NAME: '',
    ORGAN_1: '',
    ORGAN_2: '',
    ORGAN_3: '',
    PHONE: '',
    RANK: '',
  });
  const [passwordChange, setPasswordChange] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [pageUseDataError, setPageUseDataError] = useState({
    rePassword: false,
    repassWordDisabled: true,
    newPassword: false,
    confirmPassword: false,
    disabled: true,
  });
  const [pageUseDataMessage, setPageUseDataMessage] = useState({
    rePassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordCheckModal, setPasswordCheckModal] = useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);

  const handlePasswordCheckModalOpen = () => {
    setPasswordCheckModal(true);
  };

  const handlePasswordCheckModalClose = () => {
    setPasswordCheckModal(false);
  };

  const handlePasswordChangeModalOpen = () => {
    setPasswordChangeModal(true);
  };

  const handlePasswordChangeModalClose = () => {
    setPasswordChangeModal(false);
    window.location.replace('/changeInfo');
  };

  const handleRePassword = e => {
    password = e.target.value;

    if (!passwordRegexp.test(password)) {
      setPageUseDataError({
        ...pageUseDataError,
        rePassword: true,
      });
      setPageUseDataMessage({
        ...pageUseDataMessage,
        rePassword: '8 ~ 14자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
      });
      return;
    } else if (passwordRegexp.test(password)) {
      setPageUseDataError({
        ...pageUseDataError,
        rePassword: false,
        repassWordDisabled: false,
      });
      setPageUseDataMessage({
        ...pageUseDataMessage,
        rePassword: '',
      });
    }
  };

  const handleUserInfoChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const disabledOn = e => {
    setPageUseDataError({
      ...pageUseDataError,
      disabled: true,
    });
  };

  const disabledOff = e => {
    setPageUseDataError({
      ...pageUseDataError,
      disabled: false,
    });
  };

  const handleConfirmPassword = e => {
    e.preventDefault();
    checkPassword(password)
      .then(response => {
        const { success } = response.data;
        if (success === false) {
          errorText = response.data.message;
          handlePasswordCheckModalOpen();
        }
        if (success) {
          setConfirmPassword(true);
          getUserInfo().then(response => {
            setUserInfo({ ...response.data.data });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleValidationNewPassword = e => {
    const { value } = e.target;

    setPasswordChange({
      ...passwordChange,
      [e.target.name]: e.target.value,
    });

    if (!passwordRegexp.test(value)) {
      setPageUseDataError({
        ...pageUseDataError,
        newPassword: true,
      });
      setPageUseDataMessage({
        ...pageUseDataMessage,
        newPassword: '8 ~ 14자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
      });
      disabledOn();
      return;
    } else if (passwordRegexp.test(value)) {
      setPageUseDataError({
        ...pageUseDataError,
        newPassword: false,
      });
      setPageUseDataMessage({
        ...pageUseDataMessage,
        newPassword: '',
      });
    }

    if (passwordChange.confirmPassword === '') {
      disabledOn();
      return;
    } else if (value === '') {
      disabledOn();
      return;
    } else if (passwordChange.confirmPassword !== value) {
      disabledOn();
      return;
    } else if (passwordChange.confirmPassword === value) {
      disabledOff();
    }
  };

  const handleValidationConfirmPassword = e => {
    const { value, name } = e.target;
    setPasswordChange({
      ...passwordChange,
      [name]: value,
    });
    if (!passwordRegexp.test(value)) {
      setPageUseDataError({
        ...pageUseDataError,
        confirmPassword: true,
      });
      setPageUseDataMessage({
        ...pageUseDataMessage,
        confirmPassword:
          '8 ~ 14자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
      });
      disabledOn();
      return;
    } else if (passwordRegexp.test(value)) {
      setPageUseDataError({
        ...pageUseDataError,
        confirmPassword: false,
      });
      setPageUseDataMessage({
        ...pageUseDataMessage,
        confirmPassword: '',
      });
    }

    if (passwordChange.newPassword === '') {
      disabledOn();
      return;
    } else if (value === '') {
      disabledOn();
      return;
    } else if (passwordChange.newPassword !== value) {
      disabledOn();
      return;
    } else if (passwordChange.newPassword === value) {
      disabledOff();
    }
  };

  const handleChangePassword = e => {
    e.preventDefault();
    if (passwordChange.newPassword === '') {
      setPageUseDataMessage({
        ...pageUseDataMessage,
        errorMessage: '변경할 비밀번호를 입력해주세요.',
      });
      console.log('변경할 비밀번호를 입력해주세요.');
      disabledOn();
      return;
    } else if (passwordChange.confirmPassword === '') {
      setPageUseDataMessage({
        ...pageUseDataMessage,
        errorMessage: '비밀번호를 확인해주세요.',
      });
      console.log('비밀번호를 확인해주세요.');
      disabledOn();
      return;
    } else if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      setPageUseDataMessage({
        ...pageUseDataMessage,
        errorMessage: '입력한 비밀번호를 확인해주세요.',
      });
      console.log('변경할 비밀번호를 확인해주세요.');
      disabledOn();
      return;
    } else if (passwordChange.newPassword === passwordChange.confirmPassword) {
      setPageUseDataMessage({
        ...pageUseDataMessage,
        errorMessage: '비밀번호 체크가 완료되었습니다.',
      });
      console.log('비밀번호 체크가 완료되었습니다.');
      disabledOff();
    }

    changePassword(passwordChange.newPassword, passwordChange.confirmPassword)
      .then(response => {
        handlePasswordChangeModalOpen();
        setPasswordChange({
          newPassword: '',
          confirmPassword: '',
        });
      })
      .catch(error => {
        alert('비밀번호 변경 실패');
      });
  };

  return (
    <MainTemplate>
      {!confirmPassword ? (
        <form noValidate autoComplete="off" onSubmit={handleConfirmPassword}>
          <h2 className="globals-templateTitle">{t('회원 정보 수정')}</h2>
          <div className={classes.beforeAuthSection}>
            <div className={classes.centerBox}>
              <h3 className="title">{t('비밀번호 재입력')}</h3>
              <p className="titleContent">
                {t(
                  '정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.'
                )}
              </p>
              <TextField
                label={t('비밀번호 확인')}
                margin="normal"
                onChange={handleRePassword}
                error={pageUseDataError.rePassword}
                variant="outlined"
                type="password"
                className={classes.confirmPasswordInput}
                helperText={pageUseDataMessage.rePassword}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.confirmPassword}
                disabled={pageUseDataError.repassWordDisabled}
              >
                {t('확인')}
              </Button>
            </div>
          </div>

          <BasicModal open={passwordCheckModal}>
            <BasicModalSection textContent={errorText} />
            <BasicModalFooter
              comfirmOnClick={handlePasswordCheckModalClose}
              comfirmBtnOpen={true}
              comfirmBtnTitle={t('확인')}
            />
          </BasicModal>
        </form>
      ) : (
        <>
          <h2 className="globals-templateTitle">{t('회원 정보 수정')}</h2>
          <form noValidate autoComplete="off" onSubmit={handleChangePassword}>
            <div className={classes.infoSection}>
              <ul>
                <li className={classes.infoList}>
                  <h3 className={classes.sectionTitle}>{t('기본정보')}</h3>
                  <div></div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('아이디')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      value={userInfo.USER_ID}
                      variant="outlined"
                      name="USER_ID"
                      onChange={handleUserInfoChange}
                      disabled
                    />
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('비밀번호')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      type="password"
                      error={pageUseDataError.newPassword}
                      name="newPassword"
                      variant="outlined"
                      value={passwordChange.newPassword}
                      className={classes.textField}
                      margin="normal"
                      onChange={handleValidationNewPassword}
                    />
                    <FormHelperText className={classes.errorInfoText}>
                      {pageUseDataMessage.newPassword}
                    </FormHelperText>
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('비밀번호 확인')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      type="password"
                      error={pageUseDataError.confirmPassword}
                      className={classes.textField}
                      margin="normal"
                      value={passwordChange.confirmPassword}
                      variant="outlined"
                      name="confirmPassword"
                      onChange={handleValidationConfirmPassword}
                    />
                    <FormHelperText className={classes.errorInfoText}>
                      {pageUseDataMessage.confirmPassword}
                    </FormHelperText>
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('이름')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      value={userInfo.NAME}
                      variant="outlined"
                      name="NAME"
                      onChange={handleUserInfoChange}
                      disabled
                    />
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>
                    {t('사내 이메일 주소')}
                  </h4>
                  <div className={classes.inputBox}>
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      value={userInfo.EMAIL}
                      variant="outlined"
                      name="EMAIL"
                      onChange={handleUserInfoChange}
                      disabled
                    />
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('휴대폰 번호')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      value={userInfo.PHONE}
                      variant="outlined"
                      name="PHONE"
                      onChange={handleUserInfoChange}
                      disabled
                    />
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('소속 부서')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      value={`${userInfo.ORGAN_1} ${userInfo.ORGAN_2} ${userInfo.ORGAN_3}`}
                      variant="outlined"
                      name="EMAIL"
                      onChange={handleUserInfoChange}
                      disabled
                    />
                  </div>
                </li>
                <li className={classes.infoList}>
                  <h4 className={classes.sectionTitle}>{t('직급')}</h4>
                  <div className={classes.inputBox}>
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      value={userInfo.RANK}
                      variant="outlined"
                      name="RANK"
                      onChange={handleUserInfoChange}
                      disabled
                    />
                  </div>
                </li>
                <li className={`${classes.infoList} ${classes.buttonLi}`}>
                  <p className={classes.sectionTitle}></p>
                  <div className={classes.inputBox}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={pageUseDataError.disabled}
                    >
                      {t('수정')}
                    </Button>
                  </div>
                </li>
              </ul>
            </div>

            <BasicModal open={passwordChangeModal}>
              <BasicModalSection
                textContent={t('회원 기본 정보가 수정되었습니다.')}
              />
              <BasicModalFooter
                comfirmOnClick={handlePasswordChangeModalClose}
                comfirmBtnOpen={true}
                comfirmBtnTitle={t('확인')}
              />
            </BasicModal>
          </form>
        </>
      )}
    </MainTemplate>
  );
};

export default ChangeInfo;
