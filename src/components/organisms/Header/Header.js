import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';

import {
  AccessibilityNew as AccessibilityNewIcon,
  Home as HomeIcon,
  Whatshot as WhatshotIcon
} from '@material-ui/icons/';

import 'styles/common/Header.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    padding: theme.spacing(1, 2)
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

const Header = ({ user, onLogout }) => {
  const classes = useStyles();

  return (
    <header className='m-main-header'>
      <div className='m-logo'>
        <Link to='/'>
          <AccessibilityNewIcon fontSize='large' />
        </Link>
      </div>
      <Paper elevation={0} className={classes.root}>
        <NavLink to='/media' activeClassName='selected'>
          <HomeIcon className={classes.icon} />
          매체
        </NavLink>
        <NavLink to='/admin' activeClassName='selected'>
          <WhatshotIcon className={classes.icon} />
          관리자
        </NavLink>
        <div>
          {user ? (
            <div className='right'>
              <div>{user.username}</div>
              <Button variant='contained' color='primary'>
                결제
              </Button>
              <Button variant='contained' color='primary'>
                정보수정
              </Button>
              <Button variant='contained' color='primary' onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className='right'>
              <Link to='/login'>
                <Button variant='contained' color='primary'>
                  로그인
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Paper>
    </header>
  );
};

export default Header;
