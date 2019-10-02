import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import CloseIcon from '@material-ui/icons/Close';
import DehazeIcon from '@material-ui/icons/Dehaze';

import { MENU } from 'modules/menu';

const nestedListStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflowX: 'hidden',
    '& .selected': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main
    }
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& div': {
      lineHeight: theme.spacing(1)
    }
  },
  listItemWrap: {
    justifyContent: 'center',
    position: 'relative',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  },
  listTitle: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginLeft: theme.spacing(1)
  },
  /**
   * 메뉴 숨김 보임 관련 시작
   */
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '-12px',
    ...theme.mixins.toolbar
  },
  /**
   * 메뉴 숨김 보임 관련 끝
   */
  popoverPaper: {
    position: 'absolute',
    top: 36,
    width: '300px',
    left: 0,
    zIndex: 10
  },
  icon: {
    minWidth: 'auto'
  },
  center: {
    justifyContent: 'center'
  },
  margenR0: {
    marginRight: 0
  },
  loadingWrap: {
    margin: `${theme.spacing(1)}%`
  }
}));

const subMenuStyles = makeStyles(theme => ({
  listWrap: {
    backgroundColor: theme.palette.primary[50]
  },
  nested: {
    paddingLeft: theme.spacing(6)
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}));

/**
 * 하위 메뉴
 */
function SubMenu(props) {
  const {
    className,
    menuList,
    open,
    handleClick,
    curTab,
    openHighMenuCallBack
  } = props;
  const classes = subMenuStyles();

  if (!menuList) {
    return null;
  }

  let openHighMenu = false;
  const subMenuUi = (
    <Collapse in={open} timeout="auto" unmountOnExit className={className}>
      <List component="div" disablePadding className={classes.listWrap}>
        {menuList.map(menu => {
          const { menuSeq, menuUrl, menuNm } = menu;
          if (!openHighMenu) {
            openHighMenu = curTab === menuUrl && !open;
          }

          return (
            <Tooltip key={menuSeq} title={menuNm} placement="right">
              <ListItem
                button
                className={clsx(classes.nested, {
                  selected: curTab === menuUrl
                })}
                onClick={event => handleClick({ event, menuUrl })}
              >
                {/* <ListItemIcon>
                  <StarBorder />
                </ListItemIcon> */}
                <ListItemText className={classes.ellipsis} primary={menuNm} />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Collapse>
  );

  if (openHighMenu) {
    openHighMenuCallBack();
  }

  return subMenuUi;
}

const menuPopoverId = 'menu-popover';
export default withRouter(function AdminNav(props) {
  const { t } = useTranslation();
  const { history, location, navOpen, handleDrawerToggle } = props;
  const { pathname } = location;
  const classes = nestedListStyles();
  const { menu, loading } = useSelector(({ menu, loading }) => ({
    menu: menu.list,
    loading: loading[MENU]
  }));

  // status
  const [openKeys, setOpenKeys] = useState([true]);
  const [curTab, setCurTab] = useState(pathname);

  useEffect(() => {
    setCurTab(pathname);
  }, [pathname]);

  /**
   * 상위 메뉴 오픈
   */
  function openHighMenu(index) {
    const opens = [].concat(openKeys);
    opens[index] = !opens[index];
    setOpenKeys(opens);
  }

  /**
   * nav 메뉴 클릭
   */
  function handleClick({ event, index, hasSubMenu, menuUrl }) {
    event.stopPropagation();
    if (hasSubMenu) {
      if (navOpen) {
        openHighMenu(index);
      }
    } else {
      if (!!menuUrl) {
        history.push(menuUrl);
      }
    }
  }

  function handlePopoverOpen({ event, subMenu = [] }) {
    event.stopPropagation();
    const { currentTarget } = event;
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      textContent,
      parentElement
    } = currentTarget;
    const headerHeight = 70;
    const popoverParentEl = document.getElementById(menuPopoverId);
    // popover 보여질 위치
    let popoverTop = offsetTop + headerHeight - parentElement.scrollTop;
    let popContent = popoverParentEl && popoverParentEl.firstChild;

    if (popoverParentEl === null) {
      var popover = document.createElement('div');
      popover.setAttribute('id', menuPopoverId);
      document.getElementById('root').appendChild(popover);
    } else {
      popoverParentEl.style.display = 'block';
    }

    // popover 가 window 벗어날 경우 벗어나지 않도록 위치 조정
    if (popContent) {
      if (popoverTop + popContent.offsetHeight > window.innerHeight) {
        popoverTop =
          popoverTop - popContent.offsetHeight + currentTarget.offsetHeight;
      }

      if (popoverTop + popContent.offsetHeight > window.innerHeight) {
        popoverTop =
          popoverTop -
          (popoverTop + popContent.offsetHeight - window.innerHeight);
      }
    }

    ReactDOM.render(
      <Paper
        className={clsx('mb-AdminNavPopover', classes.popoverPaper)}
        style={{
          top: popoverTop,
          left:
            offsetLeft +
            offsetWidth +
            (parentElement.offsetWidth - parentElement.clientWidth)
        }}
      >
        {textContent}
        {subMenu.map(menu => (
          <div key={menu.menuSeq}>{menu.menuNm}</div>
        ))}
      </Paper>,
      document.getElementById(menuPopoverId)
    );
  }

  function handlePopoverClose(event) {
    event.stopPropagation();
    document.getElementById(menuPopoverId).style.display = 'none';
  }

  return (
    <List
      className={clsx('mb-AdminNav', classes.root)}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          className={clsx(classes.listHeader, { [classes.center]: !navOpen })}
        >
          <Typography
            variant="h5"
            className={clsx({ [classes.hide]: !navOpen })}
          >
            Mobon {t('관리자')}
          </Typography>
          <div
            className={clsx(classes.toolbar, { [classes.margenR0]: !navOpen })}
          >
            <IconButton onClick={handleDrawerToggle}>
              {navOpen ? <CloseIcon /> : <DehazeIcon />}
            </IconButton>
          </div>
        </ListSubheader>
      }
    >
      {loading ? (
        <div className={classes.loadingWrap}>
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      ) : (
        menu.map((menu, index) => {
          const open = openKeys[index];
          const { menuSeq, menuNm, subMenu, icon, menuUrl } = menu;
          const hasSubMenu = !!subMenu;

          return (
            <React.Fragment key={menuSeq}>
              <ListItem
                button
                onClick={event =>
                  handleClick({ event, index, hasSubMenu, menuUrl })
                }
                onMouseEnter={
                  !navOpen
                    ? event => handlePopoverOpen({ event, subMenu })
                    : null
                }
                onMouseLeave={!navOpen ? handlePopoverClose : null}
                className={clsx(classes.listItemWrap, {
                  selected: curTab === menuUrl
                })}
              >
                <ListItemIcon className={classes.icon}>
                  {(() => {
                    let Icon = <FilterHdrIcon />;
                    switch (icon) {
                      case 'SendIcon':
                        Icon = <SendIcon />;
                        break;
                      case 'DraftsIcon':
                        Icon = <DraftsIcon />;
                        break;
                      case 'InboxIcon':
                        Icon = <InboxIcon />;
                        break;
                      default:
                        break;
                    }
                    return Icon;
                  })()}
                </ListItemIcon>

                <div
                  className={clsx(classes.listTitle, {
                    [classes.hide]: !navOpen
                  })}
                >
                  <ListItemText primary={menuNm} />
                  {hasSubMenu ? open ? <ExpandLess /> : <ExpandMore /> : null}
                </div>
              </ListItem>
              <SubMenu
                menuList={subMenu}
                open={open}
                handleClick={handleClick}
                curTab={curTab}
                openHighMenuCallBack={() => openHighMenu(index)}
                className={clsx({ [classes.hide]: !navOpen })}
              />
            </React.Fragment>
          );
        })
      )}
    </List>
  );
});
