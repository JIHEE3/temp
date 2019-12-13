import client from './client';

/**
 * 매체 통계
 */
export const mediaStatistics = param => client.get(`/api/report/media`, param);
