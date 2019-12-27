import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import MainTemplate from 'pages/templates/MainTemplate';
import MbTabs from 'components/organisms/MbTabs';

//데이터센터현황
import CookieParamGraph from './CookieParamGraph';
import AudienceUserGraph from './AudienceUserGraph';
import AdidStatusGraph from './AdidStatusGraph';
import AudienceNewGraph from './AudienceNewGraph';

//광고쿠키통계
import CookieStatistics from './CookieStatistics';

//앱모수타겟팅통계
import AppTargetingDailyStatistics from './AppTargetingDailyStatistics';
import AppTargetingMediaStatistics from './AppTargetingMediaStatistics';
import AppTargetingAdverStatistics from './AppTargetingAdverStatistics';

const DataCenter = () => {
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
        name="DataCenterStatus"
        tabMenuList={tabList()}
        tabs={{
          '/report/datacenter/status': {
            tabComponent: (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <div style={{ width: '50%' }}>
                    <CookieParamGraph />
                  </div>
                  <div style={{ width: '50%' }}>
                    <AudienceUserGraph />
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <div style={{ width: '50%' }}>
                    <AdidStatusGraph />
                  </div>
                  <div style={{ width: '50%' }}>
                    <AudienceNewGraph />
                  </div>
                </div>
              </>
            ),
          },
          '/report/datacenter/cookie': {
            tabComponent: (
              <>
                <CookieStatistics />
              </>
            ),
          },
          '/report/datacenter/appTargetingDaily': {
            tabComponent: (
              <>
                <AppTargetingDailyStatistics />
              </>
            ),
          },
          '/report/datacenter/appTargetingMedia': {
            tabComponent: (
              <>
                <AppTargetingMediaStatistics />
              </>
            ),
          },
          '/report/datacenter/appTargetingAdver': {
            tabComponent: (
              <>
                <AppTargetingAdverStatistics />
              </>
            ),
          },
        }}
      ></MbTabs>
    </MainTemplate>
  );
};

export default DataCenter;
