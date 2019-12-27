import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
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
});

const graphList = [
  {
    title: i18next.t('일별'),
    data: { bar: ['SHOP_CTGR_ADVRTS_AMT', 'ADVRTS_AMT'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { SHOP_CTGR_ADVRTS_AMT: true, ADVRTS_AMT: true },
    },
  },
  {
    title: i18next.t('월별'),
    data: { bar: ['PAR_EPRS_CNT'], line: ['ADVER_CNT'] },
    yAxisData: {
      left: { ADVER_CNT: true },
      right: { PAR_EPRS_CNT: true },
    },
  },
];

class BudgetGraph extends React.Component {
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

    // api 호출로 변경 해야함
    // dailyParGraph(params)
    //   .then(response => {
    //     const { data } = response.data;

    //     this.setState({
    //       ...this.state,
    //       primitiveData: data,
    //       loading: false,
    //     });

    //     this.handleChangeGraph(graphList[0], 0)();
    //   })
    //   .catch(error => {
    //     console.log(error);

    // this.setState({
    //   ...this.state,
    //   loading: false,
    //   error: true,
    // });
    //   });
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
            {t('일별/월별 예산 그래프')}{' '}
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
  )(withStyles(styles)(withTheme(BudgetGraph)))
);
