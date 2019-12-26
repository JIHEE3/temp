import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    fontSize: '22px',
    fontWeight: 500,
    color: theme.palette.common.black,
  },
  content: {
    borderRadius: '4px',
    boxShadow: '0.1px 1px 3px 0 rgba(16, 17, 21, 0.03)',
    border: 'solid 1px #e5e8eb',
    backgroundColor: '#ffffff',
    padding: '33px 21px 45px 21px;',
    marginTop: '15px',
  },
}));

const MainContentTemplate = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={`mb-MainContentTemplate ${classes.root}`}>
      <div className={classes.title}>{title}</div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default MainContentTemplate;
