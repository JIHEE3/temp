import client from './client';

/**
 * 광고주별 통계
 */
export const advertiserStatistics = params =>
  client.get(`/api/report/adver`, { params });
