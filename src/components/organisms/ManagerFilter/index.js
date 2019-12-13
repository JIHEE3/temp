import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import MbSelectbox from 'components/molecules/MbSelectbox';

const ManagerFilter = ({ label, value, handleOnchange }) => {
  const { t } = useTranslation();
  const { contactMenus } = useSelector(({ common }) => ({
    contactMenus: common.contactMenus,
  }));

  return (
    <MbSelectbox
      label={typeof label === 'undefined' ? t('담당자') : label}
      value={value}
      name="contactMenus"
      optionData={contactMenus}
      optionLabelKey="CONTACT_NAME"
      optionValueKey="CONTACT_NO"
      handleOnchange={handleOnchange}
      icon={false}
    />
  );
};

export default ManagerFilter;
