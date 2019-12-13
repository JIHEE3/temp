import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MbRadio from 'components/atoms/MbRadio';

const useStyles = makeStyles(theme => ({
  radioGroup: {
    flexDirection: 'row',
    padding: '6px',
  },
  formControlLabel: {
    marginLeft: 0,
  },
}));

export default function MbRadioGroup({
  selectedValue,
  /*value,*/ radioList = [],
  name,
  ...rest
}) {
  const classes = useStyles();

  return (
    <RadioGroup
      aria-label={name}
      name={name}
      value={selectedValue}
      classes={{ root: classes.radioGroup }}
      {...rest}
    >
      {radioList.map(radio => {
        const { value, label } = radio;
        return (
          <FormControlLabel
            key={`${label}_${value}`}
            value={value}
            control={<MbRadio color="primary" />}
            label={label}
            classes={{ root: classes.formControlLabel }}
          />
        );
      })}
    </RadioGroup>
  );
}
