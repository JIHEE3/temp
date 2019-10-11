import React from 'react';
import MainTemplate from 'pages/templates/MainTemplate';
import TableContainer from 'components/molecules/table/EnhancedTableContainer';
import * as adAPI from 'lib/api/advertiser';

const UserList = () => {
  return (
    <MainTemplate>
      <div>사용자 관리</div>
      <TableContainer
        dataReqPromise={adAPI.advertiserStatistics}
        headerUrl="/report/adver"
        params={{
          sDate: 20190925,
          eDate: 20190925,
        }}
        order="desc"
        orderBy="ADVRTS_AMT"
        dense={true}
      />
    </MainTemplate>
  );
};

export default UserList;
