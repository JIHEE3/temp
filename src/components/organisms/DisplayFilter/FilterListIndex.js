import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MbTabs from 'components/organisms/MbTabs';

import ByProduct from './ByProduct';

const displayFliterStyles = makeStyles(theme => ({
  root: {
    maxWidth: 617,
    padding: '0 25px',
  },
}));

const makeTabMenuList = () => {
  const result = new Map();
  result.set('byProduct', {
    menuUrl: 'byProduct',
    menuSeq: 'byProduct',
    menuNm: '상품별',
  });
  result.set('byTargeting', {
    menuUrl: 'byTargeting',
    menuSeq: 'byTargeting',
    menuNm: '타게팅별',
  });
  return result;
};

const FilterListIndex = ({
  name,
  handleOnClickFilter,
  advrtsPrdtCode,
  advrtsTpCode,
  displayFilterList,
}) => {
  const classes = displayFliterStyles();

  return (
    <div className={classes.root}>
      <MbTabs
        name={name}
        initValue="byProduct"
        tabMenuList={makeTabMenuList()}
        changeUrl={false}
        tabs={{
          byProduct: {
            tabComponent: (
              <ByProduct
                handleOnClickFilter={handleOnClickFilter}
                advrtsPrdtCode={advrtsPrdtCode}
                advrtsTpCode={advrtsTpCode}
                displayFilterList={displayFilterList}
              />
            ),
          },
          byTargeting: {
            tabComponent: (
              <ByProduct
                handleOnClickFilter={handleOnClickFilter}
                byTargeting
                advrtsPrdtCode={advrtsPrdtCode}
                advrtsTpCode={advrtsTpCode}
                displayFilterList={displayFilterList}
              />
            ),
          },
        }}
        isModal={false}
        popoverTab
      />
    </div>
  );
};

export default FilterListIndex;
