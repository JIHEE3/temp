import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { withRouter, useRouteMatch } from 'react-router-dom';
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
import Skeleton from '@material-ui/lab/Skeleton';

import ExpandMore from '@material-ui/icons/ExpandMore';
import DehazeIcon from '@material-ui/icons/Dehaze';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserEdit,
  faCube,
  faArchive,
  faAnalytics,
  faCoins,
} from '@fortawesome/pro-duotone-svg-icons';

import { MENU, curMenu } from 'modules/menu';
import { Scrollbars } from 'react-custom-scrollbars';
import MbSVG from 'components/atoms/MbSVG';

const nestedListStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#3a4652',
    overflowX: 'hidden',
    color: theme.palette.primary.menuColor,
    '& .selected': {
      color: theme.palette.primary.deep,
    },
  },
  highlight: {
    backgroundColor: theme.palette.primary.deep,
    color: theme.palette.common.white,
  },
  listHeader: {
    display: 'flex',
    padding: '0 20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 'auto',
    color: theme.palette.common.white,
    '& > div': {
      lineHeight: theme.spacing(1),
      '& > button': {
        color: theme.palette.common.white,
      },
    },
  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  listItemWrap: {
    justifyContent: 'center',
    position: 'relative',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: '10px',
    paddingBottom: '10px',
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  listItemText: {
    '& > span': {
      fontSize: '17px',
    },
  },
  listTitle: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginLeft: '12px',
  },
  /**
   * 메뉴 숨김 보임 관련 시작
   */
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '-12px',
    ...theme.mixins.toolbar,
  },
  /**
   * 메뉴 숨김 보임 관련 끝
   */
  popoverPaper: {
    position: 'absolute',
    width: '300px',
    zIndex: 100,
    borderRadius: 0,
    boxShadow: theme.shadows[3],
    overflow: 'hidden !important',
  },
  subMenuTitle: {
    margin: theme.spacing(1, 1, 0, 1),
  },
  icon: {
    minWidth: 'auto',
    color: theme.palette.primary.menuColor,
    width: '20px',
  },
  center: {
    justifyContent: 'center',
  },
  margenR0: {
    marginRight: 0,
  },
  loadingWrap: {
    margin: `${theme.spacing(1)}%`,
  },
  popoverSelected: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[600],
    '&:hover': {
      backgroundColor: theme.palette.grey[600],
    },
  },
  customScroll: {
    backgroundColor: '#3a4652',
  },
  drawerCloseScroll: {
    backagroundColor: '#3a4652',
    '& > div:first-child': {
      position: 'relative !important',
      maxHeight: 500,
    },
  },
  expandIcon: {
    transition: 'all ease 0.4s',
    fontSize: '30px',
  },
  menuOpen: {
    transform: 'rotate( -180deg )',
  },
}));

const subMenuStyles = makeStyles(theme => ({
  listWrap: {
    backgroundColor: '#2e3841',
    color: '#778b9d',
  },
  nested: {
    paddingLeft: 19,
    '&.subSelected': { color: '#79bd2f' },
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
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
    // openHighMenuCallBack,
  } = props;
  const classes = subMenuStyles();
  const { path } = useRouteMatch();

  if (!menuList) {
    return null;
  }

  let openHighMenu = false;
  const subMenuUi = (
    <Collapse in={open} timeout="auto" unmountOnExit className={className}>
      <List component="div" disablePadding className={classes.listWrap}>
        {(() => {
          const result = [];
          for (let key of menuList.keys()) {
            const { menuSeq, menuUrl, menuNm, menuPathNm } = menuList.get(key);
            const isCurMenu = curTab === menuUrl || path === menuUrl;
            if (!openHighMenu) {
              openHighMenu = isCurMenu && !open;
            }

            result.push(
              <ListItem
                button
                className={clsx(classes.nested, {
                  selected: isCurMenu,
                })}
                title={menuNm}
                key={menuSeq}
                onClick={event => handleClick({ event, menuUrl, menuPathNm })}
              >
                <ListItemText className={classes.ellipsis} primary={menuNm} />
              </ListItem>
            );
          }
          return result;
        })()}
      </List>
    </Collapse>
  );

  if (openHighMenu) {
    // openHighMenuCallBack();
  }

  return subMenuUi;
}

let openKeyMap = new Map();
const menuPopoverId = 'menu-popover';
export default withRouter(function AdminNav(props) {
  // 메뉴별 아이콘 정의
  const menuIconMap = (() => {
    const result = new Map();
    // 사용자 관리
    result.set(520, { value: faUserEdit });
    // 상품 관리
    result.set(515, { value: faArchive });
    // 보고서
    result.set(516, { value: faAnalytics });
    // 매출/정산
    result.set(517, { value: faCoins });
    // RTB
    result.set(518, { value: 'adIcon', isSvg: true });
    // 시스템 관리
    result.set(519, { value: 'setting', isSvg: true });
    return result;
  })();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { history, location, navOpen, handleDrawerToggle } = props;
  const { pathname } = location;
  const classes = nestedListStyles();
  const { menu, loading } = useSelector(({ menu, loading }) => ({
    menu: menu.list === null ? [] : menu.list,
    loading: loading[MENU],
  }));

  // status
  const [openKeys, setOpenKeys] = useState(openKeyMap);
  const [curTab, setCurTab] = useState(pathname);

  useEffect(() => {
    setCurTab(pathname);
  }, [pathname]);

  /**
   * 상위 메뉴 오픈
   */
  function openHighMenu(key) {
    openKeyMap = new Map(openKeyMap);
    openKeyMap.set(key, !openKeyMap.get(key));
    setOpenKeys(openKeyMap);
  }

  /**
   * 메뉴 클릭
   * @param {json} param0 { event, key, hasSubMenu, menuUrl }
   */
  function handleClick({ event, key, hasSubMenu, menuUrl, menuPathNm }) {
    event.stopPropagation();
    if (hasSubMenu) {
      if (navOpen) {
        openHighMenu(key);
      }
    } else {
      if (!!menuUrl) {
        if (menuUrl !== curTab) {
          if (menuUrl.indexOf('http') !== -1) {
            window.open(menuUrl);
          } else {
            dispatch(curMenu(menuPathNm));
            history.push(menuUrl);
          }
        }
      }
    }
  }

  /**
   * sidebar menu 닫았을 때 보여질 submenu list popover
   * @param {json} param0 {event, subMenu}
   */
  async function handlePopoverOpen({ event, subMenu = [] }) {
    event.stopPropagation();
    const { currentTarget } = event;
    const {
      offsetTop: targetTop,
      offsetLeft: targetLeft,
      offsetWidth: targetWidth,
      offsetHeight: targetHeight,
      textContent,
      parentElement,
    } = currentTarget;
    const headerHeight = 70;
    let popoverParentEl = document.getElementById(menuPopoverId);
    // popover 보여질 위치
    const curTargetTop = targetTop + headerHeight - parentElement.scrollTop;
    let popoverTop = curTargetTop;

    const popoverStyle = {
      top: popoverTop,
      left:
        targetLeft +
        targetWidth +
        (parentElement.offsetWidth - parentElement.clientWidth),
    };

    if (popoverParentEl === null) {
      var popover = document.createElement('div');
      popover.setAttribute('id', menuPopoverId);
      document.getElementById('root').appendChild(popover);
      popoverParentEl = document.getElementById(menuPopoverId);
    } else {
      popoverParentEl.style.display = 'block';
    }

    // await ReactDOM.render(
    ReactDOM.render(
      <Paper
        className={clsx('mb-AdminNavPopover', classes.popoverPaper)}
        style={{ ...popoverStyle }}
        onMouseEnter={() => {
          popoverParentEl.style.display = 'block';
        }}
        onMouseLeave={() => {
          popoverParentEl.style.display = 'none';
        }}
      >
        <Typography className={classes.subMenuTitle} variant="h6">
          {textContent}
        </Typography>
        <List dense={true}>
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            className={classes.drawerCloseScroll}
          >
            {(() => {
              const menuList = [];
              for (let menu of subMenu.values()) {
                const { menuSeq, menuNm, menuUrl, menuPathNm } = menu;
                menuList.push(
                  <ListItem
                    key={menuSeq}
                    className={clsx({
                      [classes.popoverSelected]: curTab === menuUrl,
                    })}
                    button
                    onClick={event => {
                      handleClick({ event, menuUrl, menuPathNm });
                      handlePopoverClose(event);
                    }}
                  >
                    <ListItemText primary={menuNm} />
                  </ListItem>
                );
              }

              return menuList;
            })()}
          </Scrollbars>
        </List>
      </Paper>,
      popoverParentEl
    );

    let popContent = popoverParentEl && popoverParentEl.firstChild;
    // popover 가 window 벗어날 경우 벗어나지 않도록 위치 조정
    if (popContent) {
      const winH = window.innerHeight;

      // 팝오버 내용을 target bottom 에 맞췄을때 화면 밖으로 나가는 경우 window 바닥에 붙어서 보이도록 위치 조정
      if (targetTop + targetHeight + headerHeight > winH) {
        popoverTop = winH - popContent.offsetHeight;
      }

      // 팝오버 내용이 화면 밖으로 나가는 경우 target bottom에 맞춰서 위로 나오게 위치 조정
      if (popoverTop + popContent.offsetHeight > winH) {
        popoverTop = popoverTop - popContent.offsetHeight + targetHeight;
      }

      // 내용이 너무 커서 화면 밖으로 벗어나는 경우
      if (popoverTop < 0) {
        if (curTargetTop < parseInt(winH / 2)) {
          popoverTop = curTargetTop;
        } else {
          popoverTop = curTargetTop - (parseInt(winH / 2) - 20) + targetHeight;
        }
        popoverStyle['maxHeight'] = parseInt(winH / 2) - 20;
        popoverStyle['overflow'] = 'auto';
      }

      popoverStyle['top'] = popoverTop;
    }

    popContent.removeAttribute('style');
    for (let item in popoverStyle) {
      if (popoverStyle.hasOwnProperty(item)) {
        const suffix = isNaN(popoverStyle[item]) ? '' : 'px';
        popContent.style[item] = `${popoverStyle[item]}${suffix}`;
      }
    }
  }

  /**
   * submenu popover 닫아주는 함수
   * @param {event} event
   */
  function handlePopoverClose(event) {
    event.stopPropagation();
    if (!!document.getElementById(menuPopoverId)) {
      document.getElementById(menuPopoverId).style.display = 'none';
    }
  }

  /**
   * 하위 메뉴 선택한 경우 부모 메뉴 highlight 체크 해주기 위한 함수
   * @param {Map} subMenu
   */
  function isHighlight(subMenu) {
    if (typeof subMenu.get(curTab) !== 'undefined') {
      return true;
    } else {
      let result = false;
      for (let curMenu of subMenu.values()) {
        if (result) {
          break;
        }
        if (curMenu.menuUrl === curTab) {
          result = true;
          break;
        } else if (typeof curMenu.subMenu !== 'undefined') {
          result = isHighlight(curMenu.subMenu);
        }
      }
      return result;
    }
  }

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      className={classes.customScroll}
    >
      <List
        className={clsx('mb-AdminNav', classes.root)}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // 스크롤 있을 때 스크롤 부분에서 mouseLeve 됐을 때도 popover 안꺼지도록 여기에 이벤트 추가
        onMouseLeave={handlePopoverClose}
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className={clsx(classes.listHeader, { [classes.center]: !navOpen })}
          >
            <Typography
              variant="h5"
              title={t('최고관리자')}
              className={clsx({ [classes.hide]: !navOpen })}
              classes={{ h5: classes.title }}
            >
              {t('최고관리자')}
            </Typography>
            <div
              className={clsx(classes.toolbar, {
                [classes.margenR0]: !navOpen,
              })}
            >
              <IconButton onClick={handleDrawerToggle}>
                <DehazeIcon />
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
          (() => {
            const menuList = [];
            for (let key of menu.keys()) {
              const open = openKeys.get(key);
              const curMenu = menu.get(key);
              const { menuSeq, menuNm, subMenu, menuUrl, menuPathNm } = curMenu;
              const hasSubMenu = !!subMenu;
              const iconObj = menuIconMap.get(menuSeq);
              const Icon = !!iconObj && iconObj.value;

              const isHighlightMenu =
                (curTab !== menuUrl &&
                  typeof subMenu !== 'undefined' &&
                  isHighlight(subMenu)) ||
                curTab === menuUrl;

              menuList.push(
                <React.Fragment key={menuSeq}>
                  <ListItem
                    className={clsx(classes.listItemWrap, {
                      [classes.highlight]: isHighlightMenu,
                    })}
                    button
                    onClick={event =>
                      handleClick({
                        event,
                        key,
                        hasSubMenu,
                        menuUrl,
                        menuPathNm,
                      })
                    }
                    onMouseEnter={
                      !navOpen
                        ? event => handlePopoverOpen({ event, subMenu })
                        : null
                    }
                  >
                    <ListItemIcon className={classes.icon}>
                      {Icon && iconObj.isSvg ? (
                        <MbSVG
                          name={Icon}
                          fill={isHighlightMenu ? '#fff' : null}
                          duotone
                        />
                      ) : (
                        <FontAwesomeIcon
                          className={classes.buttonIcon}
                          icon={Icon === false ? faCube : Icon}
                          color={isHighlightMenu ? '#fff' : null}
                          style={{
                            fontSize: '16px',
                          }}
                        />
                      )}
                    </ListItemIcon>

                    <div
                      className={clsx(classes.listTitle, {
                        [classes.hide]: !navOpen,
                      })}
                    >
                      <ListItemText
                        classes={{ root: classes.listItemText }}
                        primary={menuNm}
                      />
                      {hasSubMenu ? (
                        <ExpandMore
                          className={clsx({ [classes.menuOpen]: open })}
                          classes={{ root: classes.expandIcon }}
                        />
                      ) : // )
                      null}
                    </div>
                  </ListItem>
                  <SubMenu
                    menuList={subMenu}
                    open={open}
                    handleClick={handleClick}
                    curTab={curTab}
                    openHighMenuCallBack={() => openHighMenu(key)}
                    className={clsx({ [classes.hide]: !navOpen })}
                  />
                </React.Fragment>
              );
            }
            return menuList;
          })()
        )}
      </List>
    </Scrollbars>
  );
});
