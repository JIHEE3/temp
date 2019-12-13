import React from 'react';
import { withRouter } from 'react-router-dom';
import 'styles/guides.scss';

/**
 *
 * @param {json} param0 match = '/guides'
 */
const GuidesIndex = ({ match }) => {
  const { path } = match;
  return (
    <div id="guide">
      <header className="header">
        <h1>모비온 최고관리자 2.0 페이지 가이드</h1>
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>1Depth</th>
              <th>2Depth</th>
              <th>3Depth</th>
              <th>기타</th>
              <th>페이지 링크</th>
              <th>상태</th>
              <th>작업날짜</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody className="tbodySection">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>상태</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/login`}>로그인</a>
              </td>
              <td className="complete">작업완료</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/join`}>회원가입</a>
              </td>
              <td className="complete">작업완료</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/FindPassword`}>패스워드 찾기</a>
              </td>
              <td className="complete">작업완료</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/main`}>메인페이지</a>
              </td>
              <td className="unwork">작업완료</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/users`}>상품관리 > 사용자 관리</a>
              </td>
              <td className="unwork">작업완료</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/ChangeInfo`}>정보 수정</a>
              </td>
              <td className="unwork">작업완료</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody className="tbodySection ProductManagement">
            <tr>
              <td>상품 관리</td>
              <td>실시간 광고 송출 리스트</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/RealTimeAdList`}>RealTimeAdList</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>상품 정보 수집현황</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/ProductInfoCollectionStatus`}>
                  ProductInfoCollectionStatus
                </a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>외부 연동 매칭 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/ExternalLinkage`}>ExternalLinkage</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>매체 스크립트 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/MediaScriptManag`}>MediaScriptManag</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>캠페인 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/CampaignManag`}>CampaignManag</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>카테고리 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/CategoryManag`}>CategoryManag</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>품절 배치 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/OutOfStockPlacement`}>OutOfStockPlacement</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>광고 상품 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/AdProductManag`}>AdProductManag</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>맞춤형 배너</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/CustomizedBanner`}>CustomizedBanner</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>이미지 검수</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/ImgExamination`}>ImgExamination</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>새창 링크 설정</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/NewPageSeting`}>NewPageSeting</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody className="tbodySection report">
            <tr>
              <td>통계 보고서</td>
              <td>일자별 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/DailyStatistics`}>DailyStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>어뷰징 보고서</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/AbusingList`}>AbusingList</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>애드익스 통합</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/AdExStatistics`}>AdExStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>광고주 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/AdvertiserStatistics`}>
                  AdvertiserStatistics
                </a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>컨버전 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/ConversionStatistics`}>
                  ConversionStatistics
                </a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>데이터 센터</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/DataCenter`}>DataCenter</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>프리퀀시 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/FrequencyStatistics`}>FrequencyStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>키워드 센터</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/KeywordCenter`}>KeywordCenter</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>지역타겟팅 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/LocalTargetingStatistics`}>
                  LocalTargetingStatistics
                </a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>매체 정산표</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/MediaSettlementTable`}>
                  MediaSettlementTable
                </a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>매체 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/MediaStatistics`}>MediaStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>매체 종합 현황판</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/MediaTotalStatus`}>MediaTotalStatus</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>월별 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/MonthStatistics`}>MonthStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>오픈 RTB 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/OpenRTBStatistics`}>OpenRTBStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>요청수 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/RequestStatistics`}>RequestStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>반송률 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/ReturnStatistics`}>ReturnStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>타겟팅 보고</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/Targeting`}>Targeting</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>시간대별 소진</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/TimeExhaustion`}>TimeExhaustion</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>시간대별 통계</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/TimeStatistics`}>TimeStatistics</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody className="tbodySection RTB">
            <tr>
              <td>RTB</td>
              <td>프레임 RTB</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/FrameRTB`}>FrameRTB</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>네이티브 RTB</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/NativeRTB`}>NativeRTB</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody className="tbodySection SalesAndCalculate">
            <tr>
              <td>매출/정산</td>
              <td>매출관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/RevenueManag`}>RevenueManag</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>가상계좌</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/VirtualAccount`}>VirtualAccount</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>정산확인</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/Calculate`}>Calculate</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody className="tbodySection Security">
            <tr>
              <td>보안</td>
              <td>권한 관리</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/AuthorityManag`}>AuthorityManag</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>개발/서버 정보</td>
              <td></td>
              <td></td>
              <td>
                <a href={`${path}/DevServerInfo`}>DevServerInfo</a>
              </td>
              <td className="unwork">미작업</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default withRouter(GuidesIndex);
