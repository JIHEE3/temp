import React from 'react';

import LoginFooter from 'components/organisms/Footer/LoginFooter';

const LoginFormTemplate = ({ children }) => {
  return (
    <div className='m-loginForm-wrap'>
      {children}
      <LoginFooter />
    </div>
  );
};

export default LoginFormTemplate;
