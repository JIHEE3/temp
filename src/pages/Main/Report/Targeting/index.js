import React from 'react';
import { useTranslation } from 'react-i18next';
import MainTemplate from 'pages/templates/MainTemplate';

import MainContentTemplate from '../../../templates/MainContentTemplate';
import Statistics from './Statistics';

const Targeting = () => {
  const { t } = useTranslation();
  return (
    <MainTemplate className="mb-User">
      <MainContentTemplate title={t('타겟팅 보고')}>
        <Statistics />
      </MainContentTemplate>
    </MainTemplate>
  );
};

export default Targeting;
