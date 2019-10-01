import React from 'react';
// import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/styles';
import { indigo, deepPurple } from '@material-ui/core/colors';

import Join from 'pages/join/Join/Join';
import LoginFormContainer from 'pages/login/LoginForm/LoginFormContainer';
import AdcodeContainer from 'pages/admin/Adcode/AdcodeContainer';
import StatisticsContainer from 'pages/admin/Statistics/StatisticsContainer';
import ChartTestPageContainer from 'pages/admin/ChartTestPage/ChartTestPageContainer';
import TableTestPageContainer from 'pages/admin/TableTestPage/TableTestPageContainer';
import TableTestPage2Container from 'pages/admin/TableTestPage2/TableTestPage2Container';

// 임시
import LoginTemplate from 'pages/templates/LoginTemplate';
import MediaTemplate from 'pages/templates/MediaTemplate';

const generateClassName = createGenerateClassName({
  productionPrefix: 'testest'
});

/**
 * 테마 설정하는 부분
 * (https://material-ui.com/customization/default-theme/ 참고)
 */
const theme = createMuiTheme({
  palette: {
    action: {
      // hover: 'rgba(245, 0, 87, 0.08)'
    },
    background: {
      header: '#181c27'
    },
    primary: indigo,
    secondary: deepPurple,
    text: {
      // primary: '#33691e'
    }
  }
});

/**
 * 페이지 라우팅
 */
function App() {
  console.dir(theme);
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}
    >
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Switch>
            {/* 로그인 */}
            <Route path="/login" component={LoginFormContainer} />
            <Route
              path="/find-password"
              render={() => <LoginTemplate>비밀번호 찾기</LoginTemplate>}
            />
            {/* 가입 */}
            <Route path="/join" component={Join} />
            {/* 관리자 */}
            <Route path="/admin/management" component={AdcodeContainer} />
            <Route path="/admin/test" component={ChartTestPageContainer} />
            <Route path="/admin/tes1" component={TableTestPageContainer} />
            <Route path="/admin/test6" component={TableTestPage2Container} />
            <Route path="/admin/statistics" component={StatisticsContainer} />
            <Route path="/admin/admix" render={() => `애드익스(외부연동)`} />
            <Route path="/admin/mediaLive" render={() => `광고송출리스트`} />
            <Route path="/admin/checkImg" render={() => `이미지검수`} />
            <Route path="/admin/etc" render={() => `기타`} />
            <Route path="/admin/RTB" render={() => `RTB`} />
            <Redirect exact from="/" to="/admin/management" />
            {/* 매체 */}
            <Route
              path="/media"
              render={() => <MediaTemplate>media</MediaTemplate>}
            />
            {/* 404 페이지 */}
            <Route render={() => <div>못찾음</div>} />
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
