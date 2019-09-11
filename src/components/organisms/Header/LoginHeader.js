import React from 'react';
import { Link } from 'react-router-dom';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

const LoginHeader = () => {
  return (
    <header className='m-main-header'>
      <div className='m-logo'>
        <Link to='/'>
          <AccessibilityNewIcon fontSize='large' />
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
