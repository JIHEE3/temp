import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/pro-light-svg-icons';

const useStyles = makeStyles(theme => ({
  icon: {
    height: 19,
    width: 19,
    border: `1px solid ${theme.palette.box.secondaryBorderColor}`,
    boxSizing: 'border-box',
    borderRadius: 4,
    backgroundColor: theme.palette.box.labelBg,
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.boxBG,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
}));

export default function MbCheckbox({ color = '#79bd2f', ...rest }) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      color="default"
      icon={<span className={classes.icon} />}
      checkedIcon={
        <span className={`${classes.icon} ${classes.checkedIcon}`}>
          <FontAwesomeIcon icon={faCheckSquare} color={color} />
        </span>
      }
      {...rest}
    />
  );
}
