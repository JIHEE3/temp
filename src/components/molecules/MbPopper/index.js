import React from 'react';
import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
  filterListWrap: {
    // maxHeight: 300,
    zIndex: theme.zIndex.popper,
    overflow: 'hidden',
    marginTop: '5px',
    border: `1px solid ${theme.palette.primary.deep}`,
    borderRadius: '5px',
    display: 'none',
    '&.open': {
      display: 'block',
    },
  },
  // 커스텀 스크롤바 테이블에 사용시 꼭 필요한 CSS Start
  customScrollBar: {
    '& > div:first-child': {
      position: 'relative !important',
    },
  },
  popover: props => {
    const { popoverHeight = 300 } = props;
    return {
      '& > div:first-child': {
        maxHeight: popoverHeight,
      },
    };
  },
  // 커스텀 스크롤바 테이블에 사용시 꼭 필요한 CSS End
  paper: {
    color: theme.palette.common.black,
    height: '100%',
  },
}));

let index = 0;
export default function MbPopper({
  open,
  anchorRef,
  onClickAway,
  id = `mb-popper-${index++}`,
  popoverHeight,
  children,
}) {
  const classes = useStyles({ popoverHeight });

  return (
    <Popper
      className={clsx(classes.filterListWrap, { open: open })}
      open={open}
      anchorEl={anchorRef.current}
      transition
      disablePortal
      keepMounted
      placement="bottom-start"
    >
      <Paper id={id} classes={{ root: classes.paper }}>
        <ClickAwayListener onClickAway={onClickAway}>
          <Scrollbars
            className={clsx(classes.customScrollBar, classes.popover)}
          >
            {children}
          </Scrollbars>
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
}
