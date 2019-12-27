import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { CookieStatisticsData } from 'lib/api/datacenter';
import MbTooltip from 'components/atoms/MbTooltip';
import numeral from 'numeral';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';

import CookieParamGraph from './CookieParamGraph';

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
let initParam = {
  sDate: moment()
    .add(-1, 'day')
    .add(-1, 'month')
    .format('YYYYMMDD'),
  eDate: moment()
    .add(-1, 'day')
    .format('YYYYMMDD'),
};
const CookieStatistics = () => {
  // const { t } = useTranslation();
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
  const customized = {
    ACC_CW: {
      makeHead: headsMap => {
        return (
          <>
            <div style={{ width: 200 }}>
              <span style={{ marginRight: 20 }}>
                {i18next.t('장바구니 쿠키 수')}
              </span>
              <MbTooltip
                title={i18next.t('전체 모수 중 장바구니 모수의 수')}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="right-start"
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
              </MbTooltip>
            </div>
            <div style={{ width: 100, float: 'left' }}>누적</div>
            <div style={{ width: 100, float: 'left' }}>신규</div>
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        return (
          <>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['ACC_CW']).format('#,##0')}
            </div>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['NEW_CW']).format('#,##0')}
            </div>
          </>
        );
      },
    },
    NEW_CW: {
      merged: true,
    },
    ACC_SR: {
      makeHead: headsMap => {
        return (
          <>
            <div style={{ width: 200 }}>
              <span style={{ marginRight: 20 }}>
                {i18next.t('본상품 쿠키 수')}
              </span>
              <MbTooltip
                title={i18next.t('전체 모수 중 본상품 모수의 수')}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="right-start"
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
              </MbTooltip>
            </div>
            <div style={{ width: 100, float: 'left' }}>누적</div>
            <div style={{ width: 100, float: 'left' }}>신규</div>
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        return (
          <>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['ACC_SR']).format('#,##0')}
            </div>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['NEW_SR']).format('#,##0')}
            </div>
          </>
        );
      },
    },
    NEW_SR: {
      merged: true,
    },
    ACC_UM: {
      makeHead: headsMap => {
        return (
          <>
            <div style={{ width: 200 }}>
              <span style={{ marginRight: 20 }}>
                {i18next.t('리턴매칭 쿠키 수')}
              </span>
              <MbTooltip
                title={i18next.t('전체 모수 중 리턴매칭 모수의 수')}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="right-start"
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
              </MbTooltip>
            </div>
            <div style={{ width: 100, float: 'left' }}>누적</div>
            <div style={{ width: 100, float: 'left' }}>신규</div>
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        return (
          <>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['ACC_UM']).format('#,##0')}
            </div>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['NEW_UM']).format('#,##0')}
            </div>
          </>
        );
      },
    },
    NEW_UM: {
      merged: true,
    },
    ACC_HU: {
      makeHead: headsMap => {
        return (
          <>
            <div style={{ width: 200 }}>
              <span style={{ marginRight: 20 }}>
                {i18next.t('헤비유저 쿠키 수')}
              </span>
              <MbTooltip
                title={i18next.t('전체 모수 중 헤비유저 모수의 수')}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="right-start"
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
              </MbTooltip>
            </div>
            <div style={{ width: 100, float: 'left' }}>누적</div>
            <div style={{ width: 100, float: 'left' }}>신규</div>
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        return (
          <>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['ACC_HU']).format('#,##0')}
            </div>
            <div style={{ width: 100, float: 'left' }}>
              {numeral(rowObj['NEW_HU']).format('#,##0')}
            </div>
          </>
        );
      },
    },
    NEW_HU: {
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
          initData={initParam}
          noneExternalFilter={true}
          noneDisplayFilter={true}
        />
      </FilterWrap>
      {getInitParam && (
        <>
          {<CookieParamGraph params={{ ...params }} />}
          <TableContainer
            className={classes.root}
            dataReqPromise={CookieStatisticsData}
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

export default CookieStatistics;
