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
import 'styles/common/LoginForm.scss';

const useStyles = makeStyles(theme => ({
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
    <div className='m-login-wrap'>
      <div className='m-login-inner'>
        <div className='m-login-wrap-banner'>
          <div className='m-login-banner'>
            <ChildCareIcon style={{ fontSize: 240, color: '#424242' }} />
          </div>
        </div>
        <div className='m-login-wrap-form'>
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
            <Typography className='m-login-message' variant='body1'>
              {error}
            </Typography>
            <div className='m-login-nav'>
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
