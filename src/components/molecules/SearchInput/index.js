import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 6px 2px 20px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 294,
    height: 34,
    boxSizing: 'border-box',
    borderRadius: 17,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.box.secondaryBorderColor}`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 7,
  },
  buttonIcon: {
    fontSize: 16,
  },
}));

export default function SearchInput({ placeholder = '' }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
      >
        <FontAwesomeIcon
          icon={faSearch}
          color={theme.palette.primary.main}
          className={classes.buttonIcon}
        />
      </IconButton>
    </Paper>
  );
}
