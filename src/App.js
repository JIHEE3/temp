import React, { useEffect } from 'react';
// import './App.css';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/styles';
import { brown } from '@material-ui/core/colors';

import Guides from 'pages/Guides';
import Join from 'pages/Join/Join';
import FindPassword from 'pages/FindPassword';
import RegisterSuccess from 'pages/Join/RegisterSuccess';
import LoginFormContainer from 'pages/Login/LoginForm';
import MainTemplate from 'pages/templates/MainTemplate';
import Users from 'pages/Main/Users';
import ChangeInfo from 'pages/Main/ChangeInfo';
import StatisticsContainer from 'pages/Main/Statistics';

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

import 'styles/globals.scss';

const generateClassName = createGenerateClassName({
  productionPrefix: 'testest',
});

/**
 * 테마 설정하는 부분
 * (https://material-ui.com/customization/default-theme/ 참고)
 */
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif'].join(','),
    fontWeight: 300,
    button: {
      fontWeight: 300,
    },
    body1: {
      fontWeight: 300,
      fontSize: '14px',
    },
  },
  zIndex: {
    popper: 100,
  },
  palette: {
    action: {
      // hover: 'rgba(245, 0, 87, 0.08)'
    },
    background: {
      header: '#181c27',
    },
    common: {
      black: '#4d4f5c',
      red: '#dc5858',
      blue: '#4781cc',
      gray: '#b3bac8',
      gray2: '#b7b8bd',
      gray3: '#9b9ca4',
      gray4: '#f6f6f9',
      gray5: '#b8bfc1',
      selectedGreen: '#eff9e4',
    },
    primary: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
      A100: '#b9f6ca',
      A200: '#69f0ae',
      A400: '#85b74e',
      A700: '#00c853',
      contrastText: 'rgba(0, 0, 0, 0.87)',
      dark: '#388e3c',
      light: '#81c784',
      main: '#85b74e',
      deep: '#79bd2f',
      boxBorder: '#bfe09a',
      boxBG: '#fafdf3',
      inputBG: '#fff',
      error: '#f00',
      defaultTextSize: '.9em',
      menuColor: '#98a2ab',
      checkBox: '#85b74e',
      mainColor: '#85b74e',
      division: '#e5e8eb',
      breadcrumbs: '#8ea0b3',
      breadcrumbsGreaterThan: '#b9c2c9',
      breadcrumbsAccent: '#565b82',
    },
    tab: {
      headerBg: '#f9fafb',
      headerTextColor: '#9b9ca4',
    },
    secondary: brown,
    secondaryColor: '#4ed1bd',
    graph: {
      color: {
        0: '#2fa6fa',
        1: '#4ed1bd',
        2: '#ffd555',
        3: '#bdc2c8',
        4: '#a87fd3',
      },
      groundColor: '#fafdf3',
    },
    table: {
      cell: {
        userId: '#4781cc',
        corpName: '#4781cc',
        point: '#934ba8',
        avgOrderAmt: '#934ba8',
        shoppingContent: '#934ba8',
        usedPoint: '#dc5858',
        advrtsAmt: '#dc5858',
        mobSessionRoas: '#6da72e',
        sessionRoas: '#6da72e',
        directRoas: '#6da72e',
        roas: '#6da72e',
        orderAmt: '#dc5858',
        ecpm: '#6da72e',
        avgAdvrtsAmt: '#dc5858',
        clickCnt: '#000',
        clickRate: '#4781cc',
        parEprsCnt: '#4781cc',
        prdtTrgtOccRate: '#4781cc',
        adverCnt: '#6da72e',
        parCnt: '#6da72e',
        convRate: '#6da72e',
        subEprsContent: '#7F7F7F',
        ivdCnt: '#dc5858',
        ivdRate: '#4781cc',
      },
      headCellBg: '#fcfcff',
      text: '#77787d',
    },
    box: {
      border: '1px solid #e5e8eb',
      secondaryBorderColor: '#e8e9ec',
      radius: '4px',
      labelBg: '#fcfcff',
    },
    text: {
      // primary: '#33691e'
    },
    icon: {
      default: '#8d9ba2',
    },
  },
});

/**
 * 페이지 라우팅
 */
function App(props) {
  // console.dir(theme);
  const { history, location } = props;
  const { user, menu, locale } = useSelector(({ auth, menu, locale }) => ({
    user: auth.user,
    menu: menu.list,
    locale: locale.locale,
  }));

  useEffect(() => {
    if (!!menu) {
      const firstMenukey = menu.keys().next().value;
      const firstMenu = menu.get(firstMenukey);
      let curUrl = firstMenu.menuUrl;

      if (curUrl === null) {
        const firstSubMenukey = firstMenu.subMenu.keys().next().value;
        curUrl = firstMenu.subMenu.get(firstSubMenukey).menuUrl;
      }
      if (location.pathname === '/') {
        // path를 입력하지 않은경우 메뉴의 첫페이지 보여줌
        history.push(curUrl);
      }
    }
  }, [menu, history, location]);

  return (
    <div className={locale}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Switch>
            {/* 퍼블리싱 관리 페이지 */}
            <Route path="/guides" component={Guides} />
            {/* 로그인 */}
            <Route path="/login" component={LoginFormContainer} />
            <Route exact path="/findPassword" component={FindPassword} />
            {/* 가입 */}
            <Route exact path="/join" component={Join} />
            <Route path="/join/:userId" component={RegisterSuccess} />
            {/* 매인 */}
            {user === null ? (
              <Redirect to="/login" />
            ) : (
              <Route exact path="/" component={MainTemplate} />
            )}
            <Route path="/members" component={Users} />
            <Route
              path="/product/translist"
              render={() => <MainTemplate>실시간 광고송출리스트</MainTemplate>}
            />
            <Route path="/product/collection" component={StatisticsContainer} />
            {/* 재형대리 파일 추가 */}
            <Route path="/changeInfo" component={ChangeInfo} />
            {/* ***** 상품 관리 ***** */}
            {/* 실시간 광고 송출 리스트 */}
            <Route path="/RealTimeAdList" component={RealTimeAdList} />
            {/* 상품 정보 수집현황 */}
            <Route
              path="/ProductInfoCollectionStatus"
              component={ProductInfoCollectionStatus}
            />
            {/* 외부 연동 매칭 관리 */}
            <Route path="/product/external" component={ExternalLinkage} />
            {/* 매체 스크립트 관리 */}
            <Route path="/product/mediascript" component={MediaScriptManag} />
            {/* 캠페인 관리 */}
            <Route path="/product/campaign" component={CampaignManag} />
            {/* 카테고리 관리 */}
            <Route path="/product/category" component={CategoryManag} />
            {/* 품절 배치 관리 */}
            <Route
              path="/product/soloutbatch"
              component={OutOfStockPlacement}
            />
            {/* 광고 상품 관리 */}
            <Route path="/product/adver" component={AdProductManag} />
            {/* 맞춤형 배너 */}
            <Route path="/product/custombanner" component={CustomizedBanner} />
            {/* 이미지 검수 새창으로 연결됨 */}
            <Route path="/ImgExamination" component={ImgExamination} />
            {/* 새창 링크 설정 */}
            <Route path="/product/setlink" component={NewPageSeting} />
            {/* ***** 통계 보고서 ***** */}
            <Route path="/report/daily" component={DailyStatistics} />
            {/* 매체 통계 */}
            <Route path="/report/media" component={MediaStatistics} />
            {/* Open RTB 통계 */}
            <Route path="/report/openrtb/day" component={OpenRTBStatistics} />
            {/* 월별 통계 */}
            <Route path="/report/month" component={MonthStatistics} />
            {/* 광고주별통계 */}
            <Route path="/report/adver" component={AdvertiserStatistics} />
            {/* 요청수 통계 */}
            <Route path="/report/request" component={RequestStatistics} />
            {/* 애드익스 통합 */}
            <Route path="/report/adex" component={AdExStatistics} />
            {/* 시간대별 소진 */}
            <Route path="/report/timeamt" component={TimeExhaustion} />
            {/* 시간대별 통계 */}
            <Route path="/report/time" component={TimeStatistics} />
            {/* 타겟팅 보고 */}
            <Route path="/report/targeting" component={Targeting} />
            {/* 매체 종합 현황판 */}
            <Route path="/report/mediaboard" component={MediaTotalStatus} />
            {/* 매체 정산표 */}
            <Route
              path="/report/mediasettle"
              component={MediaSettlementTable}
            />
            {/* 데이터 센터 */}
            <Route path="/report/datacenter" component={DataCenter} />
            {/* 프리퀀시 통계 */}
            <Route path="/report/frequency" component={FrequencyStatistics} />
            {/* 컨버전 통계 */}
            <Route path="/report/conversion" component={ConversionStatistics} />
            {/* 반송률 통계 */}
            <Route path="/report/bounce" component={ReturnStatistics} />
            {/* 지역타겟팅 통계 */}
            <Route path="/report/local" component={LocalTargetingStatistics} />
            {/* 어뷰징 관리 */}
            <Route path="/report/abusing" component={AbusingList} />
            {/* 키워드 센터 */}
            <Route path="/report/keywordcenter" component={KeywordCenter} />
            {/* ***** 매출/정산 ***** */}
            {/* 매출관리 */}
            <Route exact path="/sales" component={RevenueManag} />
            {/* 가상계좌 */}
            <Route path="/sales/virtualaccount" component={VirtualAccount} />
            {/* 정산확인 */}
            <Route path="/sales/check" component={Calculate} />
            {/* ***** RTB ***** */}
            {/* 프레임 RTB 새창으로 연결됨 */}
            <Route path="/FrameRTB" component={FrameRTB} />
            {/* ***** 시스템 관리 ***** */}
            {/* 개발/서버 정보 */}
            <Route path="/system/server" component={DevServerInfo} />
            {/* 권한 관리 */}
            <Route path="/system/auth" component={AuthorityManag} />
            {/* ****************************** */}
            {/* 광고주 통계 */}
            <Route
              path="/AdvertiserStatistics"
              component={AdvertiserStatistics}
            />
            {/* 매체 정산표 */}
            <Route path="/MediaStatistics" component={MediaStatistics} />
            {/* 네이티브 RTB */}
            <Route path="/NativeRTB" component={NativeRTB} />
            {/* ***** 404 페이지 ***** */}
            <Route render={() => <div>못찾음</div>} />
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default withRouter(App);
