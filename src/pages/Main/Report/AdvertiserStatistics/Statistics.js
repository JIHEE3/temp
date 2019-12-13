import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import {
  advertiserStatistics,
  advertiserStatisticsDetail,
} from 'lib/api/report';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import StatisticsGraph from './StatisticsGraph';

const useStyles = makeStyles(theme => ({
  root: {
    // 테이블 th, td 커스텀 css
    '& .mb-corpName': {
      width: '130px',
    },
    '& td.mb-corpName .mb-corpName-text': {
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
  },
}));

let initialization = false;
const Statistics = () => {
  const classes = useStyles();
  const initParam = {};

  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  const childColumnSet = {
    ADVER_ID: () => {
      return null;
    },
  };

  /**
   * 테이블 클릭 후 세부정보 받아올때 보낼 param setting 해주는 함수
   * @param {json} data 테이블 로우 데이터
   */
  const makeSubParam = data => {
    return {
      adverId: data.ADVER_ID,
    };
  };

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
          <StatisticsGraph />
          <TableContainer
            className={classes.root}
            dataReqPromise={advertiserStatistics}
            dataDetailReqPromise={advertiserStatisticsDetail}
            params={{ ...params }}
            order="desc"
            orderBy="ADVRTS_AMT"
            dense={true}
            hasExcel
            hasTotal
            // customized={customized}
            expandTable
            makeSubParam={makeSubParam}
            childColumnSet={childColumnSet}
          />
        </>
      )}
    </>
  );
};

export default Statistics;
