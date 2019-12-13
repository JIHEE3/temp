import React from 'react';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import OptionMenuList from 'components/molecules/OptionMenuList';
import MbPopper from 'components/molecules/MbPopper';

const useStyles = theme => ({
  filterWrap: {
    padding: theme.spacing(2, 4),
  },
  filter: {
    minWidth: 120,
  },
  filterLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '90%',
  },
  filterListWrap: {
    maxHeight: 300,
    zIndex: 100,
    overflow: 'hidden',
    marginTop: '5px',
    border: `1px solid ${theme.palette.primary.deep}`,
    borderRadius: '5px',
    display: 'none',
    '&.open': {
      display: 'block',
    },
  },
  btnGroupRoot: {},
  buttonContained: {
    border: theme.palette.box.border,
    boxShadow: 'none',
  },
  filterBtn: {
    background: '#fff',
    '&:not(:last-child)': {
      borderRight: theme.palette.box.border,
    },
  },
  // 커스텀 스크롤바 테이블에 사용시 꼭 필요한 CSS Start
  customScrollBar: {
    '& > div:first-child': {
      position: 'relative !important',
      maxHeight: 300,
    },
    '& > div:not(first-child)': {
      zIndex: 99,
    },
  },
  // 커스텀 스크롤바 테이블에 사용시 꼭 필요한 CSS End
});

let index = 0;
export default withStyles(useStyles)(
  class MbSelectbox2 extends React.Component {
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

    shouldComponentUpdate(nextProps, nextState) {
      const { value, optionData } = this.props;
      const { value: nextValue, optionData: nextOptionData } = nextProps;
      const { open } = this.state;
      const { open: nextOpen } = nextState;

      if (
        value !== nextValue ||
        optionData !== nextOptionData ||
        open !== nextOpen
      ) {
        return true;
      } else {
        return false;
      }
    }

    handleMenuItemClick = (event, index) => {
      const {
        handleFilterOnchange = f => f,
        name,
        optionData = [],
        optionValueKey = '',
      } = this.props;
      const value = index !== null ? optionData[index][optionValueKey] : null;
      this.setState({
        ...this.state,
        selectedIndex: index,
        open: false,
      });

      handleFilterOnchange(name, value);
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
      } = this.props;
      const { selectedIndex, open } = this.state;

      return (
        <>
          <Grid item xs={12}>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
              disabled={disabled}
              className={`lockHover`}
              classes={{
                root: classes.btnGroupRoot,
                contained: classes.buttonContained,
                groupedContained: classes.filterBtn,
              }}
              onClick={handleToggle}
              disableRipple
            >
              <Button aria-owns={open ? id : undefined}>
                {selectedIndex === null
                  ? label
                  : optionData[selectedIndex][optionLabelKey]}
              </Button>
              <Button
                size="small"
                aria-owns={open ? id : undefined}
                aria-haspopup="true"
              >
                <ExpandMoreIcon />
              </Button>
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
          </Grid>
        </>
      );
    }
  }
);
