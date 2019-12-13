import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MbPopper from 'components/molecules/MbPopper';

const useStyles = theme => ({
  btnGroupRoot: {
    boxSizing: 'border-box',
    height: '34px',
    '&.isFiltered': {
      borderColor: theme.palette.primary.deep,
      backgroundColor: theme.palette.primary.deep,
      '& .MuiButton-label': {
        color: theme.palette.common.white,
      },
    },
  },
  buttonContained: {
    border: theme.palette.box.border,
    boxShadow: 'none',
  },
  button: {
    fontSize: '14px',
    padding: '4px 14px',
    boxSizing: 'border-box',
    height: '34px',
  },
  filterBtn: {
    background: '#fff',
    '&:not(:last-child)': {
      borderRight: theme.palette.box.border,
    },
  },
});

class OptionMenuList extends React.Component {
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
        {optionData.map((option, index) => (
          <MenuItem
            key={option[optionValueKey]}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
            disableRipple
          >
            {option[optionLabelKey]}
          </MenuItem>
        ))}
      </MenuList>
    );
  }
}

let index = 0;
export default withStyles(useStyles)(
  class MbSelectbox extends React.Component {
    constructor(props) {
      super(props);
      this.anchorRef = React.createRef();

      const { value, name = index++ } = props;

      this.id = `menu-list-${name}`;

      this.state = {
        open: false,
        selectedIndex: value,
      };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        ...this.state,
        open: false,
        selectedIndex: nextProps.value,
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (
        JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
        JSON.stringify(this.state) !== JSON.stringify(nextState)
      ) {
        return true;
      } else {
        return false;
      }
    }

    handleMenuItemClick = (event, index, value) => {
      const { handleOnchange = f => f, name } = this.props;

      this.setState({
        ...this.state,
        selectedIndex: index,
        open: false,
      });

      handleOnchange(name, index, value);
    };

    handleToggle = () => {
      this.setState({
        ...this.state,
        open: !this.state.open,
      });
    };

    handleClose = event => {
      const { anchorRef } = this;

      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      this.setState({
        ...this.state,
        open: false,
      });
    };

    render() {
      const {
        anchorRef,
        id,
        handleToggle,
        handleClose,
        handleMenuItemClick,
      } = this;
      const {
        classes,
        label,
        disabled,
        optionData = [],
        optionValueKey = '',
        optionLabelKey,
        icon = true,
      } = this.props;
      const { selectedIndex, open } = this.state;
      const isFiltered =
        typeof optionData[selectedIndex] !== 'undefined' &&
        optionData[selectedIndex][optionValueKey] !== null;

      return (
        <>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
            disabled={disabled}
            className={clsx(`lockHover`, { isFiltered })}
            classes={{
              root: classes.btnGroupRoot,
              contained: classes.buttonContained,
              groupedContained: classes.filterBtn,
            }}
            onClick={handleToggle}
            disableRipple
          >
            <Button
              aria-owns={open ? id : undefined}
              className={classes.button}
            >
              {selectedIndex === null ||
              optionData.length === 0 ||
              (typeof optionData[selectedIndex] !== 'undefined' &&
                optionData[selectedIndex][optionValueKey] === null)
                ? label
                : optionData[selectedIndex][optionLabelKey]}
            </Button>
            {icon && (
              <Button
                size="small"
                aria-owns={open ? id : undefined}
                aria-haspopup="true"
              >
                <ExpandMoreIcon />
              </Button>
            )}
          </ButtonGroup>
          <MbPopper
            open={open}
            anchorRef={anchorRef}
            onClickAway={handleClose}
            id={id}
          >
            <OptionMenuList
              optionData={optionData}
              selectedIndex={selectedIndex}
              handleMenuItemClick={handleMenuItemClick}
              optionLabelKey={optionLabelKey}
              optionValueKey={optionValueKey}
            />
          </MbPopper>
        </>
      );
    }
  }
);
