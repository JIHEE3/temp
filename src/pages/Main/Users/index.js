import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCoins, faTrashAlt } from '@fortawesome/pro-solid-svg-icons';
import IconButton28 from 'components/atoms/IconButton28';
import MainTemplate from 'pages/templates/MainTemplate';
import TableContainer from 'components/molecules/MbTable';
import { members } from 'lib/api/member';
import { makeRowColumn, getHeadObj, getDate } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import MbTooltip from 'components/atoms/MbTooltip';
import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';
import UsersFilterSelectboxes from 'pages/Main/Users/UsersFilterSelectboxes';

import MainContentTemplate from '../../templates/MainContentTemplate';
import RemainingAmountFilter from './RemainingAmountFilter';

import BasicModal from 'components/organisms/Modal/Basic';
import BasicModalHeader from 'components/molecules/Modal/Header';
import BasicModalSection from 'components/molecules/Modal/Section';
import BasicModalFooter from 'components/molecules/Modal/Footer';

import UserManagementIcon from 'images/menu/icon_management_box.svg';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MbTabs from 'components/organisms/MbTabs';
import BankDeposit from './BankDeposit';
import DeferredPayment from './DeferredPayment';
import Refund from './Refund';
import Bonus from './Bonus';

import { onlyNumber } from 'lib/commonLib';

import { payType } from 'lib/api/code';

const addColumnStyles = makeStyles(theme => ({
  buttonWrap: {
    '& > :not(:last-child)': {
      marginRight: '6px',
    },
  },
  buttonIcon: {
    fontSize: '14px',
  },

  // 모달 관련 코드
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tabBg: {
    backgroundColor: theme.palette.tab.headerBg,
    color: theme.palette.tab.headerTextColor,
  },
  tabSelected: {
    background: '#f00',
  },
  // 모달 관련 코드 END
}));

let initialization = false;

// 모달 관련 코드
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// 모달 관련 코드 END
let test = '';
const UserList = () => {
  const classes = addColumnStyles();
  const now = moment();
  const advrtsAmtSdate = moment(now.format('YYYY-MM-01'));
  const advrtsAmtEdate = now;
  const { t } = useTranslation();
  const initParam = {
    userFilter: {},
    dateFilter: {
      advrtsAmtSdate: getDate(advrtsAmtSdate),
      advrtsAmtEdate: getDate(advrtsAmtEdate),
    },
  };
  const [params, setParams] = useState(initParam);

  const [chargeValue, setChargeValue] = useState({
    open: false,
    userId: '',
    price: {
      value: '',
      error: false,
      message: '',
    },
    date: '',
    week: {
      all: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    name: '',
    payType: '',
    bonus: '',
    memo: '',
    restRsnCode: '',
  });

  useEffect(() => {
    // 렌더링 후에 실행됨
    // params setting(필터링 혹은 초기 param setting) > 렌더링 > 초기화 값 초기화
    initialization = false;
  }, [params]);

  // 화면에서 추가될 컬럼
  const addColumnList = (() => {
    const result = new Map();
    result.set(0, {
      id: 'INFO_MANAGE_ICONS',
      label: t('정보관리'),
      align: 'center',
      makeRowFunc: data => {
        // console.log(data);
        const {
          // 사용자로 로그인
          ADVER_LINK_BUTTON = 'N',
          // 회원정보수정
          MODIFY_LINK_BUTTON = 'N',
          // 충전 관리
          CHARGE_BUTTON = 'N',
          // 삭제
          DELETE_BUTTON = 'N',
        } = data;
        return (
          <div className={classes.buttonWrap}>
            {ADVER_LINK_BUTTON === 'Y' && (
              <MbTooltip title={t('사용자로 로그인')}>
                <IconButton28>
                  <img src={UserManagementIcon} alt={t('사용자로 로그인')} />
                </IconButton28>
              </MbTooltip>
            )}
            {MODIFY_LINK_BUTTON === 'Y' && (
              <MbTooltip title={t('회원정보수정')}>
                <IconButton28>
                  <FontAwesomeIcon
                    icon={faEdit}
                    color="#8d9ba2"
                    className={classes.buttonIcon}
                  />
                </IconButton28>
              </MbTooltip>
            )}
            {CHARGE_BUTTON === 'Y' && (
              <MbTooltip title={t('충전 관리')}>
                <IconButton28 onClick={e => modalOpen(data.USER_ID)}>
                  <FontAwesomeIcon
                    icon={faCoins}
                    color="#8d9ba2"
                    className={classes.buttonIcon}
                  />
                </IconButton28>
              </MbTooltip>
            )}
            {DELETE_BUTTON === 'Y' && (
              <MbTooltip title={t('삭제')}>
                <IconButton28>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    color="#8d9ba2"
                    className={classes.buttonIcon}
                  />
                </IconButton28>
              </MbTooltip>
            )}
          </div>
        );
      },
    });
    return result;
  })();

  // header 및 body 컬럼 커스텀
  const customized = {
    CORP_NAME: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'CORP_NAME').label}/${
          getHeadObj(headsMap, 'CORP_CONTACT_NAME').label
        }`;
      },
      makeBody: (rowObj, headsMap) => {
        const corpName = getHeadObj(headsMap, 'CORP_NAME');
        const name = getHeadObj(headsMap, 'CORP_CONTACT_NAME');

        return (
          <>
            <div className="mb-corpName-text" title={rowObj['CORP_NAME']}>
              {makeRowColumn(
                rowObj['CORP_NAME'],
                corpName.type,
                corpName.format
              )}
            </div>
            {rowObj['CORP_CONTACT_NAME'] === null ? (
              ''
            ) : (
              <>
                <br />
                <div>
                  {makeRowColumn(
                    rowObj['CORP_CONTACT_NAME'],
                    name.type,
                    name.format
                  )}
                </div>
              </>
            )}
          </>
        );
      },
    },
    NAME: {
      merged: true,
    },
    MONTH_POINT: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'MONTH_POINT').label}`;
      },
      makeBody: (rowObj, headsMap) => {
        const mothPoint = getHeadObj(headsMap, 'MONTH_POINT');
        const bMothPoint = getHeadObj(headsMap, 'BONUS_MONTH_POINT');
        return (
          <>
            {makeRowColumn(
              rowObj['MONTH_POINT'],
              mothPoint.type,
              mothPoint.format
            )}
            <br />
            {makeRowColumn(
              rowObj['BONUS_MONTH_POINT'],
              bMothPoint.type,
              bMothPoint.format
            )}
          </>
        );
      },
    },
    BONUS_MONTH_POINT: {
      merged: true,
    },
    PREV_MONTH_POINT: {
      makeHead: headsMap => {
        return `${getHeadObj(headsMap, 'PREV_MONTH_POINT').label}`;
      },
      makeBody: (rowObj, headsMap) => {
        const mothPoint = getHeadObj(headsMap, 'PREV_MONTH_POINT');
        const bMothPoint = getHeadObj(headsMap, 'BONUS_PREV_MONTH_POINT');
        return (
          <>
            {makeRowColumn(
              rowObj['PREV_MONTH_POINT'],
              mothPoint.type,
              mothPoint.format
            )}
            <br />
            {makeRowColumn(
              rowObj['BONUS_PREV_MONTH_POINT'],
              bMothPoint.type,
              bMothPoint.format
            )}
          </>
        );
      },
    },
    BONUS_PREV_MONTH_POINT: {
      merged: true,
    },
  };

  /**
   * 필터 초기화
   */
  const handleOnReset = () => {
    initialization = true;
    setParams(initParam);
  };

  /**
   * 날짜 필터
   */
  const handleOnchangeDate = date => {
    const { startDate, endDate } = date;
    if (startDate !== null && endDate !== null) {
      setParams({
        ...params,
        dateFilter: {
          advrtsAmtSdate: startDate,
          advrtsAmtEdate: endDate,
        },
      });
    }
  };

  /**
   * 필터 선택 관련
   */
  const handleOnchangeFilter = filterParam => {
    setParams({ ...params, userFilter: { ...filterParam } });
  };

  // 모달 관련 코드
  const modalOpen = userId => {
    setChargeValue({
      ...chargeValue,
      open: true,
      userId: userId,
    });
    payType()
      .then(response => {
        const { data } = response.data;

        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleModalClose = () => {
    setChargeValue({
      open: false,
    });
  };

  const handleChackBox = e => {
    console.log(e.target.name);

    if (e.target.name === 'all') {
      console.log('모든 요일');
    } else if (e.target.name !== 'all') {
      console.log('모든 요일이 아닌 요일');

      let result =
        chargeValue.week.mon &&
        chargeValue.week.tue &&
        chargeValue.week.wed &&
        chargeValue.week.thu &&
        chargeValue.week.fri &&
        chargeValue.week.sat &&
        chargeValue.week.sun;

      if (result === true) {
        setChargeValue({
          ...chargeValue,
          week: {
            ...chargeValue.week,
            all: e.target.checked,
          },
        });
        console.log('정보: 모든 요일이 선택되었습니다! =>', result);
      }
      console.log('현재 선택된 요일이 전체 선택 되었는가? =>', result);
    }

    // if (result === true) {
    //   setChargeValue({
    //     ...chargeValue,
    //     week: {
    //       all: e.currentTarget.checked,
    //     },
    //   });
    // }

    // console.log('result : ', result === true);
    // for (let key in weekValue) {
    // if (weekValue.hasOwnProperty(key)) {
    //   result = weekValue[key];
    //   console.log('for : ', result);
    // }
    //   result = weekValue[key];
    // }
  };

  const handleChangeValue = type => e => {
    if (type === 'date') {
      const date = e;
      setChargeValue({
        ...chargeValue,
        date: date,
      });
    } else if (type !== 'date') {
      const targetValue = e.currentTarget.value;
      const checked = e.currentTarget.checked;
      const targetName = e.currentTarget.name;
      if (type === 'week') {
        // console.log(
        //   'targetName : ',
        //   targetName,
        //   targetName === 'all',
        //   ' / checked : ',
        //   checked === true
        // );
        // console.log(
        //   '--------------------- => ',
        //   targetName === 'all' && checked === true
        // );
        if (targetName === 'all' && checked === true) {
          setChargeValue({
            ...chargeValue,
            week: {
              ...chargeValue.week,
              [targetName]: checked,
            },
          });
        } else if (targetName !== 'all' || checked !== true) {
          setChargeValue({
            ...chargeValue,
            week: {
              ...chargeValue.week,
              [targetName]: checked,
            },
          });
        }
      } else if (type === 'price') {
        if (!onlyNumber.test(targetValue)) {
          setChargeValue({
            ...chargeValue,
            [targetName]: {
              value: targetValue,
              error: false,
              message: '',
            },
          });
        } else {
          setChargeValue({
            ...chargeValue,
            price: {
              value: targetValue,
              error: true,
              message: '금액을 정확히 입력해주세요.',
            },
          });
        }
      } else if (type === '') {
        setChargeValue({
          ...chargeValue,
          [targetName]: targetValue,
        });
        console.log(targetName, ' : ', targetValue);
      } else if (type === 'date') {
        console.log('date');
        // debugger;
      } else {
        setChargeValue({
          ...chargeValue,
          [targetName]: targetValue,
        });
      }
    }
  };

  const handleSubmit = () => {
    setChargeValue({
      ...chargeValue,
      payType: test,
    });
  };

  const changeDate = dateV => {
    setChargeValue({
      ...chargeValue,
      date: dateV,
    });
  };

  // 모달 관련 코드 END
  return (
    <MainTemplate className="mb-User">
      <MainContentTemplate title={t('사용자 관리')}>
        <FilterWrap handleOnReset={handleOnReset}>
          <UsersFilterSelectboxes
            initialization={initialization}
            handleOnchangeFilter={handleOnchangeFilter}
          />
          <DateRangePicker
            initialization={initialization}
            startDateId="user-startDate"
            endDateId="user-endDate"
            handleOnChange={handleOnchangeDate}
            initialStartDate={advrtsAmtSdate}
            initialEndDate={advrtsAmtEdate}
            label={
              <span style={{ cursor: 'default' }}>{t('지출 금액 날짜')}</span>
            }
            filtered
          />
          <RemainingAmountFilter />
        </FilterWrap>
        <TableContainer
          dataReqPromise={members}
          params={{ ...params.dateFilter, ...params.userFilter }}
          order="desc"
          orderBy="JOIN_DATE"
          dense={true}
          customized={customized}
          addColumnList={addColumnList}
        />
      </MainContentTemplate>
      <BasicModal open={chargeValue.open}>
        <BasicModalHeader
          headerOpen={true}
          headerTitle={t('충전관리')}
          closeBtn={true}
          closeOnClick={handleModalClose}
        ></BasicModalHeader>
        <BasicModalSection>
          <MbTabs
            name="UsersModal"
            initValue="bankDeposit"
            getCurTab={cur => {
              console.log(cur);
              test = cur;
            }}
            tabMenuList={(() => {
              const result = new Map();
              result.set('bankDeposit', {
                menuUrl: 'bankDeposit',
                menuSeq: 'bankDeposit',
                menuNm: '무통장입금',
              });
              result.set('deferredPayment', {
                menuUrl: 'deferredPayment',
                menuSeq: 'deferredPayment',
                menuNm: '후불',
              });
              result.set('refund', {
                menuUrl: 'refund',
                menuSeq: 'refund',
                menuNm: '환불',
              });
              result.set('bonus', {
                menuUrl: 'bonus',
                menuSeq: 'bonus',
                menuNm: '보너스',
              });
              return result;
            })()}
            tabs={{
              bankDeposit: {
                tabComponent: (
                  <BankDeposit
                    userId={chargeValue.userId}
                    date={chargeValue.date}
                    price={chargeValue.price}
                    name={chargeValue.name}
                    payType={chargeValue.payType}
                    changeValue={handleChangeValue}
                    changeDate={changeDate}
                  />
                ),
              },
              deferredPayment: {
                tabComponent: (
                  <DeferredPayment
                    userId={chargeValue.userId}
                    date={chargeValue.date}
                    week={chargeValue.week}
                    price={chargeValue.price}
                    name={chargeValue.name}
                    payType={chargeValue.payType}
                    changeValue={handleChangeValue}
                    handleChackBox={handleChackBox}
                  />
                ),
              },
              refund: {
                tabComponent: (
                  <Refund
                    userId={chargeValue.userId}
                    date={chargeValue.date}
                    price={chargeValue.price}
                    name={chargeValue.name}
                    payType={chargeValue.payType}
                    changeValue={handleChangeValue}
                  />
                ),
              },
              bonus: {
                tabComponent: (
                  <Bonus
                    userId={chargeValue.userId}
                    date={chargeValue.date}
                    price={chargeValue.price}
                    name={chargeValue.name}
                    payType={chargeValue.payType}
                    bonus={chargeValue.bonus}
                    memo={chargeValue.memo}
                    restRsnCode={chargeValue.restRsnCode}
                    changeValue={handleChangeValue}
                  />
                ),
              },
            }}
            isModal={true}
            className={classes.sample}
          ></MbTabs>
        </BasicModalSection>
        <BasicModalFooter
          comfirmOnClick={handleSubmit}
          cancelBtnOpen={true}
          comfirmBtnOpen={true}
          cancelBtnTitle={t('취소')}
          comfirmBtnTitle={t('충전')}
        />
      </BasicModal>
    </MainTemplate>
  );
};

export default UserList;
