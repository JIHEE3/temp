import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import MainTemplate from 'pages/templates/MainTemplate';
import MbTabs from 'components/organisms/MbTabs';

import CookieParamGraph from './CookieParamGraph';
import AudienceUserGraph from './AudienceUserGraph';
import AdidStatusGraph from './AdidStatusGraph';
import AudienceNewGraph from './AudienceNewGraph';

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
        }}
      ></MbTabs>
    </MainTemplate>
  );
};

export default DataCenter;
