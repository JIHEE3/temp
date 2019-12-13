import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TableContainer from 'components/molecules/MbTable';
import FilterWrap from 'components/atoms/FilterWrap';
import FilterSelectbox from './FilterSelectbox';
import { authUserList } from 'lib/api/auth';

let initialization = false;
const List = () => {
  const initParam = {
    keyword: '',
  };
  const [params, setParams] = useState(initParam);
  const { t } = useTranslation();

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  /**
   *   필터 초기화
   */
  const handleOnReset = () => {
    setParams(initParam);
  };

  /**
   * 필터 선택 관련
   */
  const handleOnchangeFilter = filterParam => {
    setParams({ ...params, grpNo: filterParam });
  };

  return (
    <>
      <FilterWrap handleOnReset={handleOnReset}>
        <FilterSelectbox
          initialization={initialization}
          handleOnchangeFilter={handleOnchangeFilter}
        />
      </FilterWrap>
      <TableContainer
        dataReqPromise={authUserList}
        params={{ ...params }}
        dense={true}
        title={t('TEST')}
      />
    </>
  );
};

export default List;
