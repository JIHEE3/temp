import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import { getDate } from 'lib/commonLib';
import DateRangePickerWrapper from './PresetDateRangePicker';
import LabelFilterWrap from 'components/molecules/LabelFilterWrap';

const styles = theme => ({
  pickerRoot: {
    padding: '0 5px',
    '.en &': {
      minWidth: '240px',
    },
  },
});

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
  }

  render() {
    const {
      classes,
      startDateId,
      endDateId,
      handleOnChange,
      locale,
      label,
      filtered,
      initialStartDate,
      initialEndDate,
      ...rest
    } = this.props;
    const { focusedInput } = this.state;
    const DateRangePic = (
      <DateRangePickerWrapper
        isOutsideRange={date => {
          const now = new moment();
          if (date.format('YYYYMMDD') > now.format('YYYYMMDD')) {
            return true;
          } else {
            return false;
          }
        }}
        customArrowIcon={<span>~</span>}
        displayFormat={
          locale === 'ko' ? 'MMM DD일' : moment.localeData().longDateFormat('L')
        }
        startDateId={startDateId}
        endDateId={endDateId}
        initialStartDate={initialStartDate}
        initialEndDate={initialEndDate}
        focusedInput={focusedInput}
        {...rest}
        onDatesChange={({ startDate, endDate }) => {
          if (startDate !== null && endDate !== null) {
            handleOnChange({
              startDate: getDate(startDate),
              endDate: getDate(endDate),
            });
          }
        }}
        // onFocusChange={focusedInput => {
        //   this.setState({ focusedInput });
        // }}
      />
    );

    return (
      <div className="mb-DateRangePicker">
        {!!label ? (
          <LabelFilterWrap
            className={classes.pickerRoot}
            label={label}
            filtered
          >
            {DateRangePic}
          </LabelFilterWrap>
        ) : (
          { DateRangePic }
        )}
      </div>
    );
  }
}

export default connect(
  ({ locale }) => ({
    locale: locale.locale,
  }),
  null
)(withStyles(styles)(DateRangePicker));
