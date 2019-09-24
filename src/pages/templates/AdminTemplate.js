import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AdminNav from 'components/organisms/Nav/AdminNav';
import HeaderContainer from 'components/organisms/Header/HeaderContainer';

const drawerWidth = 250;

const adminTemplateStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  mainSplit: {
    display: 'flex',
    position: 'relative',
    paddingLeft: '250px',
    transitionDuration: '0.3s'
  },
  folded: {
    paddingLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(9) + 1
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'fixed',
    top: '70px',
    bottom: 0,
    zIndex: 10,
    overflowX: 'hidden',
    left: 0,
    '& > div': {
      position: 'relative',
      boxSizing: 'border-box'
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  }
}));

const AdminTemplate = ({ children }) => {
  const classes = adminTemplateStyles();
  const [navOpen, setNavOpen] = React.useState(true);

  function handleDrawerToggle() {
    setNavOpen(!navOpen);
  }

  return (
    <div className={classes.root}>
      <HeaderContainer />
      <div className={clsx(classes.mainSplit, { [classes.folded]: !navOpen })}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: navOpen,
            [classes.drawerClose]: !navOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: navOpen,
              [classes.drawerClose]: !navOpen
            })
          }}
          open={navOpen}
        >
          <AdminNav navOpen={navOpen} handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
