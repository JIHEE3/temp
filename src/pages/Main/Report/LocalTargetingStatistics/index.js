import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import MainTemplate from 'pages/templates/MainTemplate';
import MbTabs from 'components/organisms/MbTabs';

import Statistics from "./Statistics";
import StatisticsMonth from "./StatisticsMonth";
import MediaStatistics from "./MediaStatistics";
import TargetStatistics from "./TargetStatistics";
import AdverStatistics from "./AdverStatistics";
import LocalStatistics from "./LocalStatistics";

const LocalTargetingStatistics = () => {
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
              name="LocalStatistics"
              tabMenuList={tabList()}
              tabs={{
                  '/report/local/day': {
                      tabComponent: (
                          <>
                              <Statistics />
                          </>
                      ),
                  },
                  '/report/local/month': {
                      tabComponent: (
                          <>
                              <StatisticsMonth />
                          </>
                      ),
                  },
                  '/report/local/media': {
                      tabComponent: (
                          <>
                              <MediaStatistics />
                          </>
                      ),
                  },
                  '/report/local/target': {
                      tabComponent: (
                          <>
                              <TargetStatistics />
                          </>
                      ),
                  },
                  '/report/local/adver': {
                      tabComponent: (
                          <>
                              <AdverStatistics />
                          </>
                      ),
                  },
                  '/report/local/local': {
                      tabComponent: (
                          <>
                              <LocalStatistics />
                          </>
                      ),
                  },
              }}
          ></MbTabs>
      </MainTemplate>
  );
};

export default LocalTargetingStatistics;
