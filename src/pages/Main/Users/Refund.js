import React from 'react';

import 'react-dates/initialize';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ModalButton from 'components/atoms/ModalButton';
import Select from '@material-ui/core/Select';

import DatePicker from 'components/organisms/DatePicker/SingleDate';

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

const BankDeposit = props => {
  // const { userId, date, price, priceError, name, changeValue } = props;
  const { userId, price, priceError, name, changeValue } = props;
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
              <th>{t('이전 예약 일자')}</th>
              <td>
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
              </td>
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
            <tr>
              <th>{t('입금자명')}</th>
              <td>
                <FormControl variant="outlined">
                  <OutlinedInput
                    name="name"
                    defaultValue={name}
                    onChange={changeValue('name')}
                    className={`smallInput ${classes.textField}`}
                    classes={{
                      notchedOutline: classes.border,
                    }}
                  />
                </FormControl>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default BankDeposit;
// export default ;
