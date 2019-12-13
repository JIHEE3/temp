import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';

import IconButton from 'components/atoms/IconButton';

const useStyles = makeStyles(theme => ({
  filterWrap: {
    height: '52px',
    borderRadius: '4px',
    backgroundColor: '#f6f6f9',
    display: 'flex',
    alignItems: 'center',
    padding: '9px 20px',
    boxSizing: 'border-box',
    '& > div': {
      // display: 'inline-flex',
      '&:not(:first-child):not(.open)': {
        marginLeft: '10px',
      },
    },
  },
  button: {
    marginLeft: 'auto',
  },
}));

const FilterWrap = ({ handleOnReset, children }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx('mb-FilterWrap', classes.filterWrap)}>
      {children}
      <IconButton className={classes.button} onClick={handleOnReset}>
        <FontAwesomeIcon icon={faUndo} color="#4d5059" />
        {t('초기화')}
      </IconButton>
    </div>
  );
};

export default FilterWrap;
