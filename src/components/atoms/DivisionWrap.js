import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 'inherit',
    // width: '100%',
  },
  division: {
    width: '1px',
    height: '23%',
    backgroundColor: theme.palette.primary.division,
    margin: '0 7px',
  },
}));

const DivisionWrap = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...rest}>
      {children.map((el, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <div className={classes.division} />}
          <div>{el}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DivisionWrap;
