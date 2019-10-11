import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import GuidesIndex from 'pages/Guides/IndexList';
import LoginForm from 'pages/Login/LoginForm';
import MainTemplate from 'pages/templates/MainTemplate';
import UsersForm from 'pages/Main/Users/UsersForm';

/**
 *
 * @param {json} param0 props: { match: {... path: '/guides'} }
 */
function PageGiudes({ match }) {
  const { path } = match;

  return (
    <>
      <Switch>
        <Route exact path={`${path}`} component={GuidesIndex} />
        {/* 로그인 */}
        <Route path={`${path}/login`} component={LoginForm} />
        {/* 메인 */}
        {/* 메인 > 템플릿 */}
        <Route path={`${path}/main`} component={MainTemplate} />
        {/* 사용자 관리 */}
        <Route path={`${path}/users`} component={UsersForm} />
      </Switch>
    </>
  );
}

export default withRouter(PageGiudes);
