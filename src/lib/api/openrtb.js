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
 * 오픈RTB 상세 통계
 */
export const openrtbStatisticsDetail = param =>
    client.get(`/api/report/openrtb/day/sub`, param);


/**
 * 오픈RTB 지면별 통계
 */
export const openrtbMediaStatistics = param =>
    client.get(`/api/report/openrtb/media`, param);

/**
 * 오픈RTB 지면별 시간대별 통계
 */
export const openrtbTimeStatistics = param =>
    client.get(`/api/report/openrtb/time`, param);

/**
 * 오픈RTB 타게팅별 통계
 */
export const openrtbTargetStatistics = param =>
    client.get(`/api/report/openrtb/target`, param);

/**
 * 오픈RTB 타게팅통계 - 그래프
 */
export const openrtbTargetGraph = param =>
    client.get(`/api/report/openrtb/target/graph`, { params: param });