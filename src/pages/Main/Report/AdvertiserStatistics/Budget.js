import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import BudgetGraph from './BudgetGraph';

// const useStyles = makeStyles(theme => ({}));

let initialization = false;
let initParam = {};
const Budget = () => {
  // const classes = useStyles();
  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);

  useEffect(() => {
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
    if (getInitParam === false) {
      initParam = {
        ...initParam,
        ...newParams,
      };
    }
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
      {getInitParam && <BudgetGraph params={{ ...params }} />}
    </>
  );
};

export default Budget;
