import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout, setUser } from 'modules/auth';
import { getMenu } from 'modules/menu';
import { login } from 'lib/api/auth';
import LoginForm from 'pages/Login/LoginForm/LoginForm';

const LoginFormContainer = ({ history }) => {
  const localStorageId = localStorage.getItem('saveId');
  const [form, setForm] = useState({
    userId: localStorageId === null ? '' : localStorageId,
    password: '',
  });
  const [error, setError] = useState(null);
  const [saveId, setSaveId] = useState(localStorageId === null ? false : true);

  const dispatch = useDispatch();
  // const { user, authError } = useSelector(({ auth }) => ({
  //   user: auth.user,
  //   authError: auth.authError
  // }));

  /**
   * id, pwd 변경 이벤트
   * @param {string} name userId || Password
   */
  const onChange = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  /**
   * 아이디 저장 여부
   * @param {} event
   */
  const onChangeSaveId = event => {
    setSaveId(event.target.checked);
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { userId, password } = form;
    let errorMesage = '';
    if (userId === '') {
      errorMesage = 'ID를 입력하세요';
    } else if (password === '') {
      errorMesage = 'Password를 입력하세요';
    }

    if (errorMesage !== '') {
      setError(errorMesage);
      return false;
    } else {
      login({ userId, password })
        .then(response => {
          const { data: user, success } = response.data;
          if (success) {
            dispatch(setUser(user));
            dispatch(getMenu());
            try {
              localStorage.setItem('user', JSON.stringify(user));
              if (saveId) {
                localStorage.setItem('saveId', user.userid);
              } else {
                localStorage.removeItem('saveId');
              }
            } catch (e) {
              console.log('localStorage is not working');
            }
            history.push('/');
          }
        })
        .catch(error => {
          console.log(error);
          setError(error);
        });
    }
  };

  useEffect(() => {
    localStorage.removeItem('user'); // localStorage 에서 user 제거
    dispatch(logout());
  }, [dispatch]);

  return (
    <LoginForm
      form={form}
      error={error}
      saveId={saveId}
      onChange={onChange}
      onChangeCheckbox={onChangeSaveId}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(LoginFormContainer);
