import client from './client';

/**
 * 이슈
 */
export const issueReport = param =>
  client.get(`/api/report/issue`, { params: param });

/**
 * 광고주별 통계
 */
export const advertiserStatistics = param =>
  client.get(`/api/report/adver`, param);

/**
 * 광고주별 통계 웹 / 모바일 상세
 */
export const advertiserStatisticsDetail = param =>
  client.get(`/api/report/adver/sub`, param);

/**
 * 광고주별 통계 그래프
 */
export const advertiserMonthData = param =>
  client.get(`/api/report/adver/graph/monthData`, { params: param });
