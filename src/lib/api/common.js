import client from './client';

/**
 * 언어 셋팅
 * @param {string} locale ko || en
 */
export const setLocale = locale => client.get(`/api/locale/${locale}`);

/**
 * 통계페이지별 테이블 headr
 * @param {string} url 페이지 url
 */
export const reportHeaders = (uri = '') =>
  client.get(`/api/layout/head`, { params: { uri } });
