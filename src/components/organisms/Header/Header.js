import React from 'react';
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SelectLang from 'components/molecules/SelectLang';
import SelectInfo from 'components/molecules/SelectInfo';
import MainLogo from 'images/common/logo/logo_white.png';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    background: theme.palette.background.header,
    height: '70px',
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',
    zIndex: '11',
    flex: '1',
    left: '0',
    '& > :first-child': {
      flexGrow: 1,
    },
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
  tabButtonWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  // tabButtonGroup: {
  //   height: theme.spacing(6),
  // },
  buttonWrap: {
    display: 'inline-flex',
    padding: theme.spacing(1, 2),
  },
  flex: {
    display: 'flex',
    '& > button': {
      marginLeft: 5,
      marginRight: 0,
    },
  },
  button: {
    color: 'white',
    borderRadius: '3px',
    fontSize: theme.palette.primary.defaultTextSize,
    margin: '0.5em',
    '&:hover': {
      color: theme.palette.primary.mainColor,
    },
  },
  fab: {
    margin: theme.spacing(1),
  },
  logoButton: {
    margin: '0',
  },
  img: {
    width: '120px',
  },
  info: {
    marginLeft: 0,
  },
}));

const Header = ({ history, user, onLogout }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  function goMain() {
    history.push('/');
  }

  /**
   * 링크
   */
  function goMobon(url) {
    window.open(url);
  }

  return (
    <header className={clsx('mb-Header', classes.header)}>
      <div className={classes.flex}>
        <Button onClick={goMain} className={classes.logoButton}>
          <img className={classes.img} src={MainLogo} alt="mainLogo"></img>
        </Button>
      </div>
      <div className={classes.buttonWrap}>
        <Grid item className={classes.tabButtonWrap}>
          <Button
            className={classes.button}
            onClick={() => goMobon('https://www.mobon.net/main/m2/')}
          >
            {t('모비온')}
          </Button>
          <Button
            className={classes.button}
            onClick={() => goMobon('http://mobon.net/mobsense/')}
          >
            {t('모비센스')}
          </Button>
          <Button
            className={classes.button}
            onClick={() => goMobon('https://www.mobon.net/mobtrend/')}
          >
            {t('모비트렌드')}
          </Button>
          <Button
            className={classes.button}
            onClick={() =>
              goMobon('https://www.mobon.net/ad/manage_member.html')
            }
          >
            {t('(구)최고관리자')}
          </Button>
        </Grid>
        <div className={classes.flex}>
          <SelectLang />
          {user ? (
            <SelectInfo className={classes.info} onLogout={onLogout} />
          ) : (
            // <div className="right">
            //   <div>{user.username}</div>
            // </div>
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
