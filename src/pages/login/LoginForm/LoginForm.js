import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button,
  Breadcrumbs,
  Avatar
} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';

import ChildCareIcon from '@material-ui/icons/ChildCare';

import StyledBreadcrumb from 'components/atoms/StyledBreadcrumb';

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
    border: 0
  },
  loginInner: {
    display: 'flex',
    margin: 'auto'
  },
  loginBannerWrap: {
    display: 'inline-flex',
      width: '540px',
      height: '402px',
      paddingRight: theme.spacing(5),
      fontSize: theme.spacing(2),
      verticalAlign: 'top',
      textAlign: 'left'
  },
  loginBanner: {
    margin: 'auto'
  },
  loginFormWrap: {
    display: 'inline-block',
    width: '100%',
    maxWidth: theme.spacing(60),
    padding: "60px 70px",
    border: '1px solid #e5e5e5',
    fontSize: theme.spacing(2),
    verticalAlign: 'top',
    boxSizing: 'border-box',
    textAlign: 'left'
  },
  loginMessage: {
    maxWidth: '315px',
    height: theme.spacing(3),
    margin: theme.spacing(1),
  },
  loginNav: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',

    '& a': {
      cursor: 'pointer'
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing(1.5)
  }
}));

const LoginForm = ({ form, error, onChange, onSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.loginWrap}>
      <div className={classes.loginInner}>
        <div className={classes.loginBannerWrap}>
          <div className={classes.loginBanner}>
            <ChildCareIcon style={{ fontSize: 240, color: '#424242' }} />
          </div>
        </div>
        <div className={classes.loginFormWrap}>
          <Typography variant='h4' gutterBottom>
            MOBON
          </Typography>
          <form
            className={classes.container}
            autoComplete='off'
            onSubmit={onSubmit}
          >
            <TextField
              id='userId'
              name='userId'
              label='ID'
              className={classes.textField}
              value={form.userId}
              onChange={onChange('userId')}
              margin='normal'
              variant='outlined'
            />
            <TextField
              id='userPassword'
              name='Password'
              label='Password'
              type='password'
              className={classes.textField}
              value={form.password}
              onChange={onChange('password')}
              autoComplete='current-password'
              margin='normal'
              variant='outlined'
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              color='primary'
              className={classes.margin}
            >
              로그인
            </Button>
            <Typography className={classes.loginMessage} variant='body1'>
              {error}
            </Typography>
            <div className={classes.loginNav}>
              <StyledBreadcrumb
                component='a'
                href='/join'
                label='회원가입'
                avatar={
                  <Avatar className={classes.avatar}>
                    <TouchAppIcon />
                  </Avatar>
                }
              />
              <Breadcrumbs>
                <StyledBreadcrumb component='a' href='#' label='ID 찾기' />
                <StyledBreadcrumb
                  component='a'
                  href='#'
                  label='Password 찾기'
                />
              </Breadcrumbs>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;