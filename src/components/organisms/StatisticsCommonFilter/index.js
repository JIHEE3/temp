import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import moment from 'moment';
import { getDate } from 'lib/commonLib';

// import FilterWrap from 'components/atoms/FilterWrap';
import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';
import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';
import MbRadioGroup from 'components/molecules/MbRadioGroup';
import DisplayFilter from 'components/organisms/DisplayFilter';
import ExternalFilter from 'components/organisms/ExternalFilter';

let sDate = null;
let eDate = null;
let initParam = {};

class StatisticsCommonFilter extends React.Component {
  constructor(props) {
    super(props);

    const {
      t,
      platformCodeList: pCodeList,
      getParam,
      initData = {},
      noneDate,
    } = props;
    const now = moment();

    if (!noneDate) {
      sDate = moment(now.format('YYYY-MM-01'));
      eDate = now;

      if (typeof initData.sDate !== 'undefined') {
        sDate = moment(initData.sDate, 'YYYYMMDD');
      }
      if (typeof initData.eDate !== 'undefined') {
        eDate = moment(initData.eDate, 'YYYYMMDD');
      }

      initParam = {
        sDate: getDate(sDate),
        eDate: getDate(eDate),
      };
    }

    const temp = [].concat(pCodeList);
    temp.unshift({
      label: t('전체'),
      value: '00',
    });
    const platformCodeList = temp;

    getParam(initParam);

    this.state = {
      platformCodeList,
      params: {
        ...initParam,
      },
      advrtsTpCodeJson: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { initialization, getParam } = this.props;
    const { params } = this.state;
    const { params: prevParams } = prevState;

    if (initialization) {
      this.setState({
        ...this.state,
        params: {
          ...initParam,
        },
        advrtsTpCodeJson: {},
      });
    }

    if (params !== prevParams) {
      getParam(params);
    }
  }

  /**
   * 날짜 필터
   */
  handleOnchangeDate = date => {
    const { startDate, endDate } = date;
    if (startDate !== null && endDate !== null) {
      this.setState({
        ...this.state,
        params: {
          ...this.state.params,
          sDate: startDate,
          eDate: endDate,
        },
      });
    }
  };

  /**
   * 유형 구분
   * @param {object} e
   */
  handleOnPlatformCode = e => {
    const { value } = e.target;
    const { params } = this.state;
    const newParams = {
      ...params,
    };

    newParams['pltfomTpCode'] = value;

    this.setState({
      ...this.state,
      params: newParams,
    });
  };

  /**
   * 디스플레이 필터 선택 관련
   */
  handleOnClickDisplayFilter = ({ params, advrtsTpCodeJson }) => {
    this.setState({
      ...this.state,
      params,
      advrtsTpCodeJson,
    });
  };

  /**
   * 외부연동 필터 이벤트
   * @param {string} externalCode
   */
  handleOnExternalChange = externalCode => {
    const { params } = this.state;
    const newParams = {
      ...params,
    };

    newParams['itlTpCode'] = externalCode;

    this.setState({
      ...this.state,
      params: newParams,
    });
  };

  render() {
    const {
      handleOnchangeDate,
      handleOnPlatformCode,
      handleOnClickDisplayFilter,
      handleOnExternalChange,
    } = this;
    const { params, advrtsTpCodeJson, platformCodeList } = this.state;
    const {
      t,
      initialization,
      nonePltfomTpCode,
      noneDate,
      noneExternalFilter,
      displayFilterList,
    } = this.props;
    // 순서대로 유형 구분, 디스플레이 상품별, 디스플레이 유형별
    const { pltfomTpCode = '00', advrtsPrdtCode, itlTpCode } = params;

    return (
      <>
        {/* <FilterWrap handleOnReset={handleOnReset}> */}
        {!noneDate && (
          <DateRangePicker
            initialization={initialization}
            startDateId="startDate"
            endDateId="endDate"
            handleOnChange={handleOnchangeDate}
            initialStartDate={sDate}
            initialEndDate={eDate}
            label={t('날짜')}
            filtered
          />
        )}
        {!nonePltfomTpCode && (
          <PopoverFilterWrap
            selectedLabel={t(
              pltfomTpCode === '00'
                ? '전체'
                : pltfomTpCode === '01'
                ? '온라인'
                : '모바일'
            )}
            label={t('유형 구분')}
            filtered={pltfomTpCode !== '00'}
            id="mb-daily-statistics-classification-popper"
            filterList={
              <MbRadioGroup
                selectedValue={pltfomTpCode}
                radioList={platformCodeList}
                onChange={handleOnPlatformCode}
                name="classification"
              />
            }
          />
        )}
        <DisplayFilter
          id="mb-daily-statistics-display-popper"
          handleOnClickFilter={handleOnClickDisplayFilter}
          advrtsPrdtCode={advrtsPrdtCode}
          displayFilterList={displayFilterList}
          params={params}
          advrtsTpCodeJson={advrtsTpCodeJson}
        />
        {!noneExternalFilter && (
          <ExternalFilter
            id="mb-daily-statistics-external-popper"
            itlTpCode={itlTpCode}
            handleOnExternalChange={handleOnExternalChange}
          />
        )}
        {/* </FilterWrap> */}
      </>
    );
  }
}

export default withTranslation()(
  connect(
    ({ common }) => ({ platformCodeList: common.platformCodeList }),
    null
  )(StatisticsCommonFilter)
);
