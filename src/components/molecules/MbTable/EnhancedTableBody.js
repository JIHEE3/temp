import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
// import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Skeleton from '@material-ui/lab/Skeleton';
import WarningIcon from '@material-ui/icons/Warning';

import MbDataState from 'components/atoms/MbDataState';

import { makeRowColumn } from 'lib/commonLib';

const styles = theme => ({
  errorWrap: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
    },
  },
  tableRowRoot: {
    height: '42px',
  },
  expandRow: {
    cursor: 'pointer',
    '&.open': {
      backgroundColor: '#d1e5bd',
    },
  },
  isChild: {
    backgroundColor: '#f4f9ef',
  },
  cell: {
    fontSize: 13,
    borderBottom: theme.palette.box.border,
    // 테이블 th, td 커스텀 css
    '& div.mb-corpName-text': {
      color: theme.palette.table.cell.corpName,
      width: 120,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '&.mb-adverCnt': {
      color: theme.palette.table.cell.adverCnt,
    },
    '&.mb-parCnt': {
      color: theme.palette.table.cell.parCnt,
    },
    '&.mb-convRate': {
      color: theme.palette.table.cell.convRate,
    },
    '&.mb-userId': {
      color: theme.palette.table.cell.userId,
    },
    '&.mb-mobSessionRoas': {
      color: theme.palette.table.cell.mobSessionRoas,
    },
    '&.mb-sessionRoas': {
      color: theme.palette.table.cell.sessionRoas,
    },
    '&.mb-directRoas': {
      color: theme.palette.table.cell.directRoas,
    },
    '&.mb-roas': {
      color: theme.palette.table.cell.roas,
    },
    '&.mb-ecpm': {
      color: theme.palette.table.cell.ecpm,
    },
    '&.mb-orderAmt, &.mb-mobRoas': {
      color: theme.palette.table.cell.orderAmt,
    },
    '&.mb-usedPoint, &.mb-totalUsedPoint': {
      color: theme.palette.table.cell.usedPoint,
      // fontWeight: 'bold',
    },
    '&.mb-point': {
      color: theme.palette.table.cell.point,
      //  fontWeight: 'bold',
    },
    '&.mb-advrtsAmt': {
      color: theme.palette.table.cell.advrtsAmt,
      // fontWeight: 'bold',
    },
    '&.mb-avgAdvrtsAmt': {
      color: theme.palette.table.cell.avgAdvrtsAmt,
      // fontWeight: 'bold',
    },
    '&.mb-parEprsCnt': {
      color: theme.palette.table.cell.parEprsCnt,
      // fontWeight: 'bold',
    },
    '&.mb-avgOrderAmt': {
      color: theme.palette.table.cell.avgOrderAmt,
    },
    '&.mb-prdtTrgtOccRate': {
      color: theme.palette.table.cell.prdtTrgtOccRate,
    },
    '&.mb-clickCnt': {
      color: theme.palette.table.cell.clickCnt,
      // fontWeight: 'bold',
    },
    '&.mb-clickRate': {
      color: theme.palette.table.cell.clickRate,
      // fontWeight: 'bold',
    },
    '&.mb-ageRange div': {
      width: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '&.mb-kpi div': {
      width: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '&.mb-grpStr div': {
      width: 120,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  totalCell: {
    height: 42,
    boxSizing: 'border-box',
    backgroundColor: '#f6f6f9',
    borderTop: theme.palette.box.border,
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
    position: 'sticky',
  },
});

/**
 * row component
 */
class MbTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.isSelected,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isSelected } = nextProps;

    this.setState({
      selected: isSelected,
    });
  }

  /**
   * row 한줄 클릭 함수
   */
  onClick = () => {
    this.setState({
      selected: !this.state.selected,
    });
    this.props.handleClick();
  };

  /**
   * row 한줄 만들기
   */
  makeCell = () => {
    const {
      classes = {},
      headCells,
      row,
      customized = {},
      isTotal,
      childColumnSet,
    } = this.props;
    const cell = [];
    for (let headCell of headCells.values()) {
      const {
        id: headId,
        align,
        format,
        type,
        className,
        isAddColumn = false,
        makeRowFunc,
      } = headCell;
      const isChild = row.isChild;
      let content = row[headId];
      let title = null;

      if (
        isChild !== true &&
        isAddColumn === false &&
        (typeof row[headId] === 'undefined' || headId === 'SEQ')
      ) {
        // header 에 있는 값만 body에 뿌려줌
        continue;
      }

      if (typeof makeRowFunc !== 'undefined') {
        // 화면에서 추가하는 column
        content = makeRowFunc(row);
      } else {
        if (typeof customized[headId] !== 'undefined') {
          if (customized[headId].merged === true) {
            // 테이블 내용 합쳐진 경우
            continue;
          } else {
            content = customized[headId].makeBody(row, headCells);
          }
        } else if (isChild && typeof childColumnSet[headId] !== 'undefined') {
          // 세부사항 tr 이면서
          content = childColumnSet[headId]();
        } else {
          content = makeRowColumn(content, type, format);
          title = content;
        }
      }

      let makeCellClass;
      if (isTotal) {
        makeCellClass = clsx(className, classes.cell, classes.totalCell);
      } else {
        makeCellClass = clsx(className, classes.cell);
      }

      cell.push(
        <TableCell
          title={title}
          className={makeCellClass}
          key={headId}
          align={align}
        >
          <div>{content}</div>
        </TableCell>
      );
    }
    return cell;
  };

  render() {
    const { selected } = this.state;
    const {
      classes,
      hasCheckbox,
      index,
      isTotal,
      handleClick,
      row = {},
      expandTable,
    } = this.props;
    const { onClick } = this;

    const rowProps =
      isTotal || !hasCheckbox
        ? {}
        : {
            onClick: onClick,
            role: 'checkbox',
            'aria-checked': selected,
            selected: selected,
          };

    if (
      row[Object.keys(row)[0]] === 'WEB' ||
      row[Object.keys(row)[0]] === 'MOBILE'
    ) {
      if (row.isOpen === false || typeof row.isOpen === 'undefined') {
        row.display = false;
      }
      row.isChild = true;
    } else {
      row.childrenCnt = 2;
    }

    return (
      <TableRow
        hover
        tabIndex={-1}
        key={index}
        onClick={handleClick}
        {...rowProps}
        style={row.display === false ? { display: 'none' } : null}
        className={clsx({
          [classes.isChild]: row.isChild,
          [classes.expandRow]: expandTable && !row.isChild,
          open: row.isOpen,
        })}
        classes={{ root: classes.tableRowRoot }}
      >
        {!isTotal && hasCheckbox ? (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} />
          </TableCell>
        ) : null}
        {hasCheckbox && isTotal ? (
          <TableCell className={classes.cell} padding="checkbox"></TableCell>
        ) : null}
        {this.makeCell()}
      </TableRow>
    );
  }
}

export default withStyles(styles)(
  class EnhancedTableBody extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      const {
        list: nextList,
        totalList: nextTotalList,
        selected: nextSelected = [],
        moreFetching,
        headCells: nextHeadCells,
        error: nextError,
      } = nextProps;
      const { list, totalList, selected = [], headCells, error } = this.props;

      if (
        nextError !== error ||
        // 리스트 다를때 랜더링
        nextList !== list ||
        nextTotalList !== totalList ||
        // head cell 다를때 랜더링
        headCells !== nextHeadCells ||
        // 전체선택 관련 변경시 랜더링
        (moreFetching !== true &&
          list !== null &&
          ((selected.length !== 0 && nextSelected.length === 0) ||
            (selected.length !== list.length &&
              nextSelected.length === nextList.length)))
      ) {
        return true;
      } else {
        return false;
      }
    }

    render() {
      const {
        classes,
        headCells,
        list = [],
        hasTotal,
        totalList = null,
        selected = [],
        hasCheckbox,
        handleClick = f => f,
        error = false,
        loading,
        page = 0,
        customized,
        expandTable,
        childColumnSet,
      } = this.props;

      const columnCnt = Array.isArray(headCells)
        ? headCells.length
        : headCells.size === undefined
        ? 0
        : headCells.size;
      const isSelected = key => selected.indexOf(key) !== -1;

      return (
        <>
          {hasTotal && !error && (
            <TableHead>
              {totalList === null ? (
                <TableRow tabIndex={-1}>
                  <TableCell
                    className={classes.totalCell}
                    colSpan={columnCnt + 1}
                  >
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ) : (
                <MbTableRow
                  classes={{
                    totalCell: classes.totalCell,
                    cell: classes.cell,
                  }}
                  row={totalList[0]}
                  headCells={headCells}
                  customized={customized}
                  hasCheckbox={hasCheckbox}
                  isTotal={true}
                />
              )}
            </TableHead>
          )}
          <TableBody>
            {/* {list === null || list.length < 5 ? ( */}
            {list === null || list.length === 0 ? (
              <TableRow style={{ height: 49 * 5 }}>
                {page <= 1 && (loading || error || list.length === 0) && (
                  <TableCell colSpan={columnCnt + 1}>
                    {loading ? (
                      <>
                        <Skeleton />
                        <Skeleton width="60%" />
                        <Skeleton />
                        <Skeleton width="60%" />
                        <Skeleton />
                        <Skeleton width="60%" />
                      </>
                    ) : error ? (
                      <MbDataState
                        className={classes.errorWrap}
                        state="error"
                      />
                    ) : list.length === 0 ? (
                      <div className={classes.errorWrap}>
                        <div>
                          <WarningIcon fontSize="large" />
                          <div>No Data</div>
                        </div>
                      </div>
                    ) : null}
                  </TableCell>
                )}
              </TableRow>
            ) : (
              <>
                {list.map((row, index) => (
                  <MbTableRow
                    classes={classes}
                    key={index}
                    index={index}
                    row={row}
                    headCells={headCells}
                    isSelected={isSelected(index)}
                    hasCheckbox={hasCheckbox}
                    handleClick={event => handleClick(event, index)}
                    customized={customized}
                    expandTable={expandTable}
                    childColumnSet={childColumnSet}
                  />
                ))}
              </>
            )}
          </TableBody>
        </>
      );
    }
  }
);
