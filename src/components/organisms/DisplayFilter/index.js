import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';

import FilterListIndex from './FilterListIndex';

/**
 * 선택된 디스플레이 필터 리스트 반환
 * @param {array} tpCodeArray 선택한 tpCode 배열
 * @param {Map} allProductCodeList
 */
const returnSelectedLabel = (tpCodeArray, allProductCodeList) => {
  const MAX = 5;
  const codeNameArray = [];
  let resultStr = '';

  for (let i = 0; i < tpCodeArray.length; i++) {
    const selectedCode = tpCodeArray[i];
    codeNameArray.push(allProductCodeList.get(selectedCode).label);
  }
  if (codeNameArray.length <= MAX) {
    resultStr = codeNameArray.join(', ');
  } else {
    resultStr = i18next.t('외', {
      list: codeNameArray.slice(0, MAX).join(', '),
      count: codeNameArray.length - MAX,
    });
  }

  return resultStr;
};

const DisplayFilter = ({
  id,
  handleOnClickFilter,
  advrtsPrdtCode,
  displayFilterList,
  params,
  advrtsTpCodeJson,
}) => {
  const { t } = useTranslation();
  const { allProductCodeList, productCodeList } = useSelector(({ common }) => ({
    allProductCodeList: common.allProductCodeList,
    productCodeList: common.productCodeList,
  }));
  const tpCodeArray = Object.keys(advrtsTpCodeJson).sort();

  /**
   * 디스플레이 필터 선택 관련
   */
  const handleOnClick = (advrtsPrdtCode, advrtsTpCode, checked) => {
    // const { params, advrtsTpCodeJson } = this.state;
    const newParams = {
      ...params,
    };
    let newAdvrtsTpCodeJson = {
      ...advrtsTpCodeJson,
    };

    if (newParams['advrtsPrdtCode'] !== advrtsPrdtCode) {
      if (
        !(
          typeof newParams['advrtsPrdtCode'] === 'undefined' &&
          advrtsPrdtCode === null
        )
      ) {
        newAdvrtsTpCodeJson = {};
      }
      if (advrtsPrdtCode === null) {
        // 타게팅별 필터링
        delete newParams['advrtsPrdtCode'];
      } else {
        // 상품별 필터링
        // 다른 상품 선택한 경우
        newParams['advrtsPrdtCode'] = advrtsPrdtCode;
      }
    }

    if (checked) {
      newAdvrtsTpCodeJson[advrtsTpCode] = 1;
    } else {
      delete newAdvrtsTpCodeJson[advrtsTpCode];
    }

    newParams['advrtsTpCode'] = Object.keys(newAdvrtsTpCodeJson).join(',');
    newParams['advrtsTpCode'] =
      newParams['advrtsTpCode'] === '' ? null : newParams['advrtsTpCode'];

    newParams['advrtsPrdtCode'] =
      newParams['advrtsTpCode'] === null ? null : newParams['advrtsPrdtCode'];

    // this.setState({
    //   ...this.state,
    //   params: newParams,
    //   advrtsTpCodeJson: newAdvrtsTpCodeJson,
    // });
    handleOnClickFilter({
      params: newParams,
      advrtsTpCodeJson: newAdvrtsTpCodeJson,
    });
  };

  return (
    <PopoverFilterWrap
      selectedLabel={returnSelectedLabel(tpCodeArray, allProductCodeList)}
      label={
        tpCodeArray.length === 0
          ? t('디스플레이')
          : typeof advrtsPrdtCode === 'undefined' || advrtsPrdtCode === null
          ? ''
          : productCodeList.get(advrtsPrdtCode).label
      }
      filtered={tpCodeArray.length !== 0}
      id={id}
      filterList={
        <FilterListIndex
          name={id}
          handleOnClickFilter={handleOnClick}
          advrtsPrdtCode={advrtsPrdtCode}
          advrtsTpCode={advrtsTpCodeJson}
          displayFilterList={displayFilterList}
        />
      }
      popoverHeight={435}
      createOnOpen
    />
  );
};

export default DisplayFilter;
