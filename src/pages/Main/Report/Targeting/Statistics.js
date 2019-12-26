import React, { useState, useEffect } from 'react';
import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';

import StatisticsGraph from './StatisticsGraph';

let initialization = false;
const Statistics = () => {
  // const { t } = useTranslation();

  const initParam = {};

  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  /**
   * 필터 초기화
   */
  const handleOnReset = () => {
    initialization = true;
    setParams(initParam);
  };

  const getParam = newParams => {
    setGetInitParam(true);
    setParams({
      ...params,
      ...newParams,
    });
  };

  return (
    <>
      <FilterWrap handleOnReset={handleOnReset}>
        <StatisticsCommonFilter
          initialization={initialization}
          getParam={getParam}
        />
      </FilterWrap>
      {getInitParam && (
        <>
          <StatisticsGraph params={{ ...params }} />
        </>
      )}
    </>
  );
};

export default Statistics;
