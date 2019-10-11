import React, { useState, useEffect } from 'react';
import EnhancedTable from 'components/molecules/table/EnhancedTable';
import MainTemplate from 'pages/templates/MainTemplate';
import * as adAPI from 'lib/api/advertiser';
import { tableHeaders } from 'lib/api/common';

import MultipleChart from 'components/organisms/Chart/MultiplexChart';
import { fetchHeader, under2camel } from 'lib/commonLib';

let page = 1;
const TableTestPage2 = () => {
  const [headCells, setHeadCells] = useState([]);
  const [list, setList] = useState(null);
  const [error, setError] = useState(false);
  // const [page, setPage] = useState(1);
  const [moreFetching, setMoreFetching] = useState(false);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('ADVRTS_AMT');
  const isLoading = list === null && error !== true;

  useEffect(() => {
    // 마운팅 됐을 때
    fetchHeader(() => tableHeaders('/report/adver')).then(headers =>
      setHeadCells(headers)
    );
  }, []);

  const fetchList = () => {
    // get datas
    adAPI
      .advertiserStatistics({
        sDate: 20190925,
        eDate: 20190925,
        page,
        order: under2camel(orderBy),
        sort: order,
        limit: 100,
      })
      .then(response => {
        const { data } = response.data;
        const orgList = !list || page === 1 ? [] : list;
        setList(orgList.concat(data));
        setError(false);
      })
      .catch(error => {
        console.log(error);
        page -= 1;
        setError(true);
        if (page === 0) {
          setList(null);
        }
      })
      .finally(() => {
        setMoreFetching(false);
      });
  };

  useEffect(fetchList, [order, orderBy]);

  /**
   * 다음 페이지 정보 받아옴
   */
  function fetchData() {
    setMoreFetching(true);
    page += 1;
    fetchList();
  }

  /**
   * odering
   * @param {} event
   * @param {string} property ordering 할 header id
   */
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    page = 1;
    setMoreFetching(true);
  }

  return (
    <MainTemplate>
      <div>전략관리</div>
      <MultipleChart />
      <EnhancedTable
        rows={list}
        error={error}
        loading={isLoading}
        page={page}
        headCells={headCells}
        // hasCheckbox={false}
        hasCheckbox={true}
        dense={true}
        order={order}
        orderBy={orderBy}
        fetchData={fetchData}
        handleRequestSort={handleRequestSort}
        moreFetching={moreFetching}
      />
    </MainTemplate>
  );
};

export default TableTestPage2;
