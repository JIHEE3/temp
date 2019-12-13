import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { requestStatistics } from 'lib/api/request';
import { getDate } from 'lib/commonLib';
import moment from 'moment';
import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';

import StatisticsGraph from './StatisticsGraph';

const useStyles = makeStyles(theme => ({
  subContent: {
    color: theme.palette.primary.contrastText,
  },
  subShoppingContent: {
    float: 'right',
    color: theme.palette.table.cell.shoppingContent,
  },
}));

let initialization = false;
const Statistics = () => {
  // const { t } = useTranslation();
  const classes = useStyles();
  const sDate = moment().subtract(1, 'days');
  const eDate = moment().subtract(1, 'days');
  const initParam = {
    sDate: getDate(sDate),
    eDate: getDate(eDate),
  };
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
          initData={initParam}
        />
      </FilterWrap>
      {getInitParam && (
        <>
          <StatisticsGraph params={{ ...params }} />
          <TableContainer
            className={classes.root}
            dataReqPromise={requestStatistics}
            params={{ ...params }}
            order="desc"
            orderBy="ADVRTS_AMT"
            dense={true}
            customized={customized}
            hasExcel
          />
        </>
      )}
    </>
  );
};

export default Statistics;
