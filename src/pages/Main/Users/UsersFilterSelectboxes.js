import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import MbSelectbox from 'components/molecules/MbSelectbox';
import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';
import MbRadioGroup from 'components/molecules/MbRadioGroup';
import ManagerFilter from 'components/organisms/ManagerFilter';

const styles = theme => ({
  root: {
    display: 'flex',
    '& > div:not(:first-child):not([role="tooltip"])': {
      marginLeft: '10px',
    },
  },
});

const initialState = {
  // 사용자 구분값
  option: '0',
  filterSelectIdx: {
    agencyMenus: 0,
    contactMenus: 0,
    sindyMenus: 0,
  },
};
class UsersFilterSelectboxes extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { initialization } = nextProps;
    if (initialization) {
      this.setState(initialState);
    }
  }

  /**
   * 사용자 관리 필터 관련 파라미터 만드는
   */
  sendParam = () => {
    const { filterSelectIdx, option } = this.state;
    const { filterList } = this.props;
    const { agencyMenus, contactMenus, sindyMenus } = filterList;
    const {
      agencyMenus: agIndex,
      contactMenus: conIndex,
      sindyMenus: sinIndex,
    } = filterSelectIdx;
    const gubun = parseInt(option) === 0 ? null : option;
    let pid = null;
    const contact = conIndex !== 0 ? contactMenus[conIndex].CONTACT_NO : null;

    if (agIndex !== 0) {
      pid = agencyMenus[agIndex].USER_ID;
    } else if (sinIndex !== 0) {
      pid = sindyMenus[sinIndex].USER_ID;
    }

    const param = {
      gubun,
      pid,
      contact,
    };

    for (let item in param) {
      if (param.hasOwnProperty(item)) {
        if (param[item] === null) {
          delete param[item];
        }
      }
    }

    return param;
  };

  componentDidUpdate(prevProps, prevState) {
    const { filterSelectIdx, option } = prevState;
    const { filterSelectIdx: curF, option: curO } = this.state;

    if (filterSelectIdx !== curF || option !== curO) {
      const param = this.sendParam();
      this.props.handleOnchangeFilter(param);
    }
  }

  /**
   * 구분 변경
   * @param {*} event
   */
  handleChange = event => {
    const { value: option } = event.target;

    const filterSelectIdx = { ...this.state.filterSelectIdx };

    if (parseInt(option) === 11) {
      filterSelectIdx['sindyMenus'] = 0;
    } else if (parseInt(option) === 13) {
      filterSelectIdx['agencyMenus'] = 0;
    }

    this.setState({
      ...this.state,
      option,
      filterSelectIdx,
    });
  };

  /**
   * selectbox 필터 선택
   * @param {string} name
   * @param {*} value
   */
  handleFilterChange = (name, index) => {
    const { option } = this.state;
    const filterSelectIdx = { ...this.state.filterSelectIdx, [name]: index };

    if (parseInt(option) === 0) {
      // 전체 선택인 경우
      if (name === 'agencyMenus') {
        filterSelectIdx['sindyMenus'] = 0;
      } else if (name === 'sindyMenus') {
        filterSelectIdx['agencyMenus'] = 0;
      }
    }

    this.setState({
      ...this.state,
      filterSelectIdx,
    });
  };

  render() {
    const { handleChange, handleFilterChange } = this;
    const { t, classes, filterList } = this.props;
    const { option, filterSelectIdx } = this.state;

    return (
      <div className={classes.root}>
        <PopoverFilterWrap
          selectedLabel={t(
            option === '0' ? '전체' : option === '11' ? '광고주' : '매체'
          )}
          label={t('사용자 구분')}
          filtered
          id="mb-userDivision-popper"
          filterList={
            <MbRadioGroup
              selectedValue={option}
              onChange={handleChange}
              radioList={[
                { label: t('전체'), value: '0' },
                { label: t('광고주'), value: '11' },
                { label: t('매체'), value: '13' },
              ]}
              name="classification"
            />
          }
        />
        <MbSelectbox
          label={t('광고주 대행사')}
          value={filterSelectIdx.agencyMenus}
          disabled={option === '13'}
          name="agencyMenus"
          optionData={filterList.agencyMenus}
          optionLabelKey="CORP_NAME"
          optionValueKey="USER_ID"
          handleOnchange={handleFilterChange}
          icon={false}
        />
        <MbSelectbox
          label={t('매체 신디사')}
          value={filterSelectIdx.sindyMenus}
          disabled={option === '11'}
          name="sindyMenus"
          optionData={filterList.sindyMenus}
          optionLabelKey="CORP_NAME"
          optionValueKey="USER_ID"
          handleOnchange={handleFilterChange}
          icon={false}
        />
        <ManagerFilter
          value={filterSelectIdx.contactMenus}
          handleOnchange={handleFilterChange}
        />
      </div>
    );
  }
}

export default withTranslation()(
  connect(
    ({ common }) => ({
      filterList: {
        agencyMenus: common.agencyMenus,
        contactMenus: common.contactMenus,
        sindyMenus: common.sindyMenus,
      },
    }),
    null
  )(withStyles(styles)(UsersFilterSelectboxes))
);
