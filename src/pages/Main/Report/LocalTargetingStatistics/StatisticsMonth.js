import React, { useState, useEffect } from 'react';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from 'components/molecules/MbTable';
import { localMonthReport } from 'lib/api/localreport';
import { getDate } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import StatisticsCommonFilter from 'components/organisms/StatisticsCommonFilter';
import StatisticsMonthGraph from "./StatisticsMonthGraph";

const useStyles = makeStyles(theme => ({
    subContent: {
        color: theme.palette.primary.contrastText,
    },
    subShoppingContent: {
        float: 'right',
        color: theme.palette.table.cell.shoppingContent,
    },
}));

let initialization = false;
let initParam = {
    sDate: getDate(
        moment(
            moment()
                .subtract(13, 'month')
                .format('YYYY-MM-01')
        )
    ),
};
const StatisticsMonth = ({ displayFilterList }) => {
    const classes = useStyles();
    // 공통 필터에서 초기값 받아왔는지 확인
    const [getInitParam, setGetInitParam] = useState(false);
    const [params, setParams] = useState(initParam);

    useEffect(() => {
        // 렌더링 후에 실행됨
        // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
        initialization = false;
    }, [params]);

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
                    <StatisticsMonthGraph params={{ ...params }} />
                    <TableContainer
                        className={classes.root}
                        dataReqPromise={localMonthReport}
                        params={{ ...params }}
                        order="desc"
                        orderBy="STATS_MTM"
                        dense={true}
                        hasExcel
                        hasTotal
                        expandTable
                    />
                </>
            )}
        </>
    );
};

export default StatisticsMonth;