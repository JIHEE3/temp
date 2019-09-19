import React from 'react';
import { Link } from 'react-router-dom';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

const LoginHeader = () => {
  return (
    <header>
      <div>
        <Link to='/'>
          <AccessibilityNewIcon fontSize='large' />
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
