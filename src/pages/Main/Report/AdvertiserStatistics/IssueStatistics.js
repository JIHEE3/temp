import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons';

import { issueReport } from 'lib/api/report';
import { getCustom, setCustom } from 'lib/api/common';
import { makeHeadData, makeRowColumn } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import ManagerFilter from 'components/organisms/ManagerFilter';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import EnhancedTableWrap from 'components/molecules/MbTable/EnhancedTableWrap';
import BasicTable from 'components/molecules/MbBasicTable';
import SetUpList from 'components/molecules/SetUpList';
import BasicPopover from 'components/molecules/BasicPopover';
import MyWindowPortal from 'components/molecules/WindowPortal';

import issueIcon from 'images/common/table/issue.svg';
import AdvertiserLoginIcon from 'images/common/table/advertiserLogin';
import StatisticsIcon from 'images/common/table/statistics';
import HomeIcon from 'images/common/table/home';

const style = theme => ({
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
    '& table': {
      tableLayout: 'fixed',
      '& td, & th': {
        boxSizing: 'border-box',
      },
    },
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
        width: '100%',
      },
      '& .mb-budgetLimit, & .mb-yAdvrtsAmt, & .mb-wAdvrtsAmt': {
        width: 98,
      },
    },
    // 중지 광고주
    '&.STOP_ADVER': {
      '& .mb-siteName': {
        width: '100%',
      },
      '& .mb-point': {
        width: 156,
      },
    },
  },
});

const siteButtonListStyles = makeStyles(theme => ({
  root: {
    '& > div:not(:first-child)': {
      marginTop: 15,
    },
  },
  button: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.primary.deep,
      '& svg': {
        fill: theme.palette.primary.deep,
      },
    },
  },
  title: {
    marginLeft: 8,
  },
}));

const SiteButtonList = ({ data }) => {
  const { t } = useTranslation();
  const classes = siteButtonListStyles();
  const [showWindowPortal, setShowWindowPortal] = useState(false);

  const handlePortalClose = () => {
    setShowWindowPortal(false);
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.button}
        onClick={e => console.log('광고주 로그인')}
      >
        <AdvertiserLoginIcon />
        <div className={classes.title}>{t('광고주로 로그인')}</div>
      </div>
      <div className={classes.button} onClick={e => setShowWindowPortal(true)}>
        <StatisticsIcon />
        <div className={classes.title}>{t('광고주 통계')}</div>
      </div>
      <div className={classes.button} onClick={e => console.log('사이트 이동')}>
        <HomeIcon />
        <div className={classes.title}>{t('사이트 이동')}</div>
      </div>

      {/* App.js 로 빼야할지 고민 다른탭 이동하면 사라지므로 */}
      {showWindowPortal && (
        <MyWindowPortal
          url="/report/daily/par?mcode=cherish&uri=/report/daily/par"
          handleUnmount={handlePortalClose}
          windowFeatures="width=1000,height=800"
        />
      )}
    </div>
  );
};

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
  SITE_NAME: {
    makeBody: rowObj => {
      return (
        <div
          style={{ width: 'inherit', display: 'flex', alignItems: 'center' }}
        >
          <BasicPopover
            target={
              <IconButton style={{ padding: 8 }}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    fontSize: '17px',
                  }}
                />
              </IconButton>
            }
            placement="bottom-start"
          >
            <SiteButtonList data={rowObj} />
          </BasicPopover>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={rowObj.SITE_NAME}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              {rowObj.SITE_NAME}
            </span>
          </div>
        </div>
      );
    },
  },
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
let initParam = {};
class IssueStatistics extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      layoutList: new Map(),
      list: {},
      // 공통 필터에서 초기값 받아왔는지 확인
      getInitParam: false,
      params: { ...initParam },
      selectedManagerIndex: 0,
    };
  }

  getData = () => {
    const { params } = this.state;

    this.setState({
      ...this.state,
      loading: true,
      list: {},
    });

    issueReport({
      gubun: 11,
      ...params,
    }).then(response => {
      const {
        ADVRTS_AMT = { data: [] },
        BDGT = { data: [] },
        NEW_ADVER = { data: [] },
        ROAS = { data: [] },
        STOP_ADVER = { data: [] },
      } = response.data.data;

      this.setState({
        ...this.state,
        loading: false,
        list: {
          ADVRTS_AMT: ADVRTS_AMT.data,
          BDGT: BDGT.data,
          NEW_ADVER: NEW_ADVER.data,
          ROAS: ROAS.data,
          STOP_ADVER: STOP_ADVER.data,
        },
      });
    });
  };

  componentDidMount() {
    getCustom({
      layoutName: 'layout',
    }).then(response => {
      const { data } = response.data;
      const result = new Map();
      // Map 으로 변경 및 데이터 가공
      // 테이블 나오는 순서대로 이슈설정 리스트에 넣어줌
      for (let i = 0; i < tableOrder.length; i++) {
        const curData = tableOrder[i];
        const { key } = curData;
        result.set(key, {
          ...curData,
          id: curData.key,
          displayFlag: data[key].display,
        });
      }

      this.setState({
        ...this.state,
        layoutList: result,
      });
      this.getData();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { params: prevParams } = prevState;
    const { params, loading } = this.state;

    if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
      initialization = false;
      if (!loading) {
        this.getData();
      }
    }
  }

  /**
   * 필터 초기화
   */
  handleOnReset = () => {
    initialization = true;

    this.setState({
      ...this.state,
      params: { ...initParam },
      selectedManagerIndex: 0,
    });
  };

  /**
   * 영업 담당자 필터 선택
   * @param {string} name
   * @param {*} value
   */
  handleFilterChange = (name, index, value) => {
    this.setState({
      ...this.state,
      params: {
        ...this.state.params,
        contact: value,
      },
      selectedManagerIndex: index,
    });
  };

  getParam = newParams => {
    const { getInitParam } = this.state;
    initialization = false;
    if (getInitParam === false) {
      initParam = {
        ...initParam,
        ...newParams,
      };
    }

    this.setState({
      ...this.state,
      getInitParam: true,
      params: {
        ...this.state.params,
        ...newParams,
      },
    });
  };

  handleSaveTableSet = customList => {
    const param = [];
    for (let item of customList.values()) {
      const { id, displayFlag } = item;

      if (displayFlag) {
        param.push(id);
      }
    }

    setCustom({ values: param.join(','), type: 'layout' })
      .then(response => {})
      .catch(error => console.log(error));

    this.setState({
      ...this.state,
      layoutList: customList,
    });
  };

  handleSearch = value => {
    this.setState({
      ...this.state,
      params: {
        ...this.state.params,
        keyword: value,
      },
    });
  };

  render() {
    const {
      handleOnReset,
      handleFilterChange,
      getParam,
      handleSaveTableSet,
      handleSearch,
    } = this;
    const { t, classes } = this.props;
    const {
      loading,
      layoutList,
      list,
      getInitParam,
      selectedManagerIndex,
    } = this.state;

    return (
      <>
        {/* <div style={{ display: 'none' }}>
          <Statistics url="/report/daily/par" />
        </div> */}
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
          <EnhancedTableWrap
            columnSetButton={
              <SetUpList
                list={layoutList}
                handleSaveCustomSet={handleSaveTableSet}
                title={t('이슈 설정')}
                popoverTitle={t('나만의 기본 이슈를 설정해보세요.')}
                popoverNotice={t('설정 이후 선택한 이슈만 노출됩니다.')}
                saveButtonTitle={t('내 이슈로 설정')}
                icon={<img alt={t('이슈 설정')} src={issueIcon} />}
              />
            }
            handleSearch={handleSearch}
          >
            <div className={classes.tableRoot}>
              {/**
               * 디스플레이 여부로 테이블 리턴
               */
              layoutList.size !== 0 &&
                (() => {
                  const result = [];

                  for (let i = 0; i < tableOrder.length; i++) {
                    const { key, label } = tableOrder[i];
                    const curData = layoutList.get(key);
                    const tableInfo = tableInfoJson[key];

                    if (curData.displayFlag) {
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
  }
}

export default withTranslation()(withStyles(style)(IssueStatistics));
