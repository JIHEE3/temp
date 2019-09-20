import React from "react";
// import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName
} from "@material-ui/styles";
import { indigo, deepPurple } from "@material-ui/core/colors";

import Login from "pages/login/Login";
import Join from "pages/join/Join";
import Admin from "pages/admin/Admin";
import Media from "pages/media/Media";

const generateClassName = createGenerateClassName({
  productionPrefix: "testest"
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
  // const { t } = useTranslation();

  console.dir(theme);
  return (
    <div style={{ display: "flex" }}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          {/* <h2>{t('Welcome to React')}</h2> */}
          <Switch>
            <Route path={["/login", "/find_password"]} component={Login} />
            <Route path="/join" component={Join} />
            <Route path="/admin" component={Admin} />
            <Redirect exact from="/" to="/admin/management" />
            <Route path="/media" component={Media} />
            <Route render={() => <div>못찾음</div>} />
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
