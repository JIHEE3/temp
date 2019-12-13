import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { mediaStatistics } from 'lib/api/media';
import { makeRowColumn, getHeadObj } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';

const useStyles = makeStyles(theme => ({
  subContent: {
    color: theme.palette.primary.contrastText,
  },
  subEprsContent: {
    color: theme.palette.table.cell.subEprsContent,
  },
  subChrgRateContent: {
    color: theme.palette.primary.contrastText,
  },
  subShoppingContent: {
    float: 'right',
    color: theme.palette.table.cell.shoppingContent,
  },
  subIvdCnt: {
    color: theme.palette.table.cell.ivdCnt,
  },
  subIvdRate: {
    color: theme.palette.table.cell.ivdRate,
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

  // header 및 body 컬럼 커스텀
  const customized = {
    PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'PAR_EPRS_CNT').label}
            <br />({getHeadObj(headsMap, 'CHRG_PAR_EPRS_CNT').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const parEprsCnt = getHeadObj(headsMap, 'PAR_EPRS_CNT');
        const chrgParEprsCnt = getHeadObj(headsMap, 'CHRG_PAR_EPRS_CNT');
        const chrgRate = getHeadObj(headsMap, 'CHRG_RATE');
        return (
          <>
            {makeRowColumn(
              rowObj['PAR_EPRS_CNT'],
              parEprsCnt.type,
              parEprsCnt.format
            )}
            <br />
            <span className={classes.subEprsContent}>
              {makeRowColumn(
                rowObj['CHRG_PAR_EPRS_CNT'],
                chrgParEprsCnt.type,
                chrgParEprsCnt.format
              )}
            </span>
            <span className={classes.subChrgRateContent}>
              (
              {makeRowColumn(
                rowObj['CHRG_RATE'],
                chrgRate.type,
                chrgRate.format
              )}
              )
            </span>
          </>
        );
      },
    },
    CHRG_PAR_EPRS_CNT: {
      merged: true,
    },
    CHRG_RATE: {
      merged: true,
    },
    CLICK_CNT: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'CLICK_CNT').label}
            <br />({getHeadObj(headsMap, 'IVD_CNT').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const clickCnt = getHeadObj(headsMap, 'CLICK_CNT');
        const ivdCnt = getHeadObj(headsMap, 'IVD_CNT');
        const ivdRate = getHeadObj(headsMap, 'IVD_RATE');
        return (
          <>
            {makeRowColumn(rowObj['CLICK_CNT'], clickCnt.type, clickCnt.format)}
            <br />
            <span className={classes.subIvdCnt}>
              ({makeRowColumn(rowObj['IVD_CNT'], ivdCnt.type, ivdCnt.format)})
            </span>
            <span className={classes.subivdRate}>
              {makeRowColumn(rowObj['IVD_RATE'], ivdRate.type, ivdRate.format)}
            </span>
          </>
        );
      },
    },
    IVD_CNT: {
      merged: true,
    },
    IVD_RATE: {
      merged: true,
    },
    ADVRTS_AMT: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'ADVRTS_AMT').label}
            <br />({getHeadObj(headsMap, 'TRGT_ADVRTS_AMT').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const advrtsAmt = getHeadObj(headsMap, 'ADVRTS_AMT');
        const trgtAdvrtsAmt = getHeadObj(headsMap, 'TRGT_ADVRTS_AMT');
        const mcPoint = getHeadObj(headsMap, 'MC_POINT');
        const mcPointRate = getHeadObj(headsMap, 'MC_POINT_RATE');
        return (
          <>
            {makeRowColumn(
              rowObj['ADVRTS_AMT'],
              advrtsAmt.type,
              advrtsAmt.format
            )}
            <span className={classes.subContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_ADVRTS_AMT'],
                trgtAdvrtsAmt.type,
                trgtAdvrtsAmt.format
              )}
              )
            </span>
            <br />
            <span className={classes.subEprsContent}>
              {makeRowColumn(rowObj['MC_POINT'], mcPoint.type, mcPoint.format)}
            </span>
            <span className={classes.subContent}>
              (
              {makeRowColumn(
                rowObj['MC_POINT_RATE'],
                mcPointRate.type,
                mcPointRate.format
              )}
              )
            </span>
          </>
        );
      },
    },
    TRGT_ADVRTS_AMT: {
      merged: true,
    },
    MC_POINT: {
      merged: true,
    },
    MC_POINT_RATE: {
      merged: true,
    },
    MOB_SESSION_ROAS: {
      makeHead: headsMap => {
        return <>{getHeadObj(headsMap, 'MOB_SESSION_ORDER_AMT').label}(쇼핑)</>;
      },
      makeBody: (rowObj, headsMap) => {
        const mobSessionRoas = getHeadObj(headsMap, 'MOB_SESSION_ROAS');
        const trgtMobSessionRoas = getHeadObj(
          headsMap,
          'TRGT_MOB_SESSION_ROAS'
        );
        const mobSessionOrderAmt = getHeadObj(
          headsMap,
          'MOB_SESSION_ORDER_AMT'
        );
        return (
          <>
            {makeRowColumn(
              rowObj['MOB_SESSION_ROAS'],
              mobSessionRoas.type,
              mobSessionRoas.format
            )}
            <div className={classes.subShoppingContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_MOB_SESSION_ROAS'],
                trgtMobSessionRoas.type,
                trgtMobSessionRoas.format
              )}
              )
            </div>
            <br />
            <div className={classes.subContent}>
              {makeRowColumn(
                rowObj['MOB_SESSION_ORDER_AMT'],
                mobSessionOrderAmt.type,
                mobSessionOrderAmt.format
              )}
            </div>
          </>
        );
      },
    },
    TRGT_MOB_SESSION_ROAS: {
      merged: true,
    },
    MOB_SESSION_ORDER_AMT: {
      merged: true,
    },
    SESSION_ROAS: {
      makeHead: headsMap => {
        return <>{getHeadObj(headsMap, 'SESSION_ORDER_AMT').label}(쇼핑)</>;
      },
      makeBody: (rowObj, headsMap) => {
        const sessionRoas = getHeadObj(headsMap, 'SESSION_ROAS');
        const trgtSessionRoas = getHeadObj(headsMap, 'TRGT_SESSION_ROAS');
        const sessionOrderAmt = getHeadObj(headsMap, 'SESSION_ORDER_AMT');
        return (
          <>
            {makeRowColumn(
              rowObj['SESSION_ROAS'],
              sessionRoas.type,
              sessionRoas.format
            )}
            <div className={classes.subShoppingContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_SESSION_ROAS'],
                trgtSessionRoas.type,
                trgtSessionRoas.format
              )}
              )
            </div>
            <br />
            <div className={classes.subContent}>
              {makeRowColumn(
                rowObj['SESSION_ORDER_AMT'],
                sessionOrderAmt.type,
                sessionOrderAmt.format
              )}
            </div>
          </>
        );
      },
    },
    TRGT_SESSION_ROAS: {
      merged: true,
    },
    SESSION_ORDER_AMT: {
      merged: true,
    },
    DIRECT_ROAS: {
      makeHead: headsMap => {
        return <>{getHeadObj(headsMap, 'DIRECT_ORDER_AMT').label}(쇼핑)</>;
      },
      makeBody: (rowObj, headsMap) => {
        const directRoas = getHeadObj(headsMap, 'DIRECT_ROAS');
        const trgtDirectRoas = getHeadObj(headsMap, 'TRGT_DIRECT_ROAS');
        const directOrderAmt = getHeadObj(headsMap, 'DIRECT_ORDER_AMT');
        return (
          <>
            {makeRowColumn(
              rowObj['DIRECT_ROAS'],
              directRoas.type,
              directRoas.format
            )}
            <div className={classes.subShoppingContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_DIRECT_ROAS'],
                trgtDirectRoas.type,
                trgtDirectRoas.format
              )}
              )
            </div>
            <br />
            <div className={classes.subContent}>
              {makeRowColumn(
                rowObj['DIRECT_ORDER_AMT'],
                directOrderAmt.type,
                directOrderAmt.format
              )}
            </div>
          </>
        );
      },
    },
    TRGT_DIRECT_ROAS: {
      merged: true,
    },
    DIRECT_ORDER_AMT: {
      merged: true,
    },
    ROAS: {
      makeHead: headsMap => {
        return <>{getHeadObj(headsMap, 'ORDER_AMT').label}(쇼핑)</>;
      },
      makeBody: (rowObj, headsMap) => {
        const roas = getHeadObj(headsMap, 'ROAS');
        const trgtRoas = getHeadObj(headsMap, 'TRGT_ROAS');
        const orderAmt = getHeadObj(headsMap, 'ORDER_AMT');
        return (
          <>
            {makeRowColumn(rowObj['ROAS'], roas.type, roas.format)}
            <div className={classes.subShoppingContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_ROAS'],
                trgtRoas.type,
                trgtRoas.format
              )}
              )
            </div>
            <br />
            <div className={classes.subContent}>
              {makeRowColumn(
                rowObj['ORDER_AMT'],
                orderAmt.type,
                orderAmt.format
              )}
            </div>
          </>
        );
      },
    },
    TRGT_ROAS: {
      merged: true,
    },
    ORDER_AMT: {
      merged: true,
    },
    ECPM: {
      makeHead: headsMap => {
        return <>{getHeadObj(headsMap, 'ECPM').label}(쇼핑)</>;
      },
      makeBody: (rowObj, headsMap) => {
        const ecpm = getHeadObj(headsMap, 'ECPM');
        const trgtEcpm = getHeadObj(headsMap, 'TRGT_ECPM');
        return (
          <>
            {makeRowColumn(rowObj['ECPM'], ecpm.type, ecpm.format)}
            <span className={classes.subShoppingContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_ECPM'],
                trgtEcpm.type,
                trgtEcpm.format
              )}
              )
            </span>
          </>
        );
      },
    },
    TRGT_ECPM: {
      merged: true,
    },
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
        <TableContainer
          className={classes.root}
          dataReqPromise={mediaStatistics}
          params={{ ...params }}
          order="desc"
          orderBy="ADVRTS_AMT"
          dense={true}
          hasExcel
          hasTotal
          customized={customized}
        />
      )}
    </>
  );
};

export default Statistics;
