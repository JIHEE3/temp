import React, { useEffect } from 'react';
// import './App.css';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/styles';
import { indigo, deepPurple } from '@material-ui/core/colors';

import Join from 'pages/join/Join/Join';
import LoginFormContainer from 'pages/login/LoginForm/LoginFormContainer';
import AdminTemplate from 'pages/templates/AdminTemplate';
import StatisticsContainer from 'pages/admin/Statistics/StatisticsContainer';
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
function App(props) {
  console.dir(theme);
  const { history, location } = props;
  const { menu } = useSelector(({ menu }) => ({
    menu: menu.list
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
  }, [menu, history]);

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
            {/* 매인 */}
            <Route exact path="/" component={AdminTemplate} />
            <Route path="/user" component={TableTestPage2Container} />
            <Route path="/realtime" component={TableTestPageContainer} />
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
