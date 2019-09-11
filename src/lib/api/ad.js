import client from './client';
import qs from 'qs';

export const adcodeList = ({
  cmd = 'getList',
  tab_type = 'main',
  sdate = '2019-09-05',
  edate = '2019-09-05',
  adExchange_flag = 'Y',
  plat_code,
  prdt_code,
  tp_code
}) =>
  client.post(
    '/v2/media_report/ajax/ctrProcess.php',
    qs.stringify({
      cmd,
      tab_type,
      sdate,
      edate,
      adExchange_flag,
      plat_code,
      prdt_code,
      tp_code
    })
  );
