import React from 'react';
import { withRouter } from 'react-router-dom';

/**
 *
 * @param {json} param0 match = '/guides'
 */
const GuidesIndex = ({ match }) => {
  const { path } = match;
  return (
    <div>
      <header>
        <h3>페이지 가이드 목차</h3>
      </header>
      <article>
        <div>
          <a href={`${path}/login`}>로그인페이지</a>
        </div>
        <div>
          <a href={`${path}/main`}>메인페이지</a>
        </div>
        <div>
          <a href={`${path}/users`}>상품관리 > 사용자 관리</a>
        </div>
      </article>
    </div>
  );
};

export default withRouter(GuidesIndex);
