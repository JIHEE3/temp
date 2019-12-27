import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography, Button, Breadcrumbs } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Scrollbars } from 'react-custom-scrollbars';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLockAlt } from '@fortawesome/pro-regular-svg-icons';

import MbInput from 'components/atoms/MbInput';
import LoginFormTemplate from 'pages/templates/LoginFormTemplate';
import MainLogo from 'images/common/logo/logo_white.png';

// import ModalBasic from 'components/organisms/Modal/Basic';

const useStyles = makeStyles(theme => ({
  loginWrap: {
    position: 'relative',
    display: 'flex',
    // margin: 40px auto
    margin: `${theme.spacing(5)}px auto`,
    borderRadius: '2px',
    boxSizing: 'border-box',
    minHeight: '497px',
    padding: '59px 69px',
    maxWidth: '100%',
    border: 0,
  },
  loginInner: {
    margin: 'auto',
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
  loginMessage: {
    maxWidth: 355,
    marginTop: theme.spacing(1),
    color: theme.palette.primary.error,
    fontSize: theme.palette.primary.defaultTextSize,
  },
  loginNav: {
    marginLeft: 'auto',
    '& a': {
      cursor: 'pointer',
    },
  },
  loginNavLink: {
    marginRight: 5,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  textField: {
    '& input': {
      height: 50,
      boxSizing: 'border-box',
    },
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing(1.5),
  },
  loginOption: {
    '& > div:first-child': {
      display: 'flex',
    },
  },
  saveId: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    marginLeft: 0,
    '& span': {
      padding: '0 0 0 2px',
      fontSize: '0.9rem',
    },
  },
  whiteText: {
    color: '#fff',
  },
  submitBtn: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  smallText: {
    fontSize: '.9rem',
    textDecoration: 'none',
  },
  checkboxLeftResize: {
    marginLeft: '-8px',
  },
  formLogo: {
    margin: '0 auto 30px',
    textAlign: 'center',
    '& > img': {
      width: 190,
    },
  },
}));

const LoginForm = ({
  form,
  error,
  saveId = false,
  onChange,
  onChangeCheckbox,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

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
              <img src={MainLogo} alt="logo" />
            </div>
            <div className={classes.loginFormWrap}>
              <Typography variant="h4" gutterBottom></Typography>
              <form
                className={classes.container}
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <MbInput
                  id="userId"
                  name="userId"
                  placeholder={t('아이디')}
                  className={classes.textField}
                  value={form.userId}
                  onChange={onChange('userId')}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon
                          icon={faUser}
                          color="#e8e9ec"
                          style={{ fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <MbInput
                  id="userPassword"
                  name="Password"
                  type="password"
                  placeholder={t('비밀번호')}
                  className={classes.textField}
                  value={form.password}
                  onChange={onChange('password')}
                  autoComplete="current-password"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon
                          icon={faLockAlt}
                          color="#e8e9ec"
                          style={{ fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <div className={classes.loginOption}>
                  <div>
                    <div className={classes.saveId}>
                      <FormControlLabel
                        className={classes.checkboxLeftResize}
                        control={
                          <Checkbox
                            color="primary"
                            checked={saveId}
                            onChange={onChangeCheckbox}
                            value="saveId"
                          />
                        }
                        label={t('아이디 저장')}
                        labelPlacement="end"
                      />
                    </div>
                    <div className={classes.loginNav}>
                      <Paper elevation={0} className={classes.paper}>
                        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                          <Link
                            color="inherit"
                            // href="/findPassword"
                            href="/findPassword"
                            className={classes.smallText}
                          >
                            {t('비밀번호 재설정')}
                          </Link>
                          <Link
                            href="/join"
                            className={`${classes.loginNavLink} ${classes.smallText}`}
                          >
                            {t('계정 생성')}
                          </Link>
                        </Breadcrumbs>
                      </Paper>
                    </div>
                  </div>
                  <Typography className={classes.loginMessage} variant="body1">
                    {error}
                  </Typography>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className={`${classes.whiteText} ${classes.submitBtn}`}
                >
                  {t('로그인')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </LoginFormTemplate>
    </Scrollbars>
  );
};

export default LoginForm;
