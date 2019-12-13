import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';

import PopoverFilterWrap from 'components/molecules/PopoverFilterWrap';
import MbRadioGroup from 'components/molecules/MbRadioGroup';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    padding: '0 25px',
    display: 'flex',
    alignItems: 'center',
  },
  selectbox: {
    height: '100%',
    marginLeft: 17,
  },
}));

const ExternalFilter = ({ id, itlTpCode, handleOnExternalChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { externalCodeList } = useSelector(({ common }) => ({
    externalCodeList: (() => {
      const externalCodeList = [].concat(common.externalCodeList);
      externalCodeList.unshift({
        label: t('전체'),
        value: '00',
      });
      return externalCodeList;
    })(),
  }));
  const [externalOnOff, setExternalOnOff] = useState('off');
  const [externalCode, setExternalCode] = useState('00');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (typeof itlTpCode === 'undefined') {
      // 필터 초기화
      setExternalOnOff('off');
    }
  }, [itlTpCode]);

  const handleOnOff = e => {
    const { value } = e.target;
    setExternalOnOff(value);
    if (value === 'off') {
      handleOnExternalChange(null);
    } else {
      handleOnExternalChange(externalCode);
    }
  };

  const handleOnChange = e => {
    const { value, selectedIndex } = e.target;

    setSelectedIndex(selectedIndex);
    setExternalCode(value);
    handleOnExternalChange(value);
  };

  return (
    <PopoverFilterWrap
      // selectedLabel={t()}
      selectedLabel={externalCodeList[selectedIndex].label}
      label={t('외부연동')}
      filtered={externalOnOff !== 'off'}
      id={id}
      filterList={
        <div className={classes.root}>
          <MbRadioGroup
            selectedValue={externalOnOff}
            radioList={[
              {
                label: t('ON'),
                value: 'on',
              },
              {
                label: t('OFF'),
                value: 'off',
              },
            ]}
            onChange={handleOnOff}
            name="external"
          />
          <NativeSelect
            className={classes.selectbox}
            value={externalCode}
            disabled={externalOnOff === 'off'}
            name="external"
            onChange={handleOnChange}
          >
            {externalCodeList.map(data => {
              const { value, label } = data;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </NativeSelect>
        </div>
      }
    />
  );
};

export default ExternalFilter;
