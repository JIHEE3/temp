import React, { useEffect } from 'react';
// import './App.css';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/styles';
import { indigo, deepPurple } from '@material-ui/core/colors';

import Guides from 'pages/Guides';
import Join from 'pages/Join/Join';
import RegisterSuccess from 'pages/Join/RegisterSuccess';
import LoginFormContainer from 'pages/Login/LoginForm';
import MainTemplate from 'pages/templates/MainTemplate';
import Users from 'pages/Main/Users';
import StatisticsContainer from 'pages/Main/Statistics';
// import TableTestPageContainer from 'pages/Main/TableTestPage';
import TableTestPage2Container from 'pages/Main/TableTestPage2';

// 임시
import LoginTemplate from 'pages/templates/LoginTemplate';
import MediaTemplate from 'pages/templates/MediaTemplate';

const generateClassName = createGenerateClassName({
  productionPrefix: 'testest',
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
      header: '#181c27',
    },
    primary: indigo,
    secondary: deepPurple,
    text: {
      // primary: '#33691e'
    },
  },
});

/**
 * 페이지 라우팅
 */
function App(props) {
  console.dir(theme);
  const { history, location } = props;
  const { user, menu } = useSelector(({ auth, menu }) => ({
    user: auth.user,
    menu: menu.list,
  }));

  useEffect(() => {
    if (!!menu) {
      let curUrl = menu[0].menuUrl;
      if (curUrl === null) {
        curUrl = menu[0].subMenu[0].menuUrl;
      }
      if (location.pathname === '/') {
        // path를 입력하지 않은경우 메뉴의 첫페이지 보여줌
        history.push(curUrl);
      }
    }
  }, [menu, history, location]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}
    >
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Switch>
            {/* 퍼블리싱 관리 페이지 */}
            <Route path="/guides" component={Guides} />
            {/* 로그인 */}
            <Route path="/login" component={LoginFormContainer} />
            <Route
              path="/find-password"
              render={() => <LoginTemplate>비밀번호 찾기</LoginTemplate>}
            />
            {/* 가입 */}
            <Route exact path="/join" component={Join} />
            <Route path="/join/:userId" component={RegisterSuccess} />
            {/* 매인 */}
            {user === null ? (
              <Redirect to="/login" />
            ) : (
              <Route exact path="/" component={MainTemplate} />
            )}
            <Route path="/manage/members" component={Users} />
            <Route path="/realtime" component={TableTestPage2Container} />
            <Route path="/productInfoList" component={StatisticsContainer} />
            <Route path="/test" render={() => `url이 test로 모두 겹침`} />

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

export default withRouter(App);
