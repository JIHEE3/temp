import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout, setUser } from 'modules/auth';
import { getMenu } from 'modules/menu';
import { login } from 'lib/api/auth';
import LoginForm from 'pages/login/LoginForm/LoginForm';

const LoginFormContainer = ({ history }) => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  // const { user, authError } = useSelector(({ auth }) => ({
  //   user: auth.user,
  //   authError: auth.authError
  // }));

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
      login({ userId, password })
        .then(response => {
          const { data: user, success } = response.data;
          if (success) {
            dispatch(setUser(user));
            dispatch(getMenu());
            try {
              localStorage.setItem('user', JSON.stringify(user));
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
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginFormContainer);
