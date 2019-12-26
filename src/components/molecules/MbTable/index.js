import React from 'react';
import clsx from 'clsx';
import qs from 'qs';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import Swipeable from 'react-swipeable';
import { Scrollbars } from 'react-custom-scrollbars';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons';

import MbDataState from 'components/atoms/MbDataState';
import TableToolBarIconButton from 'components/atoms/TableToolBarIconButton';
import DivisionWrap from 'components/atoms/DivisionWrap';
import SnackbarContentWrapper from 'components/molecules/Snackbar/SnackbarContentWrapper';
import EnhancedTableWrap from 'components/molecules/MbTable/EnhancedTableWrap';
import SetUpList from 'components/molecules/SetUpList';
import EnhancedTableHead from 'components/molecules/MbTable/EnhancedTableHead';
import EnhancedTableBody from 'components/molecules/MbTable/EnhancedTableBody';

import { tableHeaders, setCustom } from 'lib/api/common';
import { fetchHeader, under2camel, fileDownload } from 'lib/commonLib';

const styles = theme => ({
  circularProgressWrap: {
    zIndex: 100,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba( 255, 255, 255, 0.7 )',
    display: 'none',
    '& > div': {
      margin: 'auto',
    },
    '&.loading': {
      display: 'flex',
    },
  },
  loadingBarWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    display: 'none',
    '&.loading': {
      display: 'block',
    },
  },
  loadingBar: {
    zIndex: 100,
    position: 'absolute',
    bottom: '9px',
    width: '96%',
  },
  fullscreen: {
    position: 'fixed',
    zIndex: 10,
    top: 50,
    backgroundColor: '#fff',
    left: 0,
    width: '100%',
    height: '100%',
  },
  tableWrapper: {
    display: 'flex',
    flex: '1 0 auto',
    '& > div': {
      flex: '1 0 auto',
    },
  },
  tableCustomScrollBar: {
    '& > div:first-child': {
      position: 'relative !important',
      maxHeight: '730px',
    },
    '& > div:last-child': {
      zIndex: 11,
    },
  },
});

let page = 1;
const LIMIT = 50;
let firstFetching = false;
class EnhancedTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    const { order = 'desc', orderBy = '' } = props;
    this.state = {
      headCells: new Map(),
      selected: [],
      list: null,
      error: false,
      order,
      orderBy,
      moreFetching: false,
      totalList: null,
      screenMode: '',
      keyword: '',
    };
    page = 1;

    // // 마운팅 됐을 때 페이지 1 요청 끝나고 또 2 요청하게 해서 데이터 가지고 있기 ( 스크롤시 버벅거리기 때문에)
    // const { hasTotal, dataReqPromise, params } = props;
    // firstFetching = true;

    // fetchHeader(() => tableHeaders()).then(
    //   headers =>
    //     (this.state = {
    //       ...this.state,
    //       headCells: headers,
    //     })
    // );
    // this.fetchList();
    // if (hasTotal) {
    //   dataReqPromise({ params: { ...params, total: 1 } })
    //     .then(response => {
    //       this.state = {
    //         ...this.state,
    //         totalList: response.data.data,
    //       };
    //     })
    //     .catch(error => console.log(error));
    // }
  }

  componentWillMount() {
    // 마운팅 됐을 때 페이지 1 요청 끝나고 또 2 요청하게 해서 데이터 가지고 있기 ( 스크롤시 버벅거리기 때문에)
    const {
      hasTotal,
      dataReqPromise,
      params,
      addColumnList,
      location,
    } = this.props;
    firstFetching = true;
    const { uri } = queryString.parse(location.search);

    fetchHeader(tableHeaders, addColumnList, uri).then(headers =>
      this.setState({
        ...this.state,
        headCells: headers,
      })
    );
    this.fetchList();
    if (hasTotal) {
      dataReqPromise({ params: { ...params, total: 1 } })
        .then(response => {
          this.setState({
            ...this.state,
            totalList: response.data.data,
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            moreFetching: false,
            error: true,
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { order, orderBy, keyword } = prevState;
    const {
      order: curOrder,
      orderBy: curOrderBy,
      keyword: curKeyword,
    } = this.state;
    const { params, addColumnList = new Map() } = prevProps;
    const {
      params: curParams,
      addColumnList: curAddColumnList = new Map(),
      location,
    } = this.props;

    if (addColumnList.size !== curAddColumnList.size) {
      const { uri } = queryString.parse(location.search);
      fetchHeader(tableHeaders, curAddColumnList, uri).then(headers =>
        this.setState({
          ...this.state,
          headCells: headers,
        })
      );
    }

    if (
      !firstFetching &&
      (order !== curOrder ||
        orderBy !== curOrderBy ||
        keyword !== curKeyword ||
        // params !== curParams
        JSON.stringify(qs.stringify(params, { skipNulls: true })) !==
          JSON.stringify(qs.stringify(curParams, { skipNulls: true })))
    ) {
      page = 1;
      this.fetchList();
    }
    if (page === 1 && !!this.scrollRef.current) {
      this.scrollRef.current.scrollTop(0);
      // scrollRef.current.scrollLeft(0);
    }
  }

  fetchList = () => {
    // get datas
    const { dataReqPromise, params, location } = this.props;
    const { order, orderBy, list, keyword } = this.state;
    const { uri } = queryString.parse(location.search);

    dataReqPromise({
      params: {
        ...params,
        page,
        order: under2camel(orderBy),
        sort: order,
        limit: LIMIT,
        uri,
        keyword: keyword === '' ? null : keyword,
      },
    })
      .then(response => {
        const { data } = response.data;
        const orgList = !list || page === 1 ? [] : list;
        const newData = orgList.concat(data);

        this.setState({
          ...this.state,
          error: false,
          list: newData,
        });
      })
      .catch(error => {
        console.log(error);
        page -= 1;
        const newState = { ...this.state, error: true };
        if (page === 0) {
          page = 1;
          newState['list'] = null;
          newState['selected'] = [];
        }
        this.setState({
          ...newState,
        });
      })
      .finally(() => {
        this.setState({
          ...this.state,
          moreFetching: false,
        });
        firstFetching = false;
      });
  };

  /**
   * 테이블 로우 클릭시 상세 정보 요청후 넣어주는 함수
   */
  fetchDetailList = (appendIndex, detailParams) => {
    const { dataDetailReqPromise, params } = this.props;
    const { list } = this.state;
    dataDetailReqPromise({
      params: {
        ...params,
        ...detailParams,
      },
    })
      .then(response => {
        const { data } = response.data;
        const newData = [].concat(list);
        const curRow = newData[appendIndex];
        curRow['isOpen'] = true;
        curRow['childrenCnt'] = data.length;

        for (let i = 0; i < data.length; i++) {
          const cur = data[i];
          cur['isChild'] = true;
        }

        newData.splice(appendIndex + 1, 0, ...data);

        this.setState({
          ...this.state,
          error: false,
          list: newData,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * 엑셀 다운로드
   */
  handleExcelDonload = () => {
    const { dataReqPromise, params } = this.props;
    const { order, orderBy } = this.state;
    dataReqPromise({
      params: {
        ...params,
        excel: 1,
        order: under2camel(orderBy),
        sort: order,
        // 현재 서버에서 처리하고 있지 않음
        page,
        limit: LIMIT,
      },
      responseType: 'blob',
    }).then(response => {
      fileDownload(response);
    });
  };

  /**
   * 화면 모드 변경
   */
  handleScreenMode = () => {
    const { screenMode } = this.state;
    if (screenMode === '') {
      this.setState({
        ...this.state,
        screenMode: 'full',
      });
    } else {
      this.setState({
        ...this.state,
        screenMode: '',
      });
    }
  };

  /**
   * odering
   * @param {} event
   * @param {string} property ordering 할 header id
   */
  handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isDesc = orderBy === property && order === 'desc';

    // page = 1;
    this.setState({
      ...this.state,
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
      moreFetching: true,
      selected: [],
    });
  };

  handleTableScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const { moreFetching } = this.state;

    if (
      scrollTop !== 0 &&
      scrollHeight - scrollTop < clientHeight * 1.5 &&
      // scrollHeight - scrollTop <= clientHeight &&
      moreFetching === false
    ) {
      // 다음 페이지 정보 받아옴
      page += 1;
      this.setState({
        ...this.state,
        moreFetching: true,
      });
      this.fetchList();
    }
  };

  handleClick = (event, key) => {
    const { selected, list } = this.state;
    const { expandTable = false, makeSubParam } = this.props;

    if (expandTable) {
      // 세부정보 받아오기
      const curRow = list[key];
      const { isOpen, isChild } = curRow;

      if (isChild) {
        return;
      }

      const { dataDetailReqPromise } = this.props;
      if (dataDetailReqPromise && typeof isOpen === 'undefined') {
        // 세부정보 받아오지 않은 경우
        this.fetchDetailList(key, makeSubParam(curRow));
      } else {
        const newList = [].concat(list);
        const { childrenCnt } = curRow;
        const startIndex = key + 1;
        const display = !curRow['isOpen'];

        curRow['isOpen'] = display;

        for (let i = startIndex; i < startIndex + childrenCnt; i++) {
          const child = newList[i];
          child['display'] = display;
          child['isOpen'] = display;
        }

        this.setState({
          ...this.state,
          list: newList,
        });
      }
    } else {
      // 배열말고 json 으로 변경하기
      const selectedIndex = selected.indexOf(key);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, key);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      this.setState({
        ...this.state,
        selected: newSelected,
      });
    }
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      const { list } = this.state;
      const newSelecteds = [];
      for (let i = 0; i < list.length; i++) {
        newSelecteds.push(i);
      }

      this.setState({
        ...this.state,
        selected: newSelecteds,
      });
      return;
    }
    this.setState({
      ...this.state,
      selected: [],
    });
  };

  /**
   * 컬럼 설정 저장
   */
  handleSaveColumnSet = customColumn => {
    const heads = [];
    for (let column of customColumn.values()) {
      const { id, displayFlag } = column;
      if (id === 'SEQ') {
        continue;
      }

      if (displayFlag) {
        heads.push(id);
      }
    }

    setCustom({ values: heads.join(','), type: 'table.head' })
      .then(response => {})
      .catch(error => console.log(error));

    this.setState({
      ...this.state,
      headCells: customColumn,
    });
  };

  handleTableSwiping = (e, deltaX, deltaY, absX, absY, velocity) => {
    const { scrollRef } = this;
    let sX = scrollRef.current.getScrollLeft() + deltaX;
    this.scrollRef.current.scrollLeft(sX);
  };

  handleSearch = keyword => {
    this.setState({
      ...this.state,
      keyword,
    });
  };

  render() {
    const {
      t,
      theme,
      className,
      classes,
      dense,
      hasCheckbox,
      hasTotal,
      title,
      customized = {},
      hasExcel = false,
      expandTable,
      childColumnSet,
    } = this.props;
    const {
      headCells,
      selected,
      list,
      totalList,
      error,
      order,
      orderBy,
      moreFetching,
      screenMode,
    } = this.state;
    const {
      handleSelectAllClick,
      handleRequestSort,
      handleClick,
      handleTableScroll,
      handleTableSwiping,
      handleExcelDonload,
      handleScreenMode,
      handleSaveColumnSet,
      scrollRef,
      handleSearch,
    } = this;

    const isLoading = this.state.list === null && this.state.error !== true;
    const open = page > 1 && error === true;

    return (
      <>
        <div
          className={clsx(classes.circularProgressWrap, {
            loading: page === 1 && moreFetching,
          })}
        >
          {/* 정렬 및 필터 로딩 */}
          <div>
            <MbDataState state="loading" />
          </div>
        </div>
        <div
          className={clsx(classes.loadingBarWrap, {
            loading: page !== 1 && moreFetching,
          })}
        >
          <div className={clsx(classes.loadingBar)}>
            {/* 무한스크롤 로딩 */}
            <LinearProgress className={classes.progress} />
          </div>
        </div>
        <div
          className={clsx(
            'mb-EnhancedTableContainer',
            screenMode === 'full' ? classes.fullscreen : '',
            className
          )}
        >
          <EnhancedTableWrap
            style={{ position: 'relative' }}
            columnSetButton={
              <DivisionWrap>
                <SetUpList
                  list={headCells}
                  handleSaveCustomSet={handleSaveColumnSet}
                  title={t('컬럼설정')}
                  popoverTitle={t('나만의 기본 컬럼을 설정해보세요.')}
                  popoverNotice={t('설정 이후 선택한 컬럼만 노출됩니다.')}
                  saveButtonTitle={t('내 컬럼으로 설정')}
                />
                <TableToolBarIconButton
                  icon={
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      color={theme.palette.common.black}
                      style={{ fontSize: 18 }}
                    />
                  }
                  label={t('복사')}
                />
              </DivisionWrap>
            }
            selectedCnt={selected.length}
            title={title}
            hasExcel={hasExcel}
            handleExcelDonload={handleExcelDonload}
            handleScreenMode={handleScreenMode}
            headcells={headCells}
            screenMode={screenMode}
            handleSearch={handleSearch}
          >
            <Scrollbars
              className={classes.tableCustomScrollBar}
              onScroll={handleTableScroll}
              ref={scrollRef}
            >
              <div className={classes.tableWrapper}>
                <div>
                  <Swipeable
                    trackMouse
                    preventDefaultTouchmoveEvent
                    onSwiping={handleTableSwiping}
                  >
                    <Table
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                      stickyHeader
                    >
                      <EnhancedTableHead
                        // classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={list === null ? 0 : list.length}
                        headCells={headCells}
                        hasCheckbox={hasCheckbox}
                        customized={customized}
                      />
                      <EnhancedTableBody
                        headCells={headCells}
                        list={list}
                        totalList={totalList}
                        selected={selected}
                        hasCheckbox={hasCheckbox}
                        hasTotal={hasTotal}
                        handleClick={
                          hasCheckbox || expandTable ? handleClick : f => f
                        }
                        error={error}
                        loading={isLoading}
                        page={page}
                        moreFetching={moreFetching}
                        customized={customized}
                        expandTable={expandTable}
                        childColumnSet={childColumnSet}
                      />
                    </Table>
                  </Swipeable>
                </div>
              </div>
            </Scrollbars>
            {/* </div> */}
          </EnhancedTableWrap>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          // onClose={handleClose}
        >
          <SnackbarContentWrapper
            // onClose={handleClose}
            variant="warning"
            message="warning"
          />
        </Snackbar>
      </>
    );
  }
}

export default withRouter(
  withTranslation()(withStyles(styles)(withTheme(EnhancedTableContainer)))
);
