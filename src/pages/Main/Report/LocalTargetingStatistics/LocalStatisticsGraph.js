import React from 'react';
import queryString from 'query-string';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { localGraph } from 'lib/api/localreport';
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
        data: { line: ['TOT_EPRS_CNT', 'CLICK_CNT'] },
        yAxisData: {
            left: { CLICK_CNT: true },
            right: { TOT_EPRS_CNT: true },
        },
        customizeData: {
            TOT_EPRS_CNT: {
                isPercent: true,
            },
            CLICK_CNT: {
                isPercent: true,
            },
        },
        isPercent: true,
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
        const { params, locale, t, location } = this.props;
        const { uri } = queryString.parse(location.search);

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
        localGraph({ ...params, uri })
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

        return originalDate
    };

    xAxisTick = tickProps => {
        const { x, y, payload } = tickProps;
        const { value } = payload;

        const dayStr = this.makeLabel(true)(value);

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={-8} dy={16} textAnchor="end" transform="rotate(-75)">
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
                    xAxisTick={this.xAxisTick}
                    makeLabel={this.makeLabel(false)}
                    className={`${classes.marginR0} ${classes.graphWrap}`}
                    data={graphData}
                    dataKeys={dataKeys}
                    customizeData={customizeData}
                    keyLabel={keyLabel}
                    stackId={stackId.length !== 0 ? stackId.join('$') : null}
                    yAxisData={yAxisData}
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
        const {
            infoMessage,
            curGraphComponent,
            loading,
            error,
        } = this.state;

        return (
            <SwitchingArea
                title={
                    <>
                        {t('지역타겟팅 데이터 그래프')}{' '}
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
