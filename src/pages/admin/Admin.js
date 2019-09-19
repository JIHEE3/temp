import React from 'react';
import { Route } from 'react-router-dom';

import AdminTemplate from 'pages/admin/templates/AdminTemplate';
import AdcodeContainer from 'pages/admin/Adcode/AdcodeContainer';
import StatisticsContainer from 'pages/admin/Statistics/StatisticsContainer';

const Admin = () => {
  return (
    <AdminTemplate>
      <Route path='/admin/management' component={AdcodeContainer} />
      <Route path='/admin/statistics' component={StatisticsContainer} />
      <Route path='/admin/admix' render={() => `애드익스(외부연동)`} />
      <Route path='/admin/mediaLive' render={() => `광고송출리스트`} />
      <Route path='/admin/checkImg' render={() => `이미지검수`} />
      <Route path='/admin/etc' render={() => `기타`} />
      <Route path='/admin/RTB' render={() => `RTB`} />
    </AdminTemplate>
  );
};

export default Admin;
