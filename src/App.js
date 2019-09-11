import React from 'react';
// import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/styles';
import { deepPurple } from '@material-ui/core/colors';

import Login from 'pages/login/Login';
import Join from 'pages/join/Join';
import Admin from 'pages/admin/Admin';
import Media from 'pages/media/Media';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c'
});

/**
 * 테마 설정하는 부분
 * (https://material-ui.com/customization/default-theme/ 참고)
 */
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    text: {
      primary: '#673ab7'
    }
  }
});

/**
 * 페이지 라우팅
 */
function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path={['/login', '/find_password']} component={Login} />
          <Route path='/join' component={Join} />
          <Route path='/admin' component={Admin} />
          <Redirect exact from='/' to='/admin/management' />
          <Redirect from='/management' to='/admin/management' />
          <Redirect from='/statistics' to='/admin/statistics' />
          <Route path='/media' component={Media} />
          <Route render={() => <div>못찾음</div>} />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
