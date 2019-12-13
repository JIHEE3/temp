import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { adexStatistics } from 'lib/api/adex';
import { makeRowColumn } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';

import StatisticsGraph from './StatisticsGraph';
import AdExStatisticsGraph from './AdExStatisticsGraph';
import AdExPrivateStatisticsGraph from './AdExPrivateStatisticsGraph';

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
// 공통 필터에서 초기값 받아왔는지 확인
let getInitParam = false;
const Statistics = () => {
  // const { t } = useTranslation();
  const classes = useStyles();
  const adexIds = [
    { mediamixer: '미디어믹서(구글)' },
    { criteo: '크리테오' },
    { widerplanet: '와이더플래닛' },
    { iwmgg: '인터웍스_구글' },
    { dable1: '데이블' },
    { adop: '애드오피' },
    { toast: 'NHN ACE' },
    { adfit: '애드핏' },
    { adexinter: '인터웍스' },
    { manplus: '메조미디어' },
    { ekbeatle: '나스미디어' },
  ];

  const initParam = {
    type: 'advrtsAmt',
    ids: '',
  };

  initParam.ids += adexIds.map(item => {
    return Object.keys(item)[0];
  });

  const [params, setParams] = useState(initParam);

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  const getCustomBody = obj => {
    let returnType, returnFormat;

    switch (params.type) {
      case 'advrtsAmt':
        returnType = 'number';
        returnFormat = '#,##0';
        break;
      case 'parEprsCnt':
        returnType = 'number';
        returnFormat = '#,##0';
        break;
      case 'ctr':
        returnType = 'number';
        returnFormat = '0.000%';
        break;
      case 'ecpm':
        returnType = 'number';
        returnFormat = '#,##0';
        break;
      default:
        break;
    }

    return <>{makeRowColumn(obj, returnType, returnFormat)}</>;
  };

  const getAdexCustomData = () => {
    let keyStr;
    const customizeData = [];

    for (let i = 0; i < adexIds.length; i++) {
      let key = Object.keys(adexIds[i])[0];
      let val = adexIds[i][Object.keys(adexIds[i])[0]];

      keyStr = key.toUpperCase();

      const makeBodyF = keyStr => rowObj => {
        return getCustomBody(rowObj[keyStr]);
      };

      customizeData[keyStr] = {
        makeHead: headsMap => {
          return val;
        },
        makeBody: makeBodyF(keyStr),
      };
    }
    return customizeData;
  };

  // header 및 body 컬럼 커스텀
  const customized = getAdexCustomData();

  /**
   * 필터 초기화
   */
  const handleOnReset = () => {
    initialization = true;
    setParams(initParam);
  };

  const getParam = newParams => {
    getInitParam = true;
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
          <StatisticsGraph params={{ ...params }} adexIds={adexIds} />
          <AdExStatisticsGraph params={{ ...params }} adexIds={adexIds} />
          <AdExPrivateStatisticsGraph
            params={{ ...params }}
            adexIds={adexIds}
          />
          <TableContainer
            className={classes.root}
            dataReqPromise={adexStatistics}
            params={{ ...params }}
            order="desc"
            orderBy="STATS_DTTM"
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
