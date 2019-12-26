import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MbInput from 'components/atoms/MbInput';
import OutlinedButton from 'components/atoms/OutlinedButton';
import MbButton from 'components/atoms/MbButton';
import PopoverFooter from 'components/atoms/PopoverFooter';
import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';

const useStyles = makeStyles(theme => ({
  filterWrap: {
    padding: '30px 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > :not(:first-child)': {
      marginTop: 10,
    },
  },
  input: {
    height: 32,
    width: 156,
    fontSize: 14,
    '& input': {
      textAlign: 'right',
    },
  },
  button: {
    width: '100%',
    borderColor: theme.palette.box.secondaryBorderColor,
    height: 32,
    fontSize: 14,
    lineHeight: `14px`,

    '&.all': {
      backgroundColor: '#f6f6f9',
    },
  },
  userInput: {
    display: 'flex',
    alignItems: 'center',
    '& > :last-child': {
      marginLeft: 9,
    },
  },
  title: {
    marginRight: 27,
  },
  resetButton: {
    fontSize: 15,
  },
}));

/**
 * 잔여 금액 필터 ==>>>>>> 보고서 쪽이나 다른쪽에서 쓰일필터
 * @param {json} param0
 */
export default function RemainingAmountFilter() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [value /*, setValue*/] = useState(null);
  const [userInputAmount, setUserInputAmount] = useState('');

  const handleChange = event => {
    setUserInputAmount(event.target.value);
  };

  return (
    <PopoverFilterWrap
      selectedLabel={value}
      label={t('잔여 금액')}
      filtered={value !== null}
      id="mb-remainingAmountFilter-popper"
      popoverHeight={375}
      filterList={
        <div className={classes.filterWrap}>
          <div className={classes.userInput}>
            <span className={classes.title}>{t('잔여 금액')}</span>
            <Trans i18nKey="원 미만 제외">
              {[
                <MbInput
                  key="remainingAmountFilter_direct_input"
                  placeholder={t('직접입력')}
                  className={classes.input}
                  onChange={handleChange}
                  value={userInputAmount}
                  numberFormat
                />,
                <span key="remainingAmountFilter_span"></span>,
              ]}
            </Trans>
          </div>
          <Button className={`${classes.button} all`} variant="outlined">
            {t('전체')}
          </Button>
          <OutlinedButton className={classes.button}>
            {t('잔여금액 500,000원 미만 제외')}
          </OutlinedButton>
          <OutlinedButton className={classes.button}>
            {t('잔여금액 1,000,000원 미만 제외')}
          </OutlinedButton>
          <OutlinedButton className={classes.button}>
            {t('잔여금액 10,000,000원 미만 제외')}
          </OutlinedButton>
          <PopoverFooter>
            <Button className={classes.resetButton}>{t('초기화')}</Button>
            <MbButton
              color={theme.palette.primary.deep}
              // disabled={saveBtnDisabled}
            >
              {t('저장')}
            </MbButton>
          </PopoverFooter>
        </div>
      }
    />
  );
}
