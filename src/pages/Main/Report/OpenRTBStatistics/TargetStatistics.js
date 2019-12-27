import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { openrtbTargetStatistics } from 'lib/api/openrtb';
import { makeRowColumn, getHeadObj } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import TargetStatisticsGraph from './TargetStatisticsGraph';

const useStyles = makeStyles(theme => ({
    root: {
        // 테이블 th, td 커스텀 css
        '& .mb-corpName': {
            width: '130px',
        },
        '& td.mb-corpName .mb-corpName-text': {
            color: theme.palette.secondary.main,
            fontWeight: 600,
        },
    },
}));

let initialization = false;
let initParam = {};
const TargetStatistics = ({ displayFilterList }) => {
    const classes = useStyles();
    // 공통 필터에서 초기값 받아왔는지 확인
    const [getInitParam, setGetInitParam] = useState(false);
    const [params, setParams] = useState(initParam);

    useEffect(() => {
        // 렌더링 후에 실행됨
        // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
        initialization = false;
    }, [params]);

    const childColumnSet = {
        STATS_DTTM: () => {
            return null;
        },
        ADVER_CNT: () => {
            return null;
        },
    };

    // header 및 body 컬럼 커스텀
    const customized = {
        STATS_DTTM: {
            makeHead: headsMap => {
                return `${getHeadObj(headsMap, 'STATS_DTTM').label}`;
            },
            makeBody: (rowObj, headsMap) => {
                const statsDttm = getHeadObj(headsMap, 'STATS_DTTM');
                let resultComponent;
                resultComponent = (
                    <>
                        {makeRowColumn(
                            rowObj['STATS_DTTM'],
                            statsDttm.type,
                            statsDttm.format
                        )}
                    </>
                );
                return resultComponent;
            },
        },
        PAR_EPRS_CNT: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'PAR_EPRS_CNT').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'PAR_EPRS_CNT');
                return (
                    <>
                        {makeRowColumn(
                            rowObj['PAR_EPRS_CNT'],
                            parEprsCnt.type,
                            parEprsCnt.format
                        )}
                    </>
                );
            },
        },
        CW_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'CW_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'CW_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'CW_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'CW_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'CW_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'CW_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['CW_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['CW_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['CW_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['CW_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['CW_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        CW_PAR_EPRS_CNT: { merged: true },
        CW_ECPM: { merged: true, },
        CW_ADVRTS_AMT: { merged: true, },
        CW_AVG_ADVRTS_AMT: { merged: true, },
        CW_CLICK_RATE: { merged: true, },
        SR_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'SR_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'SR_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'SR_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'SR_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'SR_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'SR_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['SR_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['SR_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['SR_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['SR_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['SR_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        SR_PAR_EPRS_CNT: { merged: true },
        SR_ECPM: { merged: true, },
        SR_ADVRTS_AMT: { merged: true, },
        SR_AVG_ADVRTS_AMT: { merged: true, },
        SR_CLICK_RATE: { merged: true, },
        RC_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'RC_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'RC_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'RC_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'RC_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'RC_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'RC_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['RC_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['RC_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['RC_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['RC_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['RC_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        RC_PAR_EPRS_CNT: { merged: true },
        RC_ECPM: { merged: true, },
        RC_ADVRTS_AMT: { merged: true, },
        RC_AVG_ADVRTS_AMT: { merged: true, },
        RC_CLICK_RATE: { merged: true, },
        SP_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'SP_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'SP_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'SP_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'SP_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'SP_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'SP_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['SP_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['SP_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['SP_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['SP_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['SP_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        SP_PAR_EPRS_CNT: { merged: true },
        SP_ECPM: { merged: true, },
        SP_ADVRTS_AMT: { merged: true, },
        SP_AVG_ADVRTS_AMT: { merged: true, },
        SP_CLICK_RATE: { merged: true, },
        HU_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'HU_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'HU_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'HU_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'HU_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'HU_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'HU_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['HU_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['HU_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['HU_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['HU_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['HU_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        HU_PAR_EPRS_CNT: { merged: true },
        HU_ECPM: { merged: true, },
        HU_ADVRTS_AMT: { merged: true, },
        HU_AVG_ADVRTS_AMT: { merged: true, },
        HU_CLICK_RATE: { merged: true, },
        RM_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'RM_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'RM_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'RM_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'RM_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'RM_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'RM_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['RM_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['RM_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['RM_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['RM_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['RM_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        RM_PAR_EPRS_CNT: { merged: true },
        RM_ECPM: { merged: true, },
        RM_ADVRTS_AMT: { merged: true, },
        RM_AVG_ADVRTS_AMT: { merged: true, },
        RM_CLICK_RATE: { merged: true, },
        UM_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'UM_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'UM_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'UM_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'UM_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'UM_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'UM_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['UM_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['UM_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['UM_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['UM_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['UM_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        UM_PAR_EPRS_CNT: { merged: true },
        UM_ECPM: { merged: true, },
        UM_ADVRTS_AMT: { merged: true, },
        UM_AVG_ADVRTS_AMT: { merged: true, },
        UM_CLICK_RATE: { merged: true, },
        MM_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'MM_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'MM_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'MM_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'MM_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'MM_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'MM_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['MM_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['MM_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['MM_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['MM_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['MM_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        MM_PAR_EPRS_CNT: { merged: true, },
        MM_ECPM: { merged: true, },
        MM_ADVRTS_AMT: { merged: true, },
        MM_AVG_ADVRTS_AMT: { merged: true, },
        MM_CLICK_RATE: { merged: true, },
        IB_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'IB_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'IB_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'IB_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'IB_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'IB_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'IB_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['IB_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['IB_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['IB_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['IB_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['IB_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        IB_PAR_EPRS_CNT: { merged: true, },
        IB_ECPM: { merged: true, },
        IB_ADVRTS_AMT: { merged: true, },
        IB_AVG_ADVRTS_AMT: { merged: true, },
        IB_CLICK_RATE: { merged: true, },
        KL_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'KL_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'KL_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'KL_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'KL_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'KL_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'KL_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['KL_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['KL_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['KL_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['KL_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['KL_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        KL_PAR_EPRS_CNT: { merged: true, },
        KL_ECPM: { merged: true, },
        KL_ADVRTS_AMT: { merged: true, },
        KL_AVG_ADVRTS_AMT: { merged: true, },
        KL_CLICK_RATE: { merged: true, },
        IK_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'IK_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'IK_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'IK_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'IK_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'IK_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'IK_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['IK_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['IK_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['IK_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['IK_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['IK_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        IK_PAR_EPRS_CNT: { merged: true, },
        IK_ECPM: { merged: true, },
        IK_ADVRTS_AMT: { merged: true, },
        IK_AVG_ADVRTS_AMT: { merged: true, },
        IK_CLICK_RATE: { merged: true, },
        MK_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'MK_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'MK_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'MK_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'MK_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'MK_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'MK_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['MK_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['MK_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['MK_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['MK_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['MK_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        MK_PAR_EPRS_CNT: { merged: true, },
        MK_ECPM: { merged: true, },
        MK_ADVRTS_AMT: { merged: true, },
        MK_AVG_ADVRTS_AMT: { merged: true, },
        MK_CLICK_RATE: { merged: true, },
        CM_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'CM_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'CM_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'CM_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'CM_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'CM_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'CM_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['CM_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['CM_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['CM_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['CM_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['CM_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        CM_PAR_EPRS_CNT: { merged: true, },
        CM_ECPM: { merged: true, },
        CM_ADVRTS_AMT: { merged: true, },
        CM_AVG_ADVRTS_AMT: { merged: true, },
        CM_CLICK_RATE: { merged: true, },
        MR_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'MR_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'MR_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'MR_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'MR_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'MR_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'MR_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['MR_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['MR_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['MR_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['MR_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['MR_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        MR_PAR_EPRS_CNT:{ merged: true },
        MR_ECPM: { merged: true, },
        MR_ADVRTS_AMT: { merged: true, },
        MR_AVG_ADVRTS_AMT: { merged: true, },
        MR_CLICK_RATE: { merged: true, },

        AU_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'AU_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'AU_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'AU_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'AU_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'AU_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'AU_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['AU_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['AU_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['AU_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['AU_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['AU_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        AU_PAR_EPRS_CNT:{ merged: true },
        AU_ECPM: { merged: true, },
        AU_ADVRTS_AMT: { merged: true, },
        AU_AVG_ADVRTS_AMT: { merged: true, },
        AU_CLICK_RATE: { merged: true, },
        AD_ADVRTS_TP_CODE: {
            makeHead: headsMap => {
                return (
                    <>
                        {getHeadObj(headsMap, 'AD_ADVRTS_TP_CODE').label}
                    </>
                );
            },
            makeBody: (rowObj, headsMap) => {
                const parEprsCnt = getHeadObj(headsMap, 'AD_PAR_EPRS_CNT');
                const ecpm = getHeadObj(headsMap, 'AD_ECPM');
                const advrtsAmt = getHeadObj(headsMap, 'AD_ADVRTS_AMT');
                const avgAdvrtsAmt = getHeadObj(headsMap, 'AD_AVG_ADVRTS_AMT');
                const clickRate = getHeadObj(headsMap, 'AD_CLICK_RATE');
                return (
                    <>
                        {makeRowColumn(rowObj['AD_PAR_EPRS_CNT'], parEprsCnt.type, parEprsCnt.format)}
                        <br />(
                        {makeRowColumn(rowObj['AD_ECPM'], ecpm.type, ecpm.format)})
                        <br />(
                        {makeRowColumn(rowObj['AD_ADVRTS_AMT'], advrtsAmt.type, advrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['AD_AVG_ADVRTS_AMT'], avgAdvrtsAmt.type, avgAdvrtsAmt.format)})
                        <br />(
                        {makeRowColumn(rowObj['AD_CLICK_RATE'], clickRate.type, clickRate.format)})
                    </>
                );
            },
        },
        //합칠 필드는 merge
        AD_PAR_EPRS_CNT:{ merged: true },
        AD_ECPM: { merged: true, },
        AD_ADVRTS_AMT: { merged: true, },
        AD_AVG_ADVRTS_AMT: { merged: true, },
        AD_CLICK_RATE: { merged: true, },
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
                    noneExternalFilter={true}
                    displayFilterList={displayFilterList}
                />
            </FilterWrap>
            {getInitParam && (
                <>
                    <TargetStatisticsGraph params={{ ...params }} />
                    <TableContainer
                        className={classes.root}
                        dataReqPromise={openrtbTargetStatistics}
                        params={{ ...params }}
                        order="desc"
                        orderBy="ADVRTS_AMT"
                        dense={true}
                        customized={customized}
                        hasExcel
                        hasTotal
                        expandTable
                        makeSubParam={makeSubParam}
                        childColumnSet={childColumnSet}
                    />
                </>
            )}
        </>
    );
};

export default TargetStatistics;
