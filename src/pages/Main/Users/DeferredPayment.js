import React from 'react';

import 'react-dates/initialize';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import ModalButton from 'components/atoms/ModalButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MbCheckbox from 'components/atoms/MbCheckbox';
import DatePicker from 'components/organisms/DatePicker/SingleDate';
import clsx from 'clsx';

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
      marginRight: 10,
      '&:last-child': {
        marginRight: 0,
      },
    },
    '& .error .SingleDatePicker .DateInput_input ': {
      border: '1px solid red',
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
  timeError: {
    '& .timeError': {
      border: '1px solid red',
    },
  },
}));

const DeferredPayment = props => {
  const classes = bankDepositStyle();
  const { t } = useTranslation();
  const {
    userId,
    price,
    priceError,
    timeError,
    dateError,
    weeks,
    changeValue,
  } = props;

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
              <th>{t('예약 일자')}</th>
              <td className={classes.inlineBox}>
                {!dateError.error ? (
                  <div>
                    <DatePicker changeValue={changeValue} />
                  </div>
                ) : (
                  <div className="error">
                    <DatePicker changeValue={changeValue} />
                    {dateError.error === true ? (
                      <FormHelperText className={classes.errorMessage}>
                        {dateError.message}
                      </FormHelperText>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th>{t('충전 요일')}</th>
              <td>
                <div>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.all}
                          name="all"
                          onChange={changeValue('weeks')}
                          value="all"
                          color="#4ed1bd"
                        />
                      }
                      label="모든요일"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.sun}
                          name="sun"
                          onChange={changeValue('weeks')}
                          value="sun"
                          color="#4ed1bd"
                        />
                      }
                      label="일"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.mon}
                          name="mon"
                          onChange={changeValue('weeks')}
                          value="mon"
                          color="#4ed1bd"
                        />
                      }
                      label="월"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.tue}
                          name="tue"
                          onChange={changeValue('weeks')}
                          value="tue"
                          color="#4ed1bd"
                        />
                      }
                      label="화"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.wed}
                          name="wed"
                          onChange={changeValue('weeks')}
                          value="wed"
                          color="#4ed1bd"
                        />
                      }
                      label="수"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.thu}
                          name="thu"
                          onChange={changeValue('weeks')}
                          value="thu"
                          color="#4ed1bd"
                        />
                      }
                      label="목"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.fri}
                          name="fri"
                          onChange={changeValue('weeks')}
                          value="fri"
                          color="#4ed1bd"
                        />
                      }
                      label="금"
                    />
                    <FormControlLabel
                      control={
                        <MbCheckbox
                          checked={weeks.sat}
                          name="sat"
                          onChange={changeValue('weeks')}
                          value="sat"
                          color="#4ed1bd"
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
              <td className={classes.inlineBox}>
                <div className={classes.timeError}>
                  <FormControl
                    variant="outlined"
                    classes={{
                      root: classes.selectArea,
                    }}
                  >
                    <Select
                      native
                      onChange={changeValue('rsvTime')}
                      name="rsvTime"
                      className={clsx({ timeError: timeError.error })}
                      classes={{
                        select: classes.selectSize,
                        root: classes.border,
                      }}
                    >
                      <option value="">시간을 선택해주세요.</option>
                      <option value={'0'}>00시</option>
                      <option value={'01'}>01시</option>
                      <option value={'02'}>02시</option>
                      <option value={'03'}>03시</option>
                      <option value={'04'}>04시</option>
                      <option value={'05'}>05시</option>
                      <option value={'06'}>06시</option>
                      <option value={'07'}>07시</option>
                      <option value={'08'}>08시</option>
                      <option value={'09'}>09시</option>
                      <option value={'10'}>10시</option>
                      <option value={'11'}>11시</option>
                      <option value={'12'}>12시</option>
                      <option value={'13'}>13시</option>
                      <option value={'14'}>14시</option>
                      <option value={'15'}>15시</option>
                      <option value={'16'}>16시</option>
                      <option value={'17'}>17시</option>
                      <option value={'18'}>18시</option>
                      <option value={'19'}>19시</option>
                      <option value={'20'}>20시</option>
                      <option value={'21'}>21시</option>
                      <option value={'22'}>22시</option>
                      <option value={'23'}>23시</option>
                    </Select>
                  </FormControl>
                  {timeError.error ? (
                    <FormHelperText className={classes.errorMessage}>
                      {timeError.message}
                    </FormHelperText>
                  ) : (
                    <></>
                  )}
                </div>
              </td>
            </tr>
            <tr className={classes.verticalTop}>
              <th>{t('충전 금액')}</th>
              <td>
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      name="price"
                      value={price}
                      onChange={changeValue('price')}
                      className={`smallInput ${classes.textField}`}
                      classes={{
                        notchedOutline: classes.border,
                      }}
                      error={priceError.error}
                      endAdornment={
                        <InputAdornment position="end">
                          {t('원')}
                        </InputAdornment>
                      }
                    />
                    {priceError.error === true ? (
                      <FormHelperText className={classes.errorMessage}>
                        {priceError.message}
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
          </tbody>
        </table>
      </form>
    </>
  );
};

export default DeferredPayment;
