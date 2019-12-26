import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { getDate } from 'lib/commonLib';

import 'react-dates/lib/css/_datepicker.css';

class DatePicker extends React.Component {
  state = {
    focused: false,
    date: moment(),
  };

  HANDLE_TEST_FUNCTION = date => {
    const { changeValue } = this.props;
    let clickDate = moment(date.format('YYYY-MM-DD'));
    let conversionDate = getDate(clickDate);
    this.setState({ date });
    changeValue('date')(conversionDate);
  };

  render() {
    const { HANDLE_TEST_FUNCTION } = this;

    return (
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={date => HANDLE_TEST_FUNCTION(date)}
        onFocusChange={({ focused }) => this.setState({ focused })}
        focused={this.state.focused}
        date={this.state.date}
        placeholder="날짜를 선택해주세요."
        monthFormat="MMMM YYYY"
      />
    );
  }
}

export default DatePicker;
