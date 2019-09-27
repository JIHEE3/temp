import React, { useState } from 'react';
import EnhancedTable from 'components/molecules/table/EnhancedTable';
import AdminTemplate from 'pages/templates/AdminTemplate';
import * as adAPI from 'lib/api/advertiser';

// import ContentTemplate from 'pages/templates/ContentTemplate';
import { useFetch } from 'lib/commonLib';

// 임시
const headCells = [
  {
    id: 'TOT_EPRS_CNT',
    numeric: true,
    disablePadding: false,
    label: '총 노출수'
  },
  {
    id: 'PAR_EPRS_CNT',
    numeric: true,
    disablePadding: false,
    label: '구좌노출수'
  },
  { id: 'CLICK_CNT', numeric: true, disablePadding: false, label: '클릭수' },
  { id: 'ADVRTS_AMT', numeric: true, disablePadding: false, label: '지출금액' },
  {
    id: 'TRGT_ADVRTS_AMT',
    numeric: true,
    disablePadding: false,
    label: '쇼핑지출금액'
  },
  { id: 'ORDER_CNT', numeric: true, disablePadding: false, label: '전환수' },
  { id: 'ORDER_AMT', numeric: true, disablePadding: false, label: '매출' },
  {
    id: 'DIRECT_ORDER_AMT',
    numeric: true,
    disablePadding: false,
    label: '직접매출'
  },
  {
    id: 'SESSION_ORDER_AMT',
    numeric: true,
    disablePadding: false,
    label: '세션매출'
  },
  {
    id: 'MOB_ORDER_AMT',
    numeric: true,
    disablePadding: false,
    label: '모비온총매출'
  },
  {
    id: 'MOB_DIRECT_ORDER_AMT',
    numeric: true,
    disablePadding: false,
    label: '모비온직접매출'
  },
  {
    id: 'MOB_SESSION_ORDER_AMT',
    numeric: true,
    disablePadding: false,
    label: '모비온세션매출'
  },
  { id: 'CORP_NAME', numeric: false, disablePadding: false, label: '회사명' },
  { id: 'POINT', numeric: true, disablePadding: false, label: '잔여포인트' },
  { id: 'KPI', numeric: true, disablePadding: false, label: 'KPI' },
  {
    id: 'ADVER_ID',
    numeric: false,
    disablePadding: false,
    label: '광고주아이디'
  },
  { id: 'CLICK_RATE', numeric: true, disablePadding: false, label: '클릭율' },
  {
    id: 'AVG_ADVRTS_AMT',
    numeric: true,
    disablePadding: false,
    label: '평균지출'
  },
  { id: 'ECPM', numeric: true, disablePadding: false, label: 'ECPM' },
  { id: 'CONV_RATE', numeric: true, disablePadding: false, label: '전환율' },
  { id: 'CONV_AMT', numeric: true, disablePadding: false, label: '전환단가' },
  {
    id: 'AVG_ORDER_AMT',
    numeric: true,
    disablePadding: false,
    label: '평균구매액'
  },
  {
    id: 'SESSION_ROAS',
    numeric: true,
    disablePadding: false,
    label: '세션ROAS'
  },
  {
    id: 'DIRECT_ROAS',
    numeric: true,
    disablePadding: false,
    label: '직접ROAS'
  },
  { id: 'ROAS', numeric: true, disablePadding: false, label: 'ROAS' },
  {
    id: 'MOB_SESSION_ROAS',
    numeric: true,
    disablePadding: false,
    label: 'table_head.MOB_SESSION_ROAS'
  },
  {
    id: 'MOB_DIRECT_ROAS',
    numeric: true,
    disablePadding: false,
    label: 'table_head.MOB_DIRECT_ROAS'
  },
  {
    id: 'MOB_ROAS',
    numeric: true,
    disablePadding: false,
    label: 'table_head.MOB_ROAS'
  }
];

/**
 * data를 서버로 부터 fetch 받는 로직(data, loading 여부, error)을 useEffect를 재사용한 컴포넌트
 */
const TableTestPage3 = () => {
  const [page, setpage] = useState(1);
  const table = useFetch(() =>
    adAPI.advertiserStatistics({ sDate: 20190925, eDate: 20190925, page })
  );

  return (
    <AdminTemplate>
      {/* <ContentTemplate> */}
      <div>api req 테스트 / error , loading 사용해야함</div>
      <EnhancedTable
        rows={table.data !== null ? table.data.data.list : []}
        error={table.error}
        loading={table.isLoading}
        headCells={headCells}
        hasCheckbox={false}
        dense={true}
        // style={{ wordBreak: 'break-all' }}
      />
      {/* </ContentTemplate> */}
    </AdminTemplate>
  );
};

export default TableTestPage3;
