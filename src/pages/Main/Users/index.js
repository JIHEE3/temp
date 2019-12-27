import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCoins, faTrashAlt } from '@fortawesome/pro-solid-svg-icons';
import IconButton28 from 'components/atoms/IconButton28';
import MainTemplate from 'pages/templates/MainTemplate';
import TableContainer from 'components/molecules/MbTable';
import { members, deposit, chargeBonus } from 'lib/api/member';
import { makeRowColumn, getHeadObj, getDate } from 'lib/commonLib';

import FilterWrap from 'components/atoms/FilterWrap';
import MbTooltip from 'components/atoms/MbTooltip';
import DateRangePicker from 'components/organisms/DatePicker/DateRangePicker';
import UsersFilterSelectboxes from 'pages/Main/Users/UsersFilterSelectboxes';

import MainContentTemplate from '../../templates/MainContentTemplate';
import RemainingAmountFilter from './RemainingAmountFilter';
import CategoryFilter from './CategoryFilter';

import OutlinedButton from 'components/atoms/OutlinedButton';
import MbSwitch from 'components/atoms/MbSwitch';
import BasicModal from 'components/organisms/Modal/Basic';
import BasicModalHeader from 'components/molecules/Modal/Header';
import BasicModalSection from 'components/molecules/Modal/Section';
import BasicModalFooter from 'components/molecules/Modal/Footer';

import UserManagementIcon from 'images/menu/icon_management_box.svg';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MbButton from 'components/atoms/MbButton';
import MbTabs from 'components/organisms/MbTabs';
import BankDeposit from './BankDeposit';
import DeferredPayment from './DeferredPayment';
import Refund from './Refund';
import Bonus from './Bonus';

import { onlyNumber, weeksConversion } from 'lib/commonLib';

// import { payType } from 'lib/api/code';

const usersStyles = makeStyles(theme => ({
  buttonWrap: {
    '& > :not(:last-child)': {
      marginRight: '6px',
    },
  },
  buttonIcon: {
    fontSize: '14px',
  },
  changeButton: {
    position: 'absolute',
    height: 30,
    top: 0,
    right: 0,
  },
  outlined: {
    borderColor: theme.palette.icon.default,
    backgroundColor: '#fff',
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
let tabTitleValue = '';
let temporaryData;

const UserList = () => {
  const classes = usersStyles();
  const theme = useTheme();
  const now = moment();
  const advrtsAmtSdate = moment(now.format('YYYY-MM-01'));
  const advrtsAmtEdate = now;
  const { t } = useTranslation();
  const initParam = {
    advrtsAmtSdate: getDate(advrtsAmtSdate),
    advrtsAmtEdate: getDate(advrtsAmtEdate),
  };
  const [initialization, setInitialization] = useState(false);
  const [params, setParams] = useState(initParam);
  const [isStore, setIsStore] = useState(false);

  const [chargeValue, setChargeValue] = useState({
    open: false,
    userId: '',
    price: '',
    priceError: {
      error: false,
      message: '',
    },
    date: '',
    dateError: {
      error: false,
      message: '',
    },
    weeks: {
      all: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    rsvTime: '',
    selectWeeks: '',
    timeError: {
      error: false,
      message: '',
    },
    name: null,
    bonus: '',
    memo: '',
    restRsnCode: '',
    complete: false,
    completeMessage: '',
    modalData: {
      headerOpen: true,
      headerTitle: t('충전관리'),
      closeBtn: true,
      cancelBtnOpen: true,
      comfirmBtnOpen: true,
      cancelBtnTitle: t('취소'),
      comfirmBtnTitle: t('충전'),
    },
  });

  const tabCodeJson = {
    // 무통장 입금
    bankDeposit: '22',
    // 후불
    deferredPayment: '77',
    // 환불
    refund: '01',
    // 보너스
    bonus: '04',
  };

  useEffect(() => {
    // initialization = false;
    setInitialization(false);
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

    // 상점일때만 만들어 지도록
    if (isStore) {
      result.set(-1, {
        id: 'INFO_STORE_REG_ICONS',
        label: t('상점 등록'),
        align: 'center',
        makeRowFunc: data => {
          return (
            <OutlinedButton
              className={classes.outlined}
              onClick={() => {
                console.log('계정 수정 클릭');
              }}
            >
              계정 수정
            </OutlinedButton>
          );
        },
      });

      result.set(-2, {
        id: 'INFO_STORE_ONOFF_ICONS',
        label: `${t('상점')} ON/OFF`,
        align: 'center',
        makeRowFunc: data => {
          const { SHOP_WEB = 'N', SHOP_MOBILE = 'N' } = data;
          return (
            <>
              <div>
                <span>w: </span>
                <MbSwitch
                  onChange={() => {
                    console.log('상점 on/off 클릭');
                  }}
                  value="on"
                  hasLabel
                  checked={SHOP_WEB === 'Y'}
                />
              </div>
              <div>
                <span>M: </span>
                <MbSwitch
                  onChange={() => {
                    console.log('상점 on/off 클릭');
                  }}
                  value="on"
                  hasLabel
                  checked={SHOP_MOBILE === 'Y'}
                />
              </div>
            </>
          );
        },
      });
    }
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
    // initialization = true;
    setInitialization(true);
    setParams({ ...initParam });
  };

  /**
   * 날짜 필터
   */
  const handleOnchangeDate = date => {
    const { startDate, endDate } = date;
    if (startDate !== null && endDate !== null) {
      setParams({
        ...params,
        advrtsAmtSdate: startDate,
        advrtsAmtEdate: endDate,
      });
    }
  };

  /**
   * 필터 선택 관련
   */
  const handleOnchangeFilter = filterParam => {
    setParams({ ...params, ...filterParam });
  };

  // 모달 관련 코드

  const modalOpen = userId => {
    setChargeValue({
      ...chargeValue,
      open: true,
      userId: userId,
      price: '',
      priceError: {
        error: false,
        message: '',
      },
      date: '',
      dateError: {
        error: false,
        message: '',
      },
      weeks: {
        all: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      rsvTime: '',
      selectWeeks: '',
      timeError: {
        error: false,
        message: '',
      },
      name: null,
      bonus: '',
      memo: '',
      restRsnCode: '',
      complete: false,
      completeMessage: '',
      modalData: {
        headerOpen: true,
        headerTitle: t('충전관리'),
        closeBtn: true,
        cancelBtnOpen: true,
        comfirmBtnOpen: true,
        cancelBtnTitle: t('취소'),
        comfirmBtnTitle: t('충전'),
      },
    });
  };

  const handleModalClose = () => {
    setChargeValue({
      ...chargeValue,
      open: false,
    });
  };

  const handleChangeValue = type => e => {
    temporaryData = chargeValue;
    if (type === 'date') {
      temporaryData = {
        ...temporaryData,
        date: e,
        dateError: {
          error: false,
          message: '',
        },
      };
    } else if (type !== 'date') {
      const targetValue = e.currentTarget.value;
      const targetName = e.currentTarget.name;
      const checked = e.currentTarget.checked;
      if (type === 'weeks') {
        temporaryData.weeks = {
          ...chargeValue.weeks,
          [targetName]: checked,
        };
        let weeksChecke = true;
        let changeChecke = false;
        if (targetName === 'all') {
          if (checked) {
            changeChecke = true;
          } else {
            changeChecke = false;
          }
          for (let key in temporaryData.weeks) {
            if (key !== 'all') {
              temporaryData.weeks[key] = changeChecke;
            }
          }
        } else if (targetName !== 'all') {
          for (let key in temporaryData.weeks) {
            if (key !== 'all') {
              if (temporaryData.weeks[key] === false) {
                weeksChecke = false;
                break;
              }
            }
          }
          temporaryData.weeks.all = weeksChecke;
        }
        let weeksResult = '';
        for (let key in temporaryData.weeks) {
          if (key !== 'all') {
            if (temporaryData.weeks[key] === true && key === 'sun') {
              weeksResult += '0';
            } else if (temporaryData.weeks[key] === true && key === 'mon') {
              weeksResult += '1';
            } else if (temporaryData.weeks[key] === true && key === 'tue') {
              weeksResult += '2';
            } else if (temporaryData.weeks[key] === true && key === 'wed') {
              weeksResult += '3';
            } else if (temporaryData.weeks[key] === true && key === 'thu') {
              weeksResult += '4';
            } else if (temporaryData.weeks[key] === true && key === 'fri') {
              weeksResult += '5';
            } else if (temporaryData.weeks[key] === true && key === 'sat') {
              weeksResult += '6';
            }
          }
        }
        temporaryData.selectWeeks = weeksConversion(weeksResult);
      } else if (type === 'price') {
        if (targetValue === '') {
          temporaryData = {
            ...temporaryData,
            [targetName]: targetValue,
            priceError: {
              error: true,
              message: '금액을 입력해주세요.',
            },
          };
        } else {
          if (!onlyNumber.test(targetValue)) {
            temporaryData = {
              ...temporaryData,
              [targetName]: targetValue,

              priceError: {
                error: true,
                message: '금액을 정확히 입력해주세요.',
              },
            };
          } else {
            temporaryData = {
              ...temporaryData,
              [targetName]: targetValue,
              priceError: {
                error: false,
                message: '',
              },
            };
          }
        }
      } else if (type === 'rsvTime') {
        temporaryData = {
          ...temporaryData,
          [targetName]: targetValue,
          timeError: {
            error: false,
            message: '',
          },
        };
      }
    }
    setChargeValue({
      ...temporaryData,
    });
    // console.log('change temporaryData: ', temporaryData);
    // console.log('chageValue: ', chargeValue);
  };

  const handleSubmit = () => {
    temporaryData = chargeValue;
    const {
      userId,
      date,
      price,
      name,
      rsvTime,
      selectWeeks,
      memo,
    } = temporaryData;
    let validation = {
      date: false,
      week: false,
    };

    if (tabCodeJson[tabTitleValue] === '77') {
      if (temporaryData.date === '') {
        temporaryData = {
          ...temporaryData,
          dateError: {
            error: true,
            message: '날짜를 입력해주세요.',
          },
        };
        validation.date = false;
      } else {
        temporaryData = {
          ...temporaryData,
          dateError: {
            error: false,
            message: '',
          },
        };
        validation.date = true;
      }

      if (temporaryData.rsvTime === '') {
        temporaryData = {
          ...temporaryData,
          timeError: {
            error: true,
            message: '충전시간을 산텍해주세요.',
          },
        };
        validation.week = false;
      } else {
        temporaryData = {
          ...temporaryData,
          timeError: {
            error: false,
            message: '',
          },
        };
        validation.week = true;
      }

      if (temporaryData.price === '') {
        temporaryData = {
          ...temporaryData,
          priceError: {
            error: true,
            message: '금액을 입력해주세요.',
          },
        };
        validation = false;
      } else {
        temporaryData = {
          ...temporaryData,
          priceError: {
            error: false,
            message: '',
          },
        };
        if (validation.date && validation.week) {
          deposit({
            userId,
            rsvDate: date,
            price,
            name,
            payType: tabCodeJson[tabTitleValue],
            rsvTime,
            weekType: selectWeeks,
          })
            .then(response => {
              const data = response.data;
              if (data.success) {
                temporaryData = {
                  ...temporaryData,
                  complete: true,
                  completeMessage: data.message,
                  modalData: {
                    ...temporaryData.modalData,
                    headerOpen: false,
                    comfirmBtnOpen: false,
                    cancelBtnTitle: t('확인'),
                  },
                };
                setChargeValue({
                  ...temporaryData,
                });
              } else {
                alert(data.message);
              }
              validation = false;
            })
            .catch(error => {
              alert(error);
            });
          validation = false;
        }
      }
    } else if (tabCodeJson[tabTitleValue] === '04') {
      chargeBonus({
        userId,
        rsvDate: date,
        bonus: price,
        name,
        rsvTime,
        weekType: selectWeeks,
        restRsnCode: tabCodeJson[tabTitleValue],
        memo,
      })
        .then(response => {
          const data = response.data;
          if (data.success) {
            temporaryData = {
              ...temporaryData,
              complete: true,
              completeMessage: data.message,
              modalData: {
                ...temporaryData.modalData,
                headerOpen: false,
                comfirmBtnOpen: false,
                cancelBtnTitle: t('확인'),
              },
            };
            setChargeValue({
              ...temporaryData,
            });
          } else {
            alert(data.message);
          }
          validation = false;
        })
        .catch(error => {
          alert(error);
        });
    } else {
      if (temporaryData.price === '') {
        temporaryData = {
          ...temporaryData,
          priceError: {
            error: true,
            message: '금액을 입력해주세요.',
          },
        };
        validation = false;
      } else {
        temporaryData = {
          ...temporaryData,
          priceError: {
            error: false,
            message: '',
          },
        };
        deposit({
          userId,
          rsvDate: date,
          price,
          name,
          payType: tabCodeJson[tabTitleValue],
          rsvTime,
          weekType: selectWeeks,
        })
          .then(response => {
            const data = response.data;
            if (data.success) {
              temporaryData = {
                ...temporaryData,
                complete: true,
                completeMessage: data.message,
                modalData: {
                  ...temporaryData.modalData,
                  headerOpen: false,
                  comfirmBtnOpen: false,
                  cancelBtnTitle: t('확인'),
                },
              };
              setChargeValue({
                ...temporaryData,
              });
            } else {
              alert(data.message);
            }
            validation = false;
          })
          .catch(error => {
            alert(error);
          });
      }
    }
    console.log('마지막 데이터 확인: ', temporaryData);
    setChargeValue({
      ...temporaryData,
    });
  };

  const changeDate = dateV => {
    setChargeValue({
      ...chargeValue,
      date: dateV,
    });
  };

  // 모달 관련 코드 END

  /**
   * 상점 바꾸기
   */
  const handleChangeStore = () => {
    const curIsStore = !isStore;
    setIsStore(curIsStore);
    setParams({ ...params, shopFlag: curIsStore ? 1 : null });
  };

  return (
    <MainTemplate className="mb-User">
      <MainContentTemplate
        title={`${t('사용자 관리')} (${isStore ? t('상점') : t('전체')})`}
      >
        <MbButton
          className={classes.changeButton}
          color={theme.palette.primary.deep}
          onClick={handleChangeStore}
        >
          {isStore ? t('전체보기') : t('상점보기')}
        </MbButton>
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
          <RemainingAmountFilter
            initialization={initialization}
            handleOnchangeFilter={handleOnchangeFilter}
          />
          <CategoryFilter
            initialization={initialization}
            handleOnchangeFilter={handleOnchangeFilter}
          />
        </FilterWrap>
        <TableContainer
          dataReqPromise={members}
          params={{ ...params }}
          order="desc"
          orderBy="JOIN_DATE"
          dense={true}
          customized={customized}
          addColumnList={addColumnList}
        />
      </MainContentTemplate>
      <BasicModal open={chargeValue.open}>
        <BasicModalHeader
          headerOpen={chargeValue.modalData.headerOpen}
          headerTitle={chargeValue.modalData.headerTitle}
          closeBtn={chargeValue.modalData.closeBtn}
          closeOnClick={handleModalClose}
        ></BasicModalHeader>
        <BasicModalSection>
          {chargeValue.complete ? (
            <p>{chargeValue.completeMessage}</p>
          ) : (
            <MbTabs
              name="UsersModal"
              initValue="bankDeposit"
              getCurTab={cur => {
                tabTitleValue = cur;
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
                      priceError={chargeValue.priceError}
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
                      weeks={chargeValue.weeks}
                      price={chargeValue.price}
                      priceError={chargeValue.priceError}
                      timeError={chargeValue.timeError}
                      dateError={chargeValue.dateError}
                      name={chargeValue.name}
                      rsvTime={chargeValue.rsvTime}
                      changeValue={handleChangeValue}
                    />
                  ),
                },
                refund: {
                  tabComponent: (
                    <Refund
                      userId={chargeValue.userId}
                      date={chargeValue.date}
                      price={chargeValue.price}
                      priceError={chargeValue.priceError}
                      name={chargeValue.name}
                      payType={chargeValue.payType}
                      changeValue={handleChangeValue}
                      changeDate={changeDate}
                    />
                  ),
                },
                bonus: {
                  tabComponent: (
                    <Bonus
                      userId={chargeValue.userId}
                      date={chargeValue.date}
                      price={chargeValue.price}
                      priceError={chargeValue.priceError}
                      name={chargeValue.name}
                      payType={chargeValue.payType}
                      changeValue={handleChangeValue}
                      changeDate={changeDate}
                    />
                  ),
                },
              }}
              isModal={true}
              className={classes.sample}
            ></MbTabs>
          )}
        </BasicModalSection>
        <BasicModalFooter
          comfirmOnClick={handleSubmit}
          cancelOnClick={handleModalClose}
          cancelBtnOpen={chargeValue.modalData.cancelBtnOpen}
          comfirmBtnOpen={chargeValue.modalData.comfirmBtnOpen}
          cancelBtnTitle={chargeValue.modalData.cancelBtnTitle}
          comfirmBtnTitle={chargeValue.modalData.comfirmBtnTitle}
        />
      </BasicModal>
    </MainTemplate>
  );
};

export default UserList;
