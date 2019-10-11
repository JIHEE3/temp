import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import SelectLang from 'components/molecules/SelectLang';

const LoginFooterStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  footerNav: {
    margin: 'auto',
    '& > a': {
      padding: theme.spacing(1)
    }
  }
}));

const LoginFooter = () => {
  const classes = LoginFooterStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.footerNav}>
        <Link component={RouterLink} to="/">
          이용약관
        </Link>
        <Link component={RouterLink} to="/">
          개인정보 처리방침
        </Link>
        <Link component={RouterLink} to="/">
          운영정책
        </Link>
        <Link component={RouterLink} to="/">
          고객센터
        </Link>
        <Link component={RouterLink} to="/">
          공지사항
        </Link>
        {/* <Link component={RouterLink} to='/'>
          한국어
        </Link> */}
        <SelectLang />
      </div>
    </footer>
  );
};

export default LoginFooter;
