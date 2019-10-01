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
  content: {
    transitionDuration: '0.4s',
    // position: 'fixed',
    // height: '500px',
    position: 'absolute',
    display: 'flex',
    flex: '1 0 auto',
    top: '70px',
    bottom: '0',
    left: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(9) + 1
    },
    right: 0,
    // overflow: 'auto',
    overflowX: 'hidden',
    '&.navOpen': {
      left: drawerWidth
    },
    '& > div': {
      position: 'relative',
      padding: theme.spacing(3),
      width: '95%',
      flex: '1 0 auto'
    }
  },
  drawer: {
    boxShadow: '3.5px 3.5px 5px 0 rgba(0, 0, 0, 0.1)',
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
    <div className={clsx('mb-AdminTemplate', classes.root)}>
      <HeaderContainer />
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
      <div className={clsx(classes.content, { navOpen })}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
