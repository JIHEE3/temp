import React from 'react';
import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
  root: {
    display: 'flex',
    height: '34px',
    borderRadius: theme.palette.box.radius,
    border: theme.palette.box.border,
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-around',
    cursor: 'pointer',

    '&.filtered': {
      borderColor: theme.palette.primary.deep,
      backgroundColor: theme.palette.primary.deep,
      color: theme.palette.common.white,
      '& > div, & .DateRangePickerInput_arrow, & .DateInput_input': {
        backgroundColor: theme.palette.primary.deep,
        color: theme.palette.common.white,
      },
      '& .mb-division': {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  label: {
    flexShrink: 0,
    marginLeft: 11,
    marginRight: 11,
    '.filtered &': {
      marginRight: 0,
    },
  },
  division: {
    marginLeft: 6,
    marginRight: 6,
    width: '1px',
    height: '10px',
    backgroundColor: theme.palette.primary.division,
  },
  childDiv: {
    marginRight: 11,
  },
});

export default withStyles(useStyles)(
  class LabelFilterWrap extends React.Component {
    render() {
      const {
        classes,
        className,
        label = '',
        filtered,
        onClick,
        children,
        anchorRef,
        ...rest
      } = this.props;

      return (
        <div
          className={clsx(classes.root, className, {
            filtered,
          })}
          onClick={onClick}
          ref={anchorRef}
          {...rest}
        >
          <span className={classes.label}>{label}</span>
          {filtered && (
            <>
              {label.length !== 0 && (
                <div className={`mb-division ${classes.division}`} />
              )}
              <div className={classes.childDiv}>{children}</div>
            </>
          )}
        </div>
      );
    }
  }
);
