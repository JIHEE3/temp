import React from 'react';

import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';
import DateRangesPresets from 'constants/DateRangesPresets';

import AdminTemplate from 'pages/templates/AdminTemplate';

const StatisticsContainer = () => {
  return (
    <AdminTemplate>
      <span>통계</span>
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        presets={DateRangesPresets}
      />
    </AdminTemplate>
  );
};

export default StatisticsContainer;
