import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import EnhancedTableHead from 'components/molecules/MbTable/EnhancedTableHead';
import EnhancedTableBody from 'components/molecules/MbTable/EnhancedTableBody';

function desc(a, b, orderBy) {
  let aData = a[orderBy];
  let bData = b[orderBy];

  if (!isNaN(aData) && !isNaN(bData)) {
    // 둘다 숫자면
    aData = Number(aData);
    bData = Number(bData);
  }
  if (bData < aData) {
    return -1;
  }
  if (bData > aData) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  tableCustomScrollBar: {
    '& > div:first-child': {
      position: 'relative !important',
      maxHeight: '350px',
    },
    '& > div:last-child': {
      zIndex: 11,
    },
  },
  tableWrapper: {
    display: 'flex',
    flex: '1 0 auto',
    '& > div': {
      flex: '1 0 auto',
    },
  },
}));

export default function BasicTable({
  className,
  order: propOrder,
  orderBy: propOrderBy,
  headCells,
  list = [],
  error,
  loading,
  customized,
}) {
  let scrollRef = React.createRef();
  const classes = useStyles();
  const [order, setOrder] = React.useState(propOrder);
  const [orderBy, setOrderBy] = React.useState(propOrderBy);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  return (
    <Scrollbars
      className={`${classes.tableCustomScrollBar} ${className}`}
      // onScroll={handleTableScroll}
      ref={scrollRef}
    >
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            customized={customized}
          />
          <EnhancedTableBody
            headCells={headCells}
            list={stableSort(list, getSorting(order, orderBy))}
            error={error}
            loading={loading}
            customized={customized}
          />
        </Table>
      </div>
    </Scrollbars>
  );
}
