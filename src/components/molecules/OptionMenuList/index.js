import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default class OptionMenuList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { selectedIndex: index, optionData } = this.props;
    const { selectedIndex: nextIndex, optionData: nextOptionData } = nextProps;

    if (index !== nextIndex || optionData !== nextOptionData) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      selectedIndex,
      handleMenuItemClick,
      optionData = [],
      optionValueKey,
      optionLabelKey,
    } = this.props;

    return (
      <MenuList>
        <MenuItem
          selected={selectedIndex === null}
          onClick={event => handleMenuItemClick(event, null)}
          disableRipple
        >
          전체
        </MenuItem>
        {optionData.map((option, index) => (
          <MenuItem
            key={option[optionValueKey]}
            selected={index === selectedIndex}
            onClick={event =>
              handleMenuItemClick(event, index, option[optionValueKey])
            }
            disableRipple
          >
            {option[optionLabelKey]}
          </MenuItem>
        ))}
      </MenuList>
    );
  }
}
