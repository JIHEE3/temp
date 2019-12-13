import client from './client';
import qs from 'qs';

// 로그인
export const login = ({ userId, password }) =>
  client.post('/api/login', qs.stringify({ userId, password }));

// 로그아웃
export const logout = () => client.post('/api/logout');

/**
 * 패스워드 재확인
 * @param {string} password
 */
export const checkPassword = password =>
  client.post(`/api/rePassword`, { password });

// export const changePassword = ({ USER_ID, newPassword, confirmPassword }) =>
export const changePassword = (newPassword, confirmPassword) =>
  client.post(
    `/api/changePassword`,
    qs.stringify({
      password: newPassword,
      password_confirmation: confirmPassword,
    })
  );

/**
 *
 * @param {string} 이메일 재설정 알림 요청
 */
export const findPassword = email =>
  client.post(
    `/api/noti/password`,
    qs.stringify({
      email,
    })
  );

// 비밀번호 찾기용 패스워드 변경
export const notiChangePassword = (userId, newPassword, confirmPassword) =>
  client.post(
    `/api/noti/changePassword`,
    qs.stringify({
      userId: userId,
      password: newPassword,
      password_confirmation: confirmPassword,
    })
  );

/**
 * 권한 - 계정 리스트
 */
// export const authUserList = param =>
//   client.get(`/api/manage/auth/user?uri=/system/auth/user`, param);

/**
 * 권한 - 그룹 리스트
 */
 export const authGrpList = () =>
   client.get(`/api/manage/auth/group/list?uri=/system/auth/user`);
export const authUserList = ({
  cmd = 'getList',
  tab_type = 'main',
  sdate = '2019-09-05',
  edate = '2019-09-05',
  adExchange_flag = 'Y',
  plat_code,
  prdt_code,
  tp_code
} = {}) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve({
        data:{"success":true,"message":null,"data":[{"SEQ":"201502030044","GRP_STR":"대표이사외 2개","USER_ID":"khhan","NAME":3,"DEPT_PATH":"","POSITION":"대표이사","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-02-03 15:57:47","LAST_LOGIN":"2019-08-06 11:25:01"},{"SEQ":"201502030032","GRP_STR":"광고주영업 그룹외 5개","USER_ID":"kolee","NAME":3,"DEPT_PATH":"광고사업본부 > 광고주사업부","POSITION":"부대표","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-02-03 15:57:47","LAST_LOGIN":"2019-07-17 14:13:12"},{"SEQ":"","GRP_STR":"","USER_ID":"ghlee","NAME":3,"DEPT_PATH":"AI본부","POSITION":"상무이사","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"mspark","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실","POSITION":"이사","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"201502030043","GRP_STR":"광고주 어드민관리자★★★★★메뉴추가 시 해당그룹 권한추가 필수★★★★★외 2개","USER_ID":"kshan","NAME":3,"DEPT_PATH":"서비스사업본부 > 캠프사업부","POSITION":"실장","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-02-03 15:57:47","LAST_LOGIN":"2019-07-02 19:28:55"},{"SEQ":"","GRP_STR":"","USER_ID":"yjsong","NAME":3,"DEPT_PATH":"광고사업본부 > 소셜링크사업부","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jhsun","NAME":3,"DEPT_PATH":"경영전략본부 > 전략기획실","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"khyoon","NAME":3,"DEPT_PATH":"광고사업본부 > 네이티브사업부","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"mskim1","NAME":3,"DEPT_PATH":"서비스사업본부 > 캠프사업부 > B2C개발총괄","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"ysoh","NAME":3,"DEPT_PATH":"개발지원본부 > 개발기획실 > RTB고도화팀","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2016080100008","GRP_STR":"광고주사업부-1외 3개","USER_ID":"skkim2","NAME":3,"DEPT_PATH":"광고사업본부 > 매체제휴사업부","POSITION":"부장","MOB_ID_USE_YN":"Y","REG_DTTM":"2016-08-01 14:56:20","LAST_LOGIN":"2019-08-06 10:29:36"},{"SEQ":"201502030030","GRP_STR":"광고주 어드민관리자★★★★★메뉴추가 시 해당그룹 권한추가 필수★★★★★외 3개","USER_ID":"sjyu","NAME":3,"DEPT_PATH":"경영전략본부 > 경영지원실","POSITION":"부장","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-02-03 15:57:47","LAST_LOGIN":"2017-11-16 17:37:54"},{"SEQ":"2017052500002","GRP_STR":"개발지원본부외 6개","USER_ID":"unlimited9","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 광고주 플랫폼팀","POSITION":"부장","MOB_ID_USE_YN":"Y","REG_DTTM":"2017-05-25 10:32:30","LAST_LOGIN":"2019-10-25 11:45:37"},{"SEQ":"","GRP_STR":"","USER_ID":"sschae","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > PM팀","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"hskim","NAME":3,"DEPT_PATH":"개발지원본부 > 개발기획실","POSITION":"부장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"kpnam","NAME":3,"DEPT_PATH":"경영전략본부 > 경영지원실 > 재무회계팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"yggim","NAME":3,"DEPT_PATH":"AI본부 > 아이봇사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"201502030039","GRP_STR":"광고주영업 그룹외 6개","USER_ID":"jjin","NAME":3,"DEPT_PATH":"광고사업본부 > 광고주사업부 > 영업1팀","POSITION":"차장","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-02-03 15:57:47","LAST_LOGIN":"2019-08-06 11:10:17"},{"SEQ":"","GRP_STR":"","USER_ID":"shlee2","NAME":3,"DEPT_PATH":"서비스사업본부 > 서비스사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2016080400011","GRP_STR":"광고사업본부외 3개","USER_ID":"jhkim84","NAME":3,"DEPT_PATH":"광고사업본부 > 퍼포먼스사업부","POSITION":"차장","MOB_ID_USE_YN":"Y","REG_DTTM":"2016-08-04 13:54:08","LAST_LOGIN":"2019-05-15 10:41:52"},{"SEQ":"","GRP_STR":"","USER_ID":"cykim","NAME":3,"DEPT_PATH":"AI본부 > 인공지능사업부 > AI응용연구팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jwjeong","NAME":3,"DEPT_PATH":"개발지원본부 > 서비스고도화실 > 쇼핑 고도화팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"sjchoi","NAME":3,"DEPT_PATH":"개발지원본부 > 개발기획실 > 추천분석팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"whchoi","NAME":3,"DEPT_PATH":"AI본부 > 아이봇사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jhpark1","NAME":3,"DEPT_PATH":"서비스사업본부 > 캠프사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jkjang","NAME":3,"DEPT_PATH":"AI본부 > 아이봇사업부 > 영업팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"sjlim","NAME":3,"DEPT_PATH":"광고사업본부 > 광고주사업부 > 영업2팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2017020800005","GRP_STR":"개발지원본부외 4개","USER_ID":"yspark","NAME":3,"DEPT_PATH":"개발지원본부 > 개발기획실 > 추천분석팀","POSITION":"차장","MOB_ID_USE_YN":"Y","REG_DTTM":"2017-02-08 14:03:11","LAST_LOGIN":"2019-08-05 21:54:43"},{"SEQ":"","GRP_STR":"","USER_ID":"yhshin","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 매체 플랫폼팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"wsshin","NAME":3,"DEPT_PATH":"서비스사업본부 > 캠프사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2016042800008","GRP_STR":null,"USER_ID":"dulim","NAME":3,"DEPT_PATH":"서비스사업본부 > 서비스사업부","POSITION":"차장","MOB_ID_USE_YN":"Y","REG_DTTM":"2016-04-28 14:05:25","LAST_LOGIN":"2019-08-06 11:52:02"},{"SEQ":"","GRP_STR":"","USER_ID":"whkim","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 신규개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jhkim4","NAME":3,"DEPT_PATH":"개발지원본부 > 서비스고도화실 > 쇼핑 고도화팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"wspark","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 시스템팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"kwlee","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 시스템팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"sghong","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 웹서비스개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jhlee","NAME":3,"DEPT_PATH":"광고사업본부 > 퍼포먼스사업부 > Advantage팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jhbae","NAME":3,"DEPT_PATH":"AI본부 > 아이봇사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2015042900001","GRP_STR":"차장외 4개","USER_ID":"jshan","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 광고주 플랫폼팀","POSITION":"차장","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-04-29 10:49:30","LAST_LOGIN":"2019-08-06 11:08:15"},{"SEQ":"","GRP_STR":"","USER_ID":"jmihm","NAME":3,"DEPT_PATH":"경영전략본부 > 경영지원실 > 인사기획팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"bspark","NAME":3,"DEPT_PATH":"서비스사업본부 > 캠프사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"yttu","NAME":3,"DEPT_PATH":"광고사업본부 > 네이티브사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"ymbaek","NAME":3,"DEPT_PATH":"서비스사업본부 > 캠프사업부 > 개발팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2015040900011","GRP_STR":"개발지원본부외 6개","USER_ID":"ghcho","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 매체 플랫폼팀","POSITION":"차장","MOB_ID_USE_YN":"Y","REG_DTTM":"2015-04-09 17:19:16","LAST_LOGIN":"2019-08-06 09:18:42"},{"SEQ":"","GRP_STR":"","USER_ID":"yikim","NAME":3,"DEPT_PATH":"광고사업본부 > 매체제휴사업부 > 어드민지원팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"ysju","NAME":3,"DEPT_PATH":"AI본부 > 아이봇사업부 > 영업팀","POSITION":"차장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"shsong","NAME":3,"DEPT_PATH":"서비스사업본부 > 서비스사업부 > 개발팀","POSITION":"과장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"","GRP_STR":"","USER_ID":"jhlee1","NAME":3,"DEPT_PATH":"개발지원본부 > 개발지원실 > 신규개발팀","POSITION":"과장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""},{"SEQ":"2016092200003","GRP_STR":"과장외 2개","USER_ID":"dhlee","NAME":3,"DEPT_PATH":"AI본부 > 아이봇사업부 > 개발팀","POSITION":"과장","MOB_ID_USE_YN":"Y","REG_DTTM":"2016-09-22 09:50:32","LAST_LOGIN":"0000-00-00 00:00:00"},{"SEQ":"","GRP_STR":"","USER_ID":"jgkim","NAME":3,"DEPT_PATH":"광고사업본부 > 퍼포먼스사업부 > Advantage팀","POSITION":"과장","MOB_ID_USE_YN":"N","REG_DTTM":"","LAST_LOGIN":""}]}
      });
    }, 2000);
  });
};
