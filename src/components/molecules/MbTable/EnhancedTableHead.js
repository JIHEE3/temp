import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles(theme => ({
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
  orderIco: {
    '& svg': {
      opacity: 0.4,
    },
    '&:hover svg': {
      opacity: 1,
    },
  },
  sortIcon: {
    marginLeft: 8,
    transition: 'all ease 0.4s',

    '&.active svg': {
      color: theme.palette.table.text,
      opacity: 1,
    },

    '&.asc': {
      transform: 'rotate(180deg)',
    },
    '&.desc': {
      transform: 'rotate(0deg)',
    },
  },
  tableRowRoot: {
    height: 44,
  },
  mbTableHeadCell: {
    flexDirection: 'row',
    color: theme.palette.table.text,
    backgroundColor: theme.palette.table.headCellBg,
    borderTop: '1px solid rgba(224,224,224,1)',
    cursor: 'pointer',
  },
}));

export default function EnhancedTableHead({
  // classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
  hasCheckbox,
  customized = {},
}) {
  const classes = useStyles();

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const makeHeadCell = () => {
    const result = [];
    for (let headCell of headCells.values()) {
      const {
        id,
        disablePadding,
        orderFlag,
        label,
        className,
        align,
      } = headCell;
      if (id !== 'SEQ') {
        let content = label;
        if (typeof customized[id] !== 'undefined') {
          if (customized[id].merged === true) {
            continue;
          } else if (typeof customized[id].makeHead !== 'undefined') {
            content = customized[id].makeHead(headCells);
          }
        }
        result.push(
          <TableCell
            className={className}
            classes={{ root: classes.mbTableHeadCell }}
            key={id}
            style={{ zIndex: 11 }}
            align={align}
            padding={disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === id ? order : false}
          >
            {orderFlag === true ? (
              <TableSortLabel
                className={classes.orderIco}
                active={orderBy === id}
                direction={order}
                onClick={createSortHandler(id)}
                IconComponent={() => {
                  return (
                    <div
                      className={clsx(classes.sortIcon, {
                        active: orderBy === id,
                        desc: order === 'desc',
                        asc: order === 'asc',
                      })}
                    >
                      <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                  );
                }}
              >
                {content}
                {orderBy === id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{content}</>
            )}
          </TableCell>
        );
      }
    }
    return result;
  };

  return (
    <TableHead>
      <TableRow className={classes.tableRowRoot}>
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
        {makeHeadCell()}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
