import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import { Scrollbars } from 'react-custom-scrollbars';

import OutlinedButton from 'components/atoms/OutlinedButton';

import FilterCheckList from './FilterCheckList';

const displayFliterStyles = makeStyles(theme => ({
  // 커스텀 스크롤바 사용시 꼭 필요한 CSS Start
  customScrollBar: {
    '& > div:first-child': {
      position: 'relative !important',
      maxHeight: 400,
    },
  },
  // 커스텀 스크롤바 사용시 꼭 필요한 CSS End
  buttonWrap: {
    '& > .mb-product-code-button': {
      marginLeft: 8,
      marginBottom: 5,
    },
  },
}));

const ByProduct = ({
  handleOnClickFilter,
  byTargeting = false,
  advrtsPrdtCode,
  advrtsTpCode,
  displayFilterList = false,
}) => {
  const classes = displayFliterStyles();
  const { productCodeList, allProductCodeList } = useSelector(({ common }) => ({
    productCodeList: common.productCodeList,
    allProductCodeList: common.allProductCodeList,
  }));
  const [productCode, setProductCode] = useState(
    productCodeList.keys().next().value
  );

  // useEffect(() => {
  //   if (productCodeList.size !== 0) {
  //     setProductCode(productCodeList.keys().next().value);
  //   }
  // }, [productCodeList]);

  const handleOnChange = code => e => {
    setProductCode(code);
  };

  return (
    <div>
      {/* <Scrollbars className={clsx(classes.customScrollBar)}> */}
      <div className={classes.buttonWrap}>
        {!byTargeting &&
          (() => {
            const result = [];

            for (let data of productCodeList.values()) {
              const { label, value } = data;

              // 페이지별 디스플레이 필터 리스트 셋팅값이 없거나 있으면 세팅된 값만 보여줌
              if (
                displayFilterList === false ||
                typeof displayFilterList.prdCode[value] !== 'undefined'
              ) {
                result.push(
                  <OutlinedButton
                    className="mb-product-code-button"
                    key={label}
                    onClick={handleOnChange(value)}
                    selected={productCode === value}
                    noneBorder
                  >
                    {label}
                  </OutlinedButton>
                );
              }
            }
            return result;
          })()}
      </div>
      {byTargeting ? (
        <FilterCheckList
          list={allProductCodeList.values()}
          handleOnClickFilter={handleOnClickFilter}
          advrtsPrdtCode={advrtsPrdtCode}
          advrtsTpCode={advrtsTpCode}
          displayFilterList={displayFilterList}
        />
      ) : (
        <FilterCheckList
          list={productCodeList.get(productCode).item}
          parentValue={productCode}
          handleOnClickFilter={handleOnClickFilter}
          advrtsPrdtCode={advrtsPrdtCode}
          advrtsTpCode={advrtsTpCode}
          displayFilterList={displayFilterList}
        />
      )}
      {/* </Scrollbars> */}
    </div>
  );
};

export default ByProduct;
