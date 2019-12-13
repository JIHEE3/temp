import client from './client';

/**
 * 요청수 통계
 */
export const requestStatistics = param =>
  client.get(`/api/report/request`, param);

/**
 * 요청수 통계 - 그래프
 */
export const requestGraph = param =>
  client.get(`/api/report/request/graph`, { params: param });
