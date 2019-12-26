import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '60px',
    height: '26px',
    display: 'inline-flex',
    padding: '12px',
    zIndex: '0',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    flexShrink: '0',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
    border: theme.palette.box.border,
    borderRadius: '14px',
    color: theme.palette.common.gray5,
    backgroundColor: theme.palette.common.gray4,

    '&.checked': {
      backgroundColor: theme.palette.secondaryColor,
      borderColor: theme.palette.secondaryColor,
      color: '#fff',
    },
  },
  switchBase: {
    top: '0',
    left: '-1px',
    position: 'absolute',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    transition:
      'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '.checked &': {
      transform: 'translateX(34px)',
    },
    '&.label': {
      left: '28px',
      '.checked &.label': {
        transform: 'translateX(-18px)',
      },
    },
  },
  checkbox: {
    top: '0',
    cursor: 'inherit',
    height: '100%',
    margin: '0',
    opacity: '0',
    padding: '0',
    zIndex: '1',
    position: 'absolute',
    // left: '-30%',
    // width: '300%',
    width: '100%',
  },
  thumb: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: theme.palette.box.border,

    '.checked &': {
      borderColor: theme.palette.secondaryColor,
    },
  },
}));

/**
 *
 * @param {json} param0
 */
export default function MbSwitch({
  className = '',
  selected,
  hasLabel = false,
  value,
  checked = false,
  onChange = f => f,
  ...rest
}) {
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState(checked);

  const handleOnChange = e => {
    setCheckState(!checkState);
    onChange(e);
  };

  return (
    <span className={clsx(classes.root, { checked: checkState })}>
      <input
        type="checkbox"
        className={classes.checkbox}
        value={value}
        checked={checkState}
        onChange={handleOnChange}
        {...rest}
      />
      <span className={classes.switchBase}>
        <span className={classes.thumb}></span>
      </span>
      {hasLabel && (
        <span className={clsx(classes.switchBase, 'label')}>
          {checkState ? 'ON' : 'OFF'}
        </span>
      )}
    </span>
  );
}
