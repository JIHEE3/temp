import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      height: 'inherit',
    },
    '& fieldset': {
      borderColor: theme.palette.box.secondaryBorderColor,
    },

    '&.error fieldset': {
      borderColor: theme.palette.common.red,
    },

    '&:hover fieldset': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '& input:focus~fieldset': {
      border: `1px solid ${theme.palette.primary.boxBorder} !important`,
    },
  },
}));

// (Intl.NumberFormat) 통화 단위를 현재 접속한 locale 단위로 할지 선택한 locale로 할지 정해져야 할듯
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function MbInput({
  numberFormat,
  error,
  className = '',
  ...rest
}) {
  const classes = useStyles();
  const InputProps = {
    ...rest.InputProps,
  };

  if (numberFormat) {
    InputProps['inputComponent'] = NumberFormatCustom;
  }

  return (
    <TextField
      {...rest}
      classes={{
        root: classes.root,
      }}
      className={clsx(className, { error })}
      variant="outlined"
      InputProps={InputProps}
    />
  );
}
