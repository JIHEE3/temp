import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { monthGraph } from 'lib/api/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getFormat, twoDigits } from 'lib/commonLib';
import MbTooltip from 'components/atoms/MbTooltip';
import MbDataState from 'components/atoms/MbDataState';
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
    height: '100%',
  },
});

const graphList = [
  {
    title: i18next.t('확정 총 소진현황'),
    data: { bar: ['ADVRTS_AMT', 'TOT_MEDIA_PYMT_AMT', 'MEDIA_PYMT_AMT'] },
    yAxisData: {
      left: {
        ADVRTS_AMT: true,
        TOT_MEDIA_PYMT_AMT: true,
        MEDIA_PYMT_AMT: true,
      },
      right: {},
    },
  },
  {
    title: i18next.t('확정 총 매체 지급률'),
    data: { bar: ['TOT_MEDIA_PYMT_RATE'] },
    yAxisData: {
      left: {
        TOT_MEDIA_PYMT_RATE: true,
        isPercent: true,
      },
      right: {},
    },
    customizeData: {
      TOT_MEDIA_PYMT_RATE: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('확정 총 신디수수료'),
    data: { bar: ['FEE_AMT'] },
    yAxisData: {
      left: {
        FEE_AMT: true,
      },
      right: {},
    },
  },
  {
    title: i18next.t('월별 순수지급 금액'),
    data: { bar: ['MEDIA_PYMT_AMT'] },
    yAxisData: {
      left: {
        MEDIA_PYMT_AMT: true,
      },
      right: {},
    },
  },
  {
    title: i18next.t('월별 전체 소진'),
    data: { bar: ['ADVRTS_AMT'] },
    yAxisData: {
      left: {
        FEE_AMT: true,
      },
      right: {},
    },
  },
  {
    title: i18next.t('월별 상품타겟팅 소진'),
    data: { bar: ['TRGT_ADVRTS_AMT'] },
    yAxisData: {
      left: {
        TRGT_ADVRTS_AMT: true,
      },
      right: {},
    },
  },
  {
    title: i18next.t('월별 전체 CTR'),
    data: { bar: ['CLICK_RATE'] },
    yAxisData: {
      left: {
        CLICK_RATE: true,
        isPercent: true,
      },
      right: {},
    },
    customizeData: {
      CLICK_RATE: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('월별 전체 ECPM'),
    data: { bar: ['ECPM'] },
    yAxisData: {
      left: {
        ECPM: true,
      },
      right: {},
    },
  },
  {
    title: i18next.t('월별 전체 세션 ROAS'),
    data: { bar: ['SESSION_ROAS'] },
    yAxisData: {
      left: {
        SESSION_ROAS: true,
        isPercent: true,
      },
      right: {},
    },
    customizeData: {
      SESSION_ROAS: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('월별 상품타겟팅 세션 ROAS'),
    data: { bar: ['TRGT_SESSION_ROAS'] },
    yAxisData: {
      left: {
        TRGT_SESSION_ROAS: true,
        isPercent: true,
      },
      right: {},
    },
    customizeData: {
      TRGT_SESSION_ROAS: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('월별 전체 총 ROAS'),
    data: { bar: ['ROAS'] },
    yAxisData: {
      left: {
        ROAS: true,
        isPercent: true,
      },
      right: {},
    },
    customizeData: {
      ROAS: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
    },
  },
  {
    title: i18next.t('월별 상품타겟팅 총 ROAS'),
    data: { bar: ['TRGT_ROAS'] },
    yAxisData: {
      left: {
        TRGT_ROAS: true,
        isPercent: true,
      },
      right: {},
    },
    customizeData: {
      TRGT_ROAS: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
    },
  },
];

class StatisticsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      graphComponent: {},
      infoMessage: '',
      loading: false,
      error: false,
    };
  }

  getData = () => {
    const { params, locale, t } = this.props;
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
    monthGraph(params)
      .then(response => {
        const { data } = response.data;

        this.setState({
          ...this.state,
          primitiveData: data,
          loading: false,
        });

        for (let i = 0; i <= 11; i++) {
          this.setGraphData(graphList[i], i)();
        }
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
    const { t } = this.props;
    const dateObj = moment(originalDate, 'YYYYMMDD');
    const month = twoDigits(dateObj.month() + 1);
    const year = twoDigits(dateObj.year());

    return onlyDay ? (
      `${t(month + '월')}`
    ) : (
      <span>
        {`${t(year + '년')}`}
        {`${t(month + '월')}`}
      </span>
    );
  };

  xAxisTick = tickProps => {
    const { x, y, payload } = tickProps;
    const { value } = payload;

    const dayStr = this.makeLabel(true)(value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-8} dy={16} textAnchor="end" transform="rotate(-55)">
          {dayStr}
        </text>
      </g>
    );
  };

  /**
   * 버튼 클릭하여 그래프 데이터 변경
   */
  setGraphData = (
    { title, data, yAxisData, customizeData: customize, isPercent = false },
    index
  ) => () => {
    const { primitiveData } = this.state;
    const { classes } = this.props;

    if (typeof data !== 'undefined') {
      const { bar, line } = data;
      const dataKeys = {};
      const keyLabel = {};
      const tempGraphData = {};
      const graphData = [];
      let customizeData = {};
      const stackId = [];

      if (typeof bar !== 'undefined') {
        dataKeys['bar'] = bar;
      }

      if (typeof line !== 'undefined') {
        dataKeys['line'] = line;
      }

      if (typeof customize !== 'undefined') {
        customizeData = customize;
      }

      for (let kind in data) {
        if (data.hasOwnProperty(kind)) {
          const keys = data[kind];
          for (let i = 0; i < keys.length; i++) {
            const curKey = keys[i];
            if (kind === 'bar') {
              stackId.push(curKey);
            }

            keyLabel[curKey] = primitiveData[curKey].title;
            tempGraphData[curKey] = primitiveData[curKey].data;
          }
        }
      }

      // graph data 담는 곳
      for (let key in tempGraphData) {
        if (tempGraphData.hasOwnProperty(key)) {
          for (let i = 0; i < tempGraphData[key].length; i++) {
            const curGraphData = tempGraphData[key][i];
            let { name, val } = curGraphData;
            if (
              typeof customize !== 'undefined' &&
              typeof customize[key] !== 'undefined'
            ) {
              if (customize[key].isPercent) {
                val *= 100;
              }
            }

            graphData[i] = {
              ...graphData[i],
              name,
              [key]: val,
            };
          }
        }
      }

      const result = (
        <MultiplexChart
          // width="100%"
          // height="100%"
          width={350}
          height={200}
          xInterval={0}
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
        />
      );

      const { graphComponent } = this.state;
      graphComponent[index] = result;

      this.setState({
        ...this.state,
        graphComponent: graphComponent,
      });
    }
  };

  // const isLoading = this.state.list === null && this.state.error !== true;
  render() {
    const { handleRefesh } = this;
    const { classes, t } = this.props;
    const { infoMessage, graphComponent, loading, error } = this.state;

    const graphIndexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
      <SwitchingArea
        title={
          <>
            {t('월별통계 그래프')}{' '}
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
          <div className={classes.content}>
            {graphIndexs.map(index => {
              if (typeof graphComponent[index] === 'undefined') return null;
              return (
                <div
                  key={index}
                  style={{ flex: 'auto', width: '23%', height: 250 }}
                >
                  {typeof graphComponent[index] !== 'undefined'
                    ? graphComponent[index]
                    : ''}
                </div>
              );
            })}
          </div>
        )}
      </SwitchingArea>
    );
  }
}

export default withTranslation()(
  connect(
    ({ locale }) => ({
      locale: locale.locale,
    }),
    null
  )(withStyles(styles)(withTheme(StatisticsGraph)))
);
