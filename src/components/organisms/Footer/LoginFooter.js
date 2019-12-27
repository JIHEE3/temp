import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SelectLang from 'components/molecules/SelectLang';

const LoginFooterStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  footerNav: {
    margin: 'auto',
    fontSize: '16px',
  },
  enliple: {
    color: theme.palette.common.gray6,
  },
  loginMulti: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: theme.palette.common.gray6,
    margin: 0,
    padding: 7,
    fontSize: 'inherit',
    marginLeft: 15,
    marginTop: -5,
  },
}));

const LoginFooter = () => {
  const classes = LoginFooterStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.footerNav}>
        <span className={classes.enliple}>ⓒ 2019 Enliple</span>
        <SelectLang className={classes.loginMulti} />
      </div>
    </footer>
  );
};

export default LoginFooter;
