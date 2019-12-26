import client from './client';
import qs from 'qs';

/**
 * 아이디 확인
 * @param {string} userId
 */
export const member = userId => client.get(`/api/manage/member/${userId}`);

/**
 * 사용자 등록
 * @param {json} param0
 */
export const register = ({
  userId,
  password,
  passwordConfirm,
  name,
  email,
  phone,
  department,
  rank,
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
      rank,
    })
  );

/**
 * 사용자 리스트
 * @param {json} params
 */
export const members = param => client.get(`/api/manage/members`, param);

/**
 * 사용자관리 페이지 검색폼 리스트
 */
export const usersSearch = () => client.get(`/api/layout/member/search`);

export const getUserInfo = () => client.get('/api/user');

// 모비온 사용자 입금
export const deposit = ({
  userId,
  rsvDate: date,
  price,
  name,
  payType,
  rsvTime,
  weekType,
}) =>
  client.post(
    `/api/manage/members/${userId}/deposit`,
    qs.stringify(
      {
        userId,
        rsvDate: date,
        price,
        name,
        payType,
        rsvTime,
        weekType,
      },
      {
        skipNulls: true,
        filter: function filterFunc(prefix, value) {
          for (let item in value) {
            if (value.hasOwnProperty(item)) {
              const cur = value[item];
              if (cur === '') {
                value[item] = null;
              }
            }
          }
          return value;
        },
      }
    )
  );

// 모비온 사용자 보너스충전
export const chargeBonus = ({
  userId,
  bonus: price,
  restRsnCode,
  memo,
  rsvDate: date,
  rsvTime,
  weekType,
}) =>
  client.post(
    `/api/manage/members/${userId}/bonus`,
    qs.stringify(
      {
        userId,
        bonus: price,
        restRsnCode,
        memo,
        rsvDate: date,
        rsvTime,
        weekType,
      },
      {
        skipNulls: true,
        filter: function filterFunc(prefix, value) {
          for (let item in value) {
            if (value.hasOwnProperty(item)) {
              const cur = value[item];
              if (cur === '') {
                value[item] = null;
              }
            }
          }
          return value;
        },
      }
    )
  );
