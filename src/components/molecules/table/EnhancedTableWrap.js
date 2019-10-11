import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';

import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import FilterListIcon from '@material-ui/icons/FilterList';

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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflow: 'auto',
    // 임시
    maxHeight: '774px',
    display: 'flex',
    flex: '1 0 auto',
    '& > div': {
      flex: '1 0 auto',
    },
  },
  loadingBar: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    display: 'none',
    '&.loading': {
      display: 'block',
    },
  },
  progress: {
    height: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(3),
  },
  circularProgressWrap: {
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
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTableWrap({
  columnCnt,
  selectedCnt,
  head,
  rows = [],
  error,
  loading,
  page = 1,
  dense,
  handleTableScroll,
}) {
  const classes = useStyles();
  const scrollRef = React.createRef();

  useEffect(() => {
    if (page === 1 && !!scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      scrollRef.current.scrollLeft = 0;
    }
  }, [page, scrollRef]);

  return (
    <div className={clsx('mb-EnhancedTableWrap', classes.root)}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selectedCnt} />
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
              {head}
              <TableBody>
                {rows}
                {rows.length < 5 && (
                  <TableRow style={{ height: 49 * 5 }}>
                    {page <= 1 && (loading || error || rows.length === 0) && (
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
      </Paper>
    </div>
  );
}
