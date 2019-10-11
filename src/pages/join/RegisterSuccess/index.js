import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AppleIcon from '@material-ui/icons/Apple';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '8%'
  },
  title: {
    margin: theme.spacing(4, 0)
  },
  id: {
    padding: `${theme.spacing(2)}px 30%`,
    background: theme.palette.grey[200]
  },
  subTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    '& > p': {
      margin: 0
    }
  }
}));

const RegisterSuccess = ({ history, match }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { userId } = match.params;

  const goMain = () => {
    history.push('/');
  };

  return (
    <div className={clsx('mb-RegisterSuccess', classes.root)}>
      <IconButton onClick={goMain} color="primary">
        <AppleIcon color="primary" style={{ fontSize: '72px' }} />
      </IconButton>
      <Typography className={classes.title} variant="h2">
        {t('계정이 생성되었습니다.')}
      </Typography>
      <div className={classes.id}>{userId}</div>
      <Typography className={classes.subTitle} variant="h6" gutterBottom>
        <p>
          {t(
            '권한 결재 신청 후 승인 처리 되어야만 최고관리자 페이지를 이용하실 수 있습니다.'
          )}
        </p>
        <p>{t('전자 결재 신청 페이지로 이동해주세요.')}</p>
      </Typography>
      <Link href="http://group.enliple.com/electro/addvacation" target="_blank">
        {t('전자결재 신청')}
      </Link>
    </div>
  );
};

export default withRouter(RegisterSuccess);
