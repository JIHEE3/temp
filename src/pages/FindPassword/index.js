import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';

import { Scrollbars } from 'react-custom-scrollbars';

import LoginFormTemplate from 'pages/templates/LoginFormTemplate';
import MainLogo from 'images/common/logo/logo_white.png';

import { findPassword, notiChangePassword } from 'lib/api/auth';

import BasicModal from 'components/organisms/Modal/Basic';
// import BasicModalHeader from 'components/molecules/Modal/Header';
import BasicModalSection from 'components/molecules/Modal/Section';
import BasicModalFooter from 'components/molecules/Modal/Footer';

const useStyles = makeStyles(theme => ({
  modalTitleContent: {
    // marginBottom: 20,
  },
  modalConfirmButton: {
    width: 200,
    color: '#fff',
  },
  loginWrap: {
    position: 'relative',
    display: 'flex',
    margin: `${theme.spacing(5)}px auto`,
    borderRadius: '2px',
    boxSizing: 'border-box',
    minHeight: '497px',
    padding: '59px 69px',
    maxWidth: '100%',
    border: 0,
    '& > div': {
      margin: 'auto',
    },
  },
  formLogo: {
    margin: '0 auto 30px',
    textAlign: 'center',
    '& > img': {
      width: 190,
    },
  },
  loginFormWrap: {
    display: 'block',
    width: '100%',
    minWidth: 500,
    padding: '60px 70px',
    borderTop: '4px solid #85b74e',
    fontSize: theme.spacing(2),
    verticalAlign: 'top',
    boxSizing: 'border-box',
    textAlign: 'left',
    backgroundColor: '#fff',
    borderRadius: 4,
    '& > h4': {
      fontFamily:
        "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  },
  customScroll: {
    position: 'fixed !important',
    '& > div': {
      backgroundColor: '#3a4652',
    },
  },
  formContainer: {
    '& > div': {
      display: 'flex',
    },
  },
  submitBtn: {
    width: '100%',
    maxWidth: 360,
    marginTop: 10,
    color: '#fff',
  },
  errorMessage: {
    maxWidth: 355,
    marginTop: theme.spacing(1),
    color: theme.palette.primary.error,
    fontSize: theme.palette.primary.defaultTextSize,
    fontWeight: 'bold',
  },
  formWrap: {
    maxWidth: 360,
  },
  textField: {
    width: 360,
  },
}));

const LoginForm = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [findPasswordState, setFindPasswordState] = useState(false);
  const [findPasswordData, setFindPasswordData] = useState({
    email: '',
    emailMessage: '',
    emailError: false,
    userId: '',
    newPassword: {
      password: '',
      message: '',
      error: false,
    },
    confirmPassword: {
      password: '',
      message: '',
      error: false,
    },
    changeFailed: true,
    changeFailedMessage: '',
    scucessState: 0,
    modalState: false,
    sendEmailBtnDisable: true,
    changePwBtnDisable: true,
  });

  // 페이지 로딩 시 도메인에서 userId를 구분해서 랜더링 시켜주는 코드
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  function checkUserId() {
    let routerUerId = query.get('userId');

    if (routerUerId === null) {
      setFindPasswordState(false);
    } else {
      setFindPasswordState(true);
      setFindPasswordData({
        ...findPasswordData,
        userId: query.get('userId'),
      });
    }
  }

  // 랜더링 되었을 때 한번만 실행되도록 하는 코드
  useEffect(checkUserId, []);

  // 이메일 주소 입력 INPUT에서 유효성 검사해주는 핸들
  const handleEmailData = e => {
    const { value } = e.target;
    const emailRegexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (emailRegexp.test(value)) {
      setFindPasswordData({
        ...findPasswordData,
        email: value,
        sendEmailBtnDisable: false,
      });
    } else {
      setFindPasswordData({
        ...findPasswordData,
        email: value,
        sendEmailBtnDisable: true,
      });
    }
  };

  // 변경 할 패스워드 입력 시 데이터 넣어주는 핸들
  const handleData = e => {
    const { value, name } = e.target;
    const regexp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,14}$/;

    let pageValue = {
      ...findPasswordData,
      [e.target.name]: {
        password: e.target.value,
      },
    };

    if (regexp.test(value)) {
      switch (name) {
        case 'newPassword':
          if (value === pageValue.confirmPassword.password) {
            pageValue = {
              ...pageValue,
              confirmPassword: {
                ...pageValue.confirmPassword,
                message: '',
                error: false,
              },
              changePwBtnDisable: false,
            };
          } else {
            pageValue = {
              ...pageValue,
              confirmPassword: {
                ...pageValue.confirmPassword,
                message: t('패스워드가 일치하지 않습니다.'),
                error: true,
              },
              changePwBtnDisable: true,
            };
          }
          break;
        case 'confirmPassword':
          if (value === pageValue.newPassword.password) {
            pageValue = {
              ...pageValue,
              confirmPassword: {
                ...pageValue.confirmPassword,
                message: '',
                error: false,
              },
              changePwBtnDisable: false,
            };
          } else {
            pageValue = {
              ...pageValue,
              confirmPassword: {
                ...pageValue[e.target.name],
                message: t('패스워드가 일치하지 않습니다.'),
                error: true,
              },
              changePwBtnDisable: true,
            };
          }
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case 'newPassword':
          if (value === '') {
            pageValue = {
              ...pageValue,
              [e.target.name]: {
                ...pageValue[e.target.name],
                message: t('비밀번호를 입력해 주세요'),
                error: true,
              },
              changePwBtnDisable: true,
            };
          } else {
            pageValue = {
              ...pageValue,
              [e.target.name]: {
                ...pageValue[e.target.name],
                message: t(
                  '8~14자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
                ),
                error: true,
              },
              changePwBtnDisable: true,
            };
          }
          break;
        case 'confirmPassword':
          if (value === '') {
            pageValue = {
              ...pageValue,
              [e.target.name]: {
                ...pageValue[e.target.name],
                message: t('비밀번호를 입력해 주세요'),
                error: true,
              },
              changePwBtnDisable: true,
            };
          } else {
            pageValue = {
              ...pageValue,
              [e.target.name]: {
                ...pageValue[e.target.name],
                message: t(
                  '8~14자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
                ),
                error: true,
              },
              changePwBtnDisable: true,
            };
          }
          break;
        default:
          break;
      }
    }
    setFindPasswordData(pageValue);
  };

  // 비밀번호 변경 알림 요청 API
  const handleSendEmail = e => {
    e.preventDefault();
    findPassword(findPasswordData.email)
      .then(response => {
        const { success } = response.data;
        if (success) {
          setFindPasswordData({
            ...findPasswordData,
            emailMessage: t(
              '이메일 인증 요청이 되었습니다. 이메일을 확인해주세요.'
            ),
            emailError: false,
          });
        } else if (success === false) {
          setFindPasswordData({
            ...findPasswordData,
            changeFailed: true,
            emailMessage: response.data.message,
            emailError: true,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 패스워드 변경 요청 API
  const handleChangePassword = e => {
    e.preventDefault();
    notiChangePassword(
      findPasswordData.userId,
      findPasswordData.newPassword.password,
      findPasswordData.confirmPassword.password
    )
      .then(response => {
        const { success } = response.data;
        if (success) {
          setOpenModal(true);
        } else if (success === false) {
          setFindPasswordData({
            ...findPasswordData,
            changeFailed: success,
            changeFailedMessage: response.data.message,
          });
        }
      })
      .catch(error => {
        alert(t('비밀번호 변경에 실패하였습니다. 관리자에게 문의해주세요.'));
      });
  };

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={classes.customScroll}
    >
      <LoginFormTemplate>
        <div className={classes.loginWrap}>
          <div className={classes.loginInner}>
            <div className={classes.formLogo}>
              <Link href="/">
                <img src={MainLogo} alt="logo" />
              </Link>
            </div>
            <div className={classes.loginFormWrap}>
              {/* <Typography variant="h4" gutterBottom></Typography> */}

              {!findPasswordState ? (
                <>
                  <form
                    noValidate
                    autoComplete="off"
                    className={classes.formWrap}
                    onSubmit={handleSendEmail}
                  >
                    <TextField
                      required
                      label="Email"
                      name="email"
                      className={classes.textField}
                      margin="normal"
                      type="email"
                      variant="outlined"
                      onChange={handleEmailData}
                    />

                    {findPasswordData.emailError ? (
                      <FormHelperText
                        className={`${classes.errorInfoText} errorInfoText`}
                      >
                        {findPasswordData.emailMessage}
                      </FormHelperText>
                    ) : (
                      <FormHelperText className={`${classes.errorInfoText}`}>
                        {findPasswordData.emailMessage}
                      </FormHelperText>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled={findPasswordData.sendEmailBtnDisable}
                      onClick={handleSendEmail}
                      className={`${classes.whiteText} ${classes.submitBtn}`}
                    >
                      {t('이메일 전송')}
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <form
                    className={classes.formContainer}
                    autoComplete="off"
                    onSubmit={handleChangePassword}
                  >
                    <TextField
                      error={findPasswordData.newPassword.error}
                      name="newPassword"
                      type="password"
                      label={t('비밀번호')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      onChange={handleData}
                    />
                    <FormHelperText
                      className={`${classes.errorInfoText} errorInfoText`}
                    >
                      {findPasswordData.newPassword.message}
                    </FormHelperText>
                    <TextField
                      error={findPasswordData.confirmPassword.error}
                      name="confirmPassword"
                      label={t('비밀번호 확인')}
                      type="password"
                      className={classes.textField}
                      autoComplete="current-password"
                      margin="normal"
                      variant="outlined"
                      onChange={handleData}
                    />
                    <FormHelperText
                      className={`${classes.errorInfoText} errorInfoText`}
                    >
                      {findPasswordData.confirmPassword.message}
                    </FormHelperText>

                    <div className={classes.loginOption}>
                      <Typography
                        className={classes.errorMessage}
                        variant="body1"
                      >
                        {findPasswordData.changeFailedMessage}
                      </Typography>
                    </div>
                    <div>
                      {findPasswordData.changeFailed ? (
                        <>
                          <Button
                            disabled={findPasswordData.changePwBtnDisable}
                            type="submit"
                            variant="contained"
                            size="large"
                            color="primary"
                            className={`${classes.whiteText} ${classes.submitBtn}`}
                            onClick={handleChangePassword}
                          >
                            {t('비밀번호 재설정')}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            color="primary"
                            className={`${classes.whiteText} ${classes.submitBtn}`}
                            href="/findPassword"
                          >
                            {t('비밀번호 알림 재요청')}
                          </Button>
                        </>
                      )}
                    </div>
                  </form>
                  <BasicModal open={openModal}>
                    {/* <BasicModalHeader
                      headerOpen={false}
                      headerTitle={'헤더 타이틀'}
                      closeBtn={true}
                      closeOnClick={false}
                    ></BasicModalHeader> */}
                    <BasicModalSection
                      textContent={t('비밀번호가 변경되었습니다.')}
                    />
                    <BasicModalFooter
                      comfirmOnClick={() => window.location.replace('/')}
                      cancelBtnOpen={false}
                      comfirmBtnOpen={true}
                      comfirmBtnTitle={t('확인')}
                    />
                  </BasicModal>
                </>
              )}
            </div>
          </div>
        </div>
      </LoginFormTemplate>
    </Scrollbars>
  );
};

export default LoginForm;
