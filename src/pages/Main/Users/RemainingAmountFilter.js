import React from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/styles';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';

import MbInput from 'components/atoms/MbInput';
import OutlinedButton from 'components/atoms/OutlinedButton';
import MbButton from 'components/atoms/MbButton';
import PopoverFooter from 'components/atoms/PopoverFooter';
import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';
import SnackbarContentWrapper from 'components/molecules/Snackbar/SnackbarContentWrapper';

const styles = theme => ({
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
  },
  margin6: {
    margin: 6,
  },
  title: {
    marginRight: 27,
  },
  resetButton: {
    fontSize: 15,
  },
});

/**
 * 잔여 금액 필터
 */
class RemainingAmountFilter extends React.Component {
  initState = {
    saved: false,
    value: 'all',
    newValue: 'all',
    saveBtnDisabled: true,
    userInputAmount: {
      min: '',
      max: '',
    },
    errorMessage: '',
    open: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.initState,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { newValue, value, saved } = this.state;
    const { initialization } = this.props;
    let newState = {
      ...this.state,
    };

    if (saved) {
      // 저장버튼 눌러서 들어온 경우
      newState['saveBtnDisabled'] = true;
      newState['saved'] = false;
    } else {
      // 기존값과 새로운 값 비교
      if (value !== newValue) {
        newState['saveBtnDisabled'] = false;
      } else {
        newState['saveBtnDisabled'] = true;
      }
    }

    if (initialization) {
      newState = {
        ...this.initState,
      };
    }

    if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
      this.setState({
        ...newState,
      });
    }
  }

  /**
   * input
   * @param {string} name
   */
  handleChange = name => event => {
    const { userInputAmount } = this.state;
    const newUserInputAmount = {
      ...userInputAmount,
      [name]: event.target.value,
    };

    const { min, max } = newUserInputAmount;
    let newV = `${Number(min).toLocaleString('en')} ~ ${Number(
      max
    ).toLocaleString('en')}`;

    if (min === '' && max === '') {
      newV = 'all';
    }

    this.setState({
      ...this.state,
      userInputAmount: newUserInputAmount,
      newValue: newV,
    });
  };

  /**
   * 필터 버튼 클릭
   * @param {string} newVal
   */
  handleButonClick = newVal => e => {
    this.setState({
      ...this.state,
      newValue: newVal,
      userInputAmount: {
        min: '',
        max: '',
      },
    });
  };

  /**
   * 필터 저장
   */
  handleSaveButtonOnClick = () => {
    const { newValue } = this.state;
    let [sPoint, ePoint] = [null, null];
    let errorMessage = '';

    if (newValue !== 'all') {
      const arr = newValue.split(' ~ ');
      sPoint = arr[0].replace(/[^0-9]/g, '');
      ePoint =
        typeof arr[1] !== 'undefined' ? arr[1].replace(/[^0-9]/g, '') : null;
    }

    if (sPoint !== null && ePoint !== null && Number(sPoint) > Number(ePoint)) {
      // 사용자가 집적입력으로 잘못 입력한 경우
      errorMessage = '최소금액과 최고금액을 올바르게 입력해주세요.';
    }

    if (errorMessage === '') {
      this.props.handleOnchangeFilter({
        sPoint,
        ePoint,
      });
      this.setState({
        ...this.state,
        value: newValue,
        saved: true,
        errorMessage,
        open: false,
      });
    } else {
      this.setState({
        ...this.state,
        errorMessage,
        open: true,
      });
    }
  };

  /**
   * 에러 메시지 표시해주는
   */
  handleClose = () => {
    this.setState({
      ...this.state,
      open: false,
    });
  };

  /**
   * 선택된 버튼 확인
   * @param {string} buttonValue
   */
  checkSelected = buttonValue => {
    const { newValue, value } = this.state;
    let result = false;

    if (newValue === null) {
      // 이전에 선택한 버튼 selected 해줌
      if (value === buttonValue) {
        result = true;
      }
    } else {
      if (newValue === buttonValue) {
        result = true;
      }
    }

    return result;
  };

  render() {
    const { t, classes, theme } = this.props;
    const {
      value,
      saveBtnDisabled,
      userInputAmount,
      errorMessage,
      open,
    } = this.state;
    const {
      handleChange,
      handleButonClick,
      handleSaveButtonOnClick,
      handleClose,
      checkSelected,
    } = this;

    return (
      <>
        <PopoverFilterWrap
          selectedLabel={value}
          label={t('잔여 금액')}
          filtered={value !== 'all'}
          id="mb-remainingAmountFilter-popper"
          popoverHeight={423}
          filterList={
            <div className={classes.filterWrap}>
              <div className={classes.userInput}>
                <MbInput
                  placeholder={t('최소금액')}
                  className={classes.input}
                  onChange={handleChange('min')}
                  value={userInputAmount.min}
                  numberFormat
                  error={errorMessage !== ''}
                />
                <span className={classes.margin6}>-</span>
                <MbInput
                  placeholder={t('최고금액')}
                  className={classes.input}
                  onChange={handleChange('max')}
                  value={userInputAmount.max}
                  numberFormat
                  error={errorMessage !== ''}
                />
              </div>
              <Button
                className={`${classes.button} all`}
                variant="outlined"
                onClick={handleButonClick('all')}
              >
                {t('전체')}
              </Button>
              <OutlinedButton
                className={classes.button}
                selected={checkSelected('0 ~ 5,000')}
                onClick={handleButonClick('0 ~ 5,000')}
              >
                0 ~ 5,000
              </OutlinedButton>
              <OutlinedButton
                className={classes.button}
                selected={checkSelected('5,000 ~ 10,000')}
                onClick={handleButonClick('5,000 ~ 10,000')}
              >
                5,000 ~ 10,000
              </OutlinedButton>
              <OutlinedButton
                className={classes.button}
                selected={checkSelected('10,000 ~ 50,000')}
                onClick={handleButonClick('10,000 ~ 50,000')}
              >
                10,000 ~ 50,000
              </OutlinedButton>
              <OutlinedButton
                className={classes.button}
                selected={checkSelected('50,000 ~ 100,000')}
                onClick={handleButonClick('50,000 ~ 100,000')}
              >
                50,000 ~ 100,000
              </OutlinedButton>
              <OutlinedButton
                className={classes.button}
                selected={checkSelected(t('이상', { value: '100,000' }))}
                onClick={handleButonClick(t('이상', { value: '100,000' }))}
              >
                {t('이상', { value: '100,000' })}
              </OutlinedButton>
              <PopoverFooter>
                <Button className={classes.resetButton}>{t('초기화')}</Button>
                <MbButton
                  color={theme.palette.primary.deep}
                  disabled={saveBtnDisabled}
                  onClick={handleSaveButtonOnClick}
                >
                  {t('저장')}
                </MbButton>
              </PopoverFooter>
            </div>
          }
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <SnackbarContentWrapper variant="error" message={errorMessage} />
        </Snackbar>
      </>
    );
  }
}

export default withTranslation()(
  withTheme(withStyles(styles)(RemainingAmountFilter))
);
