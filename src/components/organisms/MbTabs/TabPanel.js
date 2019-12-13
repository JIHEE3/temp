import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const tabpanelStyles = theme => ({
  tabpanel: {
    backgroundColor: theme.palette.common.white,
    border: 'solid 1px #e5e8eb',
    borderRadius: '0 0 4px 4px',
    '&.isModal, &.popoverTab': {
      border: 0,
    },
  },
  tabContentBox: {
    '&.isModal': {
      // padding: 0,
    },
    '&.popoverTab': {
      padding: `20px 0`,
    },
  },
});

export default withStyles(tabpanelStyles)(
  class TabPanel extends React.Component {
    render() {
      const {
        classes,
        name,
        value,
        keyValue,
        isModal,
        popoverTab,
        children,
        ...other
      } = this.props;

      return (
        <Typography
          component="div"
          className={clsx(classes.tabpanel, { isModal, popoverTab })}
          role="tabpanel"
          hidden={value !== keyValue}
          id={`${name}-tabpanel-${keyValue}`}
          aria-labelledby={`${name}-tab-${keyValue}`}
          {...other}
        >
          <Box
            p={isModal || popoverTab ? 0 : 3}
            className={clsx(classes.tabContentBox, { isModal, popoverTab })}
          >
            {children}
          </Box>
        </Typography>
      );
    }
  }
);
