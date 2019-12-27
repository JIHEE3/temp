import client from './client';

/**
 * 일자별 통계
 */
export const dailyStatistics = param => client.get(`/api/report/day`, param);

/**
 * 일자별 통계 웹 / 모바일 상세
 */
export const dailyStatisticsDetail = param =>
  client.get(`/api/report/day/sub`, param);

/**
 * 일자별 통계 - 구좌별통계 그래프
 */
export const dailyTargetingParGraph = param =>
  client.get(`/api/report/day/graph?uri=%2Freport%2Fdaily%2Fpar`, {
    params: param,
  });

export const dailyParGraph = param =>
  client.get(`/api/report/day/graph?uri=%2Freport%2Fdaily%2Fpar`, {
    params: param,
  });
/**
 * test
 */
export const dailyTargeting = param =>
  client.get(`/api/report/day/targeting`, param);

/**
 * 시간대별 통계 그래프
 */
export const timeGraph = param =>
  client.get(`/api/report/time/graph`, { params: param });

/**
 * 시간대별 소진
 */
export const timeAmtStatistics = param => client.get(`/api/report/time`, param);

/**
 * 시간대별 소진 통계 그래프
 */
export const timeAmtGraph = param =>
  client.get(`/api/report/time/amt/graph`, { params: param });

/**
 * 월별 통계
 */
export const monthStatistics = param => client.get(`/api/report/month`, param);

/**
 * 월별 통계 그래프
 */
export const monthGraph = param =>
  client.get(`/api/report/month/graph`, { params: param });
