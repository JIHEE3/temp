import React from 'react';

import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';
import DateRangesPresets from 'constants/DateRangesPresets';

const StatisticsContainer = () => {
  return (
    <>
      <span>통계</span>
      <DateRangePicker
        startDateId='startDate'
        endDateId='endDate'
        presets={DateRangesPresets}
      />
    </>
  );
};

export default StatisticsContainer;
