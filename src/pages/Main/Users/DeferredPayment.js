import React from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  errorMessage: {
    marginLeft: 0,
    color: '#f00',
  },
}));

const DeferredPayment = props => {
  const classes = bankDepositStyle();
  const { t } = useTranslation();
  const {
    userId,
    date,
    name,
    payType,
    price,
    week,
    changeValue,
    handleChackBox,
  } = props;

  return (
    <>
      <form className={classes.form} autoComplete="off" noValidate>
        <table>
          <tbody>
            <tr>
              <th>{t('광고주ID')}</th>
              <td>{userId}</td>
            </tr>
            <tr>
              <th>{t('예약 정보')}</th>
              <td className={classes.inlineBox}>
                <div>
                  예약일자:&nbsp;
                  <DatePicker className={'sampleClass'} />
                </div>
                <div>
                  이전 예약 일자:&nbsp;
                  <DatePicker className={'sampleClass'} />
                </div>
              </td>
            </tr>
            <tr>
              <th>{t('충전 요일')}</th>
              <td>
                <div>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.all}
                          name="all"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="all"
                        />
                      }
                      label="모든요일"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.sun}
                          name="sun"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="sun"
                        />
                      }
                      label="일"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.mon}
                          name="mon"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="mon"
                        />
                      }
                      label="월"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.tue}
                          name="tue"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="tue"
                        />
                      }
                      label="화"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.wed}
                          name="wed"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="wed"
                        />
                      }
                      label="수"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.thu}
                          name="thu"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="thu"
                        />
                      }
                      label="목"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.fri}
                          name="fri"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="fri"
                        />
                      }
                      label="금"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={week.sat}
                          name="sat"
                          onChange={changeValue('week')}
                          onClick={handleChackBox}
                          value="sat"
                        />
                      }
                      label="토"
                    />
                  </FormGroup>
                </div>
                <div>
                  <p>
                    * '모든 요일' 항목 체크 시 예약일 이후 매일 입금처리 됩니다.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t('충전 시간')}</th>
              <td>
                <FormControl
                  variant="outlined"
                  classes={{
                    root: classes.selectArea,
                  }}
                >
                  <Select
                    native
                    classes={{
                      select: classes.selectSize,
                      root: classes.border,
                    }}
                  >
                    <option value="" />
                    <option value={10}>
                      1시간 1시간 1시간 1시간 1시간 1시간 1시간 1시간
                    </option>
                    <option value={20}>2시간 2시간 2시간 2시간</option>
                    <option value={30}>3시간 3시간 3시간 3시간</option>
                  </Select>
                </FormControl>
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
              <th>데이터 확인</th>
              <td>
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

export default DeferredPayment;
// export default ;
