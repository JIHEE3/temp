import React from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/styles';
import MbSelectbox from 'components/molecules/MbSelectbox';

import { authGrpList } from 'lib/api/auth';

const styles = theme => ({});

/**
 * option 리스트 만들어주는 함수
 * @param {Array} data option list 만들 array
 * @param {string} optionLabelKey option에 나올 label key 값
 * @param {string} optionValueKey option value key 값
 */
const makeOptionList = (data, optionLabelKey, optionValueKey) => {
  if (typeof data === 'undefined') {
    return [];
  }
  const result = [...data];
  const defaultOption = { [optionLabelKey]: '전체', [optionValueKey]: null };
  if (data.length === 0) {
    result.push(defaultOption);
  } else {
    // 전체 라는 option 추가
    result.unshift(defaultOption);
  }

  return result;
};

class FilterSelectbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grpNo: 0,
      filterList: [],
    };
  }

  componentDidMount() {
    authGrpList()
      .then(response => {
        const { data } = response.data;
        this.setState({
          ...this.state,
          filterList: data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * selectbox 필터 선택
   * @param {string} name
   * @param {*} value
   */
  handleFilterChange = (name, index) => {
    this.setState({
      ...this.state,
      grpNo: this.state.filterList[index].GRP_NO,
    });
    this.props.handleOnchangeFilter(index);
  };

  render() {
    const { handleFilterChange } = this;
    const { t, classes } = this.props;
    const { grpNo, filterList = [] } = this.state;

    return (
      <div className={classes.root}>
        <MbSelectbox
          label={t('그룹명')}
          value={grpNo}
          name="grpName"
          optionData={makeOptionList(filterList, 'GRP_NAME', 'GRP_NO')}
          optionLabelKey="GRP_NAME"
          optionValueKey="GRP_NO"
          handleOnchange={handleFilterChange}
          icon={false}
        />
      </div>
    );
  }
}

export default withTranslation()(withStyles(styles)(FilterSelectbox));
