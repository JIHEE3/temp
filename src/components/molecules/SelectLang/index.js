import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { changeLocale } from 'modules/locale';

const useStyles = makeStyles(theme => ({
  langBtn: {
    backgroundColor: theme.palette.background.header,
    color: theme.palette.getContrastText(theme.palette.background.header),
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#263238',
    },
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const SelectLang = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { locale } = useSelector(({ locale }) => ({
    locale: locale.locale,
  }));
  const { t } = useTranslation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /**
   * 언어 변경 popover 열기
   */
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * 언어 변경
   */
  const changeLang = async locale => {
    await dispatch(changeLocale(locale));
  };

  return (
    <>
      <Button
        variant="contained"
        className={clsx('mb-SelectLang', classes.langBtn, className)}
        onClick={handleClick}
      >
        <span>{t(locale)}</span>
        <ExpandMoreIcon className={classes.rightIcon} />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ListItem button onClick={() => changeLang('ko')}>
          <ListItemText primary={t('ko')} />
        </ListItem>
        <ListItem button onClick={() => changeLang('en')}>
          <ListItemText primary={t('en')} />
        </ListItem>
      </Popover>
    </>
  );
};

export default SelectLang;
