import React from 'react';

import LoginHeader from 'components/organisms/Header/LoginHeader';
// import LoginFooter from 'components/organisms/Footer/LoginFooter';

const LoginTemplate = ({ children }) => {
  return (
    <>
      <LoginHeader />
      {children}
      {/* <LoginFooter /> */}
    </>
  );
};

export default LoginTemplate;
