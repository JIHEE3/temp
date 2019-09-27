import React, { useState, useEffect } from 'react';
import EnhancedTable from 'components/molecules/table/EnhancedTable';
import AdminTemplate from 'pages/templates/AdminTemplate';
import * as adAPI from 'lib/api/advertiser';
import { reportHeaders } from 'lib/api/common';

import MultipleChart from 'components/organisms/Chart/MultiplexChart';

let headCells = [];

const TableTestPage2 = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 마운팅 됐을 때
    // get table headers
    reportHeaders('/report/adver')
      .then(response => {
        const { data } = response.data;
        // 해더 셋팅
        headCells = data.map(head => {
          const { id, label, orderFlag, type } = head;
          return {
            id,
            label,
            orderFlag,
            numeric: type === 'int' || type === 'float' ? true : false
          };
        });
        headCells.pop();
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    // get datas
    adAPI
      .advertiserStatistics({
        sDate: 20190925,
        eDate: 20190925,
        order: 'advrtsAmt',
        sort: 'DESC',
        page
      })
      .then(response => {
        const { data } = response.data;
        setData(data);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <AdminTemplate>
      <div>전략관리</div>
      <MultipleChart />
      <EnhancedTable
        rows={data}
        error={error}
        loading={loading}
        headCells={headCells}
        hasCheckbox={false}
      />
    </AdminTemplate>
  );
};

export default TableTestPage2;
