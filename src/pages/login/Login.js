import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginTemplate from 'pages/login/templates/LoginTemplate';
import LoginFormTemplate from 'pages/login/templates/LoginFormTemplate';
import LoginFormContainer from 'pages/login/LoginForm/LoginFormContainer';

const Login = () => {
  return (
    <Switch>
      <LoginFormTemplate>
        <Route exact path='/login' component={LoginFormContainer} />
      </LoginFormTemplate>
      <LoginTemplate>
        <Route path='/find-password' render={() => <div>비밀번호 찾기</div>} />
      </LoginTemplate>
    </Switch>
  );
};

export default Login;
