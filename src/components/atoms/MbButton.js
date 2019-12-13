import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 14,
    lineHeight: '14px',
    padding: `9px 14px`,
    minWidth: `auto`,
    height: '100%',
    textTransform: 'unset',
  },
  contained: props => {
    const { color = theme.palette.primary.main, textColor = '#fff' } = props;
    return {
      backgroundColor: color,
      color: textColor,
      '&:hover': {
        backgroundColor: color,
        opacity: 0.7,
      },
    };
  },
}));

export default function MbButton({ color, textColor, children, ...rest }) {
  const classes = useStyles({ color, textColor });

  return (
    <Button
      variant="contained"
      classes={{ root: classes.root, contained: classes.contained }}
      {...rest}
    >
      {children}
    </Button>
  );
}
