import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from 'modules/auth';
import { changeLocale } from 'modules/locale';

import Header from 'components/organisms/Header/Header';

/**
 * 로그인 관련 store 불러와야함
 */
const HeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, locale } = useSelector(({ auth, locale }) => ({
    user: auth.user,
    locale: locale.locale
  }));

  /**
   * 언어 변경
   */
  const changeLang = async locale => {
    await dispatch(changeLocale(locale));
  };

  /**
   * 로그아웃 버튼 클릭
   */
  const onLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <>
      <Header
        user={user}
        locale={locale}
        changeLang={changeLang}
        onLogout={onLogout}
      />
    </>
  );
};

export default withRouter(HeaderContainer);
