import client from './client';
import qs from 'qs';

/**
 * 언어 셋팅
 * @param {string} locale ko || en
 */
export const setLocale = locale => client.get(`/api/locale/${locale}`);

/**
 * get 메뉴
 */
export const menuList = () => client.get(`/api/manage/auth/menu/navMenu`);

/**
 * 테이블 headr
 */
export const tableHeaders = param =>
  client.get(`/api/layout/head`, { params: param });

/**
 * 테이블 head 커스텀 저장
 * @param {json} param0
 */
export const setCustom = params =>
  client.post('/api/layout/page/custom', qs.stringify(params));

//Common code
/**
 * 모비온에서 공통으로 사용중인 상품구분코드를 가져온다.
 */
export const productCode = () => client.get(`/api/layout/search`);

/**
 * 모비온에서 공통으로 사용중인 외부연동 구분코드를 가져온다.
 */
export const externalCode = () => client.get(`/api/code/external`);

/**
 * 모비온에서 공통으로 사용중인 타겟팅 구분코드를 가져온다.
 */
export const targetingCode = () => client.get(`/api/code/targeting`);

/**
 * 요청된 페이지 내에 존재하는 커스텀가능한 레이아웃들을 가져온다.
 */
export const getCustom = param =>
  client.get(`/api/layout/page/custom`, { params: param });

/**
 * 요청된 페이지 내에 존재하는 커스텀가능한 레이아웃들을 가져온다.
 */
export const getCategory = param =>
  client.get(`/api/manage/category`, { params: param });
