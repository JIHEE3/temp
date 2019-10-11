import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import numeral from 'numeral';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '@material-ui/core/Snackbar';

import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import FilterListIcon from '@material-ui/icons/FilterList';

import SnackbarContentWrapper from 'components/molecules/Snackbar/SnackbarContentWrapper';
import EnhancedTableWrap from 'components/molecules/table/EnhancedTableWrap';
import EnhancedTableHead from 'components/molecules/table/EnhancedTableHead';

import { tableHeaders } from 'lib/api/common';
import { fetchHeader, under2camel } from 'lib/commonLib';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/**
 * row component
 * @param {json} param0
 */
const MbTableRow = ({
  index,
  row,
  headCells,
  isSelected,
  hasCheckbox,
  handleClick,
}) => {
  const [selected, setSelected] = React.useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  /**
   * row 한줄 클릭 함수
   */
  function onClick() {
    setSelected(!selected);
    handleClick();
  }

  const rowProps = !hasCheckbox
    ? {}
    : {
        onClick: onClick,
        role: 'checkbox',
        'aria-checked': selected,
        selected: selected,
      };

  /**
   * row 한줄 만들기
   */
  const makeCell = () => {
    const cell = [];
    for (let i = 0; i < headCells.length; i++) {
      const headCell = headCells[i];
      const { id: headId, numeric, format } = headCell;
      const align = numeric ? 'right' : 'left';
      if (typeof row[headId] === 'undefined') {
        // header 에 있는 값만 body에 뿌려줌
        continue;
      }
      cell.push(
        <TableCell key={headId} align={align}>
          {format !== '@' ? numeral(row[headId]).format(format) : row[headId]}
        </TableCell>
      );
    }
    return cell;
  };

  return (
    <TableRow hover tabIndex={-1} key={index} {...rowProps}>
      {hasCheckbox ? (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} />
        </TableCell>
      ) : null}
      {makeCell()}
    </TableRow>
  );
};

let page = 1;
let selected = [];
export default function EnhancedTableContainer({
  dense,
  order: orderProp = 'desc',
  orderBy: orderByProp = '',
  hasCheckbox = true,
  // 부모 컴포넌트로 부터 row 커스텀 함수받아서 실행시키기
  // 헤더명 별로 key(헤더명) value(jsx로 children 받아서 넣어주게 정의해놓은)
  customizingRowFunction,
  headerUrl,
  dataReqPromise,
  params,
}) {
  const [headCells, setHeadCells] = useState([]);
  const [list, setList] = useState(null);
  const [error, setError] = useState(false);
  // const [moreFetching, setMoreFetching] = useState(false);
  let moreFetching = false;
  const [order, setOrder] = React.useState(orderProp);
  const [orderBy, setOrderBy] = React.useState(orderByProp);
  const isLoading = list === null && error !== true;

  useEffect(() => {
    // 마운팅 됐을 때 페이지 1 요청 끝나고 또 2 요청하게 해서 데이터 가지고 있기 ( 스크롤시 버벅거리기 때문에)
    fetchHeader(() => tableHeaders(headerUrl)).then(headers =>
      setHeadCells(headers)
    );
  }, []);

  const fetchList = () => {
    // get datas
    dataReqPromise({
      ...params,
      page,
      order: under2camel(orderBy),
      sort: order,
      limit: 100,
    })
      .then(response => {
        const { data } = response.data;
        const orgList = !list || page === 1 ? [] : list;
        const newData = orgList.concat(data);
        setList(newData);
        setError(false);
      })
      .catch(error => {
        console.log(error);
        page -= 1;
        setError(true);
        if (page === 0) {
          setList(null);
        }
      })
      .finally(() => {
        // setMoreFetching(false);
        moreFetching = false;
      });
  };

  useEffect(fetchList, [order, orderBy]);

  useEffect(() => {
    return () => {
      selected = [];
    };
  });

  // 수정해야함
  if (isLoading) {
    selected = [];
  }

  /**
   * 다음 페이지 정보 받아옴
   */
  function fetchData() {
    // setMoreFetching(true);
    moreFetching = true;
    page += 1;
    fetchList();
  }

  /**
   * odering
   * @param {} event
   * @param {string} property ordering 할 header id
   */
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    page = 1;
    // setMoreFetching(true);
    moreFetching = true;
  }

  function handleTableScroll(event) {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;

    if (
      scrollTop !== 0 &&
      scrollHeight - scrollTop < clientHeight * 3 &&
      // scrollHeight - scrollTop <= clientHeight &&
      moreFetching === false
    ) {
      fetchData();
    }
  }

  // 배열말고 json 으로 변경하기
  function handleClick(event, key) {
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
    selected = newSelected;
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = [];
      for (let i = 0; i < list.length; i++) {
        newSelecteds.push(i);
      }
      selected = newSelecteds;
      return;
    }
    selected = [];
  }
  console.log(selected);
  const isSelected = key => selected.indexOf(key) !== -1;
  const open = page > 1 && error === true;
  return (
    <>
      <EnhancedTableWrap
        head={
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
          />
        }
        rows={
          list === null
            ? []
            : list.map((row, index) => (
                <MbTableRow
                  key={index}
                  index={index}
                  row={row}
                  headCells={headCells}
                  isSelected={isSelected(index)}
                  hasCheckbox={hasCheckbox}
                  handleClick={event => handleClick(event, index)}
                />
              ))
        }
        error={error}
        loading={isLoading}
        page={page}
        columnCnt={headCells.length}
        selectedCnt={selected.length}
        dense={dense}
        hasCheckbox={hasCheckbox}
        handleTableScroll={handleTableScroll}
      />
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
