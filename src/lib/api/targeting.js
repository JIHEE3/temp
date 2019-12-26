import client from './client';

/**
 * 타겟팅보고 그래프
 */
export const targetGraph = param =>
  client.get(`/api/report/target/graph`, { params: param });
