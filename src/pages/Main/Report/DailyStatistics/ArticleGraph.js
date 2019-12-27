import React from 'react';
import i18next from 'i18next';
import queryString from 'query-string';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { dailyParGraph } from 'lib/api/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getFormat, twoDigits, makeGraph } from 'lib/commonLib';
import MbTooltip from 'components/atoms/MbTooltip';
import MbDataState from 'components/atoms/MbDataState';
import OutlinedButton from 'components/atoms/OutlinedButton';
import SwitchingArea from 'components/organisms/SwitchingArea';
import MultiplexChart from 'components/organisms/Chart/MultiplexChart';

const styles = theme => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',

    '& > div': {
      marginTop: '14px',
      marginRight: '18px',
    },
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
  marginR0: {
    marginRight: '0 !important',
  },
  buttonsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  graphWrap: {
    width: '100%',
  },
  // loading: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: '#fff',
  //   zIndex: '10',
  //   opacity: '0.4',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

const graphList = [
  {
    title: i18next.t('지출금액'),
    data: { bar: ['SHOP_CTGR_ADVRTS_AMT', 'ADVRTS_AMT'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { SHOP_CTGR_ADVRTS_AMT: true, ADVRTS_AMT: true },
    },
  },
  {
    title: i18next.t('노출'),
    data: { bar: ['PAR_EPRS_CNT'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { PAR_EPRS_CNT: true },
    },
  },
  {
    title: 'CTR',
    data: { bar: ['CLICK_RATE'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { CLICK_RATE: true, isPercent: true },
    },
    customizeData: {
      CLICK_RATE: {
        tooltipFormat: '0.000',
        isPercent: true,
      },
    },
  },
  {
    title: 'ECPM',
    data: { bar: ['ECPM'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { ECPM: true },
    },
  },
  {
    title: i18next.t('세션ROAS'),
    data: { bar: ['SESSION_ROAS'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { SESSION_ROAS: true, isPercent: true },
    },
    customizeData: {
      SESSION_ROAS: {
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('총ROAS'),
    data: { bar: ['ROAS'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { ROAS: true, isPercent: true },
    },
    customizeData: {
      ROAS: {
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('쇼핑ROAS'),
    data: { bar: ['TRGT_SESSION_ROAS'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { TRGT_SESSION_ROAS: true, isPercent: true },
    },
    customizeData: {
      TRGT_SESSION_ROAS: {
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('지면수'),
    data: { bar: ['PAR_CNT'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { PAR_CNT: true },
    },
  },
  { title: i18next.t('지면수_3000') },
  { title: i18next.t('지면수_500') },
  {
    title: i18next.t('클릭수'),
    data: { bar: ['CLICK_CNT'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { CLICK_CNT: true },
    },
  },
  { title: i18next.t('상위 매체') },
  { title: i18next.t('6개월 분석표') },
  {
    title: i18next.t('개재율/응답률'),
    data: { line: ['ENT_RATE', 'RES_RATE'] },
    customizeData: {
      ENT_RATE: {
        isPercent: true,
      },
      RES_RATE: {
        isPercent: true,
      },
    },
    isPercent: true,
  },
  { title: i18next.t('CW/SR 점유율') },
  {
    title: i18next.t('상품타겟팅 점유율'),
    data: { bar: ['PRDT_TRGT_OCC_RATE'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { PRDT_TRGT_OCC_RATE: true, isPercent: true },
    },
    customizeData: {
      PRDT_TRGT_OCC_RATE: {
        isPercent: true,
      },
    },
  },
  { title: i18next.t('쇼핑카테고리 점유율') },
];

class StatisticsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      infoMessage: '',
      loading: false,
      error: false,
    };
  }

  getData = () => {
    const { params, locale, t, location } = this.props;
    const { uri } = queryString.parse(location.search);

    const { sDate, eDate } = params;
    const format = getFormat(locale);
    this.setState({
      ...this.state,
      loading: true,
      error: false,
      infoMessage: t('까지의 통계 그래프입니다.', {
        date: t('term', {
          startDate: moment(sDate).format(format),
          endDate: moment(eDate).format(format),
        }),
      }),
    });
    dailyParGraph({ ...params, uri })
      .then(response => {
        const { data } = response.data;
        this.setState({
          ...this.state,
          primitiveData: data,
          loading: false,
        });

        this.handleChangeGraph(graphList[0], 0)();
      })
      .catch(error => {
        console.log(error);

        this.setState({
          ...this.state,
          loading: false,
          error: true,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { params: prevParams } = prevProps;
    const { params } = this.props;

    if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
      this.getData();
    }
  }

  /**
   * 새로고침
   */
  handleRefesh = () => {
    this.getData();
  };

  // 월 일 or 일 반환
  makeLabel = onlyDay => originalDate => {
    const { t, theme } = this.props;
    const dateObj = moment(originalDate, 'YYYYMMDD');
    const month = twoDigits(dateObj.month() + 1);
    const date = dateObj.date();
    const day = dateObj.day();
    let color = '';

    if (day === 0) {
      color = theme.palette.common.red;
    } else if (day === 6) {
      color = theme.palette.common.blue;
    }

    return onlyDay ? (
      `${twoDigits(date)}${t('일')}`
    ) : (
      <span style={{ color }}>{`${t(month + '월')} ${twoDigits(date)}${t(
        '일'
      )}`}</span>
    );
  };

  xAxisTick = tickProps => {
    const { theme } = this.props;
    const { x, y, payload } = tickProps;
    const { value } = payload;
    const dateObj = moment(value, 'YYYYMMDD');
    const day = dateObj.day();

    const dayStr = this.makeLabel(true)(value);
    let fill = '';
    //Sunday as 0 and Saturday as 6.
    if (day === 0) {
      fill = theme.palette.common.red;
    } else if (day === 6) {
      fill = theme.palette.common.blue;
    }

    return (
      <text x={x} y={y + 10} fill={fill} textAnchor="middle">
        {dayStr}
      </text>
    );
  };

  /**
   * 버튼 클릭하여 그래프 데이터 변경
   */
  handleChangeGraph = (
    { title, data, yAxisData, customizeData: customize, isPercent = false },
    index
  ) => e => {
    const { primitiveData } = this.state;
    const { classes } = this.props;

    if (typeof data !== 'undefined') {
      const {
        graphData,
        dataKeys,
        customizeData,
        keyLabel,
        stackId,
      } = makeGraph({ data, customize, primitiveData });

      const result = (
        <MultiplexChart
          width="100%"
          xAxisTick={this.xAxisTick}
          makeLabel={this.makeLabel(false)}
          className={`${classes.marginR0} ${classes.graphWrap}`}
          data={graphData}
          dataKeys={dataKeys}
          customizeData={customizeData}
          keyLabel={keyLabel}
          stackId={stackId.length !== 0 ? stackId.join('$') : null}
          yAxisData={yAxisData}
          legend
          title={title}
          isPercent={isPercent}
          key={title}
        />
      );

      this.setState({
        ...this.state,
        curGraphComponent: result,
        selectedIdx: index,
      });
    }
  };

  render() {
    const { handleRefesh, handleChangeGraph } = this;
    const { classes, t } = this.props;
    const {
      infoMessage,
      curGraphComponent,
      selectedIdx,
      primitiveData,
      loading,
      error,
    } = this.state;

    return (
      <SwitchingArea
        title={
          <>
            {t('광고주 데이터 그래프')}{' '}
            <MbTooltip
              title={infoMessage}
              classes={{ tooltip: classes.noMaxWidth }}
              placement="right-start"
            >
              <span>
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
              </span>
            </MbTooltip>
          </>
        }
        handleRefesh={handleRefesh}
      >
        {loading && <MbDataState state="loading" />}
        {error ? (
          <MbDataState state="error" />
        ) : (
          <>
            <div className={classes.buttonsWrap}>
              {graphList.map((item, index) => {
                return (
                  <OutlinedButton
                    key={item.title}
                    onClick={handleChangeGraph(item, index)}
                    selected={selectedIdx === index}
                    disabled={!Boolean(primitiveData)}
                  >
                    {item.title}
                  </OutlinedButton>
                );
              })}
            </div>
            <div className={classes.content}>{curGraphComponent}</div>
          </>
        )}
      </SwitchingArea>
    );
  }
}

export default withRouter(
  withTranslation()(
    connect(
      ({ locale }) => ({
        locale: locale.locale,
      }),
      null
    )(withStyles(styles)(withTheme(StatisticsGraph)))
  )
);
