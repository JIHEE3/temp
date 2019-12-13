import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > div:not(:first-child)': {
      marginLeft: '8px',
    },
  },
  division: {
    width: '1px',
    height: '65%',
    backgroundColor: theme.palette.primary.division,
  },
}));

const LabelNvalue = ({ label, value, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} {...rest}>
      <div>{label}</div>
      <div className={classes.division} />
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default LabelNvalue;
