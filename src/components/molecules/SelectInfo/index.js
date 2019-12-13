import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DehazeIcon from '@material-ui/icons/Dehaze';

const useStyles = makeStyles(theme => ({
  langBtn: {
    backgroundColor: theme.palette.background.header,
    color: theme.palette.getContrastText(theme.palette.background.header),
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#263238',
    },
  },
  selectItem: {
    paddingTop: '3px',
    paddingBottom: '3px',
  },
  selectText: {
    '& > span': {
      fontSize: '0.9rem',
    },
  },
  linkTag: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
}));

const SelectInfo = ({ onLogout }) => {
  const { t } = useTranslation();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button className={classes.langBtn} onClick={handleClick}>
        <DehazeIcon className={classes.rightIcon} />
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
        <ListItem button className={classes.selectItem}>
          <ListItemText primary={t('결제')} className={classes.selectText} />
        </ListItem>
        <ListItem button>
          <Link to="/changeInfo" className={classes.linkTag}>
            <ListItemText
              primary={t('정보수정')}
              className={classes.selectText}
            />
          </Link>
        </ListItem>
        <ListItem button onClick={onLogout}>
          <ListItemText
            primary={t('로그아웃')}
            className={classes.selectText}
          />
        </ListItem>
      </Popover>
    </>
  );
};

export default SelectInfo;
