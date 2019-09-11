import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FETCH_ADCODE, fetchAdcode } from 'modules/adcode';

const AdcodeContainer = () => {
  const dispatch = useDispatch();
  const { data, error, loading /*, user*/ } = useSelector(
    ({ adcode, loading /*, user */ }) => ({
      data: adcode.data,
      error: adcode.error,
      loading: loading[FETCH_ADCODE]
      /*user: auth.user,*/
    })
  );

  useEffect(() => {
    const temp = {
      cmd: 'getList',
      tab_type: 'main',
      sdate: '2019-09-05',
      edate: '2019-09-05',
      adExchange_flag: 'Y'
    };
    dispatch(fetchAdcode(temp));
  }, [dispatch]);

  return (
    <div>
      <div>광고 상품 관리(api req 테스트 / error , loading 사용해야함)</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default AdcodeContainer;
