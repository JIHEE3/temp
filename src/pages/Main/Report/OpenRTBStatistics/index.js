import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import MainTemplate from 'pages/templates/MainTemplate';
import MbTabs from 'components/organisms/MbTabs';

import { displayFilterList } from 'constants/resources/commonCustomize';

import Statistics from './Statistics';
import TargetStatistics from './TargetStatistics';
import MediaStatistics from './MediaStatistics';
import TimeStatistics from './TimeStatistics';

const OpenRTBStatistics = () => {
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
        name="OpenRTBStatistics"
        tabMenuList={tabList()}
        tabs={{
          '/report/openrtb/day': {
            tabComponent: (
              <>
                <Statistics displayFilterList={displayFilterList.openRTB} />
              </>
            ),
          },
            '/report/openrtb/target': {
                tabComponent: (
                    <>
                        <TargetStatistics displayFilterList={displayFilterList.openRTB} />
                    </>
                ),
            },
          '/report/openrtb/time': {
            tabComponent: (
                <>
                  <TimeStatistics displayFilterList={displayFilterList.openRTB} />
                </>
            ),
          },
          '/report/openrtb/media': {
            tabComponent: (
                <>
                  <MediaStatistics displayFilterList={displayFilterList.openRTB} />
                </>
            ),
          },
            '/mobsense/admin/rtb/kakao_banner.php': {},
        }}
      ></MbTabs>
    </MainTemplate>
  );
};

export default OpenRTBStatistics;
