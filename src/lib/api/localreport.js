import client from './client';

/**
 * 지역 일자별통계
 */
export const localDayReport = param =>
    client.get(`/api/report/local/day`, param);

/**
 * 지역 일자별통계 그래프
 */
export const localDayGraphReport = param =>
    client.get(`/api/report/local/daygraph`, { params: param });

/**
 * 지역 월별 통계
 */
export const localMonthReport = param =>
    client.get(`/api/report/local/month`, param);

/**
 * 지역 월별 통계 그래프
 */
export const localMonthGraph = param =>
    client.get(`/api/report/local/monthgraph`, { params: param });

/**
 * 지역 매체별 통계
 */
export const localMediaReport = param =>
    client.get(`/api/report/local/media`, param);

/**
 * 지역 매체지면별 타게팅분포
 */
export const localTargetReport = param =>
    client.get(`/api/report/local/target`, param);

/**
 * 지역 광고주별 통계
 */
export const localAdverReport = param =>
    client.get(`/api/report/local/adver`, param);

/**
 * 지역 지역별 통계
 */
export const localReport = param =>
    client.get(`/api/report/local/local`, param);

/**
 * 지역 지역별 통계 그래프
 */
export const localGraph = param =>
    client.get(`/api/report/local/localgraph`, { params: param });