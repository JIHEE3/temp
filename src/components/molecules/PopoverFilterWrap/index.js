import React from 'react';

import LabelFilterWrap from 'components/molecules/LabelFilterWrap';
import MbPopper from 'components/molecules/MbPopper';

/**
 * 테이블 popover 되는 필터 wrapper
 * @param {json} param0
 */
export default class PopoverFilterWrap extends React.Component {
  constructor(props) {
    super(props);
    this.anchorRef = React.createRef();

    const { createOnOpen = false } = props;
    this.state = {
      createOnOpen,
      open: false,
    };
  }

  handleToggle = () => {
    this.setState({
      ...this.state,
      createOnOpen: false,
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
      createOnOpen: false,
      open: false,
    });
  };

  render() {
    const { anchorRef, handleToggle, handleClose } = this;
    const { createOnOpen, open } = this.state;
    const {
      selectedLabel,
      className,
      label,
      filtered,
      id,
      filterList,
      popoverHeight,
    } = this.props;

    return (
      <>
        <LabelFilterWrap
          className={className}
          label={label}
          filtered={filtered}
          onClick={handleToggle}
          anchorRef={anchorRef}
        >
          {selectedLabel}
        </LabelFilterWrap>
        <MbPopper
          open={open}
          anchorRef={anchorRef}
          onClickAway={handleClose}
          id={id}
          popoverHeight={popoverHeight}
        >
          {!createOnOpen && filterList}
        </MbPopper>
      </>
    );
  }
}
