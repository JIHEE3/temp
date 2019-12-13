import client from './client';

/**
 * 애드익스 일자별 통계
 */
export const adexStatistics = param =>
  client.get(`/api/report/adex/day`, param);

/**
 * 애드익스 총 일자별 통계 그래프
 */
export const adexTotDayGraph = param =>
  client.get(`/api/report/adex/day/totGraph`, { params: param });

/**
 * 애드익스 일자별 통계 그래프
 */
export const adexDayGraph = param =>
  client.get(`/api/report/adex/day/graph`, { params: param });
