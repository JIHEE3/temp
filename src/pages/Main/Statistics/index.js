import React from 'react';

import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';

import MainTemplate from 'pages/templates/MainTemplate';

const StatisticsContainer = () => {
  return (
    <MainTemplate>
      <span>통계</span>
      <DateRangePicker startDateId="startDate" endDateId="endDate" />
    </MainTemplate>
  );
};

export default StatisticsContainer;
