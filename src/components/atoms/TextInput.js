import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    '&.isModal': {
      width: 150,
      margin: 0,
      '& fieldset': {
        border: '1px solid #e8e9ec',
      },
    },
  },
  errorInfoText: {
    marginTop: 0,
    color: '#ff2c2c',
  },
}));

/**
 *
 */
const ModalBasic = ({
  id,
  label,
  error,
  margin = 'normal',
  errorMessageOpen,
  errorMessage,
  isModal = false,
  clickHandle = null,
  changeHandle = null,
  value,
  variant = 'outlined',
  ...rest
}) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <TextField
          id={id}
          className={clsx({ isModal }, classes.textField)}
          label={label}
          error={error}
          margin={margin}
          onclick={clickHandle}
          onChange={changeHandle}
          value={value}
          variant={variant}
        />
        {errorMessageOpen && (
          <FormHelperText className={classes.errorInfoText}>
            {errorMessage}
          </FormHelperText>
        )}
      </div>
    </>
  );
};

export default withRouter(ModalBasic);
