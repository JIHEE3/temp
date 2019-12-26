import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { cookieParamGraph } from 'lib/api/datacenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getDate, getFormat, twoDigits, makeGraph } from 'lib/commonLib';
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
    data: {
      bar: ['ACC_CW', 'ACC_SR', 'ACC_UM', 'ACC_HU'],
      line: ['NEW_CW', 'NEW_SR', 'NEW_UM', 'NEW_HU'],
    },
    yAxisData: {
      left: { NEW_CW: true, NEW_SR: true, NEW_UM: true, NEW_HU: true },
      right: { ACC_CW: true, ACC_SR: true, ACC_UM: true, ACC_HU: true },
    },
    customizeData: {
      NEW_CW: {
        keyLabel: i18next.t('장바구니 신규'),
      },
      NEW_SR: {
        keyLabel: i18next.t('본상품 신규'),
      },
      NEW_UM: {
        keyLabel: i18next.t('리턴매칭 신규'),
      },
      NEW_HU: {
        keyLabel: i18next.t('헤비유저 신규'),
      },
      ACC_CW: {
        keyLabel: i18next.t('장바구니 누적'),
      },
      ACC_SR: {
        keyLabel: i18next.t('본상품 누적'),
      },
      ACC_UM: {
        keyLabel: i18next.t('리턴매칭 누적'),
      },
      ACC_HU: {
        keyLabel: i18next.t('헤비유저 누적'),
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
      error: false,
    };
  }

  getData = () => {
    const { locale, t } = this.props;
    const sDate = moment().add(-1, 'month');
    const eDate = moment().add(-1, 'day');

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
    cookieParamGraph({ sDate: getDate(sDate), eDate: getDate(eDate) })
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
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={-8}
          dy={16}
          fill={fill}
          textAnchor="end"
          transform="rotate(-55)"
        >
          {dayStr}
        </text>
      </g>
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
          height={320}
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
    const { infoMessage, curGraphComponent, loading, error } = this.state;

    return (
      <SwitchingArea
        title={
          <>
            {t('쿠키 모수 현황')}{' '}
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
