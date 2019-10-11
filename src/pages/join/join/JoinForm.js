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

import LoginFooter from 'components/organisms/Footer/LoginFooter';

const useStyles = makeStyles(theme => ({
  formWarp: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: `${theme.spacing(5)}px auto`,
    width: '500px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing(1)
  },
  textField: {
    margin: theme.spacing(1, 0)
  },
  submit: {
    marginTop: theme.spacing(4)
  },
  errorInfoText: {
    color: theme.palette.error.main
  }
}));

const JoinForm = ({ onChange, onBlur, onSubmit, errorMessage }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={clsx('mb-JoinForm', classes.formWarp)}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3">
          {t('회원 기본 정보')}
        </Typography>
        <form className={classes.container} autoComplete="off">
          <TextField
            id="id"
            label={t('아이디')}
            className={classes.textField}
            onChange={onChange('id')}
            onBlur={onBlur('id')}
            margin="normal"
            required
          />
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.id)}
          </FormHelperText>
          <TextField
            id="password"
            type="password"
            label={t('비밀번호')}
            className={classes.textField}
            onChange={onChange('password')}
            onBlur={onBlur('password')}
            margin="normal"
            required
          />
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.password)}
          </FormHelperText>
          <TextField
            id="confirmPassword"
            type="password"
            label={t('비밀번호 확인')}
            className={classes.textField}
            onChange={onChange('confirmPassword')}
            onBlur={onBlur('confirmPassword')}
            margin="normal"
            required
          />
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.confirmPassword)}
          </FormHelperText>
          <TextField
            id="name"
            label={t('이름')}
            className={classes.textField}
            onChange={onChange('name')}
            onBlur={onBlur('name')}
            margin="normal"
            required
          />
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.name)}
          </FormHelperText>
          <TextField
            id="email"
            aria-describedby="email-helper-text"
            label={t('사내 이메일 주소')}
            className={classes.textField}
            onChange={onChange('email')}
            onBlur={onBlur('email')}
            InputProps={{
              endAdornment: <InputAdornment>@enliple.com</InputAdornment>
            }}
            margin="normal"
            required
          />
          <FormHelperText id="email-helper-text">
            {t('사내 이메일 주소는 비밀번호 분실 시에도 사용됩니다.')}
          </FormHelperText>
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.email)}
          </FormHelperText>
          <TextField
            id="phoneNumber"
            label={t('휴대폰 번호')}
            className={classes.textField}
            onChange={onChange('phoneNumber')}
            onBlur={onBlur('phoneNumber')}
            margin="normal"
            required
          />
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.phoneNumber)}
          </FormHelperText>
          <TextField
            id="department"
            label={t('소속 부서')}
            className={classes.textField}
            onChange={onChange('department')}
            onBlur={onBlur('department')}
            margin="normal"
            required
          />
          <FormHelperText className={classes.errorInfoText}>
            {t(errorMessage.department)}
          </FormHelperText>
          <TextField
            id="rank"
            label={t('직급')}
            className={classes.textField}
            onChange={onChange('rank')}
            onBlur={onBlur('rank')}
            margin="normal"
            required
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
  );
};

export default JoinForm;
