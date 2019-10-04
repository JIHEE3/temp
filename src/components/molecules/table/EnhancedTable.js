import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import numeral from 'numeral';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '@material-ui/core/Snackbar';

import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import FilterListIcon from '@material-ui/icons/FilterList';

import SnackbarContentWrapper from 'components/molecules/Snackbar/SnackbarContentWrapper';

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    hasCheckbox
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {hasCheckbox ? (
          <TableCell padding="checkbox" style={{ zIndex: 10 }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={!!numSelected && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        ) : null}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            style={{ zIndex: 11 }}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.orderFlag === true ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
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
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflow: 'auto',
    // 임시
    maxHeight: '774px',
    display: 'flex',
    flex: '1 0 auto',
    '& > div': {
      flex: '1 0 auto'
    }
  },
  loadingBar: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    display: 'none',
    '&.loading': {
      display: 'block'
    }
  },
  progress: {
    height: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(3)
  },
  circularProgressWrap: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba( 255, 255, 255, 0.7 )',
    display: 'none',
    '& > div': {
      margin: 'auto'
    },
    '&.loading': {
      display: 'flex'
    }
  },
  errorWrap: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto'
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

let selected = [];
export default function EnhancedTable({
  headCells,
  rows = [],
  error,
  loading,
  page = 1,
  dense,
  order = 'asc',
  orderBy = '',
  hasCheckbox = true,
  fetchData = f => f,
  handleRequestSort = f => f,
  moreFetching = false
}) {
  rows = !rows ? [] : rows;
  const classes = useStyles();
  // const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const scrollRef = React.createRef();

  useEffect(() => {
    // 정렬 및 필터링 시 체크 초기화
    if (page === 1 && moreFetching) {
      // setSelected([]);
      selected = [];
    }
  }, [page, moreFetching]);

  useEffect(() => {
    if (page === 1 && !!scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      scrollRef.current.scrollLeft = 0;
    }
  }, [page, scrollRef]);

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((n, index) => index);
      // setSelected(newSelecteds);
      selected = newSelecteds;
      return;
    }
    // setSelected([]);
    selected = [];
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

    // setSelected(newSelected);
    selected = newSelected;
  }

  // function handleChangeRowsPerPage(event) {
  //   setRowsPerPage(+event.target.value);
  //   // setPage(0);
  // }

  // function handleChangeDense(event) {
  //   setDense(event.target.checked);
  // }

  /**
   * 무한 스크롤
   */
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

  function onChangeCheckbox(event, index) {
    event.target.checked = !event.target.checked;
    handleClick(event, index);
  }

  const isSelected = key => selected.indexOf(key) !== -1;
  const open = page > 1 && error === true;

  return (
    <div className={clsx('mb-EnhancedTable', classes.root)}>
      <Paper className={classes.paper}>
        {/* <div
          className={clsx(classes.loadingBar, {
            loading: page !== 1 && moreFetching
          })}
        > */}
        {/* 무한스크롤 로딩 */}
        {/* <LinearProgress className={classes.progress} />
        </div> */}
        <div
          className={clsx(classes.circularProgressWrap, {
            loading: page === 1 && moreFetching
          })}
        >
          {/* 정렬 및 필터 로딩 */}
          <div>
            <CircularProgress className={classes.progress} />
          </div>
        </div>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div
          className={classes.tableWrapper}
          onScroll={handleTableScroll}
          ref={scrollRef}
        >
          <div>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              stickyHeader
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
                hasCheckbox={hasCheckbox}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const rowProps = !hasCheckbox
                    ? {}
                    : {
                        onClick: event => handleClick(event, index),
                        role: 'checkbox',
                        'aria-checked': isItemSelected,
                        selected: isItemSelected
                      };

                  return (
                    <TableRow hover tabIndex={-1} key={index} {...rowProps}>
                      {hasCheckbox ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={event => onChangeCheckbox(event, index)}
                          />
                        </TableCell>
                      ) : null}
                      {(() => {
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
                              {format !== '@'
                                ? numeral(row[headId]).format(format)
                                : row[headId]}
                            </TableCell>
                          );
                        }
                        return cell;
                      })()}
                    </TableRow>
                  );
                })}
                {rows.length < 5 && (
                  <TableRow style={{ height: 49 * 5 }}>
                    {page <= 1 && (loading || error || rows.length === 0) && (
                      <TableCell colSpan={headCells.length + 1}>
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
                          <div className={classes.errorWrap}>
                            <div>
                              <WarningIcon color="error" fontSize="large" />
                              <div>Error</div>
                            </div>
                          </div>
                        ) : rows.length === 0 ? (
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
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      /> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
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
    </div>
  );
}
