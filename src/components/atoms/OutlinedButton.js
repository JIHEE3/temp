import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 50,
    '&.noneBorder:not(.selected)': {
      backgroundColor: '#f6f6f9',
    },
    '&.selected': {
      color: theme.palette.primary.deep,
      borderColor: theme.palette.primary.deep,
    },
  },
  outlined: {
    borderColor: theme.palette.box.secondaryBorderColor,
    paddingLeft: 8,
    paddingRight: 8,
    '&.noneBorder:not(.selected)': {
      borderColor: '#f6f6f9',
    },
  },
}));

/**
 * 아웃라인 버튼
 * @param {json} param0
 */
export default function OutlinedButton({
  className = '',
  selected,
  children,
  noneBorder = false,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      classes={{ root: classes.root, outlined: classes.outlined }}
      className={clsx(className, { selected, noneBorder })}
      {...rest}
    >
      {children}
    </Button>
  );
}
