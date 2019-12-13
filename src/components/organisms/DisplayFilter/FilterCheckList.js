import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MbCheckList from 'components/molecules/MbCheckList';

const checkListStyles = makeStyles(theme => ({
  contentWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

/**
 * 필터 체크리스트 및 전체 선택 | 초기화, 저장버튼 포함
 */
const FilterCheckList = ({
  list,
  parentValue = null,
  handleOnClickFilter,
  byTargeting = false,
  advrtsPrdtCode = null,
  advrtsTpCode = {},
  displayFilterList = false,
  ...rest
}) => {
  const classes = checkListStyles();

  const handleOnClick = value => {
    let checked = true;
    if (typeof advrtsTpCode[value] !== 'undefined') {
      // 기존에 있던 값이면 빼기
      checked = false;
    }
    handleOnClickFilter(parentValue, value, checked);
  };

  return (
    <div className={classes.contentWrap}>
      {(() => {
        const result = [];
        for (let item of list) {
          const { label, value } = item;

          // 페이지별 디스플레이 필터 리스트 셋팅값이 없거나 있으면 세팅된 값만 보여줌
          if (
            displayFilterList === false ||
            typeof displayFilterList.tpCode[value] !== 'undefined'
          ) {
            result.push(
              <MbCheckList
                key={`${label}_${value}`}
                label={label}
                onClick={() => handleOnClick(value)}
                checked={
                  advrtsPrdtCode === parentValue &&
                  typeof advrtsTpCode[value] !== 'undefined'
                }
                {...rest}
              />
            );
          }
        }
        return result;
      })()}
    </div>
  );
};

export default FilterCheckList;
