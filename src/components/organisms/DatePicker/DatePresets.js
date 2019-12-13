import React from 'react';
import i18next from 'i18next';
import clsx from 'clsx';
import isSameDay from 'react-dates/src/utils/isSameDay';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  panel: {
    width: '113px',
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: '3px',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: '0px 2px 0px rgba(0,0,0,.05), 1px 0px 0px 1px rgba(0,0,0,.07)',
    borderLeft: theme.palette.box.border,
  },
  buttonList: {
    color: theme.palette.common.black,
  },
  button: {
    padding: '2px 11px',
  },
  button_selected: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
  },
}));

const DatePresets = ({ startDate, endDate, onDatesChange }) => {
  const classes = useStyles();
  const presets = [
    {
      text: i18next.t('오늘'),
      start: moment(),
      end: moment(),
    },
    {
      text: i18next.t('어제'),
      start: moment().add(-1, 'day'),
      end: moment().add(-1, 'day'),
    },
    {
      text: i18next.t('이번달'),
      start: moment().startOf('month'),
      // end: moment().endOf('month'),
      end: moment(),
    },
    {
      text: i18next.t('전월'),
      start: moment()
        .add(-1, 'month')
        .startOf('month'),
      end: moment()
        .add(-1, 'month')
        .endOf('month'),
    },
    {
      text: i18next.t('전전월'),
      start: moment()
        .add(-2, 'month')
        .startOf('month'),
      end: moment()
        .add(-2, 'month')
        .endOf('month'),
    },
    {
      text: i18next.t('최근 7일'),
      start: moment().add(-7, 'day'),
      end: moment().add(-1, 'day'),
    },
    {
      text: i18next.t('최근 30일'),
      start: moment().add(-30, 'day'),
      end: moment().add(-1, 'day'),
    },
    {
      text: i18next.t('최근 90일'),
      start: moment().add(-90, 'day'),
      end: moment().add(-1, 'day'),
    },
    {
      text: i18next.t('최근 180일'),
      start: moment().add(-180, 'day'),
      end: moment().add(-1, 'day'),
    },
  ];

  return (
    <div className={`${classes.panel}`}>
      <div>
        <List className={classes.buttonList}>
          {presets.map(({ text, start, end }) => {
            const isSelected =
              isSameDay(start, startDate) && isSameDay(end, endDate);
            return (
              <ListItem
                key={text}
                className={clsx(classes.button, {
                  [classes.button_selected]: isSelected,
                })}
                button
                onClick={() =>
                  onDatesChange({ startDate: start, endDate: end })
                }
              >
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default DatePresets;
