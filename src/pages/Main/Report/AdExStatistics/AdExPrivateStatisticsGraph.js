import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { adexDayGraph } from 'lib/api/adex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getFormat, twoDigits, makeGraph, getDate } from 'lib/commonLib';
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
    height: '100%',
  },
});

const graphList = (index, adexIds) => {
  let keyStr;
  const graph = [];

  for (let i = 0; i < adexIds.length; i++) {
    const key = Object.keys(adexIds[i])[0];
    const val = adexIds[i][Object.keys(adexIds[i])[0]];
    const yAxisData = { left: {}, right: {} };
    const customizeData = [];
    switch (index) {
      case 0:
        keyStr = key.toUpperCase() + '_ADVRTS_AMT';
        customizeData[keyStr] = { keyLabel: i18next.t('지출금액') };
        break;
      case 1:
        keyStr = key.toUpperCase() + '_PAR_EPRS_CNT';
        customizeData[keyStr] = { keyLabel: i18next.t('노출') };
        break;
      case 2:
        keyStr = key.toUpperCase() + '_EXL_ITL_CTR';
        customizeData[keyStr] = { keyLabel: i18next.t('CTR') };
        break;
      case 3:
        keyStr = key.toUpperCase() + '_EXL_ITL_ECPM';
        customizeData[keyStr] = { keyLabel: i18next.t('ECPM') };
        break;
      default:
        break;
    }

    yAxisData['left'][keyStr] = true;
    const item = {
      data: { bar: [keyStr] },
      title: val,
      yAxisData: yAxisData,
      customizeData: customizeData,
    };
    graph[i] = item;
  }
  return graph;
};

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

  graphButtons = [
    {
      title: i18next.t('지출금액'),
    },
    {
      title: i18next.t('노출'),
    },
    {
      title: i18next.t('CTR'),
    },
    {
      title: i18next.t('ECPM'),
    },
  ];

  getData = () => {
    const { params, locale, t, adexIds } = this.props;
    const sDate = moment().subtract(6, 'month');
    const eDate = moment();
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
    adexDayGraph({
      ...params,
      group: 'month',
      sDate: getDate(sDate),
      eDate: getDate(eDate),
    })
      .then(response => {
        const { data } = response.data;

        this.setState({
          ...this.state,
          primitiveData: data,
          loading: false,
        });

        this.handleChangeGraph(graphList(0, adexIds), 0)();
      })
      .catch(error => {
        console.log(error);
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
  handleChangeGraph = (graphDatas, index) => e => {
    const { primitiveData } = this.state;
    const { classes } = this.props;
    const graphCompnenetResult = [];
    for (let i = 0; i < graphDatas.length; i++) {
      const {
        title,
        data,
        yAxisData,
        customizeData: customize,
        isPercent = false,
      } = graphDatas[i];
      if (typeof data !== 'undefined') {
        const {
          graphData,
          dataKeys,
          customizeData,
          keyLabel,
          stackId,
        } = makeGraph({ data, customize, primitiveData });

        const result = (
          <>
            <div style={{ flex: 'auto', width: '23%' }}>
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
                title={title}
                isPercent={isPercent}
              />
            </div>
          </>
        );

        graphCompnenetResult.push(result);
      }
    }

    this.setState({
      ...this.state,
      curGraphComponent: graphCompnenetResult,
      selectedIdx: index,
    });
  };

  render() {
    const { handleRefesh, handleChangeGraph } = this;
    const { classes, t, adexIds } = this.props;
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
            {t('애드익스별 6개월 그래프')}{' '}
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
              {this.graphButtons.map((item, index) => {
                return (
                  <OutlinedButton
                    key={item.title}
                    onClick={handleChangeGraph(
                      graphList(index, adexIds),
                      index
                    )}
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

export default withTranslation()(
  connect(
    ({ locale }) => ({
      locale: locale.locale,
    }),
    null
  )(withStyles(styles)(withTheme(StatisticsGraph)))
);
