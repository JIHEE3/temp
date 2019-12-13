import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { timeAmtGraph } from 'lib/api/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getFormat, makeGraph } from 'lib/commonLib';
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
});

const graphList = [
  {
    title: i18next.t('소진대비 세션ROAS'),
    data: { bar: ['ADVRTS_AMT'], line: ['SESSION_ROAS'] },
    yAxisData: {
      left: { ADVRTS_AMT: true },
      right: { SESSION_ROAS: true, isPercent: true },
    },
  },
  {
    title: i18next.t('소진대비 전환율'),
    data: { bar: ['ADVRTS_AMT'], line: ['CONV_RATE'] },
    yAxisData: {
      left: { ADVRTS_AMT: true },
      right: { CONV_RATE: true, isPercent: true },
    },
  },
  {
    title: i18next.t('노출대비 소진'),
    data: { bar: ['PAR_EPRS_CNT'], line: ['ADVRTS_AMT'] },
    yAxisData: {
      left: { PAR_EPRS_CNT: true },
      right: { ADVRTS_AMT: true },
    },
  },
  {
    title: 'CTR',
    data: { bar: ['CLICK_RATE'] },
    yAxisData: {
      left: { CLICK_RATE: true },
    },
  },
  {
    title: 'ECPM',
    data: { bar: ['ECPM'] },
    yAxisData: {
      left: { ECPM: true },
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
    timeAmtGraph(params)
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

  // 시간 반환
  makeLabel = onlyDay => originalDate => {
    const time = originalDate;

    return onlyDay ? `${time}` : <span>{`${time}`}</span>;
  };

  xAxisTick = tickProps => {
    const { x, y, payload } = tickProps;
    const { value } = payload;
    const timeStr = this.makeLabel(true)(value);

    return (
      <text x={x} y={y + 10} textAnchor="middle">
        {timeStr}
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
            {t('시간대별 그래프')}{' '}
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

export default withTranslation()(
  connect(
    ({ locale }) => ({
      locale: locale.locale,
    }),
    null
  )(withStyles(styles)(withTheme(StatisticsGraph)))
);
