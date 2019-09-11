import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
/**
 * 접속 국가별 moment locale import 변경하기
 */
import 'moment/locale/ko';

import DateRangePickerWrapper from './PresetDateRangePicker';

class DateRangepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  render() {
    const { presets, startDateId, endDateId } = this.props;
    const { startDate, endDate, focusedInput } = this.state;

    return (
      <div className='App'>
        <DateRangePickerWrapper
          presets={presets}
          startDateId={startDateId}
          endDateId={endDateId}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          /**
           * 임시
           */
          onDatesChange={({ startDate, endDate }) => {
            this.setState({ startDate, endDate });
          }}
          onFocusChange={focusedInput => {
            this.setState({ focusedInput });
          }}
        />
      </div>
    );
  }
}

export default DateRangepicker;
