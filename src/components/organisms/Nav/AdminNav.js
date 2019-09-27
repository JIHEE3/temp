import React, { useState, useEffect } from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import CloseIcon from '@material-ui/icons/Close';
import DehazeIcon from '@material-ui/icons/Dehaze';

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
    position: 'relative'
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
  paper: {
    position: 'absolute',
    top: 36,
    width: '300px',
    left: 0
  },
  icon: {
    minWidth: 'auto'
  },
  center: {
    justifyContent: 'center'
  },
  margenR0: {
    marginRight: 0
  }
}));

const subMenuStyles = makeStyles(theme => ({
  listWrap: {
    backgroundColor: theme.palette.primary[50]
  },
  nested: {
    paddingLeft: theme.spacing(6)
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
          const { seq, url, name } = menu;
          if (!openHighMenu) {
            openHighMenu = curTab === url && !open;
          }

          return (
            <ListItem
              button
              key={seq}
              className={clsx(classes.nested, { selected: curTab === url })}
              onClick={event => handleClick({ event, url })}
            >
              {/* <ListItemIcon>
                <StarBorder />
              </ListItemIcon> */}
              <ListItemText primary={name} />
            </ListItem>
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
  const { pathname = '/admin/management' } = location;
  const classes = nestedListStyles();
  // status
  const [openKeys, setOpenKeys] = useState([true]);
  const [curTab, setCurTab] = useState(pathname);

  useEffect(() => {
    setCurTab(pathname);
  }, [pathname]);

  // useSelector로 메뉴 리스트 받아오기 **아래는 임시**
  const tempMenuList = [
    {
      seq: '1',
      name: '광고 관리',
      icon: 'DraftsIcon',
      subMenu: [
        { seq: '1-1', name: '개요', url: '/admin/management' },
        { seq: '1-2', name: '캠페인 등록하기', url: '/admin/test' },
        { seq: '1-3', name: '광고 상세 관리', url: '/admin/tes1' }
      ]
    },
    {
      seq: '2',
      name: '키워드 센터',
      icon: 'SendIcon',
      subMenu: [
        { seq: '2-1', name: '대시보드', url: '/admin/statistics' },
        { seq: '2-2', name: '키워드 관리', url: '/admin/tes2' }
      ]
    },
    {
      seq: '3',
      name: '상품 관리',
      icon: 'InboxIcon',
      subMenu: [{ seq: '3-1', name: '상품 카테고리 관리', url: '/admin/admix' }]
    },
    {
      seq: '4',
      name: '보고서',
      subMenu: [
        { seq: '4-1', name: '개요', url: '/admin/mediaLive' },
        { seq: '4-2', name: '일자별 보고서', url: '/admin/test3' },
        { seq: '4-3', name: '시간대별 보고서', url: '/admin/RTB' }
      ]
    },
    {
      seq: '5',
      name: '소셜링크 보고서',
      subMenu: [
        { seq: '5-1', name: '키워드그룹별 보고서', url: '/admin/checkImg' },
        { seq: '5-2', name: '키워드별 보고서', url: '/admin/test4' },
        { seq: '5-3', name: '키워드별 CPC관리', url: '/admin/test5' }
      ]
    },
    { seq: '6', name: '여기 눌러봐요', url: '/admin/test6' },
    { seq: '7', name: '사용자 관리', url: '/admin/test7' },
    {
      seq: '8',
      name: '시스템 관리',
      subMenu: [
        { seq: '8-1', name: '그룹 관리', url: '/admin/etc' },
        { seq: '8-2', name: '메뉴 관리', url: '/admin/test8' },
        { seq: '8-3', name: '항목명 관리', url: '/admin/test9' }
      ]
    }
  ];

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
  function handleClick({ event, index, hasSubMenu, url }) {
    event.stopPropagation();
    if (hasSubMenu) {
      if (navOpen) {
        openHighMenu(index);
      }
    } else {
      history.push(url);
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
        className={classes.paper}
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
          <div key={menu.seq}>{menu.name}</div>
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
            gutterBottom
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
      className={classes.root}
    >
      {tempMenuList.map((menu, index) => {
        const open = openKeys[index];
        const { seq, subMenu, icon, url } = menu;
        const hasSubMenu = !!subMenu;

        return (
          <React.Fragment key={seq}>
            <ListItem
              button
              onClick={event => handleClick({ event, index, hasSubMenu, url })}
              onMouseEnter={
                !navOpen ? event => handlePopoverOpen({ event, subMenu }) : null
              }
              onMouseLeave={!navOpen ? handlePopoverClose : null}
              className={clsx(classes.listItemWrap, {
                selected: curTab === url
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
                <ListItemText primary={menu.name} />
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
      })}
    </List>
  );
});
