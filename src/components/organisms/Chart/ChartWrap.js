import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    border: `solid 1px ${theme.palette.box.secondaryBorderColor}`,
    backgroundColor: '#f9fafb',
    padding: '13px 12px 0px',
  },
  title: {
    fontWeight: 400,
  },
  label: {
    textAlign: 'right',
    fontSize: '12px',
    marginBottom: '10px',
  },
}));

export default function ChartWrap({
  title,
  label,
  children,
  className = '',
  ...rest
}) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`} {...rest}>
      <div className={classes.title}>{title}</div>
      <div className={classes.label}>{label}</div>
      {children}
    </div>
  );
}
