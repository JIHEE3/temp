import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from './IconButton';

const useStyles = makeStyles(theme => ({
  button: {
    padding: '1px 8px',
  },
  label: props => {
    const { color = theme.palette.common.black } = props;

    return {
      fontSize: 16,
      color: color,
      marginBottom: 2,
      whiteSpace: 'nowrap',
    };
  },
}));

function TableToolBarIconButton({ icon, label, color, ...rest }) {
  const classes = useStyles({ color });

  return (
    <IconButton className={classes.button} {...rest}>
      {icon}
      <span className={classes.label}>{label}</span>
    </IconButton>
  );
}

export default TableToolBarIconButton;
