import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { appTargetingMediaStatisticsData } from 'lib/api/datacenter';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';

const useStyles = makeStyles(theme => ({
  subContent: {
    color: theme.palette.primary.contrastText,
  },
  subShoppingContent: {
    float: 'right',
    color: theme.palette.table.cell.shoppingContent,
  },
  icoBox: {
    fontSize: 15,
    float: 'left',
    color: '#4d5059',
    cursor: 'pointer',
    marginRight: 10,
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));

let initialization = false;
let initParam = {};
const AppTargetingMediaStatistics = () => {
  const classes = useStyles();

  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  // header 및 body 컬럼 커스텀
  const customized = {};

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
          nonePltfomTpFilter={true}
          noneExternalFilter={true}
        />
      </FilterWrap>
      {getInitParam && (
        <>
          <TableContainer
            className={classes.root}
            dataReqPromise={appTargetingMediaStatisticsData}
            params={{ ...params }}
            order="desc"
            orderBy="ADVRTS_AMT"
            dense={true}
            hasTotal
            customized={customized}
            hasExcel
          />
        </>
      )}
    </>
  );
};

export default AppTargetingMediaStatistics;
