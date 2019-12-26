import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { dailyStatistics } from 'lib/api/time';
import { makeRowColumn, getHeadObj } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import MyWindowPortal from 'components/molecules/WindowPortal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';

import StatisticsGraph from './StatisticsGraph';

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
}));

let initialization = false;
let initParam = {};
const Statistics = () => {
  // const { t } = useTranslation();
  const classes = useStyles();

  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);
  const [showWindowPortal, setShowWindowPortal] = useState(false);

  const handlePortalClose = () => {
    setShowWindowPortal('');
  };

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  // header 및 body 컬럼 커스텀
  const customized = {
    STATS_DTTM: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'STATS_DTTM').label}`;
      },
      makeBody: (rowObj, headsMap) => {
        const statsDttm = getHeadObj(headsMap, 'STATS_DTTM');
        const showWindowUrl =
          '/report/media?sDate=' +
          rowObj['STATS_DTTM'] +
          '&eDate=' +
          rowObj['STATS_DTTM'] +
          '&uri=/report/media&isPop=1';

        let resultComponent;
        if (rowObj.isChild) {
          resultComponent = (
            <>
              {makeRowColumn(
                rowObj['STATS_DTTM'],
                statsDttm.type,
                statsDttm.format
              )}
            </>
          );
        } else {
          resultComponent = (
            <>
              {makeRowColumn(
                rowObj['STATS_DTTM'],
                statsDttm.type,
                statsDttm.format
              )}

              <div className={classes.icoBox}>
                <FontAwesomeIcon
                  icon={faExternalLink}
                  onClick={e => setShowWindowPortal(showWindowUrl)}
                />
              </div>
            </>
          );
        }
        return resultComponent;
      },
    },
    CLICK_CNT: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'CLICK_CNT').label}`;
      },
      makeBody: (rowObj, headsMap) => {
        const clickCnt = getHeadObj(headsMap, 'CLICK_CNT');
        const showWindowUrl =
          '/report/adver/statistics?sDate=' +
          rowObj['STATS_DTTM'] +
          '&eDate=' +
          rowObj['STATS_DTTM'] +
          '&uri=/report/adver/statistics&isPop=1';
        let resultComponent;
        if (rowObj.isChild) {
          resultComponent = (
            <>
              {makeRowColumn(
                rowObj['CLICK_CNT'],
                clickCnt.type,
                clickCnt.format
              )}
            </>
          );
        } else {
          resultComponent = (
            <>
              {makeRowColumn(
                rowObj['CLICK_CNT'],
                clickCnt.type,
                clickCnt.format
              )}

              <div className={classes.icoBox}>
                <FontAwesomeIcon
                  icon={faExternalLink}
                  onClick={e => setShowWindowPortal(showWindowUrl)}
                />
              </div>
            </>
          );
        }
        return resultComponent;
      },
    },
    ADVER_CNT: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'ADVER_CNT').label}`;
      },
      makeBody: (rowObj, headsMap) => {
        const adverCnt = getHeadObj(headsMap, 'ADVER_CNT');
        const totAdverCnt = getHeadObj(headsMap, 'TOT_ADVER_CNT');
        return (
          <>
            {makeRowColumn(rowObj['ADVER_CNT'], adverCnt.type, adverCnt.format)}
            <br />
            <div className={classes.subContent}>
              (
              {makeRowColumn(
                rowObj['TOT_ADVER_CNT'],
                totAdverCnt.type,
                totAdverCnt.format
              )}
              )
            </div>
          </>
        );
      },
    },
    TOT_ADVER_CNT: {
      merged: true,
    },
    PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'PAR_EPRS_CNT').label}
            <br />({getHeadObj(headsMap, 'REQ_CNT').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const parEprsCnt = getHeadObj(headsMap, 'PAR_EPRS_CNT');
        const reqCnt = getHeadObj(headsMap, 'REQ_CNT');
        return (
          <>
            {makeRowColumn(
              rowObj['PAR_EPRS_CNT'],
              parEprsCnt.type,
              parEprsCnt.format
            )}
            <br />
            <div className={classes.subContent}>
              ({makeRowColumn(rowObj['REQ_CNT'], reqCnt.type, reqCnt.format)})
            </div>
          </>
        );
      },
    },
    REQ_CNT: {
      merged: true,
    },
    RES_RATE: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'RES_RATE').label}
            <br />({getHeadObj(headsMap, 'ENT_RATE').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const resRate = getHeadObj(headsMap, 'RES_RATE');
        const entRate = getHeadObj(headsMap, 'ENT_RATE');
        return (
          <>
            {makeRowColumn(rowObj['RES_RATE'], resRate.type, resRate.format)}
            <br />(
            {makeRowColumn(rowObj['ENT_RATE'], entRate.type, entRate.format)})
          </>
        );
      },
    },
    ENT_RATE: {
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
        return (
          <>
            {makeRowColumn(
              rowObj['ADVRTS_AMT'],
              advrtsAmt.type,
              advrtsAmt.format
            )}
            <br />
            <div className={classes.subContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_ADVRTS_AMT'],
                trgtAdvrtsAmt.type,
                trgtAdvrtsAmt.format
              )}
              )
            </div>
          </>
        );
      },
    },
    TRGT_ADVRTS_AMT: {
      merged: true,
    },
    CONV_RATE: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'CONV_RATE').label}
            <br />({getHeadObj(headsMap, 'ORDER_CNT').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const convRate = getHeadObj(headsMap, 'CONV_RATE');
        const orderCnt = getHeadObj(headsMap, 'ORDER_CNT');
        return (
          <>
            {makeRowColumn(rowObj['CONV_RATE'], convRate.type, convRate.format)}
            <br />
            <div className={classes.subContent}>
              (
              {makeRowColumn(
                rowObj['ORDER_CNT'],
                orderCnt.type,
                orderCnt.format
              )}
              )
            </div>
          </>
        );
      },
    },
    ORDER_CNT: {
      merged: true,
    },
    AVG_ORDER_AMT: {
      makeHead: headsMap => {
        return (
          <>
            {getHeadObj(headsMap, 'AVG_ORDER_AMT').label}
            <br />({getHeadObj(headsMap, 'CONV_AMT').label})
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const avgOrderAmt = getHeadObj(headsMap, 'AVG_ORDER_AMT');
        const convAmt = getHeadObj(headsMap, 'CONV_AMT');
        return (
          <>
            {makeRowColumn(
              rowObj['AVG_ORDER_AMT'],
              avgOrderAmt.type,
              avgOrderAmt.format
            )}
            <br />
            <div className={classes.subContent}>
              ({makeRowColumn(rowObj['CONV_AMT'], convAmt.type, convAmt.format)}
              )
            </div>
          </>
        );
      },
    },
    CONV_AMT: {
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
            <br />
            <div className={classes.subShoppingContent}>
              (
              {makeRowColumn(
                rowObj['TRGT_ECPM'],
                trgtEcpm.type,
                trgtEcpm.format
              )}
              )
            </div>
          </>
        );
      },
    },
    TRGT_ECPM: {
      merged: true,
    },
  };

  const childColumnSet = {
    STATS_DTTM: () => {
      return null;
    },
  };

  /**
   * 테이블 클릭 후 세부정보 받아올때 보낼 param setting 해주는 함수
   * @param {json} data 테이블 로우 데이터
   */
  const makeSubParam = data => {
    return {
      statsDttm: data.STATS_DTTM,
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
      {getInitParam && (
        <>
          <StatisticsGraph params={{ ...params }} />
          <TableContainer
            className={classes.root}
            dataReqPromise={dailyStatistics}
            params={{ ...params }}
            order="desc"
            orderBy="STATS_DTTM"
            dense={true}
            customized={customized}
            hasExcel
            expandTable
            makeSubParam={makeSubParam}
            childColumnSet={childColumnSet}
          />
        </>
      )}
      {showWindowPortal && (
        //sudo App.js 로 빼야할지 고민 다른탭 이동하면 사라지므로
        <MyWindowPortal
          url={showWindowPortal}
          handleUnmount={handlePortalClose}
          windowFeatures="width=1500,height=700"
        />
      )}
    </>
  );
};

export default Statistics;
