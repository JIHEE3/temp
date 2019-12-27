import React from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import { advertiserMonthData } from 'lib/api/report';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { getDate, getFormat } from 'lib/commonLib';
import MbTooltip from 'components/atoms/MbTooltip';
import MbDataState from 'components/atoms/MbDataState';
import LabelNvalue from 'components/atoms/LabelNvalue';
import SwitchingArea from 'components/organisms/SwitchingArea';
import MultiplexChart from 'components/organisms/Chart/MultiplexChart';
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
});

const initialGraphData = {
  shopY: {
    name: '쇼핑',
    amt: 0,
    cnt: 0,
  },
  shopN: {
    name: '비쇼핑',
    amt: 0,
    cnt: 0,
  },
  '100under': 0,
  '100more': 0,
  '300more': 0,
  '500more': 0,
  '1000more': 0,
  amtTotal: 0,
  cntTotal: 0,
  exAdverCnt: 0,
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
    const now = moment();
    const sDate = moment().subtract(1, 'month');
    const eDate = now.subtract(1, 'days');
    const format = getFormat(locale);

    this.setState({
      ...this.state,
      loading: true,
      error: false,
      infoMessage: t(
        '까지의 기간 중, 광고주별 합계 15만원 이상 지출된 내 광고주 데이터 그래프입니다.',
        {
          date: t('term', {
            startDate: sDate.format(format),
            endDate: eDate.format(format),
          }),
        }
      ),
    });

    advertiserMonthData({
      sDate: getDate(sDate),
      eDate: getDate(eDate),
      conditionKey: 'advrtsAmt',
      conditionVal: 150000,
      Inequality: '01',
    })
      .then(response => {
        const { data } = response.data;
        const { datas, exAdverCnt } = data;

        const sumObj = datas.reduce(
          (acc, cur) => {
            let key = null;
            const curAmt = cur.ADVRTS_AMT;

            if (cur.SHOP_FLAG === 'Y') {
              key = 'shopY';
            } else {
              key = 'shopN';
            }
            acc[key].cnt++;
            acc[key].amt = (
              parseFloat(acc[key].amt) + parseFloat(curAmt)
            ).toFixed(2);

            const intAmt = parseInt(curAmt);

            if (intAmt >= 10000000) {
              // 1000만원 이상
              acc['1000more']++;
            } else if (intAmt >= 5000000) {
              // 500만원 이상
              acc['500more']++;
            } else if (intAmt >= 3000000) {
              // 300만원 이상
              acc['300more']++;
            } else if (intAmt >= 1000000) {
              // 100만원 이상
              acc['100more']++;
            } else if (intAmt < 1000000) {
              // 100만원 미만
              acc['100under']++;
            }

            return acc;
          },
          {
            ...initialGraphData,
            shopY: {
              ...initialGraphData.shopY,
            },
            shopN: {
              ...initialGraphData.shopN,
            },
          }
        );

        sumObj['amtTotal'] = (
          parseFloat(sumObj.shopY.amt) + parseFloat(sumObj.shopN.amt)
        ).toFixed(2);
        sumObj['cntTotal'] = sumObj.shopY.cnt + sumObj.shopN.cnt;
        sumObj['totalSpendCnt'] = datas.length;
        sumObj['exAdverCnt'] = exAdverCnt;

        this.setState({
          ...this.state,
          graphData: sumObj,
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

  render() {
    const { handleRefesh } = this;
    const { classes, t } = this.props;
    const { graphData, infoMessage, loading, error } = this.state;

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
            <div className={classes.subTitle}>
              <LabelNvalue
                label={t('총 광고주수')}
                value={
                  <span className={classes.advertisersCont}>
                    {numeral(graphData.cntTotal).format()}
                  </span>
                }
              />
              <LabelNvalue
                label={t('총 지출금액')}
                value={
                  <span className={classes.spendCont}>
                    {numeral(graphData.amtTotal).format('0,0.00')}
                  </span>
                }
              />
            </div>
            <div className={classes.content}>
              <MultiplexChart
                key={t('쇼핑/비쇼핑 기준 비교')}
                width={364}
                height={200}
                title={t('쇼핑/비쇼핑 기준 비교')}
                isPercent
                barLabel
                data={[
                  {
                    name: t('쇼핑'),
                    cnt: (
                      (graphData.shopY.cnt / graphData.cntTotal) *
                      100
                    ).toFixed(2),
                    vanilla_cnt: graphData.shopY.cnt,
                    amt: (
                      (graphData.shopY.amt / graphData.amtTotal) *
                      100
                    ).toFixed(2),
                    vanilla_amt: graphData.shopY.amt,
                  },
                  {
                    name: t('비쇼핑'),
                    cnt: (
                      (graphData.shopN.cnt / graphData.cntTotal) *
                      100
                    ).toFixed(2),
                    vanilla_cnt: graphData.shopN.cnt,
                    amt: (
                      (graphData.shopN.amt / graphData.amtTotal) *
                      100
                    ).toFixed(2),
                    vanilla_amt: graphData.shopN.amt,
                  },
                ]}
                dataKeys={{ bar: ['cnt', 'amt'] }}
                customizeData={{ amt: { tooltipFormat: '0,0.00' } }}
                keyLabel={{
                  cnt: t('광고주수'),
                  amt: t('지출'),
                }}
                legend
              />
              <MultiplexChart
                key={t('지출 금액별 광고주수')}
                width={364}
                height={200}
                title={t('지출 금액별 광고주수')}
                isPercent
                barLabel
                data={[
                  {
                    name: t('100 미만'),
                    value: (
                      (graphData['100under'] / graphData.totalSpendCnt) *
                      100
                    ).toFixed(2),
                    vanilla_value: graphData['100under'],
                  },
                  {
                    name: t('100 이상'),
                    value: (
                      (graphData['100more'] / graphData.totalSpendCnt) *
                      100
                    ).toFixed(2),
                    vanilla_value: graphData['100more'],
                  },
                  {
                    name: t('300 이상'),
                    value: (
                      (graphData['300more'] / graphData.totalSpendCnt) *
                      100
                    ).toFixed(2),
                    vanilla_value: graphData['300more'],
                  },
                  {
                    name: t('500 이상'),
                    value: (
                      (graphData['500more'] / graphData.totalSpendCnt) *
                      100
                    ).toFixed(2),
                    vanilla_value: graphData['500more'],
                  },
                  {
                    name: t('1000 이상'),
                    value: (
                      (graphData['1000more'] / graphData.totalSpendCnt) *
                      100
                    ).toFixed(2),
                    vanilla_value: graphData['1000more'],
                  },
                ]}
                dataKeys={{ bar: ['value'] }}
                variousColoredCells
                legendData={<div>{t('만원')}</div>}
              />
              <CustomActiveShapePieChart
                width={350}
                height={200}
                title={t('신규 광고주수 증가율')}
                data={[
                  {
                    name: t('신규 광고주'),
                    value: graphData.totalSpendCnt - graphData.exAdverCnt,
                  },
                  { name: t('기존 광고주'), value: graphData.exAdverCnt },
                ]}
                total={graphData.totalSpendCnt}
                label={<div>{t('최근 30일 기준')}</div>}
                cxSubtractVal={90}
                cySubtractVal={20}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                legend
              />
            </div>
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
  )(withStyles(styles)(StatisticsGraph))
);
