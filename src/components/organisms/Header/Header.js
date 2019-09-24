import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PaymentIcon from '@material-ui/icons/Payment';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    background: '#181c27',
    height: '70px',
    justifyContent: 'space-between',
    '& > :first-child': {
      flexGrow: 1
    }
  },
  logoBtn: {
    margin: theme.spacing(1)
  },
  tabButtonWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  tabButtonGroup: {
    height: theme.spacing(6)
  },
  buttonWrap: {
    display: 'inline-flex',
    padding: theme.spacing(1, 2)
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  },
  button: {
    background: '#004d40',
    color: 'white',
    borderRadius: '3px',
    fontSize: '16px',
    margin: '0.5em'
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

const Header = ({ history, user, onLogout }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  function goMain() {
    history.push('/');
  }

  /**
   * 매체, 관리자 탭 전환
   */
  function changeTab(url) {
    history.push(url);
  }

  return (
    <header className={classes.header}>
      <div>
        <IconButton
          className={classes.logoBtn}
          onClick={goMain}
          color="primary"
        >
          <AccessibilityNewIcon color="primary" fontSize="large" />
        </IconButton>
      </div>

      <div className={classes.buttonWrap}>
        <Grid item className={classes.tabButtonWrap}>
          <ButtonGroup
            variant="contained"
            color="primary"
            className={classes.tabButtonGroup}
          >
            <Button onClick={() => changeTab('/media')}>
              <HomeIcon className={classes.icon} />
              {t('매체')}
            </Button>
            <Button onClick={() => changeTab('/admin/management')}>
              <WhatshotIcon className={classes.icon} />
              {t('관리자')}
            </Button>
          </ButtonGroup>
        </Grid>
        <div>
          {user ? (
            <div className="right">
              <div>{user.username}</div>
              <Fab
                color="primary"
                aria-label="Payment"
                className={classes.fab}
                size="small"
              >
                <PaymentIcon />
              </Fab>
              <Fab
                color="primary"
                aria-label="Edit"
                className={classes.fab}
                size="small"
              >
                <EditIcon />
              </Fab>
              <Fab
                color="secondary"
                onClick={onLogout}
                aria-label="Logout"
                className={classes.fab}
                size="small"
              >
                <ExitToAppIcon />
              </Fab>
            </div>
          ) : (
            <div className="right">
              <Link to="/login">
                <Button variant="contained" color="primary">
                  로그인
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
