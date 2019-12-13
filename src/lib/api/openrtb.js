import client from './client';

/**
 * 오픈RTB 통계
 */
export const openrtbStatistics = param =>
  client.get(`/api/report/openrtb/day`, param);

/**
 * 오픈RTB 통계 - 그래프
 */
export const openrtbGraph = param =>
    client.get(`/api/report/openrtb/day/graph`, { params: param });

/**
 * 광고주별 통계 웹 / 모바일 상세
 */
export const openrtbStatisticsDetail = param =>
    client.get(`/api/report/openrtb/day/sub`, param);
