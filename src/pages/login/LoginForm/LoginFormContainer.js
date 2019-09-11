import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from 'modules/auth';
import LoginForm from 'pages/login/LoginForm/LoginForm';

const LoginFormContainer = ({ history }) => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { user, authError } = useSelector(({ auth }) => ({
    user: auth.user,
    authError: auth.authError
  }));

  const onChange = name => event => {
    setForm({ ...form, [name]: event.target.value });
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
      dispatch(login({ userId, password }));
    }
  };

  useEffect(() => {
    if (authError) {
      // 오류 발생
      setError(authError);
      return;
    }

    if (user) {
      // 로그인 성공
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
      // 메인 페이지로
      history.push('/');
    }
  }, [user, authError, history /*, dispatch*/]);

  return (
    <LoginForm
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginFormContainer);
