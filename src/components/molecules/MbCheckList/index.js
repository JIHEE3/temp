import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MbCheckbox from 'components/atoms/MbCheckbox';

const checkListStyles = makeStyles(theme => ({
  checkboxItemBox: {
    maxWidth: 140,
  },
  checkboxTextBox: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  checkboxRoot: {
    minWidth: 30,
    justifyContent: 'center',
  },
  gutters: {
    paddingLeft: 9,
    paddingRight: 9,
  },
}));

const MbCheckList = ({ onClick, checked, label }) => {
  const classes = checkListStyles();

  const labelId = `checkbox-list-label-${label}`;
  return (
    <ListItem
      button
      className={classes.checkboxItemBox}
      classes={{ gutters: classes.gutters }}
      title={label}
      onClick={onClick}
    >
      <ListItemIcon classes={{ root: classes.checkboxRoot }}>
        <MbCheckbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText
        id={labelId}
        primary={label}
        className={classes.checkboxTextBox}
      />
    </ListItem>
  );
};

export default MbCheckList;
