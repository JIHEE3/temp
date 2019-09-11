import client from './client';
import qs from 'qs';

// 로그인
export const login = ({ userId, password }) =>
  client.post('/api/login', qs.stringify({ userId, password }));

// 로그아웃
export const logout = () => client.post('/api/logout');
