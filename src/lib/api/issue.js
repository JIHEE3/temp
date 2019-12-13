import client from './client';

/**
 * 이슈 통계
 */
export const issueDatas = param => client.get(`/api/report/issue`, param);
