import client from './client';

/**
 * 언어 셋팅
 * @param {string} locale ko || en
 */
export const setLocale = locale => client.get(`/api/locale/${locale}`);

/**
 * get 메뉴
 */
export const menuList = () => client.get(`/api/manage/auth/navMenu`);

/**
 * 테이블 headr
 * @param {string} url 페이지 url
 */
export const tableHeaders = (uri = '') =>
  client.get(`/api/layout/head`, { params: { uri } });
