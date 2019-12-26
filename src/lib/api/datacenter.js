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
