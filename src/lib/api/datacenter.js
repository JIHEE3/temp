import client from './client';

/**
 * 데이터센터 - 쿠키모수현황 그래프
 */
export const cookieParamGraph = param =>
  client.get(`/api/report/datacenter/status/graph`, { params: param });

/**
 * 데이터센터 - 오디언스 유저수 그래프
 */
export const audienceUserGraph = param =>
  client.get(`/api/report/datacenter/auusergraph`, { params: param });

/**
 * 데이터센터 - ADID 수집현황 그래프
 */
export const adidStatusGraph = param =>
  client.get(`/api/report/datacenter/adidgraph`, { params: param });

/**
 * 데이터센터 - 오디언스 신규유저수 그래프
 */
export const audienceNewGraph = param =>
  client.get(`/api/report/datacenter/aunewgraph`, { params: param });

/**
 * 데이터센터 - 광고쿠키 통계
 */
export const CookieStatisticsData = param =>
  client.get(`/api/report/datacenter/cookie`, param);

/**
 * 데이터센터 - 앱모수타겟팅 일자별통계
 */
export const appTargetingDailyStatistics = param =>
  client.get(`/api/report/datacenter/appTargetingDaily`, param);

/**
 * 데이터센터 - 앱모수타겟팅 일자별통계 그래프
 */
export const appTargetingDailyGraph = param =>
  client.get(`/api/report/datacenter/daygraph`, {
    params: param,
  });

/**
 * 데이터센터 - 앱모수타겟팅 매체통계
 */
export const appTargetingMediaStatisticsData = param =>
  client.get(`/api/report/datacenter/appmedia`, param);

/**
 * 데이터센터 - 앱모수타겟팅 광고주통계
 */
export const appTargetingAdverStatisticsData = param =>
  client.get(`/api/report/datacenter/appadver`, param);
