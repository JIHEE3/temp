import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import GuidesIndex from 'pages/Guides/IndexList';
import LoginForm from 'pages/Login/LoginForm';
import MainTemplate from 'pages/templates/MainTemplate';
import UsersForm from 'pages/Main/Users/UsersForm';

import join from 'pages/Join/Join';
import FindPassword from 'pages/FindPassword/';

import ChangeInfo from 'pages/Main/ChangeInfo';

// 상품 관리
import RealTimeAdList from 'pages/Main/ProductManagement/RealTimeAdList';
import ProductInfoCollectionStatus from 'pages/Main/ProductManagement/ProductInfoCollectionStatus';
import ExternalLinkage from 'pages/Main/ProductManagement/ExternalLinkage';
import MediaScriptManag from 'pages/Main/ProductManagement/MediaScriptManag';
import CampaignManag from 'pages/Main/ProductManagement/CampaignManag';
import CategoryManag from 'pages/Main/ProductManagement/CategoryManag';
import OutOfStockPlacement from 'pages/Main/ProductManagement/OutOfStockPlacement';
import AdProductManag from 'pages/Main/ProductManagement/AdProductManag';
import CustomizedBanner from 'pages/Main/ProductManagement/CustomizedBanner';
import ImgExamination from 'pages/Main/ProductManagement/ImgExamination';
import NewPageSeting from 'pages/Main/ProductManagement/NewPageSeting';

// 통계 보고서
import DailyStatistics from 'pages/Main/Report/DailyStatistics';
import AbusingList from 'pages/Main/Report/AbusingList';
import AdExStatistics from 'pages/Main/Report/AdExStatistics';
import AdvertiserStatistics from 'pages/Main/Report/AdvertiserStatistics';
import ConversionStatistics from 'pages/Main/Report/ConversionStatistics';
import DataCenter from 'pages/Main/Report/DataCenter';
import FrequencyStatistics from 'pages/Main/Report/FrequencyStatistics';
import KeywordCenter from 'pages/Main/Report/KeywordCenter';
import LocalTargetingStatistics from 'pages/Main/Report/LocalTargetingStatistics';
import MediaSettlementTable from 'pages/Main/Report/MediaSettlementTable';
import MediaStatistics from 'pages/Main/Report/MediaStatistics';
import MediaTotalStatus from 'pages/Main/Report/MediaTotalStatus';
import MonthStatistics from 'pages/Main/Report/MonthStatistics';
import OpenRTBStatistics from 'pages/Main/Report/OpenRTBStatistics';
import RequestStatistics from 'pages/Main/Report/RequestStatistics';
import ReturnStatistics from 'pages/Main/Report/ReturnStatistics';
import Targeting from 'pages/Main/Report/Targeting';
import TimeExhaustion from 'pages/Main/Report/TimeExhaustion';
import TimeStatistics from 'pages/Main/Report/TimeStatistics';
// RTB
import FrameRTB from 'pages/Main/RTB/FrameRTB';
import NativeRTB from 'pages/Main/RTB/NativeRTB';
// 매출/정산
import Calculate from 'pages/Main/SalesAndCalculate/Calculate';
import RevenueManag from 'pages/Main/SalesAndCalculate/RevenueManag';
import VirtualAccount from 'pages/Main/SalesAndCalculate/VirtualAccount';
// 보안
import AuthorityManag from 'pages/Main/Security/AuthorityManag';
import DevServerInfo from 'pages/Main/Security/DevServerInfo';

/**
 *
 * @param {json} param0 props: { match: {... path: '/guides'} }
 */
function PageGiudes({ match }) {
  const { path } = match;

  return (
    <>
      <Switch>
        <Route exact path={`${path}`} component={GuidesIndex} />
        <Route path={`${path}/FindPassword`} component={FindPassword} />
        <Route path={`${path}/join`} component={join} />
        <Route path={`${path}/ChangeInfo`} component={ChangeInfo} />
        {/* 로그인 */}
        <Route path={`${path}/login`} component={LoginForm} />
        {/* 메인 */}
        {/* 메인 > 템플릿 */}
        <Route path={`${path}/main`} component={MainTemplate} />
        {/* 사용자 관리 */}
        <Route path={`/member`} component={UsersForm} />

        {/* 상품 관리 */}
        <Route path={`${path}/RealTimeAdList`} component={RealTimeAdList} />
        <Route
          path={`${path}/ProductInfoCollectionStatus`}
          component={ProductInfoCollectionStatus}
        />
        <Route path={`${path}/ExternalLinkage`} component={ExternalLinkage} />
        <Route path={`${path}/MediaScriptManag`} component={MediaScriptManag} />
        <Route path={`${path}/CampaignManag`} component={CampaignManag} />
        <Route path={`${path}/CategoryManag`} component={CategoryManag} />
        <Route
          path={`${path}/OutOfStockPlacement`}
          component={OutOfStockPlacement}
        />
        <Route path={`${path}/AdProductManag`} component={AdProductManag} />
        <Route path={`${path}/CustomizedBanner`} component={CustomizedBanner} />
        <Route path={`${path}/ImgExamination`} component={ImgExamination} />
        <Route path={`${path}/NewPageSeting`} component={NewPageSeting} />

        {/* 통계 보고서 */}
        <Route path={`${path}/DailyStatistics`} component={DailyStatistics} />
        <Route path={`${path}/AbusingList`} component={AbusingList} />
        <Route path={`${path}/AdExStatistics`} component={AdExStatistics} />
        <Route
          path={`${path}/AdvertiserStatistics`}
          component={AdvertiserStatistics}
        />
        <Route
          path={`${path}/ConversionStatistics`}
          component={ConversionStatistics}
        />
        <Route path={`${path}/DataCenter`} component={DataCenter} />
        <Route
          path={`${path}/FrequencyStatistics`}
          component={FrequencyStatistics}
        />
        <Route path={`${path}/KeywordCenter`} component={KeywordCenter} />
        <Route
          path={`${path}/LocalTargetingStatistics`}
          component={LocalTargetingStatistics}
        />
        <Route
          path={`${path}/MediaSettlementTable`}
          component={MediaSettlementTable}
        />
        <Route path={`${path}/MediaStatistics`} component={MediaStatistics} />
        <Route path={`${path}/MediaTotalStatus`} component={MediaTotalStatus} />
        <Route path={`${path}/MonthStatistics`} component={MonthStatistics} />
        <Route
          path={`${path}/OpenRTBStatistics`}
          component={OpenRTBStatistics}
        />
        <Route
          path={`${path}/RequestStatistics`}
          component={RequestStatistics}
        />
        <Route path={`${path}/ReturnStatistics`} component={ReturnStatistics} />
        <Route path={`${path}/Targeting`} component={Targeting} />
        <Route path={`${path}/TimeExhaustion`} component={TimeExhaustion} />
        <Route path={`${path}/TimeStatistics`} component={TimeStatistics} />
        <Route path={`${path}/FrameRTB`} component={FrameRTB} />
        <Route path={`${path}/NativeRTB`} component={NativeRTB} />
        {/* 매출/정산 */}
        <Route path={`${path}/Calculate`} component={Calculate} />
        <Route path={`${path}/RevenueManag`} component={RevenueManag} />
        <Route path={`${path}/VirtualAccount`} component={VirtualAccount} />
        {/* 보안 */}
        <Route path={`${path}/AuthorityManag`} component={AuthorityManag} />
        <Route path={`${path}/DevServerInfo`} component={DevServerInfo} />
      </Switch>
    </>
  );
}

export default withRouter(PageGiudes);
