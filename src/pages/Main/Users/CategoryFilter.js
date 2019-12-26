import React from 'react';
import { withTranslation } from 'react-i18next';
import numeral from 'numeral';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { withTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/pro-regular-svg-icons';

import MbButton from 'components/atoms/MbButton';
import PopoverFooter from 'components/atoms/PopoverFooter';
import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';
import SearchInput from 'components/molecules/SearchInput';

import { GET_CATEGORY } from 'modules/common';

const styles = theme => ({
  filterWrap: {
    padding: '30px 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 500,
  },
  search: {
    margin: '26px 0 16px 0',
  },
  content: {
    display: 'flex',
    // width: 369px;
    height: 310,
    border: theme.palette.box.border,
    borderRadius: 4,
    '& > div': {
      overflow: 'auto',
    },
    '& > div:not(:last-child)': {
      borderRight: theme.palette.box.border,
    },
  },
  listWrap: {
    minWidth: 164,
  },
  listItem: {
    fontSize: 14,
    padding: '12px 19px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    height: 46,
    '&.mb-mainCategory': {
      padding: '12px 14px',
      '&.selected': {
        backgroundColor: theme.palette.common.selectedGreen,
        color: theme.palette.primary.deep,
      },
    },

    '&.hidden': {
      display: 'none',
    },

    '&:hover': {
      backgroundColor: theme.palette.primary[50],
    },

    '& > .mb-category.selected': {
      borderRadius: 16,
      color: theme.palette.primary.deep,
      border: `solid 1px ${theme.palette.primary.deep}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 10px',
      marginLeft: -11,
    },
  },
  count: {
    color: theme.palette.common.gray2,
    marginLeft: 4,
    fontSize: '12px',
  },
  icon: {
    marginLeft: 'auto',
    fontSize: '21px',
  },
  selectedName: {
    color: theme.palette.common.gray3,
    padding: '6px 12px',
    backgroundColor: theme.palette.common.gray4,
    border: theme.palette.box.border,
    borderRadius: 4,
    marginTop: 20,
  },
  division: {
    margin: '0 8px',
  },
  footer: {
    justifyContent: 'center',
  },
  footerButton: {
    padding: '10px 34px',
    boxShadow: 'none',
    marginRight: 10,
  },
  infoDiv: {
    backgroundColor: theme.palette.tab.headerBg,
    color: theme.palette.common.gray2,
    padding: '13px 10px',
  },
  infoText: {
    marginLeft: 4,
  },
});

/**
 * 카테고리 필터 (사용자 페이지말고 공통필터로 옮기기!)
 */
class CategoryFilter extends React.Component {
  initState = {
    selectedCode: null,
    // 마지막으로 선택한 dapth
    selectedDepth: null,
    selectKeyJson: {},
    // 필터된 seq
    filterSeq: null,
    // 필터링 라벨에 나올 필터리스트
    filterNameArra: [],
    searchValue: '',
  };
  inputRef = null;
  closePopover = null;

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };

    this.inputRef = React.createRef();
  }

  initializationFunc = () => {
    this.selectedCategoryNameArray = [];
    this.inputRef.current.value = '';
    this.setState({
      ...this.initState,
    });
  };

  componentDidMount() {
    const { categoryList, getCategory } = this.props;

    if (categoryList.size === 0) {
      getCategory();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { initialization } = this.props;

    if (initialization) {
      this.initializationFunc();
    }
  }

  /**
   * 카테고리 분류 선택
   */
  handleOnCategory = (code, depth = 0) => e => {
    const { categoryList, getCategory } = this.props;
    let { selectedCode, selectedDepth } = this.state;
    const newState = {
      ...this.state,
    };

    if (depth === 0) {
      selectedCode = code;
      newState['selectedCode'] = code;
      newState['selectKeyJson'] = { [depth]: code };
    }

    newState['selectedDepth'] = depth;
    newState['selectKeyJson'] = {
      ...newState.selectKeyJson,
      [depth]: code,
    };

    for (let keyDepth in newState['selectKeyJson']) {
      if (newState['selectKeyJson'].hasOwnProperty(keyDepth)) {
        if (keyDepth > depth) {
          // 사용자가 선택한 이후의 뎁스 정보는 지움
          delete newState['selectKeyJson'][keyDepth];
        }
      }
    }

    if (typeof categoryList.get(selectedCode).children === 'undefined') {
      // 선택한 category list 가 스토어에 존재하지 않는 경우
      getCategory({ code: selectedCode });
    } else {
      //
      const { children } = categoryList.get(selectedCode);
      if (depth !== 0 && typeof children[depth] === 'undefined') {
        // 마지막 뎁스 선택시
        newState['selectedDepth'] = selectedDepth;
      }
    }

    this.setState(newState);
  };

  /**
   * 카테고리 검색
   */
  handleSearch = value => {
    this.setState({
      ...this.state,
      searchValue: value.toLowerCase(),
    });
  };

  /**
   * 필터창 닫는 핸들링 받아오는 함수
   */
  getOnClose = handleClose => {
    this.closePopover = handleClose;
  };

  /**
   * 적용 버튼
   */
  handleOnApply = () => {
    const { selectedCategoryNameArray } = this;
    const { selectedDepth, selectKeyJson } = this.state;
    const { handleOnchangeFilter } = this.props;
    const selectedSeq = selectKeyJson[selectedDepth];
    handleOnchangeFilter({ ctgrSeq: selectedSeq });
    this.setState({
      ...this.state,
      filterSeq: selectedSeq,
      filterNameArra: [...selectedCategoryNameArray],
    });
    this.closePopover();
  };

  /**
   * 취소버튼
   */
  handleOnCancel = () => {
    const { handleOnchangeFilter } = this.props;
    this.initializationFunc();
    handleOnchangeFilter({ ctgrSeq: null });
    this.closePopover();
  };

  render() {
    this.selectedCategoryNameArray = [];
    const { t, classes, theme, categoryList } = this.props;
    const {
      selectKeyJson,
      selectedDepth,
      selectedCode,
      filterSeq,
      filterNameArra,
      searchValue,
    } = this.state;
    const {
      handleOnCategory,
      handleSearch,
      handleOnApply,
      getOnClose,
      selectedCategoryNameArray,
      handleOnCancel,
      inputRef,
    } = this;
    const selectedSeq = selectKeyJson[selectedDepth];

    return (
      <PopoverFilterWrap
        selectedLabel={filterSeq !== null ? filterNameArra.join(' > ') : ''}
        label={filterSeq !== null ? '' : t('카테고리 검색')}
        filtered={filterSeq !== null}
        id="mb-categoryFilter-popper"
        popoverHeight={600}
        getOnClose={getOnClose}
        filterList={
          <div className={classes.filterWrap}>
            <div className={classes.title}>카테고리 검색</div>
            <SearchInput
              placeholder={t('검색어를 입력하세요.')}
              handleSearch={handleSearch}
              className={classes.search}
              inputRef={inputRef}
            />
            <div className={classes.content}>
              {/* 대분류 리스트 */}
              <div className={classes.listWrap}>
                {(() => {
                  const result = [];
                  categoryList.forEach((category, key) => {
                    const { code, name, cnt } = category;
                    const selected = selectedCode === code;
                    let hidden = false;

                    if (selected) {
                      selectedCategoryNameArray.push(name);
                    }

                    if (name.toLowerCase().indexOf(searchValue) < 0) {
                      hidden = true;
                    }

                    result.push(
                      <div
                        key={code}
                        className={clsx('mb-mainCategory', classes.listItem, {
                          selected,
                          hidden,
                        })}
                        onClick={handleOnCategory(code)}
                      >
                        <span className={classes.name}>{name}</span>
                        <span className={classes.count}>
                          ({numeral(cnt).format()})
                        </span>
                        {selected && (
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            color={theme.palette.primary.deep}
                            className={classes.icon}
                          />
                        )}
                      </div>
                    );
                  });
                  return result;
                })()}
              </div>
              {/* 소분류 리스트들 */}
              {selectedDepth === null ? (
                <div className={classes.infoDiv}>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                  <span className={classes.infoText}>
                    대카테고리를 선택해 주세요
                  </span>
                </div>
              ) : (
                (() => {
                  const { children } = categoryList.get(selectedCode);
                  const result = [];
                  if (typeof children !== 'undefined') {
                    for (let i = 1; i <= selectedDepth + 1; i++) {
                      // 이전 뎁스에서 무엇을 선택했는지
                      const parentSeq = selectKeyJson[i - 1];

                      if (typeof children[i] !== 'undefined') {
                        // 보여줄 리스트가 있으면
                        const curList = children[i].get(parentSeq);
                        const innerResult = [];
                        for (let j = 0; j < curList.length; j++) {
                          const { seq, name, cnt } = curList[j];
                          const selected = seq === selectKeyJson[i];
                          let hidden = false;

                          if (selected) {
                            selectedCategoryNameArray.push(name);
                          }

                          if (name.toLowerCase().indexOf(searchValue) < 0) {
                            hidden = true;
                          }

                          innerResult.push(
                            <div
                              key={seq}
                              className={clsx(classes.listItem, { hidden })}
                              onClick={handleOnCategory(seq, i)}
                            >
                              <div
                                className={clsx('mb-category', { selected })}
                              >
                                <span className={classes.name}>{name}</span>
                                <span className={classes.count}>
                                  ({numeral(cnt).format()})
                                </span>
                              </div>
                            </div>
                          );
                        }

                        result.push(
                          <div key={parentSeq} className={classes.listWrap}>
                            {innerResult}
                          </div>
                        );
                      }
                    }
                  }

                  return result;
                })()
              )}
            </div>
            {selectedCategoryNameArray.length !== 0 && (
              <div className={classes.selectedName}>
                {selectedCategoryNameArray.map((name, index) => {
                  if (index !== 0) {
                    return (
                      <React.Fragment key={`${index}_${name}`}>
                        <span className={classes.division}>></span>
                        {name}
                      </React.Fragment>
                    );
                  } else {
                    return <React.Fragment key={name}>{name}</React.Fragment>;
                  }
                })}
              </div>
            )}
            <PopoverFooter className={classes.footer}>
              <div>
                <MbButton
                  className={classes.footerButton}
                  color={theme.palette.common.gray}
                  onClick={handleOnCancel}
                >
                  {t('취소')}
                </MbButton>
                <MbButton
                  className={classes.footerButton}
                  color={theme.palette.primary.deep}
                  onClick={handleOnApply}
                  disabled={
                    selectedDepth === null ||
                    selectedDepth === 0 ||
                    filterSeq === selectedSeq
                  }
                >
                  {t('적용')}
                </MbButton>
              </div>
            </PopoverFooter>
          </div>
        }
      />
    );
  }
}

export default withTranslation()(
  withTheme(
    connect(
      ({ common }) => ({ categoryList: common.categoryList }),
      dispatch => ({
        getCategory: param => dispatch({ type: GET_CATEGORY, payload: param }),
      })
    )(withStyles(styles)(CategoryFilter))
  )
);
