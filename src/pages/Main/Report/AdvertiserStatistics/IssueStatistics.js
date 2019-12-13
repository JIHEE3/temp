import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { issueReport } from 'lib/api/report';
import { getCustom } from 'lib/api/common';
import { makeHeadData, makeRowColumn } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import ManagerFilter from 'components/organisms/ManagerFilter';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import EnhancedTableWrap from 'components/molecules/MbTable/EnhancedTableWrap';
import BasicTable from 'components/molecules/MbBasicTable';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    borderTop: theme.palette.box.border,
    '& .mb-issue-table:not(:last-child)': {
      marginRight: 22,
    },
  },
  tableWrap: {
    display: 'inline-block',
    width: 502,
    marginTop: 28,
    verticalAlign: 'top',
  },
  tableTitle: {
    fontWeight: 'normal',
    fontSize: '15px',
    color: theme.palette.common.black,
    marginBottom: 9,
  },
  issueTable: {
    '& .mb-raf': {
      color: theme.palette.common.blue,
      '&.mb-minus': {
        color: theme.palette.common.red,
      },
    },
    // 지출 테이블
    '&.ADVRTS_AMT': {
      '& .mb-siteName': {
        width: 136,
      },
      '& .mb-yAdvrtsAmt, & .mb-wAdvrtsAmt, & .mb-advrtsAmtRaf': {
        width: 122,
      },
    },
    // ROAS
    '&.ROAS': {
      '& .mb-siteName': {
        width: 136,
      },
      '& .mb-yRoas, & .mb-wRoas, & .mb-roasRaf': {
        width: 122,
      },
    },
    // 신규 런칭
    '&.NEW_ADVER': {
      '& .mb-siteName': {
        width: 136,
      },
      '& .mb-yAdvrtsAmt, & .mb-point, & .mb-joinDttm': {
        width: 122,
      },
    },
    // 일에산
    '&.BDGT': {
      '& .mb-siteName': {
        width: 110,
      },
      '& .mb-budgetLimit, & .mb-yAdvrtsAmt, & .mb-wAdvrtsAmt': {
        width: 98,
      },
    },
    // 중지 광고주
    '&.STOP_ADVER': {
      '& .mb-siteName': {
        width: 190,
      },
    },
  },
}));

const tableInfoJson = {
  ADVRTS_AMT: {
    headList: [
      {
        id: 'SITE_NAME',
        label: '사이트',
        orderFlag: true,
        type: 'string',
        format: '@',
        displayFlag: true,
      },
      {
        id: 'Y_ADVRTS_AMT',
        label: '어제',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
      {
        id: 'W_ADVRTS_AMT',
        label: '평일(5일)',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
      {
        id: 'ADVRTS_AMT_RAF',
        label: '등락률',
        orderFlag: true,
        type: 'number',
        format: '0.00%',
        displayFlag: true,
      },
    ],
    order: 'desc',
    orderBy: 'SITE_NAME',
  },
  ROAS: {
    headList: [
      {
        id: 'SITE_NAME',
        label: '사이트',
        orderFlag: true,
        type: 'string',
        format: '@',
        displayFlag: true,
      },
      {
        id: 'Y_ROAS',
        label: '어제',
        orderFlag: true,
        type: 'number',
        format: '0.00%',
        displayFlag: true,
      },
      {
        id: 'W_ROAS',
        label: '평일(5일)',
        orderFlag: true,
        type: 'number',
        format: '0.00%',
        displayFlag: true,
      },
      {
        id: 'ROAS_RAF',
        label: '등락률',
        orderFlag: true,
        type: 'number',
        format: '0.00%',
        displayFlag: true,
      },
    ],
    order: 'desc',
    orderBy: 'SITE_NAME',
  },
  NEW_ADVER: {
    headList: [
      {
        id: 'SITE_NAME',
        label: '사이트',
        orderFlag: true,
        type: 'string',
        format: '@',
        displayFlag: true,
      },
      {
        id: 'Y_ADVRTS_AMT',
        label: '어제',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
      {
        id: 'POINT',
        label: '잔액',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
      {
        id: 'JOIN_DTTM',
        label: '가입 일자',
        orderFlag: true,
        type: 'date',
        format: 'yyyy-mm-dd',
        displayFlag: true,
      },
    ],
    order: 'desc',
    orderBy: 'SITE_NAME',
  },
  BDGT: {
    headList: [
      {
        id: 'SITE_NAME',
        label: '사이트',
        orderFlag: true,
        type: 'string',
        format: '@',
        displayFlag: true,
      },
      {
        id: 'BUDGET_LIMIT',
        label: '에산 한도',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
      {
        id: 'Y_ADVRTS_AMT',
        label: '어제',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
      {
        id: 'W_ADVRTS_AMT',
        label: '평일(5일)',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
    ],
    order: 'desc',
    orderBy: 'SITE_NAME',
  },
  STOP_ADVER: {
    headList: [
      {
        id: 'SITE_NAME',
        label: '사이트',
        orderFlag: true,
        type: 'string',
        format: '@',
        displayFlag: true,
      },
      {
        id: 'POINT',
        label: '잔액',
        orderFlag: true,
        type: 'number',
        format: '#,##0',
        displayFlag: true,
      },
    ],
    order: 'desc',
    orderBy: 'SITE_NAME',
  },
};

const makeRafRow = data => {
  data = Number(data);
  let className = 'mb-raf';
  if (data < 0) {
    className += ' mb-minus';
  }
  return (
    <div className={className}>{makeRowColumn(data, 'number', '0.00%')}</div>
  );
};

const customized = {
  ADVRTS_AMT_RAF: {
    makeBody: rowObj => {
      return makeRafRow(rowObj.ADVRTS_AMT_RAF);
    },
  },
  ROAS_RAF: {
    makeBody: rowObj => {
      return makeRafRow(rowObj.ROAS_RAF);
    },
  },
  JOIN_DTTM: {
    makeBody: rowObj => {
      return makeRowColumn(
        rowObj.JOIN_DTTM.split(' ')[0],
        'date',
        'yyyy-mm-dd'
      );
    },
  },
};

/**
 * 테이블 나오는 순서
 */
const tableOrder = [
  { key: 'ADVRTS_AMT', label: '지출' },
  { key: 'ROAS', label: 'ROAS' },
  { key: 'NEW_ADVER', label: '신규 런칭' },
  // {노출량},
  { key: 'BDGT', label: '일예산' },
  { key: 'STOP_ADVER', label: '중지 광고주' },
];

let initialization = false;
const IssueStatistics = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const initParam = {};
  const [loading, setLoading] = useState(false);
  const [layoutList, setLayoutList] = useState({});
  const [list, setList] = useState({});
  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);
  const [selectedManagerIndex, setSelectedManagerIndex] = useState(0);

  useEffect(() => {
    initialization = false;
  }, [params]);

  useEffect(() => {
    setLoading(true);
    getCustom({
      layoutName: 'layout',
    }).then(response => {
      const { data } = response.data;
      setLayoutList(data);
    });

    issueReport({
      gubun: 11,
      advrtsPrdtCode: '00',
      advrtsTpCode: '00',
      pltfomTpCode: '00',
    }).then(response => {
      setLoading(false);
      const {
        ADVRTS_AMT,
        BDGT,
        NEW_ADVER,
        ROAS,
        STOP_ADVER,
      } = response.data.data;
      setList({
        ADVRTS_AMT: ADVRTS_AMT.data,
        BDGT: BDGT.data,
        NEW_ADVER: NEW_ADVER.data,
        ROAS: ROAS.data,
        STOP_ADVER: STOP_ADVER.data,
      });
    });
  }, []);

  /**
   * 필터 초기화
   */
  const handleOnReset = () => {
    initialization = true;
    setParams(initParam);
    setSelectedManagerIndex(0);
  };

  /**
   * 영업 담당자 필터 선택
   * @param {string} name
   * @param {*} value
   */
  const handleFilterChange = (name, index, value) => {
    setSelectedManagerIndex(index);
    setParams({
      ...params,
      contact: value,
    });
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
        <ManagerFilter
          label={t('영업 담당')}
          value={selectedManagerIndex}
          handleOnchange={handleFilterChange}
        />
        <StatisticsCommonFilter
          initialization={initialization}
          getParam={getParam}
          noneDate={true}
          noneExternalFilter={true}
        />
      </FilterWrap>
      {getInitParam && (
        <EnhancedTableWrap>
          <div className={classes.tableRoot}>
            {/**
             * 디스플레이 여부로 테이블 리턴
             */
            Object.keys(layoutList).length !== 0 &&
              (() => {
                const result = [];

                for (let i = 0; i < tableOrder.length; i++) {
                  const { key, label } = tableOrder[i];
                  const curData = layoutList[key];
                  const tableInfo = tableInfoJson[key];

                  if (curData.display) {
                    result.push(
                      <div
                        key={key}
                        className={`${classes.tableWrap} mb-issue-table`}
                      >
                        <h3 className={classes.tableTitle}>{label}</h3>
                        <BasicTable
                          order={tableInfo.order}
                          orderBy={tableInfo.orderBy}
                          list={list[key]}
                          headCells={makeHeadData(tableInfo.headList)}
                          loading={loading}
                          className={`${classes.issueTable} ${key}`}
                          customized={customized}
                        />
                      </div>
                    );
                  }
                }
                return result;
              })()}
          </div>
        </EnhancedTableWrap>
      )}
    </>
  );
};

export default IssueStatistics;
