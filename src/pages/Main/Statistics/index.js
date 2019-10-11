import React from 'react';

import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';
import DateRangesPresets from 'constants/DateRangesPresets';

import MainTemplate from 'pages/templates/MainTemplate';

const StatisticsContainer = () => {
  return (
    <MainTemplate>
      <span>통계</span>
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        presets={DateRangesPresets}
      />
    </MainTemplate>
  );
};

export default StatisticsContainer;
