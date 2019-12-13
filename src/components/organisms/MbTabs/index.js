import React from 'react';
import i18next from 'i18next';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';

const styles = theme => ({
  tabsRoot: {
    marginBottom: '-1px',
    height: '54px',
    '&.isModal': {
      backgroundColor: '#e5e8eb',
      borderRadius: '4px',
    },
  },
  indicator: {
    backgroundColor: theme.palette.primary.deep,
    '.normal &': {
      top: 0,
    },
    '.isModal &': {
      height: '100%',
      background: '#8d9ba2',
      opacity: 0.5,
    },
  },
  tabRoot: {
    borderRadius: '4px 4px 0 0',
    opacity: 1,
    transitionDuration: '0.3s',
    fontSize: '16px',

    borderBottom: '2px solid #e5e8eb',
    fontWeight: 500,
    color: theme.palette.common.black,
    '.normal &': {
      color: '#9b9ca4',
      marginRight: '4px',
      backgroundColor: '#f9fafb',
      border: 'solid 1px #e5e8eb',
    },
    minWidth: '118px',
    '&.isModal': {
      flex: '1 1 100px',
      marginRight: 0,
      backgroundColor: 'transparent',
      borderRadius: 0,
    },
  },
  flexContainer: {
    height: '100%',
  },
  selected: {
    backgroundColor: `${theme.palette.common.white} !important`,
    borderRadius: 0,
    borderBottom: `0 !important`,
    fontWeight: 500,
    color: `${theme.palette.common.black} !important`,
    // '&.isModal': {
    //   backgroundColor: '#8d9ba2',
    // },
  },
});

function a11yProps(name, key) {
  return {
    id: `${name}-tab-${key}`,
    'aria-controls': `${name}-tabpanel-${key}`,
  };
}

function makeTabs({
  name,
  tabMenuList = new Map(),
  tabs,
  classes,
  value,
  isModal,
  popoverTab,
}) {
  // 탭 메뉴
  const tabArray = [];
  // 탭 내용
  // const tabPanelArray = [];
  let tabPanelArray = [];
  let tabIndex = -1;

  for (let tabMenu of tabMenuList.values()) {
    const { menuUrl, menuSeq, menuNm } = tabMenu;

    tabArray.push(
      <Tab
        key={menuSeq}
        value={menuUrl}
        classes={{ root: classes.tabRoot, selected: classes.selected }}
        className={clsx({ isModal })}
        label={menuNm}
        {...a11yProps(name, menuSeq)}
      />
    );

    // tabPanelArray.push(
    //   <TabPanel
    //     value={value}
    //     keyValue={menuUrl}
    //     key={menuUrl}
    //     name={name}
    //     isModal={isModal}
    //     popoverTab={popoverTab}
    //   >
    //     <React.Fragment key={menuUrl}>
    //       {typeof tabs[menuUrl] === 'undefined'
    //         ? i18next.t('관리자에게 문의하세요')
    //         : tabs[menuUrl].tabComponent}
    //     </React.Fragment>
    //   </TabPanel>
    // );

    tabIndex++;
    if (value === menuUrl) {
      tabPanelArray[tabIndex] = (
        <TabPanel
          value={value}
          keyValue={menuUrl}
          key={menuUrl}
          name={name}
          isModal={isModal}
          popoverTab={popoverTab}
        >
          <React.Fragment key={menuUrl}>
            {typeof tabs[menuUrl] === 'undefined'
              ? i18next.t('관리자에게 문의하세요')
              : tabs[menuUrl].tabComponent}
          </React.Fragment>
        </TabPanel>
      );
    }
  }

  return [tabArray, tabPanelArray];
}

function initSetting(props, state, valueSet) {
  const {
    history,
    match,
    tabMenuList,
    name,
    tabs,
    classes,
    isModal,
    changeUrl = true,
    popoverTab,
  } = props;
  let { value } = state;
  let url = null;

  if (valueSet) {
    if (match.path === value) {
      // 사이드바에서 해당메뉴 클릭해서 들어온 경우
      value = tabMenuList.keys().next().value;
      url = value;
    } else {
      let tempCnt = 0;
      for (let path of tabMenuList.keys()) {
        if (value === path) {
          break;
        } else {
          tempCnt++;
        }
      }
      if (tabMenuList.size === tempCnt) {
        // 일치하는 tab 없음 404
        url = '/404';
      }
    }

    if (changeUrl && url !== null) {
      history.push(url);
    }
  }

  const [tabArray, tabPanelArray] = makeTabs({
    name,
    tabMenuList,
    tabs,
    classes,
    value,
    isModal,
    popoverTab,
  });

  return {
    value,
    tabArray,
    tabPanelArray,
  };
}

export default withRouter(
  withStyles(styles)(
    class MbTabs extends React.Component {
      constructor(props) {
        super(props);
        const {
          location,
          tabMenuList,
          isModal,
          initValue,
          getCurTab = f => f,
        } = props;
        let value =
          typeof initValue === 'undefined' ? location.pathname : initValue;
        getCurTab(value);
        this.state = {
          ...this.state,
          ...initSetting(
            props,
            { value },
            typeof tabMenuList !== 'undefined' && !isModal
          ),
        };
      }

      componentDidUpdate(prevProps) {
        const { tabMenuList: prevTabMenuList } = prevProps;
        const { tabMenuList } = this.props;

        let valueSet = false;
        if (prevTabMenuList !== tabMenuList) {
          if (typeof prevTabMenuList === 'undefined') {
            // list 없다가 받아온경우 (map size 다를때)
            valueSet = true;
          }

          this.setState({
            ...this.state,
            ...initSetting(this.props, this.state, valueSet),
          });
        }
      }

      handleChange = (event, newValue) => {
        const {
          history,
          tabMenuList,
          name,
          tabs,
          classes,
          isModal = false,
          changeUrl = true,
          popoverTab,
          getCurTab = f => f,
        } = this.props;
        getCurTab(newValue);
        if (newValue === null) {
          // tab url 이 null 인 경우
          console.log('탭 메뉴 url을 넣어주세요');
        } else {
          if (!isModal && changeUrl) {
            history.push(newValue);
          }
          const [tabArray, tabPanelArray] = makeTabs({
            name,
            tabMenuList,
            tabs,
            classes,
            value: newValue,
            isModal,
            popoverTab,
          });

          this.setState({
            ...this.state,
            tabArray,
            tabPanelArray,
            value: newValue,
            isModal,
          });
        }
      };

      render() {
        const { handleChange } = this;
        const { classes, isModal, name, popoverTab = false } = this.props;
        const { value, tabArray, tabPanelArray } = this.state;

        return (
          <>
            <Tabs
              className={clsx({ isModal, normal: !popoverTab })}
              classes={{
                root: classes.tabsRoot,
                flexContainer: classes.flexContainer,
                indicator: classes.indicator,
              }}
              value={value}
              onChange={handleChange}
              aria-label={name}
            >
              {tabArray}
            </Tabs>
            {tabPanelArray}
          </>
        );
      }
    }
  )
);
