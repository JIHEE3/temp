import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { Scrollbars } from 'react-custom-scrollbars';

import LoginFooter from 'components/organisms/Footer/LoginFooter';

import MainLogo from 'images/common/logo/logo_black.png';

const useStyles = makeStyles(theme => ({
  customScroll: {
    position: 'fixed !important',
  },
  formWarp: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: '#f6f6f9',
  },
  paper: {
    width: '500px',
    padding: theme.spacing(3, 2),
    margin: `${theme.spacing(5)}px auto`,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  titleBox: {
    textAlign: 'center',
    '& > img': {
      width: 190,
      marginBottom: 15,
    },
    '& > h3': {
      fontSize: 22,
      fontWeight: 'bold',
      fontFamily:
        "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  },
  textField: {
    margin: '13px 0 0',
    backgroundColor: theme.palette.primary.inputBG,
    // '& > div': {
    //   height: 50,
    //   backgroundColor: 'rgba(255, 255, 255, 0.5)',
    //   border: '1px solid #e8e9ec',
    //   borderRadius: 4,
    //   '& > input': {
    //     height: 38,
    //     padding: '5px 10px',
    //   },
    // },
    // '& > label': {
    //   color: '#000',
    // },
  },
  textFieldEmail: {
    '& p': {
      marginRight: 15,
    },
  },
  submit: {
    marginTop: theme.spacing(2),
    color: '#fff',
  },
  errorInfoText: {
    color: theme.palette.error.main,
    // marginTop: 0,
  },
}));

const JoinForm = ({ onChange, onBlur, onSubmit, errorMessage }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={classes.customScroll}
    >
      <div className={clsx('mb-JoinForm', classes.formWarp)}>
        <Paper className={classes.paper}>
          <div className={classes.titleBox}>
            <img src={MainLogo} alt="logo" />
            <Typography variant="h5" component="h3">
              {t('회원 기본정보')}
            </Typography>
          </div>
          <form className={classes.container} autoComplete="off">
            <TextField
              required
              id="id"
              label={t('아이디')}
              onChange={onChange('id')}
              onBlur={onBlur('id')}
              margin="normal"
              className={classes.textField}
              type="text"
              name="text"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.id)}
            </FormHelperText>
            <TextField
              required
              id="password"
              type="password"
              label={t('비밀번호')}
              className={classes.textField}
              onChange={onChange('password')}
              onBlur={onBlur('password')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.password)}
            </FormHelperText>
            <TextField
              required
              id="confirmPassword"
              type="password"
              label={t('비밀번호 확인')}
              className={classes.textField}
              onChange={onChange('confirmPassword')}
              onBlur={onBlur('confirmPassword')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.confirmPassword)}
            </FormHelperText>
            <TextField
              required
              id="name"
              label={t('이름')}
              className={classes.textField}
              onChange={onChange('name')}
              onBlur={onBlur('name')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.name)}
            </FormHelperText>
            <TextField
              required
              id="email"
              label={t('사내 이메일 주소')}
              className={`${classes.textField} ${classes.textFieldEmail}`}
              aria-describedby="email-helper-text"
              onChange={onChange('email')}
              onBlur={onBlur('email')}
              InputProps={{
                endAdornment: <InputAdornment>@enliple.com</InputAdornment>,
              }}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText id="email-helper-text">
              {t('사내 이메일 주소는 비밀번호 분실 시에도 사용됩니다.')}
            </FormHelperText>
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.email)}
            </FormHelperText>
            <TextField
              required
              id="phoneNumber"
              label={t('휴대폰 번호')}
              className={classes.textField}
              onChange={onChange('phoneNumber')}
              onBlur={onBlur('phoneNumber')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.phoneNumber)}
            </FormHelperText>
            <TextField
              required
              id="department"
              label={t('소속 부서')}
              className={classes.textField}
              onChange={onChange('department')}
              onBlur={onBlur('department')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.department)}
            </FormHelperText>
            <TextField
              required
              id="rank"
              label={t('직급')}
              className={classes.textField}
              onChange={onChange('rank')}
              onBlur={onBlur('rank')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText className={classes.errorInfoText}>
              {t(errorMessage.rank)}
            </FormHelperText>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              {t('등록')}
            </Button>
          </form>
        </Paper>
        <LoginFooter />
      </div>
    </Scrollbars>
  );
};

export default JoinForm;
