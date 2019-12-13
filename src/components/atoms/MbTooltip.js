import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  tooltip: {
    fontSize: '12px',
    fontWeight: '300',
  },
  inline: {
    display: 'inline-block',
  },
}));

export default function MbTooltip({
  className = '',
  children,
  classes = {},
  ...rest
}) {
  const userClasses = useStyles();

  return (
    <Tooltip
      className={`${className} ${userClasses.inline}`}
      classes={{
        ...classes,
        tooltip: `${userClasses.tooltip} ${classes.tooltip}`,
      }}
      {...rest}
    >
      <div>{children}</div>
    </Tooltip>
  );
}
