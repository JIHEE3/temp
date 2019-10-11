import client from './client';
import qs from 'qs';

/**
 * 아이디 확인
 * @param {string} userId
 */
export const member = userId => client.get(`/api/manage/member/${userId}`);

export const register = ({
  userId,
  password,
  passwordConfirm,
  name,
  email,
  phone,
  department,
  rank
}) =>
  client.post(
    '/api/register',
    qs.stringify({
      userId,
      password,
      passwordConfirm,
      name,
      email,
      phone,
      department,
      rank
    })
  );
