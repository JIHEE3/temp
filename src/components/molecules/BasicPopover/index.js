import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const style = theme => ({
  popover: {
    zIndex: theme.zIndex.popper,
    display: 'none',
    '&.open': {
      display: 'block',
    },
  },
  paper: {
    padding: 18,
  },
});

/**
 *
 * @param {json} param0
 */
export default withStyles(style)(
  class BasicPopover extends React.Component {
    constructor(props) {
      super(props);
      this.anchorRef = React.createRef();

      this.state = {
        open: false,
      };
    }

    handleToggle = () => {
      this.setState({
        ...this.state,
        open: !this.state.open,
      });
    };

    handleClose = event => {
      event.stopPropagation();
      if (this.state.open === false) return false;
      const { anchorRef } = this;
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      this.setState({
        ...this.state,
        open: false,
      });
    };

    render() {
      const { anchorRef, handleToggle, handleClose } = this;
      const { open } = this.state;
      const {
        classes,
        target,
        className,
        id,
        children,
        placement,
      } = this.props;

      return (
        <>
          <div className={className} onClick={handleToggle} ref={anchorRef}>
            {target}
          </div>
          <Popper
            className={clsx(classes.popover, { open: open })}
            open={open}
            anchorEl={anchorRef.current}
            id={id}
            transition
            disablePortal
            keepMounted
            placement={placement}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Paper className={classes.paper}>{children}</Paper>
            </ClickAwayListener>
          </Popper>
        </>
      );
    }
  }
);
