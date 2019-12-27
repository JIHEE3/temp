import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { dailyTargeting } from 'lib/api/time';
import { makeRowColumn, getHeadObj } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import MyWindowPortal from 'components/molecules/WindowPortal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';

import TargetingGraph from './TargetingGraph';

const useStyles = makeStyles(theme => ({
  firstAdvrtsAmt: {
    color: theme.palette.primary.contrastText,
  },
  secondAdvrtsAmt: {
    color: theme.palette.table.cell.adverCnt,
  },
  thirdAdvrtsAmt: {
    color: theme.palette.table.cell.advrtsAmt,
  },
  // fourthAdvrtsAmt: {
  //   color: theme.palette.primary.contrastText,
  // },
  fifthAdvrtsAmt: {
    color: theme.palette.table.cell.parEprsCnt,
  },
  subShoppingContent: {
    float: 'right',
    color: theme.palette.table.cell.shoppingContent,
  },
  icoBox: {
    fontSize: 15,
    float: 'left',
    color: '#4d5059',
    cursor: 'pointer',
    marginRight: 10,
  },
}));

let initialization = false;
let initParam = {};
const Statistics = () => {
  // const { t } = useTranslation();
  const classes = useStyles();

  // 공통 필터에서 초기값 받아왔는지 확인
  const [getInitParam, setGetInitParam] = useState(false);
  const [params, setParams] = useState(initParam);
  const [showWindowPortal, setShowWindowPortal] = useState(false);

  const handlePortalClose = () => {
    setShowWindowPortal('');
  };

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
    // handletest();
  }, [params]);

  // header 및 body 컬럼 커스텀
  const customized = {
    STATS_DTTM: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'STATS_DTTM').label}`;
      },
      makeBody: (rowObj, headsMap) => {
        const statsDttm = getHeadObj(headsMap, 'STATS_DTTM');
        const showWindowUrl =
          '/report/media?sDate=' +
          rowObj['STATS_DTTM'] +
          '&eDate=' +
          rowObj['STATS_DTTM'] +
          '&uri=/report/media&isPop=1';
        return (
          <>
            {makeRowColumn(
              rowObj['STATS_DTTM'],
              statsDttm.type,
              statsDttm.format
            )}
            <div className={classes.icoBox}>
              <FontAwesomeIcon
                icon={faExternalLink}
                onClick={e => setShowWindowPortal(showWindowUrl)}
              />
            </div>
          </>
        );
      },
    },
    KL_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              키워드매칭(KL)
              <br />
              {getHeadObj(headsMap, 'KL_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'KL_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'KL_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'KL_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'KL_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'KL_CLICK_RATE');

        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['KL_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['KL_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['KL_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['KL_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['KL_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
              %
            </div>
          </>
        );
      },
    },
    KL_ECPM: {
      merged: true,
    },
    KL_ADVRTS_AMT: {
      merged: true,
    },
    KL_AVG_ADVRTS_AMT: {
      merged: true,
    },
    KL_CLICK_RATE: {
      merged: true,
    },
    CW_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              헤비쇼퍼매칭(CW)
              <br />
              {getHeadObj(headsMap, 'CW_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'CW_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'CW_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'CW_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'CW_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'CW_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['CW_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['CW_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['CW_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['CW_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['CW_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
              %
            </div>
          </>
        );
      },
    },
    CW_ECPM: {
      merged: true,
    },
    CW_ADVRTS_AMT: {
      merged: true,
    },
    CW_AVG_ADVRTS_AMT: {
      merged: true,
    },
    CW_CLICK_RATE: {
      merged: true,
    },

    SR_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return (
          <>
            본상품매칭(SR)
            <br />
            {getHeadObj(headsMap, 'RM_PAR_EPRS_CNT').label}
          </>
        );
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'SR_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'SR_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'SR_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'SR_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'SR_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['SR_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SR_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SR_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SR_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['SR_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    SR_ECPM: {
      merged: true,
    },
    SR_ADVRTS_AMT: {
      merged: true,
    },
    SR_AVG_ADVRTS_AMT: {
      merged: true,
    },
    SR_CLICK_RATE: {
      merged: true,
    },

    RC_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              관심상품매칭(RC)
              <br />
              {getHeadObj(headsMap, 'RC_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'RC_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'RC_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'RC_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'RC_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'RC_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['RC_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['RC_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['RC_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['RC_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['RC_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    RC_ECPM: {
      merged: true,
    },
    RC_ADVRTS_AMT: {
      merged: true,
    },
    RC_AVG_ADVRTS_AMT: {
      merged: true,
    },
    RC_CLICK_RATE: {
      merged: true,
    },

    ST_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              투데이베스트(ST)
              <br />
              {getHeadObj(headsMap, 'ST_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'ST_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'ST_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'ST_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'ST_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'ST_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['ST_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['ST_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['ST_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    ST_ECPM: {
      merged: true,
    },
    ST_ADVRTS_AMT: {
      merged: true,
    },
    ST_AVG_ADVRTS_AMT: {
      merged: true,
    },
    ST_CLICK_RATE: {
      merged: true,
    },

    RM_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              리턴매칭(RM)
              <br />
              {getHeadObj(headsMap, 'RM_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'RM_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'RM_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'RM_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'RM_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'RM_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['RM_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['RM_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['RM_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['RM_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    RM_ECPM: {
      merged: true,
    },
    RM_ADVRTS_AMT: {
      merged: true,
    },
    RM_AVG_ADVRTS_AMT: {
      merged: true,
    },
    RM_CLICK_RATE: {
      merged: true,
    },

    HU_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              헤비유저타게팅(HU)
              <br />
              {getHeadObj(headsMap, 'HU_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'HU_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'HU_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'HU_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'HU_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'HU_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['HU_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['HU_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['HU_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['HU_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    HU_ECPM: {
      merged: true,
    },
    HU_ADVRTS_AMT: {
      merged: true,
    },
    HU_AVG_ADVRTS_AMT: {
      merged: true,
    },
    HU_CLICK_RATE: {
      merged: true,
    },

    UM_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              성향매칭(UM)
              <br />
              {getHeadObj(headsMap, 'UM_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'UM_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'UM_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'UM_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'UM_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'UM_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['UM_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['UM_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['UM_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['UM_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    UM_ECPM: {
      merged: true,
    },
    UM_ADVRTS_AMT: {
      merged: true,
    },
    UM_AVG_ADVRTS_AMT: {
      merged: true,
    },
    UM_CLICK_RATE: {
      merged: true,
    },

    AD_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              베이스(AD)
              <br />
              {getHeadObj(headsMap, 'AD_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'AD_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'AD_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'AD_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'AD_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'AD_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AD_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AD_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AD_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['AD_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    AD_ECPM: {
      merged: true,
    },
    AD_ADVRTS_AMT: {
      merged: true,
    },
    AD_AVG_ADVRTS_AMT: {
      merged: true,
    },
    AD_CLICK_RATE: {
      merged: true,
    },

    GG_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              소셜링크
              <br />
              (구글검색(GG))
              {getHeadObj(headsMap, 'GG_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'GG_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'GG_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'GG_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'GG_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'GG_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['GG_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['GG_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['GG_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['GG_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    GG_ECPM: {
      merged: true,
    },
    GG_ADVRTS_AMT: {
      merged: true,
    },
    GG_AVG_ADVRTS_AMT: {
      merged: true,
    },
    GG_CLICK_RATE: {
      merged: true,
    },

    GS_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              소셜링크
              <br />
              (구글 쇼핑(GS))
              {getHeadObj(headsMap, 'GS_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'GS_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'GS_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'GS_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'GS_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'GS_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['GS_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['GS_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['GS_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['GS_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    GS_ECPM: {
      merged: true,
    },
    GS_ADVRTS_AMT: {
      merged: true,
    },
    GS_AVG_ADVRTS_AMT: {
      merged: true,
    },
    GS_CLICK_RATE: {
      merged: true,
    },

    MM_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              문맥광고(MM)
              <br />
              {getHeadObj(headsMap, 'MM_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'MM_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'MM_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'MM_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'MM_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'MM_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['MM_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['MM_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['MM_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['MM_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    MM_ECPM: {
      merged: true,
    },
    MM_ADVRTS_AMT: {
      merged: true,
    },
    MM_AVG_ADVRTS_AMT: {
      merged: true,
    },
    MM_CLICK_RATE: {
      merged: true,
    },

    IB_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              검색광고(IB)
              <br />
              {getHeadObj(headsMap, 'IB_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'IB_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'IB_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'IB_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'IB_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'IB_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['IB_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['IB_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['IB_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['IB_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    IB_ECPM: {
      merged: true,
    },
    IB_ADVRTS_AMT: {
      merged: true,
    },
    IB_AVG_ADVRTS_AMT: {
      merged: true,
    },
    IB_CLICK_RATE: {
      merged: true,
    },

    KM_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              키워드매칭(KM)
              <br />
              {getHeadObj(headsMap, 'KM_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'KM_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'KM_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'KM_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'KM_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'KM_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['ST_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['KM_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['KM_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['KM_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['KM_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    KM_ECPM: {
      merged: true,
    },
    KM_ADVRTS_AMT: {
      merged: true,
    },
    KM_AVG_ADVRTS_AMT: {
      merged: true,
    },
    KM_CLICK_RATE: {
      merged: true,
    },

    PR_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              프로모션타게팅(PR)
              <br />
              {getHeadObj(headsMap, 'PR_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'PR_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'PR_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'PR_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'PR_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'PR_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['PR_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['PR_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['PR_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['PR_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['PR_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    PR_ECPM: {
      merged: true,
    },
    PR_ADVRTS_AMT: {
      merged: true,
    },
    PR_AVG_ADVRTS_AMT: {
      merged: true,
    },
    PR_CLICK_RATE: {
      merged: true,
    },

    CM_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              카테고리매칭(CM)
              <br />
              {getHeadObj(headsMap, 'CM_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'CM_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'CM_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'CM_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'CM_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'CM_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['CM_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['CM_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['CM_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['CM_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['CM_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    CM_ECPM: {
      merged: true,
    },
    CM_ADVRTS_AMT: {
      merged: true,
    },
    CM_AVG_ADVRTS_AMT: {
      merged: true,
    },
    CM_CLICK_RATE: {
      merged: true,
    },

    PB_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              테마배너(PB)
              <br />
              {getHeadObj(headsMap, 'PB_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'PB_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'PB_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'PB_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'PB_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'PB_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['PB_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['PB_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['PB_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['PB_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['PB_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    PB_ECPM: {
      merged: true,
    },
    PB_ADVRTS_AMT: {
      merged: true,
    },
    PB_AVG_ADVRTS_AMT: {
      merged: true,
    },
    PB_CLICK_RATE: {
      merged: true,
    },

    SA_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              브랜드박스(SA)
              <br />
              {getHeadObj(headsMap, 'SA_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'SA_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'SA_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'SA_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'SA_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'SA_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['SA_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SA_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SA_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SA_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['SA_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    SA_ECPM: {
      merged: true,
    },
    SA_ADVRTS_AMT: {
      merged: true,
    },
    SA_AVG_ADVRTS_AMT: {
      merged: true,
    },
    SA_CLICK_RATE: {
      merged: true,
    },

    SJ_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              스타샵(SJ)
              <br />
              {getHeadObj(headsMap, 'SJ_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'SJ_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'SJ_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'SJ_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'SJ_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'SJ_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['SJ_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SJ_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SJ_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['SJ_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['SJ_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    SJ_ECPM: {
      merged: true,
    },
    SJ_ADVRTS_AMT: {
      merged: true,
    },
    SJ_AVG_ADVRTS_AMT: {
      merged: true,
    },
    SJ_CLICK_RATE: {
      merged: true,
    },

    AU_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              오디언스(AU)
              <br />
              {getHeadObj(headsMap, 'AU_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'AU_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'AU_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'AU_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'AU_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'AU_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['AU_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AU_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AU_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AU_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['AU_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    AU_ECPM: {
      merged: true,
    },
    AU_ADVRTS_AMT: {
      merged: true,
    },
    AU_AVG_ADVRTS_AMT: {
      merged: true,
    },
    AU_CLICK_RATE: {
      merged: true,
    },

    AT_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              앱프로파일(AT)
              <br />
              {getHeadObj(headsMap, 'AT_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'AT_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'AT_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'AT_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'AT_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'AT_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['AT_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AT_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AT_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['AT_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['AT_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    AT_ECPM: {
      merged: true,
    },
    AT_ADVRTS_AMT: {
      merged: true,
    },
    AT_AVG_ADVRTS_AMT: {
      merged: true,
    },
    AT_CLICK_RATE: {
      merged: true,
    },

    IK_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              유입키워드(IK)
              <br />
              {getHeadObj(headsMap, 'IK_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'IK_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'IK_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'IK_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'IK_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'IK_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['IK_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['IK_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['IK_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['IK_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['IK_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    IK_ECPM: {
      merged: true,
    },
    IK_ADVRTS_AMT: {
      merged: true,
    },
    IK_AVG_ADVRTS_AMT: {
      merged: true,
    },
    IK_CLICK_RATE: {
      merged: true,
    },

    MK_PAR_EPRS_CNT: {
      makeHead: headsMap => {
        return {
          content: (
            <>
              핵심키워드(MK)
              <br />
              {getHeadObj(headsMap, 'MK_PAR_EPRS_CNT').label}
            </>
          ),
          orderFlag: true,
        };
      },
      makeBody: (rowObj, headsMap) => {
        const firstAdvrtsAmt = getHeadObj(headsMap, 'MK_PAR_EPRS_CNT');
        const secondAdvrtsAmt = getHeadObj(headsMap, 'MK_ECPM');
        const thirdAdvrtsAmt = getHeadObj(headsMap, 'MK_ADVRTS_AMT');
        const fourthAdvrtsAmt = getHeadObj(headsMap, 'MK_AVG_ADVRTS_AMT');
        const fifthAdvrtsAmt = getHeadObj(headsMap, 'MK_CLICK_RATE');
        return (
          <>
            <div className={classes.firstAdvrtsAmt}>
              {makeRowColumn(
                rowObj['MK_PAR_EPRS_CNT'],
                firstAdvrtsAmt.type,
                firstAdvrtsAmt.format
              )}
            </div>
            <div className={classes.secondAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['MK_ECPM'],
                secondAdvrtsAmt.type,
                secondAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.thirdAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['MK_ADVRTS_AMT'],
                thirdAdvrtsAmt.type,
                thirdAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fourthAdvrtsAmt}>
              (
              {makeRowColumn(
                rowObj['MK_AVG_ADVRTS_AMT'],
                fourthAdvrtsAmt.type,
                fourthAdvrtsAmt.format
              )}
              )
            </div>
            <div className={classes.fifthAdvrtsAmt}>
              {makeRowColumn(
                rowObj['MK_CLICK_RATE'],
                fifthAdvrtsAmt.type,
                fifthAdvrtsAmt.format
              )}
            </div>
          </>
        );
      },
    },
    MK_ECPM: {
      merged: true,
    },
    MK_ADVRTS_AMT: {
      merged: true,
    },
    MK_AVG_ADVRTS_AMT: {
      merged: true,
    },
    MK_CLICK_RATE: {
      merged: true,
    },
  };

  const childColumnSet = {
    STATS_DTTM: () => {
      return null;
    },
  };

  /**
   * 테이블 클릭 후 세부정보 받아올때 보낼 param setting 해주는 함수
   * @param {json} data 테이블 로우 데이터
   */
  const makeSubParam = data => {
    return {
      statsDttm: data.STATS_DTTM,
    };
  };

  /**
   * 필터 초기화
   */
  const handleOnReset = () => {
    initialization = true;
    setParams(initParam);
  };

  const getParam = newParams => {
    if (getInitParam === false) {
      initParam = {
        ...initParam,
        ...newParams,
      };
    }
    setGetInitParam(true);

    setParams({
      ...params,
      ...newParams,
    });
  };

  return (
    <>
      <FilterWrap handleOnReset={handleOnReset}>
        <StatisticsCommonFilter
          initialization={initialization}
          getParam={getParam}
        />
      </FilterWrap>
      {getInitParam && (
        <>
          <TargetingGraph params={{ ...params }} />
          <TableContainer
            className={classes.root}
            dataReqPromise={dailyTargeting}
            params={{ ...params }}
            order="desc"
            orderBy="STATS_DTTM"
            dense={true}
            customized={customized}
            hasExcel
            expandTable
            makeSubParam={makeSubParam}
            childColumnSet={childColumnSet}
          />
        </>
      )}

      {showWindowPortal && (
        //sudo App.js 로 빼야할지 고민 다른탭 이동하면 사라지므로
        <>
          <MyWindowPortal
            url={showWindowPortal}
            handleUnmount={handlePortalClose}
            windowFeatures="width=1500,height=700"
          />
        </>
      )}
    </>
  );
};

export default Statistics;
