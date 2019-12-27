import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import MainTemplate from 'pages/templates/MainTemplate';
import MbTabs from 'components/organisms/MbTabs';

import Statistics from './Statistics';
import Targeting from './Targeting';

const DailyStatistics = () => {
  let { path } = useRouteMatch();
  const { menu } = useSelector(({ menu }) => ({
    menu: menu.list === null ? new Map() : menu.list,
  }));

  const tabList = () => {
    for (let curMenu of menu.values()) {
      if (typeof curMenu.subMenu !== 'undefined') {
        const cur = curMenu.subMenu.get(path);
        if (typeof cur !== 'undefined') {
          // 현재 2dapth url에 매칭되는 것이 있으면 그 메뉴의 하위 tab 반환
          return cur.subMenu;
        }
      }
    }
  };

  return (
    <MainTemplate>
      <MbTabs
        name="AdvertiserStatistics"
        tabMenuList={tabList()}
        tabs={{
          '/report/daily/par': {
            tabComponent: (
              <>
                <Statistics />
              </>
            ),
          },
          '/report/daily/targeting': {
            tabComponent: (
              <>
                <Targeting />
              </>
            ),
          },
        }}
      ></MbTabs>
    </MainTemplate>
  );
};

export default DailyStatistics;
