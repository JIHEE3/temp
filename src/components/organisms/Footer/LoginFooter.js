import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import 'styles/common/LoginFooter.scss';

const LoginFooter = () => {
  return (
    <footer className='m-login-footer'>
      <div className='m-login-footer-nav'>
        <Link component={RouterLink} to='/'>
          이용약관
        </Link>
        <Link component={RouterLink} to='/'>
          개인정보 처리방침
        </Link>
        <Link component={RouterLink} to='/'>
          운영정책
        </Link>
        <Link component={RouterLink} to='/'>
          고객센터
        </Link>
        <Link component={RouterLink} to='/'>
          공지사항
        </Link>
        <Link component={RouterLink} to='/'>
          한국어
        </Link>
      </div>
    </footer>
  );
};

export default LoginFooter;
