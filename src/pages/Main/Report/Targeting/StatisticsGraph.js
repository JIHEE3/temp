import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { targetGraph } from 'lib/api/targeting';
import { targetingCode } from 'lib/api/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getFormat, makeGraph, twoDigits } from 'lib/commonLib';
import MbTooltip from 'components/atoms/MbTooltip';
import MbDataState from 'components/atoms/MbDataState';
import SwitchingArea from 'components/organisms/SwitchingArea';
import MultiplexChart from 'components/organisms/Chart/MultiplexChart';
import OutlinedButton from 'components/atoms/OutlinedButton';
import CustomActiveShapePieChart from 'components/organisms/Chart/CustomActiveShapePieChart';

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
  noMaxWidth: {
    maxWidth: 'none',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',

    '& > div': {
      marginTop: '14px',
      marginRight: '18px',
    },
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

const initialCircleData = {
  ADVER_CNT: {
    data: [],
    total: [],
  },
  ADVRTS_AMT: {
    data: [],
    total: [],
  },
  CLICK_CNT: {
    data: [],
    total: [],
  },
};

const graphList = [];
const graphButtonList = [
  {
    keyName: 'ADVRTS_AMT',
    title: i18next.t('지출금액'),
    data: { bar: ['ADVRTS_AMT'] },
    isPercent: false,
  },
  {
    keyName: 'PAR_EPRS_CNT',
    title: i18next.t('노출'),
    data: { bar: ['PAR_EPRS_CNT'] },
    isPercent: false,
  },
  {
    keyName: 'CLICK_RATE',
    title: 'CTR',
    data: { bar: ['CLICK_RATE'] },
    isPercent: true,
  },
  {
    keyName: 'SESSION_ROAS',
    title: 'SESSION_ROAS',
    data: { bar: ['SESSION_ROAS'] },
    isPercent: true,
  },
  {
    keyName: 'ECPM',
    title: 'ECPM',
    data: { bar: ['ECPM'] },
    isPercent: false,
  },
];

//노출 될 그래프의 타겟팅코드들
let displayTpCodes = [];

const initialBarData = {};

class StatisticsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circleDatas: initialCircleData,
      primitiveData: initialBarData,
      curGraphComponent: [],
      infoMessage: '',
      loading: false,
      error: false,
    };
  }

  /**
   * 버튼 클릭하여 그래프 데이터 변경
   */
  handleChangeGraph = index => e => {
    const { primitiveData } = this.state;
    const { classes } = this.props;
    const colName = graphButtonList[index].keyName;
    const customize = graphButtonList[index].customize;
    const isPercent = graphButtonList[index].isPercent;
    const curGraphComponent = [];

    if (typeof graphList !== 'undefined') {
      curGraphComponent.push(
        displayTpCodes.map((tpCode, tpIndex) => {
          let colKey = tpCode.label + '_' + colName;
          let data = graphList[tpIndex][index][colName].data;
          let title = tpCode.value;
          let tempYAxis = [];
          tempYAxis[colKey] = true;
          let yAxisData = {
            left: tempYAxis,
            right: {},
          };

          const { graphData, dataKeys, customizeData } = makeGraph({
            data,
            customize,
            primitiveData,
          });

          let keyLabel = [];
          keyLabel[colKey] = tpCode.label + ' ' + graphButtonList[index].title;
          return (
            <>
              <MultiplexChart
                width="100%"
                xAxisTick={this.xAxisTick}
                makeLabel={this.makeLabel(false)}
                className={`${classes.marginR0} ${classes.graphWrap}`}
                data={graphData}
                dataKeys={dataKeys}
                customizeData={customizeData}
                keyLabel={keyLabel}
                stackId={null}
                yAxisData={yAxisData}
                title={title}
                isPercent={isPercent}
              />
            </>
          );
        })
      );

      this.setState({
        ...this.state,
        curGraphComponent: curGraphComponent,
        selectedIdx: index,
      });
    }
  };

  getData = () => {
    const { locale, t, params } = this.props;
    const { sDate, eDate } = params;
    const format = getFormat(locale);

    this.setState({
      ...this.state,
      loading: true,
      error: false,
      infoMessage: t('까지의 기간 중, 각 타겟팅별 합계 그래프입니다.', {
        date: t('term', {
          startDate: moment(sDate).format(format),
          endDate: moment(eDate).format(format),
        }),
      }),
    });

    targetGraph(params)
      .then(response => {
        const { data } = response.data;
        const { barDatas, circleDatas } = data;

        this.setState({
          ...this.state,
          primitiveData: barDatas,
          circleDatas: circleDatas,
          loading: false,
        });

        this.handleChangeGraph(0)();
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

  getTpCode = () => {
    const { t } = this.props;

    targetingCode().then(response => {
      const tpCodes = response.data.data;

      const codeInfos = tpCodes.map((code, tpIndex) => {
        graphList[tpIndex] = graphButtonList.map((item, key) => {
          let yAxisLeft = [];
          let yAxisKey = code.CODE_VAL + '_' + item.keyName;
          yAxisLeft[yAxisKey] = true;
          let bar = [yAxisKey];
          let returnItem = [];
          returnItem[item.keyName] = {
            title: t(code.CODE_DESC),
            data: { bar: bar },
            yAxisData: {
              left: yAxisLeft,
              right: {},
            },
          };
          return returnItem;
        });

        return {
          label: code.CODE_VAL,
          value: code.CODE_DESC,
        };
      });
      this.getData();

      displayTpCodes = codeInfos;
    });
  };

  componentDidMount() {
    this.getTpCode();
  }

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
   * 새로고침
   */
  handleRefesh = () => {
    this.getTpCode();
  };

  render() {
    const { handleRefesh, handleChangeGraph } = this;
    const { classes, t } = this.props;
    const {
      curGraphComponent,
      circleDatas,
      infoMessage,
      loading,
      selectedIdx,
      primitiveData,
      error,
    } = this.state;

    return (
      <>
        <SwitchingArea
          title={
            <>
              {t('타겟팅별 합계 그래프')}{' '}
              <MbTooltip
                title={infoMessage}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="right-start"
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
              </MbTooltip>
            </>
          }
          handleRefesh={handleRefesh}
        >
          {
            <>
              <div className={classes.content}>
                <CustomActiveShapePieChart
                  width={450}
                  height={300}
                  title={t('광고주수')}
                  data={circleDatas.ADVER_CNT.data}
                  total={circleDatas.ADVER_CNT.total}
                  cxSubtractVal={20}
                  cySubtractVal={20}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                />
                <CustomActiveShapePieChart
                  width={450}
                  height={300}
                  title={t('지출금액')}
                  data={circleDatas.ADVRTS_AMT.data}
                  total={circleDatas.ADVRTS_AMT.total}
                  cxSubtractVal={20}
                  cySubtractVal={20}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                />
                <CustomActiveShapePieChart
                  width={450}
                  height={300}
                  title={t('클릭수')}
                  data={circleDatas.CLICK_CNT.data}
                  total={circleDatas.CLICK_CNT.total}
                  cxSubtractVal={20}
                  cySubtractVal={20}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                />
              </div>
            </>
          }
        </SwitchingArea>
        <SwitchingArea
          title={
            <>
              {t('타겟팅별 통계 그래프')}{' '}
              <MbTooltip
                title={infoMessage}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="right-start"
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#c5c6d0" />
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
                {graphButtonList.map((item, index) => {
                  return (
                    <OutlinedButton
                      key={item.title}
                      onClick={handleChangeGraph(index)}
                      selected={selectedIdx === index}
                      disabled={!Boolean(primitiveData)}
                    >
                      {item.title}
                    </OutlinedButton>
                  );
                })}
              </div>

              <div className={classes.content}>
                {curGraphComponent.map((item, index) => {
                  return item;
                })}
              </div>
            </>
          )}
        </SwitchingArea>
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
