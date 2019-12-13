import React from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  memo: {
    width: '100%',
  },
}));

const Bonus = () => {
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
              <th>{t('충전 금액')}</th>
              <td>
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      margin="dense"
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
            <tr>
              <th>{t('입금자명')}</th>
              <td>
                <OutlinedInput
                  variant="outlined"
                  margin="dense"
                  className={classes.textField}
                  classes={{
                    notchedOutline: classes.border,
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t('메모')}</th>
              <td>
                <OutlinedInput
                  variant="outlined"
                  margin="dense"
                  multiline
                  rows="4"
                  className={`${classes.textField} ${classes.memo}`}
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

export default Bonus;
