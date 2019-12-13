import React from 'react';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { requestGraph } from 'lib/api/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getDate, getFormat, twoDigits } from 'lib/commonLib';
import MbTooltip from 'components/atoms/MbTooltip';
import MbDataState from 'components/atoms/MbDataState';

import SwitchingArea from 'components/organisms/SwitchingArea';
import MultiplexChart from 'components/organisms/Chart/MultiplexChart';

const styles = theme => ({
  subTitle: {
    display: 'flex',
    height: '20px',
    '& > :not(:first-child)': {
      marginLeft: '30px',
    },
  },
  advertisersCont: {
    color: '#2fa6fa',
    fontWeight: 500,
  },
  spendCont: {
    color: '#4ed1bd',
    fontWeight: 500,
  },
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
    data: { bar: ['REQ_CNT'], line: ['ENT_RATE'] },
    yAxisData: {
      left: { REQ_CNT: true },
      right: { ENT_RATE: true, isPercent: true },
    },
    customizeData: {
      ENT_RATE: {
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
      infoMessage: '',
      loading: false,
    };
  }

  getData = (initSDate, initEDate) => {
    const { params, locale, t } = this.props;
    // const sDate = moment(moment().format('YYYY-MM-01'));
    // const eDate = moment().subtract(1, 'days');
    const format = getFormat(locale);

    if (initSDate !== undefined && initEDate !== undefined) {
      params['sDate'] = getDate(initSDate);
      params['eDate'] = getDate(initEDate);
    }

    const { sDate, eDate } = params;

    this.setState({
      ...this.state,
      loading: true,
      infoMessage: t('까지의 통계 그래프입니다.', {
        date: t('term', {
          startDate: moment(sDate).format(format),
          endDate: moment(eDate).format(format),
        }),
      }),
    });
    requestGraph(params)
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
      });
  };

  componentDidMount() {
    this.getData(
      moment(moment().format('YYYY-MM-01')),
      moment().subtract(1, 'days')
    );
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
    const { handleRefesh } = this;
    const { classes, t } = this.props;
    const { infoMessage, curGraphComponent, loading } = this.state;

    return (
      <SwitchingArea
        title={
          <>
            {t('요청수 데이터 그래프')}{' '}
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
        <div className={classes.content}>{curGraphComponent}</div>
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
