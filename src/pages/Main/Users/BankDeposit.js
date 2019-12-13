import React from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ModalButton from 'components/atoms/ModalButton';

import { getDate } from 'lib/commonLib';

const bankDepositStyle = makeStyles(theme => ({
  form: {
    marginTop: 10,
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
  errorMessage: {
    marginLeft: 0,
    color: '#f00',
  },
}));

const BankDeposit = props => {
  const { userId, date, price, name, payType, changeValue } = props;
  const classes = bankDepositStyle();
  const { t } = useTranslation();

  return (
    <>
      <form className={classes.form} noValidate>
        <table>
          <tbody>
            <tr>
              <th>{t('광고주ID')}</th>
              <td>{userId}</td>
            </tr>
            <tr>
              <th>{t('충전 일자')}</th>
              <td>
                <div>
                  <DatePicker changeValue={changeValue} />
                </div>
                <div></div>
              </td>
            </tr>
            <tr className={classes.verticalTop}>
              <th>{t('충전 금액')}</th>
              <td>
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      name="price"
                      value={price.value}
                      onChange={changeValue('price')}
                      className={`smallInput ${classes.textField}`}
                      classes={{
                        notchedOutline: classes.border,
                      }}
                      error={price.error}
                      endAdornment={
                        <InputAdornment position="end">
                          {t('원')}
                        </InputAdornment>
                      }
                    />
                    {price.error === true ? (
                      <FormHelperText className={classes.errorMessage}>
                        {price.message}
                      </FormHelperText>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                </div>
                <div>
                  <ButtonGroup>
                    <ModalButton
                      buttonText={'33만원'}
                      value="330000"
                      name="price"
                      buttonClickEvent={changeValue('price')}
                    >
                      330000
                    </ModalButton>
                    <ModalButton
                      buttonText={'55만원'}
                      value="550000"
                      name="price"
                      buttonClickEvent={changeValue('price')}
                    />
                    <ModalButton
                      buttonText={'110만원'}
                      value="1100000"
                      name="price"
                      buttonClickEvent={changeValue('price')}
                    />
                    <ModalButton
                      buttonText={'165만원'}
                      value="1650000"
                      name="price"
                      buttonClickEvent={changeValue('price')}
                    />
                    <ModalButton
                      buttonText={'220만원'}
                      value="2200000"
                      name="price"
                      buttonClickEvent={changeValue('price')}
                    />
                    <ModalButton
                      buttonText={'초기화'}
                      value=""
                      name="price"
                      buttonClickEvent={changeValue('price')}
                    />
                  </ButtonGroup>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t('입금자명')}</th>
              <td>
                <FormControl variant="outlined">
                  <OutlinedInput
                    name="name"
                    // value={name}
                    onChange={changeValue('name')}
                    className={`smallInput ${classes.textField}`}
                    classes={{
                      notchedOutline: classes.border,
                    }}
                  />
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>값 확인하기</th>
              <td>
                userId: {userId}
                <br />
                date: {date}
                <br />
                price: {price.value}
                <br />
                name: {name}
                <br />
                payType: {payType}
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

  HANDLE_TEST_FUNCTION = date => {
    const { changeValue } = this.props;

    let clickDate = moment(date.format('YYYY-MM-01'));
    let conversionDate = getDate(clickDate);
    this.setState({ conversionDate });

    console.log(conversionDate);
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
        monthFormat="MMMM YYYY"
      />
    );
  }
}

export default BankDeposit;
// export default ;
