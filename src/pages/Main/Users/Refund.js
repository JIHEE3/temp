import React from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import ModalButton from 'components/atoms/ModalButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const bankDepositStyle = makeStyles(theme => ({
  form: {
    marginTop: 10,
    marginBottom: 150,
    '& > table': {
      width: '100%',
      borderCollapse: 'collapse',
      '& > tbody > tr': {
        '& > th, & > td ': {
          borderBottom: '1px solid #000',
        },
        '& > td': {
          padding: 12,
        },
      },
    },
    '& .SingleDatePicker': {
      width: 150,
      '& .SingleDatePickerInput': {
        border: 0,
        borderRadius: 0,
      },
      '& .DateInput ': {
        width: '100%',
      },
      '& .DateInput_input': {
        padding: '5px 10px 5px',
        border: '1px solid #e8e9ec',
        borderRadius: 4,
        fontSize: 14,
        lineHeight: 'initial',
        boxSizing: 'border-box',
      },
    },
  },
  verticalTop: {
    '& > th': {
      paddingTop: 14,
      verticalAlign: 'top',
    },
    '& > td > div': {
      marginBottom: 10,
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  textField: {
    width: 150,
    maxWidth: 350,
    margin: 0,
    borderColor: '#e8e9ec',
    '& input': {
      padding: '8px 10px 7px',
      fontSize: 15,
    },
    '&.smallInput': {
      width: 150,
    },
  },
  border: {
    border: '1px solid #e8e9ec',
  },
  inlineBox: {
    '& > div': {
      display: 'inline-block',
      marginRight: 10,
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  selectSize: {
    padding: '7.5px 34px 7.5px 14px',
  },
  selectArea: {
    maxWidth: 400,
    '& fieldset': {
      border: 0,
    },
  },
}));

const Refund = () => {
  const classes = bankDepositStyle();
  const { t } = useTranslation();
  return (
    <>
      <form className={classes.form} autoComplete="off" noValidate>
        <table>
          <tbody>
            <tr>
              <th>{t('광고주ID')}</th>
              <td>ID AREA</td>
            </tr>
            <tr>
              <th>{t('예약 일자')}</th>
              <td className={classes.inlineBox}>
                <div>
                  <DatePicker className={'sampleClass'} />
                </div>
              </td>
            </tr>
            <tr className={classes.verticalTop}>
              <th>{t('충전 금액')}</th>
              <td>
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      className={`smallInput ${classes.textField}`}
                      classes={{
                        notchedOutline: classes.border,
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          {t('원')}
                        </InputAdornment>
                      }
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      labelWidth={0}
                    />
                  </FormControl>
                </div>
                <div>
                  <ButtonGroup>
                    <ModalButton
                      buttonText={'33만원'}
                      buttonClickEvent={() => alert('짠')}
                    />
                    <ModalButton buttonText={'55만원'} />
                    <ModalButton buttonText={'110만원'} />
                    <ModalButton buttonText={'165만원'} />
                    <ModalButton buttonText={'220만원'} />
                    <ModalButton buttonText={'초기화'} />
                  </ButtonGroup>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t('입금자명')}</th>
              <td>
                <OutlinedInput
                  variant="outlined"
                  className={classes.textField}
                  classes={{
                    notchedOutline: classes.border,
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

class DatePicker extends React.Component {
  state = {
    focused: false,
    date: moment(),
  };
  render() {
    return (
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={date => this.setState({ date })}
        onFocusChange={({ focused }) => this.setState({ focused })}
        focused={this.state.focused}
        date={this.state.date}
      />
    );
  }
}

export default Refund;
// export default ;
