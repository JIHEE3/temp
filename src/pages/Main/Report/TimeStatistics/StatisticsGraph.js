import React from 'react';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { timeGraph } from 'lib/api/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getFormat, makeGraph } from 'lib/commonLib';
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
});

const graphList = [
  {
    data: { bar: ['ADVRTS_AMT'], line: ['SESSION_ROAS', 'ROAS', 'CONV_RATE'] },
    yAxisData: {
      left: { ADVRTS_AMT: true },
      right: {
        SESSION_ROAS: { isPercent: true },
        ROAS: { isPercent: true },
        CONV_RATE: { isPercent: true },
        individually: true,
      },
    },
    customizeData: {
      SESSION_ROAS: {
        isPercent: true,
      },
      CONV_RATE: {
        tooltipFormat: '0.00',
        isPercent: true,
      },
      ROAS: {
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
    };
  }

  getData = type => {
    const { params, locale, t } = this.props;
    const { sDate, eDate } = params;
    const format = getFormat(locale);
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
    timeGraph({
      ...params,
      type: type,
    })
      .then(response => {
        const { data } = response.data;

        this.setState({
          ...this.state,
          loading: false,
        });
        for (let weekType in data) {
          if (weekType === 'max') continue;
          for (let pltfomTpCode in data[weekType]) {
            const primitiveData = data[weekType][pltfomTpCode];

            this.setGraphData(
              graphList[0],
              pltfomTpCode,
              weekType,
              primitiveData,
              data['max']
            );
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    const { graphType } = this.props;

    this.getData(graphType);
  }

  componentDidUpdate(prevProps) {
    const { params: prevParams } = prevProps;
    const { params } = this.props;

    if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
      const { graphType } = this.props;
      this.getData(graphType);
    }
  }

  /**
   * 새로고침
   */
  handleRefesh = () => {
    const { graphType } = this.props;
    this.getData(graphType);
  };

  // 시간 반환
  makeLabel = onlyDay => originalDate => {
    const time = originalDate;

    return onlyDay ? `${time}` : <span>{`${time}`}</span>;
  };

  makeSwitchLabel = type => {
    const { t } = this.props;
    let label = '';
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    switch (type) {
      case 'weekday':
        label = '평일';
        break;
      case 'weekend':
        label = '주말';
        break;
      default:
        label = weeks[type] + '요일';
    }

    return t(label);
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

  setGraphData = (
    { title, data, yAxisData, customizeData: customize, isPercent = false },
    pltfomTpCode,
    type,
    primitiveData,
    max
  ) => {
    const { classes } = this.props;

    if (typeof data !== 'undefined') {
      const {
        graphData,
        dataKeys,
        customizeData,
        keyLabel,
        stackId,
      } = makeGraph({ data, customize, primitiveData });

      let title;
      if (pltfomTpCode === '01') title = '온라인';
      else title = '모바일';
      const result = (
        <MultiplexChart
          width="100%"
          xAxisTick={this.xAxisTick}
          makeLabel={this.makeLabel(false)}
          className={classes.marginR0}
          data={graphData}
          dataKeys={dataKeys}
          customizeData={customizeData}
          keyLabel={keyLabel}
          stackId={stackId.length !== 0 ? stackId.join('$') : null}
          yAxisData={yAxisData}
          legend
          title={title}
          isPercent={isPercent}
          maxData={max}
        />
      );
      const { graphComponent } = this.state;

      graphComponent[pltfomTpCode] = {
        ...graphComponent[pltfomTpCode],
        [type]: result,
      };
      this.setState({
        ...this.state,
        graphComponent: graphComponent,
      });
    }
  };

  render() {
    const { handleRefesh } = this;
    const { classes, switchDatas } = this.props;
    const { infoMessage, graphComponent, loading } = this.state;
    let pltfomTpCodes = ['01', '02'];
    return (
      <>
        {loading && <MbDataState state="loading" />}
        {switchDatas.map((type, i) => {
          let switchLabel = this.makeSwitchLabel(type);
          return (
            <React.Fragment key={type}>
              <SwitchingArea
                title={
                  <>
                    {switchLabel}
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
                <div className={classes.content}>
                  {pltfomTpCodes.map(pltfomTpCode => {
                    if (typeof graphComponent[pltfomTpCode] === 'undefined')
                      return null;
                    return (
                      <div
                        style={{ width: '48%' }}
                        key={`${type}_${pltfomTpCode}`}
                      >
                        {typeof graphComponent[pltfomTpCode][type] !==
                        'undefined'
                          ? graphComponent[pltfomTpCode][type]
                          : ''}
                      </div>
                    );
                  })}
                </div>
              </SwitchingArea>
            </React.Fragment>
          );
        })}
      </>
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
