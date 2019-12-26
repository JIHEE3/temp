import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { audienceUserGraph } from 'lib/api/datacenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getDate, getFormat, twoDigits } from 'lib/commonLib';
import MbTooltip from 'components/atoms/MbTooltip';
import MbDataState from 'components/atoms/MbDataState';
import SwitchingArea from 'components/organisms/SwitchingArea';
import CustomActiveShapePieChart from 'components/organisms/Chart/CustomActiveShapePieChart';

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

const initialGraphData = {
  USER_CNT: {
    data: [],
    total: [],
  },
};

class StatisticsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: initialGraphData,
      infoMessage: '',
      loading: false,
      error: false,
    };
  }

  getData = () => {
    const { locale, t } = this.props;
    const sDate = moment().add(-1, 'day');
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
    audienceUserGraph({ sDate: getDate(sDate), eDate: getDate(eDate) })
      .then(response => {
        const { data } = response.data;
        this.setState({
          ...this.state,
          graphData: data,
          loading: false,
        });
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

  render() {
    const { handleRefesh } = this;
    const { classes, t } = this.props;
    const { infoMessage, graphData, loading, error } = this.state;

    return (
      <SwitchingArea
        title={
          <>
            {t('오디언스 유저수 현황')}{' '}
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
            {typeof graphData !== 'undefined' && (
              <CustomActiveShapePieChart
                width={800}
                height={335}
                data={graphData.USER_CNT.data}
                total={graphData.USER_CNT.total}
                cxSubtractVal={-40}
                cySubtractVal={10}
                innerRadius={100}
                outerRadius={150}
                dataKey="value"
              />
            )}
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
