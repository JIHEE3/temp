import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from 'modules/auth';

import Header from 'components/organisms/Header/Header';

/**
 * 로그인 관련 store 불러와야함
 */
const HeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => ({
    user: auth.user
  }));

  /**
   * 로그아웃 버튼 클릭
   */
  const onLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} />
    </>
  );
};

export default withRouter(HeaderContainer);
