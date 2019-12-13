import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import MbCircularProgress from 'components/atoms/MbCircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  wrap: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
}));

function MbDataState({ className, state }) {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.root)}>
      <div className={clsx(classes.wrap)}>
        {state === 'error' ? (
          <>
            <WarningIcon color="error" fontSize="large" />
            <div>Error</div>
          </>
        ) : state === 'loading' ? (
          <MbCircularProgress />
        ) : null}
      </div>
    </div>
  );
}

export default MbDataState;
