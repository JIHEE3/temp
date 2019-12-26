import React, { useEffect } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AdminNav from 'components/organisms/Nav/AdminNav';
import HeaderContainer from 'components/organisms/Header/HeaderContainer';

import { Scrollbars } from 'react-custom-scrollbars';

import { curMenu } from 'modules/menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/pro-solid-svg-icons';
const drawerWidth = 250;

const adminTemplateStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    transitionDuration: '0.3s',
    // position: 'fixed',
    // height: '500px',
    position: 'absolute',
    // display: 'flex',
    flex: '1 0 auto',
    top: '70px',
    bottom: '0',
    overflow: 'hidden',
    left: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(9) + 1,
    },
    backgroundColor: '#eef2f5',
    right: 0,
    // overflow: 'auto',
    overflowX: 'hidden',
    '&.navOpen': {
      left: drawerWidth,
    },
    '&.navPop': {
      left: 0,
      top: 0,
    },
    '& > div': {
      position: 'relative',
      padding: theme.spacing(3),
      width: '95%',
      flex: '1 0 auto',
    },
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
      boxSizing: 'border-box',
    },
  },
  mainSectionScroll: {
    boxSizing: 'border-box',
    padding: '0 !important',
    overflow: 'initial',
    '& > div': {
      '& > div:not(:first-child)': {
        width: 'calc(100% - 24px)',
        paddingLeft: 24,
        paddingBottom: 24,
        boxSizing: 'border-box',
      },
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  breadcrumbs: {
    color: theme.palette.primary.breadcrumbs,
  },
  currentLocation: {
    color: theme.palette.primary.breadcrumbsAccent,
  },
  greaterThan: {
    margin: '4px 8px 0',
    color: theme.palette.primary.breadcrumbsGreaterThan,
  },
}));

let navOpenVal = true;
/**
 * 현제 url 에 맞는 url path 리턴
 * @param {Map} menu
 * @param {string} curUrl
 */
const makeMenuMap = (menu, curUrl) => {
  let result = null;
  for (let curMenu of menu.values()) {
    if (result !== null) {
      break;
    }
    if (curMenu.menuUrl === curUrl) {
      result = curMenu.menuPathNm;
      break;
    } else if (typeof curMenu.subMenu !== 'undefined') {
      result = makeMenuMap(curMenu.subMenu, curUrl);
    }
  }
  return result;
};

const MainTemplate = ({ location, children }) => {
  const dispatch = useDispatch();
  const classes = adminTemplateStyles();
  const [navOpen, setNavOpen] = React.useState(navOpenVal);
  const { menu } = useSelector(({ menu }) => ({
    menu,
  }));
  const [path, setPath] = React.useState([]);
  const { isPop } = queryString.parse(location.search);

  useEffect(() => {
    let curMenuPath = menu.curMenu;
    if (menu.list !== null && curMenuPath === '') {
      curMenuPath = makeMenuMap(menu.list, location.pathname);
      if (curMenuPath === null) {
        return;
      }
      dispatch(curMenu(curMenuPath));
    }
    setPath(curMenuPath.split('>'));
  }, [menu, location, dispatch]);

  function handleDrawerToggle() {
    navOpenVal = !navOpen;
    setNavOpen(navOpenVal);
  }

  return (
    <div className={clsx('mb-AdminTemplate', classes.root)}>
      {typeof isPop === 'undefined' ? <HeaderContainer /> : ''}
      {typeof isPop === 'undefined' ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: navOpen,
            [classes.drawerClose]: !navOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: navOpen,
              [classes.drawerClose]: !navOpen,
            }),
          }}
          open={navOpen}
        >
          <AdminNav navOpen={navOpen} handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      ) : (
        ''
      )}

      <div
        className={
          typeof isPop === 'undefined'
            ? clsx(classes.content, { navOpen })
            : clsx(classes.content, 'navPop')
        }
      >
        <Scrollbars className={classes.mainSectionScroll}>
          <div id="menuCrum" className="globals-Breadcrumbs">
            {path.map((menuPath, index, array) => {
              let result = null;
              menuPath = menuPath.trim();
              if (index + 1 === array.length) {
                result = (
                  <div key={index} className={classes.currentLocation}>
                    {menuPath}
                  </div>
                );
              } else {
                result = (
                  <div key={index} className={classes.breadcrumbs}>
                    {menuPath}
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className={classes.greaterThan}
                    />
                  </div>
                );
              }

              return result;
            })}
          </div>
          <div>{children}</div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default withRouter(MainTemplate);
